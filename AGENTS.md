<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md —— 项目协作与代码开发规范（唯一权威入口）

> 用途：给 AI 编码助手与所有开发者。这里是规范入口与索引：目标、原则、流程、模块规则、
> 维护矩阵、阅读清单都在这份文件里。细则一律链接到对应文件，冲突时以细则文件为准并回改本文件。
> README.md 与 docs/GET-START.md 里被引用的事实以本文件的「当前状态」为准，它们只链接不复述。

## 项目目标

- 定位：Next.js 16 单页作品集，`output: "export"` 全静态导出。没有服务端、没有接口、没有数据库，
  页面内容全部来自 `src/data/site.ts` 与组件里的硬编码文案，构建结果是 `out/` 下的一堆静态文件。
- 核心功能：三幕滚动驱动场景（开场 → 项目环形 → 工牌联系）+ 双主题丝滑切换 + 水滴透镜光标；
  `prefers-reduced-motion` 用户由 CSS 切到经典竖排布局；收录两个外仓子页面（`/marx-cloud/`、`/corpus/`）。
- 技术栈：Next.js 16.3.6 + React 19 + Tailwind v4 + Motion + Lenis，pnpm 10.33.0（复核：`node -v && pnpm -v`）。
- 详情：[README.md](README.md)、[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

## 开发原则

1. 正确性优先。
2. 可维护性优先。
3. 代码简洁、项目简洁。
4. 小步迭代。
5. 单模块开发。
6. 每个改动必须有明确设计与验收标准。
7. 禁止一次生成整个项目。
8. 禁止跳步开发。

执行口径：先想后写（假设与歧义先挑明）；最简优先（不加没要求的功能与抽象——不为"补齐门禁"
引入 zod/Prettier/测试框架）；外科手术式改动（不动无关代码，每行改动可追溯到需求）；目标驱动
（先有可验证判据再动手，宣称完成前先跑通 [docs/TESTING.md](docs/TESTING.md) 的三条门禁）。

## 开发流程

**分析 → 设计 → 实现 → 测试 → 文档更新 → Git提交 → 等待确认**。不得跳过任何阶段。

| 阶段 | 产出物 | 放行标准 |
|---|---|---|
| 分析 | 影响面清单（组件/数据/主题链路/子页面哪一侧） | 影响面说全 |
| 设计 | 方案说明（hydration 风险、导出模式约束、回退方式） | 验收标准已定义；与更简方案比较过 |
| 实现 | 代码 | 只含设计内改动；遵守 `docs/ARCHITECTURE.md` 的 12 条关键约定 |
| 测试 | 门禁结果 | [docs/TESTING.md](docs/TESTING.md) 三条命令退出码全 0 |
| 文档更新 | 受影响文档 diff | 维护矩阵逐项过完 |
| Git提交 | 提交 | 符合 [docs/GIT.md](docs/GIT.md)，一批一提交 |
| 等待确认 | —— | 等人确认后推送（推 `main` 即 Vercel 构建） |

## 模块开发规则

- 一个智能体一次只开发一个模块；模块完成后才能进入下一模块。
- 如需同时开发，使用多个子智能体，每个子智能体同样一次只开发一个模块。

模块完成标准（全部满足才算完成）：

1. 功能完成：达到 [TODO.md](TODO.md) 中该任务的验收标准。
2. 测试通过：符合 [docs/TESTING.md](docs/TESTING.md)。
3. 最简原则：代码和项目架构都保持最简洁，无冗余抽象与重复实现。
4. [TODO.md](TODO.md) 更新：勾选完成项、明确下一项。
5. [HISTORY.md](HISTORY.md) 追加变更记录。
6. 受影响的 docs 更新（按需）。
7. [README.md](README.md) 更新（如有面向访客的变化）。
8. Commit message 符合 [docs/GIT.md](docs/GIT.md)。

## 文档维护规则

| 事件 | 需更新 |
|---|---|
| 模块完成 | `TODO.md`、`HISTORY.md`、受影响 docs |
| 架构决策（导出模式、主题链路、吸附体系、子页面约定变化） | `docs/ARCHITECTURE.md` + `HISTORY.md` 记录缘由 |
| 命令/入口/交互变化 | `README.md` / `docs/GET-START.md` / 对应子目录 README |
| 增删一级或二级目录 | 仓根 `目录说明.md` + 本文件 |
| 规模数字（组件数/产物数/依赖数）变化 | 本文件「当前状态」 |
| 新对话/新任务开始 | 按下方阅读清单阅读 |

## 开发前阅读清单

每个新对话/新任务，按顺序阅读：

1. 本文件（`AGENTS.md`；顶部 `nextjs-agent-rules` 块由 `next dev` 管理，缺失会被写回）
2. [TODO.md](TODO.md)
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)（12 条关键约定与仓库地图在这里）
4. [docs/GET-START.md](docs/GET-START.md)
5. [HISTORY.md](HISTORY.md)
6. 与任务相关的 [docs/CODE-STYLE.md](docs/CODE-STYLE.md)、[docs/TESTING.md](docs/TESTING.md)、[docs/GIT.md](docs/GIT.md)

