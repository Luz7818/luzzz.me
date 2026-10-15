import type { NextConfig } from "next";

// 两个子页面是 public/ 下的纯静态副本:生产由导出目录结构 + 部署平台解析 /marx-cloud/ → index.html,
// 但 next dev 不做目录索引解析(干净 URL 会 404)。仅在开发环境加改写;
// NODE_ENV=development 才生成 rewrites 键,生产构建的配置里没有它,不触碰 output:export 的限制。
const nextConfig: NextConfig = {
  output: "export",
  // public/ 下的两个子页面用相对路径取资源，末尾斜杠不能丢：默认的 trailingSlash 会让
  // 部署平台生成一条 308，把 /marx-cloud/ 重定向成 /marx-cloud，资源基准就变成站点根
  trailingSlash: true,
  ...(process.env.NODE_ENV === "development"
    ? {
        async rewrites() {
          return [
            { source: "/marx-cloud", destination: "/marx-cloud/index.html" },
            { source: "/corpus", destination: "/corpus/index.html" },
          ];
        },
      }
    : {}),
};

export default nextConfig;
