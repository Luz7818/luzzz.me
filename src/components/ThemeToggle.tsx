'use client';

import { Moon, Sun } from '@phosphor-icons/react';

const STORAGE_KEY = 'luzzz-theme';

/**
 * 主题切换:改 <html data-theme> 即可,颜色渐变由 globals.css 的
 * @property 注册 + :root transition 全局涟漪完成(不整页快照,持续动画下也丝滑)。
 * Sun/Moon 两枚图标都渲染,旋转淡入淡出由 CSS 按 data-theme 决定,无水合闪烁。
 */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* 隐私模式下写入失败,主题仍对本次会话生效 */
    }
    window.dispatchEvent(new CustomEvent('luzzz-themechange', { detail: next }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="切换明暗主题"
      title="切换明暗主题"
      className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-line bg-[var(--nav-glass)] text-muted shadow-[var(--shadow-card)] backdrop-blur-md transition-colors duration-500 hover:border-muted hover:text-accent active:scale-[0.94] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <Sun weight="bold" size={15} className="theme-icon theme-icon-sun" />
      <Moon weight="bold" size={15} className="theme-icon theme-icon-moon" />
    </button>
  );
}
