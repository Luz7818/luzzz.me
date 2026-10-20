'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import SplitChars from './SplitChars';
import { Glyph, LiveBadge } from './Projects';
import type { Project } from '@/data/site';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;

type LenisLike = { stop: () => void; start: () => void };

function lenis() {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** demo 是否站内路径(同页跳转);外链 demo 与仓库一律新标签 */
const isInternal = (demo: string) => demo.startsWith('/');

const pad2 = (n: number) => String(n).padStart(2, '0');

/** 源卡矩形 → 面板矩形的 FLIP 增量 */
type Delta = { dx: number; dy: number; sx: number; sy: number };

/**
 * 面板:打开时从源卡矩形飞抵展开(FLIP,内容隐藏避免非等比拉伸),
 * 关闭沿原路飞回;无源矩形(窄屏/键盘路径)退化为原地上升。
 * transform-origin 固定 0 0,scale 数学才与位移匹配。
 */
const cardV: Variants = {
  enter: (f: Delta | null) =>
    f
      ? {
          opacity: 0,
          transform: `translate(${f.dx}px, ${f.dy}px) scale(${f.sx}, ${f.sy})`,
        }
      : { opacity: 0, y: 26, scale: 0.94 },
  center: {
    opacity: 1,
    transform: 'translate(0px, 0px) scale(1, 1)',
    transition: { type: 'spring', duration: 0.55, bounce: 0.12 },
  },
  exit: (f: Delta | null) =>
    f
      ? {
          opacity: 0,
          transform: `translate(${f.dx}px, ${f.dy}px) scale(${f.sx}, ${f.sy})`,
          transition: { duration: 0.32, ease: EASE_DRAWER },
        }
      : { opacity: 0, y: 22, scale: 0.96, transition: { duration: 0.2, ease: 'easeIn' } },
};

/** 面板内容:飞行阶段隐藏,落位后显现;关闭先行隐去再飞回 */
const contentV: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: 0.25, delay: 0.24, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } },
};

/** 详情栏:方向感知滑动 + 模糊换场;center 段编排子项错峰(打开时等面板落位再起) */
const colV: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 30 * dir, filter: 'blur(5px)' }),
  center: (dir: number) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: EASE_OUT,
      staggerChildren: 0.05,
      delayChildren: dir === 0 ? 0.32 : 0.05,
    },
  }),
  exit: (dir: number) => ({
    opacity: 0,
    x: -22 * dir,
    filter: 'blur(3px)',
    transition: { duration: 0.18, ease: 'easeIn' },
  }),
};

/** 遮罩式文字上升:整块从自身遮罩内升起(退出随父级整体离场) */
const riseV: Variants = {
  enter: { y: '112%' },
  center: { y: '0%', transition: { duration: 0.42, ease: EASE_OUT } },
};

/** 非遮罩项(带焦点环的操作行)用带透明度的普通上升 */
const fadeV: Variants = {
  enter: { opacity: 0, y: 14 },
  center: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
};

