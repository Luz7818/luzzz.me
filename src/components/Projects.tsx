'use client';

import { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import Reveal from './Reveal';
import SpotlightCard from './SpotlightCard';
import type { Project } from '@/data/site';

const GLYPHS: Record<string, string> = {
  zhishuxing: 'ZSX',
  testforge: 'TF',
  'transportation-harness': 'TH',
};

function Meta({ p }: { p: Project }) {
  return (
    <p className="font-mono text-[11px] tracking-wide text-muted">
      {p.language}, ★ {p.stars}, {p.updated.slice(0, 7)}
    </p>
  );
}

function TagLine({ p }: { p: Project }) {
  return <p className="font-mono text-[11px] leading-relaxed text-muted">{p.tags.join(' / ')}</p>;
}

function Actions({ p }: { p: Project }) {
  return (
    <div className="flex items-center gap-5 border-t border-line pt-4">
      <a
        href={p.url}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        源码
      </a>
      {p.demo && (
        <a
          href={p.demo}
          className="text-sm font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          在线体验
        </a>
      )}
      <span className="ml-auto">
        <Meta p={p} />
      </span>
    </div>
  );
}

/* 语义状态徽标:绿色只在这里出现,表示该项目的 demo 就部署在本站(Act2Ring 环卡复用) */
export function LiveBadge() {
  return (
    <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/85 px-2.5 py-1 font-mono text-[10px] text-ink backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />
      线上可玩
    </span>
  );
}

export function Glyph({ text, className }: { text: string; className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none font-mono font-bold leading-none text-ink/[0.08] ${className}`}
    >
      {text}
    </span>
  );
}

function Shot({ p, preview, eager = false }: { p: Project; preview?: string; eager?: boolean }) {
  if (!preview) {
    return (
      <div className="hairline-grid absolute inset-0">
        <Glyph text={GLYPHS[p.slug] ?? p.slug.slice(0, 2).toUpperCase()} className="right-4 top-3 text-[84px]" />
        <span className="absolute bottom-4 left-5 font-mono text-[11px] text-muted">{p.language}</span>
      </div>
    );
  }
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={preview}
        alt={`${p.name} 截图`}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        loading={eager ? 'eager' : 'lazy'}
      />
      <span className="shine" aria-hidden />
    </>
  );
}

/** 竖版大卡:横向卷轴与移动端堆叠共用 */
function ProjectCard({ p, preview, featured = false }: { p: Project; preview?: string; featured?: boolean }) {
  return (
    <SpotlightCard tilt={featured} className="panel group flex h-full flex-col overflow-hidden">
      <a
        href={p.demo ?? p.url}
        target={p.demo ? undefined : '_blank'}
        rel="noreferrer"
        aria-label={`${p.name}${p.demo ? ' 在线演示' : ' 仓库'}`}
        className="relative block aspect-[16/10] overflow-hidden border-b border-line"
      >
        <Shot p={p} preview={preview} eager={featured} />
        {p.demo && <LiveBadge />}
      </a>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className={`font-bold tracking-tight ${featured ? 'text-2xl' : 'text-xl'}`}>{p.name}</h3>
        <p className="mt-3 text-sm leading-[1.85] text-ink/80">{p.summary}</p>
        {featured && p.detail && <p className="mt-3 text-sm leading-[1.9] text-muted">{p.detail}</p>}
        <div className="mt-auto pt-5">
          <TagLine p={p} />
          <div className="mt-4">
            <Actions p={p} />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function Header() {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">项目</h2>
      <p className="mt-4 max-w-[52ch] text-sm leading-[1.85] text-muted">
        五个开源项目。前两个就部署在本站,点「在线体验」直接玩,其余的进 GitHub 仓库。
      </p>
    </div>
  );
}

/**
 * 双形态项目区:
 * - ≥1024px 且未减弱动效(motion-safe:lg:):钉屏横向卷轴,纵向滚动映射轨道 x 平移;
 * - 其余:竖向单列堆叠。
 * 形态切换纯 CSS(变体组合),JS 只喂两个数字:区块高度变量 --dist(直接写 DOM,不经 state,
 * 隐藏标签页也能正确布局)与卷轴 x 的变换函数(每次滚动实测轨道宽度)。
 */
export default function Projects({ projects, previews }: { projects: Project[]; previews: Record<string, string> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // 视口宽度作为 x 变换的第二输入:resize/旋转时强制重算,跨断点后轨道立刻归位,不会停在旧位移
  const vw = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const rawX = useTransform([scrollYProgress, vw] as const, ([v, w]: readonly number[]) => {
    const track = trackRef.current;
    if (!track || w < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 0;
    return -Math.max(0, track.scrollWidth - w + 96) * v;
  });
  const x = useSpring(rawX, { stiffness: 90, damping: 28, mass: 0.6 });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useLayoutEffect(() => {
    const setVar = () => {
      const sec = sectionRef.current;
      const track = trackRef.current;
      vw.set(window.innerWidth);
      if (!sec || !track) return;
      sec.style.setProperty('--dist', `${Math.max(0, track.scrollWidth - window.innerWidth + 96)}px`);
    };
    setVar();
    window.addEventListener('resize', setVar);
    return () => window.removeEventListener('resize', setVar);
  }, [vw]);

  return (
    <div
      ref={sectionRef}
      id="projects"
      className="relative lg:motion-safe:h-[calc(100vh+var(--dist,0px))]"
    >
      <div className="flex flex-col justify-center overflow-hidden py-24 md:py-28 motion-safe:lg:sticky motion-safe:lg:top-0 motion-safe:lg:h-screen motion-safe:lg:py-0">
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <Header />
        </div>

        <Reveal>
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="mt-12 flex flex-col gap-5 px-6 md:px-10 motion-safe:lg:mt-10 motion-safe:lg:w-max motion-safe:lg:flex-row motion-safe:lg:items-stretch motion-safe:lg:gap-6 motion-safe:lg:pl-[max(2.5rem,calc((100vw-1200px)/2+2.5rem))] motion-safe:lg:px-0 motion-safe:lg:pr-24"
          >
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className={`w-full shrink-0 motion-safe:lg:h-[62vh] motion-safe:lg:w-[480px] ${
                i === 0 ? 'motion-safe:lg:w-[720px]' : ''
              }`}
            >
              <ProjectCard p={p} preview={previews[p.slug]} featured={i === 0} />
            </div>
          ))}
          <div aria-hidden className="hidden motion-safe:lg:block motion-safe:lg:w-2 shrink-0" />
          </motion.div>
        </Reveal>

        <div className="mx-auto mt-10 hidden w-full max-w-[1200px] px-6 motion-safe:lg:block md:px-10">
          <div className="h-[2px] w-44 overflow-hidden rounded-full bg-line">
            <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
