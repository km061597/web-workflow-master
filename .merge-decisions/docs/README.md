# Decision Log: README.md

Synthesis of docs function group — canonical README.md for the master repo.

## Sources

| Source File | Version | Size | SHA256 |
|---|---|---|---|
| `README.md` | WEBSITES | 3026 B | `a5f097fae2d5991115916341533d603257a2b2bb963b67f6557e1ae688dfb4cc` |
| `README.md` | design-self-create | 2407 B | `f270547eab0e34327df5f2fd6e7261d4ea2e450879803593770ad7bbe8a84358` |
| `ONBOARDING.md` | gsd-design | 10677 B | `8b4db64fafd2239622863e420a7a7184e48a7f183393ab43ae09bb04a00d2f4d` |

Stack base context: `desigjn-toolkit/CLAUDE.md` (Next.js 16 + React 19 + Tailwind 4 + shadcn/ui)

## Kept From

### WEBSITES/README.md
- **Work Modes table** — Discover & Plan / Build & Ship / Operate — generalized from the productized-service model
- **Client Transformation Standard** — the 8-step workflow, normalized to canonical paths (`clients/[name]/`)
- **Pricing table** — retained as optional productized-service tier
- **Folder Structure** — `prospects/`, `clients/`, `ops/` hierarchy
- **Tech Stack** — Next.js 15 baseline, elevated to Next.js 16 per stack base context
- **Quick Start steps 1–2** — read CLAUDE.md, fill LAUNCH-GATES.md (merged into planning artifacts)

### design-self-create/README.md
- **Scaffold command** — `node tools/scaffold.js my-site --template landing-page`
- **Screenshot / responsive / audit scripts** — normalized to `scripts/screenshot.js`, `scripts/responsive.js`, `scripts/audit.js`
- **Design System section** — OKLCH color tokens, fluid typography via `clamp()`, Inter Variable font
- **Tooling Decisions reference** — pointer to `ARCHITECTURE.md`
- **Templates table** — Astro 5 + Tailwind v4 as alternative template

### gsd-design/ONBOARDING.md
- **"What this workspace is" description** — core value propositions (multi-site, AI-driven, taste-anchored, mobile-first, ship-ready, scenario-aware, maintenance-aware)
- **30-second mental model ASCII tree** — enriched with `clients/`, `prospects/`, `ops/`, `packages/`
- **The eight hard rules** — all 8 rules, verbatim except vocabulary normalization
- **Common stuck points Q&A** — all 6 FAQ entries with agent dispatch guidance
- **"What's NOT here" exclusions** — all 5 intentional omissions
- **"When something's missing" accretion philosophy** — verbatim
- **Versioning section** — portable bundle approach via `quality/setup-site.sh`

## Merged From

### Stack normalization
- **desigjn-toolkit** base context (Next.js 16 + React 19 + Tailwind 4 + shadcn/ui) merged with:
  - WEBSITES' Next.js 15 → bumped to 16
  - design-self-create's Astro 5 → retained as *alternative template*, not primary stack
  - desigjn-toolkit's GSAP + Framer Motion animation layer → added to base stack
  - desigjn-toolkit's Geist font → primary font, with Inter Variable as fallback for Astro template
- Result: single "Stack" section with primary + alternative templates clearly separated

### Quality tooling merge
- gsd-design: `stylelint`, `pa11y-ci`, `lost-pixel`, `@lhci/cli`, `size-limit`
- design-self-create: Lighthouse CI (`scripts/audit.js`)
- desigjn-toolkit: Vitest, React Testing Library, Playwright E2E, axe-core, Storybook, Prettier, ESLint, React Scan
- Result: consolidated QA table with all tools and their commands

### Workspace structure merge
- gsd-design: `sites/`, `templates/`, `references/`, `exemplars/`, `playbooks/`, `quality/`, `conventions/`, `schemas/`
- WEBSITES: `prospects/`, `clients/`, `ops/`, `templates/` (master template)
- design-self-create: `packages/design-system/`, `templates/`, `tools/`, `scripts/`
- Result: single ASCII tree with all directories, using canonical vocabulary per `vocabulary-map.md`

### Quick Start merge
- gsd-design: `bin/scaffold-site.sh`, planning artifacts, `advance-phase.sh`, quality install
- design-self-create: `node tools/scaffold.js`, `npm run dev`, screenshot/responsive/audit scripts
- WEBSITES: read CLAUDE.md, fill LAUNCH-GATES.md, replace placeholders
- Result: 7-step unified quick start that covers scaffold → plan → build → quality → ship

