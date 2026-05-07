---
name: design-spec-author
description: Complete spec-first development guide with constraint-based variation system. Produce this spec before any implementation. Human approves → code follows the spec. Prevents "snowball deviation" and generic AI output.
type: skill
---

# design-spec-author — Spec-First Development Skill

Produce this spec before any implementation. Human approves, then code follows the spec. If implementation reveals a spec flaw, fix the spec first, then the code.

**Constraint philosophy:** AI has too many degrees of freedom = generic output. This document forces unique choices through pre-defined constraints. Pick ONE from each table. Never let the AI "choose freely."

---

## 1. Project Identity

```
Project: [name]
Industry: [industry]
Audience: [who uses this — be specific]
Tone: [3-5 adjectives — e.g. "dark, atmospheric, precise, warm"]
Reference: [URL or description of a site whose aesthetic you admire]
```

---

## 2. Color System

Pick ONE palette from the table below. Map its conceptual colors to OKLCH tokens.

### Palette Options

| ID  | Name           | Primary               | Neutral            | Accent                  | Mood                          |
| --- | -------------- | --------------------- | ------------------ | ----------------------- | ----------------------------- |
| A1  | Warm Editorial | Terracotta #C65D3B    | Warm gray #F5F0EB  | Deep navy #1A2B3C       | Sophisticated, trustworthy    |
| A2  | Cool Tech      | Electric blue #2563EB | Cool gray #F8FAFC  | Cyan #06B6D4            | Modern, fast, reliable        |
| A3  | Earthy Organic | Sage green #84A98C    | Cream #FEFAE0      | Rust #BC4749            | Natural, healthy, calm        |
| A4  | Bold Playful   | Hot pink #FF006E      | Off-white #FFFAF0  | Electric yellow #FFBE0B | Fun, energetic, young         |
| A5  | Minimal Luxury | Charcoal #1A1A1A      | Warm white #FAF9F6 | Gold #C9A227            | Premium, exclusive, quiet     |
| A6  | Coastal Fresh  | Seafoam #5FBDBD       | Sand #F5F1E8       | Coral #FF7F50           | Relaxed, trustworthy, local   |
| A7  | Vintage Craft  | Mustard #D4A373       | Parchment #FEFAE0  | Deep green #606C38      | Handmade, heritage, authentic |
| A8  | Dark Mode Pro  | Near-black #0A0A0A    | Dark gray #1F1F1F  | Electric purple #A855F7 | Technical, premium, night     |

### Token Mapping (OKLCH)

Convert chosen palette to OKLCH tokens. Never use raw hex in production code.

```css
--background: oklch(...);       /* Page background */
--foreground: oklch(...);       /* Primary text */
--primary: oklch(...);          /* CTAs, links, emphasis */
--primary-foreground: oklch(...); /* Text on primary */
--secondary: oklch(...);        /* Secondary surfaces */
--muted: oklch(...);            /* Disabled, placeholder */
--muted-foreground: oklch(...); /* Text on muted */
--accent: oklch(...);           /* Highlights, selections */
--border: oklch(...);           /* Borders, dividers */
--ring: oklch(...);             /* Focus rings */
--destructive: oklch(0.577 0.245 27.325); /* Errors (standard) */
```

Theme source: [IDE theme name / cultural reference / natural palette]

**Rules:**
- Never: solid white (#fff) or solid black (#000). Always tint toward the theme.
- Colors always use CSS variables (`bg-primary`, `text-foreground`).
- Use HSL format only when opacity control is needed; default to OKLCH.

---

## 3. Typography

Pick ONE pairing from the table below. Commit.

### Typography Pairings

| ID  | Display            | Body              | Personality                      |
| --- | ------------------ | ----------------- | -------------------------------- |
| T1  | Playfair Display   | Source Sans Pro   | Editorial, magazine, premium     |
| T2  | Space Grotesk      | Source Sans Pro   | Tech, startup, modern            |
| T3  | Cormorant Garamond | Source Sans Pro   | Literary, elegant, timeless      |
| T4  | Bebas Neue         | DM Sans           | Bold, commercial, direct         |
| T5  | DM Serif Display   | DM Sans           | Friendly editorial, approachable |
| T6  | Syne               | Work Sans         | Experimental, artsy, creative    |
| T7  | Fraunces           | DM Sans           | Warm, personable, inviting       |
| T8  | Oswald             | DM Sans           | Strong, industrial, no-nonsense  |

### System Definition

```
Heading font: [name from pairing] — [why it fits the brand]
Body font: [name from pairing] — [why it fits the brand]
Mono/UI font: Geist Mono — for labels, metadata, UI chrome

Scale:       1rem (16px) × 1.25 (major third)
Weights:     heading [100-900], body [100-900]
Line height: heading [1.1-1.2], body [1.5-1.6]
```

**Forbidden fonts:** Inter, Roboto, Open Sans, Lato, Arial, system fonts.

Scale tokens (Tailwind-compatible):
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)

