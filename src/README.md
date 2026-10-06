# src/ —— 站点的全部代码与数据

> 用途：说明 `src/` 三个子目录各管什么、每个文件干什么、`site.ts` 的哪个字段被谁读。
> 想改内容先从这里查归属；命令口径与门禁以仓库根的 [AGENTS.md](../AGENTS.md) 为准。

`src/` 是站点的全部实现：25 个文件（复核：`git ls-files src | grep -v README | wc -l`），
其中 23 个 TS/TSX。`app/` 提供路由与主题，`components/`（含 `scenes/` 三幕）提供 20 个板块与动效组件，
`data/` 提供唯一的手工数据源。产物 `out/` 完全由这三块加上 `public/` 生成，没有运行时代码从外部取数据。

视觉语言是「夜间路网 × 雾蓝玻璃」双主题：由 `<html data-theme>` 驱动，暗色为默认，强调色唯一
（琥珀家族，两主题各一档对比度），绿色 `--color-live` 只作「线上可访问」的语义状态色。
动效引擎是 `motion`（逐字错峰、进场揭示、磁性、聚光、倾斜、数字滚动、滚动编排），全部响应 `prefers-reduced-motion`。

## 文件清单

`src/` 根下不直接放代码文件，只有本 `README.md` 一份（复核：`find src -maxdepth 1 -type f`，
输出只有 `src/README.md`）。其余 25 个入库文件全在下一节的三个二级目录里
（复核：`git ls-files src | grep -v README | wc -l`），其中 23 个是 TS/TSX
（复核：`git ls-files 'src/*.ts' 'src/*.tsx' | wc -l`）。这张表只做索引，逐文件的说明在下面三节。

| 文件 | 干什么 | 备注 |
|---|---|---|
| `README.md` | 本文件，`src/` 的目录说明 | 不是站点资源：只有 `public/` 下的东西会被原样拷进 `out/`，这里不会 |
| `app/page.tsx` | 唯一路由 `/` 的页面，装配双树：三幕场景（motion-safe）+ 经典竖排（reduced 兜底） | 索引 → 下文「src/app —— App Router 根」；预览图扫描函数 `findPreviews()` 也在这个文件里 |
| `app/layout.tsx`、`app/globals.css`、`app/favicon.ico` | 根布局与 metadata（含主题预水合脚本）、双主题令牌与工具类、站点图标 | 文件名由 Next 的 App Router 约定固定，不是本仓库自定的命名 |
| `components/*.tsx` | 17 个组件：板块、顶栏、主题切换、背景画布、流体层、自定义鼠标、逐字入场、氛围层、跑马灯、平滑滚动与动效壳 | 索引 → 下文「src/components —— 17 个组件」。其中 15 个是客户端组件，`Aurora`/`Marquee` 是服务端组件（复核：`grep -l "^'use client'" src/components/*.tsx \| wc -l` 得 15） |
| `components/scenes/*.tsx` | 三幕组件：`Act1Intro` 开场、`Act2Ring` 项目环形、`Act3Badge` 工牌联系 | 索引 → 下文「src/components/scenes —— 三幕」。全部客户端组件 |
| `data/site.ts` | 全站唯一手工数据源，导出 `profile`、`stats`、`marquee`、`projects` 与类型 `Project` | 索引 → 下文「src/data —— 唯一手工数据源」与其后的「各字段被谁消费」 |

## 子目录

| 子目录 | 负责 |
|---|---|
| `app/` | App Router 根：路由 `/`、根布局与 metadata、双主题令牌与工具类、站点图标，4 个文件（复核：`git ls-files src/app \| wc -l`）。逐文件说明见下文「src/app —— App Router 根」 |
| `components/` | 17 个组件，其中 15 个以 `'use client'` 开头（复核：`git ls-files src/components \| wc -l`、`grep -l "^'use client'" src/components/*.tsx \| wc -l`）。逐文件说明见下文「src/components —— 17 个组件」 |
| `components/scenes/` | 3 幕组件，全部客户端（复核：`git ls-files src/components/scenes \| wc -l`） |
| `data/` | 唯一手工数据源 `site.ts`，1 个文件（复核：`git ls-files src/data`）。哪个字段被哪个组件读，见下文「各字段被谁消费」 |

## src/app —— App Router 根

只有根路由 `/`，没有 `(group)` 分组、没有嵌套布局、没有 `route.ts`。

