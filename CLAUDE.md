# Design Workspace — AI-Powered Website Design

Pro-level website design workspace. Next.js 16 + React 19 + Tailwind 4 + shadcn/ui. GSAP + Framer Motion for animation. surf-cli for local browser automation. Firecrawl for research. Mobile is the primary surface, not a responsive afterthought.

## ⚠️ MANDATORY PRE-TASK CHECKLIST (DO NOT SKIP)

**Before writing ANY code, you MUST complete these steps in order:**

1. **Load anti-slop skill**: Invoke `frontend-aesthetics` skill. This is NOT optional. It breaks Claude out of distributional convergence toward generic AI aesthetics.
2. **Read these memory files** (in this order) — **TODO pending owner** (quality function group, not yet synthesized; skip steps that reference an unlanded file):
   - `.claude/memory/MEMORY_INDEX.md` — **TODO pending owner** (quality function group) — know what exists
   - `.claude/memory/ANTI_PATTERNS.md` — **TODO pending owner** (quality function group) — know what to avoid
   - `.claude/memory/QUALITY_GATES.md` — **TODO pending owner** (quality function group) — know what must pass
   - `.claude/memory/AUTONOMOUS_WORKFLOW.md` — **TODO pending owner** (quality function group) — know the process
3. **For new designs/builds**: Fill out `.claude/memory/DESIGN_SPEC_TEMPLATE.md` — **TODO pending owner** — BEFORE any code. Spec first, code second. Human approves spec, then you build.
4. **For animation/component selection**: Read `.claude/memory/ANIMATION_REGISTRY.md` — **TODO pending owner** — to pick non-repeating components.
5. **For mobile scope**: Read `.claude/memory/MOBILE.md` (or `MOBILE.md` at workspace root) — **TODO pending owner** — the mobile-first bible.

## ⚠️ MANDATORY POST-TASK VERIFICATION (DO NOT SKIP)

**After generating ANY frontend output, you MUST verify:**

1. **Anti-slop checklist** (from `frontend-aesthetics` skill):
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
2. **Dark pattern audit**: No fake urgency, fake social proof, confirmshaming, hidden unsubscribes, forced continuity. See `ANTI_PATTERNS.md` — **TODO pending owner** (quality function group).
3. **Run applicable quality gates** from `QUALITY_GATES.md` (gates 1-4 on every change) — **TODO pending owner** (quality function group).
4. **Mobile-first verification**: Test at 375px viewport minimum. Touch targets ≥44×44px. No horizontal scroll.
5. **If output fails any check**: Fix it before declaring done. No exceptions.

## ⚠️ SKIP THESE RULES AND THE OUTPUT IS REJECTED

If you skip the pre-task checklist, your output will be generic AI slop.
If you skip the post-task verification, you will ship broken/inaccessible/dark-pattern code.
These rules are not suggestions. They are the minimum quality floor.

## Project Structure

> **Layout below is the *target* workspace.** Lines annotated with the TODO-pending-owner marker are not yet present on this branch and will be claimed by future function-group PRs.
>
> Currently shipped on this branch: AGENTS.md, ARCHITECTURE.md, CLAUDE.md, MASTER-ROADMAP.md, PLAYBOOKS.md, WORKSPACE.md, .claude/agents, .claude/commands, .claude/skills, .merge-decisions, inventory.

