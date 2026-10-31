/**
 * 背景形态状态:与 ThemeToggle 的主题契约同构——
 * <html data-bgmode> 是唯一事实源,localStorage['luzzz-bgmode'] 做持久化,
 * 'luzzz-bgmodechange' 事件通知画布暂停/恢复。boot 脚本(layout.tsx)在水合前
 * 落 data-bgmode,CSS 按 :root[data-bgmode] 显隐两层背板,零闪白。
 */

export type BgMode = 'glass' | 'pixel';

export const BG_MODE_KEY = 'luzzz-bgmode';
export const BG_MODE_EVENT = 'luzzz-bgmodechange';

export function readBgMode(): BgMode {
  return document.documentElement.dataset.bgmode === 'pixel' ? 'pixel' : 'glass';
}

export function isBgModeActive(mode: BgMode): boolean {
  return readBgMode() === mode;
}

/** 切换形态并广播;localStorage 写失败只影响下次访问(隐私模式),本次仍生效。 */
export function setBgMode(next: BgMode): void {
  document.documentElement.dataset.bgmode = next;
  try {
    localStorage.setItem(BG_MODE_KEY, next);
  } catch {
    /* 隐私模式下写入失败,形态仍对本次会话生效 */
  }
  window.dispatchEvent(new CustomEvent(BG_MODE_EVENT, { detail: next }));
}
