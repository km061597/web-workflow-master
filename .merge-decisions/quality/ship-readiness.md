# Decision Log: ship-readiness.md

## Sources
- `gsd-design/QUALITY.md` ship-readiness playbook reference
- `gsd-design/quality/README.md` threshold table + skip path
- `WEBSITES/LAUNCH-GATES.md` business launch checklist (30-point)
- `desigjn-toolkit/QUALITY_GATES.md` full gate list

## Kept From
- gsd-design: Ship gate principle, threshold table, autonomous execution
- WEBSITES: Business launch items (domain warming, SPF/DKIM/DMARC, entity, insurance)

## Merged From
- desigjn-toolkit: Gate numbering 1–14, explicit pass/fail format
- design-self-create: CI/CD integration, form validation, e-commerce checks

## Rejected
- gsd-design specific script paths (`ship-gate.sh`, `advance-phase.sh`) — framework-agnostic in canonical
- desigjn-toolkit Gate 7 (Storybook), Gate 8 (Component Registry), Gate 9 (Design System), Gate 10 (Decision Log), Gate 11 (Impeccable Critique) — removed as universal gates, noted in QUALITY.md "What's NOT here"

## Tradeoffs
- 30 items is long but comprehensive. Split into Product (20) + Business (10) for scannability.
- Business readiness at gate 14 means some items are agency-level, not per-site. This is intentional — "ready to ship" includes "ready to do business."

## Open Questions
1. Should business readiness move to a separate `ops/` document since it's agency-level?
2. Is the 30-item checklist too long for AI agents to execute autonomously? Should there be a "critical 10" subset?
3. Should each client project have its own `ship-readiness.md` or reference the canonical?
