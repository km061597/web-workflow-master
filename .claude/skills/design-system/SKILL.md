---
name: design-system
description: Generate, audit, and maintain design systems. Three-layer token architecture (primitive→semantic→component), concrete defaults (OKLCH, Geist, Tailwind), component specifications, visual audit scoring, AI slop detection, and brand-compliant slide generation.
type: skill
---

# Design System

Generate, audit, and maintain systematic design systems with token-driven architecture.

## When to Use

- Starting a new project that needs a design system
- Auditing an existing codebase for visual consistency
- Before a redesign — understand what you have
- When the UI looks "off" but you can't pinpoint why
- Reviewing PRs that touch styling
- Creating brand-compliant presentations/slides
- Design token creation and CSS variable systems
- Design-to-code handoff
- Tailwind theme configuration

---

## Token Architecture

### Three-Layer Structure

```
Primitive (raw values)
       ↓
Semantic (purpose aliases)
       ↓
Component (component-specific)
```

**Example:**
```css
/* Primitive */
--color-blue-600: #2563EB;

/* Semantic */
--color-primary: var(--color-blue-600);

/* Component */
--button-bg: var(--color-primary);
```

### Default Primitive Set

When no brand-specific palette is defined, use these defaults. All values are in OKLCH for perceptual uniformity.

#### Colors (OKLCH)

| Token           | Value                       | Usage                       |
| --------------- | --------------------------- | --------------------------- |
| `--background`  | `oklch(1 0 0)`              | Page background (light)     |
| `--foreground`  | `oklch(0.145 0 0)`          | Primary text (light)        |
| `--primary`     | `oklch(0.205 0 0)`          | CTAs, links, emphasis       |
| `--secondary`   | `oklch(0.97 0 0)`           | Secondary surfaces          |
| `--muted`       | `oklch(0.97 0 0)`           | Disabled, placeholder       |
| `--accent`      | `oklch(0.97 0 0)`           | Highlights, selections      |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Errors, destructive actions |
| `--border`      | `oklch(0.922 0 0)`          | Borders, dividers           |
| `--input`       | `oklch(0.922 0 0)`          | Input backgrounds           |
| `--ring`        | `oklch(0.708 0 0)`          | Focus rings                 |

Dark mode inverts lightness: `oklch(0.145 0 0)` background, `oklch(0.985 0 0)` foreground.

#### Typography

| Token         | Value                |
| ------------- | -------------------- |
| `--font-sans` | Geist (Next.js font) |
| `--font-mono` | Geist Mono           |

Scale (major third, 1.25):
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

#### Spacing

Base: 0.25rem (4px). Scale: 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

#### Border Radius

Base: `0.625rem` (10px). Scale: sm (60%), md (80%), lg (100%), xl (140%), 2xl (180%).

#### Animation

| Type            | Duration  | Easing              |
| --------------- | --------- | ------------------- |
| UI feedback     | 150-200ms | `ease-out`          |
| Hover           | 200-250ms | `ease-out`          |
| Reveal          | 400-600ms | `power2.out` (GSAP) |
| Page transition | 300-400ms | `ease-in-out`       |

---

## Component Spec Pattern

Define every reusable component with state matrices:

| Property | Default | Hover | Active | Disabled |
|----------|---------|-------|--------|----------|
| Background | primary | primary-dark | primary-darker | muted |
| Text | primary-foreground | primary-foreground | primary-foreground | muted-foreground |
| Border | none | none | none | muted-border |
| Shadow | sm | md | none | none |

Document each component's file path, variants, and states:
- `[ComponentName]` — `src/components/...` — variants: `[list]` — states: `[list]`

---

## Conventions

- Colors always use CSS variables (`bg-primary`, `text-foreground`). Never hardcode hex.
- Spacing uses Tailwind scale (never arbitrary values).
- Typography uses Tailwind scale (never arbitrary sizes).
- Shadows use `shadow-sm` through `shadow-2xl` (never custom box-shadow).
- Z-index uses Tailwind scale (never arbitrary z-index).
- Use HSL format only when opacity control is needed; default to OKLCH for primitives.
- Semantic layer enables theme switching (light/dark).
- Component tokens enable per-component customization without touching globals.
- Document every token's purpose in comments.

---

## Operational Modes

### Mode 1: Generate Design System

Analyzes your codebase and generates a cohesive design system:

```
1. Scan CSS/Tailwind/styled-components for existing patterns
2. Extract: colors, typography, spacing, border-radius, shadows, breakpoints
3. Research 3 competitor sites for inspiration (via browser MCP)
4. Propose a design token set (JSON + CSS custom properties)
5. Generate DESIGN.md with rationale for each decision
6. Create an interactive HTML preview page (self-contained, no deps)
```

**Output:** `DESIGN.md` + `design-tokens.json` + `design-preview.html`

**Command:**
```bash
/design-system generate --style minimal --palette earth-tones
```

### Mode 2: Visual Audit

Scores your UI across 10 dimensions (0-10 each):

```
1. Color consistency      — palette adherence vs. random hex values?
2. Typography hierarchy    — clear h1 > h2 > h3 > body > caption?
3. Spacing rhythm         — consistent scale (4px/8px/16px) or arbitrary?
4. Component consistency  — do similar elements look similar?
5. Responsive behavior    — fluid or broken at breakpoints?
6. Dark mode             — complete or half-done?
7. Animation             — purposeful or gratuitous?
8. Accessibility         — contrast ratios, focus states, touch targets
9. Information density   — cluttered or clean?
10. Polish               — hover states, transitions, loading states, empty states
```

