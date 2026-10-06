# luzzz.me · 个人作品集单页

> 用途：给第一次打开这个仓库的人。看完知道它是什么、怎么在本地跑起来、想改内容该动哪个文件。

一屏到底的单页作品集：双主题（暗色「夜间路网」为默认，亮色「雾蓝玻璃」一键丝滑切换，`@property` token 全页涟漪渐变）。
桌面与移动端走**三幕滚动驱动场景**——开场页（大标题逐字入场 + 关于玻璃卡）→ 项目环形（五张作品卡架在 3D 环岛上，
滚轮驱动从右往左旋转，停住自动吸附整卡）→ 玻璃工牌随滚动放大充满屏幕变成联系页。背景是长曝光光轨 + 双主题色场，自定义鼠标带水滴透镜——
鼠标划过时底下的真实页面元素（文字/卡片）像水一样晕开；厚玻璃面板、Lenis 惯性滚动。
`prefers-reduced-motion` 用户由 CSS 切到经典竖排（Hero / About / Projects / Contact），动效降级照旧。
Next.js 16（App Router）+ React 19 + Tailwind v4 + Motion + Lenis，`output: "export"` 全静态导出，
产物不需要 Node 运行时。站点数据手工维护在 `src/data/site.ts`，页面不请求任何接口，也没有运行时服务。

**规模**：25 个源文件 · 23 个 TS/TSX · 20 个组件（18 客户端，含 `scenes/` 三幕）· 5 张项目卡（2 张真截图 + 3 张风格化封面）
（复核：`git ls-files src | grep -v README | wc -l`，`git ls-files src | grep -c '\.tsx\?$'`，`grep -c "url: 'https" src/data/site.ts`）

## 30 秒跑通

```bash
pnpm install
pnpm dev      # 打开 http://localhost:3000
```

`pnpm install` 在依赖已装齐时的真实输出（复核：`pnpm install --frozen-lockfile`）：

```
Lockfile is up to date, resolution step is skipped
Already up to date

Done in 482ms using pnpm v10.33.0
```

`pnpm dev` 的真实输出（复核：`pnpm dev`）：

```
▲ Next.js 16.3.6 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://<本机局域网IP>:3000
- Environments: .env.local
✓ Ready in 490ms
```

`Ready` 之后的毫秒数随机器变化，`▲` 那一行的版本号应与 `package.json` 一致。
页面应能看到开场页：大标题逐字升起、长曝光车流光轨在鼠标划过时像水一样晕开、自定义鼠标点环跟随；
滚动进入项目环形（停住自动吸附整卡），再滚玻璃工牌放大充满屏幕变成联系页；导航右侧的圆形按钮可在
暗色/亮色主题间丝滑切换。浏览器控制台无红色报错。

构建静态产物（复核：`pnpm build`）：

```bash
pnpm build
```

末段真实输出：

```
Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

产物落在 `out/`，共 212 个文件，其中 `marx-cloud/` 的 171 个是随其图像资源数浮动的（复核：`find out -type f | wc -l`）——其中 `out/README.md` 是
`public/README.md` 被原样拷过去的，`public/` 下任何文件都会进产物。想在本地看它：

```bash
python -m http.server 8099 --directory out
```

`curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8099/` 返回 `200` 即为正常。
字体与样式表也各自可达（CSS 的真实文件名带哈希，要从 `index.html` 里取）：

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8099/fonts/jetbrains-mono-var.woff2
curl -s -o /dev/null -w '%{http_code}\n' "http://127.0.0.1:8099$(grep -o '/_next/static/chunks/[A-Za-z0-9_.-]*\.css' out/index.html | head -1)"
```

两条都返回 `200`。

完整步骤、故障表与术语解释见 [上手手册](docs/GET-START.md)。

## 改内容去哪

| 想改 | 动哪里 | 细节 |
|---|---|---|
| 名字、邮箱、GitHub 链接、hero 引导语 | `src/data/site.ts` 的 `profile` | [src/README.md](src/README.md) |
| About 数据带的四个数字 | 同文件 `stats` | 同上 |
| 跑马灯关键词 | 同文件 `marquee` | 同上 |
| 项目卡（标题 / 摘要 / 标签 / star / 语言 / 更新日期 / 链接） | 同文件 `projects` | 同上 |
| 三幕的节拍 / 环形吸附 / 工牌转场 | `src/components/scenes/` 三个 Act 组件（节拍窗口是各文件顶部常量） | 同上 |
| 背景光轨的车道、车速与配色 | `src/components/LightTrails.tsx` 常量与 `globals.css` 的 `--trail-*` | 同上 |
| 两套主题的配色令牌 | `src/app/globals.css` 的 `@theme`（暗）与 `[data-theme='light']`（亮） | 同上 |
| 某个板块的结构或交互 | `src/components/` 下对应组件 | 同上 |
| 项目配图 | 替换 `public/projects/<slug>.<ext>`（2 真截图 + 3 封面已就位；封面源文件在 `tools/covers/`，改后用无头 Edge 重渲染，换图后重跑 `pnpm build`） | [public/README.md](public/README.md) |

一个提醒：**不是所有文案都在 `site.ts` 里**。`About` 的四个数字、`Hero` 的 `EST 2022`、各板块
标题下的说明句都写死在组件里，完整清单见 [AGENTS.md](AGENTS.md) 的「已知坑」。

## 目录怎么分

不知道东西在哪个路径，先看 [目录说明.md](目录说明.md)：整棵目录树、每个目录的入口都在里面，它只做导航。谁负责什么见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) 与各目录 README。

