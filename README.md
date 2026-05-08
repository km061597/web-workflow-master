# Web Workflow Master

AI-powered, taste-anchored web design workspace. Multi-site, multi-template, ship-ready.

## What this workspace is

A unified workspace for building professional websites at scale — from productized local-business services to bespoke creative builds. Optimized for **AI-driven, taste-anchored, mobile-first, ship-ready** site building.

- **Multi-site** — each site is its own directory under `sites/<name>` or `clients/<slug>/` with its own deps, build, and deploy
- **AI-driven** — dispatchable specialist agents handle taste, implementation, and verification
- **Taste-anchored** — `exemplars/` calibrates "what good looks like" so output isn't generic
- **Mobile-first** — every UI agent has a mobile Definition of Done; mobile CWV gates are the gate
- **Ship-ready** — quality gates produce one verdict from enforceable checks before deploy
- **Scenario-aware** — existing-site rebuilds, greenfield/no-brand clients, and storefront/catalog projects each have a routed workflow
- **Maintenance-aware** — every commercial site ends with ownership, update, monitoring, and handoff artifacts

## The 30-second mental model

> **Target workspace structure.** Directories marked **TODO pending owner** are not yet emitted by any open PR. Each will be claimed by a future function-group PR.

```
templates/      → starter site scaffolds — **TODO pending owner**
sites/          → live sites you build and ship
clients/        → signed engagements with deliverables and handoff packages — **TODO pending owner**
prospects/      → active outreach (pre-signature) — **TODO pending owner**
ops/            → business operations (CRM, legal, sales, brand) — **TODO pending owner**
.claude/        → agents + skills + memory (dispatchable specialists)
packages/       → shared design-system tokens and utilities — **TODO pending owner**

exemplars/      → taste calibration corpus — **TODO pending owner**
playbooks/      → depth playbooks — **TODO pending owner** (procedural step-by-step guides)
quality/        → enforcement layer — **TODO pending owner** (linters, CWV, a11y, visual diff, bundle size)
conventions/    → workspace-wide voice/tone, motion tokens, color, banned words — **TODO pending owner**
references/     → upstream open-source repos (READ-ONLY)
schemas/        → ready-to-paste schema.org JSON-LD templates — **TODO pending owner**
```

## Stack

**Base stack** (primary template):

- Next.js 16 (App Router, TypeScript)
- React 19
- Tailwind CSS 4 with CSS variable theming
- shadcn/ui (base-ui/react primitives)
- GSAP + Framer Motion for animation
- Lucide React icons
- Geist font (Next.js font optimization)

**Alternative templates** (per-project choice):

- Astro 5 + Tailwind v4 — lightweight marketing sites, portfolios
- Next.js 15 — stable LTS option when bleeding-edge is not required

**Quality & QA**:

- Vitest — unit/component tests
- React Testing Library — component rendering in tests
- Playwright — E2E tests (Chrome, Firefox, Safari, mobile)
- axe-core — accessibility testing (WCAG 2.1 AA)
- Storybook — component isolation + docs + visual testing
- Lighthouse CI — performance, accessibility, best-practices, SEO
- Prettier + ESLint + React Scan

**Browser automation**:

- `surf-cli` — primary browser tool (navigate, screenshot, emulate, click)
- Playwright CLI — escape-hatch for complex automation

**Research & scraping**:

- Firecrawl MCP — scrape, extract, crawl competitor/reference sites
- Browserbase MCP — cloud browser for anti-bot, proxies

## Quick Start

```bash
# 1. Scaffold a site — do not hand-copy templates.
npm run scaffold -- my-site --template nextjs-canonical
# or:
bin/scaffold-site.sh my-site nextjs-canonical

# 2. Complete the planning artifacts (hard gates before build)
# - BRIEF.md: client scenario, audience, goal, constraints, exemplars
# - RESEARCH.md: competitors, industry glossary, compliance, trust signals
# - IA.md: route inventory, primary/secondary access paths, mobile nav
# - CONVERSIONS.md: primary user journeys, CTA truth table, success/failure states
# - TESTING.md: observable assertions and negative checks
# - PRODUCTS.md: required if storefront/catalog is in scope

# 3. Advance only when gates pass.
bin/advance-phase.sh design
bin/advance-phase.sh build

# 4. Install quality runner dependencies
npm i -D stylelint stylelint-config-standard stylelint-declaration-strict-value         pa11y-ci lost-pixel @lhci/cli size-limit @size-limit/preset-app

# 5. Start dev server
npm run dev

# 6. Queue screenshot metadata for visual iteration.
node scripts/screenshot.js http://localhost:3000 --output evidence/autoplan/screenshot-request.json
node scripts/responsive.js http://localhost:3000

# 7. Run quality gates.
npm run ship-gate         # runs all enforceable gates locally
# or
node scripts/audit.js http://localhost:3000
```