---

## 4. Layout System

Pick ONE hero pattern and ONE content pattern from the tables below.

### Hero Patterns

| ID  | Pattern                                             | Best For                                            |
| --- | --------------------------------------------------- | --------------------------------------------------- |
| H1  | Full-bleed image + overlaid text                    | Visual businesses (salon, restaurant, photographer) |
| H2  | Split screen (image left, text right)               | Service businesses (contractor, consultant, agency) |
| H3  | Typography-only, massive headline                   | Bold brands, minimal aesthetics                     |
| H4  | Video background + centered CTA                     | Dynamic businesses (gym, events, travel)            |
| H5  | Illustration-led with floating elements             | Creative, playful, tech                             |
| H6  | Asymmetric grid (text top-left, image bottom-right) | Editorial, fashion, design                        |

### Content Patterns

| ID  | Pattern                                 | Best For                               |
| --- | --------------------------------------- | -------------------------------------- |
| C1  | Masonry grid                            | Galleries, portfolios, products        |
| C2  | Stacked cards with staggered reveal     | Services, features, testimonials       |
| C3  | Horizontal scroll                       | Portfolios, case studies               |
| C4  | Bento grid (asymmetric cells)           | Dashboard previews, feature highlights |
| C5  | Full-width bands alternating dark/light | Long-form content, storytelling        |
| C6  | Sidebar + main content                  | Blogs, resource pages                  |

### Layout Tokens

```
Max width:   [value] — content max-width
Grid:        [columns] at [breakpoint]
Gutters:     [value]
Section gap: [range — vary this, don't use uniform spacing]

Breakpoints:
  sm:  [px]  →  [columns], [gutters]
  md:  [px]  →  [columns], [gutters]
  lg:  [px]  →  [columns], [gutters]
  xl:  [px]  →  [columns], [gutters]

Navigation:  [sticky | fixed | inline]
Alignment:   [left-asymmetric | right-asymmetric | editorial-left]
```

Spacing base: 0.25rem (4px). Scale: 1, 2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.

---

## 5. Component Architecture

```
Component library: [shadcn/ui | custom | none]

Card strategy:     [use cards | never use cards | cards only for X]
Image treatment:   [full-bleed | contained | bordered | none]
Button style:      [pill | rounded | sharp]
Border radius:     [value]
Shadow:            [value | none]

List every reusable component with its file path, variants, and states:
- [ComponentName] — src/components/... — variants: [list] — states: [list]
```

**Component spec pattern (default):**

| Property | Default | Hover | Active | Disabled |
|----------|---------|-------|--------|----------|
| Background | primary | primary-dark | primary-darker | muted |
| Text | primary-foreground | primary-foreground | primary-foreground | muted-foreground |
| Border | none | none | none | muted-border |
| Shadow | sm | md | none | none |

Border radius scale: base `0.625rem` (10px). Scale: sm (60%), md (80%), lg (100%), xl (140%), 2xl (180%).

---

## 6. Motion Design

Pick ONE animation personality from the table below. Consistent across site.

### Animation Personalities

| ID  | Style   | Description                                              |
| --- | ------- | -------------------------------------------------------- |
| M1  | Smooth  | Subtle fades, gentle slides. Professional, calm.         |
| M2  | Snappy  | Quick transitions, bold movements. Energetic, confident. |
| M3  | Organic | Fluid, morphing, natural easing. Friendly, approachable. |
| M4  | Precise | Grid-aligned, mathematical, timed. Technical, exact.     |
| M5  | Playful | Bounces, rotations, surprises. Fun, memorable.           |

### Motion Tokens

