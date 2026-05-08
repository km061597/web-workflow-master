import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
  evaluateVerifiedPrivacyGate,
  getBoardSnapshot,
  pollTelegramOnce,
  processBrokerRequest,
  runTelegramCommand,
  validateScreenshotOutput,
  validateScreenshotUrl,
  verifyGitHubRepoPrivacy,
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
  assert.deepEqual(evaluateVerifiedPrivacyGate({ private: true, fixtureMode: false, visibilityVerified: false }), {
    ok: false,
    reason: "repo-privacy-unverified-real-persistence-blocked",
  });
  assert.deepEqual(evaluateVerifiedPrivacyGate({ private: true, fixtureMode: false, visibilityVerified: true }), {
    ok: true,
    reason: "private-repo-verified",
  });
});

test("GitHub privacy verification preserves gh token auth for fixed argv lookup", () => {
  const root = fixtureRoot();
  const bin = mkdtempSync(join(tmpdir(), "autoplan-gh-bin-"));
  const oldPath = process.env.PATH;
  const oldToken = process.env.GH_TOKEN;
  try {
    const ghPath = join(bin, "gh");
    writeFileSync(
      ghPath,
      `#!/bin/sh
printf "%s" "$GH_TOKEN" > "$PWD/gh-token.txt"
printf "true\\n"
`
    );
    chmodSync(ghPath, 0o755);
    process.env.PATH = `${bin}:${oldPath ?? ""}`;
    process.env.GH_TOKEN = "token-from-env";

    const result = verifyGitHubRepoPrivacy("owner/repo", root);
    assert.equal(result.ok, true);
    assert.equal(result.repo.private, true);
    assert.equal(result.repo.visibilityVerified, true);
    assert.equal(readFileSync(join(root, "gh-token.txt"), "utf8"), "token-from-env");
  } finally {
    if (oldPath === undefined) delete process.env.PATH;
    else process.env.PATH = oldPath;
    if (oldToken === undefined) delete process.env.GH_TOKEN;
    else process.env.GH_TOKEN = oldToken;
    rmSync(root, { recursive: true, force: true });
    rmSync(bin, { recursive: true, force: true });
  }
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
  assert.equal(
    processBrokerRequest({ id: "4b", action: "screenshotAudit", args: ["http://127.0.0.1:4177", "--output", "package.json"] }, state).error,
    "screenshot-output-not-allowed"
  );
  assert.equal(
    processBrokerRequest({ id: "4c", action: "screenshotAudit", args: ["file:///Users/kylemetzger/private-path", "--output", "evidence/autoplan/screenshot.json"] }, state)
      .error,
    "screenshot-url-protocol-blocked"
  );
  assert.equal(
    processBrokerRequest({ id: "4d", action: "screenshotAudit", args: ["https://example.test/", "--output", "evidence/autoplan/screenshot.json"] }, state).error,
    "screenshot-url-host-blocked"
  );
  assert.equal(
    processBrokerRequest({
      id: "4e",
      action: "screenshotAudit",
      args: ["http://127.0.0.1:4177/?access_token=secret", "--output", "evidence/autoplan/screenshot.json"],
    }).error,
    "disallowed-env-blocked"
  );
  assert.equal(
    processBrokerRequest({ id: "4f", action: "screenshotAudit", args: ["http://127.0.0.1:4177", "--output", "evidence/autoplan/browser-smoke.json"] }).error,
    "screenshot-output-reserved"
  );
  assert.equal(processBrokerRequest({ id: "4", action: "scaffold", args: ["rm -rf ."] }, state).error, "destructive-token-blocked");
  assert.equal(processBrokerRequest({ id: "5", action: "verify", args: ["ignored"] }, state).error, "unexpected-args");
  assert.equal(processBrokerRequest({ id: "new-id-same-work", action: "verify", args: [] }, state).error, "duplicate-job");

  const refresh = processBrokerRequest({ id: "refresh", action: "refreshBoard", args: [] }, state);
  assert.equal(refresh.ok, true);
  assert.equal(existsSync(join(repoRoot, refresh.job.argv[1])), true);

  const scriptRun = spawnSync("node", [refresh.job.argv[1]], { cwd: repoRoot, encoding: "utf8" });
  assert.equal(scriptRun.status, 0, scriptRun.stderr);
});

test("screenshot URL validation allows loopback and blocks sensitive destinations", () => {
  assert.equal(validateScreenshotUrl("http://127.0.0.1:4177").ok, true);
  assert.equal(validateScreenshotUrl("https://localhost:4177/board").ok, true);
  assert.equal(validateScreenshotUrl("ftp://127.0.0.1/file").error, "screenshot-url-protocol-blocked");
  assert.equal(validateScreenshotUrl("https://example.test/").error, "screenshot-url-host-blocked");
  assert.equal(validateScreenshotUrl("http://127.0.0.1:4177/?session_id=123").error, "screenshot-url-sensitive-query-blocked");
});

