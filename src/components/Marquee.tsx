import { marquee } from '@/data/site';

/** 关键词带:全页唯一一条跑马灯。内容来自真实项目领域,悬停暂停,减弱动效下静止。 */
export default function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div aria-hidden className="marquee relative overflow-hidden border-y border-line py-4">
      <div className="marquee-track flex w-max items-center">
        {row.map((word, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="font-mono text-[13px] tracking-wide text-muted">{word}</span>
            <span className="mx-8 inline-block h-[5px] w-[5px] rotate-45 bg-accent/60" />
          </span>
        ))}
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
