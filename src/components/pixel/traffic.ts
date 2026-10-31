/**
 * 侧视城市交通剖面模拟——**分批轮换制**:同一时刻只上演一个交通场景,
 * 公路(小车/大车/公交/摩托/自行车+信号灯) → 水运(货轮/小艇/浮标) →
 * 轨道(高铁+地铁) → 天空(客机/热气球/飞鸟),各批只出现自己的带,装饰层随场景淡入淡出。
 * 街道是真配时的信号灯:红灯排队、刹车灯亮起、绿灯放行;点信号灯可点击切换相位。
 * 灵动来自:快车借道超车、全车流横向蛇行、热气球斜向升空、浮标原地沉浮——而不是无来由的加减速。
 */

import {
  BIKE_FRAMES,
  BOAT,
  BUS,
  EXPRESS_CARS,
  MOTO_FRAMES,
  PLANE,
  SHIP,
  TRUCK,
  makeTrain,
  type Sprite,
} from './sprites';

export type EntityKind =
  | 'sedan'
  | 'sports'
  | 'bus'
  | 'truck'
  | 'moto'
  | 'bike'
  | 'train'
  | 'metro'
  | 'ship'
  | 'boat'
  | 'plane';

/** 场景批次:同一时刻只有一批在场 */
export type SceneKind = 'road' | 'water' | 'rail' | 'air';
const SCENE_ORDER: SceneKind[] = ['road', 'water', 'rail', 'air'];

export interface Entity {
  kind: EntityKind;
  /** 动画帧(二轮车轮辐交替;其余 kind 只有一帧) */
  sprites: Sprite[];
  frameHz: number;
  animT: number;
  /** 左上角 px;绘制时按 dir 水平翻转 */
  x: number;
  y: number;
  /** 当前速度(px/s);巡航速度在 cruise,方向看 dir */
  v: number;
  cruise: number;
  dir: 1 | -1;
  alpha: number;
  braking: boolean;
  /** 所属场景批次;未标记 = 常驻(云) */
  batch?: SceneKind;
  /** 场景切换后离场:驶出画面即移除,不再回绕 */
  retire?: boolean;
  /** 所在行车道:0 快速路上层(←) 1 快速路下层(→) 2 街道(→) 3 自行车道(→) */
  line?: number;
  /** 快速路子车道:-1 主道,+1 超车道(纵向错 1.6 格,借道超车用) */
  sublane?: -1 | 1;
  overtakeT?: number;
  /** 公交靠站 */
  dwell?: number;
  served?: boolean;
  stoppedT?: number;
  /** 悬架起伏基准 / 相位 / 车速噪声种子 / 摩托编织计时 */
  baseY?: number;
  bobPhase?: number;
  seed?: number;
  weaveT?: number;
  weaveLow?: boolean;
  /** 离场溶解:retire 起记录已逝时间,1.2s 内 alpha 线性归零后除名 */
  alpha0?: number;
  retireT?: number;
  /** 上一帧 x:尾迹沿 (prevX → x) 连续盖章,才是光带而不是散点 */
  prevX?: number;
}

export type SignalPhase = 'green' | 'yellow' | 'red';

export interface Honk {
  x: number;
  y: number;
  age: number;
  life: number;
}

export interface TrafficState {
  entities: Entity[];
  honks: Honk[];
  /** 当前场景批次与轮换倒计时;rev 在每次切换时 +1(引擎据此淡出/换装饰/淡入) */
  scene: { kind: SceneKind; t: number; rev: number };
  signal: { phase: SignalPhase; t: number };
  /** 相位刚切换的余量(s),引擎据此在灯头盖一圈涟漪 */
  signalFlash: number;
  /** 信号灯灯头世界坐标(点击命中与涟漪落点) */
  signalLampPos: { x: number; y: number };
  trainTimer: number;
  metroTimer: number;
  waterTimer: number;
  airTimer: number;
  time: number;
}

