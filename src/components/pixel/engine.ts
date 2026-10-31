/**
 * 像素引擎的接线层:固定步长循环(1/60、至多补 4 步)、指针追踪、点击涟漪与
 * 信号灯交互、列车/地铁活塞风、流星尾迹、信号灯换相涟漪、主题换色 0.6s 插值、
 * reduced-motion 静帧、可见性与背景形态门控。
 * 生命周期契约与 LightTrails 一致:ResizeObserver 跟随画布真实尺寸、DPR 上限 1.5、
 * 窗口级 pointer 监听(画布本身 pointer-events-none)、隐藏层不跑循环。
 * 循环结构参考 stackedlol/ascii-sharks 的 OceanEngine。
 */

import { isBgModeActive, BG_MODE_EVENT } from '@/lib/bgmode';
import { PixelField, readPixelPalette, type PixelPalette, type Pointer, type RGB } from './renderer';
import {
  buildLayout,
  seedTraffic,
  stepTraffic,
  toggleSignal,
  type Layout,
  type TrafficState,
} from './traffic';

const STEP = 1 / 60;
const MAX_STEPS = 4;
/** 画布换色的时长,与 :root 上 @property 颜色的 0.6s 涟漪对齐 */
const THEME_LERP_S = 0.6;

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(mix(a[0], b[0], t)),
  Math.round(mix(a[1], b[1], t)),
  Math.round(mix(a[2], b[2], t)),
];
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function mixPalette(a: PixelPalette, b: PixelPalette, t: number): PixelPalette {
  return {
    dot: mixRgb(a.dot, b.dot, t),
    body: mixRgb(a.body, b.body, t),
    bodyDim: mixRgb(a.bodyDim, b.bodyDim, t),
    accent: mixRgb(a.accent, b.accent, t),
    head: mixRgb(a.head, b.head, t),
    tail: mixRgb(a.tail, b.tail, t),
    go: mixRgb(a.go, b.go, t),
    field: mixRgb(a.field, b.field, t),
    grid: mixRgb(a.grid, b.grid, t),
    gridAlpha: mix(a.gridAlpha, b.gridAlpha, t),
    glowAlpha: mix(a.glowAlpha, b.glowAlpha, t),
    vignetteAlpha: mix(a.vignetteAlpha, b.vignetteAlpha, t),
    alphaScale: mix(a.alphaScale, b.alphaScale, t),
    night: mix(a.night, b.night, t),
    // 合成模式无法插值,过半切到目标主题
    blend: t < 0.5 ? a.blend : b.blend,
  };
}

