---
name: taste-design-system
description: |
  Taste-based design system skill. Teaches the AI to design like a high-end agency across multiple aesthetic directions — from brutalist industrial telemetry to soft structuralism to editorial luxury. Defines exact fonts, spacing, shadows, card structures, and animations that make a website feel expensive. Blocks all common defaults that make AI designs look cheap or generic. Stack: React 19 / Next.js 16 / Tailwind 4 / shadcn.
triggers:
  - "taste"
  - "design system"
  - "aesthetic"
  - "style direction"
  - "look and feel"
  - "visual identity"
  - "brutalist"
  - "luxury"
  - "editorial"
  - "agency"
---

# Taste Design System — Aesthetic Direction Engine

Engineer $150k+ agency-level digital experiences by committing to a bold aesthetic direction and executing it with precision. This skill provides multiple taste archetypes and the vocabulary to apply them consistently.

## The Variance Mandate

NEVER generate the exact same layout or aesthetic twice in a row. Dynamically combine different premium layout archetypes and texture profiles while adhering to an elite design language.

## Taste Archetypes (Pick ONE per project)

### 1. Industrial Brutalism & Tactical Telemetry
Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects.

**Visual Archetypes:**
- **Swiss Industrial Print** — high-contrast light modes, heavy sans-serif, visible grid lines, aggressive negative space, oversized numerals, primary red accent.
- **Tactical Telemetry & CRT Terminal** — dark mode exclusivity, high-density tabular data, monospaced dominance, ASCII framing, phosphor glow, scanlines.

**Typography:**
- Macro: Neue Haas Grotesk Black, Inter Extra Bold, Archivo Black, Monument Extended — `clamp(4rem, 10vw, 15rem)`, tight tracking (`-0.03em` to `-0.06em`), compressed leading (`0.85–0.95`), uppercase.
- Micro: JetBrains Mono, IBM Plex Mono, Space Mono — fixed small (`10–14px`), generous tracking (`0.05–0.1em`), uppercase.
- Textural: Playfair Display, EB Garamond — used exceedingly sparingly with heavy post-processing (halftone, dithering).

**Color:**
- Light substrate: `#F4F4F0` or `#EAE8E3` background, `#050505` foreground, `#E61919` accent.
- Dark substrate: `#0A0A0A` background, `#EAEAEA` foreground, `#E61919` accent, optional `#4AF626` for one status indicator only.

**Layout:** Blueprint grid with CSS Grid, visible compartmentalization via solid borders (`1–2px`), zero border-radius, bimodal density.

**Effects:** Halftone / 1-bit dithering, CRT scanlines (`repeating-linear-gradient`), mechanical noise overlay.

### 2. Soft Structuralism
Silver-grey or white backgrounds, massive bold Grotesk typography, airy floating components with unbelievably soft, highly diffused ambient shadows.

### 3. Ethereal Glass (SaaS / AI / Tech)
Deepest OLED black (`#050505`), radial mesh gradients, vantablack cards with heavy `backdrop-blur-2xl`, pure white/10 hairlines, wide geometric Grotesk.

### 4. Editorial Luxury
Warm creams (`#FDFBF7`), muted sage or deep espresso. High-contrast variable serif for massive headings. Subtle CSS noise/film-grain overlay (`opacity-[0.03]`).

## The Absolute Zero Directive (Anti-Patterns)

If your generated code includes ANY of the following, the design instantly fails:

- **Banned Fonts:** Inter, Roboto, Arial, Open Sans, Helvetica. Prefer `Geist`, `Clash Display`, `PP Editorial New`, `Plus Jakarta Sans`.
- **Banned Icons:** Standard thick-stroked Lucide, FontAwesome, Material Icons. Use ultra-light precise lines (Phosphor Light, Remix Line).
- **Banned Borders & Shadows:** Generic 1px solid gray borders. Harsh dark drop shadows (`shadow-md`, `rgba(0,0,0,0.3)`).
- **Banned Layouts:** Edge-to-edge sticky navbars glued to the top. Symmetrical boring 3-column Bootstrap grids without massive whitespace gaps.
- **Banned Motion:** Standard `linear` or `ease-in-out` transitions. Instant state changes without interpolation.

