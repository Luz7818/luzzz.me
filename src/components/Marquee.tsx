'use client';

import { marquee, projects } from '@/data/site';

/**
 * 关键词带:全页唯一一条跑马灯。每个词条来自真实项目,点击直达对应项目卡——
 * 三幕树由 Act2Ring 吸附到整卡,经典竖排树由 Projects 滚到堆叠卡(经 luzzz-project-jump 事件)。
 * 悬停暂停,减弱动效下静止;后半段克隆体仅供无缝循环,不进 Tab 序、对读屏隐藏。
 */
export default function Marquee() {
  const row = [...marquee, ...marquee];

  const jump = (slug: string) => {
    window.dispatchEvent(new CustomEvent('luzzz-project-jump', { detail: { slug } }));
  };

  return (
    <div className="marquee relative overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max items-center">
        {row.map((item, i) => {
          const clone = i >= marquee.length;
          const project = projects.find((p) => p.slug === item.slug);
          return (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={clone || undefined}>
              {project ? (
                <button
                  type="button"
                  onClick={() => jump(item.slug)}
                  tabIndex={clone ? -1 : undefined}
                  data-cursor-label="直达"
                  title={`直达「${project.name}」`}
                  className="cursor-pointer font-mono text-[13px] tracking-wide text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  {item.text}
                </button>
              ) : (
                <span className="font-mono text-[13px] tracking-wide text-muted">{item.text}</span>
              )}
              <span className="mx-8 inline-block h-[5px] w-[5px] rotate-45 bg-accent/60" />
            </span>
          );
        })}
      </div>
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 bg-[linear-gradient(90deg,var(--color-bg),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(270deg,var(--color-bg),transparent)]"
      />
    </div>
  );
}
