'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { profile } from '@/data/site';

const ROPE = 150;
const GRAVITY = 22;
const DAMPING = 0.975;

/**
 * Badge on a lanyard: a damped pendulum hanging from a fixed anchor.
 * Dragging pins the badge to the pointer; releasing hands it its velocity.
 */
function Lanyard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<SVGLineElement>(null);
  const state = useRef({ theta: 0.18, omega: 0, dragging: false, lastX: 0, lastT: 0, pivotX: 0.5 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const badge = badgeRef.current;
    const rope = ropeRef.current;
    if (!wrap || !badge || !rope) return;

    const s = state.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let prev = performance.now();

    const draw = () => {
      const w = wrap.clientWidth;
      const px = w * s.pivotX;
      const len = reduced ? ROPE * 0.86 : ROPE;
      const x = px + Math.sin(s.theta) * len;
      const y = len * Math.cos(s.theta);
      badge.style.transform = `translate(${x - badge.offsetWidth / 2}px, ${y}px) rotate(${s.theta * 26}deg)`;
      rope.setAttribute('x1', String(px));
      rope.setAttribute('y1', '0');
      rope.setAttribute('x2', String(x));
      rope.setAttribute('y2', String(y + 14));
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!s.dragging && !reduced) {
        s.omega += -GRAVITY * Math.sin(s.theta) * dt;
        s.omega *= DAMPING;
        s.theta += s.omega * dt;
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    if (reduced) draw();
    else raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastT = performance.now();
      s.omega = 0;
      badge.setPointerCapture(e.pointerId);
      wrap.parentElement?.setAttribute('data-dragging', 'true');
    };

    const onMove = (e: PointerEvent) => {
      if (!s.dragging) return;
      const rect = wrap.getBoundingClientRect();
      const px = rect.width * s.pivotX;
      const dx = e.clientX - rect.left - px;
      s.theta = Math.max(-1.15, Math.min(1.15, Math.atan2(dx, ROPE)));
      const now = performance.now();
      const dt = Math.max(1, now - s.lastT);
      s.omega = ((e.clientX - s.lastX) / dt) * 12;
      s.lastX = e.clientX;
      s.lastT = now;
    };

    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      wrap.parentElement?.removeAttribute('data-dragging');
    };

    badge.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    return () => {
      cancelAnimationFrame(raf);
      badge.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-sm" data-lanyard>
      <div ref={wrapRef} className="relative h-[300px] w-full">
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          <line ref={ropeRef} stroke="rgba(15,23,42,0.35)" strokeWidth={1.5} />
        </svg>
        <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink/40" />
        <div
          ref={badgeRef}
          role="img"
          aria-label={`${profile.displayName} 的工牌`}
          className="absolute top-0 left-0 w-[168px] cursor-grab touch-none rounded-2xl border border-white/70 bg-gradient-to-br from-accent to-accent-2 p-5 text-bg shadow-[0_18px_50px_rgba(67,56,202,0.35)] select-none active:cursor-grabbing"
        >
          <span className="block h-3 w-8 rounded-full bg-white/45" />
          <p className="mt-8 text-[10px] tracking-[0.3em] text-white/70">WHAT&apos;S NEXT?</p>
          <p className="mt-1 text-2xl font-bold">{profile.displayName}</p>
          <p className="mt-6 text-[9px] tracking-[0.22em] text-white/70">{profile.role}</p>
        </div>
      </div>
      <p className="-mt-6 text-center text-[11px] tracking-widest text-muted">↑ 试着拖动这张卡片</p>
    </div>
  );
}

const ROWS = [
  { k: 'EMAIL', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'GITHUB', v: `@${profile.handle}`, href: profile.github },
  { k: 'HOMEPAGE', v: 'luzzz.me', href: 'https://luz7818.github.io/' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 pt-24 pb-32 md:px-12">
      <Reveal>
        <h2 className="on-bands text-center text-3xl font-bold md:text-4xl">Contact</h2>
      </Reveal>

      <Reveal delay={100}>
        <Lanyard />
      </Reveal>

      <div className="mx-auto mt-16 max-w-xl">
        <Reveal delay={140}>
          <p className="on-bands text-sm leading-[1.85] text-ink/75">
            主要精力在交通工程与大模型的交叉处，但收件箱始终敞开。无论是合作、技术交流、复现论文时踩到坑，还是单纯打个招呼，我都会尽量回复。
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {ROWS.map((r, i) => (
            <Reveal key={r.k} delay={180 + i * 60}>
              <a
                href={r.href}
                target={r.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="glass group flex items-center justify-between gap-4 rounded-xl border border-white/60 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(8,145,178,0.16)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>
                  <span className="block text-[10px] tracking-[0.28em] text-muted">{r.k}</span>
                  <span className="mt-1 block text-sm font-medium text-ink group-hover:text-accent">{r.v}</span>
                </span>
                <span className="text-muted transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={380}>
          <a
            href={`mailto:${profile.email}`}
            className="accent-gradient mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm font-bold text-white shadow-[0_16px_44px_rgba(8,145,178,0.3)] transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-2"
          >
            Say Hello <span>→</span>
          </a>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col items-center gap-2 border-t border-ink/8 pt-8 text-[11px] tracking-wider text-muted md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} {profile.fullName} · {profile.handle}</span>
        <span>Built with Next.js · WebGL bands after cohenjikan.com</span>
      </footer>
    </section>
  );
}
