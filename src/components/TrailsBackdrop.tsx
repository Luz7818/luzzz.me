'use client';

import LightTrails from './LightTrails';

/**
 * 背景幕:长曝光光轨(2D 画布)+ 可读性压暗。
 * 早年这里还有一层 WebGL 流体合成(ogl),因在刷新等时机产生画面撕裂、且每帧
 * 全屏纹理上传加重滚动负担,已整体移除——「元素晕开」的水波由 Cursor 的透镜承担。
 */
export default function TrailsBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <LightTrails />
      {/* 可读性压暗:半透磨砂而非糊死,保住背景的纵深与色彩 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-bg)_72%,transparent)_0%,transparent_30%,transparent_74%,color-mix(in_srgb,var(--color-bg)_72%,transparent)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_58%_at_50%_50%,color-mix(in_srgb,var(--color-bg)_24%,transparent)_20%,transparent_72%)]" />
    </div>
  );
}
