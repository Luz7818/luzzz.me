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
桌面与移动端走「三幕滚动驱动场景」（开场 → 项目环形 → 工牌联系），`prefers-reduced-motion`
用户由 CSS 切换到经典竖排布局（Hero/About/Projects/Contact 原有堆叠）。

## 当前真实状态

| 项 | 值 | 复核命令 |
|---|---|---|
| 类型检查 | 退出码 0，无任何输出 | `npx tsc --noEmit` |
| ESLint | 退出码 0，无输出；`npm run lint` 实际检查 16 个文件（`src/` 下 12 个 + 3 个根配置 + `tools/sync-showcases.mjs`），0 error 0 warning | 计数用 `npx eslint --format json .`，数输出的 `filePath` 条数 |
| 构建 | 退出码 0，两条路由 `/` 与 `/_not-found`，均标为 Static | `pnpm build` |
| 导出产物 | `out/` 共 212 个文件（`_next` 12 + `marx-cloud` 171 + `_not-found` 5 + `corpus` 4 + `404` 2 + 根下 8 + `projects/` 5 张图（2 真截图 + 3 风格化封面 webp）+ `fonts/` 2 个字体），含被原样拷进去的 `out/README.md`；`marx-cloud` 的文件数随其 `portraits/`+`avatars/` 图像数浮动，别拿总数当判据 | `find out -type f \| wc -l`；`diff -q public/README.md out/README.md` |
| 导出模式 | `next.config.ts` 里有两行：`output: "export"` 与 `trailingSlash: true`（后者为子页面的相对路径所需，见关键约定 9） | `grep -n "output\|trailingSlash" next.config.ts` |
| 站内子页面 | `public/marx-cloud/` 9,709,985 字节、171 个文件（2026-10-02 起包含 `avatars/`+`portraits/` 共 163 张图，此前副本缺这两目录，换装与侧栏头像在线上是 404）；`public/corpus/` 394,800 字节、4 个文件；构建后原样出现在 `out/` 同名目录 | `find public/marx-cloud -type f -printf '%s\n' \| awk '{s+=$1} END{print s}'`（corpus 同形）；`find out/marx-cloud out/corpus -type f \| wc -l` |
| 部署 | 项目 `luzzz-me` 已连 `Luz7818/luzzz.me`，推 `main` 即由 Vercel 构建；最新 production 部署 `● Ready`；`*.vercel.app` 带登录墙（`ssoProtection.deploymentType` = `all_except_custom_domains`），自定义域名不受此限制 | `npx vercel ls`、`npx vercel inspect <部署地址>`；接口复核 `curl -s -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v9/projects/luzzz-me` 看 `gitRepository` / `ssoProtection` |
| 域名 | `www.luzzz.me` **已生效**：HTTPS 200，返回真实站点（不是 Vercel 登录页），`/marx-cloud/` 与 `/corpus/` 两个子页面同样 200 且页内本地引用 0 断链。apex `luzzz.me` **仍未生效**：DoH 查 A 是空答复，直连表现为 `SSL: UNEXPECTED_EOF_WHILE_READING`。两个域名都在项目 Aliases 里但 `domains` 的 `verificationRecord` 为 `null`。**不要把任何具体接入 IP 写进 DNS 说明**：`www` 走任播，实测同一天两次解析结果就不同；apex 要填的值以 `npx vercel domains inspect luzzz.me` 当场打印的为准（本文早先写的 `76.76.21.21` 是 Vercel 旧共用 IP，已作废） | DoH 免登录复核（apex 那行应为 `[]`）：`python -c "import json,urllib.request as u; [print(n,t,[a['data'] for a in json.load(u.urlopen(f'https://dns.google/resolve?name={n}&type={t}',timeout=20)).get('Answer',[])]) for n,t in [('luzzz.me','A'),('www.luzzz.me','A')]]"`；线上确实返回站点而非登录墙：`python -c "import urllib.request as u;b=u.urlopen(u.Request('https://www.luzzz.me/marx-cloud/',headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read();print('思想云' in b.decode('utf-8'))"` 应为 `True`（探测页面标题里的「思想云」，不钉死会随部署变掉的资源哈希；被登录墙挡时页面标题是 `Login – Vercel`） |
| 源文件 | `src/` 下 25 个文件，其中 23 个 TS/TSX | `git ls-files src \| grep -v README \| wc -l`、`git ls-files src \| grep -c '\.tsx\?$'` |
| 组件 | 20 个（`src/components/` 17 + `src/components/scenes/` 3），其中 18 个客户端组件以 `'use client'` 开头；`Aurora`/`Marquee` 是服务端组件 | `git ls-files src/components \| wc -l`（得 20）、`grep -l "^'use client'" src/components/*.tsx src/components/scenes/*.tsx \| wc -l`（得 18） |
| 运行时依赖 | 6 个：`next` `react` `react-dom` `motion` `@phosphor-icons/react` `lenis` | `node -e "console.log(Object.keys(require('./package.json').dependencies))"` |
| Node / pnpm | `v24.19.0` / `10.33.0`（`packageManager` 声明 `pnpm@10.33.0`） | `node -v && pnpm -v` |
| `next start` | 不可用：先打印 `✓ Ready`，紧接着抛错，退出码 1 | `npx next start` |
| 测试 | 仓库内没有任何测试或 CI | `git ls-files \| grep -iE "test\|spec"` 与 `ls .github` |

