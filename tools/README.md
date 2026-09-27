# tools/ —— 本地构建辅助脚本

> 用途：说明本目录的脚本干什么、什么时候要跑、产物落在哪。
> 这里的脚本只在本地开发机跑，不参与 Vercel 构建。

## 文件清单

| 文件 | 干什么 | 什么时候跑 |
|---|---|---|
| `sync-showcases.mjs` | 把两个兄弟仓库的前端构建产物同步进 `public/marx-cloud/` 与 `public/corpus/` | 那两个仓库改过 UI 之后、`pnpm build` 之前 |

## 为什么产物要提交进本仓库

`Marx_Cloud` 与 `Traffic_terminology` 是各自独立的 git 仓库，而 Vercel 只构建 `luzzz.me`
一个项目、构建机上没有这些兄弟目录。所以同步在本地做、结果作为普通文件提交进
`public/`，部署端只负责把 `public/` 原样拷进产物。

代价很清楚：**这两份是别处代码的构建产物，手工提交进来后会和源仓库漂移**。
所以约定：改这两个页面的功能或文案，一律回源仓库改、重新跑同步、把新产物一起提交；
不要直接编辑 `public/marx-cloud/`、`public/corpus/` 里的文件。

## 同步脚本的行为

```bash
node tools/sync-showcases.mjs     # 或 pnpm sync:showcases
```

- 找 `../Marx_Cloud`（跑 `npm run build` 后取 `dist/`）与 `../Traffic_terminology/web`
  （只取 `index.html`、`style.css`、`app.js`、`data.js`）。
- 目标目录先整体删除再拷贝，避免残留旧 hash 文件。
- 源目录不存在时（比如就在 Vercel 上跑）**只打印跳过，不报错、不清空已有产物**。

## 和谁打交道

- **下游**：`public/` → `pnpm build` → `out/marx-cloud/`、`out/corpus/`。
- **改完之后**：`pnpm build`，然后按 `AGENTS.md`「改动后的验证」核对两个子页面仍能启动。