export interface Layout {
  w: number;
  h: number;
  cell: number;
  planeY: number;
  railY: number;
  /** 快速路两条行车道路面 [上层(←) 下层(→)] */
  exprY: [number, number];
  streetY: number;
  bikeY: number;
  waterY: number;
  tunnelY: number;
  stopX: number;
  busStopX: number;
  lampXs: number[];
}

export function buildLayout(w: number, h: number, cell: number): Layout {
  // 场景带整体压进下半屏(轨道从 0.46h 起):顶部留给文字,与 LightTrails 的
  // 车道安全区(0.55~0.93)同一套避让逻辑
  const railY = h * 0.46;
  // 自轨道到隧道底的纵向跨度需求(格),视口不够高时整体压缩
  const spanCells = 52;
  const gapScale = Math.min(1, Math.max(0.5, (h * 0.97 - railY) / (spanCells * cell)));
  const g = (c: number) => cell * c * gapScale;
  const exprUpper = railY + g(8.5);
  const exprLower = exprUpper + g(5.5);
  const streetY = exprLower + g(7.5);
  // 自行车带抬高:非机动车 7 格高,要给足与街道的净空
  const bikeY = streetY + g(8);
  const waterY = Math.min(h - cell * 8, bikeY + g(6));
  const tunnelY = Math.min(h * 0.92, waterY + g(9));
  return {
    w,
    h,
    cell,
    planeY: h * 0.075,
    railY,
    exprY: [exprUpper, exprLower],
    streetY,
    bikeY,
    waterY,
    tunnelY,
    stopX: w * (w < 640 ? 0.66 : 0.62),
    busStopX: w * (w < 640 ? 0.3 : 0.26),
    lampXs: (w < 640 ? [0.18, 0.82] : [0.14, 0.44, 0.82]).map((f) => w * f),
  };
}

export const spriteW = (sprite: Sprite, cell: number) => sprite.w * cell;
export const spriteH = (sprite: Sprite, cell: number) => sprite.h * cell;

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** 跟车参数(px):加速 55、制动 110——克制到「背景介质」该有的从容 */
const ACC = 55;
const BRAKE = 110;
/** 超车道相对主道的纵向错位(格) */
const SUBLANE_OFFSET = 1.6;

/** 各行车道的路缘 y */
function surfaceOf(line: number, layout: Layout) {
  return line === 0 ? layout.exprY[0] : line === 1 ? layout.exprY[1] : line === 2 ? layout.streetY : layout.bikeY;
}

function roadEntity(
  kind: EntityKind,
  sprites: Sprite[],
  layout: Layout,
  cell: number,
  line: number,
  cruise: number,
  alpha: [number, number],
  x: number,
  sublane: -1 | 1 = -1,
): Entity {
  const dir: 1 | -1 = line === 0 ? -1 : 1;
  const surface = surfaceOf(line, layout);
  return {
    kind,
    sprites,
    frameHz: kind === 'moto' ? 9 : kind === 'bike' ? 6 : 0,
    animT: Math.random() * 8,
    x,
    y: surface + (sublane === 1 ? -SUBLANE_OFFSET * cell : 0) - spriteH(sprites[0], cell),
    v: cruise,
    cruise,
    dir,
    alpha: rand(alpha[0], alpha[1]),
    braking: false,
    batch: 'road',
    line,
    sublane,
    baseY: surface + (sublane === 1 ? -SUBLANE_OFFSET * cell : 0) - spriteH(sprites[0], cell),
    bobPhase: Math.random() * Math.PI * 2,
    seed: Math.random() * 100,
    weaveT: kind === 'moto' ? rand(2.5, 6) : undefined,
    weaveLow: false,
  } as Entity;
}

/** 公路批次:每向主道 4 辆 + 超车道 2 辆;街道 4 轿车 + 公交 + 货车 + 摩托;自行车道 3 辆。
 *  全部从画面外排队驶入(向右行的排在左缘外,向左行的排在右缘外),入场自然成流。 */
