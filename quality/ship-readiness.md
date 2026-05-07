---
name: ship-readiness
description: Final 30-point checklist before any site goes live or any cold email is sent. Combines product quality gates with business readiness. No exceptions, no skips.
type: project
---

# Ship Readiness Checklist

> Every item below must be checked before claiming "ready to ship." Unchecked = not ready. No exceptions.

---

## Product Quality (20 items)

### Build & Code (4)
- [ ] `npm run build` exits 0, zero TypeScript errors
- [ ] `npm run test` passes, zero failures
- [ ] `npx prettier --check .` passes, zero formatting issues
- [ ] `npm run lint` passes, zero lint errors

### Performance (3)
- [ ] Lighthouse mobile performance ≥90
- [ ] LCP ≤2.5s (Slow 4G simulated)
- [ ] CLS ≤0.1, INP ≤200ms

### Accessibility (3)
- [ ] axe-core scan: zero critical or serious violations
- [ ] WCAG 2.2 AA for all interactive elements
- [ ] Keyboard navigation works without traps; focus indicators visible

### Visual & Responsive (3)
- [ ] Screenshots at 375px: no horizontal scroll, no broken layouts
- [ ] Screenshots at 768px: nav works, cards reflow, no overlap
- [ ] Screenshots at 1440px: full design intent visible, no overflow

### Content & SEO (4)
- [ ] Zero Lorem Ipsum or placeholder text anywhere
- [ ] Every page has unique `<title>` + `<meta name="description">`
- [ ] OG tags present on key pages (homepage, contact, about)
- [ ] Sitemap.xml + robots.txt present and valid

### Functional (3)
- [ ] Click-path audit: zero 404s, zero `href="#"`, zero empty links
- [ ] Every form submits and shows success/error states
- [ ] Cart/checkout flow tested end-to-end (if e-commerce)

---

## Business Readiness (10 items)

### Before First Cold Email (6)
- [ ] Domain warmed: 10 real emails sent over 3–5 days
- [ ] SPF + DKIM + DMARC configured and verified (mxtoolbox.com)
- [ ] Your own site passes Lighthouse audit (90+ mobile)
- [ ] E-signature tool account active (Dropbox Sign or Documenso)
- [ ] Business cards ordered
- [ ] You can say what you do in one sentence without notes

### Before First Client (4)
- [ ] Business entity formed + EIN in hand
- [ ] Business bank account open
- [ ] Stripe active + test charge completed ($1 charge + refund)
- [ ] E&O insurance bound ($1M coverage, ~$30–60/mo)

### Optional but Recommended
- [ ] MSA + SOW reviewed by lawyer once (~$300, reuse forever)
- [ ] Google Workspace set up (you@yourbrand.com)
- [ ] Business phone number (Google Voice or OpenPhone)
- [ ] Password manager adopted (1Password or Bitwarden)
- [ ] Bookkeeping software connected (Wave or QuickBooks)
- [ ] Tax reserve account (30% auto-transfer)

---

## Autonomous Execution (for AI agents)

Gates 1–4 must be run on **every code change** without user prompting. If any fail, fix before continuing.

Product readiness items 5–20 must be run **before every delivery**. If any fail, document in `DECISIONS.md` — **TODO pending owner** — why the threshold was adjusted — default is no ship.

Business readiness (items 21–30) must be complete **before first client engagement**.

---

## Post-Ship

After the site is live:
1. Update `CHANGELOG.md` — **TODO pending owner** — with deploy date + changes
2. Update `COMPONENT_AND_ANIMATION_REGISTRY.md` — **TODO pending owner** — if modified
3. Schedule 30-day review in calendar
4. Archive screenshot baselines in `quality/visual-regression/` — **TODO pending owner**

---

## Decision Log

See `.merge-decisions/quality/ship-readiness.md` for sources, tradeoffs, and open questions.
