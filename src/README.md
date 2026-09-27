# src/ —— 站点的全部代码与数据

> 用途：说明 `src/` 三个子目录各管什么、每个文件干什么、`site.ts` 的哪个字段被谁读。
> 想改内容先从这里查归属；命令口径与门禁以仓库根的 [AGENTS.md](../AGENTS.md) 为准。

`src/` 是站点的全部实现：14 个文件（复核：`git ls-files src | grep -v README | wc -l`），
其中 12 个 TS/TSX。`app/` 提供路由与主题，`components/` 提供 9 个板块与动效，`data/` 提供唯一
的手工数据源。产物 `out/` 完全由这三块加上 `public/` 生成，没有运行时代码从外部取数据。

## 文件清单

`src/` 根下不直接放代码文件，只有本 `README.md` 一份（复核：`find src -maxdepth 1 -type f`，
输出只有 `src/README.md`）。其余 14 个入库文件全在下一节的三个二级目录里
（复核：`git ls-files src | grep -v README | wc -l`），其中 12 个是 TS/TSX
（复核：`git ls-files 'src/*.ts' 'src/*.tsx' | wc -l`）。这张表只做索引，逐文件的说明在下面三节。

| 文件 | 干什么 | 备注 |
|---|---|---|
| `README.md` | 本文件，`src/` 的目录说明 | 不是站点资源：只有 `public/` 下的东西会被原样拷进 `out/`，这里不会 |
| `app/page.tsx` | 唯一路由 `/` 的页面，装配背景、导航与五个板块 | 索引 → 下文「src/app —— App Router 根」；预览图扫描函数 `findPreviews()` 也在这个文件里 |
| `app/layout.tsx`、`app/globals.css`、`app/favicon.ico` | 根布局与 metadata、主题令牌与工具类、站点图标 | 文件名由 Next 的 App Router 约定固定，不是本仓库自定的命名 |
| `components/*.tsx` | 9 个客户端组件：五个板块加顶栏、背景与两个动效壳 | 索引 → 下文「src/components —— 9 个客户端组件」。`page.tsx` 只直接 import 其中 7 个，剩下 `Reveal.tsx` 与 `GradientBlurTitle.tsx` 由组件之间互相引用（复核：`grep -rl "from './Reveal'" src/components \| wc -l` 得 4，`grep -rl "from './GradientBlurTitle'" src/components` 只有 `Hero.tsx`） |
| `data/site.ts` | 全站唯一手工数据源，导出 `profile`、`services`、`projects`、`palette` 与类型 `Project`、`Service` | 索引 → 下文「src/data —— 唯一手工数据源」与其后的「各字段被谁消费」。被 `src/` 下 8 个 TS/TSX 引用（复核：`grep -rl "@/data/site" src --include=*.ts --include=*.tsx \| wc -l`） |

## 子目录

| 子目录 | 负责 |
|---|---|
| `app/` | App Router 根：路由 `/`、根布局与 metadata、全局样式与主题令牌、站点图标，4 个文件（复核：`git ls-files src/app \| wc -l`）。逐文件说明见下文「src/app —— App Router 根」 |
| `components/` | 9 个客户端组件，全部以 `'use client'` 开头（复核：`git ls-files src/components \| wc -l`、`grep -rl "^'use client'" src/components \| wc -l`）。逐文件说明见下文「src/components —— 9 个客户端组件」 |
| `data/` | 唯一手工数据源 `site.ts`，1 个文件（复核：`git ls-files src/data`）。哪个字段被哪个组件读，见下文「各字段被谁消费」 |

## src/app —— App Router 根

只有根路由 `/`，没有 `(group)` 分组、没有嵌套布局、没有 `route.ts`。

| 文件 | 干什么 | 备注 |
|---|---|---|
| `layout.tsx` | 根布局与站点 metadata | 服务端组件。`title`/`description`/`openGraph` 全部由 `profile` 拼出，`html lang="zh-CN"`，`body` 挂 `font-mono`；`viewport.themeColor` 写死 `#f5f7fc`，与 `globals.css` 的 `--color-bg` 同值但各写一份 |
| `page.tsx` | 唯一的页面，装配背景、导航与五个板块 | 服务端组件。顺序是 `IridescentBackground` → `Nav` → `main`(Hero/About/Services/Projects/Contact)；`<main>` 里的 `section` 锚点依次是 `#top` `#about` `#services` `#projects` `#contact` |
| `page.tsx` 里的 `findPreviews()` | 用 `node:fs` 扫 `public/projects/` | 按 `projects[].slug` 试 `png`→`webp`→`jpg`→`jpeg`（常量 `EXT`），命中即拼成 `/projects/<slug>.<ext>`；目录不存在返回空对象。这一步在预渲染时执行，改图后要重跑 `pnpm build` |
| `globals.css` | Tailwind 入口 + 主题令牌 + 三条自定义工具类 | `@theme` 里 7 个 `--color-*` 与 `--font-mono`（复核：`grep -c "^  --color-" src/app/globals.css`）；`@font-face` 指向 `/fonts/jetbrains-mono-var.woff2`，`font-weight: 100 900`；`.on-bands` 给压在色带上的文字加白色投影，`.glass` 是毛玻璃卡片底，`.accent-gradient` 是双色渐变；末尾整段响应 `prefers-reduced-motion` |
| `favicon.ico` | Next 约定的站点图标 | 构建后出现在 `out/favicon.ico`；`out/_next/static/media/` 下另有一份带哈希的副本 |

