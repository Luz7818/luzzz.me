import fs from 'node:fs';
import path from 'node:path';
import Aurora from '@/components/Aurora';
import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import TrailsBackdrop from '@/components/TrailsBackdrop';
import Act1Intro from '@/components/scenes/Act1Intro';
import Act2Ring from '@/components/scenes/Act2Ring';
import Act3Badge from '@/components/scenes/Act3Badge';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { projects } from '@/data/site';

const EXT = ['png', 'webp', 'jpg', 'jpeg'] as const;

function findPreviews() {
  const dir = path.join(process.cwd(), 'public', 'projects');
  const out: Record<string, string> = {};
  if (!fs.existsSync(dir)) return out;
  for (const p of projects) {
    for (const ext of EXT) {
      const file = path.join(dir, `${p.slug}.${ext}`);
      if (fs.existsSync(file)) {
        out[p.slug] = `/projects/${p.slug}.${ext}`;
        break;
      }
    }
  }
  return out;
}

export default function Home() {
  const previews = findPreviews();
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative">
        {/* 三幕场景:开场 → 项目环形 → 工牌联系。滚动驱动本地切换,reduced-motion 由 CSS 切走。 */}
        <div className="hidden motion-safe:block">
          <TrailsBackdrop />
          <Aurora className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" />
          <div className="relative z-10">
            <Act1Intro />
            <Act2Ring projects={projects} previews={previews} />
            <Act3Badge />
          </div>
        </div>

        {/* 经典竖排:reduced-motion 兜底,结构与重做前一致 */}
        <div className="block motion-safe:hidden">
          <Aurora />
          <Hero />
          <Marquee />
          <About />
          <Projects projects={projects} previews={previews} />
          <Contact />
        </div>
      </main>
    </>
  );
}
