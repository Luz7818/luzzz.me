'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from 'motion/react';
import SplitChars from '../SplitChars';
import MagneticButton from '../MagneticButton';
import { registerPageBound, registerSceneAnchors, registerSnapAnchors, smoothTo } from '../SmoothScroll';
import { profile, stats } from '@/data/site';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * 第三幕 · 工牌(340vh):玻璃工牌先递到你面前,随滚动轻微放大后整块淡出,
 * 同源玻璃渐变铺满全屏成为联系页底色——工牌化开成联系页。结尾保留页脚与回顶。
 */
export default function Act3Badge() {
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5 });

  // 邮箱一键复制:点击大标题即复制,字符就地翻成「已复制 ✓」,1.2s 后翻回(无 toast)
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');
  const copyTimer = useRef(0);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied('ok');
    } catch {
      setCopied('fail');
    }
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied('idle'), 1200);
  };
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  // 落场:从下方带透视递入;交棒段整块淡出
  const dropY = useTransform(sp, [0, 0.14], ['46vh', '0vh']);
  const dropRX = useTransform(sp, [0, 0.14], [26, 0]);
  const dropO = useTransform(sp, [0, 0.08, 0.46, 0.58], [0, 1, 1, 0]);
  // 微放大:轻轻放大 1.45× 即止,文字在 ~1.3× 前就随 chrome 淡出,全程不糊屏
  const zoomT = useTransform(sp, (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.16) / 0.34));
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return 1 + 0.45 * e;
  });
  // 牌面高光扫过(只发生在放大段)
  const sheenX = useTransform(sp, [0.18, 0.48], ['-140%', '140%']);
  const sheenO = useTransform(sp, [0.16, 0.24, 0.42, 0.5], [0, 1, 1, 0]);
  // 背景压暗聚焦
  const dimO = useTransform(sp, [0.14, 0.55], [0, 0.5]);
  // 联系页底色:与工牌同源的渐变铺满全屏,接住淡出的牌面
  const coverO = useTransform(sp, [0.44, 0.62], [0, 1]);
  // 牌面内容 → 联系页
  const chromeO = useTransform(sp, [0.38, 0.5], [1, 0]);
  const chromeS = useTransform(sp, [0.38, 0.52], [1, 1.06]);
  const contactO = useTransform(sp, [0.52, 0.7], [0, 1]);
  const contactY = useTransform(sp, [0.52, 0.76], [36, 0]);
  const contactPE = useTransform(contactO, (o) => (o < 0.5 ? ('none' as const) : ('auto' as const)));
  const badgeT = useMotionTemplate`translateY(${dropY}) scale(${zoomT}) rotateX(${dropRX}deg)`;
  const chromeT = useMotionTemplate`scale(${chromeS})`;

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

        {/* 联系页底色:与工牌同源的玻璃渐变铺满全屏,接住淡出的牌面 */}
        <motion.div
          aria-hidden
          style={{ opacity: coverO }}
          className="badge-cover pointer-events-none absolute inset-0"
        >
          <div className="hairline-grid absolute inset-0 opacity-40" />
        </motion.div>

        {/* 工牌本体 */}
        <div className="relative [perspective:1200px]">
          <motion.div
            style={{ transform: badgeT, opacity: dropO, willChange: 'transform' }}
            className="relative"
          >
            <div className="badge-slab relative w-[min(80vw,330px)] p-6 md:w-[330px]">
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

            {/* 牌面内容(微放大段淡出,交给联系页) */}
            <motion.div style={{ opacity: chromeO, transform: chromeT }} className="relative z-[2]">
              {/* 全息箔带与角部极光晕:纯装饰,随牌面一起淡出 */}
              <span aria-hidden className="badge-foil" />
              <span aria-hidden className="badge-blob -right-14 -top-16" />

              <div className="flex justify-center">
                <div className="badge-slot" />
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[conic-gradient(from_210deg,var(--color-accent),transparent_32%,var(--color-live)_55%,transparent_78%,var(--color-accent))] p-[2px]">
                  <span className="grid h-full w-full place-items-center rounded-full bg-[var(--nav-glass)] font-mono text-sm font-bold text-accent">
                    LZ
                  </span>
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                  LUZ · STAFF PASS
                </span>
              </div>

              <div className="mt-6">
                <p className="text-3xl font-bold tracking-[-0.01em]">{profile.fullName}</p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {profile.latinName} · @{profile.handle}
                </p>
                <p className="mt-4 inline-flex rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink/85">
                  {profile.kicker}
                </p>
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
                  OPEN TO · 合作 / 实习
                </p>
              </div>

              <div className="hairline mt-6 space-y-2.5 pt-5">
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
                  className="link-line flex items-center gap-2.5 font-mono text-[12px] text-ink transition-colors hover:text-accent"
                >
                  <span className="text-accent">ƒ</span>
                  github.com/{profile.handle}
                </a>
              </div>

              <p className="mt-4 font-mono text-[10px] leading-relaxed text-muted">
                {stats.map((s, i) => (
                  <span key={s.label}>
                    {i > 0 && <span className="mx-1.5 opacity-50">·</span>}
                    <span className="font-bold tabular-nums text-ink/85">{s.value}</span> {s.label}
                  </span>
                ))}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span aria-hidden className="badge-stripes h-6 w-24 opacity-60" />
                <span className="font-mono text-[10px] text-muted">luzzz.me · № 0001</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        </div>

        {/* 联系页:同源底色接住淡出的工牌后,内容原位浮现 */}
        <motion.div
          style={{ opacity: contactO, y: contactY, pointerEvents: contactPE }}
          className="absolute inset-0 z-10 flex flex-col"
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 md:px-10">
            <p className="font-mono text-[13px] text-muted">联系 · 保持通话</p>
            <h2 className="mt-4 text-[clamp(1.6rem,4.6vw,3.6rem)] font-bold leading-[1.2] tracking-[-0.01em]">
              <button
                type="button"
                onClick={copyEmail}
                title="点击复制邮箱"
                data-cursor-label="复制"
                aria-live="polite"
                className="block cursor-pointer text-left transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                {copied === 'idle' ? (
                  <SplitChars
                    text={profile.email}
                    wrapperClassName="block"
                    charClassName="text-accent"
                    stagger={0.022}
                    delay={0.1}
                  />
                ) : (
                  <motion.span
                    className="block text-accent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {copied === 'ok' ? '已复制 ✓' : '复制失败,请手动输入'}
                  </motion.span>
                )}
              </button>
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
                className="btn-primary inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                发邮件
              </MagneticButton>
              <MagneticButton
                href={profile.github}
                external
                className="btn-ghost inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted hover:text-accent"
              >
                GitHub @{profile.handle}
                <span className="arrow ml-1.5" aria-hidden>
                  ↗
                </span>
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
            <div className="hairline flex flex-col gap-3 pt-6 font-mono text-[11px] text-muted md:flex-row md:items-center md:justify-between">
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