| 目录 | 负责 |
|---|---|
| `src/app/` | App Router 入口：`layout.tsx` 出 metadata，`page.tsx` 装配双树（三幕 + 经典竖排）并扫预览图，`globals.css` 放主题色 |
| `src/components/` | 17 个组件（15 客户端），一个文件一个板块或一段动效；`scenes/` 下是三幕组件 |
| `src/data/` | `site.ts`，全站唯一的手工数据源 |
| `public/` | 原样拷进产物的静态资源：`fonts/` 字体、`projects/` 配图目录（2 真截图 + 3 风格化封面）、`marx-cloud/` 与 `corpus/` 两个子页面 |
| `tools/` | 本地辅助脚本，不参与 Vercel 构建：`sync-showcases.mjs` 同步两个子页面产物，`covers/*.html` 是 3 张风格化封面的可再生成源文件 |
| `out/` | `pnpm build` 产物，已被 `.gitignore` 忽略 |
| `docs/` | 上手手册 |

两个子页面：`/marx-cloud/` 是 [Marx Cloud](https://github.com/Luz7818/marx-cloud) 星图，
`/corpus/` 是[交通用语转换器](https://github.com/Luz7818/traffic-terminology)。它们的源代码在
别的仓库，本站只收构建产物 —— 改页面要回源仓库改，再跑 `pnpm sync:showcases`。

逐个目录的说明见各目录下的 `README.md`。

## 已知做不到什么

1. 项目数据不会自动跟随 GitHub。`stars` 与 `updated` 是手填的，当前 5 张卡合计 4 star
   （复核：`grep -o "stars: [0-9]*" src/data/site.ts | awk '{s+=$2} END {print s}'`）。
   源仓库真有变化时页面不更新，也不报错，只能手工同步。
2. 5 张项目卡里 2 张是真截图（2026-10-03 从本站托管的两个子页面实拍：`public/projects/marx-cloud.png`
   与 `traffic-terminology.png`），其余 3 张是程序化生成的风格化封面（`tools/covers/*.html` 里的 SVG 场景经无头 Edge 光栅化为 WebP：`zhishuxing` / `testforge` / `transportation-harness`），不是假截图冒充实拍
   （复核：`pnpm build` 后 `grep -o "<img" out/index.html | wc -l` 得 10，= 5 图 × 双树）。
3. 环形吸附与工牌转场在桌面浏览器与移动端模拟器里走查过，但没有在真机上验证过
   触屏滚动手感与动画帧率（背景已是纯 2D 光轨，无 WebGL）。
4. apex 域名还没生效。`https://www.luzzz.me/` 已经公开可访问（含 `/marx-cloud/` 与 `/corpus/` 两个子页面），
   但裸域 `luzzz.me` 还没有 A 记录，访客直接输 `luzzz.me` 打不开。DNS 仍在万网（NS 为 `dns13/dns14.hichina.com`），
   要补的那条 A 记录值以 `npx vercel domains inspect luzzz.me` 当场打印的为准，别抄固定 IP（Vercel 接入地址是任播、会变）。
   补之前可用的公开地址只有 `www`；`https://<部署名>-luz7818.vercel.app` 这类地址带 Vercel 登录墙
   （项目开了 Deployment Protection，只对 `*.vercel.app` 生效，自定义域名不受限）。
   （复核：`python -c "import json,urllib.request as u; print(json.load(u.urlopen('https://dns.google/resolve?name=luzzz.me&type=A',timeout=20)).get('Answer', []))"` 应为 `[]`；换成 `name=www.luzzz.me` 就有答复）
   线上子页面已实测通过：主页卡片 → `/marx-cloud/`（星图 canvas 起来、四个掩膜 200）→「返回主页」回站点根，
   以及 `/corpus/` 的转换出术语。走 `www` 这个公开地址就能用普通 HTTP 客户端验，不必再借登录过 Vercel 的浏览器
   （`*.vercel.app` 那一圈仍然会被登录墙挡住）。
5. `/marx-cloud/` 与 `/corpus/` 是另两个仓库的构建产物副本，提交进本仓库后才能被 Vercel 构建
   （构建机上没有兄弟仓库）。副本会随源仓库更新而滞后，直到有人重跑 `pnpm sync:showcases`。
6. 仓库里没有 `LICENSE`（复核：`ls LICENSE`），也没有 CI（复核：`ls .github`），没有任何测试
   （复核：`git ls-files | grep -iE "test|spec"`）。门禁只有类型检查、ESLint 和一次成功构建。

## 环境要求

| 项 | 要求 | 怎么确认 |
|---|---|---|
| Node.js | ≥ 20.9.0（`next@16.3.6` 的 `engines` 下限） | `node -v`，本机 `v24.19.0` |
| pnpm | 10.33.0（`package.json` 的 `packageManager` 字段） | `pnpm -v` |
| 网络 | 装依赖时需要；`dev` 与 `build` 期间应用代码不发请求 | `grep -rn "fetch(" src/` 无输出 |
| 密钥 | 无。`src/` 下没有任何 `process.env` | `grep -rn "process\\.env" src/` 无输出 |

## 许可与引用

仓库根没有 `LICENSE` 文件，按默认规则保留所有权利。卡片链出去的 5 个项目各有自己的仓库和许可，
不受本仓库约束。若要以某个许可证开源，需要先新增 `LICENSE` 文件再在此处说明。

---

准备改这个仓库的 AI 助手请先读 [AGENTS.md](AGENTS.md)。
