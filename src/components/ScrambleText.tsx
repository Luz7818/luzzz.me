'use client';

import { useEffect, useRef } from 'react';

/** 解码字符池:二进制与符号 + 交通箭头,呼应 mono、大模型与路网气质 */
const GLYPHS = '01<>/#$%&+=×·→←↑↓';

type Props = {
  text: string;
  className?: string;
  /** 首字符起播延迟(秒) */
  delay?: number;
  /** 相邻字符锁定间隔(秒) */
  stagger?: number;
  /** 单字符从乱码到锁定的时长(秒) */
  settle?: number;
};

/**
 * 解码入场:每个字符先在字符池里乱跳,到点锁定为真身(自左向右错峰,共约 0.7s)。
 * 直接改写内层 textContent——SSR 渲染真文、不经 React 状态,无 hydration 风险
 * (aria-label 供读屏,内层 aria-hidden 挡住乱码);减弱动效直接落真文。
 * 适合首屏 mono 引题,挂载即播一次。
 */
export default function ScrambleText({
  text,
  className,
  delay = 0.15,
  stagger = 0.045,
  settle = 0.12,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }
    const chars = [...text];
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000 - delay;
      let out = '';
      let done = true;
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (ch === ' ' || t >= i * stagger + settle) {
          out += ch;
        } else {
          done = false;
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      el.textContent = out;
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, delay, stagger, settle]);

  return (
    <span className={className} aria-label={text}>
      <span ref={ref} aria-hidden>
        {text}
      </span>
    </span>
  );
}
