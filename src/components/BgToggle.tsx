'use client';

import { readBgMode, setBgMode, type BgMode } from '@/lib/bgmode';

/**
 * 背景形态切换:毛玻璃(光轨)↔ 像素点阵,独立右上角玻璃圆钮,与 ThemeToggle 并排。
 * 契约与 ThemeToggle 同构:改 <html data-bgmode> + 写 localStorage + 分发
 * luzzz-bgmodechange,两层背板的显隐由 globals.css 按 data-bgmode 决定,无水合闪烁。
 * 两枚图标都渲染,旋转淡入淡出由 CSS 按 data-bgmode 决定(复刻 .theme-icon 机制)。
 */

export default function BgToggle() {
  const toggle = () => {
    const next: BgMode = readBgMode() === 'pixel' ? 'glass' : 'pixel';
    setBgMode(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="切换背景形态"
      title="切换背景形态"
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-[var(--nav-glass)] text-muted shadow-[var(--shadow-card)] backdrop-blur-md transition-colors duration-500 hover:border-muted hover:text-accent active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {/* 点阵:3×3 圆点阵(像素形态);光轨:三条错落横线(毛玻璃形态) */}
      <svg viewBox="0 0 256 256" width={15} height={15} fill="currentColor" aria-hidden="true" className="bg-icon bg-icon-pixel">
        {[64, 128, 192].map((y) =>
          [64, 128, 192].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={y === 128 && x === 128 ? 20 : 14} />),
        )}
      </svg>
      <svg viewBox="0 0 256 256" width={15} height={15} fill="currentColor" aria-hidden="true" className="bg-icon bg-icon-glass">
        <rect x="32" y="58" width="168" height="26" rx="13" />
        <rect x="76" y="118" width="112" height="26" rx="13" />
        <rect x="52" y="178" width="140" height="26" rx="13" />
      </svg>
    </button>
  );
}
