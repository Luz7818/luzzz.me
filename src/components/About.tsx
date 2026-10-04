'use client';

import CountUp from './CountUp';
import Reveal from './Reveal';
import { profile, stats } from '@/data/site';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1200px] px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <h2 className="sr-only">关于</h2>
        <p className="max-w-[62ch] text-xl font-medium leading-[1.8] md:text-2xl">{profile.aboutLine}</p>
      </Reveal>

      <Reveal delay={0.12}>
        <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-8 border-t border-line pt-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 font-mono text-[11px] tracking-wide text-muted">{s.label}</dt>
              <dd className="order-1 text-3xl font-bold tracking-tight text-accent md:text-4xl">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
