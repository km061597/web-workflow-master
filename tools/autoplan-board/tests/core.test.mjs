import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  BROKER_ACTIONS,
  RuntimeStore,
  executeBrokerJob,
  evaluatePrivacyGate,
  getBoardSnapshot,
  processBrokerRequest,
  runTelegramCommand,
} from "../src/core.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", "..");

function fixtureRoot() {
  return mkdtempSync(join(tmpdir(), "autoplan-board-"));
}

test("privacy gate refuses real prospect persistence when the GitHub repository is public", () => {
  assert.deepEqual(evaluatePrivacyGate({ private: false, fixtureMode: false }), {
    ok: false,
    reason: "repo-public-real-persistence-blocked",
  });
  assert.equal(evaluatePrivacyGate({ private: false, fixtureMode: true }).ok, true);
});

test("board snapshot contains S01-S15 and maps fixture prospects into stage columns", async () => {
  const root = fixtureRoot();
  try {
    await mkdir(join(root, "prospects", "lemons-jewelers"), { recursive: true });
    writeFileSync(
      join(root, "prospects", "lemons-jewelers", "workflow-manifest.json"),
      JSON.stringify({
        businessName: "Lemons Jewelers",
        stage: "audit",
        confidence: "grounded-proposal",
        updatedAt: "2026-05-08T12:00:00.000Z",
        outputs: { evidenceLedger: "populated" },
      })
    );

    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.slices.length, 15);
    assert.deepEqual(
      snapshot.slices.map((slice) => slice.id),
      Array.from({ length: 15 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`)
    );
    assert.equal(snapshot.privacy.ok, true);
    assert.equal(snapshot.boards.prospectPipeline.find((column) => column.id === "audit").cards[0].name, "Lemons Jewelers");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("snapshot reads autoplan sidecars and agent-board cache without relaunch paths", async () => {
  const root = fixtureRoot();
  try {
    await mkdir(join(root, ".agent-board"), { recursive: true });
    await mkdir(join(root, ".autoplan-board", "autoplan-runs"), { recursive: true });
    writeFileSync(join(root, ".agent-board", "activity.json"), JSON.stringify({ activities: [{ id: "task-1", status: "review" }] }));
    writeFileSync(
      join(root, ".autoplan-board", "autoplan-runs", "S09.json"),
      JSON.stringify({ id: "S09", sliceId: "S09", title: "S09 sidecar verdict", verdict: "advanced", evidence: ["autoplan-runs/S09.json"] })
    );

    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.boards.agentBoard.status, "available");
    assert.equal(snapshot.boards.agentBoard.mode, "read-only/context-bridge");
    assert.equal(snapshot.boards.autoplanReview.find((column) => column.id === "advanced").cards[0].name, "S09 sidecar verdict");
    assert.equal(snapshot.boards.fixtureChain.status, "paused");
    assert.doesNotMatch(readFileSync(join(repoRoot, "tools", "autoplan-board", "src", "core.mjs"), "utf8"), /agent-board.*spawn|spawn.*agent-board/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("fixture chain reflects broker verification evidence", async () => {
  const root = fixtureRoot();
  try {
    const store = new RuntimeStore(root);
    store.writeJob({ action: "verify", status: "succeeded" });
    store.writeJob({ action: "refreshBoard", status: "succeeded" });

    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.gates.fixtureChainStatus, "local-complete");
    assert.match(snapshot.boards.fixtureChain.evidence.join("\n"), /verify: succeeded/);
    assert.equal(snapshot.boards.operations.succeeded.length, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});


test("runtime store writes gitignored audit and job state", () => {
  const root = fixtureRoot();
  try {
    const store = new RuntimeStore(root);
    const job = store.writeJob({ action: "refreshBoard", status: "queued" });
    const event = store.writeAudit({ type: "job.queued", jobId: job.id });
    assert.equal(job.id, "job-000001");
    assert.match(readFileSync(join(root, ".autoplan-board", "jobs.jsonl"), "utf8"), /refreshBoard/);
    assert.match(readFileSync(join(root, ".autoplan-board", "audit-events.jsonl"), "utf8"), /job\.queued/);
    assert.equal(event.type, "job.queued");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("broker accepts only typed allowlisted actions and blocks abuse cases", () => {
  assert.deepEqual([...BROKER_ACTIONS].sort(), [
    "advancePhase",
    "refreshBoard",
    "refreshGithub",
    "scaffold",
    "screenshotAudit",
    "shipGate",
    "verify",
  ]);

  const state = { seen: new Set() };
  assert.equal(processBrokerRequest({ id: "1", action: "verify", args: [] }, state).ok, true);
  assert.equal(processBrokerRequest({ id: "2", action: "rawShell", args: ["npm run verify"] }, state).error, "unsupported-action");
  assert.equal(processBrokerRequest({ id: "3", action: "verify", args: ["../../secrets"] }, state).error, "path-traversal-blocked");
  assert.equal(processBrokerRequest({ id: "4", action: "screenshotAudit", args: ["/Users/kylemetzger/.ssh/id_rsa"] }, state).error, "absolute-path-blocked");
  assert.equal(processBrokerRequest({ id: "4", action: "verify", args: ["rm -rf ."] }, state).error, "destructive-token-blocked");
  assert.equal(processBrokerRequest({ id: "new-id-same-work", action: "verify", args: [] }, state).error, "duplicate-job");

  const refresh = processBrokerRequest({ id: "refresh", action: "refreshBoard", args: [] }, state);
  assert.equal(refresh.ok, true);
  assert.equal(existsSync(join(repoRoot, refresh.job.argv[1])), true);

  const scriptRun = spawnSync("node", [refresh.job.argv[1]], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(scriptRun.status, 0, scriptRun.stderr);
});

test("broker execution runs fixed argv and writes job and audit records", async () => {
  const state = { seen: new Set(), running: new Set() };
  const result = await executeBrokerJob({ id: "refresh-board-test", action: "refreshBoard", args: [] }, { root: repoRoot, state });
  assert.equal(result.ok, true);
  assert.equal(result.job.status, "succeeded");
  assert.match(result.result.output, /"ok":true/);
  assert.match(readFileSync(join(repoRoot, ".autoplan-board", "jobs.jsonl"), "utf8"), /refresh-board-test/);
  assert.match(readFileSync(join(repoRoot, ".autoplan-board", "audit-events.jsonl"), "utf8"), /broker\.job\.succeeded/);

  const rerun = await executeBrokerJob({ id: "refresh-board-test-rerun", action: "refreshBoard", args: [] }, { root: repoRoot, state });
  assert.equal(rerun.ok, true);
  assert.equal(rerun.job.status, "succeeded");
});

test("Telegram command layer enforces allowlist and blocks raw shell behavior", () => {
  const config = { allowedUserId: "12345" };
  assert.equal(runTelegramCommand({ fromId: "999", text: "/status" }, config).error, "telegram-user-denied");
  assert.match(runTelegramCommand({ fromId: "12345", text: "/status" }, config).response, /Autoplan Board/);
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/run rm -rf ." }, config).error, "telegram-raw-command-blocked");
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/approve ../../bad" }, config).error, "telegram-approval-target-invalid");
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/approve S10" }, config).auditEvent.type, "telegram.approve");
});