```
.
├── site/                          # Next.js app (production code)
│   ├── src/app/                   # App router pages
│   ├── src/components/            # React components
│   │   ├── sections/              # Page sections (Hero, Features, etc.)
│   │   └── ui/                    # shadcn/ui components
│   ├── src/hooks/                 # Animation + shared hooks
│   ├── src/lib/                   # Utilities (cn, animations)
│   ├── src/test/                  # Test setup
│   ├── e2e/                       # Playwright E2E tests
│   ├── .storybook/                # Storybook config
│   ├── public/                    # Static assets
│   ├── next.config.ts             # Next.js config
│   ├── vitest.config.ts           # Vitest config
│   └── playwright.config.ts       # Playwright config
│
├── sites/                         # TODO pending owner — multi-site projects (per-site deps + builds)
│   └── <name>/                    # Individual website project
│       ├── src/                   # Source code
│       └── package.json           # Per-site dependencies
│
├── refs/                          # TODO pending owner — cloned reference repositories (read-only)
├── design-assets/                 # TODO pending owner — generated assets, screenshots, exports
│   └── qa/                        # Screenshot outputs
├── scripts/                       # TODO pending owner — automation scripts
│   ├── dev.sh                     # Start dev server + open browser
│   ├── screenshot.sh              # Multi-viewport screenshots
│   ├── verify-site.sh             # Quality gate pipeline
│   ├── click-path-audit.sh        # Link + page crawl audit
│   ├── visual-audit.sh            # Screenshot multi-viewport QA
│   └── create-project.sh          # Scaffold new client project
│
├── .claude/                       # Claude Code project config
│   ├── settings.json              # TODO pending owner — MCPs, permissions, env vars
│   ├── agents/                    # Specialist subagents
│   ├── skills/                    # Custom skills
│   ├── skills-official/           # TODO pending owner — Anthropic official skills
│   └── memory/                    # TODO pending owner (quality function group) — persistent project memory
│       ├── MEMORY_INDEX.md        # TODO pending owner — read first; index of all memory
│       ├── DESIGN_SYSTEM.md       # TODO pending owner — tokens, conventions, architecture
│       ├── COMPONENT_REGISTRY.md  # TODO pending owner — component inventory
│       ├── ANTI_PATTERNS.md       # TODO pending owner — what to avoid
│       ├── QUALITY_GATES.md       # TODO pending owner — mandatory checks
│       ├── AUTONOMOUS_WORKFLOW.md # TODO pending owner — how AI operates
│       └── DECISIONS.md           # TODO pending owner — design decisions log
│
├── quality/                       # TODO pending owner (quality function group) — quality enforcement
│   ├── ship-gate.sh               # Single Go/No-Go aggregator
│   ├── lighthouse/                # Mobile CWV + resource budgets
│   ├── a11y/                      # WCAG 2.2 AA checks
│   ├── bundle-size/               # Per-route JS budgets
│   └── click-path-audit/          # Structural truth (404s, Lorem, anchors)
│
├── conventions/                   # TODO pending owner — workspace-wide conventions
│   ├── voice-and-tone.md
│   ├── microcopy-library.md
│   ├── banned-words.json
│   ├── motion-tokens.md
│   └── color-apca.md
│
├── exemplars/                     # TODO pending owner — taste calibration corpus
│   ├── tier-a-plus/               # Reference site teardowns
│   └── tier-c-counter-examples/   # AI-slop pattern library
│
├── playbooks/                     # TODO pending owner — depth playbooks (problem-specific)
│   ├── brand-assets.md
│   ├── form-quality.md
│   ├── service-worker-patterns.md
│   ├── dark-mode-parity.md
│   ├── reduced-motion.md
│   ├── competitor-research.md
│   ├── intake-existing-site.md
│   ├── intake-greenfield.md
│   ├── visual-quality-review.md
│   ├── conversion-flow-testing.md
│   ├── ship-readiness.md          # 30-point final gate
│   └── maintainability-handoff.md
│
└── ops/                           # TODO pending owner — sales pipeline, legal, financial
    ├── legal/                     # MSA, SOW templates (DRAFTS)
    ├── sales/                     # Cold email templates
    └── stripe-links.md            # Payment link references
```

## Quick Commands

| Task                 | Command                                         |
| -------------------- | ----------------------------------------------- |
| Dev server + browser | `./scripts/dev.sh`                              |
| Dev server only      | `cd site && npm run dev`                        |
| Build                | `cd site && npm run build`                      |
| Format               | `cd site && npx prettier --write .`             |
| Lint                 | `cd site && npm run lint`                       |
| Unit tests           | `cd site && npm run test`                       |
| Unit tests (watch)   | `cd site && npm run test:watch`                 |
| E2E tests            | `cd site && npm run test:e2e`                   |
| Storybook            | `cd site && npm run storybook`                  |
| Add shadcn component | `cd site && npx shadcn@latest add [component]`  |
| Browse site          | `surf http://localhost:3000`                    |
| Screenshot           | `surf screenshot` (after navigating)            |
| Multi-viewport QA    | `./scripts/screenshot.sh http://localhost:3000` |
| Verify pipeline      | `./scripts/verify-site.sh`                      |
| Click-path audit     | `./scripts/click-path-audit.sh`                 |
| Visual audit         | `./scripts/visual-audit.sh`                     |
| New client project   | `./scripts/create-project.sh <name> <industry>` |
| Sitemap generation   | `cd site && npm run generate:sitemap`           |
| Bulk Lighthouse      | `unlighthouse --site <url>`                     |
| A11y sweep           | `axe <url>`                                     |
| Image optimization   | `sharp -i in.jpg -o out.avif`                   |
| SVG optimization     | `svgo input.svg`                                |

