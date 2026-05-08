# ONBOARDING — First Day in Web Workflow Master

You just landed in this workspace (human or AI). This is the fastest path to "doing useful work."

If you're an AI agent, this is the target reading order once the companion root docs are emitted:
`WORKSPACE.md` — **TODO pending owner** → `CLAUDE.md` — **TODO pending owner** → this file → `MOBILE.md` — **TODO pending owner** → `QUALITY.md` — **TODO pending owner** → `TOOLS.md` — **TODO pending owner** → `PLAYBOOKS.md` — **TODO pending owner**.

If you're a human, you can skim — the system is designed to be navigated by AI from inside the work, not memorized.

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

## Day one — start a new site

```bash
# 1. Scaffold a site — do not hand-copy templates.
npm run scaffold -- my-site --template nextjs-canonical
# or:
bin/scaffold-site.sh my-site nextjs-canonical
cd sites/my-site
npm install

# 2. Complete the planning artifacts that are now hard gates
# - BRIEF.md: client scenario, audience, goal, constraints, exemplars
# - RESEARCH.md: competitors, industry glossary, compliance, trust signals
# - IA.md: route inventory, primary/secondary access paths, mobile nav
# - CONVERSIONS.md: primary user journeys, CTA truth table, success/failure states
# - TESTING.md: observable assertions and negative checks
# - PRODUCTS.md: required if storefront/catalog is in scope

# 3. Advance only when gates pass.
../../bin/advance-phase.sh design
../../bin/advance-phase.sh build

# 4. Install quality runner dependencies if this site does not already have them
npm i -D stylelint stylelint-config-standard stylelint-declaration-strict-value         pa11y-ci lost-pixel @lhci/cli size-limit @size-limit/preset-app

# 5. Brief the AI on what you're building
# Open this directory in Claude Code, then dispatch:
#
#   Agent({
#     subagent_type: "art-director",
#     prompt: "Build a [site type] for [audience] in the style of [exemplar reference]. Mobile-first."
#   })

# 6. While the AI works, the gate awaits at the end:
npm run dev
# (in another tab)
npm run ship-gate         # runs all gates locally
```

## Mandatory pre-task checklist (AI agents)

**Before writing ANY code, you MUST complete these steps in order:**

1. **Load anti-slop skill**: Invoke `frontend-aesthetics` skill — **TODO pending owner** (skill not yet bundled). This is NOT optional once the skill exists. It breaks AI out of distributional convergence toward generic AI aesthetics.
2. **Read these memory files when present** (in this order; memory bundle is **TODO pending owner**):
   - `.claude/memory/BUILD_GOTCHAS.md` — **TODO pending owner** — know what breaks
   - `.claude/memory/ANTI_SLOP_GUIDE.md` — **TODO pending owner** — know what to avoid
   - `.claude/memory/QUALITY_GATES.md` — **TODO pending owner** — know what must pass
   - `.claude/memory/WORKFLOW.md` — **TODO pending owner** — know the process
   - `.claude/memory/SKILLS_AND_REFERENCES.md` — **TODO pending owner** — know what exists
3. **For new designs/builds**: Fill out `.claude/memory/DECISIONS.md` — **TODO pending owner** — BEFORE any code. Spec first, code second. Human approves spec, then you build.
4. **For animation/component selection**: Read `.claude/memory/COMPONENT_AND_ANIMATION_REGISTRY.md` — **TODO pending owner** — to pick non-repeating components.

## Mandatory post-task verification (AI agents)

**After generating ANY frontend output, you MUST verify:**

1. **Anti-slop checklist** (from `frontend-aesthetics` skill — **TODO pending owner**):
   - No Inter, Roboto, Arial, or system fonts
   - No purple-to-blue gradients on white backgrounds
   - No #7C3AED or #3B82F6 as primary colors
   - Not everything centered — asymmetric layouts used
   - Not everything fades in — animation types varied
   - No uniform spacing — spatial hierarchy present
   - No generic copy ("seamless", "robust", "cutting-edge")
   - Background has atmosphere and depth
   - Typography pairing has high contrast (weight + size + style)
   - Color palette from a named theme, not AI defaults
2. **Dark pattern audit**: No fake urgency, fake social proof, confirmshaming, hidden unsubscribes, forced continuity. See `ANTI_SLOP_GUIDE.md` — **TODO pending owner**.
3. **Run applicable quality gates** from `QUALITY_GATES.md` — **TODO pending owner** (gates 1–4 on every change once emitted).
4. **If output fails any check**: Fix it before declaring done. No exceptions.

## Where to look when

> **Target navigation.** Paths in this table that are not present in this PR are pending their owning function-group PR, even when repeated without inline notes for readability.