## src/components —— 9 个客户端组件

九个文件全部以 `'use client'` 开头（复核：`grep -rl "^'use client'" src/components | wc -l`）。
每个板块自己 `import { profile } from '@/data/site'`，没有 context 也没有状态管理层。

| 文件 | 渲染哪一块 | 值得知道的实现点 |
|---|---|---|
| `Nav.tsx` | 固定顶栏 + 全屏遮罩菜单 | 菜单项是文件内常量 `LINKS`（About/Services/Projects/Contact，编号 `01`–`04`），改板块名要改这里而不是 `site.ts`；点击用 `scrollIntoView` 平滑滚到对应 `id`；`Esc` 关闭、打开时锁 `body` 滚动 |
| `Hero.tsx` | `#top` 首屏 | 眉标带一个 `animate-pulse` 光标方块；`EST 2022` 是**写死**在 JSX 里的，不来自 `site.ts`；`SCROLL` 指示条的 `@keyframes` 用内联 `<style>` 注入 |
| `About.tsx` | `#about` | 内嵌 `BracketedWord`：`me` 这个词默认 `blur(3px)`，悬停/聚焦/点击时变清晰并撑出四角括号；下面四格统计（`7 公开仓库` `2022 GitHub 元年` `5 主力项目` `∞ 未完成的点子`）是 JSX 里的字面量数组，与 `site.ts` 无关联 |
| `Services.tsx` | `#services` | 手风琴，同一时刻只开一条，默认展开第 0 条（`useState<number \| null>(0)`）；展开动画靠 `grid-template-rows: 0fr→1fr`；`icon` 字段查文件内 `ICONS` 表得到一段 SVG path；`live: true` 才显示 `LIVE` 角标 |
| `Projects.tsx` | `#projects` | 卡片网格 `sm:2` 列 / `xl:3` 列；标题行右侧的 `{projects.length} SELECTED` 只在 `md` 以上可见；`preview` 为空时渲染 `GeneratedPreview`（90 个 `<circle>` 的星点 SVG，种子是 `slug`，由 `starField()` 的 xorshift 保证每张卡图案稳定且互不相同）；有图时用原生 `<img>`，配一行 `eslint-disable @next/next/no-img-element` |
| `Contact.tsx` | `#contact` 与页脚 | 内嵌 `Lanyard`：阻尼单摆模拟（文件常量 `ROPE`/`GRAVITY`/`DAMPING`），拖拽时把吊牌钉在指针上、松手带初速度甩出；联系行是文件内常量 `ROWS`（EMAIL/GITHUB/HOMEPAGE），其中 `HOMEPAGE` 的文案 `luzzz.me` 和链接 `https://luz7818.github.io/` 都写死；页脚年份用 `new Date().getFullYear()`，即构建那一刻的年份被烘进 HTML |
| `IridescentBackground.tsx` | 全屏 fixed 背景画布 | 手写 WebGL1，没有引入 `ogl` 之类的库。`VERT`/`FRAG` 是文件内的 GLSL 字符串；`MAX_COLORS = 8`，而 `palette.colors` 只给 6 个，多余的槽位按 `i % colors.length` 循环填充，`uColorCount` 取两者较小值；DPR 上限压到 2；标签页隐藏或画布滚出视口时停掉 rAF；拿不到 WebGL 上下文时改成一段三色 CSS 渐变并直接 return |
| `GradientBlurTitle.tsx` | Hero 大标题的逐字效果 | 把字符串按字符拆成 `<span>`，每字自己采样同一条横向渐变（`background-position` 按实测偏移反推），进场时逐字 `blur(16px)→0`；用 `ResizeObserver` 在宽度变化时重算偏移；另有一个 `.sr-only` 的可读文本 |
| `Reveal.tsx` | 通用进场包壳 | `IntersectionObserver` 命中一次即 `disconnect`；参数 `y`（默认 18px）与 `delay`；被 About/Services/Projects/Contact 使用，Hero 与 Nav 不用它 |

## src/data —— 唯一手工数据源

| 文件 | 干什么 | 备注 |
|---|---|---|
| `site.ts` | 导出 `profile`、`services`(4 条)、`projects`(5 条)、`palette`，以及类型 `Project`、`Service` | 条数复核：`grep -c "href: 'https" src/data/site.ts` 得 4，`grep -c "url: 'https" src/data/site.ts` 得 5 |

### 各字段被谁消费

