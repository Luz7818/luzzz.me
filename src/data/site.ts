export type Project = {
  slug: string;
  name: string;
  /** one-line Chinese pitch shown on the card */
  summary: string;
  tags: string[];
  url: string;
  demo?: string;
  stars: number;
  language: string;
  updated: string;
};

export type Service = {
  name: string;
  sub: string;
  detail: string;
  href?: string;
  live?: boolean;
  icon: 'star' | 'flow' | 'grid' | 'chart' | 'book' | 'spark';
};

export const profile = {
  handle: 'Luz7818',
  displayName: 'Luz',
  fullName: 'Muzhe Li',
  eyebrow: 'HELLO, WORLD',
  /** TODO: 换成你自己的定位语，这一行会出现在 hero 大标题下方 */
  lead: '开发者 & 造东西的人。做的东西大多卡在交通工程与大模型中间那段缝里 —— 一边要能算准，一边要好看好用。',
  email: 'muze.luz@gmail.com',
  github: 'https://github.com/Luz7818',
  /** TODO: 补上你的所在地 / 身份，参考站这里是 "DEVELOPER · MELBOURNE" */
  role: 'DEVELOPER · NANJING',
  aboutLine: '从写交通模型到做可漫游的星图 —— 把工程问题做成能看、能玩、能复现的东西。',
};

export const services: Service[] = [
  {
    name: '智枢星 ZhiShuXing',
    sub: '枢纽换乘引导 · MADDPG + LLM',
    detail:
      '以深圳北站为场景：乘客用自然语言说需求（赶时间、优先直梯、带老人行李、轮椅无障碍），系统解析成结构化需求档案，做偏好感知路径规划并解释「为什么这样走」。后端是 MADDPG 多智能体强化学习 + 枢纽仿真，前端 Web 控制台与移动端 PWA 双端，82 项测试。',
    href: 'https://github.com/Luz7818/zhishuxing',
    icon: 'star',
  },
  {
    name: 'TestForge',
    sub: '变异测试驱动的测试生成 · 开源',
    detail:
      'LLM 生成的单元测试不默认可信 —— 只有证明自己杀掉了现有套件漏掉的种子故障，才会被采纳。开源复现 Meta 的 ACH（FSE 2025）方法，带完整评测网格与离线 Mock 后端，一分钟可跑通，CI 免密钥。',
    href: 'https://github.com/Luz7818/testforge',
    live: true,
    icon: 'flow',
  },
  {
    name: '交通用语语料库',
    sub: '807 术语 · 2038 口语说法 · 8 领域',
    detail:
      '把「早高峰那个红绿灯路口加塞太严重」翻译成「信号交叉口违法变更车道导致严重拥堵」。每条术语带专业定义与国标依据，一词多义用 disambiguation 显式建模。附可直接投入使用的 AI Skill、零依赖静态网页转换器与可复现的校验构建链路。',
    href: 'https://github.com/Luz7818/traffic-terminology',
    live: true,
    icon: 'book',
  },
  {
    name: 'Transportation Harness',
    sub: '自进化评测系统 · 7.7% → 100%',
    detail:
      '线上 badcase 沉淀为可重放的 replaycase，组成版本化评测集，用「评测 → 定位失败 → 迭代 → 回归验证」闭环驱动分析管线进化。框架本身与交通无关，换到代码评审、医疗问答同样成立。配 PWA 看板 + 微信小程序双客户端，提供 Python SDK 与 OpenAPI。',
    href: 'https://github.com/Luz7818/Transportation_Harnesss',
    icon: 'chart',
  },
];

export const projects: Project[] = [
  {
    slug: 'zhishuxing',
    name: '智枢星 · ZhiShuXing',
    summary: '动态客流下的枢纽智慧换乘引导：MADDPG 多智能体强化学习 + 仿真 + LLM 对话式引导，Web 控制台与移动端 PWA 双端。',
    tags: ['Python', 'MADDPG', 'LLM', 'PWA'],
    url: 'https://github.com/Luz7818/zhishuxing',
    stars: 1,
    language: 'Python',
    updated: '2026-03-23',
  },
  {
    slug: 'marx-cloud',
    name: '思想云 · Marx Cloud',
    summary: '一张可漫游的马克思主义经典星图：1041 句语录汇成万点星辰，星云每转过 90° 聚合成一位思想家的肖像。',
    tags: ['JavaScript', 'three.js', 'WebGL', 'Generative'],
    url: 'https://github.com/Luz7818/marx-cloud',
    demo: 'https://luz7818.github.io/marx-cloud/',
    stars: 1,
    language: 'JavaScript',
    updated: '2026-09-20',
  },
  {
    slug: 'testforge',
    name: 'TestForge',
    summary: '以变异测试为验收标准的测试生成智能体：LLM 写的单测必须证明能杀掉种子故障才被采纳。开源复现 Meta ACH（FSE 2025）。',
    tags: ['Python', 'LLM', 'Mutation Testing', 'Open Source'],
    url: 'https://github.com/Luz7818/testforge',
    stars: 1,
    language: 'Python',
    updated: '2026-09-19',
  },
  {
    slug: 'transportation-harness',
    name: 'Transportation Harness',
    summary: '交通分析自进化评测系统：badcase 沉淀为可重放评测集，闭环驱动管线从 7.7% 提升到 100%，PWA 看板 + 小程序 + SDK。',
    tags: ['Python', 'HTML', 'LLM-as-Judge', 'PWA'],
    url: 'https://github.com/Luz7818/Transportation_Harnesss',
    stars: 1,
    language: 'HTML',
    updated: '2026-09-18',
  },
  {
    slug: 'traffic-terminology',
    name: '交通用语语料库',
    summary: '口语化交通表述 → 标准交通工程术语的中英对照语料库，807 术语 / 2038 口语说法 / 8 领域，附 AI Skill 与静态转换器。',
    tags: ['Python', 'JavaScript', 'Corpus', 'AI Skill'],
    url: 'https://github.com/Luz7818/traffic-terminology',
    stars: 0,
    language: 'Python',
    updated: '2026-09-24',
  },
];

export const palette = {
  colors: ['#FF2D2D', '#FFB300', '#34D399', '#22D3EE', '#4F7CFF', '#C026D3'],
  speed: 0.2,
  rotation: 90,
  autoRotate: 0,
  scale: 1,
  frequency: 1,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.12,
  iterations: 2,
  intensity: 1.05,
  bandScale: 2.6,
  soft: 1.7,
  coreWhite: 0.9,
};
