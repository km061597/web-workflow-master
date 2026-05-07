---
name: anti-slop-guide
aliases: anti-patterns, distinctiveness-techniques
description: Design anti-patterns to avoid, AI slop detection, dark pattern audits, and 9 techniques to force AI out of statistical-mean convergence. Compiled from Impeccable, Taste, observed AI slop, and CHI 2025 dark-patterns research. Updated when new patterns are identified.
type: project
---

# Anti-Slop Guide

> AI converges toward the statistical mean of its training data. This guide covers what to avoid (anti-patterns), how to detect AI tells, how to audit for dark patterns, and 9 techniques to force distinctiveness.

---

## Part 1: Visual Anti-Patterns

| Pattern                                       | Why Bad                         | Fix                                                            |
| --------------------------------------------- | ------------------------------- | -------------------------------------------------------------- |
| Inter for everything                          | Generic, no brand personality   | Match font to brief (serif for editorial, mono for tech, etc.) |
| Purple-to-blue gradients                      | Overused AI default             | Use brand colors, not defaults                                 |
| Cards nested in cards                         | Visual noise, unclear hierarchy | Flatten, use whitespace                                        |
| Gray text on colored bg                       | Low contrast, muddy             | Use proper contrast ratios                                     |
| Rounded-square icon tiles above every heading | Templated look                  | Vary layout, use whitespace                                    |
| Pure gray neutrals                            | Dead, lifeless                  | Tint neutrals toward brand hue                                 |
| Too many font sizes                           | Muddy hierarchy                 | 5-size system max                                              |
| Both paragraph spacing AND indent             | Digital wants space only        | Pick one                                                       |

## Part 2: Animation Anti-Patterns

| Pattern                     | Why Bad                  | Fix                                     |
| --------------------------- | ------------------------ | --------------------------------------- |
| Everything fades in         | Boring, predictable      | Vary animation types                    |
| 1s+ durations               | Feels slow, unresponsive | UI: <300ms, reveals: 400-600ms          |
| No reduced-motion support   | Excludes users           | Always respect `prefers-reduced-motion` |
| Animating layout properties | Janky, poor performance  | Use transform + opacity only          |
| Linear easing               | Mechanical, unnatural    | Use easeOut, power2.out                 |

## Part 3: Code Anti-Patterns

| Pattern                            | Why Bad                         | Fix                                 |
| ---------------------------------- | ------------------------------- | ----------------------------------- |
| `"use client"` on entire page      | Defeats Server Components       | Split into server + client sections |
| Inline styles                      | Not themeable, hard to override | Use Tailwind classes                |
| Magic numbers                      | No system, breaks consistency   | Use design tokens                   |
| `any` types                        | Loses TypeScript benefits       | Proper typing                       |
| Props without interfaces           | Unclear API                     | Always define interfaces            |
| Arrays/constants inside components | Re-created every render         | Move outside component              |
| Raw IntersectionObserver           | Verbose, error-prone            | Use Framer Motion `whileInView`     |

## Part 4: AI-Specific Tells

| Pattern                               | Why Bad            | Fix                                      |
| ------------------------------------- | ------------------ | ---------------------------------------- |
| "Seamless", "robust", "delve" in copy | AI marketing speak | Use concrete, specific language          |
| Generic placeholder content           | No real value      | Use realistic data                       |
| Perfectly centered everything         | Templated          | Use asymmetric layouts where appropriate |
| Same spacing everywhere               | No rhythm          | Use spatial hierarchy                    |
| Default blue primary                  | No brand thought   | Choose color from brand/brief            |

## Part 5: Dark Patterns (CHI 2025)

Krauß et al. (CHI 2025): ChatGPT generates at least 1 dark pattern (mean: 5) in EVERY website, even with neutral prompts. Audit AI output for:

| Pattern                | Example                           | Fix                           |
| ---------------------- | --------------------------------- | ----------------------------- |
| Fake urgency           | "Only 2 left!" countdown timers   | Remove fabricated scarcity    |
| Fake social proof      | "X people viewing now"            | Use real data or omit         |
| Confirmshaming         | "No thanks, I don't want to save" | Neutral opt-out language      |
| Hidden unsubscribe     | Buried cancellation flows         | Visible, one-click opt-out    |
| Forced continuity      | Opt-out instead of opt-in         | Explicit opt-in consent       |
| Interface interference | Misleading button hierarchy       | Clear, consistent affordances |

**Rule**: Never ship AI-generated UI without a dark pattern audit. This is an ethical and legal liability.

## Part 6: Distinctiveness Techniques

### 1. Cross-Pollinate Multiple AI Tools

Use different tools with different training datasets. Combine outputs — never accept any single tool's complete solution.

```
Midjourney  → visual aesthetics, mood, texture
Claude      → copy, structure, interaction logic
Figma AI    → layout exploration, component variants
v0.dev      → production React/Tailwind components
```

The mixing itself creates distinctiveness. Each tool has different biases — combining them cancels out the "single-AI fingerprint."

### 2. Inject Real-World Constraints

Replace "design a landing page" with constrained scenarios:

> "Design a dashboard for colorblind users with ADHD working in bright office environments that works without JavaScript and loads under 2 seconds on 3G."

Constraints push AI away from default safe patterns. More constraints = more distinctive output.

### 3. Edit Like an Art Director, Not a Prompt Engineer

1. Generate 50 variations (speed is AI's strength)
2. Identify the 5% of promising elements across all variations
3. Synthesize them into one cohesive, intentional design
4. Human editorial judgment is the differentiator — not the prompt

### 4. Curate Unexpected Prompt Combinations

Draw from unrelated fields:

- "Web interface inspired by botanical illustration techniques"
- "Dashboard layout based on jazz album cover composition"
- "Brutalist web form layouts"
- "Navigation patterned after subway maps"

Cross-domain synthesis forces AI into rougher, more distinctive output — it can't fall back on "web design" training patterns when the prompt is from botany.

### 5. Use AI for Exploration, Not Execution

AI's strength: speed (100+ concepts in minutes). AI's weakness: judgment.

- Deploy AI to survey visual territories rapidly
- Use traditional design judgment for refinement
- AI proposes, human disposes

### 6. Build a Brand-to-AI Translation Layer

Replace vague terms with measurable rules:

- Not "friendly icons" → "Lucide icons, 24px, 1.5px stroke, rounded corners"
- Not "modern clean" → "oklch color, Outfit font, 8px grid, 16px base"
- Create a "Brand Prefix" block front-loaded into every prompt

### 7. Lock Design Tokens Before Prompting

Pre-define: typography scales, spacing rules, color tokens with AA/AAA contrast, pre-approved component libraries. AI output inherits your defaults, not model defaults.

### 8. Require Human Review Gates

NNGroup finding: AI prototypes are "good from afar, but far from good." AI consistently misses:

- Visual hierarchy and grouping
- Color contrast ratios
- Consistent margin spacing
- Context-appropriate pattern selection

Mandate human QA checkpoints for accessibility, voice, and nuance.

### 9. Watch for Dark Patterns

See Part 5 above. Audit every AI output for deceptive patterns before shipping.

## The Core Insight

> "AI gives you efficient access to statistical patterns, but creativity emerges from the decisions you make about which patterns to pursue and how to push them beyond their algorithmic comfort zones."

Distinctiveness = AI raw material + human-directed creative synthesis. Not accepting AI output wholesale.