## 仓库地图

目录树本身与「每个目录的入口在哪」见仓根 [目录说明.md](目录说明.md)，本节只留职责与隐藏约束，两边不重复列目录。

| 路径 | 职责 | 关键点 |
|---|---|---|
| `src/app/layout.tsx` | 根布局与 metadata | `metadata.description` 取的就是 `profile.lead`，改文案会同时改 SEO 描述；body 首行有内联主题脚本，在首屏渲染前把 `<html data-theme>` 定为 localStorage 的 `luzzz-theme`（缺省跟随系统、默认暗色），删了会白闪 |
| `src/app/page.tsx` | 唯一的页面，装配双树：三幕场景（`motion-safe` 才显示）+ 经典竖排（reduced 兜底） | `findPreviews()` 在预渲染时读 `public/projects/`；两棵树共享同一份 `previews` |
| `src/app/globals.css` | Tailwind 入口 + `@theme` 主题令牌 + `@font-face` | UI 配色在这里，不在 `site.ts`；`@theme` 9 个 `--color-*`（暗色默认）+ `[data-theme='light']` 同名覆盖 9 个（亮色），共 18 行（复核：`grep -c "^  --color-" src/app/globals.css`）；强调色唯一（琥珀家族，两主题各一档对比度），`--color-live` 是语义色；光轨/聚光/极光/颗粒/导航玻璃的氛围变量也分主题放在这里 |
| `src/components/` | 17 个组件（15 客户端 + 2 服务端）：三幕之外的全部板块与动效件 | 逐文件说明与字段消费表见 `src/README.md` |
| `src/components/scenes/` | 三幕组件：`Act1Intro`（开场两拍）、`Act2Ring`（3D 环形轮播 + 滚动吸附）、`Act3Badge`（工牌放大 → 联系页） | 每幕 = 高 wrapper + `sticky top-0 h-dvh` 舞台；锚点经 `registerSceneAnchors()` 注册，不占元素 id |
| `src/data/site.ts` | 全站手工数据 | 导出 `profile` / `stats` / `marquee` / `projects` 与类型 `Project` |
| `public/` | 原样进产物的静态资源 | `fonts/` 两个自托管字体；`projects/` 两张真截图（2026-10-03 起，换图后要重跑 `pnpm build`）；`marx-cloud/` 与 `corpus/` 是外仓构建产物副本；本目录的 `README.md` 也会被拷进 `out/` |
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
2. **`Projects.tsx` 与 `Act2Ring.tsx` 用原生 `<img>` 是配套选择**：导出模式要用 `next/image` 得另配
   custom image loader，而这里只是本地截图，不值当。两处各带一行
   `// eslint-disable-next-line @next/next/no-img-element`。该规则配的是 warn 级（复核：`npx eslint --print-config
   src/components/Projects.tsx` 里 `no-img-element` 的值为 `[1]`），所以删掉那行注释后
   `npm run lint` 依然退出码 0，只能从输出多出来的那一行发现。
