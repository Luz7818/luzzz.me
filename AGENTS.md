<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 给 AI 的项目说明

> 用途：给 AI 编码助手。这里是事实与约束，不含介绍性文字。改动本仓库前先读这份。
> README.md 与 docs/getting-started.md 里被引用的事实以本文件为准，它们只链接不复述。

## 一句话

Next.js 16 单页作品集，`output: "export"` 全静态导出。没有服务端、没有接口、没有数据库，
页面内容全部来自 `src/data/site.ts` 与组件里的硬编码文案，构建结果是 `out/` 下的一堆静态文件。

## 当前真实状态

| 项 | 值 | 复核命令 |
|---|---|---|
| 类型检查 | 退出码 0，无任何输出 | `npx tsc --noEmit` |
| ESLint | 退出码 0，无输出；`npm run lint` 实际检查 16 个文件（`src/` 下 12 个 + 3 个根配置 + `tools/sync-showcases.mjs`），0 error 0 warning | 计数用 `npx eslint --format json .`，数输出的 `filePath` 条数 |
| 构建 | 退出码 0，两条路由 `/` 与 `/_not-found`，均标为 Static | `pnpm build` |
| 导出产物 | `out/` 共 38 个文件，含被原样拷进去的 `out/README.md` | `find out -type f \| wc -l`；`diff -q public/README.md out/README.md` |
| 导出模式 | `next.config.ts` 里只有一行 `output: "export"` | `grep -n output next.config.ts` |
| 站内子页面 | `public/marx-cloud/` 1,647,095 字节、`public/corpus/` 342,874 字节，各 8 与 4 个文件；构建后原样出现在 `out/` 同名目录 | `find public/marx-cloud -type f -printf '%s\n' \| awk '{s+=$1} END{print s}'`（corpus 同形）；`find out/marx-cloud out/corpus -type f \| wc -l` |
| 部署 | 项目 `luzzz-me`，最新 production 部署 `● Ready`；**未连 Git**（`gitRepository` 为空，缺 Vercel GitHub App 授权）；`*.vercel.app` 带登录墙（`ssoProtection.deploymentType` = `all_except_custom_domains`），自定义域名不受此限制 | `npx vercel ls`、`npx vercel inspect <部署地址>`；接口复核 `curl -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v9/projects/luzzz-me` 看 `gitRepository` / `ssoProtection` |
| 域名 | `luzzz.me` 与 `www.luzzz.me` 已绑到项目并出现在 Aliases，但 DNS 仍在万网，缺 `A luzzz.me 76.76.21.21`（Vercel 共用接入 IP） | `npx vercel domains inspect luzzz.me`，它会打印 `This Domain is not configured properly` |
| 源文件 | `src/` 下 14 个文件，其中 12 个 TS/TSX | `git ls-files src \| grep -v README \| wc -l` |
| 组件 | 9 个，全部以 `'use client'` 开头 | `grep -rl "^'use client'" src/components \| wc -l` |
| 运行时依赖 | 3 个：`next` `react` `react-dom` | `node -e "console.log(Object.keys(require('./package.json').dependencies))"` |
| Node / pnpm | `v24.19.0` / `10.33.0`（`packageManager` 声明 `pnpm@10.33.0`） | `node -v && pnpm -v` |
| `next start` | 不可用：先打印 `✓ Ready`，紧接着抛错，退出码 1 | `npx next start` |
| 测试 | 仓库内没有任何测试或 CI | `git ls-files \| grep -iE "test\|spec"` 与 `ls .github` |

## 仓库地图

| 路径 | 职责 | 关键点 |
|---|---|---|
| `src/app/layout.tsx` | 根布局与 metadata | `metadata.description` 取的就是 `profile.lead`，改文案会同时改 SEO 描述 |
| `src/app/page.tsx` | 唯一的页面，装配背景、导航与五个板块 | `findPreviews()` 在预渲染时读 `public/projects/` |
| `src/app/globals.css` | Tailwind 入口 + `@theme` 主题色 + `@font-face` | UI 配色在这里，不在 `site.ts` |
| `src/components/` | 9 个客户端组件 | 逐文件说明与字段消费表见 `src/README.md` |
| `src/data/site.ts` | 全站手工数据 | 导出 `profile` / `services` / `projects` / `palette` 与类型 `Project` / `Service` |
| `public/` | 原样进产物的静态资源 | `fonts/jetbrains-mono-var.woff2` 是唯一手写资源；`marx-cloud/` 与 `corpus/` 是外仓构建产物副本；`projects/` **当前不存在**需手工建；本目录的 `README.md` 也会被拷进 `out/` |
| `out/` `.next/` `tsconfig.tsbuildinfo` | 构建产物 | 均被 `.gitignore` 忽略，不要手改 |
| `CLAUDE.md` | 一行 `@AGENTS.md` | 由同一个 Next.js 机制写入，内容不要展开 |

