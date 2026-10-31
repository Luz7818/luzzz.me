'use client';

import { useEffect, useRef } from 'react';
import { mountPixelEngine } from './pixel/engine';

/**
 * 像素点阵背板:侧视城市交通剖面(高架轨道列车 / 双向快速路 / 信号灯街道 /
 * 河道货轮 / 地下隧道地铁),鼠标拨开像素点;信号灯可点击切换相位。
 * 与 TrailsBackdrop 平级的第二种背景形态,由 <html data-bgmode> 决定显隐
 * (globals.css 的 [data-bgmode-layer] 规则 + layout.tsx 的 boot 脚本,零闪白)。
 * 三幕树垫在 z-0;经典竖排(reduced 兜底树)传 layer="base" 落到 -z-10,
 * reduced 下引擎只画一帧静态交通。
 */
export default function PixelBackdrop({ layer = 'stage' }: { layer?: 'stage' | 'base' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => mountPixelEngine(ref.current), []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 overflow-hidden ${layer === 'stage' ? 'z-0' : '-z-10'}`}
    >
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      {layer === 'stage' && (
        <>
          {/* 可读性压暗:与 TrailsBackdrop 同配方,半透磨砂而非糊死 */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg)_72%,transparent)_0%,transparent_30%,transparent_74%,color-mix(in_srgb,var(--color-bg)_72%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_58%_at_50%_50%,color-mix(in_srgb,var(--color-bg)_24%,transparent)_20%,transparent_72%)]" />
        </>
      )}
    </div>
  );
}
