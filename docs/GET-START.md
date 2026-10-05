# luzzz.me 上手手册

> 用途：给要真的把它跑起来或改内容的人。每一步给命令、给真实输出、给出错时怎么办。
> 阅读顺序：从第 1 节往下做，不需要跳读。术语第一次出现都有一句解释，第 7 节集中汇总。
> 命令口径、门禁与仓库事实以 [AGENTS.md](../AGENTS.md) 为准，本手册只写怎么用。

## 1. 你需要准备什么

| 项目 | 要求 | 怎么确认 |
|---|---|---|
| 操作系统 | Windows / Linux / macOS 均可（本手册的命令与输出在 Windows + Git Bash 下采集） | — |
| Node.js | ≥ 20.9.0，这是 `next@16.3.6` 的 `engines` 下限 | `node -v`，本机 `v24.19.0` |
| 包管理器 | pnpm 10.33.0（`package.json` 的 `packageManager` 字段指定） | `pnpm -v` |
| 第三方运行时 | 无。依赖只有 `next` / `react` / `react-dom` | 见第 2 节 |
| 网络 | 装依赖时要；`dev` 与 `build` 期间应用代码不发请求（复核：`grep -rn "fetch(" src/`） | — |
| 密钥 | 无。`src/` 下没有任何 `process.env`（复核：`grep -rn "process\.env" src/`） | — |
| 想看真机效果 | 任意现代浏览器（背景是 Canvas 2D，不需要 WebGL） | 见第 3.1 节 |

表里没有一项是可选的。包管理器要认准 pnpm：仓库带 `pnpm-lock.yaml` 且 `packageManager` 写死了
`pnpm@10.33.0`；用 `npm install` 会绕过这份锁文件，装出来的版本可能与 CI 或他人机器不一致。

## 2. 装好它

```bash
pnpm install --frozen-lockfile
```

`--frozen-lockfile` 表示按 `pnpm-lock.yaml` 原样安装、不修改锁文件。依赖已就绪时的真实输出：

```
Lockfile is up to date, resolution step is skipped
Already up to date

Done in 482ms using pnpm v10.33.0
```

上面这段是本机（依赖已就绪）采集的真实输出。第一次装、`node_modules` 为空时打印的是 pnpm 自己的
下载与链接进度，本手册没有采集那一份；要核对是否装对，看退出码而不是看输出行
（复核：`pnpm install --frozen-lockfile; echo $?` 应为 `0`）。
之后看到 `Update available! 10.33.0 → 12.6.0` 这类提示可以忽略：仓库锁的是 10.33.0，
不要为了消提示去升 pnpm 大版本。

`.env.local` 与站点本身无关：`src/` 下没有任何 `process.env`（复核：`grep -rn "process\.env" src/`），
`next dev` / `next build` 打印的 `- Environments: .env.local` 只是 Next 自己在加载它。
这个文件服务的是 Vercel CLI（`.vercel/` 目录），本手册不读它的内容，也不要用它来给站点传配置。

## 3. 三条路，按你要做的事挑一条

### 3.1 边改边看（开发预览）

```bash
pnpm dev
```

真实输出：

```
▲ Next.js 16.3.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://<本机局域网IP>:3000
- Environments: .env.local
✓ Ready in 490ms
✓ Running next.config.ts took 39ms
```

`Ready` 后的毫秒数随机器变化。判据分两层。能命令化的那条（本手册采集时成立）：

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/
curl -s http://localhost:3000/ | grep -o 'id="about"\|id="projects"\|id="contact"'
```

分别是 `200`，以及三个 `id=` 全部出现——它们就是三个板块在 HTML 里的锚点，
`Nav.tsx` 的链接靠这三个值滚动定位。

肉眼再看三条（按组件实现应当如此，本手册没有在浏览器里逐条截图确认）：背景是 `LightTrails.tsx`
画的长曝光车流光轨在缓缓流动（`prefers-reduced-motion` 下是静态一帧）；首屏两行大标题
「把工程问题做成 / 能看、能玩、能复现的东西」遮罩式弹簧揭示；点导航右侧的圆形按钮，暗色/亮色
主题应丝滑互切（圆形揭幕或颜色过渡），刷新后主题保持。控制台不应有红色报错。

在 `pnpm dev` 下改 `src/data/site.ts` 的任意字段保存，页面热更新即可看到效果，不用重启。
`- Network:` 那一行是同局域网地址，手机连同一个 Wi-Fi 时可以直接打开它——但这只是浏览器调试，
不等于真机验证（见第 6 节最后一条）。

### 3.2 出静态产物（构建）

```bash
pnpm build
```

真实输出的完整骨架：

```
▲ Next.js 16.3.6 (Turbopack)
- Environments: .env.local
✓ Running next.config.ts took 38ms
  Creating an optimized production build ...
