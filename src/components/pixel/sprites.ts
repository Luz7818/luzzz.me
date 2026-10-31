/**
 * 侧视像素交通图(车头一律朝右,dir = -1 时由渲染器水平翻转)。
 * 每张图是等宽字符串位图,字符 → 色槽:
 *   .  空        B  车体(亮)     D  玻璃/结构/暗部
 *   W  点灯面(强调色:列车/公交/客机的车窗与舷窗,夜里是亮着的窗)
 *   H  前灯(暖白)  R  尾灯(红)
 * 二轮车带双帧(轮辐交替),列车/云/月由生成器拼装。
 * 灵感致谢:stackedlol/ascii-sharks(点阵生物 + 指针扰动的呈现方式)。
 */

export const SLOT = {
  NONE: 0,
  BODY: 1,
  DARK: 2,
  GLASS: 3,
  HEAD: 4,
  TAIL: 5,
  DECOR: 6,
  GO: 7,
} as const;

export interface Sprite {
  w: number;
  h: number;
  /** 行主序,长度 = w * h,值为 SLOT */
  cells: Uint8Array;
}

const CHAR_SLOT: Record<string, number> = {
  B: SLOT.BODY,
  D: SLOT.DARK,
  W: SLOT.GLASS,
  H: SLOT.HEAD,
  R: SLOT.TAIL,
};

function fromBitmap(rows: string[]): Sprite {
  const h = rows.length;
  const w = rows[0].length;
  const cells = new Uint8Array(w * h);
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      cells[r * w + c] = CHAR_SLOT[rows[r][c]] ?? SLOT.NONE;
    }
  }
  return { w, h, cells };
}

/** 水平镜像并 H→R(车头图翻成车尾图:头灯变尾灯) */
function mirror(rows: string[]): string[] {
  return rows.map((row) => [...row].reverse().join('').replace(/H/g, 'R'));
}

// ── 小客车:车窗用暗色玻璃(D),点灯面留给公共交通 ────────────────────────

const SEDAN_A = fromBitmap([
  '..DDDDDD.....',
  '.DDDDDDDDD...',
  'RBBBBBBBBBDHH',
  '.DD.....DD...',
]);

const SEDAN_B = fromBitmap([
  '..DDDDDD...',
  '.DDDDDDDD..',
  'RBBBBBBBDHH',
  '.DD....DD..',
]);

const SPORTS = fromBitmap([
  '...DDDDDD...',
  '..DDDDDDD...',
  'RBBBBBBBBHHH',
  '.DD.....DD..',
]);

/** 快速路只用小客车(≤4 行高),保证双向车流不重叠 */
export const EXPRESS_CARS = [SEDAN_A, SEDAN_B, SPORTS];

// ── 公交 / 货车(街道路面,5 行高) ─────────────────────────────────────

const BUS = fromBitmap([
  '.DDDDDDDDDDDDDDDDDD.',
  '.DWWWWWWWWWWWWWWWWD.',
  'RDBBBBBBBBBBBBWWBBHH',
  '.DBBBBBBBBBBBBBBBBD.',
  '.DD...DD....DD......',
]);

const TRUCK = fromBitmap([
  '...DDDDDDDDDDDD...',
  '.DBBBBBBBBBBBBD...',
  'RDBBBBBBBBBBBBDWBH',
  'RDBBBBBBBBBBBBDWBH',
  '.DD....DD....DD...',
]);

// ── 二轮:带骑手的完整侧视(车轮/车架/人体),双帧轮辐 ────────────────────

const BIKE_F1 = fromBitmap([
  '.......DD...',
  '.....DDD....',
  '...DD...DD..',
  '...D.BBB.D..',
  '.DDD.B..DDD.',
  '.D.D.BB.D.D.',
  '.DDD....DDD.',
]);
const BIKE_F2 = fromBitmap([
  '.......DD...',
  '.....DDD....',
  '...DD...DD..',
  '...D.BBB.D..',
  '.DDD.B..DDD.',
  '.D.D..BB.D.D',
  '.DDD....DDD.',
]);

