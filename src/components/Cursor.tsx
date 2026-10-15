'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

type Hover = { kind: 'idle' } | { kind: 'link' } | { kind: 'label'; text: string };
type Ripple = { id: number; x: number; y: number; kind: 'press' | 'wake' };

function subscribeMedia(cb: () => void) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => cb();
  fine.addEventListener('change', handler);
  reduced.addEventListener('change', handler);
  return () => {
    fine.removeEventListener('change', handler);
    reduced.addEventListener('change', handler);
  };
}

function enabledSnapshot() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** 尾迹涟漪:每划过 RIPPLE_GAP 距离落一圈;两次落圈至少间隔 RIPPLE_MIN_MS,慢拖不堆积 */
const RIPPLE_GAP = 40;
const RIPPLE_MIN_MS = 50;
const MAX_RIPPLES = 10;

/**
 * 自定义鼠标 = 琥珀光点 + 光标涟漪拖尾 + 气泡标签:
 * - 光点即时跟随,琥珀色带辉光,可点元素上放大发亮;
 * - 拖尾是密集的涟漪链:每划过 40px 自光标处落一圈小涟漪,扩散消散(纯 CSS 动画,
 *   合成器驱动),连起来就是划过水面的波纹;按下炸开更大的一圈;
 * - data-cursor-label 的目标(环形项目卡)换成琥珀气泡标签。
 * 仅精确指针 + 未减弱动效时启用,并给 <html> 挂 data-cursor='on' 隐藏原生光标。
 */
export default function Cursor() {
  const on = useSyncExternalStore(subscribeMedia, enabledSnapshot, () => false);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState<Hover>({ kind: 'idle' });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const wakeAnchor = useRef({ x: -1, y: -1, t: 0 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const cy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!on) return;
    document.documentElement.dataset.cursor = 'on';

    const spawn = (px: number, py: number, kind: Ripple['kind']) => {
      const id = ++rippleId.current;
      setRipples((rs) => [...rs.slice(-(MAX_RIPPLES - 1)), { id, x: px, y: py, kind }]);
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      // 涟漪拖尾:按划过距离落圈(慢拖有时间闸不堆积)
      const a = wakeAnchor.current;
      const now = performance.now();
      const dist = a.x < 0 ? Infinity : Math.hypot(e.clientX - a.x, e.clientY - a.y);
      if (dist >= RIPPLE_GAP && now - a.t >= RIPPLE_MIN_MS) {
        wakeAnchor.current = { x: e.clientX, y: e.clientY, t: now };
        spawn(e.clientX, e.clientY, 'wake');
      }
    };
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.('a, button, [data-cursor]');
      if (!t) {
        setHover({ kind: 'idle' });
        return;
      }
      const label = t.getAttribute('data-cursor-label');
      setHover(label ? { kind: 'label', text: label } : { kind: 'link' });
    };
    const leave = () => setHidden(true);
    const down = (e: PointerEvent) => {
      if (document.hidden) return;
      spawn(e.clientX, e.clientY, 'press');
    };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      document.documentElement.removeEventListener('pointerleave', leave);
      delete document.documentElement.dataset.cursor;
    };
  }, [on, x, y]);

  if (!on) return null;

  const label = hover.kind === 'label' ? hover.text : null;

  return (
    <>
      {/* 涟漪拖尾:press=按下炸开,wake=划动沿途的小涟漪;动画全在 CSS(合成器),结束即除名 */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className={r.kind === 'wake' ? 'cursor-ripple cursor-ripple-wake' : 'cursor-ripple'}
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
        />
      ))}

      {/* 气泡标签:项目卡上的「查看」等 */}
      <motion.div
        aria-hidden
        className="cursor-chip rounded-full bg-accent px-3.5 py-1.5 font-mono text-[11px] font-bold text-accent-contrast shadow-[var(--shadow-pop)]"
        style={{ x: cx, y: cy }}
        animate={{
          opacity: label && !hidden ? 1 : 0,
          scale: label && !hidden ? 1 : 0.6,
          marginLeft: 18,
          marginTop: 20,
        }}
        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
      >
        {label ?? ''}
      </motion.div>

      {/* 琥珀光点:可点元素上放大发亮 */}
      <motion.div
        aria-hidden
        className="cursor-dot"
        style={{ x, y }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hover.kind === 'idle' ? 1 : 1.4,
        }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      />
    </>
  );
}
