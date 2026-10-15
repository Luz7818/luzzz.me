'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';

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

/** 透镜缩放:静止/悬停/标签三态,弹簧过渡 */
const LENS_SCALE = { idle: 1, link: 0.8, label: 0.62 } as const;

/** 尾迹涟漪的间隔:每划过这段距离落一圈波纹 */
const WAKE_GAP = 90;

/**
 * 自定义鼠标 = 琥珀光点 + 水面透镜 + 尾迹涟漪 + 气泡标签:
 * - 光点即时跟随,琥珀色带辉光;
 * - 透镜是压在水面上的圆:backdrop 轻折射(模糊+提饱和+提亮),移动时轻微放大,
 *   像压入水面;划动沿途每 90px 落一圈扩散消散的尾迹涟漪(纯 CSS 动画,合成器驱动),
 *   按下则炸开一圈更大的——「划开水流的涟漪感」由此而来;
 * - data-cursor-label 的目标(环形项目卡)换成琥珀气泡标签。
 * 仅精确指针 + 未减弱动效时启用,并给 <html> 挂 data-cursor='on' 隐藏原生光标。
 */
export default function Cursor() {
  const on = useSyncExternalStore(subscribeMedia, enabledSnapshot, () => false);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState<Hover>({ kind: 'idle' });
  // 涟漪:press=按下炸开的一圈,wake=划动沿途的尾迹波纹;动画走 CSS,结束即除名
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const wakeAnchor = useRef({ x: -1, y: -1 });

  const last = useRef({ x: -1, y: -1 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const lensX = useSpring(x, { stiffness: 105, damping: 18, mass: 0.75 });
  const lensY = useSpring(y, { stiffness: 105, damping: 18, mass: 0.75 });
  const cx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const cy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const lensScale = useMotionValue<number>(LENS_SCALE.idle);
  // 划动速度 → 透镜压入水面的深浅:动则微涨,停则回落
  const speedScale = useMotionValue(1);
  const totalScale = useTransform([lensScale, speedScale] as const, ([l, s]: readonly number[]) => l * s);
  const lensT = useMotionTemplate`translate(${lensX}px, ${lensY}px) translate(-50%, -50%) scale(${totalScale})`;

  useAnimationFrame(() => {
    if (!on || document.hidden) return;
    const px = x.get();
    const py = y.get();
    if (last.current.x < 0) {
      last.current = { x: px, y: py };
      return;
    }
    const speed = Math.hypot(px - last.current.x, py - last.current.y);
    last.current = { x: px, y: py };
    const target = 1 + Math.min(0.16, speed * 0.008);
    const cur = speedScale.get();
    speedScale.set(cur + (target - cur) * (target > cur ? 0.25 : 0.05));
  });

  useEffect(() => {
    if (!on) return;
    document.documentElement.dataset.cursor = 'on';

    const spawn = (px: number, py: number, kind: Ripple['kind']) => {
      const id = ++rippleId.current;
      setRipples((rs) => [...rs.slice(-6), { id, x: px, y: py, kind }]);
    };
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      // 尾迹:每划过 WAKE_GAP 落一圈波纹,像桨尖划开水面
      const a = wakeAnchor.current;
      if (a.x < 0 || Math.hypot(e.clientX - a.x, e.clientY - a.y) > WAKE_GAP) {
        wakeAnchor.current = { x: e.clientX, y: e.clientY };
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

  useEffect(() => {
    if (!on) return;
    const controls = animate(lensScale, LENS_SCALE[hover.kind], {
      type: 'spring',
      stiffness: 240,
      damping: 24,
    });
    return () => controls.stop();
  }, [hover, lensScale, on]);

  if (!on) return null;

  const label = hover.kind === 'label' ? hover.text : null;

  return (
    <>
      {/* 涟漪:press=按下炸开,wake=划动尾迹;动画全在 CSS(合成器),结束即除名 */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden
          className={r.kind === 'wake' ? 'cursor-ripple cursor-ripple-wake' : 'cursor-ripple'}
          style={{ left: r.x, top: r.y }}
          onAnimationEnd={() => setRipples((rs) => rs.filter((x) => x.id !== r.id))}
        />
      ))}

      {/* 水面透镜:折射感 backdrop,划动时压入水面微微放大 */}
      <motion.div
        aria-hidden
        className="cursor-lens"
        style={{ transform: lensT }}
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />

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
