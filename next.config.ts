import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // public/ 下的两个子页面用相对路径取资源，末尾斜杠不能丢：默认的 trailingSlash 会让
  // 部署平台生成一条 308，把 /marx-cloud/ 重定向成 /marx-cloud，资源基准就变成站点根
  trailingSlash: true,
};

export default nextConfig;