✓ Compiled successfully in 512ms
  Running TypeScript ...
  Finished TypeScript in 1083ms ...
  Collecting page data using 5 workers ...
  Generating static pages using 5 workers (4/4) in 677ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

判据：退出码 0（复核：`pnpm build; echo $?`），末段两条路由都带 `○ (Static)`。
产物在 `out/`，共 39 个文件（复核：`find out -type f | wc -l`），其中 12 个是 `out/marx-cloud/`
与 `out/corpus/` 两个子页面（见第 6 节），`out/README.md` 则是
`public/README.md` 被原样拷过去的——`public/` 下的任何文件都会进产物。想本地看一眼：

```bash
python -m http.server 8099 --directory out
```

另开一个终端执行下面三条，都应返回 `200`（CSS 的真实文件名带哈希，要从 `index.html` 里取）：

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8099/
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8099/fonts/jetbrains-mono-var.woff2
curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:8099$(grep -o '/_next/static/chunks/[A-Za-z0-9_.-]*\.css' out/index.html | head -1)"
```

三条都通说明产物自足，不依赖仓库里的任何别的东西。

`out/` 里除 `index.html` 外还有 `index.txt`、`__next._tree.txt` 这类文件：它们是从
`src/app/page.tsx` 预渲染出的同一棵路由树的机器格式数据（`index.txt` 开头是
`1:"$Sreact.fragment"`），给客户端路由切换用。本站只有一个路由，访问时用不到，但不要单独删。

### 3.3 只改文案、换内容

先记住一句话：`src/data/site.ts` 管数据，`src/app/globals.css` 的 `@theme` 管页面配色，
组件里还写死了一批文案。三步走：

1. 打开 `src/data/site.ts`，改 `profile` / `stats` / `marquee` / `projects` 里的对应字段。
   每个字段被哪个组件消费，列在 [src/README.md](../src/README.md)。
2. 改 `src/data/site.ts` 之外的文字（比如 `Hero` 的两行大标题、`Projects` 的字型水印），去
   [AGENTS.md](../AGENTS.md) 的「已知坑」第 2 条查它在哪个组件里。
3. `pnpm dev` 看效果，确认无误后跑第 8 节的三条门禁。

## 4. 换项目预览图

`public/projects/` 里有 2 张真截图（2026-10-03 实拍）：`marx-cloud.png` 与
`traffic-terminology.png`，分别在 featured 卡和图片卡上；其余三张卡是刻意的字型水印卡，
不需要截图。要换截图：

```bash
mkdir -p public/projects
# 文件名必须等于 site.ts 里对应项目的 slug
cp 你的截图.png public/projects/zhishuxing.png
pnpm build
```

当前五个可用的 `slug` 由 `site.ts` 决定（复核：`grep -o "slug: '[^']*'" src/data/site.ts`，
输出 `zhishuxing`、`marx-cloud`、`testforge`、`transportation-harness`、`traffic-terminology`）。
同一个 slug 支持的后缀与优先级是 `png` → `webp` → `jpg` → `jpeg`，只取第一个命中的。

验证换图成功：`out/index.html` 里 `<img` 的出现次数等于有截图的卡片数
（复核：`grep -o "<img" out/index.html | wc -l`，当前为 2）。
放入 `public/projects/zhishuxing.png` 后：`pnpm dev` 刷新即见 `<img` 变 3；
`pnpm build` 得到同样的数，且 `out/projects/zhishuxing.png` 出现。

换图只在构建期生效：扫描 `public/projects/` 的动作发生在预渲染时，构建完再放图不会自动替换。
`pnpm dev` 下则不同，它是每次请求现算，放完图刷新就能看到。

## 5. 想加一个项目卡

`projects` 数组加一条，字段一个都不能少（复核：读 `src/data/site.ts` 顶部的 `type Project`）：

```ts
{
  slug: 'your-project',          // 决定预览图文件名，必须唯一
  name: '项目名',
  summary: '一句话说清它是什么',
  tags: ['Python', 'LLM'],
  url: 'https://github.com/...',
  demo: 'https://...',           // 可选，填了卡片优先跳它
  stars: 0,                      // 手填，不会自动更新
  language: 'Python',
  updated: '2026-09-27',         // 手填
}
```

加完必须跑的三件事：`npx tsc --noEmit`、`npm run lint`、`pnpm build`。少任何一个必填字段会在
第一条就报类型错误。卡片数会自动跟着变（`Projects.tsx` 遍历 `projects`），但 `site.ts` 里
`stats` 的「5 主力项目」不会，要手工同步。桌面横向卷轴的卡宽是固定值（featured 720px /
其余 480px），加项目即多一张横滑卡，不需要改布局代码。

## 6. 更新两个子页面

`/marx-cloud/`（思想云星图）与 `/corpus/`（交通用语转换器）的源码在另外两个仓库里，
本站只收它们的构建产物。在源仓库改完页面之后，回到本仓库：

```bash
node tools/sync-showcases.mjs     # 或 pnpm sync:showcases
pnpm build
```

脚本做的事：在 `../Marx_Cloud` 跑 `npm run build` 取 `dist/`；从 `../Traffic_terminology/web`
只取 `index.html`、`style.css`、`app.js`、`data.js`；**先整体删除** `public/<名字>/` 再拷贝，
避免旧 hash 文件残留。源目录不存在时（例如就在 Vercel 构建机上）只打印跳过，不清空已有产物。

两个子页面内部全用相对路径，所以访问它们的 URL 必须以斜杠结尾（`/corpus/` 而不是 `/corpus`）；
`next.config.ts` 的 `trailingSlash: true` 就是为这一条服务的，去掉它线上门面会照常显示、
脚本却全部 404（见第 7 节对应那行）。

推送之后 `main` 的最新构建始终在 `https://luzzz-me-git-main-luz7818.vercel.app`，
用它验收最省事（这个地址带 Vercel 登录墙，得先登录）。要确认的是三件事：
子页面脚本与图片都是 200、星图的画布不是默认的 `300x150`、转换器点「转换为专业术语」能出术语卡。