## 关键约定（违反会出问题的才列）

1. **为什么是 `output: "export"`**：部署目标是静态托管，产物不需要 Node 运行时。代价是需要服务端
   或构建期算不出的能力全部不可用，官方不支持清单写在 `node_modules/next/dist/docs/01-app/02-guides/
   static-exports.md`（复核：`sed -n '280,300p' node_modules/next/dist/docs/01-app/02-guides/static-exports.md`），
   含 Route Handlers、rewrites/redirects/headers、ISR、Server Actions，以及**用默认 `loader` 的
   `next/image`**。在 `next dev` 里用这些会直接报错。本仓库这三项都是空的：
   `find src -name "route.ts" -o -name "middleware.ts"`、`grep -rn "next/image" src/`、
   `grep -rn "next/font" src/`。
2. **`Projects.tsx` 用原生 `<img>` 是配套选择**：导出模式要用 `next/image` 得另配 custom image loader，
   而这里只是本地截图，不值当。它带一行 `// eslint-disable-next-line @next/next/no-img-element`
   （`Projects.tsx` 第 58 行）。该规则配的是 warn 级（复核：`npx eslint --print-config
   src/components/Projects.tsx` 里 `no-img-element` 的值为 `[1]`），所以删掉那行注释后
   `npm run lint` 依然退出码 0，只能从输出多出来的那一行发现。
3. **预览图的换图逻辑在 `src/app/page.tsx` 的 `findPreviews()`**：用 `node:fs` 按 `site.ts` 里
   `projects[].slug` 依次试 `png` → `webp` → `jpg` → `jpeg`（常量 `EXT`），第一个命中的拼成
   `/projects/<slug>.<ext>` 传给 `Projects`；目录不存在时返回空对象，`Projects.tsx` 于是渲染
   `GeneratedPreview` 的星点 SVG 兜底。这一步发生在**预渲染时**，所以截图放进 `public/projects/`
   之后必须重跑 `pnpm build` 才会换图，`pnpm dev` 下则是每次请求现算。
4. **`site.ts` 是唯一数据源，但不是全部文案**：`palette` 只管 WebGL 背景的 6 个色值；
   页面文字配色是 `globals.css` 的 `@theme` 里 7 个 `--color-*`
   （复核：`grep -c "^  --color-" src/app/globals.css`）。写死在组件里的文案见「已知坑」第 2 条。
5. **`.env.local` 与应用代码无关**：`.gitignore` 忽略 `.env*`；`src/` 下没有任何 `process.env`
   （复核：`grep -rn "process\.env" src/`）。`next dev` / `next build` 打印的
   `- Environments: .env.local` 只是 Next 自己在加载它，导出的 HTML 里没有任何来自它的值。
   这个文件服务的是 `.vercel/` 那套 CLI 链接。**不要读它，也不要把它的内容或变量名写进文档**。
6. **`process.cwd()` 在 `src/` 下只出现一次**（复核：`grep -rn "process\." src/`），就是 `page.tsx`
   扫预览图那处，依赖「运行时工作目录 = 仓库根」这个前提，dev 与 build 下都成立。换成 `__dirname`
   或 `import.meta.url` 作基准就变成产物目录内的相对位置，路径要跟着改；改完的判据是放一张截图后
   `grep -o "<img" out/index.html \| wc -l` 从 0 变成非 0。
7. **`prefers-reduced-motion` 有三处实现，要一起改**：`globals.css` 末尾把动画时长压到 `0.001ms`；
   `IridescentBackground.tsx` 把 `uTime` 钉在 12 且不起 rAF 循环；`Contact.tsx` 的 `Lanyard`
   只调一次 `draw()`。只改一处会出现「页面不动但背景还在流」。

