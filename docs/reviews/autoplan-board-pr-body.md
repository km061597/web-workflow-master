# Summary

Adds Autoplan Board v1 as an isolated local-only dashboard package under `tools/autoplan-board/`.

The board runs fixture-safe while `metzgerwebsites/web-workflow-master` is public, blocks broker write actions when public or privacy-unverified non-fixture mode is active, disables HTTP-triggered broker writes by default, exposes loopback-only HTTP endpoints, executes typed broker actions with fixed argv and audit records, restricts screenshot metadata capture to safe loopback/allowlisted targets, surfaces Autoplan sidecars/fixture chain state, and includes Telegram poller controls with CSRF/origin protection on the read-only HTTP shim.

# Evidence

- `npm run dashboard:test`: 22/22 pass
- `npm run dashboard:verify`: pass
- `npm run dashboard:smoke`: pass
- `npm run dashboard:refresh`: pass
- `npm run verify`: pass
- CI workflow and Verify workflow run `dashboard:verify`, `dashboard:test`, Chromium install, and `ship-gate`
- Agent runbook: `docs/AUTOPLAN_BOARD.md`
- Desktop browser smoke: `evidence/autoplan/desktop.png`
- Mobile browser smoke: `evidence/autoplan/mobile.png`
- Dashboard smoke JSON: `evidence/autoplan/dashboard-smoke.json`
- Browser smoke JSON: `evidence/autoplan/browser-smoke.json`
- Broker refresh evidence: `evidence/autoplan/board-refresh.json`
- Ship gate evidence: `evidence/autoplan/ship-gate.json`
- Completion audit: `docs/reviews/autoplan-board-completion-audit.md`
- External review log: `docs/reviews/autoplan-board-external-review.md`

# Review State

- Claude Code plan-mode reviews completed. Findings were fixed and narrow re-review confirmed the final broker dedupe medium issue resolved.
- Claude Desktop Computer Use review completed. It found B1-B4 blockers around browser broker reachability, ship-gate aliasing, hardcoded slice status, and Telegram integration. Those were fixed in the current branch, and a narrow Claude terminal re-review after commit `82d0bb1` confirmed no blocking findings remain. Later Claude Desktop Computer Use re-reviews reported PR-ready code state and found only non-gating follow-ups; Codex fixed Telegram poll failure auditing, evidence-backed slice derivation, source-qualified ship-gate chain evidence, and shared board-refresh summary generation.
- Kimi/KimiClaw terminal review is documented as blocked by Kimi MCP startup failure; Kimi/OpenClaw UI re-review was corrected from stale head `57ddf9b` to actual PR head `6a8e394` and reported no blocking findings after broker-registry coverage and final hardening landed. A latest Kimi desktop final report returned no blockers and two medium hardening notes; both were fixed with controlled broker registry drift handling and generic HTTP 500 responses.
- Codex adversarial subagents found screenshot URL/output leakage, locally fetchable HTTP broker-token risk, unverified privacy-guard risk, token-only GitHub privacy verification risk, implicit workflow token permissions, local-only ship-gate enforcement, and stale review test counts. This follow-up fixes those with safe URL validation/redaction, shared non-reserved evidence output validation for broker and direct CLI screenshot metadata, default-disabled HTTP broker writes, verified-privacy gating for real writes, token-aware fixed-argv GitHub privacy lookup, `contents: read` workflow permissions, CI/Verify ship-gate enforcement, and updated review evidence.
- Gemini review is documented as blocked by interactive authentication and missing `GEMINI_API_KEY` keychain auth.

# Verification

- [x] `npm run verify` passes locally.
- [x] `npm audit --audit-level=moderate` passes locally.
- [x] `npm run dashboard:verify` passes locally.
- [x] `npm run dashboard:test` passes locally.
- [x] `npm run ship-gate` passes locally and refreshes browser/evidence artifacts.
- [x] Any active command added to docs exists in this branch.
- [x] Scaffold setup checks pass for changed scaffolds.
- [x] No secrets, tokens, or real customer credentials are committed.