## Repository Verification

Run the same gate locally and in GitHub Actions:

```bash
npm run verify
```

This checks the root command surface, JavaScript syntax, scaffold setup verification, and the Astro scaffold validator. `npm run ship-gate` is the Autoplan release gate; it also runs dashboard verification, npm audit, browser smoke capture, Autoplan evidence freshness checks, runtime evidence stamping, and board refresh.

For the repository-level release gate, `main` must require the GitHub checks listed in [docs/BRANCH_PROTECTION.md](docs/BRANCH_PROTECTION.md). A green workflow run is advisory until branch protection or an equivalent ruleset is applied.

## Autoplan Board

Autoplan Board v1 is the local operator dashboard under `tools/autoplan-board/`. It is linked as a root npm workspace and exposed through root scripts so agents can discover and run it without guessing paths:

```bash
npm run dashboard
npm run dashboard:verify
npm run dashboard:test
npm run dashboard:smoke
npm run dashboard:refresh
npm run ship-gate
```

`npm run dashboard` binds the loopback dashboard at `http://127.0.0.1:4177` by default; override with `AUTOPLAN_BOARD_PORT`.

Agent wiring, broker actions, runtime state, Telegram controls, evidence files, and completion gates are documented in [docs/AUTOPLAN_BOARD.md](docs/AUTOPLAN_BOARD.md). Review and PR evidence lives in [docs/reviews/autoplan-board-completion-audit.md](docs/reviews/autoplan-board-completion-audit.md), [docs/reviews/autoplan-board-external-review.md](docs/reviews/autoplan-board-external-review.md), and [docs/reviews/autoplan-board-pr-body.md](docs/reviews/autoplan-board-pr-body.md).

## Work Modes

| Mode            | Workspace                                 | Key Files                                                                        | Purpose                                  |
| --------------- | ----------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------- |
| Discover & Plan | `prospects/`, `clients/`                  | `BRIEF.md`, `RESEARCH.md`, `IA.md`, `_master-list.md`, per-prospect `dossier.md` | Research, intake, spec before build      |
| Build & Ship    | `sites/`, `templates/`, `clients/*/repo/` | Master template repo, site-specific repos                                        | Design, develop, quality gate, deploy    |
| Operate         | `ops/`                                    | `pipeline.md`, `maintenance-queue.md`, `quotes.md`                               | Business ops, CRM, legal, sales, handoff |

## Client Transformation Standard

Use `ops/client-transformation-workflow.md` — **TODO pending owner** — for every signed build. The process is:

1. Audit the public footprint.
2. Convert discovery into a signed SITE-SPEC.
3. Run `node scripts/design-shotgun-brief.mjs clients/[name]/SITE-SPEC.md --write` — **TODO pending owner** (script not yet bundled).
4. Run `node scripts/client-preflight.mjs clients/[name]` — **TODO pending owner** (script not yet bundled).
5. Rescue weak/no-logo brand inputs into a lightweight visual system.
6. Generate multiple distinct design directions before build.
7. Build from the chosen direction.
8. Verify build, mobile, NAP, price context, contact path, and anti-AI-slop checks.

## Pricing (productized service tier)

| Tier     | Build  | Monthly | Pages |
| -------- | ------ | ------- | ----- |
| Starter  | $1,800 | $35     | 3     |
| Standard | $3,500 | $95     | 5–7   |
| Premium  | $5,500 | $150    | 10+   |

## The eight hard rules

