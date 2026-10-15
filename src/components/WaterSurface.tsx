'use client';

import { useEffect, useRef } from 'react';

/**
 * 交互水面:经典高度场水波模拟——指针/手指划过时泛起真实传播的涟漪,
 * 波峰泛白光、波谷沉暗影(波光粼粼),约 1.5s 归于平静;空闲时偶有水滴落下保持活性,
 * 点击水面溅起更大的水花。模拟跑在 6px 粗网格上(两缓冲差分,固定 60Hz 步长),
 * 渲染成低分辨率 ImageData 再放大绘制,单次 drawImage,代价极低。
 * 高光颜色走 --water-shine 主题变量(深色暖白 / 浅色冷蓝),随主题涟漪换色。
 * 仅三幕树挂载;prefers-reduced-motion 下不启动;页面隐藏时暂停。
 */

const CELL = 6;
const DAMPING = 0.975; // 每步能量衰减,涟漪约 1.2s 归于平静
const SIM_STEP = 1 / 60;
const MAX_STEPS = 3;
const POINTER_R = 2; // 指针扰动半径(格)
const POINTER_POWER = 1.5; // 划动扰动强度:含蓄的涟漪,不是浪
const CLICK_POWER = 3.5; // 点击水花强度
const CLICK_R = 3;
const DROP_POWER = 1.5; // 空闲水滴
const DROP_R = 2;
const SLOPE_GAIN = 9; // 高度差 → 明暗的增益

export default function WaterSurface() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let prev = new Float32Array(1);
    let curr = new Float32Array(1);
    let sim: HTMLCanvasElement | null = null;
    let sctx: CanvasRenderingContext2D | null = null;
    let img: ImageData | null = null;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let running = true;
    let nextDrop = performance.now() + 1500;
    let shine: [number, number, number, number] = [255, 244, 214, 0.3];
    // 指针状态:划动时由事件更新,帧循环里注入扰动
    const pointer = { x: 0, y: 0, moved: false };

    const readTheme = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--water-shine').trim();
      const p = raw.split(',').map((n) => Number.parseFloat(n));
      if (p.length === 4 && p.every((n) => Number.isFinite(n))) shine = [p[0], p[1], p[2], p[3]];
    };

    const disturb = (px: number, py: number, power: number, radius: number) => {
      const cx = Math.round(px / CELL);
      const cy = Math.round(py / CELL);
      for (let y = cy - radius; y <= cy + radius; y++) {
        for (let x = cx - radius; x <= cx + radius; x++) {
          if (x < 1 || y < 1 || x >= cols - 1 || y >= rows - 1) continue;
          const d = Math.hypot(x - cx, y - cy);
          if (d > radius) continue;
          curr[y * cols + x] -= power * (1 - d / radius);
        }
      }
    };

    const simulate = () => {
      const c = cols;
      for (let y = 1; y < rows - 1; y++) {
        const row = y * c;
        for (let x = 1; x < c - 1; x++) {
          const i = row + x;
          curr[i] = (prev[i - 1] + prev[i + 1] + prev[i - c] + prev[i + c]) / 2 - curr[i];
          curr[i] *= DAMPING;
        }
      }
      const t = prev;
      prev = curr;
      curr = t;
    };

    const render = () => {
      if (!sim || !sctx || !img) return;
      const data = img.data;
      const c = cols;
      const [sr, sg, sb, sa] = shine;
      for (let y = 1; y < rows - 1; y++) {
        const row = y * c;
        for (let x = 1; x < c - 1; x++) {
          const i = row + x;
          const slope = curr[i + 1] - curr[i - 1] + (curr[i + c] - curr[i - c]);
          const v = slope * SLOPE_GAIN;
          const o = i * 4;
          if (v > 0) {
            // 波峰:主题高光色,浓度封顶——是波光,不是白环
            data[o] = sr;
            data[o + 1] = sg;
            data[o + 2] = sb;
            data[o + 3] = Math.min(110, v * 255) * sa;
          } else {
            // 波谷:沉一点的冷影
            data[o] = 30;
            data[o + 1] = 44;
            data[o + 2] = 64;
            data[o + 3] = Math.min(70, -v * 255) * sa;
          }
        }
      }
      sctx.clearRect(0, 0, cols, rows);
      sctx.putImageData(img, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(sim, 0, 0, cols, rows, 0, 0, w, h);
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += dt;
      let iter = 0;
      while (acc >= SIM_STEP && iter < MAX_STEPS) {
        if (pointer.moved) {
          disturb(pointer.x, pointer.y, POINTER_POWER, POINTER_R);
          pointer.moved = false;
        }
        simulate();
        acc -= SIM_STEP;
        iter++;
      }
      if (now > nextDrop) {
        disturb(Math.random() * w, h * (0.35 + Math.random() * 0.55), DROP_POWER, DROP_R);
        nextDrop = now + 1200 + Math.random() * 2400;
      }
      render();
      raf = requestAnimationFrame(frame);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      prev = new Float32Array(cols * rows);
      curr = new Float32Array(cols * rows);
      sim = document.createElement('canvas');
      sim.width = cols;
      sim.height = rows;
      sctx = sim.getContext('2d');
      if (sctx) img = sctx.createImageData(cols, rows);
      readTheme();
    };

    // 指针/手指:划动注入扰动,按下溅更大水花(画布自身 pointer-events 关闭,监听挂在窗口)
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 50) return;
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.moved = true;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 50) return;
      disturb(e.clientX - rect.left, e.clientY - rect.top, CLICK_POWER, CLICK_R);
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('luzzz-themechange', readTheme);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('luzzz-themechange', readTheme);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
