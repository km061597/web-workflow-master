# Decision Log: design-system/SKILL.md

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| DESIGN_SYSTEM.md | desigjn-toolkit | 2,555B | `inputs/desigjn toolkit/.claude/memory/DESIGN_SYSTEM.md` |
| uiux-design-system/SKILL.md | gsd-design | 6,879B | `inputs/gsd-design/.claude/skills/uiux-design-system/SKILL.md` |
| design-system/SKILL.md | gsd-design | 2,480B | `inputs/gsd-design/.claude/skills/design-system/SKILL.md` |

## Kept From

### desigjn-toolkit / DESIGN_SYSTEM.md (default values base)
- **OKLCH color tokens:** Complete 10-token table with exact OKLCH values (`oklch(1 0 0)` background, etc.)
- **Dark mode inversion rule:** `oklch(0.145 0 0)` background, `oklch(0.985 0 0)` foreground
- **Typography tokens:** `--font-sans: Geist`, `--font-mono: Geist Mono`
- **Type scale:** Major third (1.25) with xs through 4xl rem/px values
- **Spacing scale:** 0.25rem base with 16-step numeric scale
- **Border radius scale:** 0.625rem base with percentage multipliers (sm 60%, md 80%, etc.)
- **Animation timing:** UI feedback 150-200ms, hover 200-250ms, reveal 400-600ms, page transition 300-400ms
- **Easing values:** `ease-out`, `power2.out` (GSAP), `ease-in-out`
- **Conventions:** CSS variables only, Tailwind scales only (no arbitrary values), no custom box-shadow, no arbitrary z-index

### gsd-design / uiux-design-system/SKILL.md (architecture base)
- **Three-layer token architecture:** Primitive → Semantic → Component hierarchy
- **Architecture example:** CSS code block showing `--color-blue-600` → `--color-primary` → `--button-bg`
- **Component spec pattern:** State matrix table (Default / Hover / Active / Disabled × Background / Text / Border / Shadow)
- **Scripts table:** `generate-tokens.cjs`, `validate-tokens.cjs`, `search-slides.py`, `slide-token-validator.py`, `fetch-background.py`
- **Templates table:** `design-tokens-starter.json`
- **Slide system:** Complete brand-compliant presentation subsystem
  - Source of truth files (`brand-guidelines.md`, `design-tokens.json`, `design-tokens.css`, `slide-animations.css`)
  - Decision system CSVs (8 files: strategies, layouts, layout-logic, typography, color-logic, backgrounds, copy, charts)
  - Contextual decision flow (5-step flowchart)
  - Pattern breaking / Duarte Sparkline emotion alternation
  - Slide requirements (6 must-haves)
  - Chart.js integration example
  - Token compliance rules (CORRECT vs WRONG CSS examples)
  - `/slides:create` command
- **Integration notes:** "With brand", "With ui-styling", skill dependencies, primary agents

### gsd-design / design-system/SKILL.md (operational modes)
- **When to Use:** 6 bullet points covering generate, audit, redesign, "looks off", PR review
- **Mode 1: Generate Design System:** 6-step process (scan → extract → research → propose → generate DESIGN.md → preview)
  - Output: `DESIGN.md` + `design-tokens.json` + `design-preview.html`
  - Command: `/design-system generate --style minimal --palette earth-tones`
- **Mode 2: Visual Audit:** 10-dimension scoring system (0-10 each)
  - Dimensions: color consistency, typography hierarchy, spacing rhythm, component consistency, responsive behavior, dark mode, animation, accessibility, information density, polish
  - Command: `/design-system audit --url http://localhost:3000 --pages / /pricing /docs`
- **Mode 3: AI Slop Detection:** 7-pattern checklist
  - Patterns: gratuitous gradients, purple-to-blue defaults, glass morphism without purpose, inappropriate rounded corners, excessive scroll animations, generic hero with stock gradient, personality-less sans-serif stack
  - Command: `/design-system slop-check`
- **Examples:** Generate for SaaS, audit existing UI, slop-check

## Merged From

### Three sources into unified SKILL.md
- **Frontmatter:** Merged from uiux-design-system (name, description, type) + design-system (origin ECC) → kept name/description/type, dropped origin (not relevant for canonical)
- **When to Use:** Combined all 6 bullets from design-system SKILL.md + 4 from uiux-design-system (slide generation, token creation, CSS variables, Tailwind config, design-to-code handoff)
- **Token Architecture:** Three-layer structure from uiux-design-system is the primary framework. Default primitive set from DESIGN_SYSTEM.md is embedded as "Default Primitive Set" subsection — providing concrete values without forcing them.
- **Component Specs:** Component spec pattern from uiux-design-system kept; state matrix table is the standard.
- **Conventions:** Merged DESIGN_SYSTEM.md's 5 conventions with uiux-design-system's "Never use raw hex" / "Use HSL format" rules.
- **Operational Modes:** Entire Mode 1/2/3 section from design-system SKILL.md kept verbatim as "Operational Modes" section.
- **Slide System:** Kept as "Slide System (Extension)" — clearly marked as extension to avoid confusing web design with presentation design.
- **Scripts/Templates/Integration:** From uiux-design-system, kept at end as reference tables.
- **Best Practices:** Merged uiux-design-system's 6 practices with design-system's slop-check emphasis.

