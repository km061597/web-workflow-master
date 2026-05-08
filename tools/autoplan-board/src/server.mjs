import { createServer as createHttpServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

import { executeBrokerJob, getBoardSnapshot, RuntimeStore, runTelegramCommand } from "./core.mjs";
import { renderHtml } from "./ui.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const defaultRoot = join(__dirname, "..", "..", "..");

function sendJson(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  response.end(`${JSON.stringify(body)}\n`);
}

function sendText(response, status, body, type = "text/html; charset=utf-8") {
  response.writeHead(status, {
    "content-type": type,
    "cache-control": "no-store",
    "x-frame-options": "DENY",
  });
  response.end(body);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 8192) {
        reject(new Error("body-too-large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function parseFixtureMode(value) {
  if (value === undefined) return true;
  return value === "1";
}

function parseRepoPrivacy(value) {
  if (value === "1") return true;
  if (value === "0") return false;
  return false;
}

async function readJsonBody(request) {
  const raw = await readBody(request);
  try {
    return { ok: true, value: JSON.parse(raw || "{}") };
  } catch {
    return { ok: false, error: "invalid-json" };
  }
}

export async function createServer({
  root = defaultRoot,
  host = "127.0.0.1",
  port = 4177,
  fixtureMode = true,
  repo = { private: parseRepoPrivacy(process.env.AUTOPLAN_REPO_PRIVATE) },
  telegramAllowedUserId = process.env.TELEGRAM_ALLOWED_USER_ID,
} = {}) {
  const sessionToken = randomUUID();
  const brokerState = { seen: new Set() };

  const server = createHttpServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", `http://${request.headers.host ?? "127.0.0.1"}`);

      if (request.method === "GET" && url.pathname === "/") {
        return sendText(response, 200, renderHtml(getBoardSnapshot({ root, repo, fixtureMode })));
      }
      if (request.method === "GET" && url.pathname === "/api/health") {
        return sendJson(response, 200, {
          ok: true,
          loopbackOnly: true,
          root,
          tokenHeader: "x-autoplan-token",
        });
      }
      if (request.method === "GET" && url.pathname === "/api/board") {
        return sendJson(response, 200, getBoardSnapshot({ root, repo, fixtureMode }));
      }
      if (request.method === "GET" && url.pathname === "/styles.css") {
        return sendText(response, 200, readFileSync(join(publicDir, "styles.css"), "utf8"), "text/css; charset=utf-8");
      }
      if (request.method === "GET" && url.pathname === "/app.js") {
        return sendText(response, 200, readFileSync(join(publicDir, "app.js"), "utf8"), "text/javascript; charset=utf-8");
      }
      if (request.method === "POST" && url.pathname === "/api/broker") {
        const origin = request.headers.origin ?? "";
        if (origin && !origin.startsWith(`http://${host}:`)) return sendJson(response, 403, { ok: false, error: "origin-blocked" });
        if (request.headers["x-autoplan-token"] !== sessionToken) return sendJson(response, 403, { ok: false, error: "csrf-token-invalid" });
        const parsed = await readJsonBody(request);
        if (!parsed.ok) return sendJson(response, 400, { ok: false, error: parsed.error });
        return sendJson(response, 200, await executeBrokerJob(parsed.value, { root, state: brokerState }));
      }
      if (request.method === "POST" && url.pathname === "/api/telegram") {
        const origin = request.headers.origin ?? "";
        if (origin && !origin.startsWith(`http://${host}:`)) return sendJson(response, 403, { ok: false, error: "origin-blocked" });
        if (request.headers["x-autoplan-token"] !== sessionToken) return sendJson(response, 403, { ok: false, error: "csrf-token-invalid" });
        const parsed = await readJsonBody(request);
        if (!parsed.ok) return sendJson(response, 400, { ok: false, error: parsed.error });
        const telegramResult = runTelegramCommand(parsed.value, { allowedUserId: telegramAllowedUserId });
        if (telegramResult.auditEvent) new RuntimeStore(root).writeAudit(telegramResult.auditEvent);
        return sendJson(response, 200, telegramResult);
      }

      return sendJson(response, 404, { ok: false, error: "not-found" });
    } catch (error) {
      return sendJson(response, 500, { ok: false, error: "internal-error", message: error.message });
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, resolve);
  });

  return {
    server,
    sessionToken,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.AUTOPLAN_BOARD_PORT ?? 4177);
  const app = await createServer({ port, fixtureMode: parseFixtureMode(process.env.AUTOPLAN_FIXTURE_MODE) });
  const address = app.server.address();
  console.log(`Autoplan Board listening on http://127.0.0.1:${address.port}`);
}
