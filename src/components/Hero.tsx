'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import LightTrails from './LightTrails';
import MagneticButton from './MagneticButton';
import { smoothTo } from './SmoothScroll';
import { profile } from '@/data/site';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // 滚动离场:内容下沉淡出,光轨轻微放大
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const trailsScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // 鼠标聚光:一团辉光跟随指针(弹簧拖尾)
  const mx = useMotionValue(-800);
  const my = useMotionValue(-800);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(620px circle at ${smx}px ${smy}px, var(--hero-spot), transparent 70%)`;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  const reveal = (delay: number) => ({
    initial: reduce ? false : ({ y: '112%' } as const),
    animate: { y: '0%' },
    transition: { type: 'spring' as const, stiffness: 70, damping: 18, delay },
  });

  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <motion.div style={{ scale: reduce ? undefined : trailsScale }} className="absolute inset-0">
        <LightTrails />
      </motion.div>
      {/* 顶部压暗护住导航与标题,底部淡入下一屏 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg)_0%,transparent_36%,transparent_74%,var(--color-bg)_100%)]"
      />
      {/* 文字区暗场:半透磨砂让标题周围安静,不糊死背景 */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_45%_at_50%_58%,color-mix(in_srgb,var(--color-bg)_36%,transparent)_30%,transparent_72%)] md:bg-[radial-gradient(ellipse_55%_45%_at_30%_52%,color-mix(in_srgb,var(--color-bg)_34%,transparent)_28%,transparent_70%)]"
      />
      {/* 鼠标聚光 */}
      <motion.div aria-hidden className="absolute inset-0" style={{ background: spot }} />
      {/* 舞台辉光:标题身后一团琥珀光晕,玻璃面板的虚化源之一 */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[72vh] w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,var(--stage-glow),transparent_62%)]"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative mx-auto w-full max-w-[1200px] px-6 pb-16 pt-28 md:px-10"
      >
        <motion.p
          {...rise(0.05)}
          className="font-mono text-[13px] text-muted"
        >
          {profile.kicker}
        </motion.p>

        <h1 className="mt-5 max-w-[22ch] text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[1.14] tracking-tight">
          <span className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block bg-[linear-gradient(180deg,var(--color-ink),color-mix(in_srgb,var(--color-ink)_72%,transparent))] bg-clip-text text-transparent"
              {...reveal(0.15)}
            >
              把工程问题做成
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className="block bg-[linear-gradient(180deg,var(--color-ink),color-mix(in_srgb,var(--color-ink)_72%,transparent))] bg-clip-text text-transparent"
              {...reveal(0.27)}
            >
              能看、能玩、能复现的东西
            </motion.span>
          </span>
        </h1>

        <motion.p
          {...rise(0.55)}
          className="mt-7 max-w-[42ch] text-base leading-[1.9] text-ink/80 md:text-lg"
        >
          你好,我是{profile.fullName}。{profile.lead}
        </motion.p>

        <motion.div {...rise(0.7)} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              smoothTo('projects');
            }}
            className="inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-[filter] duration-300 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            看项目
          </MagneticButton>
          <MagneticButton
            href={profile.github}
            external
            className="inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            GitHub @{profile.handle}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
