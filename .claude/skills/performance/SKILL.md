---
name: performance
description: Optimize website performance for Core Web Vitals, smooth animations, and fast user interactions. Covers Lighthouse tuning, GSAP animation performance, image optimization, bundle budgets, and INP/CLS/LCP best practices.
origin: synthesized
---

# Performance

## When to Use This Skill

Apply when optimizing for Core Web Vitals (LCP, INP, CLS), reducing animation jank, auditing bundle size, or when the user asks about performance, FPS, or best practices for fast sites.

## Core Web Vitals Targets

| Metric | Target | Measurement |
|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5s | Mobile, Slow 4G + 4× CPU |
| INP (Interaction to Next Paint) | ≤ 200ms | Mobile, real-user data preferred |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | All viewports |
| TBT (Total Blocking Time) | ≤ 200ms | Lab proxy for INP |
| Performance score | ≥ 90 | Lighthouse mobile |

## Image Optimization

- Serve images as AVIF or WebP with proper `srcset`.
- Preload above-the-fold images: `<link rel="preload" as="image" href="...">`.
- Lazy-load below-fold images with `loading="lazy"`.
- Use responsive images with `sizes` attribute.
- Convert hero images immediately — do not let visual identity become the LCP hostage.

## Font Optimization

- Use `font-display: swap` to prevent invisible text during load.
- Preload critical fonts: `<link rel="preload" as="font" type="font/woff2" href="..." crossorigin>`.
- Self-host fonts or use performant CDN (Google Fonts with `display=swap`).
- Subset fonts to only needed characters when possible.

## Bundle Size

- First-load JS per route ≤ 170 KB gzipped when route-level measurement is available.
- Total page weight ≤ 1.5 MB for mobile survival on Slow 4G.
- Use route-level code splitting.
- Tree-shake unused dependencies.
- Audit with `scripts/animation-audit.mjs` — **TODO pending owner** (script not yet bundled) — for animation-related bloat.

## Lighthouse / CWV Gotchas

- Use local binary: `./node_modules/.bin/lhci autorun` — **TODO pending owner** (not yet bundled) — `npx lhci` can misparse as npm script.
- Keep audit IDs current. Stale assertions for removed/renamed audits are not site defects — update the config.
- DevTools throttling avoids simulated render-delay artifacts where Lighthouse marks already-visible text as late LCP.
- Old Pages Router globs fail on Next App Router/Turbopack output. Use emitted chunk corpus globs for size-limit.

## GSAP Animation Performance

### Prefer Transform and Opacity

Animating **transform** (`x`, `y`, `scale`, `rotation`, `skew`) and **opacity** keeps work on the compositor. Avoid animating layout properties when a transform can achieve the same look.

- ✅ Prefer: **x**, **y**, **scale**, **rotation**, **opacity**.
- ❌ Avoid: **width**, **height**, **top**, **left**, **margin**, **padding**.

### will-change

Use `will-change: transform` in CSS on elements that will animate. Do not set it on every element "just in case."

### Batch Reads and Writes

GSAP batches updates internally. When mixing with direct DOM reads/writes, avoid interleaving reads and writes that cause layout thrashing.

### Many Elements

- Use **stagger** instead of many separate tweens with manual delays.
- For long lists, consider virtualization or animating only visible items.
- Reuse timelines; avoid creating new timelines every frame.

### Frequently Updated Properties

Prefer **gsap.quickTo()** for properties updated often (e.g. mouse followers). It reuses a single tween instead of creating new ones on each update.

### ScrollTrigger Performance

- **pin: true** promotes the pinned element; pin only what's needed.
- **scrub** with a small value (e.g. `scrub: 1`) can reduce work during scroll.
- Call **ScrollTrigger.refresh()** only when layout actually changes, not on every resize.

### Cleanup

- Pause or kill off-screen or inactive animations when not visible.
- Use `gsap.context()` + `.revert()` for component-level cleanup.
- Avoid hundreds of overlapping tweens or ScrollTriggers without testing on low-end devices.

## Best Practices Checklist

- [ ] LCP ≤ 2.5s on mobile Slow 4G
- [ ] CLS ≤ 0.1 on all viewports
- [ ] INP ≤ 200ms (or TBT ≤ 200ms proxy)
- [ ] Images served as AVIF/WebP with srcset
- [ ] Critical fonts preloaded with `font-display: swap`
- [ ] No render-blocking third-party scripts in `<head>`
- [ ] First-load JS per route ≤ 170 KB gzipped
- [ ] Animations use transform/opacity only
- [ ] `will-change` set only on actively animating elements
- [ ] GSAP files include `prefers-reduced-motion` handling
- [ ] ScrollTrigger cleanup present (`gsap.context` + `.revert`)
- [ ] Size-limit config uses emitted chunk globs for App Router/Turbopack

## References

- [web.dev Performance](https://web.dev/performance/)
- [Lighthouse Scoring Calculator](https://googlechrome.github.io/lighthouse/scorecalc/)
- [GSAP Performance Guide](https://greensock.com/position-parameter/)
