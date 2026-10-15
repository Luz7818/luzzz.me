'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import SplitChars from '../SplitChars';
import MagneticButton from '../MagneticButton';
import CountUp from '../CountUp';
import Marquee from '../Marquee';
import { registerPageBound, registerSceneAnchors, registerSnapAnchors, smoothTo } from '../SmoothScroll';
import { profile, stats } from '@/data/site';

const GRAD =
  'bg-[linear-gradient(180deg,var(--color-ink),color-mix(in_srgb,var(--color-ink)_72%,transparent))] bg-clip-text text-transparent';

/** 锚点落点:幕顶 + 进度比例 × 可滚动距离 */
function anchorY(el: HTMLElement | null, frac: number) {
  if (!el) return 0;
  return el.getBoundingClientRect().top + window.scrollY + frac * (el.offsetHeight - window.innerHeight);
}

/**
 * 第一幕 · 开场(340vh):原生滚动被钉屏舞台吃掉,内容在原地换场。
 * 拍一:大标题逐字入场 + 简介 + CTA;拍二:关于玻璃卡 + 数字统计 + 跑马灯。
 * 两拍交叉淡切,内容永不竖向滚出视口——这就是「本地切换」。
 */
export default function Act1Intro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  // 拍一:0.34 前稳稳停住,随后上浮淡出
  const b1y = useTransform(sp, [0.32, 0.46], [0, -110]);
  const b1o = useTransform(sp, [0.34, 0.44], [1, 0]);
  // 拍二:从下方升入,0.52–0.87 停留,结尾交棒给项目环
  const b2y = useTransform(sp, [0.4, 0.52, 0.87, 0.98], [90, 0, 0, -80]);
  const b2o = useTransform(sp, [0.4, 0.5, 0.87, 0.97], [0, 1, 1, 0]);
  const b1t = useMotionTemplate`translateY(${b1y}px)`;
  const b2t = useMotionTemplate`translateY(${b2y}px)`;
  const b1pe = useTransform(b1o, (o) => (o < 0.08 ? 'none' : 'auto'));
  const b2pe = useTransform(b2o, (o) => (o < 0.08 ? 'none' : 'auto'));

  // 滚动提示跟拍一同退场
  const hintO = useTransform(sp, [0.06, 0.2], [1, 0]);

  useEffect(() => {
    const unscene = registerSceneAnchors({
      top: () => 0,
      about: () => anchorY(wrapRef.current, 0.68),
    });
    const unsnap = registerSnapAnchors([() => 0, () => anchorY(wrapRef.current, 0.68)]);
    const unbound = registerPageBound(() => anchorY(wrapRef.current, 0));
    return () => {
      unscene();
      unsnap();
      unbound();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
        {/* 首屏暖光:浅色下也有一团呼吸,视线落在标题 */}
        <div className="hero-glow" aria-hidden />
        {/* 拍一:开场 */}
        <motion.div
          style={{ transform: b1t, opacity: b1o, pointerEvents: b1pe }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-16 md:px-10">
            <p className="font-mono text-[13px] text-muted">{profile.kicker}</p>

            <h1 className="mt-5 max-w-[24ch] text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[1.14] tracking-[-0.01em]">
              <SplitChars text="把工程问题做成" wrapperClassName="block" charClassName={GRAD} delay={0.15} />
              {/* 逐字拆行在窄屏会把"复现"拆到两行;按词组分 nowrap,断行只发生在顿号后 */}
              {(
                [
                  ['能看、', 0],
                  ['能玩、', 3],
                  ['能复现的东西', 6],
                ] as const
              ).map(([text, charsBefore]) => (
                <SplitChars
                  key={text}
                  text={text}
                  wrapperClassName="inline-block whitespace-nowrap"
                  charClassName={GRAD}
                  delay={0.55 + charsBefore * 0.035}
                />
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-[42ch] text-base leading-[1.9] text-ink/80 md:text-lg"
            >
              你好,我是{profile.fullName}。{profile.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  smoothTo('projects');
                }}
                className="btn-primary inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                看项目
              </MagneticButton>
              <MagneticButton
                href={profile.github}
                external
                className="btn-ghost inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                GitHub @{profile.handle}
                <span className="arrow ml-1.5" aria-hidden>
                  ↗
                </span>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          aria-hidden
          style={{ opacity: hintO }}
          className="absolute inset-x-0 bottom-7 flex justify-center"
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted">向下滚动</span>
            <span className="scroll-hint" />
          </div>
        </motion.div>

        {/* 拍二:关于 */}
        <motion.div
          style={{ transform: b2t, opacity: b2o, pointerEvents: b2pe }}
          className="absolute inset-0 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1200px] px-6 pb-16 md:px-10">
            <h2 className="sr-only">关于</h2>
            <div className="panel max-w-[780px] p-8 md:p-11">
              <p className="text-xl font-medium leading-[1.8] md:text-2xl">{profile.aboutLine}</p>
              <dl className="hairline mt-10 flex flex-wrap gap-x-14 gap-y-8 pt-8">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-2 mt-1 font-mono text-[11px] tracking-wide text-muted">{s.label}</dt>
                    <dd className="order-1 text-3xl font-bold tabular-nums tracking-tight text-accent md:text-4xl">
                      <CountUp value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0">
            <Marquee />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
