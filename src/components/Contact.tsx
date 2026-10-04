'use client';

import MagneticButton from './MagneticButton';
import Reveal from './Reveal';
import { profile } from '@/data/site';

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-10 md:px-10 md:pt-28">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">联系</h2>
        <p className="mt-4 max-w-[52ch] text-sm leading-[1.85] text-ink/75">
          合作、技术交流、复现论文时踩到坑,或者单纯打个招呼,邮件都会回。
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-9">
          <MagneticButton
            href={`mailto:${profile.email}`}
            strength={0.22}
            className="shine-host relative inline-flex overflow-hidden rounded-full bg-accent px-8 py-4 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] transition-[filter] duration-300 hover:brightness-110 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <span className="shine" aria-hidden />
            <span className="relative">{profile.email}</span>
          </MagneticButton>
        </div>
      </Reveal>

      <footer className="mt-20 border-t border-line py-8">
        <div className="flex flex-col gap-3 font-mono text-[11px] text-muted md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {profile.fullName} {profile.latinName}
          </span>
          <span>
            本站源码{' '}
            <a href={profile.source} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
              Luz7818/luzzz.me
            </a>
            ,部署在 Vercel
          </span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">
            GitHub @{profile.handle}
          </a>
        </div>
      </footer>
    </section>
  );
}
