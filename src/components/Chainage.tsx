'use client';

import { useEffect, useRef } from 'react';

/**
 * 里程桩号:左上角一枚 mono 读数,把滚动路程折成铁路桩号(K 数+米,一屏一公里)——
 * 整页是一条路,读数就是你开过的里程。滚动事件直写 textContent,不经 motion/rAF 管线
 * (同 SeamVeil;内嵌面板可能吞 scroll 事件,300ms 轮询幂等兜底)。
 * 只挂在三幕树(motion-safe),经典竖排与 404 不渲染。
 */
export default function Chainage() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const paint = () => {
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight || 1;
      const meters = Math.max(0, Math.round((window.scrollY / vh) * 1000));
      el.textContent = `K${Math.floor(meters / 1000)}+${String(meters % 1000).padStart(3, '0')}`;
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    const poll = window.setInterval(paint, 300);
    return () => {
      window.removeEventListener('scroll', paint);
      window.removeEventListener('resize', paint);
      window.clearInterval(poll);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-6 top-[26px] z-30 hidden font-mono text-[11px] tabular-nums tracking-wide text-muted sm:block"
    >
      K0+000
    </span>
  );
}
