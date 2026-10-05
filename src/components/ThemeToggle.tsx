'use client';

const STORAGE_KEY = 'luzzz-theme';

/**
 * 主题切换:改 <html data-theme> 即可,颜色渐变由 globals.css 的
 * @property 注册 + :root transition 全局涟漪完成(不整页快照,持续动画下也丝滑)。
 * Sun/Moon 两枚图标都渲染,旋转淡入淡出由 CSS 按 data-theme 决定,无水合闪烁。
 */

// Phosphor Bold 的 Sun/Moon 路径(viewBox 0 0 256 256)——全站只用这两枚图标,
// 内联就省掉整个 @phosphor-icons/react 依赖。
const SUN_PATH =
  'M116,36V20a12,12,0,0,1,24,0V36a12,12,0,0,1-24,0Zm80,92a68,68,0,1,1-68-68A68.07,68.07,0,0,1,196,128Zm-24,0a44,44,0,1,0-44,44A44.05,44.05,0,0,0,172,128ZM51.51,68.49a12,12,0,1,0,17-17l-12-12a12,12,0,0,0-17,17Zm0,119-12,12a12,12,0,0,0,17,17l12-12a12,12,0,1,0-17-17ZM196,72a12,12,0,0,0,8.49-3.51l12-12a12,12,0,0,0-17-17l-12,12A12,12,0,0,0,196,72Zm8.49,115.51a12,12,0,0,0-17,17l12,12a12,12,0,0,0,17-17ZM48,128a12,12,0,0,0-12-12H20a12,12,0,0,0,0,24H36A12,12,0,0,0,48,128Zm80,80a12,12,0,0,0-12,12v16a12,12,0,0,0,24,0V220A12,12,0,0,0,128,208Zm108-92H220a12,12,0,0,0,0,24h16a12,12,0,0,0,0-24Z';
const MOON_PATH =
  'M236.37,139.4a12,12,0,0,0-12-3A84.07,84.07,0,0,1,119.6,31.59a12,12,0,0,0-15-15A108.86,108.86,0,0,0,49.69,55.07,108,108,0,0,0,136,228a107.09,107.09,0,0,0,64.93-21.69,108.86,108.86,0,0,0,38.44-54.94A12,12,0,0,0,236.37,139.4Zm-49.88,47.74A84,84,0,0,1,68.86,69.51,84.93,84.93,0,0,1,92.27,48.29Q92,52.13,92,56A108.12,108.12,0,0,0,200,164q3.87,0,7.71-.27A84.79,84.79,0,0,1,186.49,187.14Z';

function ThemeIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 256 256" width={15} height={15} fill="currentColor" aria-hidden="true" className={className}>
      <path d={d} />
    </svg>
  );
}

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
      <ThemeIcon d={SUN_PATH} className="theme-icon theme-icon-sun" />
      <ThemeIcon d={MOON_PATH} className="theme-icon theme-icon-moon" />
    </button>
  );
}