function seedRoad(state: TrafficState, layout: Layout, cell: number): void {
  const entities = state.entities;
  // 每组等距加抖动排队,队伍全长略超一幅画布,首车很快入场、后续鱼贯跟进
  const queue = (i: number, n: number, dir: 1 | -1) => {
    const slot = (i + rand(0.2, 0.8)) * ((layout.w + 1100) / n);
    return dir === 1 ? -140 - slot : layout.w + 140 + slot;
  };

  for (const line of [0, 1] as const) {
    const dir: 1 | -1 = line === 0 ? -1 : 1;
    for (let j = 0; j < 4; j++) {
      entities.push(
        roadEntity(pick(['sedan', 'sedan', 'sports']) as 'sedan' | 'sports', [pick(EXPRESS_CARS)], layout, cell, line, rand(150, 225), [0.62, 0.95], queue(j, 4, dir)),
      );
    }
    for (let j = 0; j < 2; j++) {
      entities.push(
        roadEntity(pick(['sedan', 'sports']) as 'sedan' | 'sports', [pick(EXPRESS_CARS)], layout, cell, line, rand(190, 235), [0.62, 0.95], queue(j, 2, dir), 1),
      );
    }
  }
  entities.push(roadEntity('sedan', [pick(EXPRESS_CARS)], layout, cell, 2, rand(80, 110), [0.62, 0.9], queue(0, 7, 1)));
  entities.push(roadEntity('sedan', [pick(EXPRESS_CARS)], layout, cell, 2, rand(80, 110), [0.62, 0.9], queue(1, 7, 1)));
  entities.push(roadEntity('sedan', [pick(EXPRESS_CARS)], layout, cell, 2, rand(80, 110), [0.62, 0.9], queue(2, 7, 1)));
  entities.push(roadEntity('sedan', [pick(EXPRESS_CARS)], layout, cell, 2, rand(80, 110), [0.62, 0.9], queue(3, 7, 1)));
  entities.push(roadEntity('truck', [TRUCK], layout, cell, 2, rand(52, 70), [0.6, 0.85], queue(4, 7, 1)));
  entities.push(roadEntity('moto', MOTO_FRAMES, layout, cell, 2, rand(125, 160), [0.75, 0.95], queue(5, 7, 1)));
  const bus = roadEntity('bus', [BUS], layout, cell, 2, rand(55, 75), [0.65, 0.9], queue(6, 7, 1));
  bus.served = false;
  bus.dwell = rand(2.5, 4);
  entities.push(bus);
  entities.push(roadEntity('bike', BIKE_FRAMES, layout, cell, 3, rand(22, 34), [0.6, 0.8], queue(0, 3, 1)));
  entities.push(roadEntity('bike', BIKE_FRAMES, layout, cell, 3, rand(22, 34), [0.6, 0.8], queue(1, 3, 1)));
  entities.push(roadEntity('bike', BIKE_FRAMES, layout, cell, 3, rand(22, 34), [0.6, 0.8], queue(2, 3, 1)));
}

export function seedTraffic(layout: Layout, cell: number): TrafficState {
  const state: TrafficState = {
    entities: [],
    honks: [],
    scene: { kind: 'road', t: rand(18, 24), rev: 0 },
    signal: { phase: 'green', t: rand(8, 13) },
    signalFlash: 0,
    signalLampPos: { x: layout.stopX, y: layout.streetY - cell * 5 },
    trainTimer: 3.5,
    metroTimer: rand(9, 16),
    waterTimer: 1,
    airTimer: 1,
    time: 0,
  };
  seedRoad(state, layout, cell);
  return state;
}

/** 点击信号灯:红灯立转绿,绿/黄立即收黄转红 */
export function toggleSignal(state: TrafficState): void {
  if (state.signal.phase === 'red') {
    state.signal.phase = 'green';
    state.signal.t = rand(9, 14);
  } else {
    state.signal.phase = 'yellow';
    state.signal.t = 0.9;
  }
  state.signalFlash = 0.8;
}

/**
 * 步进整场。boost 是滚动加速系数(0..1)。
 */