## Design System

- **Framework**: Next.js 16 App Router, React 19, TypeScript 5+
- **Styling**: Tailwind CSS 4 with CSS variable theming
- **Components**: shadcn/ui (base-ui/react primitives + Tailwind)
- **Animation**: GSAP + ScrollTrigger + Framer Motion
- **Icons**: Lucide React
- **Fonts**: Geist (Next.js font optimization), Fontsource for self-hosted variable fonts
- **Quality**: Prettier + ESLint + React Scan
- **Color**: OKLCH color space for all tokens (perceptually uniform)

### Testing & QA

| Tool                      | Purpose                                     | Command             |
| ------------------------- | ------------------------------------------- | ------------------- |
| **Vitest**                | Unit/component tests                        | `npm run test`      |
| **React Testing Library** | Component rendering in tests                | —                   |
| **Playwright**            | E2E tests (Chrome, Firefox, Safari, mobile) | `npm run test:e2e`  |
| **axe-core**              | Accessibility testing (WCAG 2.1 AA)         | Runs in E2E         |
| **Storybook**             | Component isolation + docs + visual testing | `npm run storybook` |
| **@storybook/addon-a11y** | Accessibility checks in Storybook           | —                   |

### Browser Automation (surf CLI)

Primary browser tool. Direct CLI, no MCP wrapper overhead.

```bash
surf go https://localhost:3000          # Navigate
surf read                               # Page accessibility tree
surf screenshot                         # Capture
surf emulate.device "iPhone 14"         # Mobile viewport
surf click e5                           # Click element by ref
surf locate.role button --name Submit   # Find by ARIA
surf console --level error              # Console logs
surf network --status 4xx,5xx           # Network errors
```

### MCPs

| Server        | Purpose                           | Cost     | Priority                   |
| ------------- | --------------------------------- | -------- | -------------------------- |
| `firecrawl`   | Scrape, extract, crawl websites   | Freemium | Primary for research       |
| `browserbase` | Cloud browser (anti-bot, proxies) | Paid     | Backup for difficult sites |
| `shadcn`      | Pull shadcn/ui component source   | Free     | Component scaffolding      |
| `context7`    | Live library docs lookup          | Free     | API reference              |
| `chrome-devtools` | DevTools protocol              | Free     | Traces, profiling          |

### Using Firecrawl

```
Use firecrawl MCP to scrape https://example.com and extract:
- Color palette
- Typography scale
- Layout patterns
- Component structures
```

## Agents

Dispatch design-specialized agents for parallel work. Each agent declares its `tools:` (least-privilege) and `model:`.

### Intake & discovery
| Agent | File | Role | Model | Trigger |
|---|---|---|---|---|
| `intake-interviewer` | `.claude/agents/intake-interviewer.md` | Gate 1: gather requirements, fill schema, identify gaps | sonnet | "intake", "discovery", "project requirements" |
| `research-agent` | `.claude/agents/research-agent.md` | Competitor teardowns + deep site reverse-engineering | sonnet | "research", "clone this", "extract tokens" |
| `exemplar-curator` | `.claude/agents/exemplar-curator.md` | Per-project tier-a+ shortlist from corpus | sonnet | "curate exemplars", "pick references" |