3. **预览图的换图逻辑在 `src/app/page.tsx` 的 `findPreviews()`**：用 `node:fs` 按 `site.ts` 里
   `projects[].slug` 依次试 `png` → `webp` → `jpg` → `jpeg`（常量 `EXT`），第一个命中的拼成
   `/projects/<slug>.<ext>` 传给 `Projects`；目录不存在时返回空对象，`Projects.tsx` 于是渲染
   `GeneratedPreview` 的星点 SVG 兜底。这一步发生在**预渲染时**，所以截图放进 `public/projects/`
   之后必须重跑 `pnpm build` 才会换图，`pnpm dev` 下则是每次请求现算。
4. **`site.ts` 是唯一数据源，但不是全部文案**：页面配色是 `globals.css` 的两套 `--color-*`
   token（暗色 `@theme` 默认 + 亮色 `[data-theme='light']` 覆盖，复核：
   `grep -c "^  --color-" src/app/globals.css` 得 18）。写死在组件里的文案见「已知坑」第 2 条。
5. **`.env.local` 与应用代码无关**：`.gitignore` 忽略 `.env*`；`src/` 下没有任何 `process.env`
   （复核：`grep -rn "process\.env" src/`）。`next dev` / `next build` 打印的
   `- Environments: .env.local` 只是 Next 自己在加载它，导出的 HTML 里没有任何来自它的值。
   这个文件服务的是 `.vercel/` 那套 CLI 链接。**不要读它，也不要把它的内容或变量名写进文档**。
6. **`process.cwd()` 在 `src/` 下只出现一次**（复核：`grep -rn "process\." src/`），就是 `page.tsx`
   扫预览图那处，依赖「运行时工作目录 = 仓库根」这个前提，dev 与 build 下都成立。换成 `__dirname`
   或 `import.meta.url` 作基准就变成产物目录内的相对位置，路径要跟着改；改完的判据是放一张截图后
   `grep -o "<img" out/index.html \| wc -l` 从 0 变成非 0。
7. **`prefers-reduced-motion` 的实现分四层，要一起改**：`page.tsx` 的双树由 CSS 切换
   （三幕包在 `hidden motion-safe:block` 里，经典竖排在 `block motion-safe:hidden` 里，纯 CSS 无闪烁）；
   `globals.css` 末尾把 CSS 动画时长压到 `0.001ms`；`LightTrails.tsx` 在 reduced 下只画一帧带尾迹的
   静态光轨、不起 rAF 循环（`FluidGlass` 的 WebGL 层在 reduced 下直接不初始化）；
   各 Motion 组件用 `useReducedMotion()` 把进场/磁性/倾斜/数字滚动降级为直接可见或禁用。
   只改一处会出现「卡片不动但光轨还在流」。**注意：`useReducedMotion()` 在客户端首帧就同步读
   matchMedia（SSR 恒为 false），禁止按它的返回值分支 DOM 结构，只许分支 Motion props——
   否则 reduced 用户 hydration 文本不匹配整树重渲染**（`SplitChars` 曾踩过，见已知坑）。


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

