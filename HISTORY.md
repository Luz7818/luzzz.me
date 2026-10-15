# HISTORY —— 版本更新记录

> 用途：记录每次版本与规范变更的内容和缘由。只追加，禁止删除或改写既有条目；写错了就追加一条
> 更正。新条目写在文件末尾。

## 2026-10-05 · 文档规范体系落位

- 文档从"五件套"迁到九件体系：新增 `docs/ARCHITECTURE.md`、`docs/CODE-STYLE.md`、
  `docs/TESTING.md`、`docs/GIT.md`、`HISTORY.md`、`TODO.md`；`docs/getting-started.md`
  更名 `docs/GET-START.md`；`AGENTS.md` 重写为规范入口（顶部 `nextjs-agent-rules` 管理块
  原样保留；原「仓库地图」与 12 条关键约定移入 ARCHITECTURE，原「改动后的验证」移入
  TESTING，「当前真实状态」更名「当前状态」保留全部数字与复核命令）。
- 变更缘由：落位《项目整体规范.md》九件必建。本仓此前无版本记录文件，更早历史未在此建档，
  可由 `git log --oneline` 追溯。

## 2026-10-06 · 文档核查修复（数字与残引对齐实测）

- **FluidGlass 残引清零**：README「改内容去哪」表删流体行、「已知做不到」第 3 条与
  ARCHITECTURE 约定 7/已知架构问题改为无 WebGL 口径（组件与 ogl 依赖此前已移除，文档没跟上）。
- **数字对齐实测**：AGENTS ESLint 16→27 个文件、out/ 212→210（_next 14、404/ 1）、
  corpus 394,800→394,641 字节、运行时依赖 6→5（@phosphor-icons/react 已删）；
  src/README 客户端组件 11→15；TESTING.md/GET-START 同步 lint 面；
  GET-START 产物 39→210 个文件（子页面 12→175）、第 4 节改「2 截图 + 3 封面」口径
  （img 计数基线 10）、术语表 10→15；public/README corpus 字节两处同步，
  projects/ 行补 3 张封面，删除两处编辑残留的断行碎片行。
- **杂项**：tools/README 封面转换示例的 `D:/<仓库路径>/` 占位改为仓库相对路径；
  TODO「正在做」从已完成的九件迁移改为无；目录说明补记 .next/.vercel/.env.local 等
  磁盘排除项。

## 2026-10-16 · 三幕体验优化（节奏 / 环入场 / 工牌精装）

- **第一幕 260vh → 340vh**：拍一退场 `[0.4,0.56]`→`[0.32,0.46]`、拍二 `[0.5,0.62,0.88,0.99]`→
  `[0.40,0.52,0.87,0.98]`，关于停留约翻倍（~0.45 屏 → ~0.9 屏）；about 锚点 0.62→0.68；
  `SeamVeil` 缝位 `[2.6,7.4]`→`[3.4,8.2]`vh 与幕界成对同步。
- **项目环入场丝滑**：`CORE` 头部余量 0.06→0.10（入场跑道 22vh→45vh），enterZ/enterO 窗口随之加倍；
  新增 settleRot（+16°→0，easeOutQuart）随跑道回正落位，首卡锚点处零残差；弹簧 `{120,30,0.5}`→
  `{140,28,0.4}` 与第一幕一致（过阻尼无过冲，停滚漂移更短）。
- **工牌转场解耦（根除放大糊屏）**：删 cover 实测缩放（原 4.2–6.4×），改微放大 1.45×；dropO 加退场段、
  chrome 在 ~1.3× 前淡出；新增 `.badge-cover`（与牌面同源 165° 渐变 + hairline-grid）铺满全屏接住
  淡出的工牌；sheen/dim/contact 窗口整体前移，吸附锚点 0.14/0.95 不变。
- **工牌卡面精装**：新增 `.badge-foil`（全息箔带 + 周期扫光）与 `.badge-blob`（角部极光晕），
  `.badge-slab` 加 overflow-hidden 裁切；头像改 conic 渐变环；新增 `OPEN TO · 合作 / 实习` 行与
  数据行（消费 `site.ts` 的 `stats`）。装饰行清单已同步 AGENTS.md 已知坑。
- **验证**：`npx tsc --noEmit`、`npm run lint`、`pnpm build` 三门禁退出码全 0；浏览器走查
  （幕界与缝位对齐、环入场中段帧/首卡零残差落位、转场中段 DOM 真值 scale≈1.44 / chrome 0.5 无糊屏、
  明暗双主题、390px 窄屏）通过；经典竖排树零改动（新 CSS 类仅存在于三幕树）。
