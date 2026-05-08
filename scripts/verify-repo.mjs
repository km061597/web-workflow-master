import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
let failures = 0;

function ok(message) {
  console.log(`ok - ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`fail - ${message}`);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? ROOT,
    stdio: options.stdio ?? "pipe",
    encoding: "utf8",
  });

  if (result.status !== 0) {
    const label = [command, ...args].join(" ");
    const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    fail(`${label}${options.cwd ? ` in ${relative(ROOT, options.cwd)}` : ""}${output ? `\n${output}` : ""}`);
    return false;
  }

  return true;
}

function checkFile(path) {
  if (existsSync(resolve(ROOT, path))) ok(`${path} exists`);
  else fail(`${path} missing`);
}

function checkNodeVersion() {
  const major = Number(process.versions.node.split(".")[0]);
  if (major >= 22) ok(`Node ${process.versions.node} satisfies >=22`);
  else fail(`Node ${process.versions.node} does not satisfy >=22`);
}

function trackedFiles() {
  const result = spawnSync("git", ["ls-files"], { cwd: ROOT, encoding: "utf8" });
  if (result.status !== 0) {
    fail("git ls-files failed");
    return [];
  }
  return result.stdout.split("\n").filter(Boolean);
}

function checkJavaScriptSyntax(files) {
  const scriptFiles = files.filter((file) =>
    /(^scripts\/|^tools\/|^scaffolds\/.*\/scripts\/|\.github\/)/.test(file) &&
    /\.(mjs|js|cjs)$/.test(file)
  );

  for (const file of scriptFiles) {
    if (run("node", ["--check", file])) ok(`syntax ${file}`);
  }
}

function checkScaffolds() {
  const checks = [
    ["scaffolds/nextjs-canonical", "verify:setup"],
    ["scaffolds/local-business-template", "verify:setup"],
    ["scaffolds/astro-canonical", "validate"],
  ];

  for (const [dir, script] of checks) {
    const cwd = resolve(ROOT, dir);
    if (!existsSync(cwd)) {
      fail(`${dir} missing`);
      continue;
    }
    if (run("npm", ["run", script, "--silent"], { cwd, stdio: "pipe" })) ok(`${dir} ${script}`);
  }
}

function checkNoObviousSecrets(files) {
  const secretPatterns = [
    [/ghp_[A-Za-z0-9_]{20,}/, "GitHub token"],
    [/sk-[A-Za-z0-9]{20,}/, "OpenAI-style API key"],
    [/re_[A-Za-z0-9]{20,}/, "Resend API key"],
    [/fal-[A-Za-z0-9_-]{20,}/, "FAL API key"],
  ];

  for (const file of files) {
    if (/\.(png|jpg|jpeg|gif|webp|pdf|ico)$/.test(file)) continue;
    const content = existsSync(file) ? readFileSync(file, "utf8") : "";
    for (const [pattern, label] of secretPatterns) {
      if (pattern.test(content)) fail(`${label} pattern found in ${file}`);
    }
  }
}

function checkDocsDoNotAdvertiseMissingCommands() {
  const required = [
    ".nvmrc",
    "CODEOWNERS",
    "SECURITY.md",
    "SECRETS_AUDIT.md",
    ".github/pull_request_template.md",
    "tools/scaffold.js",
    "bin/scaffold-site.sh",
    "bin/advance-phase.sh",
    "scripts/screenshot.js",
    "scripts/responsive.js",
    "scripts/audit.js",
    "scripts/verify-repo.mjs",
    "tools/autoplan-board/scripts/browser-smoke.mjs",
    "tools/autoplan-board/scripts/refresh-board.mjs",
    "docs/AUTOPLAN_BOARD.md",
    "package.json",
    "package-lock.json",
    "scaffolds/nextjs-canonical/package-lock.json",
    "scaffolds/local-business-template/package-lock.json",
    "scaffolds/astro-canonical/package-lock.json",
  ];

  for (const path of required) checkFile(path);

  const emittedPaths = [
    "tools/scaffold.js",
    "bin/scaffold-site.sh",
    "bin/advance-phase.sh",
    "scripts/screenshot.js",
    "scripts/responsive.js",
    "scripts/audit.js",
    "npm run ship-gate",
  ];
  const docs = ["README.md", "ONBOARDING.md"];
  for (const doc of docs) {
    const content = existsSync(doc) ? readFileSync(doc, "utf8") : "";
    for (const path of emittedPaths) {
      const staleMarker = `${path} — **TODO pending owner**`;
      if (content.includes(staleMarker)) fail(`${doc} still marks emitted path as TODO: ${path}`);
    }
  }
}

console.log("Verifying web-workflow-master repository\n");

checkNodeVersion();
checkFile(".github/workflows/verify.yml");
checkDocsDoNotAdvertiseMissingCommands();

const files = trackedFiles();
checkNoObviousSecrets(files);
checkJavaScriptSyntax(files);
checkScaffolds();

if (failures > 0) {
  console.error(`\n${failures} verification failure(s).`);
  process.exit(1);
}

console.log("\nRepository verification passed.");
