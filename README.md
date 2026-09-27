# luzzz.me · 个人作品集单页

> 用途：给第一次打开这个仓库的人。看完知道它是什么、怎么在本地跑起来、想改内容该动哪个文件。

一屏到底的单页作品集：WebGL 虹彩色带背景，加 Hero / About / Services / Projects / Contact 五个板块。
Next.js 16（App Router）+ React 19 + Tailwind v4，`output: "export"` 全静态导出，产物不需要 Node 运行时。
站点数据手工维护在 `src/data/site.ts`，页面不请求任何接口，也没有运行时服务。

**规模**：14 个源文件 · 12 个 TS/TSX · 9 个组件 · 5 张项目卡 · 4 条 Services
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
页面应能看到色带背景随鼠标轻微流动，浏览器控制台无红色报错。

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

产物落在 `out/`，共 39 个文件（复核：`find out -type f | wc -l`）——其中 `out/README.md` 是
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

完整步骤、故障表与术语解释见 [上手手册](docs/getting-started.md)。

## 改内容去哪

| 想改 | 动哪里 | 细节 |
|---|---|---|
| 名字、邮箱、GitHub 链接、hero 引导语 | `src/data/site.ts` 的 `profile` | [src/README.md](src/README.md) |
| Services 手风琴的每条 | 同文件 `services` | 同上 |
| 项目卡（标题 / 摘要 / 标签 / star / 语言 / 更新日期 / 链接） | 同文件 `projects` | 同上 |
| 背景色带的 6 个色值与流动参数 | 同文件 `palette` | 同上 |
| 文字配色、字体、玻璃拟态样式 | `src/app/globals.css` 的 `@theme` | 同上 |
| 某个板块的结构或交互 | `src/components/` 下对应组件 | 同上 |
| 项目预览图 | 新建 `public/projects/<slug>.png` | [public/README.md](public/README.md) |

一个提醒：**不是所有文案都在 `site.ts` 里**。`About` 的四个数字、`Hero` 的 `EST 2022`、各板块
标题下的说明句都写死在组件里，完整清单见 [AGENTS.md](AGENTS.md) 的「已知坑」。

## 目录怎么分

| 目录 | 负责 |
|---|---|
| `src/app/` | App Router 入口：`layout.tsx` 出 metadata，`page.tsx` 装配板块并扫预览图，`globals.css` 放主题色 |
| `src/components/` | 9 个客户端组件，一个文件一个板块或一段动效 |
| `src/data/` | `site.ts`，全站唯一的手工数据源 |
| `public/` | 原样拷进产物的静态资源：`fonts/` 字体、`projects/` 截图目录（需自行创建）、`marx-cloud/` 与 `corpus/` 两个子页面 |
| `tools/` | 本地辅助脚本，不参与 Vercel 构建：`sync-showcases.mjs` 同步两个子页面产物 |
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
2. 5 张项目卡现在全是程序生成的星点占位图，没有一张真截图
   （复核：`pnpm build` 后 `grep -o "<circle" out/index.html | wc -l` 得 450 = 5 卡 × 90 点）。
3. 移动端只做了断点适配，没有在真机上验证过 Contact 拖拽吊牌的手感和 WebGL 帧率。
4. 域名还没生效。项目 `luzzz-me` 已绑定 `luzzz.me` 与 `www.luzzz.me`，但 DNS 仍在万网
   （`dns14.hichina.com`）且缺 Vercel 要求的 `A luzzz.me 76.76.21.21`（这是 Vercel 给所有
   用户共用的接入地址，不是自己的服务器）。补这条记录之前，站点只有
   `https://<部署名>-luz7818.vercel.app` 可访问，而这类地址带 Vercel 登录墙
   （项目开了 Deployment Protection，自定义域名不受这条限制）
   （复核：`npx vercel domains inspect luzzz.me`，它会打印 `This Domain is not configured properly`）。
   线上已用浏览器实测通过：主页卡片 → `/marx-cloud/`（星图 canvas 起来、四个掩膜 200）→
   「返回主页」回站点根，以及 `/corpus/` 的转换出术语；本机 curl 到 `*.vercel.app` 不通，
   验证走的是登录过 Vercel 的浏览器。
6. `/marx-cloud/` 与 `/corpus/` 是另两个仓库的构建产物副本，提交进本仓库后才能被 Vercel 构建
   （构建机上没有兄弟仓库）。副本会随源仓库更新而滞后，直到有人重跑 `pnpm sync:showcases`。
7. 仓库里没有 `LICENSE`（复核：`ls LICENSE`），也没有 CI（复核：`ls .github`），没有任何测试
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
