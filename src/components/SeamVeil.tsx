'use client';

import { useEffect, useRef } from 'react';

/**
 * 幕间交叉淡化:滚动经过幕与幕的交棒缝时,一层主题色纱幕先起后落,
 * 把"上一幕已退场、下一幕未到位"的空场缝软化成一次有意的渐隐渐现。
 * 纱幕走 --color-bg(随主题涟漪换色);只罩场景内容(z-20),导航/主题钮在其上;
 * pointer-events 关闭,不挡任何交互;缝位随视口高度重算(幕高全按 vh 布局)。
 * 滚动事件直写 opacity(不经 motion/rAF 管线),受限环境同样可靠。
 * 经典竖排树幕间是正常文档流,不需要它。
 */
export default function SeamVeil() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const HALF = 160; // 纱幕半宽:缝位 ±160px 内起落
    const PEAK = 0.45; // 峰值浓度:隐约可辨即可,不能糊住内容
    const measure = () => {
      const vh = window.innerHeight;
      return [2.6 * vh, 7.4 * vh]; // 两处幕界(260vh / 740vh)
    };
    const paint = () => {
      const el = ref.current;
      if (!el) return;
      let o = 0;
      for (const s of measure()) {
        const d = Math.abs(window.scrollY - s);
        if (d < HALF) o = Math.max(o, (1 - d / HALF) * PEAK);
      }
      el.style.opacity = o.toFixed(3);
    };
    // scroll 事件为主;内嵌面板等宿主可能吞掉 scroll 事件,300ms 轮询兜底(幂等直写)
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
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 bg-[var(--color-bg)]"
      style={{ opacity: 0 }}
    />
  );
}
