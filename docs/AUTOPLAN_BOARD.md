# Autoplan Board Agent Runbook

Autoplan Board v1 is the local operator dashboard for this repository. It lives in `tools/autoplan-board/` and is linked from the root package as an npm workspace so agents can discover it with normal workspace tooling.

## Agent Entry Points

| Surface | Purpose |
| --- | --- |
| `tools/autoplan-board/package.json` | Package-local scripts: `dev`, `start`, `test`, `verify`. |
| Root `package.json` | Agent-friendly scripts: `dashboard`, `dashboard:install`, `dashboard:verify`, `dashboard:smoke`, `dashboard:refresh`, `dashboard:test`, `ship-gate`, `verify`. |
| `tools/autoplan-board/src/core.mjs` | Privacy gate, S01-S15 derivation, broker action registry, runtime store, Telegram command logic, agent-board bridge. |
| `tools/autoplan-board/src/server.mjs` | Loopback HTTP server, broker/Telegram endpoints, CSRF/Origin checks, Telegram polling. |
| `tools/autoplan-board/src/ui.mjs` | Board HTML rendering and card/action controls. |
| `tools/autoplan-board/public/app.js` | Browser card details and broker action UI. |
| `scripts/ship-gate.mjs` | Root evidence gate. Runs verify, dashboard verify, npm audit, writes runtime evidence, refreshes board snapshot. |
| `tools/autoplan-board/scripts/refresh-board.mjs` | Regenerates `evidence/autoplan/board-refresh.json` from shared board summary logic. |

## Commands

Run from the repository root unless noted.

| Task | Command | Evidence |
| --- | --- | --- |
| Start dashboard | `npm run dashboard` | Loopback URL printed by `tools/autoplan-board/src/server.mjs`; defaults to `http://127.0.0.1:4177`. |
| Verify dashboard package | `npm run dashboard:verify` | `Autoplan Board verification passed.` |
| Run package tests | `npm run dashboard:test` | Node test output. |
| Verify root repo | `npm run verify` | Root command surface, syntax, scaffold setup checks. |
| Capture required browser smoke | `npm run dashboard:smoke` | Desktop `1440x900` and mobile `390x844` PNGs plus `evidence/autoplan/browser-smoke.json`. |
| Refresh board summary only | `npm run dashboard:refresh` | `evidence/autoplan/board-refresh.json`. |
| Run final local gate | `npm run ship-gate` | Runs verify, dashboard verify, npm audit, browser smoke, evidence freshness checks, board refresh, and `evidence/autoplan/ship-gate.json`. |

`dashboard:smoke` uses Playwright Chromium. If install scripts were skipped, run `npx playwright install chromium` before the smoke gate.

## Required Evidence Files

Agents should inspect these before claiming Autoplan completion:

- `evidence/autoplan/dashboard-smoke.json`
- `evidence/autoplan/browser-smoke.json`
- `evidence/autoplan/board-refresh.json`
- `evidence/autoplan/ship-gate.json`
- `evidence/autoplan/desktop.png`
- `evidence/autoplan/mobile.png`
- `docs/reviews/autoplan-board-completion-audit.md`
- `docs/reviews/autoplan-board-external-review.md`
- `docs/reviews/autoplan-board-pr-body.md`

## Runtime State

Runtime state is local and gitignored under `.autoplan-board/`.

| Path | Meaning |
| --- | --- |
| `.autoplan-board/jobs.jsonl` | Broker and ship-gate job records. |
| `.autoplan-board/audit-events.jsonl` | Local audit events including broker, server, ship-gate, and Telegram events. |
| `.autoplan-board/autoplan-runs/*.json` | Local Autoplan sidecars, including ship-gate-stamped fixture sidecars. |

Do not commit `.autoplan-board/`. The public repository remains fixture-safe; broker write actions are blocked when the repo is public and fixture mode is off. Non-fixture write actions fail closed unless repo privacy is verified from GitHub.

## Broker Actions

The allowed broker actions are:

- `scaffold`
- `verify`
- `shipGate`
- `advancePhase`
- `screenshotAudit`
- `refreshGithub`
- `refreshBoard`

The broker runs fixed argv with `shell: false`, sanitized environment, path/destructive token rejection, output caps, timeout handling, action locks, dedupe release after completion, and audit records. Registry drift returns `broker-action-unavailable` instead of leaking an uncontrolled exception. HTTP-triggered write actions are disabled by default and require `AUTOPLAN_ENABLE_HTTP_WRITE_ACTIONS=1`; direct CLI gates such as `npm run ship-gate` remain available.

`screenshotAudit` writes screenshot-request metadata only, not PNG browser screenshots. The broker action and direct `scripts/screenshot.js` entrypoint both only accept `http:` or `https:` URLs whose host is in `AUTOPLAN_SCREENSHOT_HOST_ALLOWLIST`, reject credentialed or sensitive-query URLs before writing evidence, and restrict `--output` to non-reserved `evidence/autoplan/*.json` files. Use `npm run dashboard:smoke` for required PNG evidence. `refreshGithub` requires an authenticated `gh` CLI on `PATH`; unauthenticated agents should treat that failure as expected unless live GitHub state is in scope.

## Telegram Control

Telegram support is local/operator gated:

- HTTP test shim: `POST /api/telegram` is read-only for status checks; mutating approvals are blocked and audited as `telegram.http_shim.blocked`.
- Browser/broker endpoints require loopback Origin plus `x-autoplan-token`.
- Real operator commands are accepted through Telegram polling only.
- Bot polling only starts when all three are set: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALLOWED_USER_ID`, and `TELEGRAM_POLL_INTERVAL_MS>0`; `0` disables polling.
- Poll failures write `telegram.poll.failed` audit events instead of leaking unhandled rejections.

Use `tools/autoplan-board/.env.example` as the variable reference. Never commit real bot tokens or operator IDs.

## Review And Completion Gates

Before marking Autoplan work complete, agents must verify:

1. S01-S15 are implemented or explicitly deferred in `docs/reviews/autoplan-board-completion-audit.md`.
2. `npm run verify` passes.
3. `npm run dashboard:verify` passes.
4. `npm --prefix tools/autoplan-board test` passes.
5. `npm run ship-gate` passes when claiming final local readiness.
6. Browser smoke evidence is freshly regenerated for desktop and mobile.
7. Telegram control tests and broker abuse tests are covered in `tools/autoplan-board/tests/`.
8. Claude/Kimi/Gemini review state is documented in `docs/reviews/autoplan-board-external-review.md`.
9. PR state is checked live; CODEOWNERS review is a process gate and cannot be inferred from local tests.

Live PR state must be refreshed with:

```bash
gh pr view 50 --json url,headRefOid,reviewDecision,mergeStateStatus,statusCheckRollup
```

Treat review files as snapshots until that command is rerun.

Current known process gap: GitHub still requires human CODEOWNERS approval on PR #50 unless that gate is explicitly waived.
