'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  split?: 'chars' | 'words';
  delay?: number;
  className?: string;
  /** extra class applied per unit once revealed */
  unitClassName?: string;
};

/** Per-unit blur → sharp reveal, fired when the element scrolls into view. */
export default function BlurText({ text, split = 'chars', delay = 40, className = '', unitClassName = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const units = split === 'chars' ? [...text] : text.split(/(\s+)/);

  return (
    <span ref={ref} className={className}>
      {units.map((u, i) =>
        /\s/.test(u) ? (
          <span key={i} aria-hidden>
            {u}
          </span>
        ) : (
          <span
            key={i}
            aria-hidden={split === 'chars'}
            className={`inline-block will-change-[filter,transform,opacity] ${unitClassName}`}
            style={{
              opacity: shown ? 1 : 0,
              filter: shown ? 'blur(0px)' : 'blur(14px)',
              transform: shown ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity .6s ease ${i * delay}ms, filter .7s cubic-bezier(.22,1,.36,1) ${i * delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${i * delay}ms`,
            }}
          >
            {u}
          </span>
        ),
      )}
      <span className="sr-only">{text}</span>
    </span>
  );
}
