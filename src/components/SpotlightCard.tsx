'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

type Props = {
  children: React.ReactNode;
  className?: string;
  /** 开启 3D 倾斜(仅 featured 卡,桌面端鼠标) */
  tilt?: boolean;
};

/** 面板边缘流光的静止角:亮边默认在左上(与 .panel::before 的 155deg 回落值一致) */
const SHEEN_REST = 155;

/** 聚光卡:边框内侧一团辉光跟随指针,玻璃边框的亮边随之转向指针(弹簧插值);
 *  tilt 时整卡随指针轻微 3D 倾斜。触屏与减弱动效下自动关闭。 */
export default function SpotlightCard({ children, className = '', tilt = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  // 高光"追"指针而非贴住:弹簧滞后约一拍,液态感;离场 reset 时顺势弹回角落
  const smx = useSpring(mx, { stiffness: 400, damping: 40 });
  const smy = useSpring(my, { stiffness: 400, damping: 40 });
  const spot = useMotionTemplate`radial-gradient(340px circle at ${smx}px ${smy}px, var(--spot), transparent 66%)`;

  // 玻璃边框亮边角度:由指针相对卡心的方位决定,弹簧平滑后直写 CSS 变量
  // (只有 ::before 这圈 1px 描边消费它,子树无依赖,重算代价可忽略)
  const angle = useMotionValue(SHEEN_REST);
  const angleSpring = useSpring(angle, { stiffness: 150, damping: 22 });
  useEffect(() => angleSpring.on('change', (v) => {
    ref.current?.style.setProperty('--sheen-angle', `${v.toFixed(1)}deg`);
  }), [angleSpring]);

  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    // 触屏/笔不聚光:tap 不应触发悬停表演(与 Tailwind v4 hover: 门控同一原则)
    if (e.pointerType !== 'mouse') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    mx.set(px);
    my.set(py);
    // 梯度方向 = 从指针指向卡心:亮边永远落在指针所在的那一侧边框
    const vx = rect.width / 2 - px;
    const vy = rect.height / 2 - py;
    angle.set((Math.atan2(vx, -vy) * 180) / Math.PI);
    if (tilt && !reduce && window.innerWidth >= 1024) {
      ry.set((px / rect.width - 0.5) * 7);
      rx.set(-(py / rect.height - 0.5) * 7);
    }
  };

  const reset = () => {
    mx.set(-400);
    my.set(-400);
    angle.set(SHEEN_REST);
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
