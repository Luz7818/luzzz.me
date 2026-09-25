'use client';

import Reveal from './Reveal';
import type { Project } from '@/data/site';

/** xorshift so each project gets a stable, distinct star field. */
function starField(seed: string, count: number) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const next = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return (h >>> 0) % 10000 / 10000;
  };
  return Array.from({ length: count }, () => ({
    x: next() * 100,
    y: next() * 62,
    r: 0.25 + next() * 0.9,
    o: 0.25 + next() * 0.7,
  }));
}

/** Deterministic placeholder art so cards never look empty before real screenshots land. */
function GeneratedPreview({ seed }: { seed: string }) {
  const dots = starField(seed, 90);

  return (
    <svg viewBox="0 0 100 62" className="h-full w-full" aria-hidden preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
      </defs>
      <rect width="100" height="62" fill={`url(#g-${seed})`} />
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={i % 7 === 0 ? '#7dd3fc' : i % 5 === 0 ? '#fde047' : '#e2e8f0'} opacity={d.o} />
      ))}
    </svg>
  );
}

function Card({ p, preview, index }: { p: Project; preview?: string; index: number }) {
  return (
    <Reveal delay={index * 70} className="h-full">
      <a
        href={p.demo ?? p.url}
        target="_blank"
        rel="noreferrer"
        className="glass group flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(8,145,178,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-ink">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt={`${p.name} preview`}
              className="h-full w-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <GeneratedPreview seed={p.slug} />
          )}
          <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-xs text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1">
            ↗
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="text-lg font-bold text-ink transition-colors group-hover:text-accent md:text-xl">{p.name}</h3>
          <p className="mt-2 flex-1 text-[13px] leading-[1.75] text-ink/70">{p.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded border border-accent/20 bg-accent/5 px-2.5 py-1 text-[11px] text-accent">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4 text-[11px] tracking-wider text-muted">
            <span>
              {p.stars > 0 ? `★ ${p.stars}` : '★ 0'} · {p.language} · {p.updated}
            </span>
            <span className="inline-flex items-center gap-1 text-ink/60 transition-colors group-hover:text-accent">
              查看详情 <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

export default function Projects({ projects, previews }: { projects: Project[]; previews: Record<string, string> }) {
  return (
    <section id="projects" className="relative px-6 py-28 md:px-12 md:py-32">
      <Reveal>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="on-bands text-3xl font-bold md:text-4xl">Projects</h2>
            <p className="on-bands mt-3 text-sm text-muted">从 GitHub 实时挑出来的几个 · 点卡片直达仓库或在线演示</p>
          </div>
          <span className="hidden shrink-0 text-xs tracking-widest text-muted md:block">{projects.length} SELECTED</span>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.slug} p={p} preview={previews[p.slug]} index={i} />
        ))}
      </div>
    </section>
  );
}
