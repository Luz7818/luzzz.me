'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { profile } from '@/data/site';

/** The word "me" starts out of focus and snaps sharp on hover — the site's signature bit of motion. */
function BracketedWord({ word }: { word: string }) {
  const [active, setActive] = useState(false);
  const c = 'absolute h-5 w-5 border-accent-2 transition-all duration-300 md:h-7 md:w-7';

  return (
    <span
      role="button"
      tabIndex={0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      onClick={() => setActive((v) => !v)}
      className="relative mx-1 inline-block cursor-pointer px-3 py-1 outline-none"
      aria-label={word}
    >
      <span
        className="on-bands relative inline-block font-bold transition-[filter] duration-[600ms]"
        style={{ filter: active ? 'blur(0px)' : 'blur(3px)' }}
      >
        {word}
      </span>
      <span className={`${c} top-0 left-0 border-t-2 border-l-2 ${active ? '-translate-x-1 -translate-y-1' : ''}`} />
      <span className={`${c} top-0 right-0 border-t-2 border-r-2 ${active ? 'translate-x-1 -translate-y-1' : ''}`} />
      <span className={`${c} bottom-0 left-0 border-b-2 border-l-2 ${active ? '-translate-x-1 translate-y-1' : ''}`} />
      <span className={`${c} right-0 bottom-0 border-r-2 border-b-2 ${active ? 'translate-x-1 translate-y-1' : ''}`} />
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-12 md:py-40">
      <Reveal>
        <h2 className="flex flex-wrap items-center text-5xl leading-[0.92] font-bold md:text-6xl lg:text-7xl">
          <span className="on-bands">About</span>
          <BracketedWord word="me" />
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="on-bands mt-10 max-w-xl text-sm leading-[1.7] text-ink/80 md:text-base">{profile.aboutLine}</p>
      </Reveal>

      <Reveal delay={200}>
        <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-10 md:grid-cols-4">
          {[
            ['6', '公开仓库'],
            ['2022', 'GitHub 元年'],
            ['5', '主力项目'],
            ['∞', '未完成的点子'],
          ].map(([v, k]) => (
            <div key={k}>
              <dt className="on-bands text-3xl font-bold text-accent-2">{v}</dt>
              <dd className="mt-1 text-[11px] tracking-widest text-muted">{k}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