| You want to...                                          | Read this                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Understand the workspace structure                      | `WORKSPACE.md` — **TODO pending owner**                                                                                |
| Know which agent to dispatch for what                   | `CLAUDE.md` — **TODO pending owner** (dispatch table)                                                                  |
| Build something mobile-exceptional                      | `MOBILE.md` — **TODO pending owner**                                                                                   |
| Know what "ready to ship" means                         | `QUALITY.md` — **TODO pending owner** + `playbooks/ship-readiness.md` — **TODO pending owner**                         |
| Find which CLI to use                                   | `TOOLS.md` — **TODO pending owner**                                                                                    |
| Pick a site-build playbook                              | `PLAYBOOKS.md` — **TODO pending owner**                                                                                |
| Write copy that doesn't read AI                         | `conventions/voice-and-tone.md` — **TODO pending owner** + `conventions/microcopy-library.md` — **TODO pending owner** |
| Set up motion correctly                                 | `conventions/motion-tokens.md`                                                                                         |
| Pick / fix colors                                       | `conventions/color-apca.md`                                                                                            |
| Wire analytics                                          | `conventions/analytics-events.md`                                                                                      |
| See what A+ looks like                                  | `exemplars/tier-a-plus/`                                                                                               |
| See what to avoid                                       | `exemplars/tier-c-counter-examples/`                                                                                   |
| Choose existing-site / greenfield / storefront workflow | `playbooks/scenario-routing.md`                                                                                        |
| Preserve an existing artist / musician / creator site   | `playbooks/artist-existing-site-rebuild.md`                                                                            |
| Preserve an existing site during rebuild                | `playbooks/intake-existing-site.md`                                                                                    |
| Start with no site / no brand                           | `playbooks/intake-greenfield.md`                                                                                       |
| Research an unknown industry                            | `playbooks/industry-research.md`                                                                                       |
| Research competitors                                    | `playbooks/competitor-research.md`                                                                                     |
| Design navigation and route discovery                   | `playbooks/information-architecture.md`                                                                                |
| Build product filtering/sorting/discovery               | `playbooks/product-discovery.md`                                                                                       |
| Build a small-business storefront                       | `playbooks/storefront-small-business.md`                                                                               |
| Prove tests/assertions actually exercise user outcomes  | `playbooks/test-evidence.md` — **TODO pending owner**                                                                  |
| Run visual QA against exemplars / anti-slop patterns    | `playbooks/visual-quality-review.md` — **TODO pending owner**                                                          |
| Prepare owner handoff / maintenance package             | `playbooks/maintainability-handoff.md`                                                                                 |
| Debug a red ship gate without weakening quality         | `quality/ship-gate-gotchas.md`                                                                                         |
| Generate brand assets (favicons, OG, splash)            | `playbooks/brand-assets.md`                                                                                            |
| Build a quality form                                    | `playbooks/form-quality.md`                                                                                            |
| Add SEO structured data                                 | `schemas/seo-jsonld/README.md` — **TODO pending owner**                                                                |
| Set up Storybook                                        | `playbooks/storybook-setup.md`                                                                                         |
| Add service workers / offline / PWA install prompt      | `playbooks/service-worker-patterns.md`                                                                                 |
| Build dark mode that doesn't suck                       | `playbooks/dark-mode-parity.md`                                                                                        |
| Support RTL languages                                   | `playbooks/rtl-audit.md`                                                                                               |
| Handle reduced motion / data                            | `playbooks/reduced-motion.md`                                                                                          |
| Survive Windows High Contrast                           | `playbooks/forced-colors-mode.md`                                                                                      |
| Print stylesheets                                       | `playbooks/print-styles.md`                                                                                            |
| Survive 200% browser zoom                               | `playbooks/zoom-200.md`                                                                                                |
| Send transactional / marketing email                    | `playbooks/email-infra.md`                                                                                             |

## The eight hard rules (TL;DR of `CLAUDE.md` — **TODO pending owner**)

> Agent names below are target dispatch entries. They become executable only after the `.claude/agents/` bundle lands.

1. **Mobile-first is non-negotiable.** Every UI agent has a mobile DoD. No bare `100vh`. Touch targets ≥ 24 px. Mobile CWV gates are the gate.
2. **Never echo or commit secrets.** `.env` is gitignored. Reference keys by name only.
3. **No design libs at workspace root.** They belong inside each `sites/<name>/` or `clients/<slug>/repo/`.
4. **Don't edit `references/`.** They're upstream clones, treated as read-only.
5. **Don't bypass agents for taste calls.** Implementation is fine inline; aesthetic judgment goes through `design-critic` or `art-director`.
6. **Verify in a real browser before claiming a UI works.** `art-director` and `accessibility-auditor` exist for this. Static analysis ≠ verification.
7. **Gate skips are NO-GO.** `ship-gate.sh --skip ...` is for debugging partial reports only; skipped quality gates cannot produce a shipping verdict.
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

Reads all seven executable gates plus the required evidence reports before phase advancement. If green: deploy. If red: read the evidence files, fix, re-run. Skipped gates are treated as NO-GO.

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

## Help

- Check existing skills via `Skill` tool — many tasks have pre-built ones
- Read `references/` for the upstream version of any concept
- Dispatch `art-director` if confused

Now — go build something good.