test("screenshot output validation only allows non-reserved Autoplan evidence files", () => {
  assert.equal(validateScreenshotOutput("evidence/autoplan/screenshot-request.json").ok, true);
  assert.equal(validateScreenshotOutput("package.json").error, "screenshot-output-not-allowed");
  assert.equal(validateScreenshotOutput("evidence/autoplan/../ship-gate.json").error, "screenshot-output-not-allowed");
  assert.equal(validateScreenshotOutput("evidence/autoplan/.hidden.json").error, "screenshot-output-not-allowed");
  assert.equal(validateScreenshotOutput("evidence/autoplan/ship-gate.json").error, "screenshot-output-reserved");
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

test("broker blocks write-producing actions when public repo fixture mode is off", async () => {
  const state = { seen: new Set(), running: new Set() };
  const result = await executeBrokerJob(
    { id: "public-real-write", action: "refreshBoard", args: [] },
    { root: repoRoot, repo: { private: false }, fixtureMode: false, state }
  );
  assert.equal(result.ok, false);
  assert.equal(result.error, "repo-public-real-persistence-blocked");
  assert.equal(state.seen.size, 0);

  const repeat = await executeBrokerJob({ id: "public-real-write-repeat", action: "refreshBoard", args: [] }, { root: repoRoot, repo: { private: false }, fixtureMode: false, state });
  assert.equal(repeat.ok, false);
  assert.equal(repeat.error, "repo-public-real-persistence-blocked");

  const unverifiedPrivate = await executeBrokerJob(
    { id: "private-unverified-write", action: "refreshBoard", args: [] },
    { root: repoRoot, repo: { private: true }, fixtureMode: false, state: { seen: new Set(), running: new Set() } }
  );
  assert.equal(unverifiedPrivate.ok, false);
  assert.equal(unverifiedPrivate.error, "repo-privacy-unverified-real-persistence-blocked");

  const busyState = { seen: new Set(), running: new Set(["refreshBoard"]) };
  const busy = await executeBrokerJob({ id: "busy-refresh", action: "refreshBoard", args: [] }, { root: repoRoot, state: busyState });
  assert.equal(busy.ok, false);
  assert.equal(busy.error, "action-lock-busy");
  assert.equal(busyState.seen.size, 0);
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
    const fakeSmoke = `
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const evidence = join(process.cwd(), "evidence", "autoplan");
mkdirSync(evidence, { recursive: true });
function png(width, height) {
  const buffer = Buffer.alloc(2048);
  Buffer.from("89504e470d0a1a0a", "hex").copy(buffer, 0);
  buffer.writeUInt32BE(13, 8);
  buffer.write("IHDR", 12, "ascii");
  buffer.writeUInt32BE(width, 16);
  buffer.writeUInt32BE(height, 20);
  buffer[24] = 8;
  buffer[25] = 2;
  buffer.write("IEND", 37, "ascii");
  return buffer;
}
writeFileSync(join(evidence, "desktop.png"), png(1440, 900));
writeFileSync(join(evidence, "mobile.png"), png(390, 844));
writeFileSync(join(evidence, "browser-smoke.json"), JSON.stringify({ ok: true, implementedSlices: 15, fixtureChainStatus: "local-complete" }));
`;
    writeFileSync(join(root, "fake-browser-smoke.mjs"), fakeSmoke);
    writeFileSync(
      join(root, "package.json"),
      JSON.stringify({
        scripts: {
          verify: "node -e \"process.exit(0)\"",
          "dashboard:verify": "node -e \"process.exit(0)\"",
          "dashboard:smoke": "node fake-browser-smoke.mjs",
        },
      })
    );
    writeFileSync(join(root, "package-lock.json"), JSON.stringify({ lockfileVersion: 3, packages: { "": {} } }));
    mkdirSync(join(root, "tools", "autoplan-board", "src"), { recursive: true });
    mkdirSync(join(root, "tools", "autoplan-board", "tests"), { recursive: true });
    mkdirSync(join(root, "tools", "autoplan-board", "public"), { recursive: true });
    mkdirSync(join(root, "tools"), { recursive: true });
    mkdirSync(join(root, "scripts"), { recursive: true });
    mkdirSync(join(root, "bin"), { recursive: true });
    writeFileSync(join(root, ".gitignore"), ".autoplan-board/\n");
    writeFileSync(join(root, "tools", "autoplan-board", "package.json"), "{}");
    writeFileSync(join(root, "tools", "autoplan-board", "src", "core.mjs"), "");
    writeFileSync(join(root, "tools", "autoplan-board", "src", "server.mjs"), "");
    writeFileSync(join(root, "tools", "autoplan-board", "src", "ui.mjs"), "");
    writeFileSync(join(root, "tools", "autoplan-board", "public", "app.js"), "");
    writeFileSync(join(root, "tools", "autoplan-board", "tests", "core.test.mjs"), "");
    writeFileSync(join(root, "tools", "autoplan-board", "tests", "server.test.mjs"), "");
    writeFileSync(join(root, "tools", "scaffold.js"), "");
    writeFileSync(join(root, "scripts", "verify-repo.mjs"), "");
    writeFileSync(join(root, "scripts", "ship-gate.mjs"), "");
    writeFileSync(join(root, "scripts", "screenshot.js"), "");
    writeFileSync(join(root, "bin", "advance-phase.sh"), "");
    mkdirSync(join(root, "evidence", "autoplan"), { recursive: true });
    writeFileSync(join(root, "evidence", "autoplan", "dashboard-smoke.json"), JSON.stringify({ ok: true }));

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
