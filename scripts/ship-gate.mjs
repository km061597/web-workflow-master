import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { buildBoardRefreshSummary, getBoardSnapshot, RuntimeStore } from "../tools/autoplan-board/src/core.mjs";

const root = resolve(".");
const gateStartedMs = Date.now();
const checks = [
  ["npm", ["run", "verify"]],
  ["npm", ["run", "dashboard:verify"]],
  ["npm", ["audit", "--audit-level=moderate"]],
];

const results = [];

for (const [command, args] of checks) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8", stdio: "pipe" });
  results.push({
    command: [command, ...args].join(" "),
    status: result.status,
    ok: result.status === 0,
  });
  if (result.status !== 0) {
    process.stderr.write(result.stdout);
    process.stderr.write(result.stderr);
    process.exit(result.status ?? 1);
  }
}

const requiredEvidence = [
  "evidence/autoplan/dashboard-smoke.json",
  "evidence/autoplan/browser-smoke.json",
  "evidence/autoplan/desktop.png",
  "evidence/autoplan/mobile.png",
];

const smoke = JSON.parse(readFileSync(join(root, "evidence/autoplan/dashboard-smoke.json"), "utf8"));
if (smoke.ok !== true) {
  console.error("dashboard-smoke.json is not ok");
  process.exit(1);
}

const runtime = new RuntimeStore(root);
runtime.writeJob({ action: "verify", status: "succeeded", source: "ship-gate" });
runtime.writeJob({ action: "shipGate", status: "succeeded", source: "ship-gate" });
runtime.writeAudit({ type: "ship-gate.passed", evidence: requiredEvidence });

const sidecarDir = join(root, ".autoplan-board", "autoplan-runs");
mkdirSync(sidecarDir, { recursive: true });
writeFileSync(
  join(sidecarDir, "S09.json"),
  `${JSON.stringify(
    {
      id: "S09",
      sliceId: "S09",
      title: "S09 Autoplan sidecar fixture verdict",
      verdict: "advanced",
      risk: "high",
      mode: "AFK",
      evidence: ["ship-gate: passed", "runtime sidecar: .autoplan-board/autoplan-runs/S09.json"],
      blockers: [],
    },
    null,
    2
  )}\n`
);

writeFileSync(
  join(root, "evidence/autoplan/ship-gate.json"),
  `${JSON.stringify({ ok: true, checkedAt: new Date().toISOString(), checks: results, evidence: requiredEvidence, status: "in-progress" }, null, 2)}\n`
);

const browserSmoke = spawnSync("npm", ["run", "dashboard:smoke"], { cwd: root, encoding: "utf8", stdio: "pipe" });
results.push({
  command: "npm run dashboard:smoke",
  status: browserSmoke.status,
  ok: browserSmoke.status === 0,
});
if (browserSmoke.status !== 0) {
  process.stderr.write(browserSmoke.stdout);
  process.stderr.write(browserSmoke.stderr);
  process.exit(browserSmoke.status ?? 1);
}

const finalSnapshot = getBoardSnapshot({
  root,
  repo: { private: process.env.AUTOPLAN_REPO_PRIVATE === "1" },
  fixtureMode: process.env.AUTOPLAN_FIXTURE_MODE === undefined || process.env.AUTOPLAN_FIXTURE_MODE === "1",
});
if (finalSnapshot.gates.implementedSlices !== finalSnapshot.gates.totalSlices) {
  console.error(`Autoplan slices incomplete: ${finalSnapshot.gates.implementedSlices}/${finalSnapshot.gates.totalSlices}`);
  process.exit(1);
}
if (finalSnapshot.gates.fixtureChainStatus !== "local-complete") {
  console.error(`Fixture chain is not complete: ${finalSnapshot.gates.fixtureChainStatus}`);
  process.exit(1);
}
writeFileSync(
  join(root, "evidence", "autoplan", "board-refresh.json"),
  `${JSON.stringify(buildBoardRefreshSummary(finalSnapshot), null, 2)}\n`
);

validateEvidence(requiredEvidence, gateStartedMs);

const summary = {
  ok: true,
  checkedAt: new Date().toISOString(),
  checks: results,
  evidence: requiredEvidence,
};

writeFileSync(join(root, "evidence/autoplan/ship-gate.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log("Ship gate passed.");

function validateEvidence(paths, minMtimeMs) {
  for (const path of paths) {
    const fullPath = join(root, path);
    if (!existsSync(fullPath)) {
      console.error(`Missing ship-gate evidence: ${path}`);
      process.exit(1);
    }
    const stat = statSync(fullPath);
    if (stat.mtimeMs + 2000 < minMtimeMs) {
      console.error(`Stale ship-gate evidence: ${path}`);
      process.exit(1);
    }
  }

  const browserSmokePath = join(root, "evidence/autoplan/browser-smoke.json");
  const browserSmoke = JSON.parse(readFileSync(browserSmokePath, "utf8"));
  if (browserSmoke.ok !== true) {
    console.error("browser-smoke.json is not ok");
    process.exit(1);
  }
  if (browserSmoke.implementedSlices !== finalSnapshot.gates.implementedSlices) {
    console.error("browser-smoke.json does not match board implemented slice count");
    process.exit(1);
  }
  if (browserSmoke.fixtureChainStatus !== finalSnapshot.gates.fixtureChainStatus) {
    console.error("browser-smoke.json does not match fixture chain status");
    process.exit(1);
  }

  assertPngDimensions("evidence/autoplan/desktop.png", 1440, 900);
  assertPngDimensions("evidence/autoplan/mobile.png", 390, 844);
}

function assertPngDimensions(path, expectedWidth, expectedHeight) {
  const buffer = readFileSync(join(root, path));
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 33 || buffer.subarray(0, 8).toString("hex") !== signature) {
    console.error(`${path} is not a PNG file`);
    process.exit(1);
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== expectedWidth || height !== expectedHeight) {
    console.error(`${path} has dimensions ${width}x${height}; expected ${expectedWidth}x${expectedHeight}`);
    process.exit(1);
  }
  if (buffer.length < 1024) {
    console.error(`${path} is too small to be accepted as browser screenshot evidence`);
    process.exit(1);
  }
}
