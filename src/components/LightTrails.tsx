'use client';

import { useEffect, useRef } from 'react';

type Car = {
  lane: number;
  x: number;
  speed: number;
  dir: 1 | -1;
  warm: boolean;
  tail: number;
  alpha: number;
};

type RGB = [number, number, number];

/** 一次绘制所需的全部颜色与合成参数,全部来自当前主题的 CSS 变量 */
type Palette = {
  primary: RGB;
  secondary: RGB;
  fade: RGB;
  sky: RGB;
  glow: RGB;
  head: RGB;
  glowAlpha: number;
  vignetteAlpha: number;
  alphaScale: number;
  blend: GlobalCompositeOperation;
};

const LANES = [0.55, 0.66, 0.79, 0.93];
/** 窄屏上文字块更靠下,车道整体下移避开正文 */
const LANES_NARROW = [0.68, 0.78, 0.88, 0.96];

/** 画布换天的时长,与 :root 上 @property 颜色的 0.6s 涟漪对齐 */
const THEME_LERP_S = 0.6;

function readVar(name: string, fallback: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function parseRgb(raw: string, fallback: RGB): RGB {
  const parts = raw.split(',').map((n) => Number.parseFloat(n.trim()));
  return parts.length === 3 && parts.every((n) => Number.isFinite(n))
    ? [parts[0], parts[1], parts[2]]
    : fallback;
}

function readPalette(): Palette {
  return {
    primary: parseRgb(readVar('--trail-primary', '245,168,60'), [245, 168, 60]),
    secondary: parseRgb(readVar('--trail-secondary', '208,224,240'), [208, 224, 240]),
    fade: parseRgb(readVar('--trail-fade', '10,16,22'), [10, 16, 22]),
    sky: parseRgb(readVar('--trail-sky', '17,28,41'), [17, 28, 41]),
    glow: parseRgb(readVar('--trail-glow', '245,168,60'), [245, 168, 60]),
    head: parseRgb(readVar('--trail-head', '255,255,255'), [255, 255, 255]),
    glowAlpha: Number.parseFloat(readVar('--trail-glow-alpha', '0.12')) || 0,
    vignetteAlpha: Number.parseFloat(readVar('--trail-vignette-alpha', '0.32')) || 0,
    alphaScale: Number.parseFloat(readVar('--trail-alpha', '1')) || 1,
    // 只接受两种合法合成模式,其余值回落暗房叠加
    blend: readVar('--trail-blend', 'lighter') === 'source-over' ? 'source-over' : 'lighter',
  };
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(mix(a[0], b[0], t)),
  Math.round(mix(a[1], b[1], t)),
  Math.round(mix(a[2], b[2], t)),
];
const rgb = (c: RGB) => c.join(',');
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/**
 * 长曝光车流:四条车道、双向车灯拖出光轨。
 * 暗房用 lighter 叠加发光,浅底日间改 source-over 正常合成(叠加在近白背景上会被钳成纯白);
 * 颜料、车头与合成模式全部来自当前主题的 CSS 变量,换主题时颜色在 0.6s 内逐帧插值,
 * 与 CSS @property 的颜色涟漪同步换天,而不是瞬间跳变(reduced-motion 仍直接落位);
 * 指针移动时整幅光轨轻微视差;prefers-reduced-motion 时只画一帧带尾迹的静态光轨。
 */
export default function LightTrails() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cars: Car[] = [];
    let laneY: number[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = performance.now();
    let running = true;
    // 调色板三态:from/to 是插值端点,cur(pal)是绘制用的混合值;themeT=1 表示已落位
    let pal = readPalette();
    let palFrom = pal;
    let palTo = pal;
    let themeT = 1;
    // 指针视差:目标偏移与当前偏移,帧循环里插值
    const offset = { tx: 0, ty: 0, x: 0, y: 0 };
    // 背景合成:天空渐变 + 地平线暖辉 + 暗角,缓存渐变对象,resize/换主题时重建
    let skyGradient: CanvasGradient | null = null;
    let glowGradient: CanvasGradient | null = null;
    let vignetteGradient: CanvasGradient | null = null;

    const applyPalette = (t: number) => {
      pal = {
        primary: mixRgb(palFrom.primary, palTo.primary, t),
        secondary: mixRgb(palFrom.secondary, palTo.secondary, t),
        fade: mixRgb(palFrom.fade, palTo.fade, t),
        sky: mixRgb(palFrom.sky, palTo.sky, t),
        glow: mixRgb(palFrom.glow, palTo.glow, t),
        head: mixRgb(palFrom.head, palTo.head, t),
        glowAlpha: mix(palFrom.glowAlpha, palTo.glowAlpha, t),
        vignetteAlpha: mix(palFrom.vignetteAlpha, palTo.vignetteAlpha, t),
        alphaScale: mix(palFrom.alphaScale, palTo.alphaScale, t),
        // 合成模式无法插值,过半切到目标主题,此时天色也已大体翻转
        blend: t < 0.5 ? palFrom.blend : palTo.blend,
      };
    };

    const snapPalette = () => {
      pal = palTo;
      palFrom = palTo;
      themeT = 1;
    };

  const buildBackdrop = () => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, `rgb(${rgb(pal.sky)})`);
    g.addColorStop(0.5, `rgb(${rgb(pal.fade)})`);
    g.addColorStop(1, `rgb(${rgb(pal.fade)})`);
    skyGradient = g;

    const gl = ctx.createRadialGradient(w * 0.5, h * 0.82, 0, w * 0.5, h * 0.82, Math.max(w, h) * 0.52);
    gl.addColorStop(0, `rgba(${rgb(pal.glow)},${pal.glowAlpha})`);
    gl.addColorStop(1, `rgba(${rgb(pal.glow)},0)`);
    glowGradient = gl;

    if (pal.vignetteAlpha > 0.001) {
      const vg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.5,
        Math.min(w, h) * 0.32,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.74,
      );
      vg.addColorStop(0, 'rgba(4,8,12,0)');
      vg.addColorStop(1, `rgba(4,8,12,${pal.vignetteAlpha})`);
      vignetteGradient = vg;
    } else {
      vignetteGradient = null;
    }
  };

  /** 按 alpha 铺背景合成:alpha=1 用于初始/reduced 静帧,0.18 用于每帧淡出(长曝光收敛到该合成) */
  const paintBackdrop = (alpha: number) => {
    ctx.globalCompositeOperation = 'source-over';
    if (!skyGradient || !glowGradient) buildBackdrop();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = skyGradient!;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = glowGradient!;
    ctx.fillRect(0, 0, w, h);
    if (vignetteGradient) {
      ctx.fillStyle = vignetteGradient!;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalAlpha = 1;
  };

  const paintBase = () => paintBackdrop(1);

    const seed = () => {
      cars = [];
      LANES.forEach((_, lane) => {
        const dir: 1 | -1 = lane % 2 === 0 ? 1 : -1;
        const count = 4 + lane;
        for (let j = 0; j < count; j++) {
          cars.push({
            lane,
            x: Math.random() * (w + 480) - 240,
            speed: (46 + Math.random() * 90) * (0.8 + lane * 0.14),
            dir,
            warm: dir === 1,
            tail: 50 + Math.random() * 90,
            // 主题强度系数(alphaScale)在绘制时再乘,换主题时车灯亮度才能跟着渐变
            alpha: 0.3 + Math.random() * 0.38,
          });
        }
      });
    };

    const resize = () => {
      palTo = readPalette();
      // 过渡中遇到 resize 保留插值进度,只刷新目标;已落位则直接对齐
      if (themeT >= 1) snapPalette();
      buildBackdrop();
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      laneY = (w < 640 ? LANES_NARROW : LANES).map((f) => h * f);
      seed();
      paintBase();
      if (reduced) drawTrails(true);
    };

    const drawTrails = (longTail: boolean) => {
      ctx.globalCompositeOperation = pal.blend;
      for (const car of cars) {
        const y = laneY[car.lane];
        const len = longTail ? car.tail * 3.2 : car.tail;
        const x2 = car.x - car.dir * len;
        const rgbStr = car.warm ? rgb(pal.primary) : rgb(pal.secondary);
        const a = car.alpha * pal.alphaScale;
        const grad = ctx.createLinearGradient(car.x, y, x2, y);
        grad.addColorStop(0, `rgba(${rgbStr},${a})`);
        grad.addColorStop(1, `rgba(${rgbStr},0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(car.x, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
        ctx.fillStyle = `rgba(${rgb(pal.head)},${Math.min(1, a + 0.35)})`;
        ctx.fillRect(car.x - 1.2, y - 1.2, 2.4, 2.4);
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const wrap = (car: Car) => {
      if (car.dir === 1 && car.x - car.tail > w + 40) car.x = -40 - Math.random() * 260;
      if (car.dir === -1 && car.x + car.tail < -40) car.x = w + 40 + Math.random() * 260;
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.1, Math.max(0.001, (now - last) / 1000));
      last = now;
      // 主题颜色插值:逐帧追赶目标调色板,天、光、车灯一起换色
      if (themeT < 1) {
        themeT = Math.min(1, themeT + dt / THEME_LERP_S);
        applyPalette(easeInOut(themeT));
        buildBackdrop();
      }
      // 视差插值
      offset.x += (offset.tx - offset.x) * 0.06;
      offset.y += (offset.ty - offset.y) * 0.06;
      // 帧率无关的长曝光衰减:60fps 基准下每帧 0.2;内嵌面板帧率低时按真实时间补偿,
      // 否则衰减按帧数走、曳尾会被拉长到连成一片
      paintBackdrop(1 - Math.pow(0.8, dt * 60));
      ctx.save();
      ctx.translate(offset.x, offset.y);
      ctx.globalCompositeOperation = pal.blend;
      for (const car of cars) {
        car.x += car.speed * car.dir * dt;
        wrap(car);
      }
      drawTrails(false);
      ctx.restore();
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      offset.tx = (e.clientX / window.innerWidth - 0.5) * 14;
      offset.ty = (e.clientY / window.innerHeight - 0.5) * 10;
    };

    const onThemeChange = () => {
      palTo = readPalette();
      if (reduced) {
        // 静帧模式没有帧循环,直接落位重画
        snapPalette();
        buildBackdrop();
        paintBase();
        drawTrails(true);
        return;
      }
      // 从当前混合态出发重新插值:连点两下主题也不跳变
      palFrom = pal;
      themeT = 0;
    };

    resize();
    // 内嵌面板/后台标签可能以 0 尺寸挂载(测得宽 0 被钳成 1px,画布变 2×2 再被拉伸成糊),
    // 必须跟随画布真实尺寸重测,不能只依赖 window resize
    const canvasObserver = new ResizeObserver(() => resize());
    canvasObserver.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer);
    window.addEventListener('luzzz-themechange', onThemeChange);
    document.addEventListener('visibilitychange', onVisibility);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      canvasObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('luzzz-themechange', onThemeChange);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
