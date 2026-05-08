/**
 * Verify that the scaffold is ready to install and build.
 *
 * Built output is checked only when VERIFY_BUILT_OUTPUT=1 because setup checks
 * must pass before the first build exists.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const REQUIRED_FILES = [
  "package.json",
  "next.config.ts",
  "postcss.config.mjs",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/globals.css",
  "src/lib/utils.ts",
  ".env.example",
];
const REQUIRED_ENV_EXAMPLES = ["NEXT_PUBLIC_SITE_URL"];
const REQUIRED_BUILD_FILES = ["dist/index.html", "dist/404.html"];
const CHECK_BUILT_OUTPUT = process.env.VERIFY_BUILT_OUTPUT === "1";

let errors = 0;

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

console.log("\n🔍 Verifying site setup…\n");

// Check scaffold source files.
for (const file of REQUIRED_FILES) {
  const path = resolve(file);
  if (existsSync(path)) ok(`${file} exists`);
  else fail(`${file} missing`);
}

const envExample = existsSync(".env.example") ? readFileSync(".env.example", "utf-8") : "";
for (const key of REQUIRED_ENV_EXAMPLES) {
  if (envExample.includes(`${key}=`)) ok(`.env.example documents ${key}`);
  else fail(`.env.example missing ${key}`);
}

if (CHECK_BUILT_OUTPUT) {
  for (const file of REQUIRED_BUILD_FILES) {
    const path = resolve(file);
    if (existsSync(path)) ok(`${file} exists`);
    else fail(`${file} missing — run \`npm run build\` first`);
  }

  const robotsPath = resolve("dist/robots.txt");
  if (existsSync(robotsPath)) {
    const content = readFileSync(robotsPath, "utf-8");
    if (content.includes("Sitemap")) ok("robots.txt references sitemap");
    else fail("robots.txt missing Sitemap directive");
  } else {
    fail("dist/robots.txt missing");
  }

  const sitemapPath = resolve("dist/sitemap.xml");
  if (existsSync(sitemapPath)) ok("sitemap.xml exists");
  else fail("dist/sitemap.xml missing — run `npm run build`");
} else {
  ok("built output check skipped; set VERIFY_BUILT_OUTPUT=1 after npm run build");
}

console.log(`\n${errors === 0 ? "✅ All checks passed." : `❌ ${errors} check(s) failed.`}\n`);
process.exit(errors);
