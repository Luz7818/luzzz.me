# public/ —— 原样进产物的静态资源

> 用途：说明这个目录现在有什么、`projects/` 的命名约定、以及它为什么还不存在。

Next 会把 `public/` 下的文件**按相对路径原样**拷进 `out/`，不参与打包、不做哈希改名、不改内容。
本目录跟踪 12 个文件（复核：`git ls-files public | grep -v README | wc -l`），分三处：
自托管字体 1 个、`marx-cloud/` 7 个、`corpus/` 4 个（两个子页面各含一份自己的 `README.md`，
所以 `ls-files` 比上表少一个）。本 `README.md` 是文档，不是站点资源。页面图标不在这里，
它在 `src/app/favicon.ico`，走的是 App Router 的约定而不是 `public/`。

## 文件清单

| 文件 | 干什么 | 备注 |
|---|---|---|
| `fonts/jetbrains-mono-var.woff2` | 全站唯一的字体文件，JetBrains Mono 可变字重版 | 31432 字节（复核：`wc -c < public/fonts/jetbrains-mono-var.woff2`）。被 `src/app/globals.css` 的 `@font-face` 以 `/fonts/jetbrains-mono-var.woff2` 引用，声明 `font-weight: 100 900` 与 `font-display: swap`，`--font-mono` 的回退链是 `PingFang SC` / `Microsoft YaHei` / `ui-monospace` |
| `marx-cloud/` | 「思想云」星图，作为本站子页面挂在 `/marx-cloud/` | 8 个文件 1,647,095 字节（复核：`find public/marx-cloud -type f -printf '%s\n' \| awk '{s+=$1} END{print s}'`）。**是 `Marx_Cloud/` 的 `dist/` 拷贝**，见下节 |
| `corpus/` | 交通用语转换器，挂在 `/corpus/` | 4 个文件 342,874 字节（复核命令同形，换目录名）。**是 `Traffic_terminology/web/` 的拷贝**，见下节 |
| `projects/` | 项目截图投放处 | **当前不存在**，需手工建，见下文「projects/」一节 |

构建后可以在产物里核对到同一份：`out/fonts/jetbrains-mono-var.woff2`，字节数相同
（复核：`ls -la out/fonts`）。因为字体是本地的，产物在没有外网的机器上也能正常显示，
仓库没有使用 `next/font`（复核：`grep -rn "next/font" src/`）。

同一个机制也会把本文件拷成 `out/README.md`（复核：`diff -q public/README.md out/README.md`）：
`public/` 下不放不管线的东西，文档进部署包是这个目录约定的代价。

## 子目录

| 子目录 | 负责 |
|---|---|
| `corpus/` | `/corpus/` 子页面的全部前端资源，4 个文件 342,874 字节：`index.html`、`style.css`、`app.js`、`data.js`（复核：`find public/corpus -type f \| wc -l`、`find public/corpus -type f -printf '%s\n' \| awk '{s+=$1}END{print s}'`）。**是 `Traffic_terminology/web/` 的构建产物副本，不可手改**，理由见下一节 |
| `fonts/` | 全站唯一的自托管字体，1 个文件 31,432 字节（复核命令同形，换目录名）。三个子目录里唯一手工投放的那一个，被 `src/app/globals.css` 的 `@font-face` 以 `/fonts/jetbrains-mono-var.woff2` 引用 |
| `marx-cloud/` | `/marx-cloud/` 子页面的全部前端资源，8 个文件 1,647,095 字节：`index.html`、带哈希的 `assets/index-*.js` 与 `assets/index-*.css`、四张 `*-mask.png` 掩膜，另有一份随 `dist/` 一起进来的 `README.md`（复核命令同形）。**是 `Marx_Cloud/dist/` 的构建产物副本，不可手改**，理由见下一节 |

表里没有 `projects/`，因为它当前不存在（复核：`ls public/projects`，报 `No such file or directory`），
见下文「projects/」一节。

## marx-cloud/ 与 corpus/ —— 另两个仓库的构建产物副本

这两个目录不是本站手写的资源，而是**外仓产物拷贝，提交进本仓库**：

- `marx-cloud/` ← `Marx_Cloud/` 的 `dist/`（Vite 构建产物，含哈希命名的 JS/CSS 与四张掩膜 PNG）
- `corpus/` ← `Traffic_terminology/` 的 `web/`（零依赖静态页，无构建步骤）

之所以要拷进来而不是构建时生成：Vercel 只构建 `luzzz-me` 这一个项目，构建机上没有
`../Marx_Cloud` 与 `../Traffic_terminology`。代价是副本会滞后于源仓库。