| 文件 | 干什么 | 备注 |
|---|---|---|
| `layout.tsx` | 根布局、站点 metadata 与主题预水合脚本 | 服务端组件。`title`/`description`/`openGraph` 全部由 `profile` 拼出，`html lang="zh-CN"` 带 `suppressHydrationWarning`，body 首行的内联脚本在首帧前把 `<html data-theme>` 定为 `localStorage['luzzz-theme']`（缺省跟随系统、默认暗色）；`viewport.themeColor` 按系统亮暗各给一档 |
| `page.tsx` | 唯一的页面，装配氛围层、导航与四个板块 | 服务端组件。顺序是 `Aurora` → `Nav` → `main`(Hero/Marquee/About/Projects/Contact)；`<main>` 里的 `section` 锚点依次是 `#top` `#about` `#projects` `#contact`，跑马灯不属于任何锚点 |
| `page.tsx` 里的 `findPreviews()` | 用 `node:fs` 扫 `public/projects/` | 按 `projects[].slug` 试 `png`→`webp`→`jpg`→`jpeg`（常量 `EXT`），命中即拼成 `/projects/<slug>.<ext>`；目录不存在返回空对象。这一步在预渲染时执行，改图后要重跑 `pnpm build` |
| `globals.css` | Tailwind 入口 + 双主题令牌 + 工具类 | `@theme` 里暗色 9 个 `--color-*`（默认），`[data-theme='light']` 同名覆盖 9 个，共 18 行（复核：`grep -c "^  --color-" src/app/globals.css`）；两条 `@font-face` 指向 `/fonts/overpass-var.woff2` 与 `/fonts/jetbrains-mono-var.woff2`；`.panel` 面板（14px 圆角规则，backdrop 配方在 `--panel-backdrop` 变量里分主题定义，::after 内顶光）、`.hairline-grid` 底纹、`.aurora`+`.grain` 氛围层、`.marquee-track` 跑马灯、`.shine` 卡片划光、`::view-transition-*` 主题圆形揭幕、`html.theme-fade` 回退过渡；末尾整段响应 `prefers-reduced-motion` |
| `favicon.ico` | Next 约定的站点图标 | 构建后出现在 `out/favicon.ico`；`out/_next/static/media/` 下另有一份带哈希的副本 |

## src/components —— 17 个组件

15 个客户端组件以 `'use client'` 开头；`Aurora`/`Marquee` 是纯静态的服务端组件。
每个板块自己 `import { profile } from '@/data/site'`，没有 context 也没有状态管理层。

