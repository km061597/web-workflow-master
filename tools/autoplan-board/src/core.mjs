import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

export const SLICE_IDS = Array.from({ length: 15 }, (_, index) => `S${String(index + 1).padStart(2, "0")}`);

export const SLICES = [
  ["S01", "Private-Repo Safety Gate", "high", "HITL", "Dashboard runs with fixtures but refuses real prospect/client persistence while repo is public."],
  ["S02", "Isolated Board Package Boot", "medium", "AFK", "Loopback-only dashboard shell starts with design tokens and health status."],
  ["S03", "Runtime State And Audit Store", "high", "AFK", ".autoplan-board stores cards, jobs, caches, logs, and audit events."],
  ["S04", "Workflow Master Read Adapter", "medium", "AFK", "Board shows scaffolds, scripts, CI, verify, and protection status."],
  ["S05", "Prospect Artifact Model", "high", "HITL", "Fixture prospects record appears as a staged pipeline card."],
  ["S06", "Live Board UI And Card Detail", "medium", "AFK", "Cards render live and open detail views with evidence, jobs, blockers, and links."],
  ["S07", "Safe Broker Core", "high", "AFK", "One allowlisted action runs with fixed argv, locks, logs, timeout, redaction, and audit."],
  ["S08", "Verify Action End-To-End", "high", "AFK", "npm run verify runs from the board and updates card/job/audit state."],
  ["S09", "Autoplan Controller Sidecars", "high", "AFK", "Autoplan verdict sidecars advance or block cards based on evidence."],
  ["S10", "Autonomous Prospect Chain Kickoff", "high", "HITL", "One kickoff starts a fixture prospect chain and pauses only on blockers/gates."],
  ["S11", "Scaffold-To-Site Stage", "high", "AFK", "Chain calls existing scaffold scripts and attaches generated site evidence."],
  ["S12", "Audit And Evidence Gate", "high", "AFK", "Screenshot, responsive, audit, and ship-gate evidence controls deploy-ready movement."],
  ["S13", "Agent-Board Bridge", "medium", "AFK", "Existing agent-board activity appears as context; tests prove no relaunch path."],
  ["S14", "Telegram Control Plane", "high", "HITL", "Allowlisted Telegram user controls typed dashboard actions with audit logs."],
  ["S15", "Full Local Integration Gate", "high", "HITL", "Fixture prospect completes local prospect-to-site chain with final verification passing."],
].map(([id, title, risk, mode, goal]) => ({
  id,
  title,
  risk,
  mode,
  goal,
  reviewRequired: ["S01", "S03", "S07", "S09", "S10", "S12", "S14", "S15"].includes(id),
}));

export const BROKER_ACTIONS = new Set([
  "scaffold",
  "verify",
  "shipGate",
  "advancePhase",
  "screenshotAudit",
  "refreshGithub",
  "refreshBoard",
]);

export const PROSPECT_COLUMNS = [
  { id: "researched", label: "Researched", stages: ["intake", "evidence", "researched"] },
  { id: "spec", label: "Spec'd", stages: ["designed", "spec", "grounded-proposal"] },
  { id: "built", label: "Built", stages: ["built", "packaged"] },
  { id: "audit", label: "Audit", stages: ["audit", "verified"] },
  { id: "deploy-ready", label: "Deploy-ready", stages: ["deploy-ready", "ship-ready"] },
  { id: "signed", label: "Signed", stages: ["signed-client", "signed"] },
  { id: "active", label: "Active", stages: ["active-client", "active"] },
];

const SITE_COLUMNS = ["intake", "brief", "design", "build", "audit", "ship-ready", "maintain"].map((id) => ({
  id,
  label: titleCase(id),
  cards: [],
}));

const AUTOPLAN_COLUMNS = ["intake", "review", "verdict", "blocked", "advanced", "ready"].map((id) => ({
  id,
  label: titleCase(id),
  cards: [],
}));

