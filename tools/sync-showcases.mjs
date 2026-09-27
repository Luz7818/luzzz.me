// 把两个作品的前端构建产物同步进 public/，让它们成为本站的子页面：
//   /marx-cloud/  ← ../Marx_Cloud（Vite）
//   /corpus/      ← ../Traffic_terminology/web（零依赖静态页）
//
// 为什么把产物提交进仓库：这三个前端分属三个 git 仓库，而 Vercel 只构建 luzzz.me 一个项目，
// 构建机上没有兄弟仓库。所以同步在本地做，产物入库，Vercel 只管拷贝 public/。
// 找不到源目录时（例如就在 Vercel 上跑）只警告并跳过，不失败。
//
// 用法：node tools/sync-showcases.mjs
import { execSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PROJECT = join(ROOT, '..');

const targets = [
  { name: 'marx-cloud', src: join(PROJECT, 'Marx_Cloud'), build: 'npm run build', out: 'dist' },
  { name: 'corpus', src: join(PROJECT, 'Traffic_terminology', 'web'), build: null, out: '.' },
];

function dirSize(p) {
  let n = 0;
  for (const f of readdirSync(p)) {
    const q = join(p, f);
    n += statSync(q).isDirectory() ? dirSize(q) : statSync(q).size;
  }
  return n;
}

let touched = 0;
for (const t of targets) {
  const dest = join(ROOT, 'public', t.name);
  if (!existsSync(t.src)) {
    console.log(`跳过 ${t.name}：找不到源目录 ${relative(ROOT, t.src)}（在 Vercel 上构建时属正常）`);
    continue;
  }
  if (t.build) {
    console.log(`构建 ${t.name} …`);
    execSync(t.build, { cwd: t.src, stdio: 'inherit' });
  }
  const srcOut = t.out === '.' ? t.src : join(t.src, t.out);
  if (!existsSync(srcOut)) {
    console.error(`失败：${t.name} 的产物不存在 ${srcOut}`);
    process.exit(1);
  }
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  // 只带上前端需要的文件，别把源仓库的文档/脚本搬进 public/
  const allow = t.name === 'corpus' ? ['index.html', 'style.css', 'app.js', 'data.js'] : null;
  for (const f of readdirSync(srcOut)) {
    if (allow && !allow.includes(f)) continue;
    cpSync(join(srcOut, f), join(dest, f), { recursive: true });
  }
  touched++;
  console.log(`${t.name} → public/${t.name}/（${(dirSize(dest) / 1024).toFixed(0)} KB）`);
}

if (!touched) console.log('没有任何源目录可用，public/ 保持仓库里已提交的版本。');
console.log('下一步：pnpm build，然后检查 out/marx-cloud/index.html 与 out/corpus/index.html。');
