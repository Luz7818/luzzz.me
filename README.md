# luzzz.me — 个人主页

参考 [cohenjikan.com](https://cohenjikan.com/) 的观感做的单页作品集：WebGL 虹彩流体背景 + JetBrains Mono 排版，内容取自 [Luz7818](https://github.com/Luz7818) 的真实仓库。

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4，全站静态输出。

## 本地跑

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # 静态产出
```

## 改内容

全部文案与配色集中在 `src/data/site.ts`，不用碰组件：

| 字段 | 作用 |
|---|---|
| `profile` | 名字、眉标、hero 引导语、邮箱、所在地 |
| `services` | Services 手风琴的每一条 |
| `projects` | Projects 卡片的标题 / 一句话 / 标签 / star / 语言 |
| `palette` | 背景色带的 6 个色值与着色器参数 |

## 换项目预览图

把截图放到 `public/projects/<slug>.png`（`slug` 取自 `site.ts` 里项目的 `slug` 字段），构建时会自动识别并替换掉生成的星点占位图。也支持 `webp` / `jpg`。

## 背景着色器

`src/components/IridescentBackground.tsx` 是原生 WebGL1，没有引入 `ogl`。保留了 ColorBends 的域扭曲数学，但把原来的多色加性累置换成了「按等值环索引取色 + 环心过曝」——加性累加会把 8 条带冲成白，量出来饱和度只有 9/255；改后留白约 27%、高饱和像素约 49%，才是参考站那种白芯彩虹边。

## 已知待办

- `profile.lead` / `role` / `aboutLine` 三句文案是代笔的，按自己口吻改掉
- 移动端只做了断点适配，没有在真机上验证过拖拽吊牌的手感
