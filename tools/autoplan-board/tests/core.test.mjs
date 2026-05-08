import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
  pollTelegramOnce,
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
    await mkdir(join(root, ".autoplan-board", "autoplan-runs"), { recursive: true });
    await mkdir(join(root, "evidence", "autoplan"), { recursive: true });
    writeFileSync(
      join(root, ".autoplan-board", "autoplan-runs", "S09.json"),
      JSON.stringify({ id: "S09", sliceId: "S09", title: "S09 sidecar verdict", verdict: "advanced", evidence: ["autoplan-runs/S09.json"] })
    );
    writeFileSync(join(root, "evidence", "autoplan", "ship-gate.json"), JSON.stringify({ ok: true }));
    writeFileSync(join(root, "evidence", "autoplan", "dashboard-smoke.json"), JSON.stringify({ ok: true }));
    writeFileSync(join(root, "evidence", "autoplan", "desktop.png"), "png");
    writeFileSync(join(root, "evidence", "autoplan", "mobile.png"), "png");
    const store = new RuntimeStore(root);
    store.writeJob({ action: "verify", status: "succeeded", source: "broker" });
    store.writeJob({ action: "refreshBoard", status: "succeeded" });
    store.writeJob({ action: "shipGate", status: "succeeded", source: "ship-gate" });

    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.gates.fixtureChainStatus, "local-complete");
    assert.match(snapshot.boards.fixtureChain.evidence.join("\n"), /verify: succeeded \(broker\)/);
    assert.match(snapshot.boards.fixtureChain.evidence.join("\n"), /shipGate: succeeded \(ship-gate\)/);
    assert.equal(snapshot.slices.find((slice) => slice.id === "S09").status, "implemented");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S10").status, "implemented");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S15").status, "implemented");
    assert.equal(snapshot.boards.operations.succeeded.length, 3);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("slice status remains pending when runtime evidence is absent", async () => {
  const root = fixtureRoot();
  try {
    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.slices.find((slice) => slice.id === "S09").status, "pending");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S10").status, "pending");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S15").status, "pending");
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
  assert.equal(processBrokerRequest({ id: "3", action: "scaffold", args: ["../../secrets"] }, state).error, "path-traversal-blocked");
  assert.equal(processBrokerRequest({ id: "4", action: "screenshotAudit", args: ["/Users/kylemetzger/.ssh/id_rsa"] }, state).error, "absolute-path-blocked");
  assert.equal(processBrokerRequest({ id: "4", action: "scaffold", args: ["rm -rf ."] }, state).error, "destructive-token-blocked");
  assert.equal(processBrokerRequest({ id: "5", action: "verify", args: ["ignored"] }, state).error, "unexpected-args");
  assert.equal(processBrokerRequest({ id: "new-id-same-work", action: "verify", args: [] }, state).error, "duplicate-job");

  const refresh = processBrokerRequest({ id: "refresh", action: "refreshBoard", args: [] }, state);
  assert.equal(refresh.ok, true);
  assert.equal(existsSync(join(repoRoot, refresh.job.argv[1])), true);

  const scriptRun = spawnSync("node", [refresh.job.argv[1]], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(scriptRun.status, 0, scriptRun.stderr);
});