8. **`public/marx-cloud/` 与 `public/corpus/` 是别的仓库的构建产物，不要手改**。
   它们是 Marx_Cloud 与 Traffic_terminology 的 `dist/`、`web/` 拷贝，提交进本仓库是因为
   Vercel 只构建这一个项目、构建机上没有兄弟目录。要改子页面就回源仓库改 + 跑
   `pnpm sync:showcases` + `pnpm build`。直接编辑这里的文件会在下次同步时被整体覆盖，
   而且造成"线上与两个源仓库都不一致"的三方漂移。
   子页面里的「返回主页」是相对路径 `../`，在 `/marx-cloud/` 下解析成本站根目录，
   在 GitHub Pages 的 `/marx-cloud/` 下解析成用户主页 —— 两种托管都成立，不要改成绝对路径。
   这行回链由子页面自己的代码判断是否保留：`../` 解析出来就是当前页时（源仓库单独部署在站点根）
   会把自己摘掉，点了等于刷新；`corpus` 还额外在 `file://` 下摘掉，因为那一页本来就能双击打开。
   副本里有十几万字符的压缩 JS，所以 `eslint.config.mjs` 的 `globalIgnores` 必须列上这两个目录：
   没列时 `npm run lint` 退出码 1，末行打印 `✖ 878 problems (7 errors, 871 warnings)`
   （复核：临时注掉那两行后 `npm run lint; echo $?`，再改回来）。

## 改动后的验证

| 你动了 | 必须跑 | 通过标准 |
|---|---|---|
| `src/` 下任何 TS/TSX | `npx tsc --noEmit && npm run lint && pnpm build` | 三条命令退出码都是 0 |
| `src/data/site.ts` 的 `projects` | `pnpm build` 后 `grep -o "<circle" out/index.html \| wc -l` | 数值等于项目卡数 × 90（当前 450，且只在没有截图时成立） |
| `src/data/site.ts` 的 `palette` | `pnpm dev` 刷新看背景 | 色带随之变化，不需要改组件 |
| `src/app/globals.css` 的 `@theme` | `pnpm dev` 刷新 | 文字与强调色变化；背景色带**不会**变，那归 `palette.colors` |
| `IridescentBackground.tsx` 的着色器源码 | `pnpm dev` 后开控制台 | 没有 `compile` 打出的 `console.error`（着色器编译失败只会静默降级成 CSS 渐变） |
| `public/` 下任何文件 | `pnpm build` 后 `ls out` | 对应文件原样出现在 `out/` 下 |
| 子页面（改的是 Marx_Cloud / Traffic_terminology） | `pnpm sync:showcases && pnpm build` 后 `grep -c 'class="back"' out/marx-cloud/index.html out/corpus/index.html` | 同步脚本会重跑 Marx 的 `vite build`；两条各输出 1，浏览器里点它应回到本站首页 |
| 文档 | `python check_docs.py luzzz.me`（在 `Project/文档标准/` 里执行） | 无阻断项 |

本仓库没有测试，`npx tsc --noEmit`、`npm run lint`、`pnpm build` 这三条就是全部门禁。

## 已知坑（省下一次的调查时间）

- **本文件顶部的 `nextjs-agent-rules` 块由 `next dev` 管理**，缺失时会被重新写回。正文一律写在块
  之外，`upsertAgentRulesBlock` 只替换两个标记之间的内容，块外的东西不会被动。
- **写死在组件里的文案**，改站点文字时最容易漏：`Hero.tsx` 的 `EST 2022`；`About.tsx` 的 4 组数字
  （`7 公开仓库`、`2022 GitHub 元年`、`5 主力项目`、`∞ 未完成的点子`）；各板块 `<h2>` 下面那句说明；
  `Contact.tsx` 里 `ROWS` 的 `HOMEPAGE` 一栏文案与 `https://luz7818.github.io/` 链接；
  `Projects.tsx` 的「查看详情」与网格断点。这些都不在 `site.ts`。
- **`About.tsx` 的数字与 `site.ts` 没有代码级关联**：`5 主力项目` 与 `projects` 的 5 条
  （复核：`grep -c "url: 'https" src/data/site.ts`）现在恰好一致，加一条项目后就不会了。