确认到位：

```bash
ls out/marx-cloud/index.html out/corpus/index.html
grep -o 'href="/marx-cloud/"' out/index.html
```

两条都应有输出。浏览器打开本地 `out/` 时，子页面的「返回主页」会回到本站首页。
这枚回链只在「确实有上一级」时出现：两个子页面各自的代码会比较 `../` 解析出的路径与当前路径，
相等时（源仓库单独部署在站点根）就把它摘掉，否则点了等于刷新本页；`corpus` 另外在 `file://`
下也摘掉，因为那一页本来就能双击打开，而那时上一级只是一个本地目录列表。实测判据见
[docs/ARCHITECTURE.md](ARCHITECTURE.md) 关键约定 8。

## 7. 常见故障

| 现象 / 报错原文 | 原因 | 怎么办 |
|---|---|---|
| `Error: "next start" does not work with "output: export" configuration. Use "npx serve@latest out" instead.` | 导出模式下没有 Node 服务器可起 | 别用 `next start`。本地看产物用 `python -m http.server 8099 --directory out` |
| `⨯ Another next dev server is already running.` 并列出 `PID` 与 `Log: .next\dev\logs\next-development.log`，随后 `ELIFECYCLE Command failed with exit code 1` | 上一次 `next dev` 的进程还在，本仓库同时只允许一个 dev server | 用列出的 PID 结束它：Git Bash 里 `taskkill //PID <pid> //F` |
| `⚠ Port 3000 is in use by process 29004, using available port 3001 instead.` | 3000 被**别的**程序占了（不是同一个项目的第二个 dev server） | 按提示的地址访问，或先释放 3000 |
| `Error: EBUSY: resource busy or locked, rmdir '...\out'`，而前面的静态页面生成都正常 | Windows 下 `out/` 正被上一步的 `http.server` 或文件管理器占着，Next 清空产物时删不掉 | 关掉那个服务（`taskkill //PID <pid> //F`，PID 用 `netstat -ano \| grep 8099` 查），再 `pnpm build` |
| 首屏没有光轨、一片纯色 | `prefers-reduced-motion` 开着时这是**预期行为**（静态只画一帧，画布尺寸异常时才可能全黑） | 先关掉系统的「减少动态效果」再刷新；仍异常再查控制台 |
| 把截图放进了 `public/projects/`，刷新页面卡片还是字型水印 | 文件名不等于 `slug`，或后缀不在 `png/webp/jpg/jpeg` 里，或没重跑 `pnpm build` | `ls public/projects` 核对文件名，再 `pnpm build` |
| 改了 `--color-accent`，光轨没变色 | 浏览器缓存了旧产物 | 硬刷新（Ctrl+Shift+R）；`LightTrails` 在 `resize` 时才重读 CSS 变量，dev 下改完可手动缩一下窗口 |
| 访问 `/marx-cloud/` 或 `/corpus/` 是 404 | 产物没同步或没重新构建（`public/` 下没有这两个目录） | `node tools/sync-showcases.mjs` 后 `pnpm build` |
| 子页面打开是空白、控制台报资源 404 | 子页面按相对路径引用资源，被从别的绝对路径访问时基准不对；本站部署是 `/<名字>/index.html`，正常不会遇到 | 用 `out/marx-cloud/index.html` 起服务复现，别改子页面里的路径 |
| 线上打开 `/marx-cloud/` 或 `/corpus/`：页面文字都在，但星图不动、转换器点不动，Network 里 `/assets/index-….js` 或 `/data.js` 是 404 | 实际访问路径少了末尾斜杠（`/marx-cloud`），相对路径的基准就变成了站点根，资源全去找根目录 | 别去改子页面里的路径。确认 `next.config.ts` 的 `trailingSlash: true` 还在并重新部署（`npx vercel build` 后看 `.vercel/output/config.json` 应有一条把路径补成 `/$1/` 的 308）；本地 `python -m http.server` 不做这条重定向，复现不出来 |
| 打开 `https://<部署名>-luz7818.vercel.app` 被跳到 `/login`，页面标题是 `Login – Vercel` | 项目开了 Deployment Protection，它只对 Vercel 自带的 `*.vercel.app` 域名生效（`ssoProtection.deploymentType` 为 `all_except_custom_domains`） | 用有权限的 Vercel 账号登录一次，或改用 `npx vercel curl <部署地址>` 取内容；绑定了自定义域名之后访客走 `luzzz.me` 不受这条影响 |
| 源仓库已经改了，子页面还是旧的 | 子页面是构建产物副本，不会自动跟随 | 重跑同步与构建，把 `public/marx-cloud/`、`public/corpus/` 的变动一起提交 |

