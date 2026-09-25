'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { services, profile, type Service } from '@/data/site';

const ICONS: Record<Service['icon'], React.ReactNode> = {
  star: <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />,
  flow: <path d="M4 6h6M4 18h6M14 6h6M14 18h6M7 6v12M17 6v12M7 12h10" />,
  grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  chart: <path d="M4 19h16M7 15l4-6 3 4 4-7" />,
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 5.5v15" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />,
};

function Row({ item, open, onToggle }: { item: Service; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-ink/8 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ink/[0.03] focus:outline-none focus-visible:bg-ink/[0.05] md:px-6 md:py-5"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 bg-white/70 text-ink/70 transition-colors group-hover:text-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            {ICONS[item.icon]}
          </svg>
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className={`text-base font-bold transition-all md:text-lg ${open ? 'text-accent' : 'text-ink'}`}>
              {item.name}
            </span>
            <span className="text-xs text-muted md:text-[13px]">{item.sub}</span>
          </span>
        </span>

        {item.live && (
          <span className="rounded border border-live/30 bg-live/10 px-2 py-0.5 text-[10px] tracking-widest text-live">
            LIVE
          </span>
        )}
        <span
          className="shrink-0 text-muted transition-transform duration-300"
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          →
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
      >
        <div className="min-h-0">
          <p className="max-w-3xl px-5 pt-0 pb-6 pl-[76px] text-sm leading-[1.8] text-ink/70 md:px-6 md:pl-[84px]">
            {item.detail}
            {item.href && (
              <>
                {' · '}
                <a href={item.href} target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
                  源码 ↗
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="services" className="relative px-6 py-28 md:px-12 md:py-32">
      <Reveal>
        <h2 className="on-bands text-3xl font-bold md:text-4xl">Services</h2>
        <p className="on-bands mt-3 text-sm text-muted">最近在做的几件事 · 点开看详情 · 都能直接跑起来</p>
      </Reveal>

      <Reveal delay={120}>
        <div className="glass mt-10 overflow-hidden rounded-2xl border border-white/60 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {services.map((s, i) => (
            <Row key={s.name} item={s} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={180}>
        <p className="mt-6 text-xs text-muted">
          想聊技术、合作或者只是打个招呼都可以 · 邮件直达{' '}
          <a href={`mailto:${profile.email}`} className="tracking-wider text-accent uppercase hover:underline">
            {profile.email}
          </a>
        </p>
      </Reveal>
    </section>
  );
}