1. **Mobile-first is non-negotiable.** Every UI agent has a mobile DoD. No bare `100vh`. Touch targets ≥ 24 px. Mobile CWV gates are the gate.
2. **Never echo or commit secrets.** `.env` is gitignored. Reference keys by name only.
3. **No design libs at workspace root.** They belong inside each `sites/<name>/` or `clients/<slug>/repo/`.
4. **Don't edit `references/`.** They're upstream clones, treated as read-only.
5. **Don't bypass agents for taste calls.** Implementation is fine inline; aesthetic judgment goes through `design-critic` or `art-director`.
6. **Verify in a real browser before claiming a UI works.** `art-director` and `accessibility-auditor` exist for this. Static analysis ≠ verification.
7. **Gate skips are NO-GO.** Skipped quality gates cannot produce a shipping verdict.
8. **Parallel dispatch is mandatory** when 2+ specialists have independent work. Single message, multiple `Agent` calls.

## Common stuck points

### "Which agent for X?"

Dispatch `art-director`. It owns orchestration. If you don't know the right chain, that's the right call.

### "I want it to look like [Linear / Stripe / Vercel]."

Dispatch `research-agent` to fill the relevant exemplar in `exemplars/tier-a-plus/`, then dispatch `design-system-agent` with that exemplar as the brief.

### "It looks generic / AI-slop."

Dispatch `design-critic`. It scans against `exemplars/tier-c-counter-examples/` and surfaces the AI tells. Then dispatch `design-system-agent` or `art-director` to fix.

### "Lighthouse is failing CWV gates."

Dispatch `performance-engineer`. It owns `quality/lighthouse/budget.json` — **TODO pending owner** (quality function group). Common culprits: unoptimized images, render-blocking JS, fonts without `swap`, third-party tags.

### "Accessibility violations from pa11y."

Dispatch `accessibility-auditor`. It owns `quality/a11y/pa11yci.json` — **TODO pending owner** (quality function group).

### "I want to ship — what do I run?"

```bash
npm run ship-gate
```

Runs the repository gate, dashboard gate, npm audit, browser smoke capture, and Autoplan evidence checks before phase advancement. If green: deploy only after required human review gates are satisfied. If red: read the evidence files, fix, re-run.

### "An agent claimed done but it doesn't work."

- Did the gate pass? If not, the claim is wrong by definition.
- Was a real browser used to verify? `art-director` + `accessibility-auditor`.
- If a deployed-app issue: dispatch `accessibility-auditor` against the production URL.

## What's NOT here (intentional)

- **No CMS pre-installed** — each site picks (Sanity, Payload, Contentful, MDX, etc.). `content-modeler` agent helps when needed.
- **No analytics pre-installed** — each site picks (Plausible default, PostHog for product). `performance-engineer` agent handles wiring.
- **No auth pre-installed** — each site picks (Clerk, Auth.js, Lucia). Out of scope for the workspace.
- **No monorepo tooling** — each site is independent. Add `turbo` or `nx` only if you actually share code.
- **Playwright MCP** — explicitly excluded. Use `surf-cli` (default), `chrome-devtools` MCP, or `playwright` CLI as escape hatch.

## When something's missing

The workspace is intentionally evolving. If you find:

- A gap in `quality/` — add the gate, add it to `ship-gate.sh`, document in `QUALITY.md`
- An exemplar you keep referencing — add it to `exemplars/tier-a-plus/`
- A pattern you keep writing from scratch — add it to `playbooks/` or `conventions/microcopy-library.md`
- A build that taught a reusable lesson — add a small case study under `exemplars/build-case-studies/` with selected screenshots only
- A tool you keep reaching for — add it to `TOOLS.md`

The system improves by accretion. Don't let the perfect be the enemy of the documented.

## Versioning

> **Target state.** The following scripts and directories are not yet emitted by any open PR. Marked **TODO pending owner**.

The workspace itself is versioned via git. `bin/scaffold-site.sh` creates a site from the checked-in scaffolds. `quality/setup-site.sh` — **TODO pending owner** — will copy a portable `quality/` — **TODO pending owner** + `conventions/` — **TODO pending owner** bundle into each site, so a client handoff is not dependent on workspace symlinks. Re-run `../../quality/setup-site.sh` — **TODO pending owner** inside an active site when you intentionally want to refresh that site's copied gate bundle from the workspace. Changes to `playbooks/` — **TODO pending owner** and `schemas/` — **TODO pending owner** are reference material — sites copy what they need.

Major version bumps (breaking budgets, removed gates) get a note in `QUALITY.md#changelog` — **TODO pending owner**.

## License

MIT