- **`site.ts` 内部已经自相矛盾**：`services` 里交通用语语料库的 `sub` 写「8 领域」，`projects` 里
  同一条目的 `summary` 写「9 类领域」（复核：`grep -n 领域 src/data/site.ts`）。两行都是从源仓库手抄
  来的，改的时候两处一起改。
- **`IridescentBackground.tsx` 的 `?? 默认值` 与 `site.ts` 的实际值不同**：例如 `intensity ?? 1.5`
  而 `palette.intensity` 是 `1.05`，`soft ?? 1.1` 而实际是 `1.7`，`noise ?? 0.15` 而实际是 `0.12`
  （复核：对照 `palette` 与该文件的 `frame()`）。从 `palette` 里删字段不报错，只会静默换成另一套观感。
- **着色器文件头注释与实现不符**：`IridescentBackground.tsx` 第 6–9 行写「Bands accumulate additively」，
  `FRAG` 的实现早已改成按等值环取色加环心过曝（复核：`FRAG` 里的 `float e = abs(2.0 * fract(x) - 1.0);`）。
  信注释会误判配色模型，以代码为准。
- **WebGL 不可用时是静默降级**：`getContext('webgl')` 拿不到上下文时给 host 设一个 CSS 渐变就 return，
  不打印任何东西。背景变成三色渐变不是 bug，先确认运行环境有没有 WebGL。
- **`public/` 下的任何文件都原样进产物，包括文档本身**：`public/README.md` 会被拷成 `out/README.md`
  （复核：`diff -q public/README.md out/README.md` 无输出）。这是 Next 对 `public/` 的固定行为，
  改不了；不想让说明进部署包就别放在 `public/` 下。
- **`next-env.d.ts`、`.next/types/`、`out/` 都被 `.gitignore` 忽略**，前两项由 `next dev` / `next build`
  生成，而 `tsconfig.json` 的 `include` 引用了它们。新克隆下来直接跑 `npx tsc --noEmit` 之前，
  先跑一次 `pnpm build` 把生成物补齐。
- **Windows 上 `out/` 被静态服务器占着时 `pnpm build` 会失败**：Next 先清空产物目录，
  删不掉就抛 `Error: EBUSY: resource busy or locked, rmdir '<仓库路径>\out'`，退出码 1，
  构建日志前面一切正常。复核：`python -m http.server 8099 --directory out &` 后跑 `pnpm build`，
  看到该报错后 `taskkill //PID <pid> //F` 结束服务再重跑。
- **同机第二个 dev server 会拒绝启动**：`next dev` 检测到本仓库已有实例时打印
  `⨯ Another next dev server is already running.` 并给出既有实例的 PID 与日志路径，随后退出码 1；
  端口只是被别的程序占用时不报错，改用 `⚠ Port 3000 is in use ... using available port 3001`。
- **Git Bash 里的 `taskkill`**：要写成 `taskkill //PID <pid> //F`，单斜杠会被当成路径前缀吃掉。

## 不要做的事

- 不要为了「自动同步 star」在 `page.tsx` 里 fetch GitHub API。导出模式下这行只在构建机上跑一次，
  结果会被永久烘进 `out/index.html`，比手工数据更容易过时，而且构建机没登录态会被限流。
- 不要为了让 `next/image` 用默认 loader、或为了让 `next start` 能起来，就去掉 `output: "export"`。
  这个仓库的部署形态就是静态文件；真要优化图片，按官方文档配 custom loader，别动导出模式。
- 不要手改 `out/` 或 `.next/` 里的文件，下一次 `pnpm build` 整体覆盖。
- 不要删 `public/fonts/` 改用 CDN 字体链接。`globals.css` 的 `@font-face` 指向本地文件，
  换成外链会让离线产物依赖外网。
- 不要给这个仓库加 `zod`、Prettier、测试框架之类来「补齐门禁」；它靠 `tsc` + `eslint` + 一次构建。
- 不要在 README 或手册里另写一套数字（组件数、产物数、卡片数、star 数），统一改到上面的
  「当前真实状态」，其他文档指向这里。
- 不要动 `CLAUDE.md` 的那一行 `@AGENTS.md`，那是引用入口，展开写会变成两份互相漂移的说明。
