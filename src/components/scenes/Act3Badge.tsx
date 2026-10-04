'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import SplitChars from '../SplitChars';
import MagneticButton from '../MagneticButton';
import { registerPageBound, registerSceneAnchors, registerSnapAnchors, smoothTo } from '../SmoothScroll';
import { profile } from '@/data/site';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * 第三幕 · 工牌(340vh):玻璃工牌先递到你面前,随滚动整块放大直到充满屏幕,
 * 牌面渐变为联系页——工牌就是联系方式页本身。结尾保留页脚与回顶。
 */
export default function Act3Badge() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [cover, setCover] = useState(4.2);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5 });

  // 落场:从下方带透视递入
  const dropY = useTransform(sp, [0, 0.14], ['46vh', '0vh']);
  const dropRX = useTransform(sp, [0, 0.14], [26, 0]);
  const dropO = useTransform(sp, [0, 0.08], [0, 1]);
  // 放大:0.2 → 0.66 平滑充满屏幕(先慢后快再慢)
  const zoomT = useTransform(sp, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.2) / 0.46));
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return 1 + (cover - 1) * e;
  });
  // 牌面高光扫过
  const sheenX = useTransform(sp, [0.24, 0.62], ['-140%', '140%']);
  const sheenO = useTransform(sp, [0.22, 0.3, 0.56, 0.64], [0, 1, 1, 0]);
  // 背景压暗聚焦
  const dimO = useTransform(sp, [0.16, 0.6], [0, 0.5]);
  // 牌面内容 → 联系页
  const chromeO = useTransform(sp, [0.6, 0.7], [1, 0]);
  const chromeS = useTransform(sp, [0.6, 0.72], [1, 1.06]);
  const contactO = useTransform(sp, [0.66, 0.78], [0, 1]);
  const contactY = useTransform(sp, [0.66, 0.82], [36, 0]);
  const contactPE = useTransform(contactO, (o) => (o < 0.5 ? ('none' as const) : ('auto' as const)));
  const badgeT = useMotionTemplate`translateY(${dropY}) scale(${zoomT}) rotateX(${dropRX}deg)`;
  const chromeT = useMotionTemplate`scale(${chromeS})`;

  // 覆盖屏幕所需的缩放:按工牌实测布局尺寸算(offsetWidth 不含 transform),resize 跟随
  useLayoutEffect(() => {
    const measure = () => {
      const el = badgeRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      setCover(Math.max(window.innerWidth / w, window.innerHeight / h) * 1.1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (badgeRef.current) ro.observe(badgeRef.current);
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 400); // 字体加载后再量一次
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const yAt = (frac: number) => {
      const el = wrapRef.current;
      if (!el) return 0;
      return (
        el.getBoundingClientRect().top + window.scrollY + frac * (el.offsetHeight - window.innerHeight)
      );
    };
    // 「联系」直落工牌落定位(与吸附锚点重合),避免先落到幕顶空帧再被吸附拉走
    const unscene = registerSceneAnchors({ contact: () => yAt(0.14) });
    // 0.14:工牌落定(放大前);0.95:联系页成形
    const unsnap = registerSnapAnchors([() => yAt(0.14), () => yAt(0.95)]);
    const unbound = registerPageBound(() => yAt(0));
    return () => {
      unscene();
      unsnap();
      unbound();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        {/* 背景压暗 */}
        <motion.div aria-hidden style={{ opacity: dimO }} className="absolute inset-0 bg-[var(--color-bg)]" />

        {/* 工牌本体(牌面渐变在全屏缩放下成为联系页底色) */}
        <div className="relative [perspective:1200px]">
          <motion.div
            style={{ transform: badgeT, opacity: dropO, willChange: 'transform' }}
            className="relative"
          >
            <div ref={badgeRef} className="badge-slab relative w-[min(80vw,330px)] p-6 md:w-[330px]">
              {/* 全息高光扫过:外层裁切,内层位移 */}
              <motion.span
                aria-hidden
                style={{ opacity: sheenO }}
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]"
              >
                <motion.span
                  style={{ x: sheenX }}
                  className="absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-[linear-gradient(105deg,transparent_30%,var(--shine)_50%,transparent_70%)]"
                />
              </motion.span>

            {/* 牌面内容(放大后期淡出,交给联系页) */}
            <motion.div style={{ opacity: chromeO, transform: chromeT }} className="relative z-[2]">
              <div className="flex justify-center">
                <div className="badge-slot" />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-[var(--nav-glass)] font-mono text-sm font-bold text-accent">
                  LZ
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                  LUZ · STAFF PASS
                </span>
              </div>

              <div className="mt-6">
                <p className="text-3xl font-bold tracking-tight">{profile.fullName}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {profile.latinName} · @{profile.handle}
                </p>
                <p className="mt-4 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink/85">
                  {profile.kicker}
                </p>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-line pt-5">
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor-label="写信"
                  className="flex items-center gap-2.5 font-mono text-[12px] text-ink transition-colors hover:text-accent"
                >
                  <span className="text-accent">@</span>
                  {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="访问"
                  className="flex items-center gap-2.5 font-mono text-[12px] text-ink transition-colors hover:text-accent"
                >
                  <span className="text-accent">ƒ</span>
                  github.com/{profile.handle}
                </a>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span aria-hidden className="badge-stripes h-6 w-24 opacity-60" />
                <span className="font-mono text-[10px] text-muted">luzzz.me · № 0001</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>

        {/* 联系页:工牌充满屏幕后原地浮现 */}
        <motion.div
          style={{ opacity: contactO, y: contactY, pointerEvents: contactPE }}
          className="absolute inset-0 z-10 flex flex-col"
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 md:px-10">
            <p className="font-mono text-[13px] text-muted">联系 · 保持通话</p>
            <h2 className="mt-4 text-[clamp(1.6rem,4.6vw,3.6rem)] font-bold leading-[1.2] tracking-tight">
              <SplitChars
                text={profile.email}
                wrapperClassName="block"
                charClassName="text-accent"
                stagger={0.022}
                delay={0.1}
              />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-5 max-w-[46ch] text-sm leading-[1.9] text-ink/75 md:text-base"
            >
              合作、技术交流、复现论文时踩到坑,或者单纯打个招呼,邮件都会回。
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.55, ease: EASE_OUT }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href={`mailto:${profile.email}`}
                className="inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-[filter] duration-300 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                发邮件
              </MagneticButton>
              <MagneticButton
                href={profile.github}
                external
                className="inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted hover:text-accent"
              >
                GitHub @{profile.handle}
              </MagneticButton>
              <button
                type="button"
                onClick={() => smoothTo('top')}
                className="ml-auto font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                回到开始 ↑
              </button>
            </motion.div>
          </div>

          <footer className="mx-auto w-full max-w-[1200px] px-6 pb-8 md:px-10">
            <div className="flex flex-col gap-3 border-t border-line pt-6 font-mono text-[11px] text-muted md:flex-row md:items-center md:justify-between">
              <span>
                © {new Date().getFullYear()} {profile.fullName} {profile.latinName}
              </span>
              <span>
                本站源码{' '}
                <a href={profile.source} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
                  Luz7818/luzzz.me
                </a>
                ,部署在 Vercel
              </span>
              <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
                GitHub @{profile.handle}
              </a>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
