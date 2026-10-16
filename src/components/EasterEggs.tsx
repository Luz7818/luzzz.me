'use client';

import { useEffect } from 'react';

/**
 * 门外的小彩蛋:离开标签页把标题换成靠站文案,回来复原;控制台一份招手。
 * 与滚动/渲染管线无关,双树与 404 都生效——挂在 page 顶层,不渲染任何内容。
 */
export default function EasterEggs() {
  useEffect(() => {
    const original = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? '🚏 车已靠站 · 等你回来' : original;
    };
    document.addEventListener('visibilitychange', onVisibility);
    console.log(
      '%c LUZ %c 把工程问题做成能看、能玩、能复现的东西 —— 找到驾驶室的都是自己人\n源码与 issue: github.com/Luz7818/luzzz.me',
      'background:#f5a83c;color:#1a1106;font-weight:700;padding:2px 7px;border-radius:6px 0 0 6px',
      'background:#1a1106;color:#f5a83c;padding:2px 7px;border-radius:0 6px 6px 0',
    );
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      document.title = original;
    };
  }, []);
  return null;
}
