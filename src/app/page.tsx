import fs from 'node:fs';
import path from 'node:path';
import IridescentBackground from '@/components/IridescentBackground';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { palette, projects } from '@/data/site';

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
  return (
    <>
      <IridescentBackground config={palette} />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Services />
        <Projects projects={projects} previews={findPreviews()} />
        <Contact />
      </main>
    </>
  );
}
