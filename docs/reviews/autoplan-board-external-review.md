# Autoplan Board External Review Log

This file records the required pre-PR review state for high-risk slices.

## Current Status

- S01 Private-Repo Safety Gate: Codex implemented and local tests cover public-repo fixture-only behavior.
- S03 Runtime State And Audit Store: Codex implemented runtime JSONL state tests.
- S07 Safe Broker Core: Codex implemented allowlisted action and abuse-case tests.
- S09 Autoplan Controller Sidecars: v1 sidecar metadata is represented in the Autoplan Review board and remains local-only.
- S10 Autonomous Prospect Chain Kickoff: v1 is fixture-only and pauses at HITL/external gates.
- S12 Audit And Evidence Gate: dashboard verify writes local evidence under `evidence/autoplan/`.
- S14 Telegram Control Plane: Codex implemented allowlist and raw-command-block tests.
- S15 Full Local Integration Gate: local gates pass; PR readiness is still blocked on push/PR creation and unresolved unavailable external review lanes.

## Review Packets

- Claude Code terminal: completed read-only review with `claude -p ... --permission-mode plan` after sandbox escalation allowed the normal auth context. Initial findings:
  - H1 malformed JSON broker POST could hang: fixed with `readJsonBody()` and 400 `invalid-json` responses, covered in `tools/autoplan-board/tests/server.test.mjs`.
  - H2 JSON CORS header allowed `Origin: null`: fixed by omitting `access-control-allow-origin`, covered in server tests.
  - H3 missing Telegram HTTP endpoint: fixed with `POST /api/telegram`, covered in server tests.
  - H4 no server-level broker tests: fixed with CSRF, origin, invalid JSON, valid action, and abuse guard coverage.
  - M4 absolute broker args allowed: fixed with absolute-path validation and tests.
  - M5 Telegram approval target freeform: fixed with target validation against `S##` / `job-######` formats and tests.
  - M6 invalid ARIA list semantics: fixed by removing the incorrect `role="list"` and later using semantic evidence `<ul>/<li>`.
  - M7 focusable card without activation: fixed with an `Open detail` button and JS toggle behavior.
  Re-review found the original blocker classes resolved and one medium remaining issue: `/api/telegram` lacked CSRF/origin guard. That was fixed by applying the same token/origin checks as broker, and server tests now cover both.
  Final Claude plan-mode re-review found no blocking findings. Its only real correctness gap was a low-severity dangling `refreshBoard` broker target; fixed by adding `tools/autoplan-board/scripts/refresh-board.mjs` and test coverage. Claude also noted two info-level display/DOM guards, both fixed.
  A later Claude review of the broker execution/runtime bridge pass found one medium issue: completed broker actions stayed permanently deduped for the server lifetime. Fixed by releasing the dedupe key in `executeBrokerJob()` cleanup and adding rerun regression coverage. Narrow Claude re-review confirmed the medium finding resolved with no new blocker.
  Claude Desktop was then prompted through Computer Use for a full read-only review of the complete Codex work. It found four high blockers and several medium issues:
  - B1 dashboard UI could not invoke broker because the random session token was never delivered to the browser.
  - B2 `shipGate` was only an alias to `verify`.
  - B3 slice status was hardcoded to `implemented`.
  - B4 Telegram control was only a local HTTP shim, not a real bot integration path.
  - Medium issues included absent-Origin handling, ignored args on fixed-argv actions, hardcoded GitHub repo configuration, fixture-chain overclaiming, and no scaffold execution test.
  Codex fixed those by adding browser broker controls and token meta wiring, a real root `scripts/ship-gate.mjs`, derived slice status, required Origin handling, no-arg rejection for fixed-argv actions, configurable `AUTOPLAN_GITHUB_REPO`, real Telegram polling via `getUpdates` when configured, and scaffold execution coverage.
  Narrow Claude terminal re-review after commit `82d0bb1` confirmed all 10 prior Claude Desktop findings resolved with no blocking findings remaining. It noted two non-blocking caveats: Telegram polling callback should eventually add retry/error handling, and `AUTOPLAN_GITHUB_REPO` still has an own-project fallback default.
- Kimi / KimiClaw: attempted with `kimi --print --plan`; blocked first by `PermissionError: [Errno 1] Operation not permitted: '/Users/kylemetzger/.kimi/logs/kimi.log'`. Escalated retry then failed before review with `Unknown error: Failed to connect MCP servers: {'auto-browser': RuntimeError('Client failed to connect: Connection closed')}` and left stuck review processes, which Codex stopped (`83161`, `83172`). No Kimi edits were made.
  KimiClaw was then prompted through the Kimi desktop UI. Its earlier review findings included stale PR/audit/script concerns, and a follow-up UI note questioned whether every broker action maps to a real command surface. Codex added `broker registry maps every local action to an existing command surface` coverage in `tools/autoplan-board/tests/core.test.mjs`, and the package test now passes 14/14.
- Gemini CLI: attempted with `gemini --prompt ... --approval-mode plan`; blocked by interactive authentication prompt. The prompt was not approved. No Gemini edits were made.

Until those packets are complete, this branch is local-verification-ready, not merge-ready.