export function mountPixelEngine(canvas: HTMLCanvasElement | null): () => void {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  let field: PixelField | null = null;
  let layout: Layout | null = null;
  let traffic: TrafficState | null = null;
  let raf = 0;
  let running = false;
  let last = performance.now();
  let acc = 0;
  let sized = false;
  // 视口 CSS 尺寸(pointer 命中判定用;canvas.width 是设备像素,别比错对象)
  let viewW = 0;
  let viewH = 0;
  // 滚动耦合:滚得越快车流越快,系数平滑回落——与 LightTrails 同一套体感
  let lastScrollY = window.scrollY;
  let boost = 0;
  // 调色板三态:from/to 是插值端点;themeT = 1 表示已落位
  let pal = readPixelPalette();
  let palFrom = pal;
  let palTo = pal;
  let themeT = 1;
  // 场景切换:装饰层淡出 → 重烤新场景 → 淡入(0.55s × 2)
  let appliedRev = -1;
  let decorFadePhase: 'out' | 'in' | null = null;
  let decorFade = 1;
  const pointer: Pointer = { x: 0, y: 0, px: 0, py: 0, active: false };

  const applyPalette = (t: number) => {
    pal = mixPalette(palFrom, palTo, t);
    field?.setPalette(pal);
  };

  const sync = () => {
    const should = sized && !reduced.matches && !document.hidden && isBgModeActive('pixel');
    if (should && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!should && running) {
      running = false;
      cancelAnimationFrame(raf);
    }
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 50 || rect.height < 50) {
      // 背景层藏起来时视口坍缩为 0,保持旧尺寸、停循环,等重新可见再续
      sized = false;
      sync();
      return;
    }
    sized = true;
    viewW = rect.width;
    viewH = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    if (!field) field = new PixelField(ctx, pal);
    field.resize(rect.width, rect.height, dpr);
    layout = buildLayout(rect.width, rect.height, field.cell);
    traffic = seedTraffic(layout, field.cell);
    field.scene = traffic.scene.kind;
    field.setBands(layout, traffic.scene.kind);
    field.decorFade = 1;
    appliedRev = traffic.scene.rev;
    decorFade = 1;
    decorFadePhase = null;
    if (reduced.matches) drawStill();
    sync();
  };

  const stepWorld = (dt: number) => {
    if (!field || !layout || !traffic) return;
    stepTraffic(traffic, layout, field.cell, dt, boost);

    // 指针划过的地方盖一路尾光(只在移动段上,不动不盖)
    if (pointer.active) {
      const d = Math.hypot(pointer.x - pointer.px, pointer.y - pointer.py);
      if (d > 2) {
        const steps = Math.min(8, Math.ceil(d / (field.cell * 0.8)));
        for (let s = 1; s <= steps; s++) {
          field.stampEnergy(
            pointer.px + ((pointer.x - pointer.px) * s) / steps,
            pointer.py + ((pointer.y - pointer.py) * s) / steps,
            1,
            0.07,
          );
        }
      }
    }

    for (const e of traffic.entities) {
      if (e.retire) continue; // 溶解中的实体不再产尾流,光带随它一起淡去
      field.depositEntity(e);
    }

    // 活塞风:列车/地铁把轨道沿线的点阵顺行进方向吹一波(地铁在隧道里,风圈更大)
    for (const e of traffic.entities) {
      if (e.kind !== 'train' && e.kind !== 'metro') continue;
      const sprite = e.sprites[0];
      const w = sprite.w * field.cell;
      const cy = e.y + sprite.h * field.cell * 0.5;
      const radius = e.kind === 'metro' ? 4 : 3;
      for (let px = e.x + field.cell; px < e.x + w; px += field.cell * 3) {
        field.gust(px, cy, radius, e.dir * (e.kind === 'metro' ? 130 : 95) * dt * 60);
      }
    }

    // 信号灯换相:灯头位置一圈小涟漪,配时变化肉眼可见
    if (traffic.signalFlash > 0) {
      field.stampEnergy(traffic.signalLampPos.x, traffic.signalLampPos.y, 2, 0.18);
    }

    field.step(dt, pointer);
    pointer.px = pointer.x;
    pointer.py = pointer.y;
  };

  const frame = (now: number) => {
    if (!running) return;
    const fdt = Math.min(0.1, Math.max(0.001, (now - last) / 1000));
    last = now;
    if (themeT < 1) {
      // 目标调色板过渡期内每帧重读:CSS @property 涟漪在并行推进,读到哪追到哪,
      // 事件分发时机再偏也不会把中间值钉死成终点
      palTo = readPixelPalette();
      themeT = Math.min(1, themeT + fdt / THEME_LERP_S);
      applyPalette(easeInOut(themeT));
    }
    const sy = window.scrollY;
    const vPx = Math.abs(sy - lastScrollY) / fdt;
    lastScrollY = sy;
    boost += (Math.min(1, vPx / 1400) - boost) * Math.min(1, fdt * 3.5);

    // 场景切换时间线:旧装饰淡出 → 重烤 → 新装饰淡入
    if (field && traffic && layout) {
      if (traffic.scene.rev !== appliedRev && decorFadePhase === null) decorFadePhase = 'out';
      if (decorFadePhase === 'out') {
        decorFade = Math.max(0, decorFade - fdt / 0.55);
        if (decorFade <= 0) {
          field.setBands(layout, traffic.scene.kind);
          field.scene = traffic.scene.kind;
          appliedRev = traffic.scene.rev;
          decorFadePhase = 'in';
        }
      } else if (decorFadePhase === 'in') {
        decorFade = Math.min(1, decorFade + fdt / 0.55);
        if (decorFade >= 1) decorFadePhase = null;
      }
      field.decorFade = decorFade;
    }

    acc += fdt;
    let steps = 0;
    while (acc >= STEP && steps < MAX_STEPS) {
      stepWorld(STEP);
      acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) acc = 0;

    if (field && traffic) field.render(traffic.time, traffic);
    raf = requestAnimationFrame(frame);
  };

  /** reduced-motion:种子铺好后画一帧就停,不进循环 */
  const drawStill = () => {
    if (!field || !traffic || !layout) return;
    for (let i = 0; i < 60; i++) {
      stepTraffic(traffic, layout, field.cell, STEP, 0);
      for (const e of traffic.entities) {
        if (e.retire) continue; // 溶解中的实体不再产尾流,光带随它一起淡去
        field.depositEntity(e);
      }
    }
    field.render(traffic.time, traffic);
  };

  const toLocal = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerMove = (e: PointerEvent) => {
    const { x, y } = toLocal(e);
    pointer.x = x;
    pointer.y = y;
    // 触屏不追指针:滚动是主角,拨点留给精确指针
    pointer.active =
      e.pointerType !== 'touch' && x >= 0 && y >= 0 && x <= viewW && y <= viewH;
    if (!pointer.px && !pointer.py) {
      pointer.px = x;
      pointer.py = y;
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (reduced.matches || !field || !traffic || !isBgModeActive('pixel')) return;
    const el = e.target as Element | null;
    if (el && el.closest('a, button, [data-cursor-label]')) return;
    const { x, y } = toLocal(e);
    // 点在信号灯灯头附近 = 切相位(交通工程师的玩具,只在公路批次有灯),否则一圈涟漪
    const lamp = traffic.signalLampPos;
    if (
      traffic.scene.kind === 'road' &&
      Math.hypot(x - lamp.x, y - lamp.y) < field.cell * 3.2
    ) {
      toggleSignal(traffic);
      field.stampEnergy(lamp.x, lamp.y, 2, 0.6);
      return;
    }
    field.splash(x, y);
  };

  const onPointerLeave = () => {
    pointer.active = false;
  };

  const onThemeChange = () => {
    palTo = readPixelPalette();
    if (reduced.matches) {
      pal = palTo;
      palFrom = palTo;
      themeT = 1;
      field?.setPalette(pal);
      drawStill();
      return;
    }
    // 从当前混合态出发重新插值:连点两下也不跳变
    palFrom = pal;
    themeT = 0;
  };

  const onMotionPreference = () => {
    if (reduced.matches) {
      running = false;
      cancelAnimationFrame(raf);
      drawStill();
    } else {
      sync();
    }
  };

  const onVisibility = () => sync();
  const onBgMode = () => sync();
  const canvasObserver = new ResizeObserver(() => resize());
  canvasObserver.observe(canvas);
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  document.documentElement.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('blur', onPointerLeave);
  window.addEventListener('luzzz-themechange', onThemeChange);
  window.addEventListener(BG_MODE_EVENT, onBgMode);
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onMotionPreference);

  resize();

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    canvasObserver.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerdown', onPointerDown);
    document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    window.removeEventListener('blur', onPointerLeave);
    window.removeEventListener('luzzz-themechange', onThemeChange);
    window.removeEventListener(BG_MODE_EVENT, onBgMode);
    document.removeEventListener('visibilitychange', onVisibility);
    reduced.removeEventListener('change', onMotionPreference);
  };
}
