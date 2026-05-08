import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { buildBoardRefreshSummary, getBoardSnapshot, RuntimeStore } from "../tools/autoplan-board/src/core.mjs";

const root = resolve(".");
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
  "evidence/autoplan/desktop.png",
  "evidence/autoplan/mobile.png",
];

for (const path of requiredEvidence) {
  if (!existsSync(join(root, path))) {
    console.error(`Missing ship-gate evidence: ${path}`);
    process.exit(1);
  }
}

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

const finalSnapshot = getBoardSnapshot({
  root,
  repo: { private: process.env.AUTOPLAN_REPO_PRIVATE === "1" },
  fixtureMode: process.env.AUTOPLAN_FIXTURE_MODE !== "0",
});
writeFileSync(
  join(root, "evidence", "autoplan", "board-refresh.json"),
  `${JSON.stringify(buildBoardRefreshSummary(finalSnapshot), null, 2)}\n`
);

const summary = {
  ok: true,
  checkedAt: new Date().toISOString(),
  checks: results,
  evidence: requiredEvidence,
};

writeFileSync(join(root, "evidence/autoplan/ship-gate.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log("Ship gate passed.");
