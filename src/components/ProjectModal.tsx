'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

/**
 * 项目简介弹窗:两棵树(项目环岛 / 经典竖排)共用。点击卡片「查看」打开;
 * 桌面双栏大卡(封面 | 详情),底部控制簇 ←/→ 可切换项目(键盘方向键同效),
 * 有 demo 主按钮跳在线体验(站内同页、外链新标签),无 demo 主按钮跳仓库,「源码」恒备。
 * 打开时锁滚动(Lenis stop + 根 overflow),Esc/遮罩关闭,焦点圈限制在弹窗内。
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
  const open = project !== null;
  const canNavigate = !!onNavigate && total > 1;

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
      else if (canNavigate && e.key === 'ArrowLeft') onNavigate(-1);
      else if (canNavigate && e.key === 'ArrowRight') onNavigate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      l?.start();
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      lastFocus.current?.focus?.();
    };
  }, [open, onClose, canNavigate, onNavigate]);

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
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-bg)]/70 p-4 backdrop-blur-md md:p-8"
          onClick={onClose}
          onKeyDown={onKeyDown}
        >
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} 项目简介`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
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
              {preview ? (
                <motion.img
                  key={project.slug}
                  src={preview}
                  alt={`${project.name} 封面`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                  className="absolute inset-0 h-full w-full object-contain p-4 md:p-6"
                  decoding="async"
                />
              ) : (
                <div className="hairline-grid absolute inset-0">
                  <Glyph text={project.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[64px]" />
                </div>
              )}
              {project.demo && <LiveBadge />}

              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate(-1)}
                    aria-label="上一个项目"
                    data-cursor-label="上一个"
                    className="absolute left-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/85 font-mono text-base text-ink shadow-[var(--shadow-card)] backdrop-blur transition-all hover:scale-105 hover:border-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-95"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(1)}
                    aria-label="下一个项目"
                    data-cursor-label="下一个"
                    className="absolute right-4 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/85 font-mono text-base text-ink shadow-[var(--shadow-card)] backdrop-blur transition-all hover:scale-105 hover:border-muted hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-95"
                  >
                    →
                  </button>
                  <span className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-line bg-bg/85 px-3 py-1 font-mono text-[10px] tracking-wide text-ink backdrop-blur">
                    {pad2(index + 1)} / {pad2(total)}
                  </span>
                </>
              )}
            </div>

            {/* 详情栏 */}
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="flex min-w-0 flex-col p-6 md:p-8"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">{project.name}</h3>
                <span className="font-mono text-[10px] text-muted">{project.language}</span>
              </div>
              <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
                {project.tags.join(' / ')}
              </p>
              <p className="mt-4 text-sm leading-[1.85] text-ink/85">{project.summary}</p>
              {project.detail && (
                <p className="mt-3 text-sm leading-[1.9] text-muted">{project.detail}</p>
              )}

              <div className="hairline mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 pt-5 md:mt-auto">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target={isInternal(project.demo) ? undefined : '_blank'}
                    rel="noreferrer"
                    onClick={onClose}
                    data-cursor-label="前往"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
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
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
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
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
