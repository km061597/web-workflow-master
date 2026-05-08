import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { buildBoardRefreshSummary, getBoardSnapshot } from "../src/core.mjs";

const repoRoot = resolve(process.cwd());
const evidenceDir = join(repoRoot, "evidence", "autoplan");
const fixtureMode = process.env.AUTOPLAN_FIXTURE_MODE === undefined || process.env.AUTOPLAN_FIXTURE_MODE === "1";
const repoPrivate = process.env.AUTOPLAN_REPO_PRIVATE === "1";

const snapshot = getBoardSnapshot({
  root: repoRoot,
  repo: { private: repoPrivate },
  fixtureMode,
});

const summary = buildBoardRefreshSummary(snapshot);

mkdirSync(evidenceDir, { recursive: true });
writeFileSync(join(evidenceDir, "board-refresh.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary));