### Strategy & taste
| Agent | File | Role | Model | Trigger |
|---|---|---|---|---|
| `art-director` | `.claude/agents/art-director.md` | Orchestration entrypoint; final aesthetic call | opus | Multi-step design task |
| `design-critic` | `.claude/agents/design-critic.md` | Adversarial review; hunts AI-slop | opus | Before shipping any work |
| `brand-strategist` | `.claude/agents/brand-strategist.md` | Positioning, voice, naming, brand pillars + SEO | sonnet | Project start |
| `content-modeler` | `.claude/agents/content-modeler.md` | CMS schema + copy-editing tone | sonnet | CMS, content model |

### Design system & variants
| Agent | File | Role | Model | Trigger |
|---|---|---|---|---|
| `design-system-agent` | `.claude/agents/design-system-agent.md` | Themes, tokens, color, type, layout, icons, illustration | sonnet | Design system work |
| `animation-agent` | `.claude/agents/animation-agent.md` | GSAP + Framer Motion, scroll reveals | sonnet | Animation task |
| `variant-orchestrator` | `.claude/agents/variant-orchestrator.md` | Spawn 3 parallel directions from one brief | opus | "generate variants", "3 concepts" |

### Implementation
| Agent | File | Role | Model | Trigger |
|---|---|---|---|---|
| `ui-engineer` | `.claude/agents/ui-engineer.md` | React/Tailwind/shadcn + responsive + mobile | sonnet | Build component |
| `interaction-engineer` | `.claude/agents/interaction-engineer.md` | Forms, focus, keyboard, touch gestures | sonnet | Interaction wiring |

### Quality & ship
| Agent | File | Role | Model | Trigger |
|---|---|---|---|---|
| `accessibility-auditor` | `.claude/agents/accessibility-auditor.md` | WCAG 2.2 AA + e2e journeys + device matrix | sonnet | A11y audit, "test the flow" |
| `performance-engineer` | `.claude/agents/performance-engineer.md` | Mobile CWV + analytics + security + images | sonnet | Performance task |
| `shipper` | `.claude/agents/shipper.md` | Vercel deploy + canary monitoring | sonnet | Deployment |

*15 agents total. Consolidated from 30 gsd-design agents — see `.merge-decisions/meta-orchestration/agents-consolidation.md` for fold details.*

## Skills

### Custom Skills (`.claude/skills/`)

| Skill                 | File                     | Use When                                                            |
| --------------------- | ------------------------ | ------------------------------------------------------------------- |
| `frontend-aesthetics` | `frontend-aesthetics.md` | Before ANY frontend design task — breaks AI out of slop convergence |
| `design-research`     | `design-research.md`     | Researching competitor sites                                        |
| `visual-qa`           | `visual-qa.md`           | Running visual quality checks                                       |
| `add-component`       | `add-component.md`       | Adding new shadcn/ui components                                     |

### Official Skills (`.claude/skills-official/`)

