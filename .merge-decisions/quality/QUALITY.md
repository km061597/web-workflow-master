# Decision Log: QUALITY.md

## Sources

- `gsd-design/QUALITY.md` (gsd-design, 10331B) — Core quality system: ship gate, thresholds, enforcement map, exemplars, onboarding, agent wiring
- `gsd-design/quality/README.md` (gsd-design, 6973B) — Enforcement layer: per-gate tuning, CI integration, threshold table, skip path
- `design-self-create/QUALITY.md` (design-self-create, 3833B) — Quality standards: build, code quality, a11y, performance, content, visual, SEO, e-commerce, forms, CI/CD, anti-repetition
- `desigjn-toolkit/.claude/memory/QUALITY_GATES.md` (desigjn-toolkit, 4617B) — 14 gates: build, tests, format, lint, a11y, visual QA, Storybook, component registry, design system, decision log, impeccable critique, pre-launch checklist, click-path audit, full-page visual analysis
- `desigjn-toolkit/.claude/memory/ANTI_PATTERNS.md` (desigjn-toolkit, 9505B) — Visual, animation, code, AI-specific, dark patterns, distinctiveness, build gotchas
- `WEBSITES/LAUNCH-GATES.md` (WEBSITES, 2584B) — Business launch checklist: domain warming, SPF/DKIM/DMARC, entity formation, Stripe, E&O insurance, MSA/SOW

## Kept From

- **gsd-design/QUALITY.md** (main, canonical): The overall structure — ship gate principle, threshold table, agent wiring, onboarding flow, versioning, "what's NOT here" exclusions.
- **gsd-design/quality/README.md**: The threshold table with concrete metrics (LCP ≤2.5s, CLS ≤0.1, etc.), skip path rules, CI integration notes.

## Merged From

- **design-self-create QUALITY.md**: SEO section (sitemap, robots.txt, OG tags, canonical URLs), e-commerce section (Snipcart, cart, checkout), forms section (Netlify Forms, honeypot, Turnstile), CI/CD section (GitHub Actions, Lighthouse CI, Playwright tests), anti-repetition (compare-sites.js, personality rotation).
- **desigjn-toolkit QUALITY_GATES**: Gate structure numbered 1-14, explicit gate list format, autonomous execution requirement ("AI must run gates 1-4 on every code change without user prompting"), full-page visual analysis as Gate 14 mandatory.
- **desigjn-toolkit ANTI_PATTERNS**: Dark patterns section (CHI 2025 paper), build gotchas, distinctiveness anti-patterns — summarized here and TODO-scoped to a future standalone `ANTI_PATTERNS.md`.
- **WEBSITES LAUNCH-GATES**: Business readiness section — domain warming, SPF/DKIM/DMARC, entity formation, Stripe, E&O insurance, MSA/SOW review. Added as Gate 14 (Business Launch) since it's a quality-of-business concern.

## Rejected

- **gsd-design QUALITY.md "What's here" file tree**: The deep directory listing (`quality/ship-gate.sh`, `quality/setup-site.sh`, etc.) is too implementation-specific. The canonical doc should describe what gets enforced, not assume specific file paths that may differ per site.
- **design-self-create specific stack references**: Astro-specific mentions (content collections, `npm run validate`, `npm run check-links`) removed. The canonical doc is framework-agnostic.
- **desigjn-toolkit Gate 7 (Storybook)**: Not universally applicable. Removed as a universal gate; noted as optional per-project.
- **desigjn-toolkit Gate 8 (Component Registry)**: Project-specific memory system. Removed as universal gate.
- **desigjn-toolkit Gate 9 (Design System)**: Token updates are covered by lint gate. Removed as separate gate.
- **desigjn-toolkit Gate 10 (Decision Log)**: Process artifact, not a quality gate. Removed.
- **desigjn-toolkit Gate 11 (Impeccable Critique)**: Referenced in visual quality playbook instead.
- **desigjn-toolkit Gate 12 (Pre-Launch Checklist)**: Merged into ship-readiness.md and the 30-point checklist.

## Tradeoffs

1. **Framework-agnostic vs. framework-specific**: Removed Astro/Next.js-specific commands from the canonical doc. Each site adds its own `npm run` scripts. This makes the doc portable but requires each site to map gates to concrete commands.
2. **14 gates vs. condensed list**: Started with 14 gates from desigjn-toolkit but condensed to a cleaner taxonomy. The full list is preserved in ship-readiness.md's 30-point checklist.
3. **Business launch as quality gate**: WEBSITES LAUNCH-GATES is about business operations, not product quality. Included as Gate 14 because "ready to ship" includes "ready to do business."

## Open Questions

1. Should there be a separate `quality/gates/` directory with per-gate configs, or is the flat structure sufficient?
2. The threshold for "first-load JS per route ≤ 170 KB" may need tuning for different stack choices (Next.js App Router vs. Astro vs. vanilla).
3. Should the business launch gate (14) live in a separate doc since it applies to the agency, not per-site?

## Resolved (post-synthesis)

- ~~Gate count mismatch~~: Synthesized to 14 gates with 20 product + 10 business items in ship-readiness.md. gsd-design's 13 gates + desigjn-toolkit's 14 gates → unified table above.
- ~~Storybook as universal gate~~: Removed. Noted as optional per-project in "What's NOT here" section.

## Cross-References to Other Function Groups
- `exemplars/tier-a-plus/` and `exemplars/tier-c-counter-examples/` — TODO: pending exemplars function group (no open PR yet)
- `ANTI_PATTERNS.md` — TODO: pending exemplars function group (no open PR yet)
- `scripts/ship-gate.sh`, `scripts/click-path-audit.mjs` — TODO: pending tooling function group (no open PR yet)