阅读完成后**不要写代码**：先做架构评审，输出——项目理解 / 核心模块 / 模块依赖关系 / 潜在风险 /
建议优化项 / 推荐开发顺序 / 是否发现架构问题——然后等待确认。

## Git 索引

- Git 规范：[docs/GIT.md](docs/GIT.md)（Vercel 部署链路、`.env.local` 边界、一批一提交）

## 当前状态

| 项 | 值 | 复核命令 |
|---|---|---|
| 类型检查 | 退出码 0，无任何输出 | `npx tsc --noEmit` |
| ESLint | 退出码 0，无输出；`npm run lint` 实际检查 16 个文件（`src/` 下 12 个 + 3 个根配置 + `tools/sync-showcases.mjs`），0 error 0 warning | 计数用 `npx eslint --format json .`，数输出的 `filePath` 条数 |
| 构建 | 退出码 0，两条路由 `/` 与 `/_not-found`，均标为 Static | `pnpm build` |
| 导出产物 | `out/` 共 212 个文件（`_next` 12 + `marx-cloud` 171 + `_not-found` 5 + `corpus` 4 + `404` 2 + 根下 8 + `projects/` 5 张图（2 真截图 + 3 风格化封面 webp）+ `fonts/` 2 个字体），含被原样拷进去的 `out/README.md`；`marx-cloud` 的文件数随其 `portraits/`+`avatars/` 图像数浮动，别拿总数当判据 | `find out -type f \| wc -l`；`diff -q public/README.md out/README.md` |
| 导出模式 | `next.config.ts` 里有两行：`output: "export"` 与 `trailingSlash: true`（后者为子页面的相对路径所需，见 `docs/ARCHITECTURE.md` 关键约定 9） | `grep -n "output\|trailingSlash" next.config.ts` |
| 站内子页面 | `public/marx-cloud/` 9,709,985 字节、171 个文件（2026-10-02 起包含 `avatars/`+`portraits/` 共 163 张图，此前副本缺这两目录，换装与侧栏头像在线上是 404）；`public/corpus/` 394,800 字节、4 个文件；构建后原样出现在 `out/` 同名目录 | `find public/marx-cloud -type f -printf '%s\n' \| awk '{s+=$1} END{print s}'`（corpus 同形）；`find out/marx-cloud out/corpus -type f \| wc -l` |
| 部署 | 项目 `luzzz-me` 已连 `Luz7818/luzzz.me`，推 `main` 即由 Vercel 构建；最新 production 部署 `● Ready`；`*.vercel.app` 带登录墙（`ssoProtection.deploymentType` = `all_except_custom_domains`），自定义域名不受此限制 | `npx vercel ls`、`npx vercel inspect <部署地址>`；接口复核 `curl -s -H "Authorization: Bearer $VERCEL_TOKEN" https://api.vercel.com/v9/projects/luzzz-me` 看 `gitRepository` / `ssoProtection` |
| 域名 | `www.luzzz.me` **已生效**：HTTPS 200，返回真实站点（不是 Vercel 登录页），`/marx-cloud/` 与 `/corpus/` 两个子页面同样 200 且页内本地引用 0 断链。apex `luzzz.me` **仍未生效**：DoH 查 A 是空答复，直连表现为 `SSL: UNEXPECTED_EOF_WHILE_READING`。两个域名都在项目 Aliases 里但 `domains` 的 `verificationRecord` 为 `null`。**不要把任何具体接入 IP 写进 DNS 说明**：`www` 走任播，实测同一天两次解析结果就不同；apex 要填的值以 `npx vercel domains inspect luzzz.me` 当场打印的为准（本文早先写的 `76.76.21.21` 是 Vercel 旧共用 IP，已作废） | DoH 免登录复核（apex 那行应为 `[]`）：`python -c "import json,urllib.request as u; [print(n,t,[a['data'] for a in json.load(u.urlopen(f'https://dns.google/resolve?name={n}&type={t}',timeout=20)).get('Answer',[])]) for n,t in [('luzzz.me','A'),('www.luzzz.me','A')]]"`；线上确实返回站点而非登录墙：`python -c "import urllib.request as u;b=u.urlopen(u.Request('https://www.luzzz.me/marx-cloud/',headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read();print('思想云' in b.decode('utf-8'))"` 应为 `True`（探测页面标题里的「思想云」，不钉死会随部署变掉的资源哈希；被登录墙挡时页面标题是 `Login – Vercel`） |
| 源文件 | `src/` 下 25 个文件，其中 23 个 TS/TSX | `git ls-files src \| grep -v README \| wc -l`、`git ls-files src \| grep -c '\.tsx\?$'` |
| 组件 | 20 个（`src/components/` 17 + `src/components/scenes/` 3），其中 18 个客户端组件以 `'use client'` 开头；`Aurora`/`Marquee` 是服务端组件 | `git ls-files src/components \| wc -l`（得 20）、`grep -l "^'use client'" src/components/*.tsx src/components/scenes/*.tsx \| wc -l`（得 18） |
| 运行时依赖 | 6 个：`next` `react` `react-dom` `motion` `@phosphor-icons/react` `lenis` | `node -e "console.log(Object.keys(require('./package.json').dependencies))"` |
| Node / pnpm | `v24.19.0` / `10.33.0`（`packageManager` 声明 `pnpm@10.33.0`） | `node -v && pnpm -v` |
| `next start` | 不可用：先打印 `✓ Ready`，紧接着抛错，退出码 1 | `npx next start` |
| 测试 | 仓库内没有任何测试或 CI | `git ls-files \| grep -iE "test\|spec"` 与 `ls .github` |

