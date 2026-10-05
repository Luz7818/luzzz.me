'use client';

import { motion, useReducedMotion } from 'motion/react';

/** 进场包壳:进入视口后弹簧上浮,只演一次。减弱动效下直接可见。 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 80, damping: 20, delay }}
    >
      {children}
    </motion.div>
  );
}
