'use client';

import { useEffect, useState } from 'react';
import { profile } from '@/data/site';

const LINKS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'services', label: 'Services', num: '02' },
  { id: 'projects', label: 'Projects', num: '03' },
  { id: 'contact', label: 'Contact', num: '04' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12" role="banner">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="on-bands text-lg font-bold lowercase tracking-tight text-ink"
        >
          {profile.displayName.toLowerCase()}
          <span className="text-accent">.</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          className="group flex items-center gap-3 rounded-full px-3 py-2 text-sm text-ink/70 transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="on-bands hidden sm:inline">Menu</span>
          <span className="relative block h-4 w-4">
            <span
              className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-current transition-transform duration-300"
              style={{ transform: open ? 'rotate(45deg) translateY(-50%)' : 'rotate(0deg) translateY(-50%)' }}
            />
            <span
              className="absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-current transition-transform duration-300"
              style={{ transform: open ? 'rotate(-45deg) translateY(-50%)' : 'rotate(90deg) translateY(-50%)' }}
            />
          </span>
        </button>
      </header>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 glass transition-opacity duration-500 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8 md:px-24">
          {LINKS.map((l, i) => (
            <button
              key={l.id}
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => go(l.id)}
              className="group flex items-baseline gap-5 py-2 text-left focus:outline-none"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity .5s ease ${120 + i * 70}ms, transform .6s cubic-bezier(.22,1,.36,1) ${120 + i * 70}ms`,
              }}
            >
              <span className="text-xs text-accent">{l.num}</span>
              <span className="accent-gradient bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
                {l.label}
              </span>
            </button>
          ))}

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-xs tracking-widest text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
              GITHUB ↗
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              EMAIL ↗
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
