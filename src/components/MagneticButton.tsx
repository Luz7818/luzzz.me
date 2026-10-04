'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type Props = {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
  /** 吸附强度:指针偏移的放大系数,0 为关闭 */
  strength?: number;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/** 磁性按钮:指针靠近时向光标方向吸附,离开弹回。减弱动效或触屏(无悬停)下不动。 */
export default function MagneticButton({ children, href, className = '', external, strength = 0.28, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