| 文件 | 渲染哪一块 | 值得知道的实现点 |
|---|---|---|
| `Nav.tsx` | 悬浮玻璃胶囊导航 + 右上角主题钮容器 | 客户端组件。链接是文件内常量 `LINKS`（关于/项目/联系），`smoothTo()` 优先解析三幕场景锚点（`registerSceneAnchors` 注册），reduced 下退回元素锚点；`useScroll` + `useMotionValueEvent` 感知滚动（无 `window scroll listener`）：滚过 24px 后玻璃化（`--nav-glass` + blur），顶部 2px 琥珀进度条用 `useSpring(scrollYProgress)`；胶囊内不含主题切换，另渲染一个 `fixed top-[26px] right-6` 的容器装 `ThemeToggle`（top 26+18 与胶囊 16+28 光学对齐） |
| `ThemeToggle.tsx` | 明暗切换按钮（独立右上角玻璃圆钮） | 客户端组件。自带玻璃底（`--nav-glass` + backdrop-blur + 投影），由 `Nav.tsx` 放置在视口右上角；切换 `<html data-theme>` 并写 `localStorage['luzzz-theme']`，分发 `luzzz-themechange` 事件供画布重读颜色；颜色渐变由 `globals.css` 的 `@property` + `:root` transition 全页涟漪完成；Sun/Moon 两枚图标都渲染，旋转淡入淡出由 CSS 按 `data-theme` 决定，无水合闪烁 |
| `Hero.tsx` | `#top` 首屏 | 客户端组件。装配 `LightTrails` + 上下渐隐遮罩 + 文字区椭圆暗场；两行标题走 overflow-hidden 遮罩弹簧揭示（stagger），副文案与 CTA 延迟上浮；`useScroll` 做滚动离场视差（内容下沉淡出、光轨微放大）；鼠标聚光用 `useMotionTemplate` 径向渐变跟随指针；CTA 均为 `MagneticButton`。标题文案写死在 JSX 里 |
| `LightTrails.tsx` | 长曝光车流画布（经典树 Hero / 三幕树经 TrailsBackdrop） | 客户端组件。2D canvas 长曝光车流：四条车道双向光点，`lighter` 混合拖尾；颜色全部读主题变量（`--trail-primary/-secondary/-fade/-alpha/-sky/-glow/-glow-alpha/-vignette-alpha`；后三者构成「天空渐变 + 地平线暖辉 + 暗角」的背景合成，取代早年平涂黑底），监听 `luzzz-themechange` 重读重绘；车道常量 `LANES` 与 `LANES_NARROW`（`w < 640` 下移避正文）；指针视差在帧循环内插值；DPR 上限 1.5；reduced 下只画一帧静态光轨 |
| `Aurora.tsx` | 全页氛围层 | 服务端组件。三团 `radial-gradient` 极光（CSS `drift` 动画，transform-only）+ 一层 SVG 颗粒，`fixed -z-10` + `pointer-events-none`，颜色与透明度随主题变量变化 |
| `Marquee.tsx` | 关键词带 | 服务端组件。消费 `site.ts` 的 `marquee`，内容复制一份做 `translateX(-50%)` 无限循环，悬停暂停，两端渐隐遮罩；全页唯一一条跑马灯 |
| `About.tsx` | `#about` | 客户端组件。一段自述 + `stats` 数据带；数字用 `CountUp`（`useInView` + `animate` 弹簧计数），无 JS 时保持服务端渲染的终值 |
| `Projects.tsx` | `#projects` | 客户端组件，双形态：**≥1024px 且未减弱动效**时是钉屏横向卷轴（区块高度 `100vh + 实测平移距离`，内层 sticky 视口，`useScroll` 纵向进度映射轨道 `x` 弹簧平移，底部琥珀进度线）；**<1024px 或 reduced** 降级为竖向单列堆叠（Reveal 弹簧进场）。卡为竖版大卡（featured 720px 宽，其余 480px），卡体是 `SpotlightCard`（featured 加 `tilt`）；有 `demo` 的卡挂 `LiveBadge`（绿色语义点）；无图卡用 `.hairline-grid` 底纹加 `ZSX`/`TF`/`TH` 字型水印；原生 `<img>` 配一行 `eslint-disable @next/next/no-img-element` |
| `SpotlightCard.tsx` | 卡片动效壳 | 客户端组件。指针位置写入 motion values，`useMotionTemplate` 径向渐变做聚光边框；`tilt` 时整卡随指针 3D 倾斜（±7° 弹簧，`transformPerspective`）；触屏与 reduced 下自动关闭 |
| `MagneticButton.tsx` | 磁性链接壳 | 客户端组件。指针靠近时向光标吸附（`useSpring` 回弹），离开复位；`strength` 可调；触屏与 reduced 下不动 |
| `Contact.tsx` | `#contact` 与页脚（经典树） | 客户端组件。全页唯一的邮件 CTA（`MagneticButton` + 琥珀胶囊 + `.shine` 划光），文案就是邮箱地址；页脚三段：署名、本站源码链接（`profile.source`）、GitHub。三幕树里对应物是 `Act3Badge` 的联系页（页脚同构） |
| `SmoothScroll.tsx` | Lenis 惯性滚动 + 全局滚动吸附 | 客户端组件。动态 import `lenis`，rAF 循环驱动，实例挂 `window.__lenis`；导出 `smoothTo()`（先查场景锚点表，再退回元素锚点）、`registerSceneAnchors()` 与 `registerSnapAnchors()`（三幕注册锚点）。吸附：停滚 300ms 后对齐最近「完整画面」锚点（9 个，阈值 0.92×视口高，0.65s 四次缓动，吸附后 1.2s 冷却防连拽；Lenis 尺寸经 body ResizeObserver 自愈——它自身对 documentElement 的观察在内容长高时不触发）。reduced-motion 下不启用；触屏默认不受影响 |
| `SplitChars.tsx` | 逐字错峰入场 | 客户端组件。字符拆进 overflow-hidden 遮罩，`whileInView` + `staggerChildren`（默认 35ms）逐个从下方升起，`cubic-bezier(0.23,1,0.32,1)`；切换项目时由调用方改 `key` 重挂载重演；**DOM 结构恒定，reduced 只分支 Motion props**（约定 7 的 hydration 坑）。被 Act1 标题、Act2 信息面板、Act3 邮箱使用 |
| `Cursor.tsx` | 自定义鼠标 | 客户端组件。4px 车灯光点（`--cursor-core` 主题色 + 一层 accent 光晕）即时跟随；水滴透镜（80px、无可见描边）挂 `backdrop-filter: url(#luzzz-liquid)` 把底下真实页面元素扭成水波，feDisplacementMap 的 scale 由光标速度驱动（上限 64，`useAnimationFrame` 快攻慢放），透镜本体弹簧拖尾；悬停 `a/button/[data-cursor]` 光点放大 1.4×、透镜收至 0.8，带 `data-cursor-label` 的目标换成琥珀气泡标签（环形项目卡是「查看」）；启用时给 `<html>` 挂 `data-cursor='on'` 隐藏原生光标。仅精确指针 + 非 reduced 启用（`useSyncExternalStore` 订阅两个媒体查询）；Firefox/Safari 不支持 SVG backdrop-filter，退化为纯小点 |
| `TrailsBackdrop.tsx` | 背景幕（仅三幕树） | 客户端组件。`LightTrails` 2D 画布直出 + 两层半透压暗遮罩（顶部/底部 72%、中央 24%——保文字可读又不糊死色彩）。**没有 WebGL**：早年的 ogl 流体合成层因刷新撕裂与滚动负担已移除，「元素晕开」在 `Cursor.tsx` 的透镜上 |
| `CountUp.tsx` | 数字滚动（自 About 抽出） | 客户端组件。`useInView` + `animate` 弹簧计数，无 JS 保持 SSR 终值；被经典树 `About` 与三幕树 `Act1Intro` 共用 |
| `Reveal.tsx` | 进场包壳 | 客户端组件。`motion.div` 的 `whileInView` 弹簧上浮，只演一次；参数 `y`（默认 22px）与 `delay`；被 About/Projects/Contact 使用，Hero 与 Nav 不用它 |

