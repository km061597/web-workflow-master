# Decision Log: frontend-patterns

## Sources

- `gsd-design/skills/frontend-patterns/SKILL.md` (gsd-design, 14773B) — React/Next.js patterns: composition, hooks, state management, performance, forms, error boundaries, animation, accessibility
- `gsd-design/skills/frontend-slides/SKILL.md` (gsd-design) — Frontend slides skill
- `gsd-design/skills/frontend-slides-zara/SKILL.md` (gsd-design) — Zara frontend slides

## Kept From

- **gsd-design/frontend-patterns** (main, canonical): Complete pattern catalog — composition, compound components, render props, custom hooks (useToggle, useDebounce, useQuery), Context+Reducer, memoization, code splitting, virtualization, form handling, error boundaries, Framer Motion, keyboard navigation, focus management.
- **gsd-design/frontend-slides**: Frontend-specific slide content patterns (code presentation, terminal output styling).

## Merged From

- **Slides content**: Merged frontend-slides' code presentation patterns into the "Animation" section as a note about code block presentation.

## Rejected

- **frontend-slides-zara**: Zara-brand specific styling. Too narrow for a canonical pattern skill. Rejected.
- **Stack variants**: The skill is React/Next.js focused. No attempt was made to include Vue/Svelte/Angular patterns because the canonical stack is React 19 / Next.js 16.

## Tradeoffs

1. **React-only vs. multi-framework**: Chose React-only to match the canonical stack. This means Vue/Svelte developers need a separate skill, but it keeps the canonical skill focused.
2. **Pattern breadth vs. depth**: Included 8 pattern categories with code examples. Could have gone deeper on any one category, but breadth is more valuable for a reference skill.
3. **Framer Motion vs. GSAP**: The skill includes Framer Motion examples. GSAP has its own canonical skill. Both are valid — Framer Motion for React-specific animations, GSAP for complex sequences. Noted the distinction.

## Open Questions

1. Should Server Component patterns (Next.js App Router) be added as a dedicated section?
2. Should form validation libraries (React Hook Form, Zod) be covered in more detail?
3. Should the virtualization example use `@tanstack/react-virtual` v3 or v2?
4. Is there overlap with `gsap-animation` on animation patterns that should be resolved?