9. **`trailingSlash: true` 是子页面能在线上跑起来的前提，别当成风格选项**。子页面的资源用相对路径
   （`./assets/…`、`data.js`），所以访问路径必须以 `/marx-cloud/` 结尾；默认配置下 Vercel 的 Next
   预设会生成一条 308 把 `/marx-cloud/` 折成 `/marx-cloud`，此时相对路径的基准变成站点根，
   实测表现是 HTML 正常渲染、但 `/assets/index-*.js` 与 `/data.js` 全 404，
   星图停在默认 300×150 的画布、转换器没有 `window.TRAFFIC_DATA`（复核：线上打开
   `https://<部署地址>/marx-cloud/` 看 Network 面板是否出现 404 的 `/assets/…`）。
   本地 `python -m http.server` 不做这条重定向，所以这个故障只在部署后出现。
   线上判据（用 `https://www.luzzz.me/`，公开无登录墙；`*.vercel.app` 那圈会被
   Deployment Protection 挡成 `Login – Vercel`，才需要登录态浏览器）：
   `https://www.luzzz.me/marx-cloud/` 的 `./assets/index-*.js`、`./assets/index-*.css` 与
   运行时按 `?v=7` 拉的四张 `*-mask.png` 都是 200（2026-09-27 实测掩膜字节数与本机
   `dist/` 逐个相同：138,432 / 223,803 / 277,936 / 269,135）；
   `https://www.luzzz.me/corpus/data.js` 200 且含 `window.TRAFFIC_DATA`（302,381 字节，
   与 `Traffic_terminology/web/data.js` 逐字节同尺寸）。`canvas` 尺寸与点「转换为专业术语」
   出术语卡这两条要真跑 JS，只能开浏览器看。地址始终跟 `main` 的最新构建。
   复核（不登录、可脚本化）：
   `python -c "import urllib.request as u;f=lambda p:u.urlopen(u.Request('https://www.luzzz.me'+p,headers={'User-Agent':'Mozilla/5.0'}),timeout=30);[print(p,f('/marx-cloud/'+p).status) for p in ['marx-mask.png?v=7','engels-mask.png?v=7','lenin-mask.png?v=7','luxemburg-mask.png?v=7']];print('/corpus/data.js',f('/corpus/data.js').status)"`
   改回来的判据：`npx vercel build` 后读 `.vercel/output/config.json`，`Location` 为 `/$1/`
   的那条 308 存在、`/$1`（不带斜杠）那条不存在。副作用是 `/_not-found` 与 `/404` 变成目录形式，
   产物里多出 `out/404/index.html`（所以产物数是 39 而不是 38）。

10. **主题切换链路不能拆**：预水合脚本（`layout.tsx`，首帧前写 `<html data-theme>`）→
    `ThemeToggle.tsx` 改 `data-theme` 并写 localStorage `luzzz-theme`、分发 `luzzz-themechange` 事件 →
    `LightTrails.tsx` 监听该事件重读 `--trail-*` 变量重绘画布。切主题的丝滑感来自 `globals.css` 里
    9 个 `@property` 注册的颜色 token + `:root` 上的 `transition`（颜色全页涟漪渐变）；
    **不要改回 View Transitions 整页快照**——持续动画画布下它会卡。滚动丝滑来自 `SmoothScroll.tsx`
    的 Lenis（实例挂 `window.__lenis`，锚点经 `smoothTo()` 走它的缓动）。
    动画引擎只用 `motion`，不要引入 GSAP 与它混用（同一棵树会争帧）。
   另：`vercel build` / `vercel pull` 会把产物与项目元数据写进 `.vercel/`，
   因此 `globalIgnores` 里也要有 `.vercel/**`，否则 `npm run lint` 会去检查那堆压缩 JS。

11. **三幕场景的锚点与吸附**：三幕里锚点不再是元素 id（经典树已占用 `#top/#about/#projects/#contact`），
    各幕挂载时经 `registerSceneAnchors()`（`SmoothScroll.tsx`）注册「锚点 → 目标滚动位置」解析器，
    `smoothTo()` 优先查场景锚点（reduced 下跳过走老锚点），两套互不冲突、无重复 id。
    **滚动吸附是全局的**（SmoothScroll 的 settle）：三幕经 `registerSnapAnchors()` 注册 9 个
    「完整画面」锚点（页顶 / 开场第二拍 / 5 张环卡 / 工牌落定 / 联系页），停滚 300ms 后吸附到
    最近锚点（阈值 0.92×视口高，幕间过渡走廊无死角；四次缓动 0.65s）；`wheel`/`touchmove`
    立即取消吸附让位给用户。`Act2Ring` 内部不再有自己的吸附循环。
    环形旋转窗口常量 `CORE = [0.06, 0.94]`（头尾留入场与交棒），改幕高（480vh）或卡宽时
    锚点与 `goTo()` 都从同一常量推导，别单改一处。