## Rejected

- **WEBSITES' "Next Steps" list** — too specific to the productized-service business setup (LLC, EIN, bank account, Stripe, cold emails). This belongs in `ops/` playbooks, not the root README.
- **WEBSITES' `LAUNCH-GATES.md` reference** — replaced by canonical `quality/` + `ship-gate` terminology; `LAUNCH-GATES.md` is a WEBSITES-specific file that will be handled in its own function group synthesis
- **design-self-create's `ARCHITECTURE.md` deep link** — retained as a generic pointer, but the file itself is not in scope for this synthesis; will be handled in its own artifact if selected
- **design-self-create's `DESIGN_GUIDELINES.md` reference** — superseded by `conventions/` + `exemplars/` + `playbooks/` hierarchy from gsd-design
- **gsd-design's AI reading order** (`WORKSPACE.md` → `CLAUDE.md` → ...) — moved to `ONBOARDING.md` where it belongs; README should be human- and AI-scannable without prescribing a reading sequence
- **gsd-design's "Day one — start a new site" long workflow** — moved to `ONBOARDING.md`; README gets the condensed Quick Start instead
- **gsd-design's "Where to look when" table** — moved to `ONBOARDING.md`; README stays high-level

## Tradeoffs

1. **Stack authority vs. version reality**: The desigjn-toolkit stack (Next.js 16 + React 19 + Tailwind 4 + shadcn/ui) is the newest but least battle-tested across versions. gsd-design uses Next.js (unspecified minor) and WEBSITES uses Next.js 15. We elevated the newest stack as *primary* but kept Astro 5 as an *alternative template* to acknowledge design-self-create's mature Astro template. Risk: Next.js 16 may have breaking changes not captured in older version docs.

2. **One README vs. README + ONBOARDING**: We chose to split into two artifacts. gsd-design's ONBOARDING.md is 10KB and serves a distinct purpose (day-one workflow for AI agents). The two READMEs from WEBSITES and design-self-create are smaller and serve as repo landing pages. Splitting preserves the "fastest path to doing useful work" narrative in ONBOARDING while keeping README scannable for humans browsing GitHub.

3. **Pricing inclusion**: The WEBSITES pricing table is productized-service specific. We included it as an optional tier table because the master repo unifies all workflows, but this may need to move to `ops/pricing.md` if the master repo becomes more than a productized-service workspace.

4. **Vocabulary normalization**: Used `quality gate` (not LAUNCH-GATES), `exemplar` (not refs), `playbook` (not procedural doc), `clients/<slug>/` (canonical per vocab map). This creates a slight mismatch with gsd-design's `sites/` terminology, which we kept as the greenfield build directory while `clients/` is for signed engagements.

5. **Tooling breadth**: desigjn-toolkit has the richest tooling (surf-cli, Firecrawl, Browserbase, Impeccable, taste-skill). We included surf-cli and Firecrawl as primary tools but did not list all 21 reference repos or every skill to keep the README concise. Full detail belongs in `CLAUDE.md` and `TOOLS.md`.

## Open Questions

1. **Should `sites/` and `clients/` coexist?** — **TODO pending owner** The vocabulary map canonicalizes `clients/<slug>/`, but gsd-design uses `sites/` for live builds. Current synthesis keeps both: `sites/` for internal/greenfield builds, `clients/` for signed engagements.

2. **Is Next.js 16 stable enough to be the primary stack?** — **RESOLVED: Yes.** Next.js 16 (App Router, TypeScript) is the primary stack. Next.js 15 is the stable LTS alternative. Astro 5 is the lightweight marketing/portfolio alternative.

3. **Where does the `ops/` business layer belong?** — **TODO pending owner** WEBSITES has deep business ops (legal, sales, onboarding, brand). The master repo includes it in the workspace structure, but does the master repo scope include running a productized service, or just building sites?

4. **Should `packages/design-system/` be workspace-level or per-site?** — **TODO pending owner** design-self-create uses it workspace-wide; gsd-design says "No design libs at workspace root." Need a decision on whether shared design system code lives at root or is copied per-site.

5. **Missing `bin/scaffold-site.sh` vs. `node tools/scaffold.js` unification** — **TODO pending owner** Both scaffold commands are listed. They likely do similar things with different stacks. Should there be one unified scaffold CLI with `--stack` flag?
