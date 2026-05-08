import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { createServer } from "../src/server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, "..");
const repoRoot = resolve(packageRoot, "..", "..");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? packageRoot,
    encoding: "utf8",
    stdio: "pipe",
  });
  if (result.status !== 0) {
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n");
    throw new Error(`${command} ${args.join(" ")} failed\n${output}`);
  }
  return result;
}

function assertIncludes(content, pattern, label) {
  assert.match(content, pattern, label);
}

run("node", ["--test", "tests/*.test.mjs"]);

const app = await createServer({ root: repoRoot, port: 0, fixtureMode: true });
try {
  const { port } = app.server.address();
  const base = `http://127.0.0.1:${port}`;
  const [desktopHtml, mobileHtml, health] = await Promise.all([
    fetch(`${base}/?viewport=desktop`).then((response) => response.text()),
    fetch(`${base}/?viewport=mobile`).then((response) => response.text()),
    fetch(`${base}/api/health`).then((response) => response.json()),
  ]);

  assert.equal(health.ok, true);
  assertIncludes(desktopHtml, /data-board="prospect-pipeline"/, "desktop board smoke");
  assertIncludes(mobileHtml, /Evidence rail/, "mobile board smoke");
  assertIncludes(desktopHtml, /Dashboard verify[\s\S]*wired/, "root dashboard:verify script is visible");
  assertIncludes(desktopHtml, /Fixture chain/, "fixture chain status is visible");
  assertIncludes(desktopHtml, /Agent-board bridge/, "agent-board bridge status is visible");

  const css = readFileSync(join(packageRoot, "public", "styles.css"), "utf8");
  assertIncludes(css, /:focus-visible/, "focus-visible styles exist");
  assertIncludes(css, /@media \(max-width: 820px\)/, "mobile media query exists");
  assertIncludes(css, /grid-template-columns: repeat\(7/, "desktop kanban layout exists");

  const html = desktopHtml.toLowerCase();
  for (const banned of ["hero", "purple", "linear-gradient"]) {
    assert.equal(html.includes(banned), false, `anti-generic check: ${banned}`);
  }

  writeFileSync(
    join(repoRoot, "evidence", "autoplan", "dashboard-smoke.json"),
    `${JSON.stringify({ ok: true, checkedAt: new Date().toISOString(), base }, null, 2)}\n`
  );
} finally {
  await app.close();
}

console.log("Autoplan Board verification passed.");
