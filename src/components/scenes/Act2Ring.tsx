'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import SplitChars from '../SplitChars';
import SpotlightCard from '../SpotlightCard';
import { CoverGrade, Glyph, LiveBadge } from '../Projects';
import { easeOutQuart, glideScrollTo, registerPageBound, registerSceneAnchors, registerSnapAnchors, smoothTo } from '../SmoothScroll';
import type { Project } from '@/data/site';

const N = 5; // 与 site.ts 的 projects 数量一致
const STEP = 360 / N;
/** 环旋转占幕进度的窗口:头尾留出入场/交棒 */
const CORE: [number, number] = [0.06, 0.94];
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

type LenisLike = { scrollTo: (t: number, o?: object) => void; limit: number; resize: () => void };

function lenis() {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/** 后台节流会把 Lenis 的 limit 塌成 0(其 resize 跑在 rAF 里);拖拽前自愈一次 */
function healLenis() {
  const l = lenis();
  if (l && l.limit < 100) l.resize();
}

/** 拖拽转环的调参:deadzone 内放行点击;甩动速度阈值 px/ms;
 *  橡皮筋:超出首末整卡的拖拽量按 RUBBER 阻尼折成视觉旋转,最多过冲 MAX_OVER_DEG */
const DRAG_DEADZONE = 5;
const FLICK_V = 0.35;
const RUBBER = 0.3;
const MAX_OVER_DEG = 12;

/** 单张环卡:固定在环上的角度,亮度/透明度随正面角变化,背面不渲染。
 *  悬停时回报自己的序号(侧卡预览:底部信息淡换成这张卡)。 */
function RingCard({
  i,
  rotation,
  radius,
  project,
  preview,
  measureRef,
  onHoverChange,
}: {
  i: number;
  rotation: MotionValue<number>;
  radius: number;
  project: Project;
  preview?: string;
  measureRef?: (el: HTMLDivElement | null) => void;
  onHoverChange?: (i: number | null) => void;
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
      onPointerEnter={() => onHoverChange?.(i)}
      onPointerLeave={() => onHoverChange?.(null)}
    >
      <SpotlightCard className="panel ring-card overflow-hidden">
        <a
          href={p.demo ?? p.url}
          target={p.demo ? undefined : '_blank'}
          rel="noreferrer"
          data-cursor-label="查看"
          aria-label={`${p.name}${p.demo ? ' 在线演示' : ' 仓库'}`}
          className="group block"
        >
          <div className={`relative aspect-[16/10] overflow-hidden border-b border-line ${preview ? 'cover' : ''}`}>
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt={`${p.name} 封面`}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="hairline-grid absolute inset-0">
                <Glyph text={p.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[64px]" />
              </div>
            )}
            {preview && <CoverGrade />}
            {p.demo && <LiveBadge />}
            <span className="shine" aria-hidden />
          </div>
          <div className="p-4 md:p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-base font-bold tracking-[-0.01em] md:text-lg">{p.name}</h3>
              <span className="font-mono text-[10px] text-muted">{p.language}</span>
            </div>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
              {p.tags.slice(0, 3).join(' / ')}
            </p>
          </div>
        </a>
      </SpotlightCard>
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
  // 侧卡悬停预览:悬停哪张,底部信息就淡换成哪张;移开回落到活动卡
  const [preview, setPreview] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const sp = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  const pNorm = useTransform(sp, CORE, [0, 1]);
  const rotation = useTransform(pNorm, (v) => -v * (N - 1) * STEP);
  // 入场跑道须在对齐位(CORE[0])之前留出余量结束,否则停在那附近整环被透视推远、首卡显小;
  // ease-out 减速落位:透视放大本身前慢后快,反着衬正好匀速长大
  const enterZ = useTransform(sp, [0, 0.045], [-950, 0], { ease: easeOutQuart });
  const enterO = useTransform(sp, [0.008, 0.04], [0, 1], { ease: easeOutQuart });
  // 拖拽橡皮筋:拖出首末整卡时滚动钉在边界,超出量以阻尼折成视觉旋转(弹簧跟随,松手弹回)
  const dragOffset = useMotionValue(0);
  const dragOffsetSpring = useSpring(dragOffset, { stiffness: 320, damping: 32 });
  const totalRot = useTransform([rotation, dragOffsetSpring] as const, ([r, d]: readonly number[]) => r + d);
  const ringT = useMotionTemplate`translateZ(${enterZ}px) rotateY(${totalRot}deg)`;

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

  // ---- 拖拽转环:横向位移实时折算成滚动(复用 scroll→rotation 管线,面板/点阵/吸附零改动) ----
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    minS: 0,
    maxS: 0,
    moved: false,
    samples: [] as Array<{ x: number; t: number }>,
  });

  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const d = dragRef.current;
    d.active = true;
    d.pointerId = e.pointerId;
    d.startX = e.clientX;
    d.startScroll = window.scrollY;
    d.moved = false;
    d.samples = [{ x: e.clientX, t: performance.now() }];
    healLenis();
    // 拖拽边界 = 首末整卡锚点:超出部分不滚页面,走橡皮筋
    // (先算边界再捕获——capture 失败不应拖垮边界状态)
    const wrap = wrapRef.current;
    if (wrap) {
      const span = wrap.offsetHeight - window.innerHeight;
      const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      d.minS = wrapTop + CORE[0] * span;
      d.maxS = wrapTop + CORE[1] * span;
    }
    dragOffset.set(0);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* 合成事件/已释放的 pointerId 无从捕获:拖拽仍可用,只是指针移出舞台后不再跟踪 */
    }
  };

  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) < DRAG_DEADZONE) return;
    d.moved = true;
    d.samples.push({ x: e.clientX, t: performance.now() });
    if (d.samples.length > 5) d.samples.shift();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const span = wrap.offsetHeight - window.innerHeight;
    const scrollPerCard = (span * (CORE[1] - CORE[0])) / (N - 1);
    // 一整卡对应的拖拽距离:随视口宽缩放,窄屏更短更好甩
    const dragCardPx = Math.min(640, Math.max(260, window.innerWidth * 0.42));
    const target = d.startScroll - dx * (scrollPerCard / dragCardPx);
    // 钉在首末整卡之间;超出量按阻尼折成视觉旋转过冲,不再泄漏到相邻幕
    const clamped = Math.min(d.maxS, Math.max(d.minS, target));
    const over = target - clamped;
    const l = lenis();
    if (l) l.scrollTo(clamped, { immediate: true });
    else window.scrollTo(0, clamped);
    const degPerScroll = ((N - 1) * STEP) / span;
    dragOffset.set(Math.max(-MAX_OVER_DEG, Math.min(MAX_OVER_DEG, -over * degPerScroll * RUBBER)));
  };

  const onStagePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active || e.pointerId !== d.pointerId) return;
    d.active = false;
    if (!d.moved) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    healLenis();
    // 最近 100ms 的横向速度决定是否甩到下一张/上一张
    const s = d.samples;
    const last = s[s.length - 1];
    const first = s.find((p) => last.t - p.t < 100) ?? s[0];
    const vx = (last.x - first.x) / Math.max(1, last.t - first.t);
    const span = wrap.offsetHeight - window.innerHeight;
    // 当前进度按幕内位置算:scrollY 要先减掉第二幕的页顶偏移
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    const v = ((window.scrollY - wrapTop) / span - CORE[0]) / (CORE[1] - CORE[0]);
    let k = Math.round(v * (N - 1));
    if (Math.abs(vx) > FLICK_V) k += vx < 0 ? 1 : -1;
    k = Math.min(N - 1, Math.max(0, k));
    const yk =
      wrapTop + (CORE[0] + (k / (N - 1)) * (CORE[1] - CORE[0])) * span;
    glideScrollTo(yk, 0.55);
    // 橡皮筋回弹:过冲的视觉旋转弹簧归零(范围内本就是 0,无感)
    dragOffset.set(0);
  };

  /** 拖拽过后不触发卡片链接:位移超过 deadzone 的手势在捕获阶段拦掉 click */
  const onStageClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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

  const goTo = useCallback(
    (k: number) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const total = wrap.offsetHeight - window.innerHeight;
      glideScrollTo(
        wrap.getBoundingClientRect().top +
          window.scrollY +
          (CORE[0] + (k / (N - 1)) * (CORE[1] - CORE[0])) * total,
        0.6,
      );
    },
    [],
  );

  // 跑马灯词条直达:按 slug 吸附到对应整卡(经典竖排树由 Projects 接管)
  useEffect(() => {
    const onJump = (e: Event) => {
      const slug = (e as CustomEvent<{ slug?: string }>).detail?.slug;
      if (!slug) return;
      const k = projects.findIndex((p) => p.slug === slug);
      if (k >= 0) goTo(k);
    };
    window.addEventListener('luzzz-project-jump', onJump);
    return () => window.removeEventListener('luzzz-project-jump', onJump);
  }, [projects, goTo]);

  // 键盘导航:环岛聚焦时,←/→ 转卡、数字键直达、Home/End 回顶/联系
  // (只在舞台聚焦时接管按键,不全局劫持方向键,键盘滚页不受影响)
  const onStageKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(Math.max(0, active - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(Math.min(N - 1, active + 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      smoothTo('top');
    } else if (e.key === 'End') {
      e.preventDefault();
      smoothTo('contact');
    } else if (/^[1-9]$/.test(e.key) && Number(e.key) <= N) {
      e.preventDefault();
      goTo(Number(e.key) - 1);
    }
  };

  // 底部信息跟随:悬停侧卡时预览那张卡,移开/无悬停时回到活动卡
  const shown = preview ?? active;
  const p = projects[shown];

  return (
    <div ref={wrapRef} className="relative h-[480vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ opacity: stageO, transform: stageT }} className="flex h-full flex-col">
          <header className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pt-20 md:px-10 md:pt-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-[-0.01em] md:text-4xl">项目</h2>
                <p className="mt-2 hidden text-sm text-muted md:block">拖拽或滚动旋转环岛 · 松手自动对齐整卡</p>
              </div>
              <p aria-hidden className="font-mono text-xs text-muted">
                0{active + 1} / 0{N}
              </p>
            </div>
          </header>

          <div
            className="ring-stage relative flex-1 select-none touch-pan-y focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent/40"
            data-cursor-label="拖转"
            tabIndex={0}
            role="group"
            aria-roledescription="轮播"
            aria-label="项目环岛:左右方向键转卡,数字键 1-5 直达,Home 回顶部,End 去联系"
            onPointerDown={onStagePointerDown}
            onPointerMove={onStagePointerMove}
            onPointerUp={onStagePointerEnd}
            onPointerCancel={onStagePointerEnd}
            onClickCapture={onStageClickCapture}
            onKeyDown={onStageKeyDown}
          >
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
                  onHoverChange={setPreview}
                />
              ))}
            </motion.div>
          </div>

          <footer className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-7 md:px-10">
            <div className="flex items-end justify-between gap-8">
              <div key={shown} className="min-h-[148px] max-w-[620px] md:min-h-[168px]">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <h3 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">
                    <SplitChars text={p.name} stagger={0.028} />
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-ink/80">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line text-sm font-medium text-muted transition-colors hover:text-accent"
                    >
                      源码
                    </a>
                    {p.demo && (
                      <a
                        href={p.demo}
                        className="link-line text-sm font-medium text-ink transition-colors hover:text-accent"
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
                    className="group relative flex items-center gap-2.5 focus-visible:outline-none"
                  >
                    {/* hover 预览小签:扫一眼就知道这一格是哪个项目 */}
                    <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-line bg-[var(--nav-glass)] px-3 py-1 font-mono text-[10px] text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      {proj.name}
                    </span>
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
