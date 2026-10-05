# luzzz.me 架构

> 用途：给要理解或改动本站结构的人。架构总览、目录结构与各文件职责、12 条关键约定、发布链路
> 都在这里。操作步骤在 `docs/GET-START.md`；数字口径在根目录 `AGENTS.md` 的「当前状态」。

## 架构总览

Next.js 16 单页作品集，`output: "export"` 全静态导出（`trailingSlash: true` 是子页面能在线上
跑起来的前提，不是风格选项）。没有服务端、没有接口、没有数据库，内容全部来自 `src/data/site.ts`
与组件里的硬编码文案。桌面与移动端走「三幕滚动驱动场景」（开场 → 项目环形 → 工牌联系），
`prefers-reduced-motion` 用户由 CSS 切到经典竖排布局（Hero/About/Projects/Contact）。
背景是纯 2D 光轨 + 遮罩（无 WebGL）；水波只在光标透镜上。

## 目录结构与各文件职责

```
luzzz.me/
├── src/                      入库：app/（路由与主题）、components/（17+3 幕）、data/（site.ts）
├── public/                   原样进产物的静态资源（含两个外仓子页面副本）
├── tools/                    sync-showcases.mjs 子页面同步 + covers/ 封面源文件
├── docs/                     手册与专项规范
└── next.config.ts / eslint.config.mjs / tsconfig.json / package*.json
```

| 路径 | 职责 | 关键点 |
|---|---|---|
| `src/app/layout.tsx` | 根布局与 metadata | `metadata.description` 取的就是 `profile.lead`，改文案会同时改 SEO 描述；body 首行有内联主题脚本，首屏渲染前定 `<html data-theme>`，删了会白闪 |
| `src/app/page.tsx` | 唯一的页面，装配双树：三幕场景（`motion-safe` 才显示）+ 经典竖排（reduced 兜底） | `findPreviews()` 在预渲染时读 `public/projects/`；两棵树共享同一份 `previews` |
| `src/app/globals.css` | Tailwind 入口 + `@theme` 主题令牌 + `@font-face` | UI 配色在这里，不在 `site.ts`；暗/亮各 9 个 `--color-*` 共 18 行；强调色唯一（琥珀家族），`--color-live` 是语义色 |
| `src/components/` | 17 个组件（15 客户端 + 2 服务端） | 逐文件说明与字段消费表见 `src/README.md` |
| `src/components/scenes/` | 三幕组件：`Act1Intro` / `Act2Ring` / `Act3Badge` | 每幕 = 高 wrapper + `sticky top-0 h-dvh` 舞台；锚点经 `registerSceneAnchors()` 注册，不占元素 id |
| `src/data/site.ts` | 全站手工数据 | 导出 `profile` / `stats` / `marquee` / `projects` 与类型 `Project` |
| `public/` | 原样进产物的静态资源 | `fonts/` 两个自托管字体；`projects/` 两张真截图 + 三张风格化封面；`marx-cloud/` 与 `corpus/` 是外仓产物副本；本目录 `README.md` 也会被拷进 `out/` |
| `out/` `.next/` `tsconfig.tsbuildinfo` | 构建产物 | 均被 `.gitignore` 忽略，不要手改 |
| `CLAUDE.md` | 一行 `@AGENTS.md` | 引用入口，不要展开 |
| `next.config.ts` | `output: "export"` 与 `trailingSlash: true` | 见关键约定 1 与 9 |

## 关键约定（违反会出问题的）

1. **为什么是 `output: "export"`**：部署目标是静态托管，产物不需要 Node 运行时。代价是
   需要服务端或构建期算不出的能力全部不可用（Route Handlers、rewrites/redirects/headers、
   ISR、Server Actions、默认 loader 的 `next/image`）。本仓这三项都是空的：
   `find src -name "route.ts" -o -name "middleware.ts"`、`grep -rn "next/image" src/`、
   `grep -rn "next/font" src/`。
2. **`Projects.tsx` 与 `Act2Ring.tsx` 用原生 `<img>` 是配套选择**：各带一行
   `// eslint-disable-next-line @next/next/no-img-element`。该规则是 warn 级，删掉注释后
   `npm run lint` 仍退出码 0，只能从输出多出来的那一行发现。
3. **预览图换图逻辑在 `page.tsx` 的 `findPreviews()`**：按 `slug` 依次试 `png→webp→jpg→jpeg`，
   目录不存在时渲染星点 SVG 兜底。发生在**预渲染时**——截图放进 `public/projects/` 后必须
   重跑 `pnpm build` 才换图。
4. **`site.ts` 是唯一数据源，但不是全部文案**：配色在 `globals.css` 的两套 `--color-*` token；
   写死在组件里的文案清单见 `AGENTS.md`「已知坑」。
5. **`.env.local` 与应用代码无关**：`src/` 下没有任何 `process.env`；它服务的是 `.vercel/`
   CLI 链接。**不要读它，也不要把它的内容或变量名写进文档**。
