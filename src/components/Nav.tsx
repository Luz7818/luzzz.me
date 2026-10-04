'use client';

import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import ThemeToggle from './ThemeToggle';
import { navSectionAt, smoothTo } from './SmoothScroll';
import { profile } from '@/data/site';

const LINKS = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
];

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  // 当前区段:开场(luzzz.me)/关于/项目/联系,决定哪个标签加深
  const [section, setSection] = useState('top');
  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24);
    setSection(navSectionAt(v));
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothTo(id);
  };

  return (
    <>
      {/* 滚动进度:视口顶一条琥珀辉光细线 */}
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent via-accent/80 to-accent/25"
      />
      {/* 悬浮玻璃胶囊导航(主题切换独立在右上角,见下方 ThemeToggle) */}
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center px-4">
        <nav
          aria-label="站内导航"
          className={`flex h-14 items-center gap-6 rounded-full border border-line px-5 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ${
            scrolled ? 'bg-[var(--nav-glass)] shadow-[var(--shadow-card)]' : 'bg-[var(--nav-glass)]'
          }`}
        >
          <a
            href="#top"
            onClick={go('top')}
            aria-current={section === 'top' || undefined}
            className={`font-mono text-sm font-semibold tracking-tight transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
              section === 'top' ? 'text-ink' : 'text-muted'
            }`}
          >
            luzzz.me
          </a>
          <div className="hidden items-center gap-6 text-sm sm:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={section === l.id || undefined}
                className={`transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                  section === l.id ? 'text-ink' : 'text-muted'
                }`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            GitHub
          </a>
        </nav>
      </header>
      {/* 主题切换:独立右上角玻璃圆钮,中心与胶囊光学对齐(top 26+18 = 胶囊 16+28) */}
      <div className="fixed top-[26px] right-6 z-50">
        <ThemeToggle />
      </div>
    </>
  );
}
