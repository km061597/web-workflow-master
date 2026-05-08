import assert from "node:assert/strict";
import { statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

import { createServer } from "../src/server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..");
const repoRoot = resolve(packageRoot, "..", "..");
const evidenceDir = join(repoRoot, "evidence", "autoplan");

const viewports = [
  { name: "desktop", width: 1440, height: 900, path: join(evidenceDir, "desktop.png") },
  { name: "mobile", width: 390, height: 844, path: join(evidenceDir, "mobile.png") },
];

const app = await createServer({ root: repoRoot, port: 0, fixtureMode: true });
let browser;

try {
  const { port } = app.server.address();
  const base = `http://127.0.0.1:${port}`;
  const board = await fetch(`${base}/api/board`).then((response) => response.json());
  assert.equal(board.gates.totalSlices, 15);

  browser = await chromium.launch({ headless: true });
  const captured = [];

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.getByText("Autoplan Board").first().waitFor();
    await page.getByText(`${board.gates.implementedSlices}/15 slices`).first().waitFor();
    await page.screenshot({ path: viewport.path, fullPage: false });
    await page.close();
    const stat = statSync(viewport.path);
    captured.push({
      name: viewport.name,
      path: `evidence/autoplan/${viewport.name}.png`,
      width: viewport.width,
      height: viewport.height,
      bytes: stat.size,
      mtimeMs: stat.mtimeMs,
    });
  }

  writeFileSync(
    join(evidenceDir, "browser-smoke.json"),
    `${JSON.stringify(
      {
        ok: true,
        checkedAt: new Date().toISOString(),
        base,
        implementedSlices: board.gates.implementedSlices,
        fixtureChainStatus: board.gates.fixtureChainStatus,
        captured,
      },
      null,
      2
    )}\n`
  );
} finally {
  if (browser) await browser.close();
  await app.close();
}

console.log("Autoplan browser smoke passed.");