## Component Mastery

### Double-Bezel Architecture (Doppelrand)
Never place a premium card flatly on the background. Use nested enclosures:
- **Outer Shell:** subtle background (`bg-black/5` or `bg-white/5`), hairline outer border (`ring-1 ring-black/5`), padding (`p-1.5` or `p-2`), large outer radius (`rounded-[2rem]`).
- **Inner Core:** distinct background, inner highlight (`shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`), mathematically smaller radius (`rounded-[calc(2rem-0.375rem)]`).

### Nested CTA & "Island" Button Architecture
Primary buttons: fully rounded pills (`rounded-full`), generous padding (`px-6 py-3`). Trailing arrow icon nested inside its own circular wrapper flush with the button's right inner padding.

### Spatial Rhythm & Tension
- **Macro-whitespace:** `py-24` to `py-40` for sections.
- **Eyebrow Tags:** microscopic pill-shaped badge before major headings (`rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]`).

## Motion Choreography

All motion must simulate real-world mass and spring physics. Use custom cubic-beziers (`cubic-bezier(0.32,0.72,0,1)`).

- **Fluid Island Nav:** Floating glass pill detached from top (`mt-6`, `mx-auto`, `w-max`, `rounded-full`). Hamburger morphs to X with fluid rotation. Menu opens as screen-filling overlay with staggered mask reveal.
- **Magnetic Button Hover:** Scale down slightly on press (`active:scale-[0.98]`). Inner icon circle translates diagonally and scales up on hover.
- **Scroll Interpolation:** Gentle fade-up (`translate-y-16 blur-md opacity-0` → `translate-y-0 blur-0 opacity-100` over 800ms+). Use `IntersectionObserver` or Framer Motion `whileInView`. Never `window.addEventListener('scroll')`.

## Performance Guardrails

- **GPU-safe:** Animate exclusively `transform` and `opacity`. Never `top`, `left`, `width`, `height`.
- **Blur constraints:** `backdrop-blur` only on fixed/sticky elements. Never on scrolling containers.
- **Noise overlays:** Fixed, `pointer-events-none` pseudo-elements only. Never on scrolling containers.
- **Z-index discipline:** Reserve for systemic layers (nav, modals, overlays, tooltips).

## Mobile Override (Universal)

All asymmetric layouts above `md:` MUST fall back to `w-full`, `px-4`, `py-8` below `768px`. Never use `h-screen` — always `min-h-[100dvh]`. Remove rotations and negative-margin overlaps below `768px`.

## Execution Protocol

1. **[SILENT]** Roll the Variance Engine. Choose your Vibe and Layout Archetypes.
2. **[SCAFFOLD]** Establish background texture, macro-whitespace, massive typography.
3. **[ARCHITECT]** Build DOM with Double-Bezel for all major cards. Use exaggerated squircle radii.
4. **[CHOREOGRAPH]** Inject custom cubic-bezier transitions, staggered nav reveals, button physics.
5. **[OUTPUT]** Deliver flawless React/Tailwind/HTML. No generic fallbacks.

## Pre-Output Checklist

- [ ] No banned fonts, icons, borders, shadows, layouts, or motion patterns
- [ ] A Vibe Archetype and Layout Archetype were consciously selected
- [ ] All major cards use Double-Bezel nested architecture
- [ ] CTA buttons use Button-in-Button trailing icon pattern where applicable
- [ ] Section padding is at minimum `py-24`
- [ ] All transitions use custom cubic-bezier curves
- [ ] Scroll entry animations are present
- [ ] Layout collapses gracefully below `768px`
- [ ] All animations use only `transform` and `opacity`
- [ ] `backdrop-blur` is only on fixed/sticky elements
