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

## 别动

- **不要在 `public/marx-cloud/` 与 `public/corpus/` 里手改任何东西**，哪怕只改一个错别字：脚本
  第 48 行 `rmSync(dest, { recursive: true, force: true })` 是整个目标目录删掉再拷，下次
  `pnpm sync:showcases` 就抹平了（复核：`grep -n rmSync tools/sync-showcases.mjs`）。
- **判断副本有没有滞后，用只读 diff**：在仓库根跑
  `diff -r public/marx-cloud ../Marx_Cloud/dist`，无输出即与源仓库产物逐字节相同（2026-09-27 实测无输出）。
- **`public/corpus/` 里没有 `README.md` 不是漏拷**：脚本第 51 行的白名单
  `['index.html', 'style.css', 'app.js', 'data.js']` 挡掉了源目录里那份
  `Traffic_terminology/web/README.md`（复核：`diff -r public/corpus ../Traffic_terminology/web`
  只报这一行差异）。别把白名单「补齐」成整目录拷贝；源仓库真加第五个文件时显式改这一行。
- **`public/marx-cloud/README.md`（3925 字节）不是本仓库写的文档**：它是 `Marx_Cloud` 自己的
  `public/README.md` 被 Vite 整目录拷进 `dist/` 再跟着同步过来的，在这里删掉下次会回来。
- **不要把 `sync:showcases` 挂进 `build`、CI 或 Vercel 构建命令**：脚本第 41 行
  `execSync(t.build, { cwd: t.src })` 是在 `../Marx_Cloud` 里跑它的 `npm run build`，要求兄弟
  仓库在本地且装好依赖，中间产物落在那个仓库的 `dist/`（复核：
  `cd ../Marx_Cloud && git check-ignore -v dist/index.html` 有输出即那边不跟踪它）。
- **源目录缺失时它是静默跳过而不是失败**（第 35–38 行 `existsSync` 分支只打印后 `continue`），
  所以构建流程不能依赖它，没有兄弟仓库的机器上它也不会刷新产物。
- **不要给这个脚本加 npm 依赖**：它只 import 四个 `node:` 内置模块（复核：
  `grep -c "^import .*from 'node:" tools/sync-showcases.mjs`），本仓库运行时依赖仍是 `next`、
  `react`、`react-dom` 三个（复核：`node -e "console.log(Object.keys(require('./package.json').dependencies))"`）。
- **本目录新增文件会进 lint 面**：`npm run lint` 当前检查 16 个文件，含
  `tools/sync-showcases.mjs`（复核：`npx eslint --format json .` 数 `filePath` 条数，本机实测 16）。
  别在 `tools/` 下生成产物目录，那要连带改 `eslint.config.mjs` 的 `globalIgnores`。