const DESTRUCTIVE_TOKEN = /\b(rm|reset|checkout|clean|delete|drop|truncate|curl|wget|ssh|scp|osascript|open)\b/i;
const PATH_TRAVERSAL = /(^|[\\/])\.\.([\\/]|$)/;
const ABSOLUTE_PATH = /^(\/|~\/|[A-Za-z]:[\\/])/;
const SECRET_PATTERN = /(TOKEN|SECRET|KEY|PASSWORD)=/i;
const REDACT_PATTERN = /(TOKEN|SECRET|KEY|PASSWORD)(=|:)[^\s"']+/gi;
const NO_ARG_ACTIONS = new Set(["verify", "shipGate", "refreshGithub", "refreshBoard"]);
const WRITE_ACTIONS = new Set(["scaffold", "shipGate", "advancePhase", "screenshotAudit", "refreshBoard"]);

function titleCase(value) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readJson(path) {
  try {
    return { ok: true, value: JSON.parse(readFileSync(path, "utf8")) };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

function listManifestPaths(root, folder) {
  const base = join(root, folder);
  if (!existsSync(base)) return [];
  return readdirSync(base)
    .filter((name) => !name.startsWith("."))
    .map((name) => join(base, name, "workflow-manifest.json"))
    .filter((path) => existsSync(path) && statSync(path).isFile());
}

function normalizeColumn(stage, confidence) {
  const raw = String(stage ?? confidence ?? "intake").toLowerCase();
  return PROSPECT_COLUMNS.find((column) => column.stages.includes(raw))?.id ?? "researched";
}

function normalizeCard(root, path, type) {
  const parsed = readJson(path);
  const slug = path.split("/").at(-2);
  if (!parsed.ok) {
    return {
      id: `${type}:${slug}`,
      type,
      slug,
      name: slug,
      stage: "invalid-json",
      column: "researched",
      confidence: "unknown",
      updatedAt: null,
      evidence: [],
      blockers: [`Invalid manifest JSON: ${parsed.error}`],
      manifestPath: relative(root, path),
    };
  }

  const manifest = parsed.value;
  const outputs = manifest.outputs ?? {};
  const gates = manifest.gates ?? {};
  const evidence = Object.entries(outputs)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`)
    .concat(Object.entries(gates).map(([key, value]) => `${key}: ${value.status ?? value}`));

  return {
    id: `${type}:${slug}`,
    type,
    slug,
    name: manifest.businessName ?? manifest.inputs?.businessName?.value ?? slug,
    stage: manifest.stage ?? "intake",
    column: normalizeColumn(manifest.stage, manifest.confidence),
    confidence: manifest.confidence ?? "speculative-concept",
    tier: manifest.tier ?? manifest.inputs?.tier?.value ?? "unassigned",
    updatedAt: manifest.updatedAt ?? manifest.createdAt ?? null,
    evidence,
    blockers: manifest.missingInputs ?? [],
    manifestPath: relative(root, path),
  };
}

function scanCards(root) {
  const resolvedRoot = resolve(root);
  const prospects = listManifestPaths(resolvedRoot, "prospects").map((path) => normalizeCard(resolvedRoot, path, "prospect"));
  const clients = listManifestPaths(resolvedRoot, "clients").map((path) => normalizeCard(resolvedRoot, path, "client"));
  return prospects.concat(clients).sort((a, b) => a.name.localeCompare(b.name));
}

function fixtureCards() {
  return [
    {
      id: "fixture:lemons-jewelers",
      type: "fixture",
      slug: "lemons-jewelers",
      name: "Lemons Jewelers",
      stage: "audit",
      column: "audit",
      confidence: "grounded-proposal",
      tier: "standard",
      updatedAt: "2026-05-08T12:00:00.000Z",
      evidence: ["workflow-manifest.json", "evidence-ledger.md", "audit: pending"],
      blockers: ["HITL approval required before external deploy"],
      manifestPath: "prospects/lemons-jewelers/workflow-manifest.json",
    },
  ];
}

export function evaluatePrivacyGate({ private: isPrivate, fixtureMode = false } = {}) {
  if (isPrivate === false && !fixtureMode) return { ok: false, reason: "repo-public-real-persistence-blocked" };
  if (isPrivate === false && fixtureMode) return { ok: true, reason: "public-repo-fixture-mode" };
  if (isPrivate === true) return { ok: true, reason: "private-repo" };
  return { ok: true, reason: "repo-privacy-unknown-read-only" };
}

function buildProspectPipeline(cards) {
  return PROSPECT_COLUMNS.map((column) => ({
    ...column,
    cards: cards.filter((card) => card.column === column.id),
  }));
}

function buildAutoplanReview(sidecars = [], slices = SLICES) {
  return AUTOPLAN_COLUMNS.map((column) => ({
    ...column,
    cards: [
      ...sidecars
        .filter((sidecar) => sidecar.column === column.id)
        .map((sidecar) => ({
          id: `autoplan:${sidecar.id}`,
          name: sidecar.title,
          stage: sidecar.verdict,
          risk: sidecar.risk ?? "high",
          mode: sidecar.mode ?? "AFK",
          evidence: sidecar.evidence ?? [],
          blockers: sidecar.blockers ?? [],
        })),
      ...(column.id === "ready"
        ? slices.map((slice) => ({
            id: `slice:${slice.id}`,
            name: `${slice.id}: ${slice.title}`,
            stage: "ready",
            risk: slice.risk,
            mode: slice.mode,
            evidence: [slice.goal],
            blockers: slice.reviewRequired ? ["external review required"] : [],
          }))
        : []),
    ],
  }));
}

function readAutoplanSidecars(root) {
  const dir = join(root, ".autoplan-board", "autoplan-runs");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => readJson(join(dir, name)))
    .filter((parsed) => parsed.ok)
    .map((parsed) => {
      const run = parsed.value;
      const verdict = String(run.verdict ?? "review");
      const column = verdict === "blocked" ? "blocked" : verdict === "advanced" ? "advanced" : verdict === "ready" ? "ready" : "review";
      return {
        id: run.id ?? run.sliceId ?? "run",
        title: run.title ?? `${run.sliceId ?? "Autoplan"} verdict`,
        verdict,
        column,
        risk: run.risk,
        mode: run.mode,
        evidence: run.evidence ?? [],
        blockers: run.blockers ?? [],
      };
    });
}

function readRuntimeOperations(root) {
  const store = new RuntimeStore(root);
  const jobs = store.readJsonl("jobs.jsonl").slice(-25);
  const auditTrail = store.readJsonl("audit-events.jsonl").slice(-25).reverse();
  const byStatus = (status) => jobs.filter((job) => job.status === status);
  return {
    queued: byStatus("queued"),
    running: byStatus("running"),
    paused: byStatus("paused"),
    canceled: byStatus("canceled"),
    succeeded: byStatus("succeeded"),
    failed: byStatus("failed"),
    auditTrail,
  };
}

function readAgentBoardBridge(root) {
  const candidates = [join(root, ".agent-board", "activity.json"), join(root, ".agent-board", "status.json")];
  const path = candidates.find((candidate) => existsSync(candidate));
  if (!path) {
    return {
      status: "unavailable",
      mode: "read-only/context-bridge",
      evidence: ["no local .agent-board cache found", "no relaunch path configured"],
      activities: [],
    };
  }
  const parsed = readJson(path);
  if (!parsed.ok) {
    return {
      status: "degraded",
      mode: "read-only/context-bridge",
      evidence: [`invalid agent-board cache: ${parsed.error}`],
      activities: [],
    };
  }
  return {
    status: "available",
    mode: "read-only/context-bridge",
    evidence: [relative(root, path)],
    activities: Array.isArray(parsed.value.activities) ? parsed.value.activities.slice(0, 10) : [],
  };
}

function buildFixtureChain(cards, operations) {
  const card = cards[0] ?? fixtureCards()[0];
  const latestSucceeded = (action) => [...operations.succeeded].reverse().find((job) => job.action === action);
  const verifyJob = latestSucceeded("verify");
  const refreshJob = latestSucceeded("refreshBoard");
  const shipGateJob = latestSucceeded("shipGate");
  const hasVerify = Boolean(verifyJob);
  const hasRefresh = Boolean(refreshJob);
  const hasShipGate = Boolean(shipGateJob);
  const sourcedEvidence = (action, job) => `${action}: succeeded${job?.source ? ` (${job.source})` : ""}`;
  return {
    id: "fixture-prospect-to-site",
    cardId: card.id,
    status: hasVerify && hasShipGate ? "local-complete" : "paused",
    currentStage: hasVerify && hasShipGate ? "ship-ready" : card.stage,
    kickoffAction: "scaffold",
    stages: ["researched", "spec", "scaffold", "audit", "ship-ready"],
    evidence: [
      card.manifestPath,
      hasRefresh ? sourcedEvidence("refreshBoard", refreshJob) : "refreshBoard: pending",
      hasVerify ? sourcedEvidence("verify", verifyJob) : "verify: pending",
      hasShipGate ? sourcedEvidence("shipGate", shipGateJob) : "shipGate: pending",
      "external deploy: HITL blocked",
    ],
    blockers: hasVerify && hasShipGate ? ["external deploy requires human approval"] : ["local verify and ship gate must complete from broker"],
  };
}

function hasFile(root, path) {
  return existsSync(join(root, path));
}

function deriveSlices(root, privacy, cards, operations, sidecars, chain, agentBoard) {
  const hasCoreTests = hasFile(root, "tools/autoplan-board/tests/core.test.mjs");
  const hasServerTests = hasFile(root, "tools/autoplan-board/tests/server.test.mjs");
  const hasBrokerSurfaces =
    BROKER_ACTIONS.size === 7 &&
    hasFile(root, "tools/autoplan-board/src/core.mjs") &&
    hasCoreTests &&
    hasFile(root, "tools/scaffold.js") &&
    hasFile(root, "scripts/verify-repo.mjs") &&
    hasFile(root, "scripts/ship-gate.mjs") &&
    hasFile(root, "scripts/screenshot.js") &&
    hasFile(root, "bin/advance-phase.sh");
  const hasShipGateEvidence =
    hasFile(root, "evidence/autoplan/ship-gate.json") &&
    hasFile(root, "evidence/autoplan/dashboard-smoke.json") &&
    hasFile(root, "evidence/autoplan/desktop.png") &&
    hasFile(root, "evidence/autoplan/mobile.png");
  const hasVerifySucceeded = chain.evidence.some((entry) => entry.startsWith("verify: succeeded"));
  const hasShipGateSucceeded = chain.evidence.some((entry) => entry.startsWith("shipGate: succeeded"));
  const codeEvidence = {
    S01: privacy.ok,
    S02: hasFile(root, "tools/autoplan-board/package.json") && hasFile(root, "tools/autoplan-board/src/server.mjs"),
    S03: hasFile(root, ".gitignore") && readFileSync(join(root, ".gitignore"), "utf8").includes(".autoplan-board/"),
    S04: hasFile(root, "package.json") && hasFile(root, "scripts/verify-repo.mjs"),
    S05: cards.length > 0,
    S06: hasFile(root, "tools/autoplan-board/src/ui.mjs") && hasFile(root, "tools/autoplan-board/public/app.js"),
    S07: hasBrokerSurfaces,
    S08: hasServerTests && hasFile(root, "tools/autoplan-board/src/server.mjs") && operations.succeeded.some((job) => job.action === "verify"),
    S09: sidecars.length > 0,
    S10: hasVerifySucceeded && hasShipGateSucceeded,
    S11: hasFile(root, "tools/scaffold.js") && BROKER_ACTIONS.has("scaffold"),
    S12: hasFile(root, "scripts/ship-gate.mjs") && hasShipGateEvidence,
    S13: agentBoard.mode === "read-only/context-bridge",
    S14: hasFile(root, "tools/autoplan-board/src/server.mjs") && hasServerTests,
    S15: chain.status === "local-complete" && hasShipGateEvidence,
  };
  return SLICES.map((slice) => ({
    ...slice,
    status: codeEvidence[slice.id] ? "implemented" : "pending",
  }));
}

function readRepoHealth(root) {
  const packageJson = readJson(join(root, "package.json"));
  const scripts = packageJson.ok ? Object.keys(packageJson.value.scripts ?? {}) : [];

  return {
    packageName: packageJson.ok ? packageJson.value.name : "unknown",
    hasVerify: scripts.includes("verify"),
    hasDashboardVerify: scripts.includes("dashboard:verify"),
    scripts,
    branchProtection: "unknown",
    githubMode: "read-only/cache-only",
  };
}

export function getBoardSnapshot({ root = process.cwd(), repo = {}, fixtureMode = false } = {}) {
  const privacy = evaluatePrivacyGate({ private: repo.private, fixtureMode });
  const scannedCards = scanCards(root);
  const cards = scannedCards.length > 0 ? scannedCards : fixtureMode ? fixtureCards() : [];
  const highRisk = SLICES.filter((slice) => slice.reviewRequired).map((slice) => slice.id);
  const operations = readRuntimeOperations(root);
  const sidecars = readAutoplanSidecars(root);
  const chain = buildFixtureChain(cards, operations);
  const agentBoard = readAgentBoardBridge(root);
  const slices = deriveSlices(root, privacy, cards, operations, sidecars, chain, agentBoard);

  return {
    generatedAt: new Date().toISOString(),
    root: resolve(root),
    privacy,
    slices,
    boards: {
      prospectPipeline: buildProspectPipeline(cards),
      siteLifecycle: SITE_COLUMNS,
      autoplanReview: buildAutoplanReview(sidecars, slices),
      workflowMaster: readRepoHealth(root),
      operations,
      agentBoard,
      fixtureChain: chain,
    },
    gates: {
      totalSlices: SLICES.length,
      implementedSlices: slices.filter((slice) => slice.status === "implemented").length,
      highRiskReviewRequired: highRisk,
      packageCount: cards.length,
      brokerActions: [...BROKER_ACTIONS],
      fixtureChainStatus: chain.status,
    },
  };
}

export function buildBoardRefreshSummary(snapshot, refreshedAt = new Date().toISOString()) {
  return {
    ok: true,
    refreshedAt,
    privacy: snapshot.privacy,
    brokerActions: snapshot.gates.brokerActions,
    sliceCount: snapshot.slices.length,
    implementedSlices: snapshot.gates.implementedSlices,
    fixtureChainStatus: snapshot.gates.fixtureChainStatus,
    prospectCards: snapshot.boards.prospectPipeline.reduce((count, column) => count + column.cards.length, 0),
    autoplanCards: snapshot.boards.autoplanReview.reduce((count, column) => count + column.cards.length, 0),
  };
}

export class RuntimeStore {
  constructor(root = process.cwd()) {
    this.root = resolve(root);
    this.dir = join(this.root, ".autoplan-board");
    mkdirSync(this.dir, { recursive: true });
  }

  nextJobId() {
    const path = join(this.dir, "jobs.jsonl");
    if (!existsSync(path)) return "job-000001";
    const count = readFileSync(path, "utf8").split("\n").filter(Boolean).length + 1;
    return `job-${String(count).padStart(6, "0")}`;
  }

  writeJsonl(name, entry) {
    const path = join(this.dir, name);
    writeFileSync(path, `${JSON.stringify(entry)}\n`, { flag: "a" });
    return entry;
  }

  writeJob(job) {
    const entry = { id: this.nextJobId(), createdAt: new Date().toISOString(), ...job };
    return this.writeJsonl("jobs.jsonl", entry);
  }

  writeAudit(event) {
    const entry = { createdAt: new Date().toISOString(), ...event };
    return this.writeJsonl("audit-events.jsonl", entry);
  }

  readJsonl(name) {
    const path = join(this.dir, name);
    if (!existsSync(path)) return [];
    return readFileSync(path, "utf8")
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return { status: "invalid-jsonl", raw: line };
        }
      });
  }
}

export function processBrokerRequest(request, state = { seen: new Set() }) {
  const action = String(request?.action ?? "");
  const args = Array.isArray(request?.args) ? request.args.map(String) : [];
  const id = String(request?.id ?? `${action}:${args.join("|")}`);
  const dedupeKey = `${action}:${args.join("|")}`;
  const joined = args.join(" ");

  if (!BROKER_ACTIONS.has(action)) return { ok: false, error: "unsupported-action" };
  if (NO_ARG_ACTIONS.has(action) && args.length > 0) return { ok: false, error: "unexpected-args" };
  if (state.seen.has(dedupeKey)) return { ok: false, error: "duplicate-job" };
  if (args.some((arg) => PATH_TRAVERSAL.test(arg))) return { ok: false, error: "path-traversal-blocked" };
  if (args.some((arg) => ABSOLUTE_PATH.test(arg))) return { ok: false, error: "absolute-path-blocked" };
  if (DESTRUCTIVE_TOKEN.test(joined)) return { ok: false, error: "destructive-token-blocked" };
  if (SECRET_PATTERN.test(joined)) return { ok: false, error: "disallowed-env-blocked" };
  if (joined.length > 4096) return { ok: false, error: "output-cap-blocked" };

  const actionValidation = validateBrokerActionArgs(action, args);
  if (!actionValidation.ok) return actionValidation;

  let argv;
  try {
    argv = commandMap(action, args);
  } catch {
    return { ok: false, error: "broker-action-unavailable" };
  }

  state.seen.add(dedupeKey);
  return {
    ok: true,
    job: {
      id,
      action,
      args,
      dedupeKey,
      argv,
      timeoutMs: 120000,
      outputCapBytes: 65536,
      cwd: "repo-root",
    },
  };
}

export async function executeBrokerJob(request, options = {}) {
  const root = resolve(options.root ?? process.cwd());
  const state = options.state ?? { seen: new Set(), running: new Set() };
  if (!state.seen) state.seen = new Set();
  if (!state.running) state.running = new Set();

  const queued = processBrokerRequest(request, state);
  if (!queued.ok) return queued;

  const job = queued.job;
  const privacy = evaluatePrivacyGate({
    private: options.repo?.private,
    fixtureMode: options.fixtureMode ?? true,
  });
  if (!privacy.ok && WRITE_ACTIONS.has(job.action)) {
    return { ok: false, error: privacy.reason };
  }

  if (state.running.has(job.action)) return { ok: false, error: "action-lock-busy" };

  const store = options.store ?? new RuntimeStore(root);
  const storedJob = store.writeJob({ ...job, status: "running", startedAt: new Date().toISOString() });
  store.writeAudit({ type: "broker.job.started", jobId: storedJob.id, action: job.action });
  state.running.add(job.action);

  try {
    const result = await runFixedArgv(job.argv, {
      cwd: root,
      timeoutMs: job.timeoutMs,
      outputCapBytes: job.outputCapBytes,
    });
    const status = result.exitCode === 0 ? "succeeded" : "failed";
    store.writeJob({ id: storedJob.id, action: job.action, status, exitCode: result.exitCode, timedOut: result.timedOut });
    store.writeAudit({ type: `broker.job.${status}`, jobId: storedJob.id, action: job.action, exitCode: result.exitCode });
    return { ok: status === "succeeded", job: { ...storedJob, status, exitCode: result.exitCode }, result };
  } finally {
    state.running.delete(job.action);
    state.seen.delete(job.dedupeKey);
  }
}

function runFixedArgv(argv, { cwd, timeoutMs, outputCapBytes }) {
  return new Promise((resolve) => {
    const [command, ...args] = argv;
    const child = spawn(command, args, {
      cwd,
      shell: false,
      env: sanitizedEnv(),
      stdio: ["ignore", "pipe", "pipe"],
      detached: process.platform !== "win32",
    });

    let output = "";
    let timedOut = false;
    const append = (chunk) => {
      output += chunk.toString();
      if (output.length > outputCapBytes) {
        output = output.slice(0, outputCapBytes);
        if (!child.killed) child.kill("SIGTERM");
      }
    };
    const timer = setTimeout(() => {
      timedOut = true;
      if (process.platform !== "win32" && child.pid) {
        try {
          process.kill(-child.pid, "SIGTERM");
        } catch {
          child.kill("SIGTERM");
        }
      } else {
        child.kill("SIGTERM");
      }
    }, timeoutMs);

    child.stdout.on("data", append);
    child.stderr.on("data", append);
    child.on("error", (error) => {
      clearTimeout(timer);
      resolve({ exitCode: 127, timedOut, output: redactOutput(error.message) });
    });
    child.on("close", (exitCode) => {
      clearTimeout(timer);
      resolve({ exitCode, timedOut, output: redactOutput(output) });
    });
  });
}

function sanitizedEnv() {
  return Object.fromEntries(
    ["HOME", "PATH", "TMPDIR", "TEMP", "TMP", "USER", "LOGNAME"]
      .filter((key) => process.env[key])
      .map((key) => [key, process.env[key]])
  );
}

function redactOutput(output) {
  return output.replace(REDACT_PATTERN, "$1$2[redacted]");
}

function commandMap(action, args) {
  const githubRepo = process.env.AUTOPLAN_GITHUB_REPO ?? "metzgerwebsites/web-workflow-master";
  const map = {
    scaffold: ["node", "tools/scaffold.js", ...args],
    verify: ["npm", "run", "verify"],
    shipGate: ["npm", "run", "ship-gate"],
    advancePhase: ["bin/advance-phase.sh", ...args],
    screenshotAudit: ["node", "scripts/screenshot.js", ...args],
    refreshGithub: ["gh", "api", `repos/${githubRepo}`],
    refreshBoard: ["node", "tools/autoplan-board/scripts/refresh-board.mjs"],
  };
  const argv = map[action];
  if (!argv) throw new Error(`No command map registered for broker action: ${action}`);
  return argv;
}

function validateBrokerActionArgs(action, args) {
  if (action !== "screenshotAudit") return { ok: true };

  const outputIndex = args.indexOf("--output");
  if (outputIndex === -1 || !args[outputIndex + 1]) return { ok: false, error: "screenshot-output-required" };
  const output = args[outputIndex + 1];
  const normalized = output.replaceAll("\\", "/");
  if (!/^evidence\/autoplan\/[A-Za-z0-9._-]+\.json$/.test(normalized)) {
    return { ok: false, error: "screenshot-output-not-allowed" };
  }
  if (normalized.split("/").some((part) => part.startsWith("."))) {
    return { ok: false, error: "screenshot-output-not-allowed" };
  }
  return { ok: true };
}

export function runTelegramCommand(message, config = {}) {
  const fromId = String(message?.fromId ?? "");
  const text = String(message?.text ?? "").trim();
  const [command, target] = text.split(/\s+/);
  if (!config.allowedUserId) return { ok: false, error: "telegram-allowlist-not-configured" };
  if (fromId !== String(config.allowedUserId)) return { ok: false, error: "telegram-user-denied" };
  if (command === "/status") return { ok: true, response: "Autoplan Board: local, fixture-safe, awaiting typed actions." };
  if (command === "/pause") return { ok: true, response: "Workflow paused.", auditEvent: { type: "telegram.pause" } };
  if (command === "/resume") return { ok: true, response: "Workflow resumed.", auditEvent: { type: "telegram.resume" } };
  if (command === "/cancel") return { ok: true, response: "Workflow canceled.", auditEvent: { type: "telegram.cancel" } };
  if (command === "/run") return { ok: false, error: "telegram-raw-command-blocked" };
  if (command === "/approve") {
    if (!/^S\d{2}$|^job-\d{6}$/.test(target ?? "")) return { ok: false, error: "telegram-approval-target-invalid" };
    if (/^S\d{2}$/.test(target) && !SLICE_IDS.includes(target)) return { ok: false, error: "telegram-approval-target-unknown" };
    return { ok: true, response: `Approved ${target}.`, auditEvent: { type: "telegram.approve", target } };
  }
  return { ok: false, error: "telegram-unsupported-command" };
}

export async function pollTelegramOnce({ botToken, allowedUserId, offset = 0, root = process.cwd(), fetchImpl = fetch } = {}) {
  if (!botToken) return { ok: false, error: "telegram-token-missing", nextOffset: offset };
  const response = await fetchImpl(`https://api.telegram.org/bot${botToken}/getUpdates?timeout=0&offset=${offset}`);
  const payload = await response.json();
  const updates = Array.isArray(payload.result) ? payload.result : [];
  let nextOffset = offset;
  const store = new RuntimeStore(root);

  for (const update of updates) {
    nextOffset = Math.max(nextOffset, Number(update.update_id ?? 0) + 1);
    const message = update.message ?? {};
    const result = runTelegramCommand(
      {
        fromId: message.from?.id,
        text: message.text,
      },
      { allowedUserId }
    );
    if (result.auditEvent) store.writeAudit(result.auditEvent);
    if (message.chat?.id && result.response) {
      await fetchImpl(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ chat_id: message.chat.id, text: result.response }),
      });
    }
  }

  return { ok: true, processed: updates.length, nextOffset };
}
