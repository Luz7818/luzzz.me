# luzzz.me Git 规范

> 用途：给提交本仓代码的人。部署链路、入库边界与敏感信息约束都在这里。

## 分支与提交策略

- 单 `main` 分支，推 `main` 即 Vercel 构建（项目 `luzzz-me` 已连仓库）；无 CI workflow。
- **一批一提交**；提交前门禁：[TESTING.md](TESTING.md) 三条命令 + `check_docs`。

## 必须入库 / 禁止上传

| 判定 | 规则 |
|---|---|
| 必须入库 | `src/`、`public/`（含两个外仓子页面副本——Vercel 构建机上没有兄弟目录）、`tools/`、全部文档与配置 |
| 禁止上传 | `out/`、`.next/`、`node_modules/`、`tsconfig.tsbuildinfo`、`.vercel/`（`.gitignore`/`.docsignore` 已挡）；**`.env*` 永不入库** |

## 敏感信息边界

- `.env.local` 服务于 Vercel CLI 链接，与应用代码无关（`src/` 下没有任何 `process.env`）。
  **不要读它，不要把它的内容或变量名写进任何文档。**
- 不要把 Vercel 接入 IP 写进文档（任播会变）；域名状态的复核命令见 `AGENTS.md`「当前状态」。

## CI 与 tag

- 无 CI workflow；门禁即三条命令。
- 无 tag、无 LICENSE（保留所有权利；卡片链出的 5 个项目各有各的许可）。

## commit message

- 风格沿用既有历史：`<type>(<scope>): 中文一句话` 或 `<type>: 中文一句话`，
  type 取 `feat / fix / docs / chore / refactor`（复核：`git log --oneline -10`）。
