'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';

type Hover = { kind: 'idle' } | { kind: 'link' } | { kind: 'label'; text: string };

function subscribeMedia(cb: () => void) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => cb();
  fine.addEventListener('change', handler);
  reduced.addEventListener('change', handler);
  return () => {
    fine.removeEventListener('change', handler);
    reduced.removeEventListener('change', handler);
  };
}

function enabledSnapshot() {
  return (
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * 液态置换滤镜:feTurbulence 噪声做位移图,feDisplacementMap 的 scale 由光标速度驱动。
 * 挂在 .cursor-lens 的 backdrop-filter 上——透镜底下真实的 DOM 元素(文字/卡片/导航)被实时扭开水波。
 */
function LiquidFilter({ dispRef }: { dispRef: React.RefObject<SVGFEDisplacementMapElement | null> }) {
  return (
    <svg aria-hidden focusable="false" width="0" height="0" className="absolute">
      <filter
        id="luzzz-liquid"
        x="-35%"
        y="-35%"
        width="170%"
        height="170%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.013" numOctaves="2" seed="7" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="1.8" result="soft" />
        <feDisplacementMap
          ref={dispRef}
          in="SourceGraphic"
          in2="soft"
          scale="0"
          xChannelSelector="R"
          yChannelSelector="G"
          result="warped"
        />
        <feGaussianBlur in="warped" stdDeviation="0.35" />
      </filter>
    </svg>
  );
}

/** 透镜缩放:静止/悬停/标签三态,弹簧过渡 */
const LENS_SCALE = { idle: 1, link: 0.8, label: 0.62 } as const;

/**
 * 自定义鼠标 = 琥珀光点 + 水滴透镜 + 气泡标签:
 * - 光点即时跟随,琥珀色带辉光(不做 difference 反色,深浅主题与琥珀卡上都干净);
 * - 水滴透镜经 backdrop-filter: url(#luzzz-liquid) 把底下的真实页面元素扭成水波,
 *   置换强度随光标速度起落(动则晕开、停则平息),透镜本体带弹簧拖尾;
 * - data-cursor-label 的目标(环形项目卡)换成琥珀气泡标签。
 * 仅精确指针 + 未减弱动效时启用,并给 <html> 挂 data-cursor='on' 隐藏原生光标。
 * 不支持 SVG backdrop-filter 的浏览器(Firefox/Safari)自动退化为细环光点。
 */
export default function Cursor() {
  const on = useSyncExternalStore(subscribeMedia, enabledSnapshot, () => false);
  const [hidden, setHidden] = useState(true);
  const [hover, setHover] = useState<Hover>({ kind: 'idle' });

  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const last = useRef({ x: -1, y: -1 });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const lensX = useSpring(x, { stiffness: 105, damping: 18, mass: 0.75 });
  const lensY = useSpring(y, { stiffness: 105, damping: 18, mass: 0.75 });
  const cx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const cy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const lensScale = useMotionValue<number>(LENS_SCALE.idle);
  const lensT = useMotionTemplate`translate(${lensX}px, ${lensY}px) translate(-50%, -50%) scale(${lensScale})`;

  // 速度 → 置换强度:快攻慢放,像被搅动的水慢慢平静
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
    const disp = dispRef.current;
    if (!disp) return;
    const target = Math.min(64, speed * 3.0);
    const cur = Number.parseFloat(disp.getAttribute('scale') || '0') || 0;
    const next = cur + (target - cur) * (target > cur ? 0.42 : 0.035);
    disp.setAttribute('scale', next.toFixed(2));
  });

  useEffect(() => {
    if (!on) return;
    document.documentElement.dataset.cursor = 'on';

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
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

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
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
      <LiquidFilter dispRef={dispRef} />

      {/* 水滴透镜:底下真实元素被扭成水波,速度驱动 */}
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