test("broker registry maps every local action to an existing command surface", () => {
  const packageJson = JSON.parse(readFileSync(join(repoRoot, "package.json"), "utf8"));
  const requests = [
    { action: "scaffold", args: ["registry-fixture", "--template", "astro-canonical"] },
    { action: "verify", args: [] },
    { action: "shipGate", args: [] },
    { action: "advancePhase", args: ["design"] },
    { action: "screenshotAudit", args: ["http://127.0.0.1:4177", "--output", "evidence/autoplan/registry-screenshot.json"] },
    { action: "refreshGithub", args: [] },
    { action: "refreshBoard", args: [] },
  ];

  for (const request of requests) {
    const accepted = processBrokerRequest({ id: `registry-${request.action}`, ...request }, { seen: new Set() });
    assert.equal(accepted.ok, true, `${request.action} accepted`);
    const [command, ...argv] = accepted.job.argv;

    if (command === "node") {
      assert.equal(existsSync(join(repoRoot, argv[0])), true, `${request.action} node script exists`);
    } else if (command === "npm") {
      assert.equal(argv[0], "run", `${request.action} uses npm run`);
      assert.equal(Boolean(packageJson.scripts?.[argv[1]]), true, `${request.action} npm script exists`);
    } else if (command === "gh") {
      assert.match(argv.join(" "), /^api repos\//, `${request.action} uses gh repo API`);
    } else {
      assert.equal(existsSync(join(repoRoot, command)), true, `${request.action} executable exists`);
    }
  }
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

test("broker execution can scaffold a fixture site with fixed argv", async () => {
  const siteName = `autoplan-fixture-${Date.now()}`;
  const target = join(repoRoot, "sites", siteName);
  const state = { seen: new Set(), running: new Set() };
  try {
    const result = await executeBrokerJob(
      { id: "scaffold-test", action: "scaffold", args: [siteName, "--template", "astro-canonical"] },
      { root: repoRoot, state }
    );
    assert.equal(result.ok, true);
    assert.equal(existsSync(target), true);
    assert.match(result.result.output, /Created/);
  } finally {
    rmSync(target, { recursive: true, force: true });
  }
});

test("ship gate records fixture integration evidence for derived completion state", () => {
  const root = fixtureRoot();
  try {
    writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: { verify: "node -e \"process.exit(0)\"", "dashboard:verify": "node -e \"process.exit(0)\"" } }));
    writeFileSync(join(root, "package-lock.json"), JSON.stringify({ lockfileVersion: 3, packages: { "": {} } }));
    mkdirSync(join(root, "evidence", "autoplan"), { recursive: true });
    writeFileSync(join(root, "evidence", "autoplan", "dashboard-smoke.json"), JSON.stringify({ ok: true }));
    writeFileSync(join(root, "evidence", "autoplan", "desktop.png"), "png");
    writeFileSync(join(root, "evidence", "autoplan", "mobile.png"), "png");

    const result = spawnSync("node", [join(repoRoot, "scripts", "ship-gate.mjs")], { cwd: root, encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);

    const snapshot = getBoardSnapshot({ root, repo: { private: false }, fixtureMode: true });
    assert.equal(snapshot.slices.find((slice) => slice.id === "S09").status, "implemented");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S10").status, "implemented");
    assert.equal(snapshot.slices.find((slice) => slice.id === "S15").status, "implemented");
    assert.match(snapshot.boards.fixtureChain.evidence.join("\n"), /shipGate: succeeded \(ship-gate\)/);
    assert.match(readFileSync(join(root, ".autoplan-board", "audit-events.jsonl"), "utf8"), /ship-gate\.passed/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("Telegram command layer enforces allowlist and blocks raw shell behavior", () => {
  const config = { allowedUserId: "12345" };
  assert.equal(runTelegramCommand({ fromId: "999", text: "/status" }, config).error, "telegram-user-denied");
  assert.match(runTelegramCommand({ fromId: "12345", text: "/status" }, config).response, /Autoplan Board/);
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/run rm -rf ." }, config).error, "telegram-raw-command-blocked");
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/approve ../../bad" }, config).error, "telegram-approval-target-invalid");
  assert.equal(runTelegramCommand({ fromId: "12345", text: "/approve S10" }, config).auditEvent.type, "telegram.approve");
});

test("Telegram polling consumes real bot updates and writes audit", async () => {
  const root = fixtureRoot();
  const calls = [];
  try {
    const fetchImpl = async (url, options) => {
      calls.push({ url, options });
      if (String(url).includes("getUpdates")) {
        return {
          json: async () => ({
            ok: true,
            result: [
              {
                update_id: 41,
                message: { text: "/approve S10", from: { id: "12345" }, chat: { id: "chat-1" } },
              },
            ],
          }),
        };
      }
      return { json: async () => ({ ok: true }) };
    };

    const result = await pollTelegramOnce({ botToken: "token", allowedUserId: "12345", offset: 0, root, fetchImpl });
    assert.equal(result.ok, true);
    assert.equal(result.nextOffset, 42);
    assert.equal(calls.some((call) => String(call.url).includes("sendMessage")), true);
    assert.match(readFileSync(join(root, ".autoplan-board", "audit-events.jsonl"), "utf8"), /telegram\.approve/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
