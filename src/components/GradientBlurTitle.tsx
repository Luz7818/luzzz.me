'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Gradient sweeps across the whole title while each glyph blurs in on its own.
 * Per-glyph background-clip needs each span to sample the gradient at its own
 * offset, so we measure positions after layout and shift the background.
 */
export default function GradientBlurTitle({ text, className = '' }: { text: string; className?: string }) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const [offsets, setOffsets] = useState<{ x: number; w: number }[]>([]);
  const [shown, setShown] = useState(false);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const total = host.getBoundingClientRect().width;
      const spans = Array.from(host.querySelectorAll<HTMLSpanElement>('[data-ch]'));
      setOffsets(
        spans.map((s) => ({
          x: s.getBoundingClientRect().left - host.getBoundingClientRect().left,
          w: total,
        })),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [text]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <span ref={hostRef} className={className}>
      {[...text].map((ch, i) =>
        /\s/.test(ch) ? (
          <span key={i} aria-hidden className="inline-block whitespace-pre">
            {ch}
          </span>
        ) : (
          <span
            key={i}
            data-ch
            aria-hidden
            className="inline-block will-change-[filter,transform,opacity]"
            style={{
              backgroundImage: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))',
              backgroundSize: offsets[i] ? `${offsets[i].w}px 100%` : '100% 100%',
              backgroundPosition: offsets[i] ? `${-offsets[i].x}px 0` : '0 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              opacity: shown ? 1 : 0,
              filter: shown ? 'blur(0px)' : 'blur(16px)',
              transform: shown ? 'translateY(0)' : 'translateY(12px)',
              transition: `opacity .55s ease ${i * 38}ms, filter .75s cubic-bezier(.22,1,.36,1) ${i * 38}ms, transform .75s cubic-bezier(.22,1,.36,1) ${i * 38}ms`,
            }}
          >
            {ch}
          </span>
        ),
      )}
      <span className="sr-only">{text}</span>
    </span>
  );
}
