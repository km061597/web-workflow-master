import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "storybook-static/**",
    "node_modules/**",
    ".storybook/**",
    "next-env.d.ts",
    "scripts/**",
  ]),
  ...storybook.configs["flat/recommended"],
]);
