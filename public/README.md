# public/ —— 原样进产物的静态资源

> 用途：说明这个目录现在有什么、`projects/` 的命名约定、以及它为什么还不存在。

Next 会把 `public/` 下的文件**按相对路径原样**拷进 `out/`，不参与打包、不做哈希改名、不改内容。
资源只有一个文件（复核：`git ls-files public | grep -v README | wc -l`），是自托管的等宽字体；
本 `README.md` 是文档，不是站点资源。页面图标不在这里，它在 `src/app/favicon.ico`，
走的是 App Router 的约定而不是 `public/`。

## 文件清单

| 文件 | 干什么 | 备注 |
|---|---|---|
| `fonts/jetbrains-mono-var.woff2` | 全站唯一的字体文件，JetBrains Mono 可变字重版 | 31432 字节（复核：`wc -c < public/fonts/jetbrains-mono-var.woff2`）。被 `src/app/globals.css` 的 `@font-face` 以 `/fonts/jetbrains-mono-var.woff2` 引用，声明 `font-weight: 100 900` 与 `font-display: swap`，`--font-mono` 的回退链是 `PingFang SC` / `Microsoft YaHei` / `ui-monospace` |

构建后可以在产物里核对到同一份：`out/fonts/jetbrains-mono-var.woff2`，字节数相同
（复核：`ls -la out/fonts`）。因为字体是本地的，产物在没有外网的机器上也能正常显示，
仓库没有使用 `next/font`（复核：`grep -rn "next/font" src/`）。

同一个机制也会把本文件拷成 `out/README.md`（复核：`diff -q public/README.md out/README.md`）：
`public/` 下不放不管线的东西，文档进部署包是这个目录约定的代价。

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
  （复核：`git ls-files "public/*.png" "public/*.jpg" "public/*.webp"` 无输出）。
- 建议 16:10：卡片图框写的是 `aspect-[16/10]`，`object-cover` 会裁掉超出部分。

## 和谁打交道

- **上游**：人工投放。字体文件由外部取得后一次性放入，没有下载脚本。
- **下游**：`pnpm build` 把这里整体拷进 `out/`；`src/app/globals.css` 引字体，
  `src/app/page.tsx` 扫 `projects/`。
- **改这里之后要跑**：`pnpm build`，然后 `ls out` 与 `ls out/fonts` 核对文件是否出现在预期位置。

## 别动

- 不要删 `fonts/` 或改成 CDN 字体链接：`globals.css` 里的 `url('/fonts/...')` 是根路径写法，
  指向的就是这个目录，删掉字体名会静默回退到 `PingFang SC` 等系统字体，观感变化明显但不报错。
- 不要往这里放 `CNAME`、`robots.txt`、`og.png` 之类期望它自动生效：仓库当前**没有**这些文件
  （复核：`ls public`），`layout.tsx` 的 `openGraph` 也没有 `images` 字段，加了 `og.png` 还要
  同时在 `layout.tsx` 里声明才会被读。
- 不要把图片放进 `src/` 再 `import`：那样走的是打包路径，文件名会带哈希，
  而 `findPreviews()` 拼的是固定的 `/projects/<slug>.<ext>`，两边对不上。