12. **背景 = 纯 2D 光轨 + 遮罩；水波只在透镜上**：`TrailsBackdrop.tsx`（三幕树）=
    `LightTrails` 2D 画布直出 + 两层半透压暗遮罩，**没有 WebGL**。早年这里有过 ogl 流体合成层，
    因刷新时机产生画面撕裂、每帧全屏纹理上传拖累滚动，已整体移除（ogl 依赖随之删除）——
    别再往背景里加 WebGL 层；「背后的元素晕开」由 `Cursor.tsx` 的水滴透镜承担：
    `.cursor-lens`（80px，**无任何可见描边**）挂 `backdrop-filter: url(#luzzz-liquid)`
    （feTurbulence + feDisplacementMap，scale 由光标速度驱动、上限 64、快攻慢放），
    透镜底下真实 DOM（文字/卡片/导航）实时扭成水波；光标本体是 4px 的 `--cursor-core`
    小点（暗暖白/亮墨色）+ 一层 accent 光晕。透镜用 transform 模板定位时 x/y 必须写进模板
    （Motion 里 `transform` 字符串会整体覆盖 x/y）。Chromium 生效；Firefox/Safari 不支持
    SVG backdrop-filter，自动退化为纯小点（不可修，别为此引库）。

## 改动后的验证

| 你动了 | 必须跑 | 通过标准 |
|---|---|---|
| `src/` 下任何 TS/TSX | `npx tsc --noEmit && npm run lint && pnpm build` | 三条命令退出码都是 0 |
| `src/data/site.ts` 的 `projects` | `pnpm build` 后 `grep -o "<img" out/index.html \| wc -l` | 数值 = 有图卡片数 × 2（双树各渲染一遍，当前 5 张全有图 → 10；`marx-cloud`/`traffic-terminology` 是真截图，其余 3 张是 `tools/covers/` 生成的风格化封面）；无图卡渲染 `.hairline-grid` 字型水印兜底，不报错 |
| `src/app/globals.css` 的 `@theme` | `pnpm dev` 刷新 | 文字与强调色变化；`--color-accent` 同时驱动 `LightTrails` 的琥珀光轨，改它光轨跟着变 |
| 主题切换链路（约定 10） | 点 `ThemeToggle`，查 `<html data-theme>` 与 `localStorage['luzzz-theme']`；再刷一次确认无白闪 | 两主题都渲染正常，光轨颜色跟随主题重绘；`prefers-reduced-motion` 下切换是瞬时的 |
| `LightTrails.tsx` 的车道常量 | `pnpm dev` 刷新，缩窄窗口过 640px | 车道整体下移（`LANES_NARROW`），不穿过正文文字区 |
| `public/` 下任何文件 | `pnpm build` 后 `ls out` | 对应文件原样出现在 `out/` 下 |
| 子页面（改的是 Marx_Cloud / Traffic_terminology） | `pnpm sync:showcases && pnpm build` 后 `grep -c 'class="back"' out/marx-cloud/index.html out/corpus/index.html` | 同步脚本会重跑 Marx 的 `vite build`；两条各输出 1，浏览器里点它应回到本站首页 |
| `next.config.ts`（尤其 `trailingSlash`） | `pnpm build` 后 `npx vercel pull --yes && npx vercel build`，读 `.vercel/output/config.json` 里带 `Location` 的 308 方向 | `/$1/` 那条在、`/$1` 那条不在；线上 `/<子页面>/` 打开时 Network 面板没有 404 资源 |
| 文档 | `python check_docs.py luzzz.me`（在 `Project/文档标准/` 里执行） | 无阻断项 |

本仓库没有测试，`npx tsc --noEmit`、`npm run lint`、`pnpm build` 这三条就是全部门禁。

## 已知坑（省下一次的调查时间）

- **本文件顶部的 `nextjs-agent-rules` 块由 `next dev` 管理**，缺失时会被重新写回。正文一律写在块
  之外，`upsertAgentRulesBlock` 只替换两个标记之间的内容，块外的东西不会被动。