const MOTO_F1 = fromBitmap([
  '......DD.....',
  '....DDDD.....',
  '...DD....DD..',
  '..D.BBBBB..H.',
  '.DDD.BBB.DDD.',
  '.D.D.BB..D.D.',
  '.DDD.....DDD.',
]);
const MOTO_F2 = fromBitmap([
  '......DD.....',
  '....DDDD.....',
  '...DD....DD..',
  '..D.BBBBB..H.',
  '.DDD.BBB.DDD.',
  '.D.D..BB.D.D.',
  '.DDD.....DDD.',
]);

export const MOTO_FRAMES = [MOTO_F1, MOTO_F2];
export const BIKE_FRAMES = [BIKE_F1, BIKE_F2];
export { BUS, TRUCK, SEDAN_A, SEDAN_B, SPORTS };

// ── 轨道:长编组列车(压场主角) ────────────────────────────────────────

const HSR_BODY = [
  'DDDDDDDDDDDD',
  'DBWWWWWWWWBD',
  'DBWWWWWWWWBD',
  'DBBBBBBBBBBD',
  '.DD..DD..DD.',
];

const HSR_NOSE = [
  '......DDDDD.....',
  '....DDBBBBBBDD..',
  '..DDBWWWWWWWBBD.',
  '.DBBWWWWWWWWWBDH',
  '..DD.DD...DD.DD.',
];

const METRO_BODY = [
  'DDDDDDDDDDDD',
  'DBWWWWWWWWBD',
  'DWWWWWWWWWWB',
  'DBBBBBBBBBBD',
  '.DD..DD..DD.',
];

const METRO_NOSE = [
  '.DDDDDDDDDD..',
  'DBWWWWWWWWWWD',
  'DWWWWWWWWWWWD',
  'RDBBBBBBBBBBD',
  '.DD..DD..DD..',
];

export function makeTrain(kind: 'hsr' | 'metro'): Sprite {
  const nose = kind === 'hsr' ? HSR_NOSE : METRO_NOSE;
  const body = kind === 'hsr' ? HSR_BODY : METRO_BODY;
  const cars = kind === 'hsr' ? 6 : 4;
  const units = [nose, ...Array.from({ length: cars - 2 }, () => body), mirror(nose)];
  const gap = 1;
  const w = units.reduce((sum, u) => sum + u[0].length, 0) + gap * (units.length - 1);
  const h = units[0].length;
  const cells = new Uint8Array(w * h);
  let col = 0;
  for (let u = 0; u < units.length; u++) {
    const uw = units[u][0].length;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < uw; c++) {
        cells[r * w + col + c] = CHAR_SLOT[units[u][r][c]] ?? SLOT.NONE;
      }
    }
    col += uw + (u < units.length - 1 ? gap : 0);
  }
  return { w, h, cells };
}

// ── 水运:集装箱货轮(艉楼在左、船艏在右) ─────────────────────────────

const SHIP = fromBitmap([
  '.DD.......................',
  '.DBD......................',
  '.DBWD..DDD.DDD.DDD.DDD.DD.',
  '.DBWD..DDDDDDDDDDDDDDDD...',
  '.DBWDDDDDDDDDDDDDDDDDDD...',
  'DDDDDDDDDDDDDDDDDDDDDDDDDD',
  '.DBBBBBBBBBBBBBBBBBBBBBBB.',
  '..DBBBBBBBBBBBBBBBBBBBBBDD',
  '...DDDDDDDDDDDDDDDDDDDDDD.',
]);

export { SHIP };

// ── 天空:客机 / 云 / 飞鸟 ────────────────────────────────────────────

const PLANE = fromBitmap([
  '.......DD...............',
  '.......DDB..............',
  '.DDDDDDDBB..............',
  '..DBBBBBBBBBBBBBBBBBBBHH',
  '....DWWBWWBWWBWWBWWBBD..',
  '......DDBB......DDB.....',
  '.......D.........D......',
]);

export { PLANE };

// ── 水运批次:小艇 + 浮标(原地沉浮的纵向运动) ────────────────────────

const BOAT = fromBitmap([
  '..DD...',
  '.DBWD..',
  '.DBBD..',
  'DBBBBBD',
  '.DDDDD.',
]);

export { BOAT };

// ── 喇叭气泡:按捺不住的音符 ──────────────────────────────────────────

const NOTE = fromBitmap([
  '..H.',
  '..H.',
  '..H.',
  '.HH.',
  'HHH.',
]);

export { NOTE };
