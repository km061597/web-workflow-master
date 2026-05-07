---
name: workflow-orchestration
aliases: autonomous-workflow, memory-index
description: How the AI operates autonomously on design tasks — discovery, spec, build, polish, verify phases — plus index of all memory files, reference repos, and scripts. The single source of truth for "what to read when."
type: project
---

## Pre-flight Checklist

Before starting any work:

1. Verify canonical stack: Next.js 16 + React 19 + Tailwind 4 + shadcn/ui
2. Check BUILD_GOTCHAS.md for known issues with current stack version
3. Confirm client requirements against CLIENT_LIFECYCLE.md (Sections 1-3)
4. Run applicable quality gates from QUALITY_GATES.md
5. Document decisions in DECISIONS.md


# Workflow Orchestration

## Phase 1: Discovery (No code yet)

1. **Load anti-slop skill** — Invoke `frontend-aesthetics` skill before any design work. This breaks Claude out of distributional convergence toward generic AI aesthetics.
2. **Read task brief** — Understand what user wants
3. **Check memory** — Read relevant `.claude/memory/` files for context:
   - `SKILLS_AND_REFERENCES.md` — Know design-system and reference-pack guidance; standalone design-system memory is TODO pending owner (design-spec function group)
   - `COMPONENT_AND_ANIMATION_REGISTRY.md` — Know what's built
   - `DECISIONS.md` — Know past choices
   - `ANTI_SLOP_GUIDE.md` — Know what to avoid
   - `BUILD_GOTCHAS.md` + `QUALITY_GATES.md` — Know technical pitfalls and quality gates
4. **Research if needed** — Use firecrawl MCP or surf CLI
5. **Cache research** — Save to `.claude/memory/RESEARCH.md`
6. **Form plan** — State assumptions, present alternatives if unclear

## Phase 2: Shape (Still no code — Spec-Driven Development)

**CRITICAL**: Fill out the design spec artifact before any code. The standalone design-spec memory file is TODO pending owner (design-spec function group); until it is emitted, use the design-spec author skill/artifact from that function group as the spec source of truth. If implementation reveals a spec flaw, fix the spec first, then the code — otherwise you get "snowball deviation" across tasks.

1. **Produce DESIGN.md** — Use the design-spec author template/artifact from the design-spec function group. Fill ALL 10 sections: Project Identity, Color, Typography, Layout, Components, Motion, Depth, Do's/Don'ts, Responsive, Accessibility. No "[TODO]" or "[PICK]" placeholders allowed.
2. **Select theme** — Pick from thematic injection categories (cyberpunk, editorial, brutalist, Swiss, Japanese minimalism, Art Deco, Vaporwave, etc.). Do NOT leave theme open — lock it in.
3. **Set design dials** — Pick DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY values from taste-skill framework. Document in DESIGN.md.
4. **Choose typography** — Pick a high-contrast pairing. Never Inter, Roboto, Arial, or system fonts. See `frontend-aesthetics` skill for alternatives.
5. **Human approves DESIGN.md** — Stop and wait. Do not write code until spec is approved.
6. **Check anti-patterns** — Will this fall into any AI slop traps? Verify against `ANTI_SLOP_GUIDE.md`.
7. **Get confirmation if ambiguous** — Stop and ask, don't guess

## Phase 3: Build (Layer-based + Prompt Chain — never everything in one prompt)

Build in strict layer order. Each layer is a separate prompt chain step. Never generate styling and layout in the same pass. Use context anchors: `Project: X | Phase: Layer N | Last: Y`.

**Layer 1: Layout first** — Structure, sections, information hierarchy. No colors, no fonts yet. Ask Claude to "show folder structure before writing code."

**Layer 2: Styling next** — Color, typography, visual identity. Apply locked-in theme from DESIGN.md. All design tokens from spec.

**Layer 3: Interactions last** — Animations, hover states, micro-interactions. Only after layout + styling are solid.

**Divergent-then-convergent for visual quality**: Generate 3-4 parallel variations in Layer 2, pick the best, refine with 2 focused iterations. Use strong model for exploration, lighter model for refinement.

Per layer:

1. **Write failing test first** — Iron Law #2
2. **Write component** — Server Component default, client only when needed
3. **Add to Storybook** — Isolated development
4. **Run quality gates** — See `QUALITY_GATES.md` and `BUILD_GOTCHAS.md`
5. **Fix failures** — Self-correct, don't proceed with failing gates
6. **Update registry** — Add to `COMPONENT_AND_ANIMATION_REGISTRY.md`
7. **⚠️ Anti-slop verification** — After every layer, run the 10-point checklist from `frontend-aesthetics` skill. If ANY point fails, fix before proceeding to next layer. This gate is HARD — no exceptions.

## Phase 4: Polish

1. **Impeccable critique** — Run the impeccable critique command when the reference-pack function group emits it. Fix all critical anti-patterns.
2. **Animation** — GSAP for scroll, Framer Motion for interactions. Consult `COMPONENT_AND_ANIMATION_REGISTRY.md` for magicui/react-bits options.
3. **Accessibility** — axe-core check, keyboard nav, focus states
4. **Responsive** — Mobile-first, test breakpoints
5. **Performance** — next/image, lazy loading, no layout shifts

## Phase 5: Verify

1. **Run verification pipeline** — Use project-provided verification tooling when present; the canonical quality command is TODO pending owner (quality toolchain function group).
   - Must pass: build, tests, TypeScript, format, lint, no TODOs
   - Warn tracked: placeholders (replace before delivery), registry sync
2. **Run click-path audit** — Use the project click-path audit when present; the canonical click-path command is TODO pending owner (quality toolchain function group).
   - All pages return 200
   - All href links resolve
