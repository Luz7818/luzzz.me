import Link from 'next/link';
import { profile } from '@/data/site';

/** 404 · 此路不通:静态导出的兜底页(Vercel 对未知路径回退到 404.html)。
 *  服务端组件,不带三幕/Lenis——单屏静态排版,风格与第一幕同源:
 *  mono 引题 + 渐变大标题 + 双按钮,交通口吻。 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 text-center">
      <p className="font-mono text-[13px] text-muted">404 · 此路不通</p>
      <h1 className="mt-5 max-w-[16ch] bg-[linear-gradient(180deg,var(--color-ink),color-mix(in_srgb,var(--color-ink)_72%,transparent))] bg-clip-text text-[clamp(2.2rem,7vw,4.6rem)] font-bold leading-[1.16] tracking-[-0.01em] text-transparent">
        这条路上没有站
      </h1>
      <p className="mt-6 max-w-[42ch] text-sm leading-[1.9] text-ink/80 md:text-base">
        页面开进了未铺装的路段。回主路继续,或者去源码里翻翻这张地图。
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="btn-primary inline-flex rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-contrast shadow-[var(--shadow-pop)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          回首页
        </Link>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost inline-flex rounded-full border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-muted hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          GitHub @{profile.handle}
          <span className="arrow ml-1.5" aria-hidden>
            ↗
          </span>
        </a>
      </div>
      <p className="mt-14 font-mono text-[11px] tracking-wide text-muted">luzzz.me · № 0404</p>
    </main>
  );
}
