/**
 * Verify that the site is ready for production.
 * Checks: env vars, build output, critical files exist.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const REQUIRED_ENV = ["NEXT_PUBLIC_SITE_URL"];
const REQUIRED_FILES = ["dist/index.html", "dist/404.html"];

let errors = 0;

function ok(msg) {
  console.log(`  ✓ ${msg}`);
}

function fail(msg) {
  console.error(`  ✗ ${msg}`);
  errors++;
}

console.log("\n🔍 Verifying site setup…\n");

// Check env
for (const key of REQUIRED_ENV) {
  if (process.env[key]) ok(`${key} is set`);
  else fail(`${key} is missing — set in .env.local`);
}

// Check build output
for (const file of REQUIRED_FILES) {
  const path = resolve(file);
  if (existsSync(path)) ok(`${file} exists`);
  else fail(`${file} missing — run \`npm run build\` first`);
}

// Check robots.txt
const robotsPath = resolve("dist/robots.txt");
if (existsSync(robotsPath)) {
  const content = readFileSync(robotsPath, "utf-8");
  if (content.includes("Sitemap")) ok("robots.txt references sitemap");
  else fail("robots.txt missing Sitemap directive");
} else {
  fail("dist/robots.txt missing");
}

// Check sitemap
const sitemapPath = resolve("dist/sitemap.xml");
if (existsSync(sitemapPath)) ok("sitemap.xml exists");
else fail("dist/sitemap.xml missing — run `npm run build`");

console.log(`\n${errors === 0 ? "✅ All checks passed." : `❌ ${errors} check(s) failed.`}\n`);
process.exit(errors);
