import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

import { getBoardSnapshot } from "../src/core.mjs";

const repoRoot = resolve(process.cwd());
const evidenceDir = join(repoRoot, "evidence", "autoplan");
const fixtureMode = process.env.AUTOPLAN_FIXTURE_MODE !== "0";
const repoPrivate = process.env.AUTOPLAN_REPO_PRIVATE === "1";

const snapshot = getBoardSnapshot({
  root: repoRoot,
  repo: { private: repoPrivate },
  fixtureMode,
});

const summary = {
  ok: true,
  refreshedAt: new Date().toISOString(),
  privacy: snapshot.privacy,
  brokerActions: snapshot.gates.brokerActions,
  sliceCount: snapshot.slices.length,
  prospectCards: snapshot.boards.prospectPipeline.reduce((count, column) => count + column.cards.length, 0),
  autoplanCards: snapshot.boards.autoplanReview.reduce((count, column) => count + column.cards.length, 0),
};

mkdirSync(evidenceDir, { recursive: true });
writeFileSync(join(evidenceDir, "board-refresh.json"), `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify(summary));
