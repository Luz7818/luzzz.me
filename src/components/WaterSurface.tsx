'use client';

import { useEffect, useRef } from 'react';

/**
 * 交互水痕:指针划过时沿轨迹留下一道渐隐的水痕(不发波、不外扩),静止时水面完全平静。
 * 实现 = 低分辨率缓冲画布:划动沿轨迹盖半透明高光章,每帧整体淡出一点(约 1s 消散),
 * 放大绘制一次成型,与光轨同一套「盖章 + 长曝光」的画法,代价极低。
 * 高光颜色走 --water-shine 主题变量(深色暖白 / 浅色冷蓝),随主题涟漪换色。
 * 点击在原地盖一枚更大的水印。仅三幕树挂载;prefers-reduced-motion 下不启动;页面隐藏时暂停。
 */

const CELL = 6; // 缓冲画布每格像素
const FADE_PER_FRAME = 0.055; // 每帧淡出比例,水痕约 1s 消散
const STROKE_W = 4; // 水痕线宽(格)
const STROKE_ALPHA = 0.16;
const CLICK_R = 6; // 点击水印半径(格)
const CLICK_ALPHA = 0.22;

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
    let buf: HTMLCanvasElement | null = null;
    let bctx: CanvasRenderingContext2D | null = null;
    let raf = 0;
    let running = true;
    let shine: [number, number, number, number] = [255, 240, 205, 0.3];
    let lastPt: { x: number; y: number } | null = null;

    const readTheme = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue('--water-shine').trim();
      const p = raw.split(',').map((n) => Number.parseFloat(n));
      if (p.length === 4 && p.every((n) => Number.isFinite(n))) shine = [p[0], p[1], p[2], p[3]];
    };

    const toCell = (px: number, py: number) => ({ x: px / CELL, y: py / CELL });

    /** 沿上一位置到当前位置盖一段水痕章,保证快速划动轨迹连续 */
    const stampSegment = (from: { x: number; y: number } | null, to: { x: number; y: number }) => {
      if (!bctx) return;
      const [sr, sg, sb] = shine;
      bctx.strokeStyle = `rgba(${sr},${sg},${sb},${STROKE_ALPHA})`;
      bctx.lineWidth = STROKE_W;
      bctx.lineCap = 'round';
      bctx.lineJoin = 'round';
      bctx.beginPath();
      if (from) {
        bctx.moveTo(from.x, from.y);
        bctx.lineTo(to.x, to.y);
      } else {
        bctx.arc(to.x, to.y, STROKE_W / 2, 0, Math.PI * 2);
      }
      bctx.stroke();
    };

    /** 点击水印:原地一枚更大的章 */
    const stampMark = (px: number, py: number) => {
      if (!bctx) return;
      const [sr, sg, sb] = shine;
      const { x, y } = toCell(px, py);
      const g = bctx.createRadialGradient(x, y, 0, x, y, CLICK_R);
      g.addColorStop(0, `rgba(${sr},${sg},${sb},${CLICK_ALPHA})`);
      g.addColorStop(1, `rgba(${sr},${sg},${sb},0)`);
      bctx.fillStyle = g;
      bctx.beginPath();
      bctx.arc(x, y, CLICK_R, 0, Math.PI * 2);
      bctx.fill();
    };

    const paint = () => {
      if (!bctx || !ctx) return;
      // 整体淡出:按比例削减既有 alpha(水痕原地消散,不外扩)
      bctx.globalCompositeOperation = 'destination-out';
      bctx.fillStyle = `rgba(0,0,0,${FADE_PER_FRAME})`;
      bctx.fillRect(0, 0, cols, rows);
      bctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(buf!, 0, 0, cols, rows, 0, 0, w, h);
    };

    const frame = () => {
      if (!running) return;
      paint();
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
      buf = document.createElement('canvas');
      buf.width = cols;
      buf.height = rows;
      bctx = buf.getContext('2d');
      readTheme();
    };

    // 指针/手指:划动留水痕,点击盖水印(画布自身 pointer-events 关闭,监听挂在窗口)
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 50) return;
      const pt = toCell(e.clientX - rect.left, e.clientY - rect.top);
      stampSegment(lastPt, pt);
      lastPt = pt;
    };
    const onDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 50) return;
      stampMark(e.clientX - rect.left, e.clientY - rect.top);
      lastPt = null; // 点击后的划动重新起笔,避免拉出一条长直线
    };
    const onLeave = () => {
      lastPt = null;
    };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
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
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('luzzz-themechange', readTheme);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