### Format decisions
- Output is a **SKILL.md** with proper frontmatter (type=skill) per vocabulary map canonical
- Placed in `.claude/skills/design-system/` following canonical skill directory structure
- Commands use `/design-system` prefix and `/slides:create` prefix for distinct subsystems

## Rejected

### DESIGN_SYSTEM.md as standalone memory file
- **Reason:** The concrete tokens are now embedded as "Default Primitive Set" within the skill. A separate `DESIGN_SYSTEM.md` would duplicate information and risk drift. If a project needs to override defaults, it generates its own `design-tokens.json` via Mode 1.

### design-system SKILL.md as standalone file
- **Reason:** Its operational modes (generate/audit/slop-check) are procedural capabilities of the same skill that defines token architecture. Separating them would force users to invoke two different skills for related tasks.

### uiux-design-system's "Slide Search (BM25)" detailed CLI examples
- **What was trimmed:** The exact `python scripts/search-slides.py` invocation examples with all flags (`--context`, `--position`, `--total`, `--prev-emotion`)
- **Reason:** Too implementation-specific for a canonical skill. The slide search system is mentioned; exact CLI syntax can live in the actual script's `--help` or project docs.
- **Impact:** Users still know the slide search exists and what it does; they run the script for syntax.

### "Reference Implementation" path
- **Source:** uiux-design-system mentioned `assets/designs/slides/claudekit-pitch-251223.html` as working example
- **Reason:** Path is project-specific ("claudekit-pitch"). Canonical skill should not reference ephemeral project files.

### DESIGN_SYSTEM.md's "Shadows use Tailwind scale" + "Z-index uses Tailwind scale"
- **Reason:** These are already covered by the broader convention "never arbitrary values" and are framework-specific to Tailwind. The canonical skill is framework-agnostic at the token level.

## Tradeoffs

1. **Skill scope breadth:** Merging token architecture + audit modes + slide generation makes this a large skill. The alternative was 2–3 smaller skills. Decision: keep unified because all three modes operate on the same token layer (primitive/semantic/component). A user auditing a design needs to understand the token architecture; a user generating tokens needs to know the audit dimensions.

2. **Slide system as extension:** Slide generation could be its own skill. Kept here because it reuses the same three-layer tokens and brand guidelines. Marked "(Extension)" to signal it's optional.

3. **Geist as default font:** DESIGN_SYSTEM.md specifies Geist (Next.js-specific). This is framework-coupled. Kept as default because it's the most modern sans variable font and widely used, but noted that primitives should be extracted from actual brand typography.

4. **OKLCH vs. HSL:** DESIGN_SYSTEM.md uses OKLCH exclusively. uiux-design-system mentions HSL for opacity. Canonical uses OKLCH as default, HSL only for opacity cases. This is a slight preference but OKLCH is gaining broad support.

5. **Command interface:** The commands (`/design-system generate`, `/slides:create`) are defined but there's no actual CLI parser backing them in the canonical artifact. These are interface contracts that downstream tooling should implement.

## Open Questions

1. **Framework coupling:** The default primitive set mentions Geist (Next.js) and Tailwind scales. Should there be a "Framework-Agnostic Primitive Set" and a "Tailwind/Next.js Default Set" as two options?

2. **Token generation scripts:** The skill references `generate-tokens.cjs` and `validate-tokens.cjs` but these don't exist in the master repo yet. Should the scaffold CLI include token generation, or should this skill ship with portable scripts?

3. **Dark mode strategy:** DESIGN_SYSTEM.md mentions inversion by lightness. Should the canonical skill define a more robust dark mode approach (e.g., separate semantic tokens for dark, or CSS `color-scheme` integration)?

4. **Audit automation:** Mode 2 (Visual Audit) mentions browser MCP for competitor research. Is browser MCP a guaranteed capability in all environments? Should there be a fallback?

5. **Slide system separation:** If the slide system grows (more CSVs, more chart types), should it be extracted into `slides/SKILL.md`? Current scope is manageable but worth monitoring.

6. **Missing: accessibility tokens:** The token table has no `--focus-ring-width`, `--touch-target-min`, or `--animation-reduced` tokens. Should accessibility be explicit in the token layer?