两个副本目录占本目录真实资源的 98.44%（1,986,044 / 2,017,476 字节，其余就是那个字体，
复核：下面两条各跑一次再相除；两边都排除 `README.md`，否则总数会随本文件改动而变）：

```bash
find public/marx-cloud public/corpus -type f ! -name 'README.md' -printf '%s\n' | awk '{s+=$1}END{print s}'
find public -type f ! -name 'README.md' -printf '%s\n' | awk '{s+=$1}END{print s}'
```

**权威在源仓库。** 要改子页面：回源仓库改 → 回本仓库跑
`pnpm sync:showcases && pnpm build` → 推 `main`。直接编辑这里的任何文件都会在下次同步时被
整体覆盖，并造成「线上与两个源仓库都不一致」的三方漂移（见 `AGENTS.md` 关键约定 8）。

副本有没有滞后，有一条可执行判据——同步脚本是幂等的，跑完没产生改动就是最新的：

```bash
node tools/sync-showcases.mjs && git status --porcelain public/marx-cloud public/corpus
```

输出为空即无滞后；列出的文件就是源仓库已经变了、本仓库还没跟上的部分。
2026-09-27 实测该命令输出为空。（它会顺带重跑 `Marx_Cloud` 的 `npm run build`，约 1 秒。）

## projects/ —— 项目截图投放处（当前不存在）

`public/projects/` 这个目录在本仓库里**不存在**（复核：`ls public/projects`，会报
`No such file or directory`）。这不是漏提交：`src/app/page.tsx` 的 `findPreviews()` 先用
`fs.existsSync(dir)` 判目录，不存在就直接返回空对象，`Projects.tsx` 于是给每张卡渲染程序生成的
星点 SVG。缺这个目录不会让构建或运行时报错。

要放真截图，自己建：

```bash
mkdir -p public/projects
```

约定：

- 文件名必须是 `<slug>.<ext>`，`slug` 取自 `src/data/site.ts` 的 `projects[].slug`
  （复核：`grep -o "slug: '[^']*'" src/data/site.ts`）。
- 后缀优先级 `png` → `webp` → `jpg` → `jpeg`，同一 slug 只取第一个命中的。
- 目录外的东西不会被扫到：图片链接是 `/projects/<slug>.<ext>`，放错子目录等于没放。
- 扫描发生在预渲染时，放完图必须重跑 `pnpm build`；`pnpm dev` 下则每次请求现算。
- 截图要提交进版本库才会跟着仓库走，git 不跟踪空目录。本仓库当前没有任何截图
  （复核：`git ls-files "public/projects/*"` 无输出。**不要**用 `git ls-files "public/*.png"`
  来判有无截图——`marx-cloud/` 里就有 4 张掩膜 PNG 会命中，那跟截图无关）。
- 建议 16:10：卡片图框写的是 `aspect-[16/10]`，`object-cover` 会裁掉超出部分。

## 和谁打交道

- **上游**：两条路。字体是人工投放（外部取得后一次性放入，没有下载脚本）；
  `marx-cloud/` 与 `corpus/` 由 `pnpm sync:showcases`（`tools/sync-showcases.mjs`）从两个兄弟仓库拷进来。
- **下游**：`pnpm build` 把这里整体拷进 `out/`；`src/app/globals.css` 引字体，
  `src/app/page.tsx` 扫 `projects/`；`/marx-cloud/` 与 `/corpus/` 两个路径由 Next 的静态托管直接命中本目录。
- **改这里之后要跑**：字体或截图改完跑 `pnpm build`，然后 `ls out` 与 `ls out/fonts` 核对文件
  是否出现在预期位置；两个副本别在这里改，回源仓库改完跑 `pnpm sync:showcases && pnpm build`。

## 别动

- 不要手改 `marx-cloud/` 与 `corpus/` 里的任何文件，包括只改一个错别字——理由与后果见上一节，
  一句话：权威在源仓库，这里会被 `pnpm sync:showcases` 整体覆盖。
- 不要删 `fonts/` 或改成 CDN 字体链接：`globals.css` 里的 `url('/fonts/...')` 是根路径写法，
  指向的就是这个目录，删掉字体名会静默回退到 `PingFang SC` 等系统字体，观感变化明显但不报错。
- 不要往这里放 `CNAME`、`robots.txt`、`og.png` 之类期望它自动生效：仓库当前**没有**这些文件
  （复核：`ls public`），`layout.tsx` 的 `openGraph` 也没有 `images` 字段，加了 `og.png` 还要
  同时在 `layout.tsx` 里声明才会被读。
- 不要把图片放进 `src/` 再 `import`：那样走的是打包路径，文件名会带哈希，
  而 `findPreviews()` 拼的是固定的 `/projects/<slug>.<ext>`，两边对不上。
