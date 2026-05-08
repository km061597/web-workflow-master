# Summary

Adds Autoplan Board v1 as an isolated local-only dashboard package under `tools/autoplan-board/`.

The board runs fixture-safe while `metzgerwebsites/web-workflow-master` is public, exposes loopback-only HTTP endpoints, executes typed broker actions with fixed argv and audit records, surfaces Autoplan sidecars/fixture chain state, and includes Telegram allowlist controls with CSRF/origin protection.

# Evidence

- `npm --prefix tools/autoplan-board test`: 11/11 pass
- `npm run dashboard:verify`: pass
- `npm run verify`: pass
- Desktop browser smoke: `evidence/autoplan/desktop.png`
- Mobile browser smoke: `evidence/autoplan/mobile.png`
- Dashboard smoke JSON: `evidence/autoplan/dashboard-smoke.json`
- Broker refresh evidence: `evidence/autoplan/board-refresh.json`
- Ship gate evidence: `evidence/autoplan/ship-gate.json`
- Completion audit: `docs/reviews/autoplan-board-completion-audit.md`
- External review log: `docs/reviews/autoplan-board-external-review.md`

# Review State

- Claude Code plan-mode reviews completed. Findings were fixed and narrow re-review confirmed the final broker dedupe medium issue resolved.
- Claude Desktop Computer Use review completed. It found B1-B4 blockers around browser broker reachability, ship-gate aliasing, hardcoded slice status, and Telegram integration. Those were fixed in the current branch.
- Kimi/KimiClaw review is documented as blocked by Kimi MCP startup failure.
- Gemini review is documented as blocked by interactive authentication.

# Verification

- [x] `npm run verify` passes locally.
- [x] `npm audit --audit-level=moderate` passes locally.
- [x] Any active command added to docs exists in this branch.
- [x] Scaffold setup checks pass for changed scaffolds.
- [x] No secrets, tokens, or real customer credentials are committed.