Each dimension gets a score, specific examples, and a fix with exact file:line.

**Command:**
```bash
/design-system audit --url http://localhost:3000 --pages / /pricing /docs
```

### Mode 3: AI Slop Detection

Identifies generic AI-generated design patterns:

- Gratuitous gradients on everything
- Purple-to-blue defaults
- "Glass morphism" cards with no purpose
- Rounded corners on things that shouldn't be rounded
- Excessive animations on scroll
- Generic hero with centered text over stock gradient
- Sans-serif font stack with no personality

**Command:**
```bash
/design-system slop-check
```

---

## Slide System (Extension)

Brand-compliant presentations using design tokens + Chart.js + contextual decision system.

### Source of Truth

| File | Purpose |
|------|---------|
| `docs/brand-guidelines.md` | Brand identity, voice, colors — **TODO pending owner** (brand function group) |
| `assets/design-tokens.json` | Token definitions (primitive→semantic→component) — **TODO pending owner** (scaffold function group) |
| `assets/design-tokens.css` | CSS variables (import in slides) — **TODO pending owner** (scaffold function group) |
| `assets/css/slide-animations.css` | CSS animation library — **TODO pending owner** (animation function group) |

### Decision System CSVs

| File | Purpose |
|------|---------|
| `data/slide-strategies.csv` | 15 deck structures + emotion arcs + sparkline beats — **TODO pending owner** (scaffold function group) |
| `data/slide-layouts.csv` | 25 layouts + component variants + animations — **TODO pending owner** (scaffold function group) |
| `data/slide-layout-logic.csv` | Goal → Layout + break_pattern flag — **TODO pending owner** (scaffold function group) |
| `data/slide-typography.csv` | Content type → Typography scale — **TODO pending owner** (scaffold function group) |
| `data/slide-color-logic.csv` | Emotion → Color treatment — **TODO pending owner** (scaffold function group) |
| `data/slide-backgrounds.csv` | Slide type → Image category (Pexels/Unsplash) — **TODO pending owner** (scaffold function group) |
| `data/slide-copy.csv` | 25 copywriting formulas (PAS, AIDA, FAB) — **TODO pending owner** (scaffold function group) |
| `data/slide-charts.csv` | 25 chart types with Chart.js config — **TODO pending owner** (scaffold function group) |

### Contextual Decision Flow

```
1. Parse goal/context
        ↓
2. Search slide-strategies.csv → Get strategy + emotion beats
        ↓
3. For each slide:
   a. Query slide-layout-logic.csv → layout + break_pattern
   b. Query slide-typography.csv → type scale
   c. Query slide-color-logic.csv → color treatment
   d. Query slide-backgrounds.csv → image if needed
   e. Apply animation class from slide-animations.css
        ↓
4. Generate HTML with design tokens
        ↓
5. Validate with `slide-token-validator.py` — **TODO pending owner** (build function group)
```

### Pattern Breaking (Duarte Sparkline)

Premium decks alternate between emotions for engagement:
```
"What Is" (frustration) ↔ "What Could Be" (hope)
```

System calculates pattern breaks at 1/3 and 2/3 positions.

### Slide Requirements

**ALL slides MUST:**
1. Import `assets/design-tokens.css` — single source of truth — **TODO pending owner** (scaffold function group)
2. Use CSS variables: `var(--color-primary)`, `var(--slide-bg)`, etc.
3. Use Chart.js for charts (NOT CSS-only bars)
4. Include navigation (keyboard arrows, click, progress bar)
5. Center align content
6. Focus on persuasion/conversion

### Token Compliance

```css
/* CORRECT — uses token */
background: var(--slide-bg);
color: var(--color-primary);
font-family: var(--typography-font-heading);

/* WRONG — hardcoded */
background: #0D0D0D;
color: #FF6B6B;
font-family: 'Space Grotesk';
```

### Command

```bash
/slides:create "10-slide investor pitch for [Client Name]"
```

---

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/generate-tokens.cjs` | Generate CSS from JSON token config — **TODO pending owner** (build function group) |
| `scripts/validate-tokens.cjs` | Check for hardcoded values in code — **TODO pending owner** (build function group) |
| `scripts/search-slides.py` | BM25 search + contextual recommendations — **TODO pending owner** (build function group) |
| `scripts/slide-token-validator.py` | Validate slide HTML for token compliance — **TODO pending owner** (build function group) |
| `scripts/fetch-background.py` | Fetch images from Pexels/Unsplash — **TODO pending owner** (build function group) |

### Generate tokens
```bash
# TODO pending owner: node scripts/generate-tokens.cjs --config tokens.json -o tokens.css
```

### Validate usage
```bash
# TODO pending owner: node scripts/validate-tokens.cjs --dir src/
```

---

## Integration

**With brand:** Extract primitives from brand colors/typography.
**With ui-styling:** Component tokens → Tailwind config.

**Skill Dependencies:** brand, ui-styling.
**Primary Agents:** ui-ux-designer, frontend-developer.

---

## Best Practices

1. Never use raw hex in components — always reference tokens.
2. Semantic layer enables theme switching (light/dark).
3. Component tokens enable per-component customization.
4. Use OKLCH for primitives; HSL only when opacity control is needed.
5. Document every token's purpose.
6. Slides must import `design-tokens.css` and use `var()` exclusively.
7. Run `slop-check` before every design handoff.
8. Audit existing UIs before redesigns — know what you have.

---

## Templates

| Template | Purpose |
|----------|---------|
| `design-tokens-starter.json` | Starter JSON with three-layer structure |
