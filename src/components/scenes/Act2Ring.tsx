'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import SplitChars from '../SplitChars';
import { Glyph, LiveBadge } from '../Projects';
import { easeOutQuart, registerPageBound, registerSceneAnchors, registerSnapAnchors } from '../SmoothScroll';
import type { Project } from '@/data/site';

const N = 5; // 与 site.ts 的 projects 数量一致
const STEP = 360 / N;
/** 环旋转占幕进度的窗口:头尾留出入场/交棒 */
const CORE: [number, number] = [0.06, 0.94];
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type LenisLike = { scrollTo: (t: number, o?: object) => void };

function lenis() {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

function scrollToY(y: number) {
  const l = lenis();
  if (l) l.scrollTo(Math.max(0, y), { duration: 0.6, easing: easeOutQuart });
  else window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}

/** 单张环卡:固定在环上的角度,亮度/透明度随正面角变化,背面不渲染 */
function RingCard({
  i,
  rotation,
  radius,
  project,
  preview,
  measureRef,
}: {
  i: number;
  rotation: MotionValue<number>;
  radius: number;
  project: Project;
  preview?: string;
  measureRef?: (el: HTMLDivElement | null) => void;
}) {
  const angle = i * STEP;
  const front = useTransform(rotation, (rot) => {
    const a = (((angle + rot) % 360) + 360) % 360;
    const d = Math.min(a, 360 - a);
    return Math.cos((d * Math.PI) / 180);
  });
  const opacity = useTransform(front, (f) => 0.12 + 0.88 * Math.max(0, f));
  const filter = useTransform(front, (f) => {
    const c = Math.max(0, f);
    return `brightness(${0.45 + 0.55 * c}) saturate(${0.65 + 0.35 * c})`;
  });
  const pe = useTransform(front, (f) => (f < 0.35 ? 'none' : 'auto') as 'none' | 'auto');
  const p = project;

  return (
    <motion.div
      ref={measureRef}
      className="ring-3d absolute left-1/2 top-1/2 w-[min(70vw,320px)] md:w-[min(30vw,380px)]"
      style={{
        transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
        opacity,
        filter,
        pointerEvents: pe,
      }}
    >
      <div className="panel ring-card overflow-hidden">
        <a
          href={p.demo ?? p.url}
          target={p.demo ? undefined : '_blank'}
          rel="noreferrer"
          data-cursor-label="查看"
          aria-label={`${p.name}${p.demo ? ' 在线演示' : ' 仓库'}`}
          className="group block"
        >
          <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt={`${p.name} 封面`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="hairline-grid absolute inset-0">
                <Glyph text={p.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[64px]" />
              </div>
            )}
            {p.demo && <LiveBadge />}
            <span className="shine" aria-hidden />
          </div>
          <div className="p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-bold tracking-tight md:text-lg">{p.name}</h3>
              <span className="font-mono text-[10px] text-muted">{p.language}</span>
            </div>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
              {p.tags.slice(0, 3).join(' / ')}
            </p>
          </div>
        </a>
      </div>
    </motion.div>
  );
}

/**
 * 第二幕 · 项目环形(480vh):五张作品卡架在 3D 环岛上,滚动驱动整环自右向左旋转;
 * 滚动停止 0.5s 后自动吸附到最近的整卡(lenis 四次缓动归位)。
 * 底部信息面板跟随活动卡逐字入场,右侧点阵可直接跳转。
 */
export default function Act2Ring({ projects, previews }: { projects: Project[]; previews: Record<string, string> }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(420);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  const pNorm = useTransform(sp, CORE, [0, 1]);
  const rotation = useTransform(pNorm, (v) => -v * (N - 1) * STEP);
  // 入场跑道须在对齐位(CORE[0])之前留出余量结束,否则停在那附近整环被透视推远、首卡显小;
  // ease-out 减速落位:透视放大本身前慢后快,反着衬正好匀速长大
  const enterZ = useTransform(sp, [0, 0.045], [-950, 0], { ease: easeOutQuart });
  const enterO = useTransform(sp, [0.008, 0.04], [0, 1], { ease: easeOutQuart });
  const ringT = useMotionTemplate`translateZ(${enterZ}px) rotateY(${rotation}deg)`;

  // 半径由实测卡宽推出:相邻卡心弦长 = 2R·sin(π/N) ≥ 卡宽 + 间隙
  useLayoutEffect(() => {
    const measure = () => {
      const el = measureRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      const gap = window.innerWidth < 768 ? 20 : window.innerWidth < 1280 ? 44 : 64;
      setRadius((w + gap) / (2 * Math.sin(Math.PI / N)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (measureRef.current) ro.observe(measureRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // 交棒给第三幕:整体轻微上移淡出
  const stageO = useTransform(sp, [0.93, 1], [1, 0.2]);
  const stageY = useTransform(sp, [0.93, 1], [0, -48]);
  const stageT = useMotionTemplate`translateY(${stageY}px)`;

  useMotionValueEvent(pNorm, 'change', (v) => {
    const k = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    setActive((prev) => (prev === k ? prev : k));
  });

  // 吸附锚点交给全局控制器(SmoothScroll):五张卡的整卡位置
  useEffect(() => {
    const anchors = Array.from({ length: N }, (_, k) => () => {
      const wrap = wrapRef.current;
      if (!wrap) return 0;
      const total = wrap.offsetHeight - window.innerHeight;
      return (
        wrap.getBoundingClientRect().top +
        window.scrollY +
        (CORE[0] + (k / (N - 1)) * (CORE[1] - CORE[0])) * total
      );
    });
    const unsnap = registerSnapAnchors(anchors);
    return () => unsnap();
  }, []);

  // 导航「项目」直落第一张卡的整卡对齐位(与吸附锚点 0 重合),避免先落到幕顶空帧再被吸附拉走
  useEffect(() => {
    const unscene = registerSceneAnchors({
      projects: () => {
        const el = wrapRef.current;
        if (!el) return 0;
        return (
          el.getBoundingClientRect().top +
          window.scrollY +
          CORE[0] * (el.offsetHeight - window.innerHeight)
        );
      },
    });
    const unbound = registerPageBound(() => {
      const el = wrapRef.current;
      return el ? el.getBoundingClientRect().top + window.scrollY : 0;
    });
    return () => {
      unscene();
      unbound();
    };
  }, []);

  const goTo = (k: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const y =
      wrap.getBoundingClientRect().top +
      window.scrollY +
      (CORE[0] + (k / (N - 1)) * (CORE[1] - CORE[0])) * total;
    scrollToY(y);
  };

  const p = projects[active];

  return (
    <div ref={wrapRef} className="relative h-[480vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ opacity: stageO, transform: stageT }} className="flex h-full flex-col">
          <header className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">项目</h2>
                <p className="mt-2 hidden text-sm text-muted md:block">滚动旋转环岛 · 停住自动对齐整卡</p>
              </div>
              <p aria-hidden className="font-mono text-xs text-muted">
                0{active + 1} / 0{N}
              </p>
            </div>
          </header>

          <div className="ring-stage relative flex-1">
            <motion.div
              className="ring-3d absolute left-1/2 top-1/2 h-0 w-0 will-change-transform"
              style={{ transform: ringT, opacity: enterO }}
            >
              {projects.map((proj, i) => (
                <RingCard
                  key={proj.slug}
                  i={i}
                  rotation={rotation}
                  radius={radius}
                  project={proj}
                  preview={previews[proj.slug]}
                  measureRef={
                    i === 0
                      ? (el) => {
                          measureRef.current = el;
                        }
                      : undefined
                  }
                />
              ))}
            </motion.div>
          </div>

          <footer className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-7 md:px-10">
            <div className="flex items-end justify-between gap-8">
              <div key={active} className="min-h-[148px] max-w-[620px] md:min-h-[168px]">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                    <SplitChars text={p.name} stagger={0.028} />
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-ink/80">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-muted transition-colors hover:text-accent"
                    >
                      源码
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        className="text-sm font-medium text-ink transition-colors hover:text-accent"
                      >
                        在线体验
                      </a>
                    )}
                    <span className="font-mono text-[11px] text-muted">
                      {p.language} · ★ {p.stars} · {p.updated.slice(0, 7)}
                    </span>
                  </div>
                </motion.div>
              </div>

              <nav aria-label="项目切换" className="hidden flex-col items-end gap-2.5 md:flex">
                {projects.map((proj, i) => (
                  <button
                    key={proj.slug}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`转到 ${proj.name}`}
                    aria-current={i === active}
                    className="group flex items-center gap-2.5 focus-visible:outline-none"
                  >
                    <span
                      className={`font-mono text-[10px] transition-colors ${
                        i === active ? 'text-accent' : 'text-muted/0 group-hover:text-muted'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={`block h-px transition-all duration-300 ${
                        i === active ? 'w-10 bg-accent' : 'w-4 bg-line group-hover:bg-muted'
                      }`}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
