'use client';

import { useEffect } from 'react';

type LenisLike = {
  scrollTo: (t: number | string | HTMLElement, o?: object) => void;
  resize: () => void;
};

/** 场景锚点:三幕结构里锚点不再是元素 id,而是各幕注册的目标滚动位置解析器 */
type SceneAnchors = Map<string, () => number>;
const sceneAnchors: SceneAnchors = new Map();

/** 幕组件挂载时注册自己的锚点解析器,返回注销函数 */
export function registerSceneAnchors(map: Record<string, () => number>) {
  const entries = Object.entries(map);
  entries.forEach(([id, resolve]) => sceneAnchors.set(id, resolve));
  return () => {
    entries.forEach(([id]) => sceneAnchors.delete(id));
  };
}

/** 幕页边界:各幕注册自己的 wrap 顶,导航跳转时长 = 1.25s × 跨越幕数 */
const pageBounds: Array<() => number> = [];

/** easeOutQuart:t⁴ 减速曲线——Lenis 的锚点跳转、吸附回位共用这一条 */
export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

/** 幕组件挂载时注册自己的页顶解析器(跳转时才求值),返回注销函数。 */
export function registerPageBound(resolve: () => number) {
  pageBounds.push(resolve);
  return () => {
    const i = pageBounds.indexOf(resolve);
    if (i >= 0) pageBounds.splice(i, 1);
  };
}

/** 跨越的幕数:按当前/目标落点在页界之间的区段计数;同幕内(如开场↔关于)按 1 页计 */
function pagesBetween(fromY: number, toY: number): number {
  const tops = [0, ...pageBounds.map((r) => Math.max(0, r()))].sort((a, b) => a - b);
  const zone = (y: number) => {
    let i = 0;
    while (i < tops.length - 1 && y >= tops[i + 1]) i += 1;
    return i;
  };
  return Math.max(1, Math.abs(zone(toY) - zone(fromY)));
}

/** 吸附锚点:各幕注册「值得停住」的滚动位置(开场拍/每张环卡/工牌落定/联系页) */
const snapAnchors = new Set<() => number>();

/** 幕组件挂载时注册吸附锚点(解析器在停滚时才求值,响应 resize),返回注销函数。 */
export function registerSnapAnchors(resolvers: Array<() => number>) {
  resolvers.forEach((r) => snapAnchors.add(r));
  return () => {
    resolvers.forEach((r) => snapAnchors.delete(r));
  };
}

/** 当前所在导航区段:按四个落点锚(top/about/projects/contact)对滚动位置分档,顶部导航据此加深当前项;
 *  场景锚未注册时(reduced-motion 兜底树)回退到元素 id 定位 */
export function navSectionAt(y: number): string {
  const marks: Array<[string, number]> = [['top', 0]];
  for (const id of ['about', 'projects', 'contact']) {
    const resolve = sceneAnchors.get(id);
    if (resolve) {
      marks.push([id, Math.max(0, resolve())]);
      continue;
    }
    const el = document.getElementById(id);
    if (el) marks.push([id, el.getBoundingClientRect().top + window.scrollY]);
  }
  marks.sort((a, b) => a[1] - b[1]);
  let active = marks[0][0];
  for (const [id, my] of marks) if (y >= my) active = id;
  return active;
}

/** 锚点平滑跳转:场景锚点在先,Lenis 在时走它的缓动,否则退回原生平滑滚动。 */
export function smoothTo(id: string) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  const scene = reduced ? undefined : sceneAnchors.get(id);
  if (scene) {
    const y = Math.max(0, scene());
    if (lenis) {
      lenis.scrollTo(y, { duration: 1.25 * pagesBetween(window.scrollY, y), easing: easeOutQuart });
    } else {
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.25, easing: easeOutQuart });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Lenis 惯性滚动:成熟作品集「buttery scroll」手感的来源。
 * 滚轮被 lerp 平滑后仍驱动原生滚动,因此 Motion 的 useScroll 一切照常。
 * 减弱动效与触屏(默认)不启用;实例挂在 window.__lenis 供锚点做平滑跳转。
 * 附带全局滚动吸附:停滚 0.5s 后,把停在幕间过渡走廊里的位置拉到最近的完整画面
 * (锚点由三幕经 registerSnapAnchors 注册;阈值 0.92×视口高,保证幕间走廊无死角)。
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lenis: {
      raf: (t: number) => void;
      destroy: () => void;
      scrollTo: LenisLike['scrollTo'];
      resize: LenisLike['resize'];
      limit: number;
    } | undefined;
    let raf = 0;
    let cancelled = false;
    let contentObserver: ResizeObserver | undefined;
    const onWindowLoad = () => lenis?.resize();

    (async () => {
      const Lenis = (await import('lenis')).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      // Lenis 只在构造时测一次文档高度,而它观察的 documentElement 盒子恒为视口大小,
      // 内容长高不会触发它的 ResizeObserver——这里盯 body 高度变化代它重测
      contentObserver = new ResizeObserver(() => lenis?.resize());
      contentObserver.observe(document.body);
      window.addEventListener('load', onWindowLoad, { once: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    })();

    // 全局吸附:停滚后对齐最近的完整画面
    let snapTimer = 0;
    let snapping = false;
    let snapTarget = 0;
    let lastSnapAt = 0;
    const settle = () => {
      if (snapping || document.hidden || !lenis) return;
      // 冷却:一次吸附后 1.2s 内不再拽,防连续拉扯的顿挫感
      if (performance.now() - lastSnapAt < 1200) return;
      // 后台标签页里 Lenis 的初始尺寸校准会被跳过(limit=0,一切 scrollTo 都被钳到 0),先自愈
      if (lenis.limit < 100) lenis.resize();
      const cur = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const vh = window.innerHeight;
      let best = -1;
      let bestDist = Infinity;
      for (const resolve of snapAnchors) {
        const y = Math.max(0, Math.min(resolve(), max));
        const d = Math.abs(y - cur);
        if (d < bestDist) {
          bestDist = d;
          best = y;
        }
      }
      if (best < 0 || bestDist < 8 || bestDist > vh * 0.92) return;
      snapping = true;
      snapTarget = best;
      lastSnapAt = performance.now();
      lenis.scrollTo(best, { duration: 0.45, easing: easeOutQuart });
    };
    const onScroll = () => {
      if (snapping && Math.abs(window.scrollY - snapTarget) < 4) snapping = false;
      window.clearTimeout(snapTimer);
      // 500ms:滚轮惯性滑行结束、确认真停下才吸附;吸附途中再次输入会被下一次滚轮/触摸立即取消
      snapTimer = window.setTimeout(settle, 500);
    };
    const onInput = () => {
      snapping = false;
    };
    const onVisibility = () => {
      if (!document.hidden) lenis?.resize();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onInput, { passive: true });
    window.addEventListener('touchmove', onInput, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
      lenis?.destroy();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onInput);
      window.removeEventListener('touchmove', onInput);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(snapTimer);
      contentObserver?.disconnect();
      window.removeEventListener('load', onWindowLoad);
    };
  }, []);

  return null;
}