export function stepTraffic(
  state: TrafficState,
  layout: Layout,
  cell: number,
  dt: number,
  boost: number,
): void {
  state.time += dt;
  const mul = 1 + boost * 1.8;
  const w = layout.w;

  // ── 场景轮换:切批时别批原地溶解离场(1.2s),装饰层由引擎淡出重烤 ──
  state.scene.t -= dt;
  if (state.scene.t <= 0) {
    const next = SCENE_ORDER[(SCENE_ORDER.indexOf(state.scene.kind) + 1) % SCENE_ORDER.length];
    state.scene = { kind: next, t: rand(17, 24), rev: state.scene.rev + 1 };
    for (const e of state.entities) {
      if (e.batch && e.batch !== next && !e.retire) {
        e.retire = true;
        e.alpha0 = e.alpha;
        e.retireT = 0;
      }
    }
    // 新批次的开场 spawn 别让观众等
    state.waterTimer = Math.min(state.waterTimer, 1);
    state.airTimer = Math.min(state.airTimer, 1);
    if (next === 'rail') {
      state.trainTimer = Math.min(state.trainTimer, 1.5);
      state.metroTimer = Math.min(state.metroTimer, 3);
    }
  }
  const scene = state.scene.kind;

  // ── 信号灯状态机(只在公路批次跑) ──
  if (scene === 'road') {
    state.signal.t -= dt;
    if (state.signal.t <= 0) {
      if (state.signal.phase === 'green') {
        state.signal.phase = 'yellow';
        state.signal.t = 1.3;
      } else if (state.signal.phase === 'yellow') {
        state.signal.phase = 'red';
        state.signal.t = rand(5, 8);
      } else {
        state.signal.phase = 'green';
        state.signal.t = rand(9, 14);
      }
      state.signalFlash = 0.5;
    }
  }
  if (state.signalFlash > 0) state.signalFlash -= dt;

  // ── 道路车辆:按 (线, 子车道) 分组做舒适间距软跟车 ──
  const groups = new Map<string, Entity[]>();
  for (const e of state.entities) {
    if (e.line === undefined) continue;
    const key = `${e.line}:${e.sublane === 1 ? 1 : 0}`;
    const list = groups.get(key) ?? [];
    list.push(e);
    groups.set(key, list);
  }
  for (const list of groups.values()) list.sort((a, b) => a.x - b.x);
  const groupOf = (e: Entity) => groups.get(`${e.line}:${e.sublane === 1 ? 1 : 0}`)!;
  /** 某组内「位于 e 前方」的最小间距(不含 e 自己) */
  const gapAheadIn = (arr: Entity[], e: Entity, ew: number, lineDir: 1 | -1) => {
    let min = Infinity;
    for (const o of arr) {
      if (o === e) continue;
      const ow = spriteW(o.sprites[0], cell);
      const gap = lineDir === 1 ? o.x - (e.x + ew) : e.x - (o.x + ow);
      if (gap >= 0 && gap < min) min = gap;
    }
    return min;
  };

  for (let i = state.entities.length - 1; i >= 0; i--) {
    const e = state.entities[i];
    // 离场溶解:1.2s 内原地淡去,不依赖驶出画面(慢船离场要爬一分钟,那才叫不丝滑)
    if (e.retire) {
      e.retireT! += dt;
      e.alpha = (e.alpha0 ?? 1) * Math.max(0, 1 - e.retireT! / 1.2);
      if (e.retireT! >= 1.2) {
        state.entities.splice(i, 1);
        continue;
      }
    }
    const sw = e.sprites[0];
    const ew = spriteW(sw, cell);

    if (e.line !== undefined) {
      const lineDir = e.line === 0 ? -1 : 1;
      const prevX = e.x;
      // 车速自然漂移:小幅慢频,只让车流不死板,不制造无来由的加减速
      const wobble =
        1 + 0.05 * Math.sin(state.time * 0.35 + e.seed!) + 0.025 * Math.sin(state.time * 0.11 + e.seed! * 2.7);
      let vTarget = e.cruise * mul * wobble;

      // 同组前车:舒适间距软跟车——间距充裕时不干预,逼近时按距离线性渐减,永不追尾
      const mates = groupOf(e);
      const idx = mates.indexOf(e);
      const leader = lineDir === 1 ? mates[idx + 1] : mates[idx - 1];
      const minGap = cell * 1.6;
      if (leader) {
        const lw = spriteW(leader.sprites[0], cell);
        const gap = lineDir === 1 ? leader.x - (e.x + ew) : e.x - (leader.x + lw);
        const desired = minGap + e.v * 0.45;
        if (gap < desired) {
          vTarget = Math.min(vTarget, Math.max(0, leader.v + (gap - minGap) * 1.6));
        }
      }

      const front = lineDir === 1 ? e.x + ew : e.x;

      // 借道超车:快速路小客车被前车压住、超车道前方有空档时,变道超过去再回来
      if (e.line <= 1 && (e.kind === 'sedan' || e.kind === 'sports')) {
        if (e.sublane === 1) {
          e.overtakeT! -= dt;
          if (e.overtakeT! <= 0) {
            const mainArr = groups.get(`${e.line}:0`) ?? [];
            const clear = gapAheadIn(mainArr, e, ew, lineDir) > minGap + cell * 1.5;
            if (clear) e.sublane = -1;
            else e.overtakeT = rand(1, 2.2);
          }
        } else if (leader && leader.v < e.cruise - 18 && Math.random() < dt * 0.5) {
          const overArr = groups.get(`${e.line}:1`) ?? [];
          const clear = gapAheadIn(overArr, e, ew, lineDir) > minGap + cell * 2;
          if (clear) {
            e.sublane = 1;
            e.overtakeT = rand(3, 6);
          }
        }
        // 子车道纵向归位(超车道抬高 1.6 格)
        const surface = surfaceOf(e.line, layout);
        const targetBase = surface + (e.sublane === 1 ? -SUBLANE_OFFSET * cell : 0) - spriteH(sw, cell);
        e.baseY! += (targetBase - e.baseY!) * Math.min(1, dt * 2.2);
      }

      // 摩托在机动车道与自行车道之间来回编织(自行车近旁时不上自行车道)
      if (e.kind === 'moto' && e.line === 2) {
        e.weaveT! -= dt;
        if (e.weaveT! <= 0) {
          e.weaveLow = !e.weaveLow;
          e.weaveT = rand(3, 7);
        }
        const bikeNear = state.entities.some(
          (o) => o.kind === 'bike' && Math.abs(o.x - e.x) < cell * 6,
        );
        const surface = e.weaveLow && !bikeNear ? layout.bikeY : layout.streetY;
        const targetTop = surface - spriteH(sw, cell);
        e.baseY! += (targetTop - e.baseY!) * Math.min(1, dt * 1.8);
      }

      // 街道:信号灯停车线(黄灯按能否刹住决定通过)
      if (e.line === 2) {
        const distStop = layout.stopX - front;
        const canClear = e.v * e.v / (2 * BRAKE) > distStop;
        const mustStop =
          state.signal.phase === 'red' || (state.signal.phase === 'yellow' && !canClear);
        if (mustStop && distStop > -cell) {
          vTarget = Math.min(vTarget, Math.max(0, distStop * 2.2));
          if (vTarget < 3 && distStop < cell) {
            e.v = 0;
            e.stoppedT = (e.stoppedT ?? 0) + dt;
            // 等急了按喇叭(气泡音符)
            if (
              e.stoppedT > 2.5 &&
              state.honks.length < 2 &&
              Math.random() < dt * 0.5
            ) {
              state.honks.push({ x: e.x + ew / 2, y: e.y - 4, age: 0, life: 1.3 });
              e.stoppedT = 0;
            }
          }
        } else {
          e.stoppedT = 0;
        }
      }

      // 公交靠站:减速 → 停稳开门(dwell) → 出站,之后照常吃信号
      if (e.kind === 'bus' && e.line === 2 && !e.served) {
        const distStop = layout.busStopX - front;
        if (e.dwell !== undefined && e.dwell > 0) {
          e.dwell -= dt;
          vTarget = 0;
          e.v = 0;
        } else if (distStop < cell * 4) {
          vTarget = Math.min(vTarget, Math.max(0, distStop * 2));
          if (distStop <= 3 && e.v < 2) e.dwell = rand(2.5, 4);
        }
      }

      // 积分:加速/制动 + 位置推进;制动即刹车灯
      e.braking = vTarget < e.v - 6;
      e.v += Math.max(-BRAKE * dt, Math.min(ACC * dt, vTarget - e.v));
      e.v = Math.max(0, e.v);
      e.x += e.v * lineDir * dt;
      // 兜底硬钳:软跟车理论拦得住,这里只防极端情况
      if (leader) {
        const lw = spriteW(leader.sprites[0], cell);
        const hold = minGap * 0.4;
        if (lineDir === 1 && e.x + ew > leader.x - hold) {
          e.x = leader.x - ew - hold;
          e.v = Math.min(e.v, leader.v);
        }
        if (lineDir === -1 && e.x < leader.x + lw + hold) {
          e.x = leader.x + lw + hold;
          e.v = Math.min(e.v, leader.v);
        }
      }
      // 横向蛇行:整条车流沿各自车道缓缓摆动,直线也有游动感
      const amp = e.kind === 'bike' ? 0.12 : e.kind === 'moto' ? 0.16 : 0.22;
      e.y = e.baseY! + Math.sin(state.time * 0.55 + e.bobPhase!) * amp * cell;
      // 回绕:离场批驶出即除名,在场批从对侧重来(公交重新待靠站)
      const off =
        (lineDir === 1 && e.x > w + 80) || (lineDir === -1 && e.x + ew < -80);
      if (off) {
        if (e.retire) {
          state.entities.splice(i, 1);
          continue;
        }
        if (lineDir === 1) {
          e.x = -ew - 80 - Math.random() * 500;
          if (e.kind === 'bus') {
            e.served = false;
            e.dwell = undefined;
          }
        } else {
          e.x = w + 80 + Math.random() * 500;
        }
      }
      e.animT += dt * (1 + e.v / 90);
      e.prevX = Math.abs(e.x - prevX) > 300 ? e.x : prevX;
      continue;
    }

    // ── 非道路实体 ──
    switch (e.kind) {
      case 'ship':
      case 'boat': {
        e.x += e.v * e.dir * mul * dt;
        e.y = e.baseY! + Math.sin(state.time * 0.7 + e.bobPhase!) * cell * 0.22;
        if (!e.retire) {
          if (e.dir === 1 && e.x > w + 80) e.x = -ew - 80;
          if (e.dir === -1 && e.x + ew < -80) e.x = w + 80;
        }
        break;
      }
      case 'plane': {
        e.x += e.v * e.dir * mul * dt;
        // 高度缓慢起伏,像在柔缓的气流里
        e.y = e.baseY! + Math.sin(state.time * 0.3 + e.bobPhase!) * cell * 0.8;
        if (!e.retire) {
          if (e.dir === 1 && e.x > w + 120) e.x = -ew - 120 - Math.random() * 600;
          if (e.dir === -1 && e.x + ew < -120) e.x = w + 120 + Math.random() * 600;
        }
        break;
      }
      case 'train':
      case 'metro': {
        e.x += e.v * e.dir * mul * dt;
        const off = (e.dir === 1 && e.x > w + 100) || (e.dir === -1 && e.x + ew < -100);
        if (off && !e.retire) {
          state.entities.splice(i, 1);
          if (e.kind === 'train') state.trainTimer = rand(3, 9);
          else state.metroTimer = rand(4, 10);
        }
        break;
      }
      default:
        break;
    }
    if (e.kind === 'ship' || e.kind === 'boat' || e.kind === 'plane') {
      e.prevX = Math.abs(e.x - (e.prevX ?? e.x)) > 300 ? e.x : (e.prevX ?? e.x);
    }
  }

  // ── 各批次 spawn ──
  if (scene === 'road') {
    if (!state.entities.some((e) => e.batch === 'road')) seedRoad(state, layout, cell);
  }
  if (scene === 'water') {
    state.waterTimer -= dt;
    if (state.entities.filter((e) => e.batch === 'water').length < 3 && state.waterTimer <= 0) {
      state.waterTimer = rand(2.5, 5);
      const small = Math.random() < 0.45;
      const sprite = small ? BOAT : SHIP;
      state.entities.push({
        kind: small ? 'boat' : 'ship',
        sprites: [sprite],
        frameHz: 0,
        animT: 0,
        x: Math.random() < 0.5 ? -spriteW(sprite, cell) - 60 : layout.w + 60,
        y: layout.waterY - spriteH(sprite, cell) + cell * (small ? 1 : 2) + rand(-1.2, 0.8) * cell,
        v: small ? rand(14, 22) : rand(9, 15),
        cruise: small ? rand(14, 22) : rand(9, 15),
        dir: Math.random() < 0.5 ? 1 : -1,
        alpha: small ? 0.7 : 0.8,
        braking: false,
        batch: 'water',
        baseY: 0,
        bobPhase: Math.random() * Math.PI * 2,
      });
      const e = state.entities[state.entities.length - 1];
      e.baseY = e.y;
    }
  }
  if (scene === 'rail') {
    if (!state.entities.some((e) => e.batch === 'rail' && e.kind === 'train')) {
      state.trainTimer -= dt;
      if (state.trainTimer <= 0) {
        const sprite = makeTrain('hsr');
        const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
        state.entities.push({
          kind: 'train',
          sprites: [sprite],
          frameHz: 0,
          animT: 0,
          x: dir === 1 ? -spriteW(sprite, cell) - 80 : layout.w + 80,
          y: layout.railY - spriteH(sprite, cell),
          v: rand(240, 320),
          cruise: rand(240, 320),
          dir,
          alpha: 0.95,
          braking: false,
          batch: 'rail',
        });
      }
    }
    if (!state.entities.some((e) => e.batch === 'rail' && e.kind === 'metro')) {
      state.metroTimer -= dt;
      if (state.metroTimer <= 0) {
        const sprite = makeTrain('metro');
        const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
        state.entities.push({
          kind: 'metro',
          sprites: [sprite],
          frameHz: 0,
          animT: 0,
          x: dir === 1 ? -spriteW(sprite, cell) - 80 : layout.w + 80,
          y: layout.tunnelY - spriteH(sprite, cell),
          v: rand(130, 180),
          cruise: rand(130, 180),
          dir,
          alpha: 0.9,
          braking: false,
          batch: 'rail',
        });
      }
    }
  }
  if (scene === 'air') {
    const planes = state.entities.filter((e) => e.kind === 'plane');
    state.airTimer -= dt;
    if (planes.length < 2 && state.airTimer <= 0) {
      state.airTimer = rand(3, 7);
      const dir: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
      state.entities.push({
        kind: 'plane',
        sprites: [PLANE],
        frameHz: 0,
        animT: 0,
        x: dir === 1 ? -spriteW(PLANE, cell) - 120 : layout.w + 120,
        y: layout.planeY + rand(-1.5, 3) * cell - spriteH(PLANE, cell) * 0.5,
        v: rand(46, 70),
        cruise: rand(46, 70),
        dir,
        alpha: 0.55,
        braking: false,
        batch: 'air',
        baseY: 0,
        bobPhase: Math.random() * Math.PI * 2,
      });
      const e = state.entities[state.entities.length - 1];
      e.baseY = e.y;
    }
  }

  // ── 喇叭气泡老化 ──
  for (const hn of state.honks) {
    hn.age += dt;
    hn.y -= 16 * dt;
  }
  state.honks = state.honks.filter((hn) => hn.age < hn.life);
}
