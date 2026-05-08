import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "../src/server.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..", "..", "..");

async function postJson(url, body, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body,
  });
  return { response, json: await response.json() };
}

test("server binds to loopback, serves board HTML, and exposes JSON health", async () => {
  const root = mkdtempSync(join(tmpdir(), "autoplan-board-server-"));
  const app = await createServer({ root, host: "127.0.0.1", port: 0, fixtureMode: true });
  try {
    const { port, address } = app.server.address();
    assert.equal(address, "127.0.0.1");

    const base = `http://127.0.0.1:${port}`;
    const health = await fetch(`${base}/api/health`).then((response) => response.json());
    assert.equal(health.ok, true);
    assert.equal(health.loopbackOnly, true);

    const html = await fetch(base).then((response) => response.text());
    assert.match(html, /Autoplan Board/);
    assert.match(html, /data-board="prospect-pipeline"/);
    assert.match(html, /Evidence rail/);
    assert.match(html, /aria-expanded="false"/);
    assert.match(html, /name="autoplan-token"/);
    assert.match(html, /data-broker-action="verify"/);
    assert.doesNotMatch(html, /role="list"/);
  } finally {
    await app.close();
    rmSync(root, { recursive: true, force: true });
  }
});

test("server broker endpoint enforces CSRF, origin, JSON parsing, and abuse guards", async () => {
  const app = await createServer({ root: repoRoot, host: "127.0.0.1", port: 0, fixtureMode: true });
  try {
    const { port } = app.server.address();
    const base = `http://127.0.0.1:${port}`;

    const missingOrigin = await postJson(`${base}/api/broker`, JSON.stringify({ action: "verify", args: [] }));
    assert.equal(missingOrigin.response.status, 403);
    assert.equal(missingOrigin.json.error, "origin-required");

    const missingToken = await postJson(`${base}/api/broker`, JSON.stringify({ action: "verify", args: [] }), { origin: base });
    assert.equal(missingToken.response.status, 403);
    assert.equal(missingToken.json.error, "csrf-token-invalid");

    const badOrigin = await postJson(`${base}/api/broker`, JSON.stringify({ action: "verify", args: [] }), {
      "x-autoplan-token": app.sessionToken,
      origin: "http://example.test",
    });
    assert.equal(badOrigin.response.status, 403);
    assert.equal(badOrigin.json.error, "origin-blocked");

    const invalidJson = await postJson(`${base}/api/broker`, "{", { "x-autoplan-token": app.sessionToken, origin: base });
    assert.equal(invalidJson.response.status, 400);
    assert.equal(invalidJson.json.error, "invalid-json");

    const accepted = await postJson(`${base}/api/broker`, JSON.stringify({ id: "server-verify-test", action: "verify", args: [] }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(accepted.response.status, 200);
    assert.equal(accepted.json.ok, true);
    assert.equal(accepted.json.job.status, "succeeded");
    assert.match(readFileSync(join(repoRoot, ".autoplan-board", "jobs.jsonl"), "utf8"), /server-verify-test/);

    const absolutePath = await postJson(`${base}/api/broker`, JSON.stringify({ action: "screenshotAudit", args: ["/etc/passwd"] }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(absolutePath.json.error, "absolute-path-blocked");
    assert.equal(absolutePath.response.headers.has("access-control-allow-origin"), false);
  } finally {
    await app.close();
  }
});

test("server exposes allowlisted Telegram control endpoint", async () => {
  const root = mkdtempSync(join(tmpdir(), "autoplan-board-telegram-"));
  const app = await createServer({ root, host: "127.0.0.1", port: 0, fixtureMode: true, telegramAllowedUserId: "12345" });
  try {
    const { port } = app.server.address();
    const base = `http://127.0.0.1:${port}`;

    const missingOrigin = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/status" }));
    assert.equal(missingOrigin.response.status, 403);
    assert.equal(missingOrigin.json.error, "origin-required");

    const missingToken = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/status" }), { origin: base });
    assert.equal(missingToken.response.status, 403);
    assert.equal(missingToken.json.error, "csrf-token-invalid");

    const badOrigin = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/status" }), {
      "x-autoplan-token": app.sessionToken,
      origin: "http://example.test",
    });
    assert.equal(badOrigin.response.status, 403);
    assert.equal(badOrigin.json.error, "origin-blocked");

    const denied = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "999", text: "/status" }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(denied.json.error, "telegram-user-denied");

    const accepted = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/status" }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(accepted.json.ok, true);
    assert.match(accepted.json.response, /Autoplan Board/);

    const forgedApproval = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/approve S10" }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(forgedApproval.response.status, 403);
    assert.equal(forgedApproval.json.error, "telegram-http-shim-read-only");
    assert.match(readFileSync(join(root, ".autoplan-board", "audit-events.jsonl"), "utf8"), /telegram\.http_shim\.blocked/);

    const invalid = await postJson(`${base}/api/telegram`, JSON.stringify({ fromId: "12345", text: "/approve ../../bad" }), {
      "x-autoplan-token": app.sessionToken,
      origin: base,
    });
    assert.equal(invalid.json.error, "telegram-approval-target-invalid");
  } finally {
    await app.close();
    rmSync(root, { recursive: true, force: true });
  }
});

test("Telegram poller records polling failures instead of leaking unhandled rejections", async () => {
  const root = mkdtempSync(join(tmpdir(), "autoplan-board-telegram-poller-"));
  const app = await createServer({
    root,
    host: "127.0.0.1",
    port: 0,
    fixtureMode: true,
    telegramAllowedUserId: "12345",
    telegramBotToken: "token",
    telegramPollIntervalMs: 1,
    fetchImpl: async () => {
      throw new Error("telegram-down");
    },
  });

  try {
    await new Promise((resolve) => setTimeout(resolve, 25));
    const auditPath = join(root, ".autoplan-board", "audit-events.jsonl");
    assert.equal(existsSync(auditPath), true);
    assert.match(readFileSync(auditPath, "utf8"), /telegram\.poll\.failed/);
    assert.match(readFileSync(auditPath, "utf8"), /telegram-down/);
  } finally {
    await app.close();
    rmSync(root, { recursive: true, force: true });
  }
});
