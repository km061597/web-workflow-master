---
name: design-decisions
description: Log of design decisions with rationale, alternatives considered, and date. Updated whenever a non-obvious design choice is made.
type: project
---

# Design Decisions

## 2026-05-04: Framework Stack

**Decision**: Next.js 16 + React 19 + Tailwind 4 + shadcn/ui

**Rationale**:

- Next.js 16 has App Router with Server Components (performance)
- React 19 has Actions and improved Suspense
- Tailwind 4 has CSS-first config, better performance
- shadcn/ui provides unstyled accessible primitives

**Alternatives considered**:

- Remix: Good but Next.js has better ecosystem for static export
- Vite + React: No SSR, worse for SEO/design showcase
- Astro: Good for content, worse for interactive components

**Reversible?** No — core architecture.

## 2026-05-04: Animation Libraries

**Decision**: GSAP + Framer Motion

**Rationale**:

- GSAP for scroll-driven animations (ScrollTrigger is best-in-class)
- Framer Motion for React state-based animations (whileInView, layout)
- Both handle reduced-motion properly

**Alternatives considered**:

- Motion One: Lighter but less mature ecosystem
- React Spring: Good but Framer Motion has better DX
- Pure CSS: Not powerful enough for scroll-driven effects

**Reversible?** Yes — both are additive, can remove either.

## 2026-05-04: Browser Tool

**Decision**: surf CLI as primary, Browserbase as backup

**Rationale**:

- surf CLI is direct, no wrapper overhead
- Browserbase handles anti-bot sites that surf can't
- Playwright MCP removed — same capabilities as surf but with indirection

**Reversible?** Yes — can swap browser tools.

## 2026-05-04: Component Architecture

**Decision**: Server Components default, Client Components only for interactivity

**Rationale**:

- Reduces JS bundle size
- Better SEO
- Forces clear boundary between static and interactive

**Pattern**:

- Page shells = Server Component
- Animation sections = Client Component with `"use client"`
- Data arrays/constants = Outside components (not recreated per render)

**Reversible?** Yes — can add more client components if needed.

## 2026-05-04: Testing Strategy

**Decision**: Vitest + React Testing Library + Playwright + Storybook

**Rationale**:

- Vitest: Fast, Vite-native, good TypeScript support
- React Testing Library: Tests behavior not implementation
- Playwright: Real browser testing, cross-browser, mobile
- Storybook: Component isolation, documentation, visual testing
- axe-core: Automated accessibility checks

**Reversible?** Partially — test files can be rewritten.

## 2026-05-05: TypeScript Strictness

**Decision**: Enable `noUncheckedIndexedAccess: true`, leave `noPropertyAccessFromIndexSignature` disabled.

**Rationale**:

- `noUncheckedIndexedAccess` caught 3 real bugs during implementation (array access without null checks)
- `noPropertyAccessFromIndexSignature` breaks on `Partial<T>` form data patterns — too much churn for minimal benefit
- Zero TS errors after fixing caught issues

**Alternatives considered**: Enable both, enable neither.
**Reversible?** Yes — tsconfig flags.

## 2026-05-05: Storybook a11y Level

**Decision**: Set a11y to `"error"` level (blocks CI on violations).

**Rationale**:

- Previously `"todo"` — violations shown but didn't fail CI
- Accessibility is a quality gate (#5) — should block delivery
- Aligns with WCAG 2.1 AA requirement for business sites

**Reversible?** Yes — can lower to "warn" if too noisy.

## 2026-05-05: Root Layout — Header/Footer in Layout

**Decision**: Move Header + Footer + CartProvider into root layout. Remove from individual pages.

**Rationale**:

- Previously: Header/Footer added per-page — About, Contact, Services pages had NO navigation
- Root layout guarantees every page has navigation
- CartProvider must wrap all pages for store to work
- Dev server works. Static export build is pre-existing broken (Next.js 16 SSR bug) — not caused by this change.

**Reversible?** Yes — move back to per-page if needed.

## 2026-05-05: Middleware Removed for Static Export

**Decision**: Remove `middleware.ts`. Replace with `public/_headers` for deployment-level security config.

**Rationale**:

- Next.js 16 warns middleware deprecated in favor of `proxy` convention
- `output: "export"` doesn't support middleware or proxy — no server runtime
- Security headers must be set at CDN/hosting level (Netlify `_headers`, Vercel `vercel.json`, Cloudflare)

**Reversible?** Yes — bring back middleware if switching to server deployment.

## 2026-05-05: Distant Matter Artist Site — Design Choices

**Decision**: One-page scroll, dark cosmic theme, electric lavender accent, Framer Motion particle field, embedded streaming links.

**Rationale**:

- Research: 17 of 23 top DJ sites use dark themes (industry convention)
- Dark theme matches electronic music genre and "Distant Matter" brand name
- One-page scroll: simpler navigation, mobile-friendly, studio standard for artist sites
- External streaming links: existing site has no embedded players — all traffic goes off-site
- Real data used: actual Spotify artist ID, Instagram handle, Laylo tour URL, all 6 streaming platforms

**Saved as reusable asset**: Theme saved to `design-assets/themes/distant-matter-cosmic.css`.

**Reversible?** Yes — per-client design, not infrastructure.

## 2026-05-05: `generate-robots.js` Script Removed

**Decision**: Remove `generate-robots.js` from prebuild (script never existed). Keep `generate-sitemap.js` only.

**Rationale**:

- package.json referenced `generate-robots.js` → file didn't exist → prebuild silently failed
- Sitemap generation works. Robots.txt is static (just needs Sitemap: directive).
- Removed the broken reference. Sitemap generation script is TODO pending owner (quality toolchain function group).

**Reversible?** Yes — add robots script back if needed.

## 2026-05-05: Zod v4 Breaking Changes

**Decision**: Accept Zod v4 API changes. Update code to match new API.

**Changes made**:

- `z.literal(true, { errorMap: ... })` → `z.literal(true, { message: "..." })`
- `issue.path[0]` → `String(issue.path[0])` (path elements now `string | symbol`)

**Reversible?** No — forced by dependency version.
