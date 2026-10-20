export type Project = {
  slug: string;
  name: string;
  summary: string;
  /** 仅首张 featured 卡展示的长文案 */
  detail?: string;
  tags: string[];
  url: string;
  /** 本站托管的线上 demo 路径(以 / 开头)或外部 URL */
  demo?: string;
  stars: number;
  language: string;
  updated: string;
};

export const profile = {
  handle: 'Luz7818',
  displayName: 'Luz',
  fullName: '李牧泽',
  latinName: 'Muzhe Li',
  kicker: '交通工程 × 大模型',
  lead: '开发者 & 造东西的人。做的东西大多卡在交通工程与大模型中间那段缝里:一边要能算准,一边要好看好用。',
  email: 'muze.luz@gmail.com',
  github: 'https://github.com/Luz7818',
  source: 'https://github.com/Luz7818/luzzz.me',
  aboutLine:
    '从写交通模型,到做一张可以漫游的星图。我关心交通工程与大模型的交叉处:模型要算得准,界面要好用,交付要能复现,缺一样都不算做完。',
};

/** 首屏之下的数据带。数字与 GitHub / 两个子页面核对,不是装饰。 */
export const stats = [
  { value: '10', label: '公开仓库' },
  { value: '8', label: '主力项目' },
  { value: '3', label: '线上 Demo' },
  { value: '866', label: '交通术语' },
];

/** 跑马灯关键词带(全页唯一一条)。全部来自真实项目,slug 指向点击直达的项目卡。 */
export const marquee: Array<{ text: string; slug: string }> = [
  { text: 'MADDPG 多智能体强化学习', slug: 'zhishuxing' },
  { text: 'Three.js 星图', slug: 'marx-cloud' },
  { text: 'LLM Agent', slug: 'testforge' },
  { text: '变异测试', slug: 'testforge' },
  { text: '枢纽换乘引导', slug: 'zhishuxing' },
  { text: '评测闭环', slug: 'transportation-harness' },
  { text: '数据可视化', slug: 'marx-cloud' },
  { text: 'PWA 双端', slug: 'zhishuxing' },
  { text: 'MCP 计划画布', slug: 'flowdeck' },
  { text: '投稿加速流水线', slug: 'rr-studio' },
  { text: 'DPAPI 密钥保管', slug: 'keyvault' },
];

export const projects: Project[] = [
  {
    slug: 'marx-cloud',
    name: '思想云 Marx Cloud',
    summary:
      '一张可漫游的马克思主义经典星图:5897 句语录汇成 28000 颗星辰,星云每转过 90° 聚成一位思想家的肖像。',
    detail:
      '91 位思想家按年代铺成星系,拖拽漫游、WASD 飞行,开启「拾句」就能在星海里拾取经典原文。数据与语料均可在源仓库复现。',
    tags: ['JavaScript', 'Three.js', 'WebGL', '数据可视化'],
    url: 'https://github.com/Luz7818/marx-cloud',
    demo: '/marx-cloud/',
    stars: 1,
    language: 'JavaScript',
    updated: '2026-10-01',
  },
  {
    slug: 'traffic-terminology',
    name: '交通用语语料库',
    summary:
      '把「早高峰那个路口加塞太严重」翻译成「信号交叉口违法变更车道导致严重拥堵」。866 条术语、2211 个口语匹配、9 个领域,中英对照。',
    tags: ['Python', 'Corpus', 'AI Skill', '静态网页'],
    url: 'https://github.com/Luz7818/traffic-terminology',
    demo: '/corpus/',
    stars: 0,
    language: 'Python',
    updated: '2026-10-01',
  },
  {
    slug: 'zhishuxing',
    name: '智枢星 ZhiShuXing',
    summary:
      '枢纽智慧换乘引导:乘客用自然语言说需求,MADDPG 多智能体强化学习做偏好感知路径规划,并解释「为什么这样走」。以深圳北站为场景,Web 控制台与移动端 PWA 双端。',
    tags: ['Python', 'MADDPG', 'LLM', 'PWA'],
    url: 'https://github.com/Luz7818/zhishuxing',
    stars: 1,
    language: 'Python',
    updated: '2026-10-01',
  },
  {
    slug: 'testforge',
    name: 'TestForge',
    summary:
      'LLM 写的单元测试不默认可信:只有证明自己杀掉了现有套件漏掉的种子故障,才会被采纳。开源复现 Meta 的 ACH(FSE 2025)方法,CI 免密钥,一分钟跑通。',
    tags: ['Python', 'LLM', '变异测试', '开源复现'],
    url: 'https://github.com/Luz7818/testforge',
    stars: 1,
    language: 'Python',
    updated: '2026-10-01',
  },
  {
    slug: 'transportation-harness',
    name: 'Transportation Harness',
    summary:
      '交通分析自进化评测系统:线上 badcase 沉淀为可重放的评测集,「评测、定位、迭代、回归」的闭环把管线从 7.7% 推到 100%。框架与交通无关,配 PWA 看板、微信小程序与 Python SDK。',
    tags: ['Python', 'LLM-as-Judge', 'PWA', '小程序'],
    url: 'https://github.com/Luz7818/Transportation_Harnesss',
    stars: 1,
    language: 'Python',
    updated: '2026-10-01',
  },
  {
    slug: 'rr-studio',
    name: 'R&R Studio',
    summary:
      '毕业投稿加速流水线:英文草稿上传后自动脱敏分节,逐段 Critique、基于真实文献的模拟审稿、rebuttal 润色,导出 Word 报告与组会 PPT。',
    tags: ['Next.js', 'LLM', 'OpenAlex', 'Supabase'],
    url: 'https://github.com/Luz7818/rr-studio',
    demo: 'https://rr-studio-xi.vercel.app',
    stars: 1,
    language: 'TypeScript',
    updated: '2026-10-16',
  },
  {
    slug: 'flowdeck',
    name: 'FlowDeck',
    summary:
      'AI IDE 的计划确认画布(MCP 服务器):把「确认计划」从纯文本变成可交互的框线图——拖节点、连线、点选,结果以 JSON + Markdown 流回对话,零复制粘贴。',
    tags: ['TypeScript', 'MCP', 'React', 'npm 包'],
    url: 'https://github.com/Luz7818/flowdeck',
    stars: 1,
    language: 'TypeScript',
    updated: '2026-10-19',
  },
  {
    slug: 'keyvault',
    name: 'KeyVault',
    summary:
      '本地密钥保管箱:Windows DPAPI 加密 + SQLite 存储,零外部依赖的 Python CLI/GUI。API Key 存取、泄露检测、剪贴板捕获与审计,数据不出本机。',
    tags: ['Python', 'DPAPI', 'SQLite', 'GUI'],
    url: 'https://github.com/Luz7818/KeyVault',
    stars: 1,
    language: 'Python',
    updated: '2026-10-20',
  },
];
