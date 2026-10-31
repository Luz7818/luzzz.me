/**
 * 像素场的全部渲染与场物理(纯 2D canvas,零依赖):
 *   1. 底色 + 极淡网格线 + 地平线暖辉 + 暗角(缓存渐变,换主题/resize 重建)
 *   2. 静态装饰层(桥面桥墩/路面/路灯/站牌/信号灯杆/隧道)在 setBands 时一次预烤,
 *      每帧整拷进实体墨层,零逐格成本;装饰克制稀疏,不跟主体抢戏
 *   3. 基点铺满全场,亮度只做大幅低频的明暗带 + 尾流提亮——干净均匀的像素格布,
 *      不做逐格乱闪;水线两行正弦波光,夜里星月同场
 *   4. 交通实体按侧视 sprite 逐格盖印:车体槽用近实心方块(ascii-sharks 的鲨鱼读得清,
 *      靠的就是整格填充),车灯槽用小亮点;盖印按 y 排序(远近遮挡);刹车尾灯/双帧
 *      轮辐/船身倒影;鼠标拨开的位移对全场生效
 *   5. 尾迹沿 (prevX → x) 连续盖章成光带,四邻域扩散成涟漪,不再是散点
 *   6. 夜色系数(--px-night,随主题 0.6s 插值)驱动:星月、车灯锥光、路灯光晕
 *   7. 所有格子按「色槽 × 亮度档」计数排序分桶,每桶一次 fillStyle
 * 架构借鉴 stackedlol/ascii-sharks(typed array 场 + 分桶绘制 + 能量扩散)。
 */

import { NOTE, SLOT, type Sprite } from './sprites';
import type { Entity, Layout, SceneKind, TrafficState } from './traffic';

export type RGB = [number, number, number];

/** 一次绘制所需的全部颜色与合成参数,全部来自当前主题的 --px-* 变量 */
export interface PixelPalette {
  dot: RGB;
  body: RGB;
  bodyDim: RGB;
  accent: RGB;
  head: RGB;
  tail: RGB;
  go: RGB;
  field: RGB;
  grid: RGB;
  gridAlpha: number;
  glowAlpha: number;
  vignetteAlpha: number;
  alphaScale: number;
  /** 夜色系数:暗色主题 1、亮色 0,随主题涟漪 0.6s 插值 */
  night: number;
  blend: GlobalCompositeOperation;
}

const BASE_DOT_MAX = 0.5; // 基点最亮档的不透明度:满屏可读但克制的像素格布
const GLOW_THRESHOLD = 0.14;
const LEVELS = 6;
/** 桶 = [基点 6 | 实体槽 1..7 × 6 | 尾流辉光 6] */
const BUCKET_SLOT0 = LEVELS;
const BUCKET_GLOW = 8 * LEVELS;
const BUCKET_COUNT = 9 * LEVELS;

const SLOT_RGB: Record<number, 'body' | 'bodyDim' | 'accent' | 'head' | 'tail' | 'go'> = {
  [SLOT.BODY]: 'body',
  [SLOT.DARK]: 'bodyDim',
  [SLOT.GLASS]: 'accent',
  [SLOT.HEAD]: 'head',
  [SLOT.TAIL]: 'tail',
  [SLOT.GO]: 'go',
  [SLOT.DECOR]: 'bodyDim',
};
/**
 * 槽基准不透明度(顶档 = SLOT_ALPHA × 6/5):车体槽顶到全不透明,实心才读得出形状;
 * DECOR 的浓淡全在 decorAlpha 里逐格烤死。
 */
const SLOT_ALPHA: Record<number, number> = {
  [SLOT.BODY]: 1.2,
  [SLOT.DARK]: 1.0,
  [SLOT.GLASS]: 1.2,
  [SLOT.HEAD]: 1.2,
  [SLOT.TAIL]: 1.1,
  [SLOT.GO]: 1.2,
  [SLOT.DECOR]: 1,
};
/** 车体类槽画近实心方块,灯类槽画小亮点 */
const SOLID_SLOTS = new Set<number>([SLOT.BODY, SLOT.DARK, SLOT.GLASS, SLOT.GO]);
/** 画前灯锥光的实体 */
const BEAM_KINDS = new Set(['sedan', 'sports', 'bus', 'truck', 'moto', 'train', 'metro']);