## src/components/scenes —— 三幕

每幕 = 高 wrapper（滚动距离）+ `sticky top-0 h-dvh` 舞台；锚点经 `registerSceneAnchors()` 注册，
不占元素 id（经典树已占用）。三幕只在 `motion-safe` 显示，组件内部不再判断 reduced。

| 文件 | 渲染哪一幕 | 值得知道的实现点 |
|---|---|---|
| `Act1Intro.tsx` | 开场（260vh） | 两拍本地切换：拍一 kicker + 两行大标题（`SplitChars` 逐字）+ 简介 + CTA；拍二 `panel` 玻璃卡（`aboutLine` + `stats` CountUp）+ 底部跑马灯。节拍窗口 `useTransform(sp, [0.42, 0.56] …)` 等常量在文件顶部区域，透明度低于 0.08 时 `pointerEvents` 同步关掉防「看不见却可点」 |
| `Act2Ring.tsx` | 项目环形（480vh） | 3D 环岛：舞台 `perspective 1500px` + `preserve-3d` 环，5 卡 `rotateY(i·72°) translateZ(R)`，R 由实测卡宽推出（`(w+gap)/(2·sin(π/5))`，ResizeObserver 跟随）；每卡 transform 自带 `perspective(1500px)` 前缀（stage 级透视传不到卡片、内嵌面板 0 尺寸挂载后会失效——平面化 bug 的根因）；旋转窗口 `CORE=[0.06,0.94]`，滚轮驱动从右往左；每卡亮度/透明度按正面角余弦衰减（入场淡出乘在卡自身 opacity 上，容器 opacity<1 会拍平 3D），背面不渲染；吸附由全局控制器承担（SmoothScroll，本组件只注册锚点）；底部信息面板 `key={active}` 重挂载让 `SplitChars` 重演，右侧点阵可跳转 |
| `Act3Badge.tsx` | 工牌 → 联系（340vh） | 玻璃工牌先从下方带透视递入（0–0.14），0.2–0.66 按实测 `cover` 缩放（`max(vw/w, vh/h)×1.1`）放大充满屏幕，高光同步扫过；0.6–0.78 牌面内容淡出、联系层淡入——工牌表面即联系页底色。牌面：挂绳孔、LZ 徽标、姓名/职位、邮箱/GitHub、条码装饰。联系页：邮箱 `SplitChars` 大字、发邮件/GitHub、回到开始、页脚（与经典树 `Contact` 页脚同构） |

## src/data —— 唯一手工数据源

| 文件 | 干什么 | 备注 |
|---|---|---|
| `site.ts` | 导出 `profile`、`stats`(4 条)、`marquee`(8 条)、`projects`(5 条)，以及类型 `Project` | 条数复核：`grep -c "url: 'https" src/data/site.ts` 得 5。`stars` 与 `updated` 是手工值，与 GitHub 不同步 |