移动端只做了 CSS 断点适配，**没有在真机上验证过**光轨帧率。这一条是现状，
不是故障；真机测过之后请把结果补进 [AGENTS.md](../AGENTS.md)。

## 8. 术语小词典

| 词 | 它在这个仓库里干什么 |
|---|---|
| App Router | Next.js 的路由目录约定，`src/app/` 下一个文件夹对应一段 URL。本站只有根路由 `/` |
| SSR 服务端渲染 | 在服务器上把组件跑成 HTML 再发出去。本仓库**没有**运行时服务，所以没有常驻 SSR |
| 预渲染 prerender | 构建时就把组件执行一遍、把结果写成静态 HTML。`pnpm build` 输出里的 `(Static)` 就是它 |
| 静态导出 `output: "export"` | 让 Next 只产出 HTML/CSS/JS 文件、不生成任何服务端代码。`out/` 因此能扔到任意静态托管上 |
| 客户端组件 `'use client'` | 该文件会在浏览器里运行、能用 `useState` 和 DOM。`src/components/` 下 10 个是，`Aurora`/`Marquee` 这 2 个不是；`src/app/` 下 2 个不是 |
| 水合 hydration | 浏览器接到服务端 HTML 后，把事件与状态挂上去、让它变成可交互的同一棵树 |
| `route.ts` / `middleware.ts` | 服务端接口与请求拦截入口。本仓库刻意没有，加了就会和静态导出冲突 |
| Canvas 2D | 浏览器自带的二维画布 API。首屏的长曝光车流就是一张全屏 canvas，不需要 WebGL |
| `lighter` 混合 | canvas 的叠加混合模式，光轨靠它把前后帧的光点亮度叠起来，做出长曝光观感 |
| 拖尾 trail fade | 每帧先用半透明底色盖一遍画布再画新光点，旧光点逐帧变暗，形成尾迹 |
| DPR `devicePixelRatio` | 物理像素与 CSS 像素的比值，代码里取 `min(dpr, 2)` 上限，防止高刷屏上画布跑不动 |
| rAF `requestAnimationFrame` | 逐帧回调，驱动车流前进。标签页不可见时代码会停掉它以省 GPU |
| `IntersectionObserver` | 元素进没进视口。`Reveal` 的进场动画用它，命中一次即断开 |
| `prefers-reduced-motion` | 系统级「减少动态效果」开关。三层响应它：`globals.css` 的全局规则、`LightTrails` 的静态单帧、各 Motion 组件的 `useReducedMotion()` 降级（AGENTS.md 约定第 7 条） |
| Motion (`motion/react`) | 本站唯一的动画引擎：进场揭示、磁性按钮、聚光边框、3D 倾斜、数字滚动、滚动编排都由它驱动。不要与 GSAP 混用 |
| `@property` | 把自定义属性注册成带类型的可动画属性。9 个颜色 token 注册后,`:root` 上的 `transition` 让主题切换呈全页涟漪渐变 |
| Lenis | 惯性平滑滚动库(`SmoothScroll.tsx`),滚轮经 lerp 平滑后仍驱动原生滚动,`useScroll` 一切照常;锚点经 `smoothTo()` 走它的缓动 |
| `data-theme` | `<html>` 上的主题标记，值为 `dark`/`light`。预水合脚本首帧前写入，`globals.css` 的亮色变量靠 `[data-theme='light']` 选择器生效 |
| 变量字体 woff2 | 一个字体文件里内嵌多档字重。`@font-face` 声明 `font-weight: 100 900` 覆盖整段 |
| Tailwind v4 `@theme` | 用 CSS 变量声明设计令牌，`--color-accent` 会自动变成 `text-accent` 这类工具类 |
| Turbopack | Next 16 默认的打包器，`pnpm dev` 与 `pnpm build` 输出第一行的 `(Turbopack)` 就是它 |
| ESLint flat config | 新版单文件配置格式，本仓库是 `eslint.config.mjs`，其中 `globalIgnores` 覆盖了默认忽略项 |
| RSC flight 数据 | `out/index.txt` 那种机器格式文件，内容与 `index.html` 同一棵组件树，供客户端切换路由用 |

## 9. 改完之后跑什么

```bash
npx tsc --noEmit
npm run lint
pnpm build
```

三条退出码都应为 0。通过标准：`npx tsc --noEmit` 与 `npm run lint` 均无任何输出，
`pnpm build` 末段两条路由都标 `○ (Static)`。这三条就是本仓库的全部门禁，
它们各自管什么、改动后该跑哪几条，写在 [AGENTS.md](../AGENTS.md)。

上线只需要推送。项目已连上 `Luz7818/luzzz.me`，`main` 分支每次推送都会触发 Vercel 构建并切到
production：

```bash
git push
```

要确认这一条真的生效（复核：`curl -s -H "Authorization: Bearer $VERCEL_TOKEN"
https://api.vercel.com/v9/projects/luzzz-me`，`link.repo` 应为 `luzzz.me`、
`link.productionBranch` 应为 `main`）。构建没跑起来时才需要手工兜底：

```bash
npx vercel --prod          # 直接上传本地内容构建，需要 VERCEL_TOKEN
```

两条路都能出线上版本，但日常只用 `git push` —— 手工上传的那次部署不会跟随仓库，
下一次推送会被仓库版本覆盖。
