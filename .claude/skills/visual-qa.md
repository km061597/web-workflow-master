---
name: visual-qa
description: Use when declaring a page or component complete, after layout changes, before deploying, or after adding new breakpoints. Make sure to use this skill before marking any frontend work as done.
---

# Visual QA

Systematic visual quality assurance.

## When to Use

- Before declaring work complete
- After significant layout changes
- Before deploying
- After adding new breakpoints

## Process

1. Ensure dev server running:

   ```bash
   cd site && npm run dev
   ```

2. Run screenshot script (**TODO pending owner** — `scripts/` lands with the build/quality function-group PR; until then, run the per-site script if present):

   ```bash
   ./scripts/screenshot.sh http://localhost:3000
   ```

3. Review outputs in `design-assets/qa/` — **TODO pending owner**:
   - `mobile.png` (375x812)
   - `tablet.png` (768x1024)
   - `desktop.png` (1440x900)

4. Run production build:

   ```bash
   cd site && npm run build
   ```

5. Manual checks with surf:
   ```bash
   surf go http://localhost:3000
   surf emulate.device "iPhone 14"
   surf screenshot
   ```

## Checklist

- [ ] No horizontal scroll on mobile (375px)
- [ ] Touch targets >= 44x44px
- [ ] Color contrast WCAG AA compliant
- [ ] Images have alt text
- [ ] Focus states visible
- [ ] Build completes without errors
- [ ] No console errors
- [ ] Animation performs at 60fps
- [ ] Reduced motion respected

## Reference

- Dispatch `art-director` for comprehensive visual testing (visual-qa absorbed)
- `refs/Front-End-Checklist/` — **TODO pending owner** — pre-launch QA
- `refs/Front-End-Performance-Checklist/` — **TODO pending owner** — performance audit