Downloaded from [anthropics/skills](https://github.com/anthropics/skills):

| Skill                   | File                       |
| ----------------------- | -------------------------- |
| `frontend-design`       | `frontend-design.md`       |
| `web-artifacts-builder` | `web-artifacts-builder.md` |
| `webapp-testing`        | `webapp-testing.md`        |
| `theme-factory`         | `theme-factory.md`         |
| `canvas-design`         | `canvas-design.md`         |
| `brand-guidelines`      | `brand-guidelines.md`      |

### Everything Claude Code Skills (`.claude/skills-ecc/`)

From [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code):

| Skill               | File                   |
| ------------------- | ---------------------- |
| `frontend-patterns` | `frontend-patterns.md` |
| `frontend-slides`   | `frontend-slides.md`   |
| `ui-demo`           | `ui-demo.md`           |
| `multi-frontend`    | `multi-frontend.md`    |

### Impeccable (in `refs/impeccable/` — **TODO pending owner**)

**Highest quality design skill in the workspace.** 25k stars. Built on Anthropic's frontend-design but adds:

- **7 domain references**: typography, color-and-contrast, spatial-design, motion-design, interaction-design, responsive-design, ux-writing
- **23 commands**: `craft`, `polish`, `audit`, `critique`, `distill`, `animate`, `bolder`, `quieter`, and more
- **27 deterministic anti-pattern rules** with CLI + browser extension
- Preflight gates: context, product, command, craft, image, mutation

Use by reading `refs/impeccable/skill/SKILL.md` — **TODO pending owner** — and its reference files.

### Taste Skill (in `refs/taste-skill/` — **TODO pending owner**)

15k stars. Anti-slop frontend framework. Skills for layout, typography, motion, spacing.

- `taste-skill/` — Core taste framework
- `redesign-skill/` — Redesign patterns
- `imagegen-frontend-web/` — Web design image generation
- `image-to-code-skill/` — Convert designs to code
- `minimalist-skill/`, `brutalist-skill/`, `soft-skill/` — Style-specific skills

## Reference Repos (21+)

Read for patterns. Never import directly.

| Repo                               | What It Is                            | Quality            |
| ---------------------------------- | ------------------------------------- | ------------------ |
| `ai-website-cloner-template/`      | Clone websites with AI agents         | High — 13.9k stars |
| `animate.css/`                     | CSS animation library                 | Mature             |
| `awesome-design-md/`               | Curated design resources              | Good               |
| `awesome-shadcn-ui/`               | Curated shadcn component collections  | Good               |
| `browser-harness/`                 | Browser automation patterns           | Good               |
| `design-blocks/`                   | Froala HTML design blocks             | Reference          |
| `design.md/`                       | Google design.md format               | Good               |
| `Front-End-Checklist/`             | Pre-launch QA checklist               | Essential          |
| `Front-End-Performance-Checklist/` | Performance audit                     | Essential          |
| `gsap-skills/`                     | Official GSAP example code            | Official           |
| `huashu-design/`                   | Chinese design system patterns        | Reference          |
| `impeccable/`                      | **Premier design skill** (see above)  | **Exceptional**    |
| `magicui/`                         | 30+ animated components with registry | Good               |
| `open-design/`                     | Open design system                    | Reference          |
| `open-lovable/`                    | AI website builder patterns           | Reference          |
| `react-bits/`                      | React animation component snippets    | Good               |
| `Scrapling/`                       | Stealth web scraping                  | Good               |
| `stitch-skills/`                   | Google stitch patterns                | Reference          |
| `taste-skill/`                     | Anti-slop design framework            | High — 15.3k stars |
| `ui-ux-pro-max-skill/`             | UI/UX skill patterns                  | Reference          |
| `web-check/`                       | Website audit tool                    | Good               |

## Workflow: New Page

1. **Research**: `research-agent` for competitor teardowns and exemplar analysis
2. **Layout**: `ui-engineer` builds page structure (mobile-first, responsive absorbed)
3. **Components**: `npx shadcn@latest add [component]` + customize
4. **Animation**: Dispatch `animation-agent` for scroll reveals
5. **Test**: Write Vitest test, make it pass
6. **E2E**: `accessibility-auditor` for critical user flow coverage (e2e absorbed)
7. **QA**: `npm run build` + `./scripts/screenshot.sh` + review
8. **Polish**: Use Impeccable's `polish` or `audit` commands from `refs/impeccable/` — **TODO pending owner**
9. **Mobile verification**: Test at 375px, 768px, 1440px

## Workflow: Component Design

1. Define props interface
2. Build structure with semantic HTML
3. Style with Tailwind, use theme variables
4. Add Framer Motion for interaction states
5. Write Storybook story for isolated development
6. Write Vitest test for component behavior
7. Run axe-core accessibility check in Storybook
8. Test in page context at 375px minimum
9. Run Impeccable critique against anti-patterns

## Workflow: Ship It

```
accessibility-auditor ‖ performance-engineer    # parallel QA gate
  ↓
shipper                     # Vercel deploy + canary
```

Both parallel reviewers must return pass before `shipper` runs. Any flag → fix → re-run that reviewer only.

**Performance gate:** Mobile Lighthouse Performance ≥90 with Slow 4G + 4× CPU throttle. Desktop is a follow-on.

**Quality system note:** `QUALITY.md`, `quality/ship-gate.sh`, and `playbooks/ship-readiness.md` are TODO pending owner (quality function group, future PR). Until synthesized, shipper runs manual pre-deploy checklist + canary.

## Persistent Memory

AI must read these files at the start of every task — **all TODO pending owner** (quality function group, not yet synthesized):

1. `.claude/memory/MEMORY_INDEX.md` — **TODO pending owner** (quality function group) — Index of all memory
2. `.claude/memory/DESIGN_SYSTEM.md` — **TODO pending owner** (quality function group) — Tokens and conventions
3. `.claude/memory/COMPONENT_REGISTRY.md` — **TODO pending owner** (quality function group) — What's built
4. `.claude/memory/ANTI_PATTERNS.md` — **TODO pending owner** (quality function group) — What to avoid
5. `.claude/memory/QUALITY_GATES.md` — **TODO pending owner** (quality function group) — Mandatory checks
6. `.claude/memory/AUTONOMOUS_WORKFLOW.md` — **TODO pending owner** (quality function group) — How to operate

Until synthesized, use `frontend-aesthetics` skill + `conventions/` — **TODO pending owner** — folder for anti-pattern and quality guidance.

Update memory files after every structural change (when they exist).

## Autonomous Operation

When given a design task, AI follows `AUTONOMOUS_WORKFLOW.md` — **TODO pending owner** (quality function group):

1. **Discovery** — Read memory, research if needed
2. **Shape** — Define success criteria, check anti-patterns
3. **Build** — Write test first, then component, then story
4. **Polish** — Animation, accessibility, responsive, mobile-first
5. **Verify** — Run all quality gates

Escalate to user after 3 failed attempts or when requirements are unclear.

`AUTONOMOUS_WORKFLOW.md` is **TODO pending owner**.

Until it lands, use AGENTS.md dispatch rules and PLAYBOOKS.md workflow recipes.

## Mobile-First Rules

- Mobile is the lead surface. Desktop is a follow-on.
- Bare `100vh` is banned — use `100dvh` for dynamic viewport.
- Touch targets ≥44×44px (48px preferred).
- No horizontal scroll at any breakpoint.
- Test on iPhone SE (375px) before declaring done.
- Respect `prefers-reduced-motion` on all animations.
- Use `unlighthouse --site <url>` with mobile preset for CWV checks.

## Rules

- Always use `next/image` with width/height or fill
- Prefer server components; `"use client"` only for hooks/browser APIs
- Keep UI feedback animations under 300ms, reveals 400-600ms
- Respect `prefers-reduced-motion`
- Format on save with Prettier
- Export arrays/constants outside components (not recreated per render)
- Use Framer Motion `whileInView` instead of raw IntersectionObserver
- Write failing test before component code (Iron Law #2)
- Never install design libs at workspace root — they go inside `sites/<name>/`
- Never modify `refs/` — **TODO pending owner** — read-only upstream clones
- Never use `browserbase` for local dev — use `surf-cli` first

## Business Context

This workspace supports a productized local-business website operation:
- **Brand**: Metzger Website Design
- **Niche**: Independent jewelers (default), extensible
- **Metro**: Los Angeles, CA
- **Tiers**: Starter $1,800/$95mo · Standard $3,500/$135mo · Premium $6,500/$225mo
- **Rhythm**: 5 cold emails/week · Sunday maintenance batch · quarterly reviews
- **Deposit gate**: 50% paid before any client build starts. No exceptions.

See `MASTER-ROADMAP.md` for operational milestones and `ops/` for sales/legal templates.

## For AI Agents: Out of Scope (Cannot Do)

- Form LLC / get EIN
- Open bank accounts or verify Stripe
- Purchase domains
- Sign legal documents
- Run Lighthouse in a real browser (use surf-cli/unlighthouse)
- Send actual emails (AI writes, user sends)
- Install design libraries at workspace root

## Read Order for New Sessions

1. This file (`CLAUDE.md`) — routing table
2. `.claude/memory/MEMORY_INDEX.md` — **TODO pending owner** (quality function group)
3. `WORKSPACE.md` — installed tools and where they live
4. `QUALITY_GATES.md` — **TODO pending owner** (quality function group). Enforcement system.
5. `MOBILE.md` — **TODO pending owner** (quality function group). Mobile-first bible.
6. `PLAYBOOKS.md` — workflow recipes

<!-- MANUAL: -->