- **写死在组件里的文案**，改站点文字时最容易漏：`Hero.tsx` 的两行大标题与「看项目」按钮；
  `Act1Intro.tsx` 的两行大标题（与 Hero 各存一份，两棵树）；`Act2Ring.tsx` 的「滚动旋转环岛 · 停住自动对齐整卡」
  提示行；`Act3Badge.tsx` 的工牌装饰行（`LUZ · STAFF PASS`、`luzzz.me · № 0001`、挂绳孔）；
  `Projects.tsx` 的字型水印 `ZSX`/`TF`/`TH`、横向卡宽（featured 720px / 其余 480px）与
  卷轴降级断点（≥1024px 且非 reduced 才钉屏平移）；`Nav.tsx` 的 `LINKS`（关于/项目/联系）；
  `Marquee.tsx` 消费 `site.ts` 的 `marquee`，但词条内容改数据即可。这些都不在 `site.ts`。
- **`useReducedMotion()` 会破坏 hydration**：motion 的实现是 `useState(prefersReducedMotion.current)`，
  客户端首帧就同步读 matchMedia，而 SSR 恒为 false。按它的返回值分支 DOM 结构（如 reduced 时返回纯文本）
  会让 reduced 用户控制台报「server rendered text didn't match」并整树重渲染。正确姿势：
  结构恒定，只分支 Motion props（`initial`/`whileInView`/variants）。`Cursor` 用
  `useSyncExternalStore`（hydration 期取 server snapshot）则不受影响。
- **无头截图的合成帧滞后**：IAB/无头浏览器里 Motion 每帧改 transform，`screenshot()` 常捕到上一帧
  （表现为「DOM 计算样式是对的、截图里元素却没动」）。对策：截图前 `window.scrollTo(0, scrollY ± 1)`
  触发重合成，等 1–2s 再截；偶发 `screenshot surface preparation timed out` 时隔几秒重试。
  Edge 无头 `--virtual-time-budget` 遇常驻 rAF 会假死挂起，别用。
- **IAB 面板后台化会冻结一切 rAF/CSS 动画**：浏览器走查前先
  `await (await browser.capabilities.get("visibility")).set(true)`，否则截图全是冻结帧，
  且画布类效果看起来像坏了（其实是环境的锅）。
- **内嵌面板隐藏时视口坍缩为 0**：隐藏期间挂载/测量的元素拿到的 `getBoundingClientRect`
  全是 0（会被 `Math.max(1, …)` 钳成 1px），面板恢复后**没有任何 resize 事件**，测量值就永远错下去
  （2026-10-04 实际踩过：LightTrails 画布 2×2 被拉伸成全屏糊状「连线」）。对策：
  一切按元素尺寸工作的画布/量测必须挂 ResizeObserver（LightTrails 的画布、Act3Badge 的工牌、
  SmoothScroll 代理 body 高度给 Lenis），不要只依赖 window resize；页面里同时存在两棵树时，
  `window` 上的调试探针会被后挂载的实例覆盖，要按实例分别暴露。
- **持续动画会让浏览器截图超时或拿到过期帧**：光轨（rAF）、跑马灯与极光（CSS 无限动画）常驻运行，
  无头截图容易 30s 超时或捕到旧合成帧（表现为「内容明明在 DOM 里却没画出来」）。更隐蔽的是：
  标签页处于后台时 rAF 与 CSS transition 全部冻结——`@property` 主题过渡采样会停在起始色、
  Motion 的 whileInView 内容停在入场前透明态，全是环境的锅不是代码的锅。验证办法：
  注入 `*{animation-play-state:paused !important}` 与 `:root{transition:none !important}` 后再切主题截图，
  或超时后隔几秒重试；别把截图里的异常当真 bug，先拿 DOM 计算样式核对。
- **压缩器会吃掉 `.panel` 的标准 `backdrop-filter`**：`backdrop-filter` 与 `-webkit-backdrop-filter`
  同时声明时，顺序必须是 **标准属性在后**，否则构建产物只留 `-webkit-` 前缀版，Chromium 的
  computed 值变 `none`，玻璃模糊静默失效（复核：构建后 grep `.panel{` 应同时含两者）。
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