### 各字段被谁消费

| 字段 | 消费方 |
|---|---|
| `profile.handle` | `Hero.tsx` 与 `Contact.tsx` 页脚的 `@Luz7818` |
| `profile.displayName` | `layout.tsx` 标题 |
| `profile.fullName` | `Hero.tsx` 与 `Act1Intro.tsx` 引导语里的称呼、`layout.tsx` 标题、`Contact.tsx` 与 `Act3Badge.tsx` 页脚署名、工牌姓名 |
| `profile.latinName` | `layout.tsx` 的 `metadata.authors`、`Contact.tsx` 页脚署名 |
| `profile.kicker` | `Hero.tsx` 与 `Act1Intro.tsx` 的 mono 引导行、`Act3Badge.tsx` 工牌职位签（交通工程 × 大模型） |
| `profile.lead` | `Hero.tsx` 引导语，同时是 `layout.tsx` 的 `description` 与 `openGraph.description` |
| `profile.email` | `Contact.tsx` 与 `Act3Badge.tsx` 的邮件 CTA 与工牌行、联系页大字 |
| `profile.github` | `layout.tsx` 的 `authors.url`、`Nav.tsx`、`Hero.tsx` 次按钮、`Contact.tsx` 页脚 |
| `profile.source` | `Contact.tsx` 页脚的「本站源码」链接 |
| `profile.aboutLine` | `About.tsx` 与 `Act1Intro.tsx` 拍二玻璃卡的正文段 |
| `stats[].value` / `.label` | `About.tsx` 与 `Act1Intro.tsx` 的数据带（value 须可 parseInt，`CountUp` 依赖数字） |
| `marquee` | `Marquee.tsx` 的关键词带（经典树；三幕树在 `Act1Intro` 拍二复用同一组件） |
| `projects[].slug` | `page.tsx` 的预览图文件名；`Projects.tsx` 与 `Act2Ring.tsx` 的 React `key` |
| `projects[].name` | `Projects.tsx` 卡片标题与 `<img alt>` |
| `projects[].summary` | `Projects.tsx` 卡片正文 |
| `projects[].detail` | 仅 featured 卡展示的长文案，缺省则不渲染该段 |
| `projects[].tags` | `Projects.tsx` 卡片的 mono 标签行（` / ` 连接） |
| `projects[].url` | `Projects.tsx` 的「源码」链接与无 demo 卡的主链接 |
| `projects[].demo` | 有则渲染「在线体验」链接与 `LiveBadge`；图片主链接优先走 demo |
| `projects[].stars` / `.language` / `.updated` | `Projects.tsx` 卡片底行 `语言, ★ n, 年-月`，纯手工值 |

## 和谁打交道

- **上游**：`site.ts` 与组件里的字面量，全部人工维护，没有任何自动抓取。
- **下游**：`pnpm build` 把 `src/` 与 `public/` 编成 `out/`；`src/` 之外没有其他消费方。
- **改这里之后要跑**：`npx tsc --noEmit && npm run lint && pnpm build`。

## 别动

- 不要把 `src/` 改成不带 `src/` 的根级 `app/`：`tsconfig.json` 的 `paths` 配了 `@/* -> ./src/*`，
  所有组件都按 `@/data/site`、`@/components/...` 引用，挪目录要连 `tsconfig` 一起改。
- 不要为了「让文案集中在 `site.ts`」去删组件里的字面量再来一遍：`Hero.tsx` 的标题两行、
  `Projects.tsx` 的网格跨度与字型水印、`Nav.tsx` 的 `LINKS` 目前就是设计上的站内结构，
  不是遗漏。要集中就一次改到位并跑满三条门禁，别留下半集中状态。
- 不要把强调色加回第二种：`--color-live` 是语义状态色，只允许出现在 `LiveBadge` 一处；
  页面其余的强调一律用琥珀。圆角规则是「面板 14px、交互件胶囊」，别引入第三种。
- 不要拆主题切换链路（AGENTS.md 约定 10），也不要在 `motion` 之外引入第二个动画引擎（如 GSAP）：
  两套引擎争同一帧，先到的把后到的卡掉。改 `globals.css` 的 `.panel` 时注意
  `backdrop-filter` 标准属性必须写在 `-webkit-` 之后（压缩器规则，见 AGENTS.md 已知坑）。
