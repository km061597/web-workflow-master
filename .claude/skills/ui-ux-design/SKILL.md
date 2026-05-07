---
name: ui-ux-design
description: |
  UI/UX design intelligence for web and mobile. Covers 50+ styles, 160+ color palettes, 50+ font pairings, 160+ product types, 100+ UX guidelines, and 25 chart types across 10 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui, HTML/CSS). Use when designing new pages, components, color schemes, navigation, or reviewing UI for accessibility, performance, and visual consistency. Stack: Next.js 16 / React 19 / Tailwind 4 / shadcn.
triggers:
  - "ui"
  - "ux"
  - "design review"
  - "accessibility"
  - "color palette"
  - "font pairing"
  - "component"
  - "layout"
  - "responsive"
  - "dark mode"
  - "dashboard"
  - "landing page"
  - "mobile app"
---

# UI/UX Design Intelligence

Comprehensive design guide for web and mobile applications. Searchable database with priority-based recommendations across 10 technology stacks.

## When to Apply

**Must use** when:
- Designing new pages (Landing, Dashboard, Admin, SaaS, Mobile App)
- Creating or refactoring UI components (buttons, modals, forms, tables, charts)
- Choosing color schemes, typography, spacing, or layout systems
- Reviewing UI code for UX, accessibility, or visual consistency
- Implementing navigation, animations, or responsive behavior
- Improving perceived quality, clarity, or usability

**Skip** for pure backend logic, API/database design, infrastructure, or non-visual scripts.

## Rule Categories by Priority

| Priority | Category | Impact | Key Checks |
|----------|----------|--------|------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels |
| 2 | Touch & Interaction | CRITICAL | Min size 44×44px, 8px+ spacing, Loading feedback |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, Reserve space (CLS < 0.1) |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, Viewport meta, No horizontal scroll |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens |
| 7 | Animation | MEDIUM | Duration 150–300ms, Motion conveys meaning, Spatial continuity |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Progressive disclosure |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors |

## Critical Rules

### Accessibility
- Contrast: minimum 4.5:1 for normal text, 3:1 for large text
- Visible focus rings (2–4px) on interactive elements
- Descriptive alt text for meaningful images
- `aria-label` for icon-only buttons
- Tab order matches visual order
- Support `prefers-reduced-motion`
- Sequential h1→h6, no level skip

### Touch & Interaction
- Minimum touch target: 44×44pt (iOS) / 48×48dp (Android)
- Minimum 8px gap between touch targets
- Don't rely on hover alone for primary interactions
- Disable button + show spinner during async operations
- Clear error messages near the problem field

### Performance
- Use WebP/AVIF, responsive images (srcset/sizes), lazy loading
- Declare width/height or use aspect-ratio to prevent layout shift (CLS)
- Use `font-display: swap/optional` — **TODO pending owner** (not yet bundled) to avoid FOIT
- Split code by route/feature (React Suspense / Next.js dynamic)
- Virtualize lists with 50+ items
- Keep per-frame work under ~16ms for 60fps

### Style Selection
- Match style to product type (use `--design-system` for recommendations)
- Use SVG icons (Heroicons, Lucide), not emojis
- Use same style across all pages
- Effects (shadows, blur, radius) aligned with chosen style
- Design light/dark variants together

### Layout & Responsive
- Mobile-first: design mobile, then scale up
- Systematic breakpoints: 375 / 768 / 1024 / 1440
- Minimum 16px body text on mobile (avoids iOS auto-zoom)
- Mobile: 35–60 chars per line; desktop: 60–75
- No horizontal scroll on mobile
- Use 4pt/8dp incremental spacing system
- Consistent max-width on desktop (max-w-6xl / 7xl)

### Typography & Color
- Line-height 1.5–1.75 for body text
- Limit to 65–75 characters per line
- Match heading/body font personalities
- Consistent type scale (e.g. 12 14 16 18 24 32)
- Define semantic color tokens (primary, secondary, error, surface) — no raw hex in components
- Dark mode uses desaturated / lighter tonal variants, not inverted colors

### Animation
- Duration 150–300ms for micro-interactions; complex ≤400ms; avoid >500ms
- Use `transform` and `opacity` only; never animate `width`, `height`, `top`, `left`
- Use ease-out for entering, ease-in for exiting
- Every animation must express cause-effect relationship
- Stagger list entrance by 30–50ms per item
- Respect `prefers-reduced-motion`
- Exit animations shorter than enter (~60–70%)

### Forms & Feedback
- Visible label per input (not placeholder-only)
- Error below the related field
- Loading → success/error state on submit
- Auto-dismiss toasts in 3–5s
- Confirm before destructive actions
- Validate on blur (not keystroke)
- Use semantic input types (email, tel, number) for correct mobile keyboard
- Provide undo for destructive actions

### Navigation
- Bottom navigation max 5 items; labels with icons
- Back navigation must be predictable
- All key screens reachable via deep link / URL
- Current location visually highlighted in nav
- Support system gestures (iOS swipe-back, Android predictive back)
- Core navigation reachable from deep pages

### Charts & Data
- Match chart type to data type (trend → line, comparison → bar, proportion → pie)
- Supplement color with patterns/textures for colorblind users
- Always show legend near the chart
- Tooltips on hover/tap showing exact values
- Label axes with units and readable scale
- Charts must reflow or simplify on small screens
- Offer CSV/image export for data-heavy products

## Pre-Delivery Checklist

- [ ] No emojis used as icons
- [ ] All icons from consistent icon family
- [ ] All touch targets ≥44pt
- [ ] Micro-interactions in 150–300ms range
- [ ] Disabled states visually clear
- [ ] Primary text contrast ≥4.5:1 in both light and dark mode
- [ ] Secondary text ≥3:1 in both modes
- [ ] Safe areas respected for headers, tab bars, CTA bars
- [ ] Scroll content not hidden behind fixed bars
- [ ] Tested on small phone, large phone, tablet (portrait + landscape)
- [ ] Reduced motion and dynamic text size supported
- [ ] Screen reader focus order matches visual order
