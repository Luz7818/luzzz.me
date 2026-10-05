# luzzz.me 代码风格

> 用途：给改本仓代码的人与 AI。约定来自既有实践；不引入 Prettier/zod/测试框架（有意），
> 门禁是 tsc + ESLint + 一次构建。

## 代码风格

- Next.js 16 App Router + React 19 + Tailwind v4 + Motion，动画引擎只用 `motion`
  （不引 GSAP 混用）；lint 与格式由 ESLint 面（`eslint.config.mjs`）覆盖。
- 组件一个文件一个板块或一段动效；客户端组件以 `'use client'` 开头（当前 18/20），
  `Aurora`/`Marquee` 保持服务端组件。

## 命名与结构约定

- 全站手工数据单源 `src/data/site.ts`（`profile`/`stats`/`marquee`/`projects`）；配色单源
  `src/app/globals.css` 的两套 `--color-*` token——不在组件里另写色值。
- 三幕组件的节拍窗口是各文件顶部常量；环形旋转窗口常量 `CORE = [0.06, 0.94]`，锚点与
  `goTo()` 从同一常量推导。

## 错误处理与已知陷阱

- `useReducedMotion()` 只许分支 Motion props，不许分支 DOM 结构（hydration 整树重渲染）。
- `next/image` 默认 loader 在导出模式下不可用——两处原生 `<img>` 是配套选择，禁用注释别删。
- 按 viewport 尺寸工作的画布/量测必须挂 ResizeObserver（隐藏面板恢复后没有 resize 事件）。
- `backdrop-filter` 标准属性写在 `-webkit-` 之后（压缩器顺序问题，反了玻璃模糊静默失效）。
- 主题链路（预水合脚本 → ThemeToggle → LightTrails 监听）不能拆，见 `docs/ARCHITECTURE.md`
  关键约定 10。
