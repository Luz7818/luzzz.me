import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // tools/sync-showcases.mjs 拷进来的别仓构建产物，不是本仓源码
    "public/marx-cloud/**",
    "public/corpus/**",
    // vercel build / vercel pull 写到仓库里的产物与项目元数据
    ".vercel/**",
  ]),
]);

export default eslintConfig;
