---
name: quality-gates
aliases: build-guide, verification-gates
description: The 14 mandatory quality gates every change must pass before delivery. Includes build, tests, format, lint, accessibility, visual QA, Storybook, component registry, design system, decision log, impeccable critique, pre-launch checklist, click-path audit, and full-page visual analysis.
type: project
---

## Quality Gates

Every change must pass ALL applicable gates before being considered complete.

| # | Gate | Command / Action | When to Run |
|---|------|------------------|-------------|
| 1 | Build | `cd site && npm run build` | Zero TS errors. Every code change. |
| 2 | Tests | `cd site && npm run test` | Zero failures. Every code change. |
| 3 | Format | `cd site && npx prettier --check .` | Zero formatting issues. Every code change. |
| 4 | Lint | `cd site && npm run lint` | Zero lint errors. Every code change. |
| 5 | Accessibility | axe-core check on affected pages | Page/section changes. |
| 6 | Visual QA | Project screenshot command when present; TODO pending owner (quality toolchain function group) | Page/section changes. Check: no horizontal scroll, broken layouts, missing elements, contrast. |
| 7 | Storybook | `cd site && npx storybook build --test` | New/modified components. |
| 8 | Component Registry | Update `COMPONENT_AND_ANIMATION_REGISTRY.md` | Structural changes. |
| 9 | Design System | Update the design-spec function group artifact; TODO pending owner | Token changes. |
| 10 | Decision Log | Update `DECISIONS.md` | Non-obvious choices. |
| 11 | Impeccable Critique | Run `impeccable critique` on touched components | Before delivery. 0 critical anti-patterns. |
| 12 | Pre-Launch Checklist | Verify reference-pack checklist when available; TODO pending owner (reference-pack function group) | Before delivery. |
| 13 | Click-Path Audit | All `<Link href>` resolve; every page reachable within 3 clicks | After dev server starts. |
| 14 | Full-Page Visual Analysis | `surf screenshot --full-page` at 375/768/1440 | Before EVERY delivery. Mandatory. Check: no overflow, all images render, text readable, no overlaps, nav visible, footer complete, forms proper. |

### Autonomous Execution

- Gates 1–4: AI must run on every code change without user prompting.
- Gates 5–7: Run on page/section changes.
- Gates 8–10: Run on structural changes.
- Gates 11–12: Run before delivery.
- Gate 13: Run after dev server starts.
- Gate 14: Run before every site delivery (100% mandatory).
