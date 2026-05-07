---
name: quality-system
aliases: quality-gates, ship-gate, quality-checklist
description: Single source of truth for "ready to ship" in this workspace. Defines gates, thresholds, taste anchors, enforcement map, and the 30-point ship-readiness checklist. Every site inherits this. Every agent points here.
type: project
---

# Quality System

> **Taste without enforcement is aspiration. Enforcement without taste is bureaucracy.** This system codifies both.

---

## The Ship Gate

One command, one verdict. Run before any site goes live.

```bash
npm run build      # must pass
npm run test       # must pass
npm run lint       # must pass
npx prettier --check .  # must pass
```

Then: Lighthouse + axe + screenshot review + click-path audit. No agent claims "done" until all pass.

Returns **Go / No-Go** with structured evidence. No subjective "looks good" — artifact or it didn't happen.

---

## Quality Gates (Core)

Every change must pass ALL applicable gates before being considered complete.

| # | Gate | Command / Action | Threshold | When to Run |
|---|------|----------------|-----------|-------------|
| 1 | **Build** | `npm run build` | Zero errors, zero TS failures | Every code change |
| 2 | **Tests** | `npm run test` | Zero failures | Every code change |
| 3 | **Format** | `npx prettier --check .` | Zero formatting issues | Every code change |
| 4 | **Lint** | `npm run lint` | Zero lint errors | Every code change |
| 5 | **Accessibility** | axe-core on affected pages | WCAG 2.2 AA, zero critical/serious | Page/section changes |
| 6 | **Performance** | Lighthouse mobile audit | LCP ≤2.5s, CLS ≤0.1, INP ≤200ms | Before delivery |
| 7 | **Visual QA** | Screenshots at 375/768/1440 | No horizontal scroll, broken layouts, missing elements, contrast | Page/section changes |
| 8 | **Bundle Size** | `size-limit` or build analysis | First-load JS ≤170 KB per route | Before delivery |
| 9 | **SEO** | Sitemap, robots, OG, canonical | Valid markup, all pages indexable | Before delivery |
| 10 | **Click-Path Audit** | Zero 404s, no Lorem, no `href="#"`, no empty links/buttons | All routes reachable, all links resolve | Before delivery |
| 11 | **Anti-Patterns** | Scan against `ANTI_PATTERNS.md` — **TODO pending owner** | Zero dark patterns, zero AI slop | Before delivery |
| 12 | **Responsive** | Test at 375, 768, 1280, 1920 | No layout breaks, no overflow | Every visual change |
| 13 | **Token Discipline** | stylelint or token audit | No raw hex, no off-scale spacing, no off-system fonts | Token changes |
| 14 | **Business Launch** | Domain, email, entity, insurance | Checklist in `ship-readiness.md` | Before first client |

### Autonomous Execution

- Gates 1–4: AI must run on every code change **without user prompting**.
- Gates 5–7: Run on page/section changes.
- Gates 8–13: Run before every delivery.
- Gate 14: Run once before taking the first client.

---

## Threshold Table (Concrete)

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | ≥90 mobile / ≥95 desktop | Chrome DevTools / Lighthouse CI |
| LCP | ≤2.5s (Slow 4G + 4× CPU throttling) | Lighthouse |
| INP | ≤200ms | Lighthouse |
| CLS | ≤0.1 | Lighthouse |
| axe-core | Zero critical/serious violations | pa11y-ci or @axe-core/cli |
| Bundle per route | ≤170 KB first-load JS | `size-limit` or webpack-bundle-analyzer |
| Visual diff | ≤0.1% per page | Lost Pixel or Playwright |
| Format/Lint | Zero errors | Prettier + ESLint |
| TypeScript | Zero errors | `tsc --noEmit` |

---

## Taste Anchors (Calibration)

| Resource | Purpose |
|----------|---------|
| `exemplars/tier-a-plus/` | TODO: 10 reference teardowns — what A+ work looks like (pending exemplars PR) |
| `exemplars/tier-c-counter-examples/` | TODO: What AI-slop looks like — pattern library to avoid (pending exemplars PR) |
| `conventions/voice-and-tone.md` | TODO: How copy sounds in this workspace (pending conventions PR) |
| `conventions/motion-tokens.md` | TODO: Canonical easing, duration, choreography rules (pending conventions PR) |
| `conventions/color-apca.md` | TODO: APCA contrast over WCAG 2.x — perceptual accuracy (pending conventions PR) |
| `conventions/analytics-events.md` | TODO: Event naming convention + privacy baseline (pending conventions PR) |
| `ANTI_PATTERNS.md` | TODO: Visual, animation, code, and AI-specific slop to avoid (pending exemplars PR) |

---

## Agent Wiring

Every quality-relevant agent points to the right resource:

| Agent | Enforcement Target | Status |
|-------|-------------------|--------|
| `shipper` | Runs full ship-gate before delivery | Emitted by PR #6 |
| `performance-engineer` | Enforces Lighthouse thresholds + bundle budgets | Emitted by PR #6 |
| `accessibility-auditor` | Runs axe-core / pa11y-ci; end-to-end + device testing (absorbed from e2e-tester) | Emitted by PR #6 |
| `art-director` | Visual QA + benchmarks against exemplars | Emitted by PR #6 (absorbed visual-qa-agent) |
| `design-critic` | Benchmarks against exemplars | Emitted by PR #6 |
| `brand-strategist` | SEO + meta tags + JSON-LD | Emitted by PR #6 (absorbed seo-specialist) |
| `interaction-engineer` | Respects motion tokens + reduced-motion | Emitted by PR #6 |
| `ui-engineer` | Token discipline + responsive matrix | Emitted by PR #6 |
| `design-system-agent` | Token discipline + design system integrity | Emitted by PR #6 |
| `animation-agent` | Motion + animation quality | Emitted by PR #6 |
| `content-modeler` | Content editing + tone consistency | Emitted by PR #6 (absorbed copy-editor) |
| `research-agent` | Research + site cloning (consolidated design-researcher + site-cloner) | Emitted by PR #6 |

---

## What Gets Covered (Depth Playbooks)

| Concern | Playbook | Status |
|---------|----------|--------|
| Visual quality review | `playbooks/visual-quality-review.md` | **TODO pending owner** |
| Conversion flow testing | `playbooks/conversion-flow-testing.md` | **TODO pending owner** |
| Device matrix | `playbooks/device-matrix.md` | **TODO pending owner** |
| Test evidence | `playbooks/test-evidence.md` | **TODO pending owner** |
| Form quality | `playbooks/form-quality.md` | **TODO pending owner** |
| Service worker patterns | `playbooks/service-worker-patterns.md` | **TODO pending owner** |
| Dark mode parity | `playbooks/dark-mode-parity.md` | **TODO pending owner** |
| Forced colors / high contrast | `playbooks/forced-colors-mode.md` | **TODO pending owner** |
| Reduced motion | `playbooks/reduced-motion.md` | **TODO pending owner** |
| 200% zoom | `playbooks/zoom-200.md` | **TODO pending owner** |
| RTL support | `playbooks/rtl-audit.md` | **TODO pending owner** |
| Print stylesheets | `playbooks/print-styles.md` | **TODO pending owner** |

---

## Anti-Slop Rules

### Visual
- Never use Inter or Roboto as default — they're AI defaults. Match font to brief.
- Never generate purple-to-blue gradients. Use brand colors.
- Never use pure gray neutrals. Tint toward brand hue.
- Never use "seamless," "robust," "delve" in copy — AI marketing speak.
- Never ship perfectly centered everything — asymmetric layouts have more life.

### Animation
- UI motion: <300ms. Reveals: 400–600ms. Nothing over 1s.
- Always respect `prefers-reduced-motion`.
- Animate only `transform` + `opacity`.
- Use `easeOut` or `power2.out`, never linear.

### Code
- Never put `"use client"` on entire pages. Split server + client sections.
- Never use inline styles. Use Tailwind classes.
- Never use `any` types. Proper typing always.
- Never put arrays/constants inside components. Move outside.

### Dark Patterns (CHI 2025 — Krauß et al.)

ChatGPT generates ≥1 dark pattern in EVERY website. Audit for:

| Pattern | Example | Fix |
|---------|---------|-----|
| Fake urgency | "Only 2 left!" countdowns | Remove fabricated scarcity |
| Fake social proof | "X people viewing" | Use real data or omit |
| Confirmshaming | "No thanks, I don't want to save" | Neutral opt-out |
| Hidden unsubscribe | Buried cancellation | One-click, visible |
| Forced continuity | Opt-out instead of opt-in | Explicit opt-in |

**Rule**: Never ship AI-generated UI without a dark pattern audit. This is an ethical and legal liability.

---

## What's Intentionally NOT Here

- **Storybook story-level regression** — overkill for site work; page-level screenshots are sufficient.
- **Synthetic monitoring (Calibre/SpeedCurve)** — paid. Lighthouse-CI on every PR is the substitute.
- **A/B testing infra** — out of scope for design-quality enforcement.
- **Error tracking (Sentry)** — application concern, not design-quality. Add per project.

---

## Versioning

This doc is versioned. When thresholds change, update the table above and the decision log. Do not change gates without updating the enforcement map.

---

## See Also

- `ship-readiness.md` — 30-point checklist for final delivery (emitted by this PR)
- `ANTI_PATTERNS.md` — TODO: Full anti-pattern catalog (pending exemplars function group)
- `exemplars/tier-a-plus/` — TODO: Reference teardowns (pending exemplars function group)
- `exemplars/tier-c-counter-examples/` — TODO: AI slop examples (pending exemplars function group)