function readVar(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function parseRgb(raw: string, fallback: RGB): RGB {
  const parts = raw.split(',').map((n) => Number.parseFloat(n.trim()));
  return parts.length === 3 && parts.every((n) => Number.isFinite(n))
    ? [parts[0], parts[1], parts[2]]
    : fallback;
}

export function readPixelPalette(): PixelPalette {
  return {
    dot: parseRgb(readVar('--px-dot', '150,178,208'), [150, 178, 208]),
    body: parseRgb(readVar('--px-body', '208,224,240'), [208, 224, 240]),
    bodyDim: parseRgb(readVar('--px-body-dim', '118,140,166'), [118, 140, 166]),
    accent: parseRgb(readVar('--px-accent', '245,168,60'), [245, 168, 60]),
    head: parseRgb(readVar('--px-head', '255,243,210'), [255, 243, 210]),
    tail: parseRgb(readVar('--px-tail', '255,106,96'), [255, 106, 96]),
    go: parseRgb(readVar('--px-go', '84,220,148'), [84, 220, 148]),
    field: parseRgb(readVar('--px-field', '10,16,22'), [10, 16, 22]),
    grid: parseRgb(readVar('--px-grid', '130,165,200'), [130, 165, 200]),
    gridAlpha: Number.parseFloat(readVar('--px-grid-alpha', '0.05')) || 0,
    glowAlpha: Number.parseFloat(readVar('--px-glow-alpha', '0.12')) || 0,
    vignetteAlpha: Number.parseFloat(readVar('--px-vignette-alpha', '0.42')) || 0,
    alphaScale: Number.parseFloat(readVar('--px-alpha', '1')) || 1,
    night: clampNum(Number.parseFloat(readVar('--px-night', '1')) || 0, 0, 1),
    blend: readVar('--px-blend', 'lighter') === 'source-over' ? 'source-over' : 'lighter',
  };
}

const rgb = (c: RGB) => c.join(',');
const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
function clampNum(v: number, lo: number, hi: number) {
  return Number.isFinite(v) ? clamp(v, lo, hi) : lo;
}

export interface Pointer {
  x: number;
  y: number;
  px: number;
  py: number;
  active: boolean;
}

export class PixelField {
  private ctx: CanvasRenderingContext2D;
  private dpr = 1;
  w = 0;
  h = 0;
  cw = 13;
  ch = 13;
  private cols = 0;
  private rows = 0;

  private energy = new Float32Array(0);
  private energyTmp = new Float32Array(0);
  private offX = new Float32Array(0);
  private offY = new Float32Array(0);
  private velX = new Float32Array(0);
  private velY = new Float32Array(0);
  private vehSlot = new Uint8Array(0);
  private vehAlpha = new Float32Array(0);

  // 静态装饰层:setBands 时一次烤好,每帧整拷
  private decorSlot = new Uint8Array(0);
  private decorAlpha = new Float32Array(0);
  private waterRows: number[] = [];
  private signalLampCells: [number, number, number] = [-1, -1, -1];

  private bucketOf = new Uint8Array(0);
  private bucketOrder = new Int32Array(0);
  private bucketCounts = new Int32Array(BUCKET_COUNT + 1);

  private palette: PixelPalette;
  private dotStyles: string[] = [];
  private vehStyles: string[] = [];
  private glowStyles: string[] = [];
  private gridPath: Path2D | null = null;
  private glowGradient: CanvasGradient | null = null;
  private vignetteGradient: CanvasGradient | null = null;
  private beamGradient: CanvasGradient | null = null;
  private lampGradient: CanvasGradient | null = null;
  private bands: Layout | null = null;
  /** 当前场景批次:水面波光/信号灯动态只在对应批次点亮 */
  scene: SceneKind = 'road';
  /** 装饰层淡入淡出系数(场景切换时由引擎驱动 0→1) */
  decorFade = 1;

  constructor(ctx: CanvasRenderingContext2D, palette: PixelPalette) {
    this.ctx = ctx;
    this.palette = palette;
    this.rebuildStyles();
  }

  get cell() {
    return this.cw;
  }

  setPalette(p: PixelPalette) {
    this.palette = p;
    this.rebuildStyles();
    this.buildGradients();
  }

  private rebuildStyles() {
    const p = this.palette;
    const a = p.alphaScale;
    this.dotStyles = [];
    for (let l = 0; l < LEVELS; l++) {
      this.dotStyles.push(`rgba(${rgb(p.dot)},${((BASE_DOT_MAX * a * (l + 1)) / LEVELS).toFixed(3)})`);
    }
    this.vehStyles = [];
    for (let slot = 1; slot <= 7; slot++) {
      const key = SLOT_RGB[slot];
      const color = key ? p[key] : p.body;
      for (let l = 0; l < LEVELS; l++) {
        this.vehStyles.push(
          `rgba(${rgb(color)},${Math.min(1, (SLOT_ALPHA[slot] * a * (l + 1)) / LEVELS).toFixed(3)})`,
        );
      }
    }
    this.glowStyles = [];
    for (let l = 0; l < LEVELS; l++) {
      this.glowStyles.push(`rgba(${rgb(p.accent)},${(0.85 * a * (l + 1)) / LEVELS})`);
    }
  }

  resize(w: number, h: number, dpr: number) {
    this.w = w;
    this.h = h;
    this.dpr = dpr;
    // 格径自适应:桌面 ~8px,小屏钳到 6px——车流是背景纹理,块头大了会压文字
    this.cw = clamp(Math.round(w / 180), 6, 9);
    this.ch = this.cw;
    this.cols = Math.ceil(w / this.cw);
    this.rows = Math.ceil(h / this.ch);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const n = this.cols * this.rows;
    this.energy = new Float32Array(n);
    this.energyTmp = new Float32Array(n);
    this.offX = new Float32Array(n);
    this.offY = new Float32Array(n);
    this.velX = new Float32Array(n);
    this.velY = new Float32Array(n);
    this.vehSlot = new Uint8Array(n);
    this.vehAlpha = new Float32Array(n);
    this.decorSlot = new Uint8Array(n);
    this.decorAlpha = new Float32Array(n);
    this.bucketOf = new Uint8Array(n);
    this.bucketOrder = new Int32Array(n);
    this.bucketCounts.fill(0);

    const grid = new Path2D();
    for (let c = 0; c <= this.cols; c++) {
      const x = Math.round(c * this.cw * dpr) / dpr;
      grid.moveTo(x, 0);
      grid.lineTo(x, h);
    }
    for (let r = 0; r <= this.rows; r++) {
      const y = Math.round(r * this.ch * dpr) / dpr;
      grid.moveTo(0, y);
      grid.lineTo(w, y);
    }
    this.gridPath = grid;
    this.buildGradients();
  }

  /** 拿到带位信息后按场景烤静态装饰层 + 星格 + 月牙 + 信号灯格(引擎在 resize/换场景时调用) */
  setBands(layout: Layout, scene: SceneKind) {
    this.bands = layout;
    this.scene = scene;
    const { cols, rows, cw, ch } = this;
    const decorSlot = this.decorSlot;
    const decorAlpha = this.decorAlpha;
    decorSlot.fill(0);
    decorAlpha.fill(0);
    const put = (col: number, row: number, slot: number, alpha: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows) return;
      const i = row * cols + col;
      decorSlot[i] = slot;
      decorAlpha[i] = Math.max(decorAlpha[i], alpha);
    };

    const rowOf = (y: number) => Math.floor(y / ch);
    const railRow = rowOf(layout.railY);
    const e1Row = rowOf(layout.exprY[0]);
    const e2Row = rowOf(layout.exprY[1]);
    const streetRow = rowOf(layout.streetY);
    const bikeRow = rowOf(layout.bikeY);
    const tunnelRow = rowOf(layout.tunnelY);
    const waterRow = rowOf(layout.waterY);

    if (scene === 'road') {
      // 高架路面两道 + 稀疏桥墩
      for (let c = 0; c < cols; c++) {
        put(c, e1Row, SLOT.DECOR, 0.3);
        put(c, e2Row, SLOT.DECOR, 0.3);
        if (c % 20 === 13) for (let r = e1Row + 1; r < e2Row; r++) put(c, r, SLOT.DECOR, 0.12);
      }
      // 街道路面
      for (let c = 0; c < cols; c++) put(c, streetRow, SLOT.DECOR, 0.34);
      // 自行车道:虚线
      for (let c = 0; c < cols; c += 2) put(c, bikeRow, SLOT.DECOR, 0.15);
      // 信号灯:灯杆 + 三格灯头(亮哪格每帧动态盖)
      const lampCol = Math.floor(layout.stopX / cw);
      for (let r = streetRow - 1; r >= streetRow - 6; r--) put(lampCol, r, SLOT.DECOR, 0.55);
      this.signalLampCells = [
        (streetRow - 6) * cols + lampCol,
        (streetRow - 5) * cols + lampCol,
        (streetRow - 4) * cols + lampCol,
      ];
      // 公交站牌:杆 + 一格强调色站牌
      const stopCol = Math.floor(layout.busStopX / cw);
      for (let r = streetRow - 1; r >= streetRow - 4; r--) put(stopCol, r, SLOT.DECOR, 0.5);
      put(stopCol, streetRow - 4, SLOT.GLASS, 0.9);
      // 路灯:灯杆 + 灯头
      for (const lx of layout.lampXs) {
        const c = Math.floor(lx / cw);
        for (let r = streetRow - 1; r >= streetRow - 5; r--) put(c, r, SLOT.DECOR, 0.5);
        put(c, streetRow - 5, SLOT.HEAD, 0.55);
      }
    } else if (scene === 'water') {
      // 水面两行
      for (let c = 0; c < cols; c++) {
        put(c, waterRow, SLOT.DECOR, 0.3);
        put(c, waterRow + 1, SLOT.DECOR, 0.18);
      }
      this.signalLampCells = [-1, -1, -1];
    } else if (scene === 'rail') {
      // 高架轨道:桥面两行 + 稀疏桥墩
      for (let c = 0; c < cols; c++) {
        put(c, railRow, SLOT.DECOR, 0.34);
        put(c, railRow + 1, SLOT.DECOR, 0.2);
        if (c % 20 === 5) for (let r = railRow + 2; r <= railRow + 4; r++) put(c, r, SLOT.DECOR, 0.15);
      }
      // 隧道:轨排 + 拱顶
      for (let c = 0; c < cols; c++) {
        put(c, tunnelRow, SLOT.DECOR, 0.28);
        if (c % 3 === 0) put(c, tunnelRow, SLOT.DECOR, 0.4);
        if (c % 2 === 0) put(c, tunnelRow - 5, SLOT.DECOR, 0.11);
      }
      this.signalLampCells = [-1, -1, -1];
    } else {
      // 天空批次:纯星空
      this.signalLampCells = [-1, -1, -1];
    }
    // 水面波光只在_water_批次点亮
    this.waterRows = scene === 'water' ? [waterRow, waterRow + 1] : [];
  }

  private buildGradients() {
    const { w, h, cw } = this;
    if (w < 1 || h < 1) return;
    const p = this.palette;
    const glow = this.ctx.createRadialGradient(w * 0.5, h * 0.82, 0, w * 0.5, h * 0.82, Math.max(w, h) * 0.52);
    glow.addColorStop(0, `rgba(${rgb(p.accent)},${p.glowAlpha})`);
    glow.addColorStop(1, `rgba(${rgb(p.accent)},0)`);
    this.glowGradient = glow;
    if (p.vignetteAlpha > 0.001) {
      const vg = this.ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.32,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.74,
      );
      vg.addColorStop(0, 'rgba(4,8,12,0)');
      vg.addColorStop(1, `rgba(4,8,12,${p.vignetteAlpha})`);
      this.vignetteGradient = vg;
    } else {
      this.vignetteGradient = null;
    }
    // 车灯锥:以灯头为原点向 +x 展开,绘制时 translate+scale(dir,1)
    const beam = this.ctx.createLinearGradient(0, 0, cw * 4.5, 0);
    beam.addColorStop(0, `rgba(${rgb(p.head)},0.15)`);
    beam.addColorStop(1, `rgba(${rgb(p.head)},0)`);
    this.beamGradient = beam;
    // 路灯光晕
    const lampR = cw * 4.4;
    const lamp = this.ctx.createRadialGradient(0, 0, 0, 0, 0, lampR);
    lamp.addColorStop(0, `rgba(${rgb(p.head)},0.12)`);
    lamp.addColorStop(1, `rgba(${rgb(p.head)},0)`);
    this.lampGradient = lamp;
  }

  // ── 场物理 ──────────────────────────────────────────────────────────

  /** 尾流能量:四邻域模糊 + 指数衰减,涟漪一样摊开、淡去 */
  private diffuse(dt: number) {
    const { cols, rows, energy, energyTmp: tmp } = this;
    const decay = Math.exp(-dt * 1.5);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const l = c > 0 ? energy[i - 1] : energy[i];
        const rt = c < cols - 1 ? energy[i + 1] : energy[i];
        const u = r > 0 ? energy[i - cols] : energy[i];
        const d = r < rows - 1 ? energy[i + cols] : energy[i];
        tmp[i] = (energy[i] * 4 + l + rt + u + d) * 0.125 * decay;
      }
    }
    this.energy = tmp;
    this.energyTmp = energy;
  }

  /** 位移物理:指针邻域径向推挤,全场弹簧回落(阻尼谐振) */
  step(dt: number, pointer: Pointer) {
    const { cols, rows, cw, ch, offX, offY, velX, velY } = this;
    if (pointer.active) {
      const R = 150;
      const cr = Math.ceil(R / cw);
      const cc0 = Math.max(0, Math.floor(pointer.x / cw) - cr);
      const cc1 = Math.min(cols - 1, Math.floor(pointer.x / cw) + cr);
      const rr0 = Math.max(0, Math.floor(pointer.y / ch) - cr);
      const rr1 = Math.min(rows - 1, Math.floor(pointer.y / ch) + cr);
      for (let r = rr0; r <= rr1; r++) {
        for (let c = cc0; c <= cc1; c++) {
          const dx = c * cw + cw / 2 - pointer.x;
          const dy = r * ch + ch / 2 - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d > R || d < 0.5) continue;
          const f = 2600 * (1 - d / R) * (1 - d / R) * dt;
          const i = r * cols + c;
          velX[i] += (dx / d) * f;
          velY[i] += (dy / d) * f;
        }
      }
    }
    // 全场回落:力大位移明显,松手即弹回原格
    const damp = Math.exp(-6.2 * dt);
    const k = 88;
    for (let i = 0; i < offX.length; i++) {
      velX[i] += -k * offX[i] * dt;
      velY[i] += -k * offY[i] * dt;
      velX[i] *= damp;
      velY[i] *= damp;
      offX[i] += velX[i] * dt;
      offY[i] += velY[i] * dt;
      if (Math.abs(offX[i]) + Math.abs(offY[i]) + Math.abs(velX[i]) + Math.abs(velY[i]) < 0.02) {
        offX[i] = 0;
        offY[i] = 0;
        velX[i] = 0;
        velY[i] = 0;
      }
    }
    this.diffuse(dt);
  }

  /** 定向阵风:列车/地铁的活塞风,把轨道沿线的点阵顺行进方向吹一波 */
  gust(x: number, y: number, radius: number, dvx: number) {
    const { cols, rows, cw, ch, velX } = this;
    const c0 = Math.floor(x / cw);
    const r0 = Math.floor(y / ch);
    for (let r = r0 - radius; r <= r0 + radius; r++) {
      for (let c = c0 - radius; c <= c0 + radius; c++) {
        if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
        const d = Math.hypot(c - c0, r - r0);
        if (d > radius + 0.5) continue;
        velX[r * cols + c] += dvx * (1 - d / (radius + 1));
      }
    }
  }

  /** 在 (x, y) 盖一圈能量 */
  stampEnergy(x: number, y: number, radius: number, amount: number) {
    const { cols, rows, cw, ch, energy } = this;
    const c0 = Math.floor(x / cw);
    const r0 = Math.floor(y / ch);
    for (let r = r0 - radius; r <= r0 + radius; r++) {
      for (let c = c0 - radius; c <= c0 + radius; c++) {
        if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
        const d = Math.hypot(c - c0, r - r0);
        if (d > radius + 0.5) continue;
        const i = r * cols + c;
        energy[i] = Math.min(1.6, energy[i] + amount * (1 - d / (radius + 1)));
      }
    }
  }

  /** 点击涟漪:一圈径向冲量把点阵整体荡开 */
  splash(x: number, y: number) {
    const { cols, rows, cw, ch, velX, velY } = this;
    const R = 240;
    const cr = Math.ceil(R / cw);
    const c0 = Math.floor(x / cw);
    const r0 = Math.floor(y / ch);
    for (let r = r0 - cr; r <= r0 + cr; r++) {
      for (let c = c0 - cr; c <= c0 + cr; c++) {
        if (c < 0 || r < 0 || c >= cols || r >= rows) continue;
        const dx = c * cw + cw / 2 - x;
        const dy = r * ch + ch / 2 - y;
        const d = Math.hypot(dx, dy) || 1;
        if (d > R) continue;
        const mag = (1 - d / R) * 520;
        const i = r * cols + c;
        velX[i] += (dx / d) * mag;
        velY[i] += (dy / d) * mag;
      }
    }
    this.stampEnergy(x, y, 5, 1.3);
  }

  // ── 实体盖印与尾流 ──────────────────────────────────────────────────

  private stampOne(
    sprite: Sprite,
    x: number,
    y: number,
    dir: 1 | -1,
    alpha: number,
    t: number,
    opts?: { blinkTail?: boolean; brake?: boolean; reflect?: boolean; flipY?: boolean },
  ) {
    const { cols, rows, cw, ch, vehSlot, vehAlpha } = this;
    const c0 = Math.round(x / cw);
    const r0 = Math.round(y / ch);
    for (let r = 0; r < sprite.h; r++) {
      const row = r0 + r;
      if (row < 0 || row >= rows) continue;
      const srcRow = opts?.flipY ? sprite.h - 1 - r : r;
      for (let c = 0; c < sprite.w; c++) {
        const slot = sprite.cells[srcRow * sprite.w + (dir === 1 ? c : sprite.w - 1 - c)];
        if (!slot) continue;
        const col = c0 + c;
        if (col < 0 || col >= cols) continue;
        let a = alpha;
        if (slot === SLOT.TAIL) {
          if (opts?.brake) a = Math.max(a, 1);
          else if (opts?.blinkTail) a *= 0.35 + 0.65 * Math.abs(Math.sin(t * 5));
        }
        const i = row * cols + col;
        if (opts?.reflect) {
          // 倒影:压暗 + 逐行随波轻晃
          a *= 0.16;
          const jitter = Math.round(Math.sin(t * 1.5 + row * 0.8) * 0.6);
          const j = row * cols + clamp(col + jitter, 0, cols - 1);
          vehSlot[j] = slot;
          vehAlpha[j] = Math.max(vehAlpha[j], a);
          continue;
        }
        vehSlot[i] = slot;
        vehAlpha[i] = Math.max(vehAlpha[i], a);
      }
    }
  }

  /** 把实体 sprite 盖进网格;调用方按 y 升序传入,近处实体自然盖住远处 */
  stampEntity(e: Entity, t: number) {
    const cell = this.cw;
    const frame = e.frameHz > 0 ? e.sprites[Math.floor(e.animT * e.frameHz) % e.sprites.length] : e.sprites[0];
    const blinkTail = e.kind === 'bus' && e.dwell !== undefined && e.dwell > 0;
    this.stampOne(frame, e.x, e.y, e.dir, e.alpha, t, { blinkTail, brake: e.braking });

    // 货轮倒影:整船按水线上下镜像,倒影逐行随波晃
    if (e.kind === 'ship' && this.bands) {
      const reflectedTop = 2 * this.bands.waterY - (e.y + frame.h * cell);
      this.stampOne(frame, e.x, reflectedTop, e.dir, e.alpha, t, { reflect: true, flipY: true });
    }
  }

  /** 尾迹:沿 (prevX → x) 连续盖章成光带(车头亮、尾灯处更浓),不是散点 */
  depositEntity(e: Entity) {
    const cell = this.cw;
    const sprite = e.sprites[0];
    const w = sprite.w * cell;
    const hpx = sprite.h * cell;
    const prevX = e.prevX ?? e.x;
    const jumped = Math.abs(e.x - prevX) > 300;
    const headY = e.y + hpx / 2;
    const headCur = e.dir === 1 ? e.x + w : e.x;
    const headPrev = e.dir === 1 ? prevX + w : prevX;
    const fast = clamp(e.v / 240, 0.3, 1.3);

    if (e.kind === 'train' || e.kind === 'metro') {
      // 沿车身在轨排上盖章,轨道被点亮一段
      const from = Math.max(0, e.x);
      const to = Math.min(this.w, e.x + w);
      for (let px = from; px < to; px += cell * 3) {
        this.stampEnergy(px, e.y + hpx, 1, 0.022 * fast);
      }
      if (!jumped) this.stampRibbon(headPrev, headCur, headY, 0.05 * fast);
      return;
    }
    if (e.kind === 'ship') {
      if (!jumped) this.stampRibbon(headPrev, headCur, headY, 0.05 * fast);
      const tailX = e.dir === 1 ? e.x : e.x + w;
      this.stampEnergy(tailX - e.dir * 6, headY - hpx * 0.7, 2, 0.04);
      this.stampEnergy(tailX - e.dir * 6, headY + hpx * 0.7, 2, 0.04);
      return;
    }
    if (e.kind === 'plane') {
      const tailCur = e.dir === 1 ? e.x : e.x + w;
      const tailPrev = e.dir === 1 ? prevX : prevX + w;
      if (!jumped) this.stampRibbon(tailPrev, tailCur, headY, 0.09);
      return;
    }
    if (e.line === undefined) return;
    const tailCur = e.dir === 1 ? e.x : e.x + w;
    const tailPrev = e.dir === 1 ? prevX : prevX + w;
    if (!jumped) this.stampRibbon(headPrev, headCur, headY, 0.055 * fast);
    if (!jumped) this.stampRibbon(tailPrev, tailCur, headY, e.braking ? 0.075 : 0.03 * fast);
  }

  /** 沿水平段盖章:尾迹连续成带 */
  private stampRibbon(x0: number, x1: number, y: number, amount: number) {
    const n = Math.max(1, Math.ceil(Math.abs(x1 - x0) / this.cw));
    for (let s = 1; s <= n; s++) {
      this.stampEnergy(x0 + ((x1 - x0) * s) / n, y, 0, amount / n);
    }
  }

  // ── 绘制 ────────────────────────────────────────────────────────────

  render(t: number, state: TrafficState) {
    const { ctx, cols, rows, cw, energy, vehSlot, vehAlpha } = this;
    const n = cols * rows;
    if (n === 0 || !this.bands) return;
    const p = this.palette;

    // 底:场色 + 极淡网格 + 暖辉 + 暗角
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgb(${rgb(p.field)})`;
    ctx.fillRect(0, 0, this.w, this.h);
    if (this.gridPath && p.gridAlpha > 0.001) {
      ctx.strokeStyle = `rgba(${rgb(p.grid)},${p.gridAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke(this.gridPath);
    }
    if (this.glowGradient) {
      ctx.fillStyle = this.glowGradient;
      ctx.fillRect(0, 0, this.w, this.h);
    }
    if (this.vignetteGradient) {
      ctx.fillStyle = this.vignetteGradient;
      ctx.fillRect(0, 0, this.w, this.h);
    }

    // 墨层:静态装饰整拷(随场景淡入淡出) → 实体按 y 升序盖印(近处盖住远处) → 动态小件
    vehSlot.set(this.decorSlot);
    vehAlpha.set(this.decorAlpha);
    if (this.decorFade < 1) {
      for (let i = 0; i < n; i++) vehAlpha[i] *= this.decorFade;
    }
    const ordered = state.entities.slice().sort((a, b) => a.y - b.y);
    for (const e of ordered) this.stampEntity(e, t);
    // 信号灯三格:亮当前相位,其余暗芯(只属于公路批次)
    if (this.scene === 'road') {
      const lampAlpha = [0.35, 0.35, 0.35];
      const lampSlots = [SLOT.TAIL, SLOT.GLASS, SLOT.GO];
      if (state.signal.phase === 'red') lampAlpha[0] = 1;
      else if (state.signal.phase === 'yellow') lampAlpha[1] = 1;
      else lampAlpha[2] = 1;
      for (let k = 0; k < 3; k++) {
        const i = this.signalLampCells[k];
        if (i < 0 || i >= n) continue;
        vehSlot[i] = lampSlots[k];
        vehAlpha[i] = lampAlpha[k];
      }
    }
    // 按喇叭的音符气泡
    for (const hn of state.honks) {
      this.stampOne(NOTE, hn.x, hn.y, 1, 1 - hn.age / hn.life, t);
    }

    // 分桶:基点 / 实体槽 / 尾流辉光 / 星,计数排序后逐桶一次 fillStyle
    const { bucketOf, bucketOrder, bucketCounts } = this;
    bucketCounts.fill(0);
    for (let i = 0; i < n; i++) {
      const col = i % cols;
      const row = (i / cols) | 0;
      const slot = vehSlot[i];
      let bucket: number;
      if (slot) {
        let v: number;
        if (slot === SLOT.DECOR) {
          v = vehAlpha[i]; // 装饰层烤死的浓淡,不做高频闪烁
        } else {
          v = clamp(vehAlpha[i], 0, 1); // 车体恒定:实心才有形状
        }
        bucket = slotBucket(slot) + clamp(Math.floor(v * LEVELS), 0, LEVELS - 1);
      } else {
        const en = energy[i];
        if (en > GLOW_THRESHOLD) {
          const level = clamp(Math.floor((en - GLOW_THRESHOLD) * 5.5), 0, LEVELS - 1);
          bucket = BUCKET_GLOW + level;
        } else {
          // 基点:大幅低频明暗带扫过全场,干净不乱闪;水面批次的水线两行叠波光
          let v = 0.5 + 0.09 * Math.sin(t * 0.4 + col * 0.045 + row * 0.032) + en * 1.6;
          if (this.scene === 'water' && (row === this.waterRows[0] || row === this.waterRows[1])) {
            v = Math.max(v, 0.3 + 0.26 * Math.sin(col * 0.32 - t * 1.5));
          }
          bucket = clamp(Math.floor(v * LEVELS), 0, LEVELS - 1);
        }
      }
      bucketOf[i] = bucket;
      bucketCounts[bucket]++;
    }
    const starts = new Int32Array(BUCKET_COUNT);
    for (let b = 1; b < BUCKET_COUNT; b++) starts[b] = starts[b - 1] + bucketCounts[b - 1];
    const cursor = starts.slice();
    for (let i = 0; i < n; i++) bucketOrder[cursor[bucketOf[i]]++] = i;

    const sizeDot = Math.max(2, Math.round(cw * 0.3));
    this.drawBucketRange(0, BUCKET_SLOT0, starts, sizeDot);
    this.drawBucketRange(BUCKET_SLOT0, BUCKET_GLOW, starts);
    // 辉光最后画:暗色 lighter 叠加发光,浅底退回正常合成(同 LightTrails 的换天逻辑)
    ctx.globalCompositeOperation = p.blend;
    this.drawBucketRange(BUCKET_GLOW, BUCKET_COUNT, starts, sizeDot);
    ctx.globalCompositeOperation = 'source-over';

    // 夜色矢量光:车灯锥 + 路灯光晕(能量场之外的一层柔光)
    if (p.night > 0.04) {
      const cell = cw;
      ctx.globalCompositeOperation = p.blend;
      ctx.globalAlpha = p.night;
      if (this.beamGradient) {
        ctx.fillStyle = this.beamGradient;
        for (const e of state.entities) {
          if (!BEAM_KINDS.has(e.kind)) continue;
          const sw = e.sprites[0].w * cell;
          const headX = e.dir === 1 ? e.x + sw : e.x;
          const headY = e.y + e.sprites[0].h * cell * 0.6;
          const len = cell * (e.kind === 'train' || e.kind === 'metro' ? 6 : 4.5);
          ctx.save();
          ctx.translate(headX, headY);
          ctx.scale(e.dir, 1);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(len, -cell * 1.6);
          ctx.lineTo(len, cell * 1.6);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
      if (this.lampGradient) {
        ctx.fillStyle = this.lampGradient;
        const r = cell * 4.4;
        for (const lx of this.bands.lampXs) {
          ctx.save();
          ctx.translate(lx + cell * 0.5, this.bands.streetY - 2);
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  /**
   * 画 [from, to) 号桶;桶号 → fillStyle 的映射与分桶端点一致。
   * 实体桶按槽位取尺寸:车体槽近实心方块,灯/装饰槽小点。
   */
  private drawBucketRange(from: number, to: number, starts: Int32Array, size?: number) {
    const { ctx, cols, cw, ch, offX, offY, bucketCounts, bucketOrder } = this;
    for (let b = from; b < to; b++) {
      const count = bucketCounts[b];
      if (!count) continue;
      let style: string;
      let s: number;
      if (b < BUCKET_SLOT0) {
        style = this.dotStyles[b];
        s = size ?? 2;
      } else if (b < BUCKET_GLOW) {
        style = this.vehStyles[b - BUCKET_SLOT0];
        const slot = Math.floor((b - BUCKET_SLOT0) / LEVELS) + 1;
        s = SOLID_SLOTS.has(slot) ? Math.max(3, Math.round(cw * 0.86)) : size ?? 3;
      } else {
        style = this.glowStyles[b - BUCKET_GLOW];
        s = size ?? 3;
      }
      ctx.fillStyle = style;
      const start = starts[b];
      for (let k = start; k < start + count; k++) {
        const i = bucketOrder[k];
        const col = i % cols;
        const row = (i / cols) | 0;
        ctx.fillRect(
          Math.round(col * cw + (cw - s) / 2 + offX[i]),
          Math.round(row * ch + (ch - s) / 2 + offY[i]),
          s,
          s,
        );
      }
    }
  }
}

/** 槽 s(1..7) → 桶区间 [BUCKET_SLOT0 + (s-1)*LEVELS, ...) */
function slotBucket(slot: number) {
  return BUCKET_SLOT0 + (slot - 1) * LEVELS;
}