```
Scroll library:    [Lenis | GSAP ScrollSmoother | native]
Animation lib:     [Framer Motion | GSAP | CSS-only]

Duration scale:
  UI feedback: [150-200ms]
  Hover:       [200-250ms]
  Reveal:      [400-600ms]
  Page transition: [300-400ms]

Easing:
  UI feedback: ease-out
  Hover:       ease-out
  Reveal:      power2.out (GSAP) / cubic-bezier(0.25, 0.46, 0.45, 0.94)
  Page transition: ease-in-out

Section reveals:   [staggered fade | clip-path | slide | blur | scale — vary per section]
Hero treatment:    [parallax | clip-path scroll | video bg | static]
Hover states:      [scale | color shift | underline | glow]
Page transitions:  [crossfade | slide | none]
```

**Rules:**
- Never: animate layout properties (height/width/top/left).
- Always: respect `prefers-reduced-motion`.

---

## 7. Depth & Atmosphere

```
Background:        [solid-tinted | layered-gradients | noise-texture | geometric-pattern]

Layer 1: [description] — [CSS technique]
Layer 2: [description] — [CSS technique]
Layer 3: [description] — [CSS technique]
```

**Rules:**
- Never: solid white (#fff) or solid black (#000).
- Always: tint toward the theme.

---

## 8. Spacing Philosophy

Pick ONE from the table below.

| ID  | Style    | Description                                            |
| --- | -------- | ------------------------------------------------------ |
| S1  | Generous | Large whitespace, breathing room. Premium, calm.       |
| S2  | Tight    | Compact, dense information. Utility, efficiency.       |
| S3  | Rhythmic | Alternating tight/generous sections. Dynamic, musical. |

Apply the chosen philosophy consistently. Document the section gap rhythm in Section 4.

---

## 9. Do's and Don'ts

```
DO:
- [brand-appropriate choice 1]
- [brand-appropriate choice 2]
- [brand-appropriate choice 3]

DON'T:
- [competitor trap to avoid 1]
- [AI default to avoid 1]
- [genre cliché to avoid 1]
```

**Common AI slop to avoid:**
- Gratuitous gradients on everything
- Purple-to-blue defaults
- "Glass morphism" cards with no purpose
- Rounded corners on things that shouldn't be rounded
- Excessive animations on scroll
- Generic hero with centered text over stock gradient
- Sans-serif font stack with no personality

---

## 10. Responsive Strategy

```
Mobile (320-640):   [stack vertically | hamburger menu | larger tap targets]
Tablet (640-1024):  [2-column | sidebar appears | nav expands]
Desktop (1024+):    [full layout | all features | hover states active]

Touch targets: ≥44px
Font minimum: 14px on mobile
Image loading: lazy below fold, eager above
```

---

## 11. Accessibility Targets

```
WCAG level:   AA (minimum)
Contrast:     ≥4.5:1 for body text, ≥3:1 for large text
Focus:        visible ring on all interactive elements
Labels:       all inputs have associated labels
Alt text:     all images have meaningful alt text
ARIA:         landmark roles on sections (nav, main, aside, footer)
```

---

## Approval

- [ ] Human reviewed and approved this spec
- [ ] All sections filled (no "[TODO]" or "[PICK]")
- [ ] ONE palette chosen (A1–A8)
- [ ] ONE typography pairing chosen (T1–T8)
- [ ] ONE hero pattern chosen (H1–H6)
- [ ] ONE content pattern chosen (C1–C6)
- [ ] ONE animation personality chosen (M1–M5)
- [ ] ONE spacing philosophy chosen (S1–S3)
- [ ] Anti-slop checklist verified

---

## Usage Flow

Before building ANY site:

1. Read client brief
2. Pick ONE color palette (A1–A8) → fill Section 2
3. Pick ONE typography pairing (T1–T8) → fill Section 3
4. Pick ONE hero pattern (H1–H6) → fill Section 4
5. Pick ONE content pattern (C1–C6) → fill Section 4
6. Pick ONE animation personality (M1–M5) → fill Section 6
7. Pick ONE spacing philosophy (S1–S3) → fill Section 8
8. Fill remaining free-form sections (1, 5, 7, 9, 10, 11)
9. Human review and approval
10. Code follows the approved spec

This creates 8 × 8 × 6 × 6 × 5 × 3 = **34,560 unique combinations** from just these constraints.
