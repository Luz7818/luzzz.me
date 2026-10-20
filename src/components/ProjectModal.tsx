'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, MotionConfig, type Variants } from 'motion/react';
import SplitChars from './SplitChars';
import { Glyph, LiveBadge } from './Projects';
import type { Project } from '@/data/site';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type LenisLike = { stop: () => void; start: () => void };

function lenis() {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** demo 是否站内路径(同页跳转);外链 demo 与仓库一律新标签 */
const isInternal = (demo: string) => demo.startsWith('/');

const pad2 = (n: number) => String(n).padStart(2, '0');

/** 卡片:弹簧落位(打开)/下沉淡出(关闭) */
const cardV: Variants = {
  enter: { opacity: 0, y: 44, scale: 0.96 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 },
  },
  exit: { opacity: 0, y: 26, scale: 0.97, transition: { duration: 0.2, ease: 'easeIn' } },
};

/** 详情栏:方向感知滑动 + 模糊换场;center 段编排子元素错峰升起 */
const colV: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: 44 * dir, filter: 'blur(6px)' }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.38, ease: EASE_OUT, staggerChildren: 0.055, delayChildren: 0.05 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: -30 * dir,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

/** 详情栏子项:跟随 colV 的错峰编排升起 */
const itemV: Variants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.14, ease: 'easeIn' } },
};

/** 封面图:变焦沉降(打开与切换共用),双图交叠淡入淡出 */
const imgV: Variants = {
  enter: { opacity: 0, scale: 1.045 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.24, ease: 'easeIn' } },
};

/**
 * 项目简介弹窗:两棵树(项目环岛 / 经典竖排)共用。点击卡片「查看」打开;
 * 桌面双栏大卡(封面 | 详情),封面两侧实体圆钮 ←/→ 切换项目(键盘方向键同效),
 * 有 demo 主按钮跳在线体验(站内同页、外链新标签),无 demo 主按钮跳仓库,「源码」恒备。
 * 动效:卡片弹簧落位、封面变焦沉降、详情栏方向感知滑动+模糊换场+子项错峰;
 * 打开时锁滚动(Lenis stop + 根 overflow),Esc/遮罩关闭,焦点圈限制在弹窗内。
 * reduced-motion 经 MotionConfig 自动降级(transform 类动画直取终态)。
 */
export default function ProjectModal({
  project,
  preview,
  index = 0,
  total = 1,
  onNavigate,
  onClose,
}: {
  project: Project | null;
  preview?: string;
  index?: number;
  total?: number;
  onNavigate?: (delta: 1 | -1) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
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
      <AnimatePresence>
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
            <motion.div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${project.name} 项目简介`}
              variants={cardV}
              initial="enter"
              animate="center"
              exit="exit"
              className="panel relative grid max-h-[88dvh] w-[min(94vw,1160px)] overflow-y-auto overscroll-contain md:grid-cols-[1.3fr_1fr]"
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
              <div
                className={`relative aspect-[16/10] overflow-hidden border-b border-line md:aspect-auto md:min-h-[520px] md:border-b-0 md:border-r ${preview ? 'cover' : ''}`}
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
                      className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                      decoding="async"
                    />
                  )}
                </AnimatePresence>
                {!preview && (
                  <Glyph text={project.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[64px]" />
                )}
                {project.demo && <LiveBadge />}

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
                      className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line bg-bg/85 px-3 py-1 font-mono text-[10px] tracking-wide text-ink backdrop-blur"
                    >
                      {pad2(index + 1)} / {pad2(total)}
                    </motion.span>
                  </>
                )}
              </div>

              {/* 详情栏:方向感知滑动 + 模糊换场,子项错峰升起,标题逐字入场 */}
              <div className="relative flex min-w-0 flex-col overflow-hidden p-6 md:p-8">
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
                    <motion.p
                      variants={itemV}
                      className="mt-2 font-mono text-[11px] leading-relaxed text-muted"
                    >
                      {project.tags.join(' / ')}
                    </motion.p>
                    <motion.p variants={itemV} className="mt-4 text-sm leading-[1.85] text-ink/85">
                      {project.summary}
                    </motion.p>
                    {project.detail && (
                      <motion.p variants={itemV} className="mt-3 text-sm leading-[1.9] text-muted">
                        {project.detail}
                      </motion.p>
                    )}

                    <motion.div
                      variants={itemV}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
