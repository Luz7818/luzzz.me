# luzzz.me 测试规范

> 用途：给改完代码要验证的人。本仓没有测试框架与 CI（有意），门禁是类型检查 + ESLint +
> 一次成功构建，外加关键交互的浏览器走查。

## 测试分层

| 层 | 管什么 | 怎么做 |
|---|---|---|
| 类型检查 | TS 全量 | `npx tsc --noEmit`，退出码 0 无输出 |
| ESLint | 27 个文件（src 23 + 根配置 3 + sync-showcases） | `npm run lint`，0 error 0 warning |
| 构建 | 静态导出成功、路由与产物 | `pnpm build`，两条路由均 Static |
| 浏览器走查 | 三幕交互、主题切换、子页面 | `pnpm dev` / `pnpm build` 后按 `docs/TESTING.md` 各项目测 |

## 运行命令

```bash
npx tsc --noEmit && npm run lint && pnpm build
```

新克隆先跑一次 `pnpm build`（补齐 gitignore 掉的 `next-env.d.ts` 等），否则 `tsc` 报错。

## 用例编写规范

本仓不引入测试框架（有意）。行为锁定靠三类既有机制：`tsc` 类型、ESLint 规则、构建期断言
（如 `findPreviews()` 的换图判据 `grep -o "<img" out/index.html | wc -l`）。新增可自动核对项时，
优先做成构建期或 lint 可发现的形式，而不是引入测试依赖。

## 改动后的验证

| 你动了 | 必须跑 | 通过标准 |
|---|---|---|
| `src/` 下任何 TS/TSX | `npx tsc --noEmit && npm run lint && pnpm build` | 三条退出码全 0 |
| `src/data/site.ts` 的 `projects` | `pnpm build` 后 `grep -o "<img" out/index.html \| wc -l` | = 有图卡片数 × 2（双树，当前 5 张全有图 → 10）；无图卡渲染字型水印兜底 |
| `src/app/globals.css` 的 `@theme` | `pnpm dev` 刷新 | 文字与强调色变化；`--color-accent` 同时驱动光轨颜色 |
| 主题切换链路 | 点 `ThemeToggle`，查 `<html data-theme>` 与 localStorage；再刷一次确认无白闪 | 两主题正常，光轨跟随重绘；reduced 下切换瞬时 |
| `LightTrails.tsx` 车道常量 | `pnpm dev` 缩窗过 640px | 车道下移不穿正文 |
| `public/` 下任何文件 | `pnpm build` 后 `ls out` | 对应文件原样出现在 `out/` |
| 子页面（源在 Marx_Cloud / Traffic_terminology） | `pnpm sync:showcases && pnpm build` 后 `grep -c 'class="back"' out/marx-cloud/index.html out/corpus/index.html` | 两条各输出 1，浏览器点回链回本站首页 |
| `next.config.ts`（尤其 trailingSlash） | `npx vercel pull --yes && npx vercel build`，读 `.vercel/output/config.json` | `/$1/` 的 308 在、`/$1` 的不在；线上子页面 Network 无 404 |
| 文档 | `python check_docs.py luzzz.me`（在 `Project/文档标准/` 执行） | 无阻断项 |

三块命令即全部门禁；关键交互（三幕/主题/子页面）的判据细节见 `docs/ARCHITECTURE.md`
关键约定 9-11。
