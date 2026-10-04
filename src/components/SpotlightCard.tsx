'use client';

import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 开启 3D 倾斜(仅 featured 卡,桌面端鼠标) */
  tilt?: boolean;
};

/** 聚光卡:边框内侧一团辉光跟随指针;tilt 时整卡随指针轻微 3D 倾斜。触屏与减弱动效下自动关闭。 */
export default function SpotlightCard({ children, className = '', tilt = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const spot = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, var(--spot), transparent 66%)`;

  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    if (tilt && !reduce && e.pointerType === 'mouse' && window.innerWidth >= 1024) {
      ry.set((px / rect.width - 0.5) * 7);
      rx.set(-(py / rect.height - 0.5) * 7);
    }
  };

  const reset = () => {
    mx.set(-400);
    my.set(-400);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      className={className}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spot }}
      />
      {children}
    </motion.article>
  );
}
