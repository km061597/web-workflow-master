---
name: browser-qa
description: Automate visual testing and UI interaction verification using browser automation after deploying features. Use for smoke tests, interaction verification, visual regression, accessibility audits, and responsive testing before shipping.
origin: synthesized
---

# Browser QA — Automated Visual Testing & Interaction

## When to Use

- After deploying a feature to staging/preview
- When you need to verify UI behavior across pages
- Before shipping — confirm layouts, forms, interactions actually work
- When reviewing PRs that touch frontend code
- Accessibility audits and responsive testing

## How It Works

Uses browser automation (Playwright, Puppeteer, or Chrome DevTools Protocol) to interact with live pages like a real user.

### Phase 1: Smoke Test

1. Navigate to target URL
2. Check for console errors (filter noise: analytics, third-party)
3. Verify no 4xx/5xx in network requests
4. Screenshot above-the-fold on desktop + mobile viewport
5. Check Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

### Phase 2: Interaction Test

1. Click every nav link — verify no dead links
2. Submit forms with valid data — verify success state
3. Submit forms with invalid data — verify error state
4. Test auth flow: login → protected page → logout
5. Test critical user journeys (checkout, onboarding, search)

### Phase 3: Visual Regression

1. Screenshot key pages at 3 breakpoints (375px, 768px, 1440px)
2. Compare against baseline screenshots (if stored)
3. Flag layout shifts > 5px, missing elements, overflow
4. Check dark mode if applicable

### Phase 4: Accessibility

1. Run axe-core or equivalent on each page
2. Flag WCAG AA violations (contrast, labels, focus order)
3. Verify keyboard navigation works end-to-end
4. Check screen reader landmarks

## Output Format

```markdown
## QA Report — [URL] — [timestamp]

### Smoke Test
- Console errors: 0 critical, 2 warnings (analytics noise)
- Network: all 200/304, no failures
- Core Web Vitals: LCP 1.2s ✓, CLS 0.02 ✓, INP 89ms ✓

### Interactions
- [✓] Nav links: 12/12 working
- [✗] Contact form: missing error state for invalid email
- [✓] Auth flow: login/logout working

### Visual
- [✗] Hero section overflows on 375px viewport
- [✓] Dark mode: all pages consistent

### Accessibility
- 2 AA violations: missing alt text on hero image, low contrast on footer links

### Verdict: SHIP WITH FIXES (2 issues, 0 blockers)
```

## Integration

Works with any browser automation tool:
- Playwright (preferred — reliable, cross-browser, headless/headed)
- Puppeteer (lightweight, Chrome-only)
- Chrome DevTools Protocol (for advanced debugging)

Pair with `scripts/ship-gate.sh` — **TODO pending owner** (script not yet bundled) — for pre-ship automated verification.

## Screenshot Automation

Use the `surf` CLI or Playwright for automated screenshots:

```bash
# Full-page screenshots at 3 viewports
surf screenshot --full-page --width 375  --output qa/mobile-full.png
surf screenshot --full-page --width 768  --output qa/tablet-full.png
surf screenshot --full-page --width 1440 --output qa/desktop-full.png
```

Checklist per screenshot:
- No horizontal overflow
- All images render (no broken icons)
- Text readable at all viewport widths
- No elements overlapping or cut off
- Navigation visible, footer complete
- Forms properly sized, labels visible