/** 封面图:方向感知 clip 擦除揭幕 + 变焦沉降(打开时等面板落位);旧图在底层快速淡出 */
const imgV: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    scale: 1.14,
    clipPath: dir >= 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
  }),
  center: (dir: number) => ({
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.5, ease: EASE_DRAWER, delay: dir === 0 ? 0.28 : 0 },
  }),
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** 里程表单位:数字列滚动到当前位 */
function RollDigit({ d, reduce }: { d: string; reduce: boolean }) {
  const n = Number(d);
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <motion.span
        className="absolute left-0 top-0 flex flex-col items-center"
        initial={false}
        animate={{ y: `${-n}em` }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 30 }}
      >
        {DIGITS.map((x) => (
          <span key={x} className="block h-[1em] leading-[1em]">
            {x}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function Odometer({ value, total, reduce }: { value: number; total: number; reduce: boolean }) {
  const cur = pad2(value + 1);
  return (
    <span className="inline-flex items-baseline font-mono tracking-wide">
      <RollDigit d={cur[0]} reduce={reduce} />
      <RollDigit d={cur[1]} reduce={reduce} />
      <span className="px-1">/</span>
      <span>{pad2(total)}</span>
    </span>
  );
}

/**
 * 项目简介弹窗:两棵树(项目环岛 / 经典竖排)共用。点击卡片「查看」打开;
 * 桌面双栏大卡(封面 | 详情),封面两侧实体圆钮 ←/→ 切换项目(键盘方向键同效),
 * 有 demo 主按钮跳在线体验(站内同页、外链新标签),无 demo 主按钮跳仓库,「源码」恒备。
 * 动效:面板从源卡矩形 FLIP 飞抵展开(内容落位后显现,避免非等比拉伸)、封面 clip 擦除+
 * 变焦沉降+开盖扫光、里程表计数、详情栏方向感知滑动+遮罩式文字错峰、关闭面板原路飞回;
 * 打开时锁滚动(Lenis stop + 根 overflow),Esc/遮罩关闭,焦点圈限制在弹窗内。
 * reduced-motion 经 MotionConfig 降级 transform 类动画,擦除/里程表按 useReducedMotion 关停。
 */
export default function ProjectModal({
  project,
  preview,
  index = 0,
  total = 1,
  origin,
  onNavigate,
  onClose,
}: {
  project: Project | null;
  preview?: string;
  index?: number;
  total?: number;
  /** 打开时源卡的视口矩形:面板从它 FLIP 飞抵展开 */
  origin?: { x: number; y: number; w: number; h: number } | null;
  onNavigate?: (delta: 1 | -1) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const fromFor = useRef<object | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState<1 | -1 | 0>(0);
  const [from, setFrom] = useState<Delta | null>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const open = project !== null;
  const canNavigate = !!onNavigate && total > 1;

  const go = useCallback(
    (delta: 1 | -1) => {
      if (!onNavigate) return;
      setDir(delta);
      onNavigate(delta);
    },
    [onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const l = lenis();
    l?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (canNavigate && e.key === 'ArrowLeft') go(-1);
      else if (canNavigate && e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      l?.start();
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose, canNavigate, go]);

  // 探针 ref 回调:挂载即测(提交阶段、绘制前)面板终态矩形,换算源卡→面板的 FLIP 增量
  // (每次打开重算;窄屏/减动效退化为原地上升)
  const measureProbe = useCallback(
    (el: HTMLDivElement | null) => {
      probeRef.current = el;
      if (!el || !origin || fromFor.current === origin) return;
      fromFor.current = origin;
      if (reduce || window.innerWidth < 768) {
        setReady(true);
        return;
      }
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      setFrom({
        dx: origin.x - r.left,
        dy: origin.y - r.top,
        sx: origin.w / r.width,
        sy: origin.h / r.height,
      });
      setReady(true);
    },
    [origin, reduce],
  );

  // 简单焦点圈:Tab 在弹窗内首个/末个可聚焦元素处回绕(弹窗本身是全部内容的容器)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const root = cardRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence
        onExitComplete={() => {
          setFrom(null);
          setReady(false);
          fromFor.current = null;
        }}
      >
        {project && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-bg)]/70 p-4 backdrop-blur-md md:p-8"
            onClick={onClose}
            onKeyDown={onKeyDown}
          >
            {/* 探针:与面板同构的隐藏占位,供 FLIP 测量终态矩形(面板挂载后让位) */}
            {!ready && (
              <div
                ref={measureProbe}
                aria-hidden
                className="panel relative grid max-h-[88dvh] w-[min(94vw,1160px)] grid-rows-[auto_1fr] overflow-hidden md:h-[540px] md:grid-cols-[1.3fr_1fr] md:grid-rows-1"
                style={{ visibility: 'hidden' }}
              >
                <div className="aspect-[16/10] md:h-full" />
                <div className="p-6 md:p-8" />
              </div>
            )}
            {ready && (
              <motion.div
                ref={cardRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${project.name} 项目简介`}
                variants={cardV}
                initial="enter"
                animate="center"
                exit="exit"
                custom={from}
                style={{ transformOrigin: '0 0' }}
                className="panel relative grid max-h-[88dvh] w-[min(94vw,1160px)] grid-rows-[auto_1fr] overflow-y-auto overscroll-contain md:h-[540px] md:grid-cols-[1.3fr_1fr] md:grid-rows-1 md:overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="关闭简介"
                  data-cursor-label="关闭"
                  className="absolute top-3 right-3 z-30 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg/85 font-mono text-sm text-muted backdrop-blur transition-colors hover:border-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  ✕
                </button>

                {/* 封面栏:细纹底上完整装裱首图(object-contain 不裁切),桌面占左列整高 */}
                <motion.div
                  variants={contentV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className={`relative aspect-[16/10] overflow-hidden border-b border-line md:aspect-auto md:h-full md:border-b-0 md:border-r ${preview ? 'cover' : ''}`}
                >
                  <div className="hairline-grid absolute inset-0 opacity-70" aria-hidden />
                  <AnimatePresence>
                    {preview && (
                      <motion.img
                        key={project.slug}
                        src={preview}
                        alt={`${project.name} 封面`}
                        variants={imgV}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        custom={dir}
                        className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                        decoding="async"
                      />
                    )}
                  </AnimatePresence>
                  {!preview && (
                    <Glyph text={project.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[64px]" />
                  )}
                  {project.demo && <LiveBadge />}

                  {/* 开盖高光:揭幕后一道扫光掠过封面(站点卡片同语言,仅打开时一次) */}
                  <motion.span
                    aria-hidden
                    initial={{ x: '-170%' }}
                    animate={{ x: '470%' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.7, delay: 0.55, ease: EASE_OUT }}
                    className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 -skew-x-12 bg-[linear-gradient(105deg,transparent_30%,var(--shine)_50%,transparent_70%)]"
                  />

                  {canNavigate && (
                    <>
                      <motion.button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="上一个项目"
                        data-cursor-label="上一个"
                        initial={false}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/85 font-mono text-base text-ink shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:border-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      >
                        ←
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="下一个项目"
                        data-cursor-label="下一个"
                        initial={false}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/85 font-mono text-base text-ink shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:border-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      >
                        →
                      </motion.button>
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.24, ease: EASE_OUT }}
                        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line bg-bg/85 px-3 py-1 text-[10px] text-ink backdrop-blur"
                      >
                        <Odometer value={index} total={total} reduce={reduce} />
                      </motion.span>
                    </>
                  )}
                </motion.div>

                {/* 详情栏:方向感知滑动 + 模糊换场;文字行遮罩式升起,标题逐字 */}
                <motion.div
                  variants={contentV}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative flex min-w-0 flex-col overflow-hidden p-6 md:p-8"
                >
                  <AnimatePresence mode="popLayout" custom={dir}>
                    <motion.div
                      key={project.slug}
                      custom={dir}
                      variants={colV}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="flex min-h-0 flex-1 flex-col"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">
                          <SplitChars text={project.name} stagger={0.02} delay={0.06} wrapperClassName="block" />
                        </h3>
                        <span className="font-mono text-[10px] text-muted">{project.language}</span>
                      </div>
                      <div className="mt-2 overflow-hidden">
                        <motion.div variants={riseV}>
                          <p className="font-mono text-[11px] leading-relaxed text-muted">
                            {project.tags.join(' / ')}
                          </p>
                        </motion.div>
                      </div>
                      <div className="mt-4 overflow-hidden">
                        <motion.div variants={riseV}>
                          <p className="text-sm leading-[1.85] text-ink/85">{project.summary}</p>
                        </motion.div>
                      </div>
                      {project.detail && (
                        <div className="mt-3 overflow-hidden">
                          <motion.div variants={riseV}>
                            <p className="text-sm leading-[1.9] text-muted">{project.detail}</p>
                          </motion.div>
                        </div>
                      )}

                      <motion.div
                        variants={fadeV}
                        className="hairline mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 md:mt-auto"
                      >
                        {project.demo ? (
                          <a
                            href={project.demo}
                            target={isInternal(project.demo) ? undefined : '_blank'}
                            rel="noreferrer"
                            onClick={onClose}
                            data-cursor-label="前往"
                            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                          >
                            在线体验 <span aria-hidden>↗</span>
                          </a>
                        ) : (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={onClose}
                            data-cursor-label="前往"
                            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-transform hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                          >
                            查看仓库 <span aria-hidden>↗</span>
                          </a>
                        )}
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          onClick={onClose}
                          className="link-line text-sm font-medium text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                        >
                          源码
                        </a>
                        <span className="ml-auto font-mono text-[11px] text-muted">
                          ★ {project.stars} · {project.updated.slice(0, 7)}
                        </span>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
