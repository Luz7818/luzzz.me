'use client';

import GradientBlurTitle from './GradientBlurTitle';
import { profile } from '@/data/site';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center px-6 pt-32 pb-24 md:px-12">
      <p className="mb-6 text-sm tracking-[0.42em] text-accent">
        {profile.eyebrow}
        <span className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.12em] animate-pulse bg-accent/70" />
      </p>

      <h1 className="max-w-[16ch] text-[clamp(2.5rem,9vw,7.75rem)] leading-[0.95] font-bold">
        <GradientBlurTitle text={`Hi, I'm ${profile.displayName}`} />
      </h1>

      <p className="on-bands mt-8 max-w-2xl text-base leading-relaxed text-ink/85 md:text-lg">{profile.lead}</p>

      <div className="mt-12 flex flex-wrap items-center gap-6">
        <a
          href={`mailto:${profile.email}`}
          className="group glass inline-flex items-center gap-3 rounded-full border border-white/60 py-3.5 pr-4 pl-5 text-sm font-medium text-ink shadow-[0_8px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(8,145,178,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="m3 6.5 9 6.5 9-6.5" />
          </svg>
          发送邮件联系
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-bg transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <div className="text-xs tracking-widest text-muted">
          {profile.role}
          <span className="mx-2 text-line">/</span>
          EST 2022
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-muted transition-colors hover:text-accent md:flex"
      >
        SCROLL
        <span className="block h-10 w-px overflow-hidden bg-line">
          <span className="block h-4 w-px animate-[scroll-line_1.8s_ease-in-out_infinite] bg-accent" />
        </span>
      </a>

      <style>{`@keyframes scroll-line{0%{transform:translateY(-100%)}60%,100%{transform:translateY(250%)}}`}</style>
    </section>
  );
}
