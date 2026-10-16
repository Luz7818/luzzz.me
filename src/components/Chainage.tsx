'use client';

import { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';

/**
 * 里程桩号:骑在顶部琥珀进度线前端的一枚迷你芯片,随滚动自左向右驶过整屏——
 * 进度即公路位置,读数即里程(K数+米,一屏一公里,页顶 K0+000)。
 * 位置订阅 Nav 的进度弹簧直写 left(CSS clamp 以 28px 绝对值保底芯片半宽,不越出视口);
 * 文本沿用 scroll 直写 textContent(SeamVeil 同模式,300ms 轮询兜底)。
 * Nav 双树共用,经典竖排与移动端照常工作。
 */
export default function Chainage({ scaleX }: { scaleX: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);

  // 位置:跟随进度弹簧(不进 React 状态,不走 style MotionValue——直写 left)。
  // CSS clamp 用绝对像素保底芯片自身半宽,页顶/页底都不越出视口
  useEffect(() => {
    const apply = (s: number) => {
      const el = ref.current;
      if (el) el.style.left = `clamp(28px, ${(s * 100).toFixed(2)}%, calc(100% - 28px))`;
    };
    apply(scaleX.get());
    return scaleX.on('change', apply);
  }, [scaleX]);

  // 文本:滚动里程折算(一屏一公里)
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
      style={{ left: '1.5%' }}
      className="fixed top-[2px] z-50 -translate-x-1/2 rounded-full border border-line bg-[var(--nav-glass)] px-1.5 py-[2px] font-mono text-[9px] leading-none tabular-nums tracking-wide text-muted backdrop-blur"
    >
      K0+000
    </span>
  );
}
