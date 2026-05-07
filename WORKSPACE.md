# gsd-design — Pro-Level Website Design Workspace

A multi-site playground configured for AI-driven website design at production quality.
Mobile is the primary surface, not a responsive afterthought. New sites scaffold under
`sites/<name>/`. The workspace root holds skills, agents, references, templates, and
CLI tooling that every site can borrow from.

## Read order

1. `CLAUDE.md` — operating rules and dispatch table
2. `WORKSPACE.md` (this file) — what's installed and where
3. `AGENTS.md` — agent coordination rules
4. `PLAYBOOKS.md` — copy-paste workflow recipes

## Layout

> **Layout below is the *target* workspace.** Lines annotated with the TODO-pending-owner marker are not yet present on this branch and will be claimed by future function-group PRs.
>
> Currently shipped on this branch: AGENTS.md, ARCHITECTURE.md, CLAUDE.md, MASTER-ROADMAP.md, PLAYBOOKS.md, WORKSPACE.md, .claude/agents, .claude/commands, .claude/skills, .merge-decisions, inventory.

```
.
├── .claude/
│   ├── settings.json           # MCPs, permissions, env vars — TODO pending owner (quality function group)
│   ├── agents/                 # Specialist subagents (15 agents, consolidated from 30)
│   ├── skills/                 # Custom skills
│   └── memory/                 # Persistent project memory — TODO pending owner (quality function group)
├── refs/                       # TODO pending owner — read-only upstream clones (design systems, checklists, engines)
├── sites/                      # TODO pending owner — individual website projects (per-site deps + builds)
├── scripts/                    # TODO pending owner — automation scripts
│   ├── create-project.sh       # Scaffold new client project
│   ├── screenshot.sh           # Multi-viewport screenshots
│   ├── verify-site.sh          # Quality gate pipeline
│   ├── click-path-audit.sh     # Link + page crawl audit
│   └── visual-audit.sh         # Screenshot multi-viewport QA
├── quality/                    # TODO pending owner (quality function group) — enforcement
│   ├── ship-gate.sh            # Single Go/No-Go aggregator
│   ├── lighthouse/             # mobile CWV + resource budgets
│   ├── a11y/                   # WCAG 2.2 AA checks
│   ├── bundle-size/            # per-route JS budgets
│   └── click-path-audit/       # structural truth (404s, Lorem, anchors, forms)
├── conventions/                # TODO pending owner — workspace-wide conventions (voice, motion, color, etc.)
│   ├── voice-and-tone.md
│   ├── microcopy-library.md
│   ├── banned-words.json + banned-words-detect.sh
│   ├── motion-tokens.md
│   └── color-apca.md
├── exemplars/                  # TODO pending owner — taste calibration corpus
│   ├── tier-a-plus/            # reference site teardowns
│   └── tier-c-counter-examples/ # AI-slop pattern library
├── playbooks/                  # TODO pending owner — depth playbooks (problem-specific)
│   ├── brand-assets.md
│   ├── form-quality.md
│   ├── service-worker-patterns.md
│   ├── storybook-setup.md
│   ├── dark-mode-parity.md
│   ├── reduced-motion.md
│   ├── competitor-research.md
│   ├── intake-existing-site.md
│   ├── intake-greenfield.md
│   ├── visual-quality-review.md
│   ├── conversion-flow-testing.md
│   ├── ship-readiness.md       # TODO pending owner (quality function group). 30-point final gate.
│   └── maintainability-handoff.md
└── ops/                        # TODO pending owner — sales pipeline, legal, financial
    ├── legal/                  # MSA, SOW templates (DRAFTS)
    ├── sales/                  # Cold email templates
    └── stripe-links.md         # Payment link references
```

## Agents (`.claude/agents/`) — 30+ specialists

Dispatch via `Agent` tool with `subagent_type: <name>`. Independent agents run in parallel — single message, multiple tool calls.

Full agent listing and trigger conditions are in `CLAUDE.md`.

## Skills (`.claude/skills/`)

Custom skills for this workspace. Auto-discovered by Claude Code.

**Core implementation**: `frontend-aesthetics`, `design-research`, `visual-qa`, `add-component`

**Official skills**: Downloaded from anthropics/skills — `frontend-design`, `web-artifacts-builder`, `webapp-testing`, `theme-factory`, `canvas-design`, `brand-guidelines`

**Everything Claude Code**: From affaan-m/everything-claude-code — `frontend-patterns`, `frontend-slides`, `ui-demo`, `multi-frontend`

**Reference skills** under refs/ — **TODO pending owner**. Repos: impeccable, taste-skill.

## MCP servers (`.claude/settings.json`)

| Server | Cost | Purpose |
|---|---|---|
| `firecrawl` | freemium | Web scraping, extraction, crawling |
| `shadcn` | free | Pull shadcn/ui component source on demand |
| `context7` | free | Live, version-specific library docs lookup |
| `chrome-devtools` | free | DevTools protocol — throttling, traces, profiling |
| `browserbase` | paid | Cloud / real-device sessions; opt-in only |

## CLI tools (available)

- `surf` — browser control (default for browser work, free, local Chromium)
- `unlighthouse` — bulk Lighthouse across all routes; mobile preset by default
- `axe` — WCAG 2.2 audit
- `sharp` — image conversion to AVIF/WebP
- `svgo` — SVG optimization
- `vercel` — deploy
- `firecrawl-cli` — scrape/search
- `playwright` — full E2E testing escape hatch
- `prettier` — format

## References (`refs/` — **TODO pending owner**) — read-only

Cloned repos, shallow `--depth=1`:

| Repo | Why it's here |
|---|---|
| `front-end-checklist` | Exhaustive web QA checklist |
| `front-end-performance-checklist` | Performance counterpart |
| `awesome-design-md` | 71 real-brand DESIGN.md files |
| `awesome-shadcn-ui` | Curated shadcn/ui resources |
| `open-design` | 72 brand design systems + skills |
| `browser-harness` | CDP-driven browser harness for AI agents |
| `Scrapling` | Local anti-bot scraping |
| `magicui` | Animated component registry |
| `react-bits` | Animation component patterns |
| `gsap-skills` | Official GSAP examples |
| `impeccable` | Premier design skill |
| `taste-skill` | Anti-slop framework |

These are gitignored so we don't track upstream churn.

## Per-site dependencies (NOT at workspace root)

Install inside each `sites/<name>/`:

- **Framework**: Next.js 16 App Router
- **Styling/components**: Tailwind CSS 4, shadcn/ui, magicui, react-bits
- **Animation**: GSAP (free MIT), Framer Motion
- **Forms/state**: react-hook-form, zod, zustand, @tanstack/react-query
- **PWA (when mobile-installable)**: next-pwa

Workspace root stays free of design libs so multiple sites don't fight over versions.

## Default stack

When the user doesn't specify, scaffold with: **Next.js 16 App Router, Tailwind 4, shadcn/ui, GSAP for motion, Vercel for deploy.** Add a PWA plugin when mobile-installable is in scope.

## Env

`.env` (gitignored) holds secrets. Required for full operation:

- `BROWSERBASE_API_KEY` + `BROWSERBASE_PROJECT_ID` — set for cloud browser
- `FIRECRAWL_API_KEY` — set if firecrawl-cli should run authenticated
- `VERCEL_TOKEN` — for deploys

Never commit `.env`. Never paste keys into prompts you'll save.