6. **`process.cwd()` 在 `src/` 下只出现一次**（`page.tsx` 扫预览图），依赖「运行时工作目录 =
   仓库根」。换成 `__dirname` 或 `import.meta.url` 作基准时路径要跟着改；判据是放一张截图后
   `grep -o "<img" out/index.html | wc -l` 从 0 变非 0。
7. **`prefers-reduced-motion` 的实现分四层，要一起改**：`page.tsx` 双树 CSS 切换（纯 CSS
   无闪烁）；`globals.css` 把 CSS 动画压到 0.001ms；`LightTrails` reduced 下只画一帧静态光轨
   （`FluidGlass` 的 WebGL 层直接不初始化）；Motion 组件用 `useReducedMotion()` 降级。
   **`useReducedMotion()` 禁止按返回值分支 DOM 结构，只许分支 Motion props**——否则 reduced
   用户 hydration 文本不匹配整树重渲染（`SplitChars` 踩过）。
8. **`public/marx-cloud/` 与 `public/corpus/` 是别的仓库的构建产物，不要手改**：它们是
   Marx_Cloud 的 `dist/` 与 Traffic_terminology 的 `web/` 拷贝（Vercel 构建机上没有兄弟目录，
   所以副本入库）。改子页面 = 回源仓库改 + `pnpm sync:showcases` + `pnpm build`；直接编辑
   会在下次同步时被覆盖，且造成"线上与两个源仓库都不一致"的三方漂移。子页面「返回主页」
   是相对路径 `../`，两种托管都成立，不要改绝对路径。`eslint.config.mjs` 的 `globalIgnores`
   必须列上这两个目录（副本里有十几万字符压缩 JS；不列时 lint 退出码 1、878 problems）。
9. **`trailingSlash: true` 是子页面在线上跑起来的前提**：默认 Next 预设会把 `/marx-cloud/`
   308 成 `/marx-cloud`，相对路径基准变站点根，资源全 404（HTML 正常、星图不动）。判据：
   `https://www.luzzz.me/marx-cloud/` 的 JS/CSS 与四张 `*-mask.png` 全 200、
   `https://www.luzzz.me/corpus/data.js` 200 且含 `window.TRAFFIC_DATA`。复核读
   `.vercel/output/config.json`：`Location` 为 `/$1/` 的 308 在、`/$1` 的不在。
10. **主题切换链路不能拆**：预水合脚本（layout.tsx）→ `ThemeToggle` 写 localStorage 并分发
    `luzzz-themechange` → `LightTrails` 监听重绘。丝滑感来自 9 个 `@property` 注册 token +
    `:root` transition；**不要改回 View Transitions 整页快照**（持续动画画布下会卡）。
    滚动丝滑来自 `SmoothScroll.tsx` 的 Lenis（实例挂 `window.__lenis`）。动画引擎只用
    `motion`，不要引入 GSAP 混用（同一棵树争帧）。`.vercel/**` 也要在 `globalIgnores` 里。
11. **三幕锚点与吸附**：三幕锚点经 `registerSceneAnchors()` 注册（经典树已占用 4 个 id）；
    滚动吸附是全局的（`registerSnapAnchors()` 注册 9 个完整画面锚点，停滚 300ms 吸附，
    阈值 0.92×视口高；`wheel`/`touchmove` 立即取消让位给用户）。环形旋转窗口常量
    `CORE = [0.06, 0.94]`——改幕高或卡宽时锚点与 `goTo()` 从同一常量推导，别单改一处。
12. **背景 = 纯 2D 光轨 + 遮罩；水波只在透镜上**：`TrailsBackdrop` 无 WebGL（早年 ogl 流体
    合成层因撕裂与逐帧全屏上传已整体移除——别再往背景加 WebGL 层）；「元素晕开」由
    `Cursor.tsx` 的 SVG backdrop-filter 水滴透镜承担（Chromium 生效，Firefox/Safari 自动
    退化为纯小点，不可修、别为此引库）。透镜用 Motion transform 模板定位时 x/y 必须写进模板。

## 发布与收录

- 部署：Vercel 项目 `luzzz-me` 连 `Luz7818/luzzz.me`，推 `main` 即构建；`www.luzzz.me` 已生效，
  apex 仍未生效（`AGENTS.md`「当前状态」域名行）。
- 子页面副本随源仓库更新而滞后，直到有人重跑 `pnpm sync:showcases`（`AGENTS.md` 关键约定 8）。

## 子目录说明索引

| 子目录 | 说明 |
|---|---|
| `src/` | [src/README.md](../src/README.md)（逐文件说明与字段消费表） |
| `public/` | [public/README.md](../public/README.md)（资源与子页面副本） |
| `tools/` | [tools/README.md](../tools/README.md)（同步脚本与封面源文件） |
| `docs/` | 无（文档目录本身） |

## 已知架构问题

- 项目 star/updated 数据手填，不自动跟随 GitHub（导出模式无运行时，见 `AGENTS.md` 不要做的事）。
- 真机 WebGL 帧率与触屏滚动手感未验证过（桌面与模拟器已走查），低端机可调低 `FluidGlass` 的 dpr。
- apex 域名未生效（DNS 侧事务，见 `TODO.md` 任务 1）。
