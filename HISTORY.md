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