## 已知坑（省下一次的调查时间）

- **本文件顶部的 `nextjs-agent-rules` 块由 `next dev` 管理**，缺失时会被重新写回。正文一律写在块
  之外，`upsertAgentRulesBlock` 只替换两个标记之间的内容，块外的东西不会被动。
- **写死在组件里的文案**，改站点文字时最容易漏：`Hero.tsx` 的两行大标题与「看项目」按钮；
  `Act1Intro.tsx` 的两行大标题（与 Hero 各存一份，两棵树）；`Act2Ring.tsx` 的「滚动旋转环岛 · 停住自动对齐整卡」
  提示行；`Act3Badge.tsx` 的工牌装饰行（`LUZ · STAFF PASS`、`luzzz.me · № 0001`、挂绳孔）；
  `Projects.tsx` 的字型水印 `ZSX`/`TF`/`TH`、横向卡宽（featured 720px / 其余 480px）与
  卷轴降级断点（≥1024px 且非 reduced 才钉屏平移）；`Nav.tsx` 的 `LINKS`（关于/项目/联系）；
  `Marquee.tsx` 消费 `site.ts` 的 `marquee`，但词条内容改数据即可。这些都不在 `site.ts`。
- **`useReducedMotion()` 会破坏 hydration**：客户端首帧同步读 matchMedia，SSR 恒为 false。
  按它的返回值分支 DOM 结构会让 reduced 用户报「server rendered text didn't match」并整树
  重渲染。正确姿势：结构恒定，只分支 Motion props。`Cursor` 用 `useSyncExternalStore` 不受影响。
- **无头截图的合成帧滞后**：截图前 `window.scrollTo(0, scrollY ± 1)` 触发重合成再等 1–2s；
  Edge 无头 `--virtual-time-budget` 遇常驻 rAF 会假死挂起，别用。
- **IAB 面板后台化会冻结一切 rAF/CSS 动画**：走查前先把可见性设回 true，否则截图全是冻结帧。
- **内嵌面板隐藏时视口坍缩为 0**：按元素尺寸工作的画布/量测必须挂 ResizeObserver（LightTrails
  画布、Act3Badge 工牌、SmoothScroll 代理 body 高度），别只依赖 window resize（10-04 实际踩过）。
- **持续动画会让浏览器截图超时或拿到过期帧**：先拿 DOM 计算样式核对，别把截图异常当真 bug。
- **压缩器会吃掉 `.panel` 的标准 `backdrop-filter`**：标准属性必须写在 `-webkit-` 之后，
  否则 Chromium computed 值变 `none`，玻璃模糊静默失效。
- **`public/` 下任何文件都原样进产物，包括文档本身**（`public/README.md` → `out/README.md`）。
- **`next-env.d.ts`、`.next/types/`、`out/` 被 gitignore 但被 `tsconfig.json` include**：
  新克隆先跑一次 `pnpm build` 再 `tsc --noEmit`。
- **Windows 上 `out/` 被静态服务器占用时 `pnpm build` 报 EBUSY**：结束服务再重跑；
  Git Bash 里 `taskkill` 要写 `taskkill //PID <pid> //F`。
- **同机第二个 dev server 拒绝启动**（`⨯ Another next dev server is already running.`），
  端口被别的程序占用时不报错、自动换端口。
- 不要为「自动同步 star」在 `page.tsx` 里 fetch GitHub API（导出模式会烘进产物）；不要去掉
  `output: "export"`；不要手改 `out/`、`.next/`；不要删 `public/fonts/` 换 CDN 字体；
  不要引入 zod/Prettier/测试框架「补齐门禁」；不要另写一套数字（以「当前状态」为准）；
  不要动 `CLAUDE.md` 的那一行 `@AGENTS.md`。