| 字段 | 消费方 |
|---|---|
| `profile.handle` | `Contact.tsx`：GITHUB 行的 `@Luz7818`、页脚署名 |
| `profile.displayName` | `layout.tsx` 标题、`Nav.tsx` 左上角文字（转小写）、`Hero.tsx` 大标题、`Contact.tsx` 吊牌与 `aria-label` |
| `profile.fullName` | `layout.tsx` 的 `metadata.authors`、`Contact.tsx` 页脚版权 |
| `profile.eyebrow` | `Hero.tsx` 眉标 |
| `profile.lead` | `Hero.tsx` 引导语，同时是 `layout.tsx` 的 `description` 与 `openGraph.description` |
| `profile.email` | `Hero.tsx` 邮件按钮、`Nav.tsx` 的 EMAIL、`Services.tsx` 末尾一行、`Contact.tsx` 的联系行与 Say Hello |
| `profile.github` | `layout.tsx` 的 `authors.url`、`Nav.tsx` 与 `Contact.tsx` 的仓库链接 |
| `profile.role` | `Hero.tsx` 底部信息行、`Contact.tsx` 吊牌小字 |
| `profile.aboutLine` | `About.tsx` 正文段 |
| `services[].name` / `.sub` | `Services.tsx` 折叠行的主标题与灰色副标题 |
| `services[].detail` | `Services.tsx` 展开后的正文 |
| `services[].href` | `Services.tsx` 展开正文末尾的「源码 ↗」；缺省则不渲染该链接 |
| `services[].live` | `Services.tsx` 的 `LIVE` 角标 |
| `services[].icon` | `Services.tsx` 的 `ICONS` 表。类型是六值联合 `'star' \| 'flow' \| 'grid' \| 'chart' \| 'book' \| 'spark'`，写别的会被 `npx tsc --noEmit` 拦下 |
| `projects[].slug` | `page.tsx` 的预览图文件名；`Projects.tsx` 的 React `key` 与星点图种子 |
| `projects[].name` | `Projects.tsx` 卡片标题与 `<img alt>` |
| `projects[].summary` | `Projects.tsx` 卡片正文 |
| `projects[].tags` | `Projects.tsx` 卡片标签条 |
| `projects[].url` / `.demo` | `Projects.tsx` 卡片链接，`demo` 优先，没有则回落 `url` |
| `projects[].stars` / `.language` / `.updated` | `Projects.tsx` 卡片底行 `★ n · 语言 · 日期`，纯手工值 |
| `palette.colors` | `IridescentBackground.tsx` 的 `uColors` 与 `uColorCount`，只影响背景色带 |
| `palette.speed` / `.rotation` / `.autoRotate` | 分别是时间推进倍率、起始角度（度）、每秒附加角度 |
| `palette.scale` / `.frequency` / `.warpStrength` / `.iterations` | 域扭曲那几层的尺度、颜色细节频率、扭曲强度、扭曲迭代轮数 |
| `palette.mouseInfluence` / `.parallax` | 鼠标对色带的拉扯量与整层视差位移量 |
| `palette.noise` | 颗粒噪点幅度 |
| `palette.intensity` / `.bandScale` / `.soft` / `.coreWhite` | 整体亮度、色带数量密度、色带边缘软硬、环心过曝成白的比例 |

`palette` 的键除 `rotation` 与 `autoRotate` 合成一个 `uRot` 外，其余每个都落到着色器的一个 uniform
上。组件里另写了一套 `?? 默认值` 兜底，但那套默认值与 `site.ts` 的实际值不同，删字段不会报错、
只会静默换成另一种观感（详见 [AGENTS.md](../AGENTS.md) 的「已知坑」）。

## 和谁打交道

- **上游**：`site.ts` 与组件里的字面量，全部人工维护，没有任何自动抓取。
- **下游**：`pnpm build` 把 `src/` 与 `public/` 编成 `out/`；`src/` 之外没有其他消费方。
- **改这里之后要跑**：`npx tsc --noEmit && npm run lint && pnpm build`。

## 别动

- 不要把 `src/` 改成不带 `src/` 的根级 `app/`：`tsconfig.json` 的 `paths` 配了 `@/* -> ./src/*`，
  所有组件都按 `@/data/site`、`@/components/...` 引用，挪目录要连 `tsconfig` 一起改。
- 不要为了「让文案集中在 `site.ts`」去删组件里的字面量再来一遍：`About.tsx` 的四格统计、
  `Hero.tsx` 的 `EST 2022`、`Contact.tsx` 的 `ROWS`、`Nav.tsx` 的 `LINKS` 目前就是设计上的
  站内结构，不是遗漏。要集中就一次改到位并跑满三条门禁，别留下半集中状态。
- 不要给 `IridescentBackground.tsx` 的着色器加 WebGL2 语法（`in`/`out`、`textureLod`、数组长度用
  变量）：它拿的是 `webgl` 上下文，写成 WebGL2 会编译失败。失败只体现为控制台里 `compile()` 打出的
  一条 `console.error`，页面背景塌成纯色 `--color-bg`；那段三色渐变只在**拿不到 WebGL 上下文**时出现，
  编译失败时不会出现，两者现象不同别混。