3. **Run visual audit** — Use the project visual audit when present; the canonical visual-audit command is TODO pending owner (quality toolchain function group).
   - Screenshots at mobile/tablet/desktop
   - No blank pages, no broken images
4. **Review anti-patterns** — Final check against `ANTI_SLOP_GUIDE.md` + Impeccable anti-pattern rules
5. **Update decisions** — Log any new design decisions in `DECISIONS.md`

## New Project Workflow

When starting a client site:

1. **Research** — Run competitor research workflow from `CLIENT_LIFECYCLE.md`
2. **Scaffold** — Use the project scaffold command when present; the canonical scaffold command is TODO pending owner (scaffold function group)
3. **Configure** — Edit `.claude/project-brief.md`, pick variations from the design-spec function group artifacts, set taste-skill dials
4. **Build** — Follow Phases 1-5 above
5. **Deliver** — All gates pass, click-path clean, visual audit clean

## Maintenance Workflow

When updating a delivered client site, follow `CLIENT_OPERATIONS.md` maintenance guidance (7-step change management process).

## Migration Workflow

When replacing an existing client website, follow `CLIENT_OPERATIONS.md` migration guidance (6-phase preservation-first process).

## Escalation Paths

| Situation                         | Action                                                    |
| --------------------------------- | --------------------------------------------------------- |
| Unclear requirements              | Stop. State assumptions. Ask user.                        |
| Conflicts with existing decisions | Read `DECISIONS.md`. If contradicts, ask user.            |
| Test fails after 3 attempts       | Stop. Report blocker to user.                           |
| Build fails after 3 attempts      | Stop. Report error to user.                               |
| Need new dependency               | Check if it conflicts with existing stack. Ask if unsure. |
| Design token conflict               | Read the design-spec function group artifacts. Update if intentional. |
| Component already exists          | Check `COMPONENT_AND_ANIMATION_REGISTRY.md`. Reuse, don't duplicate. |
| Verify script fails               | Fix before proceeding. Never ship with failing gates.     |

## Self-Correction

When something fails:

1. Read the error message carefully
2. Check if it's a known issue in `DECISIONS.md`
3. Try simplest fix first
4. If still failing, try alternative approach
5. After 3 attempts, escalate to user

Never:

- Ignore failing tests — fix them
- Skip quality gates — all applicable gates must pass
- Skip the anti-slop 10-point verification after generating output
- Skip the pre-task checklist in CLAUDE.md
- Make silent assumptions about requirements
- Delete code without understanding why it exists
- Add dependencies without checking conflicts
- Ship output that fails the dark pattern audit (`ANTI_SLOP_GUIDE.md`)
- Proceed to next build layer if anti-slop check fails current layer

---
---

# Memory File Index

Read these files at the start of every design task.

## Core Memory (Always Read)

| File                                    | When to Read                     | Purpose                                    |
| --------------------------------------- | -------------------------------- | ------------------------------------------ |
| `WORKFLOW.md`                           | Every task                       | This index + workflow                      |
| `BUILD_GOTCHAS.md` + `QUALITY_GATES.md` | Every task                       | Technical gotchas, gates, fixes            |
| TODO: design-spec function artifacts    | Every task                       | Tokens, variation system                   |
| TODO: design-spec function artifacts    | Before ANY new design/build      | Fill out before writing code — spec-first  |
| `ANTI_SLOP_GUIDE.md`                    | Every task                       | What to avoid (includes dark pattern audit) |
| `COMPONENT_AND_ANIMATION_REGISTRY.md`     | Every task                       | What's built, where it lives               |
| `DECISIONS.md`                          | When making new decisions        | Past choices and rationale                 |
| `SKILLS_AND_REFERENCES.md`              | Every task                       | Reference repos and skills catalog         |
| `CLIENT_LIFECYCLE.md` + `CLIENT_OPERATIONS.md` | When starting new client project | Onboarding, research, brand, migration, maintenance, CMS |

## Task Memory (Updated during work)

| File                                    | When to Update                    | Purpose                |
| --------------------------------------- | --------------------------------- | ---------------------- |
| `COMPONENT_AND_ANIMATION_REGISTRY.md`   | After adding/modifying components | Track components       |
| `DECISIONS.md`                          | After making non-obvious choices  | Log rationale          |
| TODO: design-spec function artifacts    | After changing tokens             | Keep tokens documented |

## Scripts (Run as needed)

| Script                        | Purpose                       | When to Run              |
| ----------------------------- | ----------------------------- | ------------------------ |
| TODO: quality toolchain script | 10-gate verification pipeline | Before every delivery    |
| TODO: quality toolchain script | Link + page crawl audit       | After dev server starts  |
| TODO: quality toolchain script | Screenshot multi-viewport QA  | After dev server starts  |
| TODO: scaffold function script | Scaffold new client project   | Starting new client site |
| TODO: quality toolchain script | Multi-viewport screenshots    | Visual QA review         |
| TODO: scaffold function script | Start dev + open browser      | Development              |

## Site Code (Read as needed)

| Directory                       | Purpose                       |
| ------------------------------- | ----------------------------- |
| TODO: app source tree | Small business components     |
| TODO: app source tree | SEO utilities, schema helpers |
| TODO: app source tree | shadcn/ui components          |
| TODO: app source tree | Page sections                 |

## Reference Repos (Read as needed)

| Directory                          | Purpose                                            |
| ---------------------------------- | -------------------------------------------------- |
| TODO: reference-pack function group | Domain expertise (typography, color, motion, etc.) |
| TODO: reference-pack function group | Anti-slop patterns                                 |
| TODO: reference-pack function group | 70+ product design systems                         |
| TODO: reference-pack function group | Pre-launch QA                                      |
| TODO: reference-pack function group | Animation component patterns                       |
| TODO: reference-pack function group | Animated component registry                        |
