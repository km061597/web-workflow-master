# WEBSITES — Master Roadmap to Operational Business

**Last updated:** 2026-04-30
**Current state:** M001 ✅ · M002-66id2a ✅ · M002-3o6uqs ✅ · M002-gyr99j ⬜ · M003-hqckw7 ⬜

---

## THE FINISH LINE

"Done" means:

1. **A live agency site** at `metzgerwebsites.com` with working contact form, pricing page, and portfolio of 3+ spec sites
2. **A signed first client** whose site is live on a custom domain with working contact forms and analytics
3. **A repeatable weekly rhythm:** 5 cold emails/week → discovery calls → deposits → builds → launches → maintenance batches
4. **Zero manual React component edits** for typical updates — config-driven sites via `site.ts` + `PROPOSAL-SPEC.md`
5. **A CLI-driven operational pipeline:** `init` → `intake` → `dossier` → `design` → `site-init` → `site-populate` → `verify` → `finalize` → `deploy` → `convert` → `launch` → `replay` → `batch`
6. **Financial infrastructure:** Stripe payment links tested, E&O insurance bound, business bank open, tax reserve flowing
7. **Legal infrastructure:** MSA + SOW + maintenance addendum reviewed by attorney once, reusable forever
8. **Quality gates enforced:** Every site passes Lighthouse 90+ mobile / 95+ desktop and WCAG 2.1 AA zero critical/serious before launch

---

## PHASE A: BUSINESS INFRASTRUCTURE (Human Gates — Cannot Be Automated)

These are the LAUNCH-GATES.md items that block first cold email and first client. The agent cannot execute these. The operator must.

### A1. THIS WEEK (Blocks First Cold Email)

| # | Gate | Status | Action Required | ETA |
|---|------|--------|-----------------|-----|
| A1.1 | Domain warmed (10 real emails sent over 3–5 days) | ⬜ | Send emails from `metzgerwebsites.com` to friends/family | 3–5 days |
| A1.2 | SPF + DKIM + DMARC configured and verified | ⬜ | Configure in Google Workspace; verify at mxtoolbox.com | 1 hour |
| A1.3 | Lighthouse audit of own site (metzger-website-design) | ⬜ | Run Chrome DevTools Lighthouse; fix any sub-90 mobile / sub-95 desktop scores | 2 hours |
| A1.4 | E-signature tool account (Dropbox Sign or Documenso) | ⬜ | Sign up; test sending a doc to yourself | 30 min |
| A1.5 | Business cards ordered (Moo or Vistaprint) | ⬜ | Design and order 100 cards | 1 hour |
| A1.6 | One-sentence pitch memorized | ⬜ | Practice until natural | Ongoing |

### A2. BLOCKS FIRST CLIENT (Within 2 Weeks of First Email)

| # | Gate | Status | Action Required | Cost | ETA |
|---|------|--------|-----------------|------|-----|
| A2.1 | LLC formed + EIN in hand | ⬜ | File with Secretary of State; apply at IRS.gov | ~$100 state fee | 1–2 weeks |
| A2.2 | Business bank account open | ⬜ | Bring EIN, articles, operating agreement, DL | $0 | 1–2 hours |
| A2.3 | Stripe active + payment links tested | ⬜ | Sign up; create deposit + subscription products; do $1 test charge and refund | $0 | 1 hour |
| A2.4 | E&O insurance bound ($1M coverage) | ⬜ | Hiscox / Next / Thimble | ~$30–60/mo | 30 min |
| A2.5 | MSA + SOW + maintenance addendum reviewed by lawyer | ⬜ | Send drafts from `ops/legal/` to attorney | ~$300 one-time | 3–5 days |
| A2.6 | Google Workspace set up | ⬜ | workspace.google.com — `you@metzgerwebsites.com` | $7/mo | 30 min |
| A2.7 | Business phone number | ⬜ | Google Voice (free) or OpenPhone ($15/mo) | $0–$15/mo | 15 min |

### A3. OPTIONAL BUT RECOMMENDED

| # | Gate | Status | Action Required | Cost |
|---|------|--------|-----------------|------|
| A3.1 | Bookkeeping software (Wave or QuickBooks) | ⬜ | Connect bank account; set up chart of accounts | $0–$20/mo |
| A3.2 | Tax reserve account (separate savings) | ⬜ | Open at same bank; auto-transfer 30% of every payment | $0 |
| A3.3 | Calendly configured | ⬜ | 30-min "Discovery Call" event; block W-2 hours | $0 |
| A3.4 | Password manager adopted | ⬜ | 1Password or Bitwarden; store all API keys/credentials | $0–$3/mo |
| A3.5 | Defensive domains (.net, .co) registered | ⬜ | Namecheap | ~$24/yr |

---

## PHASE B: PRODUCT & TEMPLATE MATURITY (Code Milestones)

### B1. M002-gyr99j: Operator Marketing Site + Portfolio Launch

**Status:** Planned, not started
**Entry condition:** M002-3o6uqs complete (✅)
**Exit condition:** `metzgerwebsites.com` live with working contact form + 3 spec sites in portfolio

#### B1-S01: Polish Operator Marketing Site

**Scope:** `templates/metzger-website-design/ — **TODO pending owner**`

**Deliverables:**
- [ ] `pnpm build` passes with zero TypeScript errors
- [ ] Zero `REPLACE_` or `Lorem Ipsum` strings anywhere in `src/`
- [ ] Contact form POSTs to `/api/contact` with Zod validation
- [ ] Resend API route delivers email to `MetzgerWebsites@gmail.com`
- [ ] Honeypot spam field present (silent accept for bots)
- [ ] Graceful degradation when `RESEND_API_KEY` missing (logs + returns `delivered: false`)
- [ ] Pricing page shows three tiers: Starter $1,800/$95mo · Standard $3,500/$135mo · Premium $6,500/$225mo
- [ ] Portfolio page links to all 3 spec sites with thumbnail images + descriptions
- [ ] NAP (Name/Address/Phone) is byte-identical across footer, contact page, schema JSON-LD
- [ ] All image references resolve or have graceful fallbacks
- [ ] Lighthouse: 90+ mobile / 95+ desktop
- [ ] WCAG 2.1 AA: zero critical/serious violations

**Files likely touched:**
- `templates/metzger-website-design/src/config/site.ts — **TODO pending owner**`
- `templates/metzger-website-design/src/app/api/contact/route.ts`
- `templates/metzger-website-design/src/app/contact/page.tsx`
- `templates/metzger-website-design/src/app/services/page.tsx` (pricing)
- `templates/metzger-website-design/src/app/portfolio/page.tsx`
- `templates/metzger-website-design/src/components/ContactForm.tsx — **TODO pending owner**`
- `templates/metzger-website-design/src/components/PricingCard.tsx`
- `templates/metzger-website-design/src/components/SiteFooter.tsx`

**Verification:**
```bash
node scripts/verify-lighthouse.mjs templates/metzger-website-design
node scripts/verify-a11y.mjs templates/metzger-website-design
```

#### B1-S02: Complete Rosenberg Jewelers Spec Site

**Scope:** `templates/spec-rosenberg-jewelers/`

**Deliverables:**
- [ ] `site.ts` filled with realistic fictional business data for a Midwest family-owned jeweler (established 1970s–1980s, warm heritage brand voice)
- [ ] All pages render with zero placeholder text: Home, About, Services, Gallery, Contact
- [ ] Brand voice matches archetype: classic, trustworthy, multi-generational, community-rooted
- [ ] Services include: custom design, repair, appraisal, estate buying, watch repair, jewelry cleaning
- [ ] Gallery has realistic alt text for 6–12 jewelry images
- [ ] Hours table with proper semantic markup
- [ ] `pnpm build` passes with zero errors
- [ ] Zero `REPLACE_` or `Lorem Ipsum` strings
- [ ] Lighthouse: 90+ mobile / 95+ desktop
- [ ] WCAG 2.1 AA: zero critical/serious violations

**Files likely touched:**
- `templates/spec-rosenberg-jewelers/src/config/site.ts`
- `templates/spec-rosenberg-jewelers/src/app/*/page.tsx` (content pages)
- `templates/spec-rosenberg-jewelers/src/components/*.tsx`

**Verification:**
```bash
node scripts/verify-lighthouse.mjs templates/spec-rosenberg-jewelers
node scripts/verify-a11y.mjs templates/spec-rosenberg-jewelers
```

#### B1-S03: Deploy Both Sites to Vercel

**Scope:** Production deployment

**Deliverables:**
- [ ] `metzgerwebsites.com` custom domain resolves to marketing site
- [ ] `rosenberg-jewelers.vercel.app` resolves to spec site
- [ ] DNS records (CNAME/A) added at registrar and confirmed in Vercel dashboard
- [ ] `RESEND_API_KEY` and `CONTACT_TO_EMAIL` env vars set in Vercel project
- [ ] Contact form tested end-to-end: submit → email received at `MetzgerWebsites@gmail.com` within 60 seconds
- [ ] Lighthouse run against live URLs confirms 90+ mobile / 95+ desktop
- [ ] WCAG audit against live URLs confirms zero critical/serious
- [ ] Portfolio screenshot for Rosenberg captured and added to marketing site
- [ ] Both sites pass browser proof: home + services render at desktop + mobile, zero console errors

**Risks:**
- Custom domain DNS propagation can take 24–48 hours
- Resend domain verification may fail silently if DNS incorrect
- Vercel domain collision if domain previously attached to another project

**Verification:**
```bash
# Post-deploy browser proof
curl -s -o /dev/null -w "%{http_code}" https://metzgerwebsites.com
curl -s -o /dev/null -w "%{http_code}" https://rosenberg-jewelers.vercel.app
```

### B2. M002-3o6uqs Remediation (Non-blocking Follow-ups)

These are gaps documented in the validation verdict. They do not block any downstream work but should be closed for completeness.

| # | Gap | Remediation | Effort |
|---|-----|-------------|--------|
| B2.1 | Lighthouse harness only run against 1 of 4 sites | Run `verify-lighthouse.mjs` against `templates/metzger-website-design`, `specs/bayfront-goldsmith`, `specs/mile-high-jewelry` | 1 hour |
| B2.2 | Keyboard nav pass only covers `/` | Extend `verify-a11y.mjs` keyboard test to `/about`, `/services`, `/contact`, `/gallery` | 2 hours |
| B2.3 | S02 `requires: []` omits S01 | Update S02 metadata in DB/GSD to reference S01 dependency | 15 min |
| B2.4 | No requirement for Lighthouse gating | Add R031 to REQUIREMENTS.md for Lighthouse performance gating | 15 min |
| B2.5 | R016 partial coverage | Document `launch-check.mjs` and placeholder-analysis status; add harness if missing | 2 hours |

---

## PHASE C: DOWNSTREAM AUTOMATION (Code Milestones)

### C1. M003-hqckw7: Downstream Automation Scaffolds

**Status:** Planned, not started
**Entry condition:** M001-fj1j00 ✅ + M002-66id2a ✅ + M002-gyr99j ✅
**Exit condition:** Full CLI pipeline from prospect → client → live site → maintenance

#### C1-S01: Convert Command (Prospect → Client Handoff)

**Scope:** `scripts/prospect-workflow.mjs convert <slug>`

**Deliverables:**
- [ ] `convert <slug> --dry-run` prints full conversion plan without mutating anything
- [ ] `convert <slug> --apply` moves `prospects/<slug>/site/` → `clients/<slug>/repo/`
- [ ] Copies dossier, spec, proposal, manifest into `clients/<slug>/`
- [ ] Promotes manifest stage to `signed-client`
- [ ] Writes `convert.history.json` breadcrumb with timestamp and source path
- [ ] Idempotent: rerunning on already-converted client is blocked with clear message
- [ ] No-network test harness (`verify-s01.mjs`) passes 24/24 assertions

**Files likely touched:**
- `scripts/prospect-workflow.mjs` (new `convert` subcommand)
- `scripts/verify-s01.mjs` (new harness)
- `ops/client-transformation-workflow.md` (update with convert step)

**Verification:**
```bash
node scripts/prospect-workflow.mjs convert lemons-jewelers --dry-run
node scripts/prospect-workflow.mjs convert lemons-jewelers --apply
node scripts/verify-s01.mjs
```

#### C1-S02: Launch Command (Production Deployment for Signed Clients)

**Scope:** `scripts/prospect-workflow.mjs launch <slug>`

**Deliverables:**
- [ ] `launch <slug> --plan` prints all planned production mutations: domain DNS, Resend verify, env vars, Stripe links, GA tag
- [ ] Single confirmation gate: operator types `yes` before any external call fires
- [ ] Prints exact CNAME/A records to add at registrar
- [ ] Triggers Resend domain verification with exponential backoff polling (max 10 attempts, ~5 min)
- [ ] Injects Stripe payment links from `ops/stripe-links.md` into site config
- [ ] Injects Google Analytics measurement ID as env var
- [ ] Generates GBP update instructions (manual copy-paste steps)
- [ ] Promotes existing Vercel project to production with custom domain
- [ ] Browser proof against live custom domain: home + contact, desktop + mobile, zero console errors
- [ ] Failure modes are explicit with repair paths: `domain-dns-missing`, `resend-verify-failed`, `stripe-link-missing`, `vercel-domain-error`
- [ ] No-network harness exercises success + failure modes with fake CLI shims

**Files likely touched:**
- `scripts/prospect-workflow.mjs` (new `launch` subcommand)
- `scripts/verify-s02.mjs` (new harness)
- `ops/deployment-readiness.md` (template, populated by launch)

**Verification:**
```bash
node scripts/prospect-workflow.mjs launch lemons-jewelers --plan
# (confirm yes for live deploy)
node scripts/verify-s02.mjs
```

#### C1-S03: Replay Loop (Customization Requests)

**Scope:** `scripts/prospect-workflow.mjs replay <slug>`

**Deliverables:**
- [ ] `customization-requests.md` template exists in client scaffold with status tracking (pending / in-progress / applied)
- [ ] `replay <slug>` reads unapplied requests from `customization-requests.md`
- [ ] Prepares structured context for Claude: current spec state, request text, desired output format
- [ ] Claude edits `PROPOSAL-SPEC.md` based on context
- [ ] Workflow runs `site-populate` + `verify` automatically after spec edit
- [ ] Applied requests marked in manifest with timestamp + applied-by breadcrumb
- [ ] Typical changes work without component edits: hero image swap, CTA copy change, hours update, service addition
- [ ] Operator explicitly runs `deploy` separately to push live (preserves confirmation gate)

**Files likely touched:**
- `scripts/prospect-workflow.mjs` (new `replay` subcommand)
- `scripts/verify-s03.mjs` (new harness)
- `ops/client-transformation-workflow.md` (update with replay step)

**Verification:**
```bash
# Write a request to clients/lemons-jewelers/customization-requests.md
echo "- [ ] Update hero headline to 'Spring Collection Now Available'" >> clients/lemons-jewelers/customization-requests.md
node scripts/prospect-workflow.mjs replay lemons-jewelers
node scripts/verify-s03.mjs
```

#### C1-S04: Outreach Scaffold Population

**Scope:** `scripts/prospect-workflow.mjs outreach <slug>`

**Deliverables:**
- [ ] `outreach <slug>` populates `outreach.md` with:
  - Subject line options (3 variants)
  - Cold email body copy
  - Drop-in talking points for in-person visit
  - Follow-up sequence template (day-4, day-11, day-30)
- [ ] Content drawn from `dossier.md` + `PROPOSAL-SPEC.md` + manifest state
- [ ] Zero placeholder text remaining
- [ ] No auto-send capability (operator copies and sends manually)
- [ ] No-network harness validates output structure

**Files likely touched:**
- `scripts/prospect-workflow.mjs` (new `outreach` subcommand)
- `scripts/verify-s04.mjs` (new harness)
- `ops/sales/cold-email-v1.md` (reference, not modified)

**Verification:**
```bash
node scripts/prospect-workflow.mjs outreach lemons-jewelers
node scripts/verify-s04.mjs
```

#### C1-S05: Sunday Batch Report

**Scope:** `scripts/prospect-workflow.mjs batch`

**Deliverables:**
- [ ] `batch` scans all `clients/*/` folders
- [ ] Reads `customization-requests.md` and `maintenance-plan.md` from each client
- [ ] Prints summary: client name, pending count, oldest pending item date
- [ ] Zero mutations to any client folder or external service
- [ ] Readable markdown output suitable for copy-paste into weekly review
- [ ] No-network harness validates aggregation logic with 2+ fixture clients

**Files likely touched:**
- `scripts/prospect-workflow.mjs` (new `batch` subcommand)
- `scripts/verify-s05.mjs` (new harness)
- `ops/weekly-review.md` (update with batch integration)

**Verification:**
```bash
node scripts/prospect-workflow.mjs batch
node scripts/verify-s05.mjs
```

---

## PHASE D: SALES OPERATIONS (Human + AI-Assisted)

These are the weekly operational activities that generate revenue. The agent can assist with preparation; the operator must execute.

### D1. First Active Outreach Week

| Day | Activity | Time | Agent Can Help | Operator Must Do |
|-----|----------|------|----------------|------------------|
| Monday | Farm 10 prospects from Google Maps → add to `prospects/_master-list.md` | 15 min | — | Search Maps, copy names/addresses/URLs |
| Tuesday | Run Prompt ① (prospect-intel) on 5 prospects → save dossiers | 25 min | Generate dossier content | Review and save |
| Wednesday | Run Prompt ② (outreach) on same 5 → compose cold emails | 20 min | Generate email copy | Send emails manually |
| Thursday | Day-4 follow-ups on previous week's emails | 10 min | Draft follow-ups | Send manually |
| Friday | Day-11 breakups + weekly review + `batch` command | 20 min | Generate breakup copy, run `batch` | Send breakups, review pipeline |

### D2. Discovery Call → Deposit

| Stage | Deliverable | Agent Can Help | Operator Must Do |
|-------|-------------|----------------|------------------|
| Call booked | Calendly link sent | — | Operator sends link |
| Discovery call | Notes captured in `discovery-notes.md` | — | Operator runs call |
| Post-call | `PROPOSAL-SPEC.md` updated with call insights | Generate spec content | Operator reviews and approves |
| Proposal | `proposal.md` + live spec site URL | Generate proposal copy | Operator delivers in person or via email |
| Deposit | Stripe payment link sent | — | Operator sends link, confirms payment |
| Build kickoff | `mv prospects/[name] clients/[name]/` then `convert --apply` | Run `convert` command | Operator confirms |

### D3. Build → Launch → Maintenance

| Stage | Deliverable | Agent Can Help | Operator Must Do |
|-------|-------------|----------------|------------------|
| Site build | Prompt ④ generates pages from `PROPOSAL-SPEC.md` | Generate all page content + components | Operator reviews and approves |
| Pre-launch | `launch-check.mjs` passes; Lighthouse + a11y green | Run checks, fix issues | Operator confirms green light |
| Launch | `launch --plan` → confirm → live on custom domain | Run `launch` command | Operator types `yes` |
| Post-launch | GBP updated with new URL; analytics confirmed | Generate GBP instructions | Operator executes manually |
| Weekly | `batch` command surfaces pending items | Run `batch`, generate context | Operator decides what to do |
| Customization | Client texts request → operator logs to `customization-requests.md` | — | Operator logs request |
| Replay | `replay <slug>` prepares spec edit context | Run `replay`, generate edits | Operator reviews and confirms |
| Sunday batch | `batch` + maintenance queue drain via Prompt ⑤ | Run `batch`, generate maintenance plan | Operator approves and communicates |

---

## PHASE E: SCALING & OPTIMIZATION (Post-Revenue)

These are not on the critical path to first client but should be tracked for when revenue allows.

| # | Initiative | Trigger | Effort |
|---|------------|---------|--------|
| E1 | Niche expansion beyond jewelers | 5+ clients in jewelers; repeatable case study | Medium |
| E2 | Pricing optimization based on conversion data | 10+ discovery calls with price conversations | Low |
| E3 | Referral program (discount for referred clients) | 3+ happy clients | Low |
| E4 | Case study pages on marketing site | 2+ launched clients with measurable outcomes | Medium |
| E5 | Automated testimonial collection (post-launch email) | 3+ launched clients | Low |
| E6 | Template marketplace (sell template separately) | 10+ total launches; template is stable | High |
| E7 | Hire subcontractor for build execution | Operator at capacity (5+ concurrent clients) | High |
| E8 | Upgrade to Vercel Pro for team features | 2+ team members or need for preview deployments | Low |

---

## REQUIREMENT COVERAGE MAP

### Validated (14/30)

| ID | Requirement | Validated By |
|----|-------------|--------------|
| R002 | Structured prospect folder | M001/S01 |
| R003 | JSON manifest tracking | M001/S01 |
| R004 | Evidence ledger separating claims | M001/S02 |
| R007 | Design shotgun brief | M001/S03 |
| R009 | Config-driven site (`site.ts`/`proposal.ts`) | M001/S05 |
| R010 | Frontend-ultimate integration (quality design, a11y) | M001/S06 + M002-3o6uqs/S02 |
| R013 | Deploy to Vercel + capture URL | M002-66id2a/S03 |
| R014 | Record live URL in manifest + docs | M002-66id2a/S03 |
| R015 | Browser verification against deployed URL | M002-66id2a/S04 |
| R016 | Automated local checks (`pnpm build`, `launch-check`) | M001/S06 |
| R018 | Full drop-in package (dossier, spec, design, proposal, script, manifest, site) | M001/S07 |
| R019 | Prospect-to-client handoff path | M003/S01 |
| R023 | Confidence modes (speculative → grounded → drop-in-ready) | M001/S02 |
| R024 | Separate speculation from factual claims | M001/S02 |

### Active / Pending Validation (12/30)

| ID | Requirement | Owner | Blocked By |
|----|-------------|-------|------------|
| R001 | Broad prospect input range | M001/S01+ | — (ongoing) |
| R005 | Prospect dossier generation | M001/S02 | — (Claude-assisted, not pure CLI) |
| R006 | Proposal specification (`PROPOSAL-SPEC.md`) | M001/S03 | — (Claude-assisted) |
| R008 | Copy master template to prospect folder | M001/S04 | — |
| R011 | Visual mockups separating speculation from facts | M001/S03 | — |
| R012 | Private GitHub repo per proposal | M002-66id2a/S02 | — |
| R017 | Single confirmation gate for external actions | M002-66id2a/S01 | — |
| R020 | `deployment-readiness.md` scaffold | M002-66id2a/S05 / M003/S02 | M003 launch |
| R021 | `maintenance-plan.md` + `customization-requests.md` | M003/S02 | — |
| R022 | Outreach/send materials (no auto-send) | M003/S03 | — |
| R025 | Highly malleable site (config-driven updates) | M001/S04 | M003 replay loop |
| R028 | Brand-rescue fallback for missing logos | M001/S03 | — |

### Superseded (4/30)

| ID | Requirement | Reason |
|----|-------------|--------|
| R026 | (superseded) | Replaced by R025 |
| R027 | (superseded) | Replaced by R025 |
| R029 | (superseded) | Folded into M003/S02 |
| R030 | (superseded) | Folded into M003/S03 |

---

## CRITICAL PATH TO FIRST REVENUE

The shortest path from today to first dollar:

```
Week 1:
  Mon: Close M002-gyr99j S01 (polish marketing site)
  Tue: Close M002-gyr99j S02 (complete Rosenberg spec)
  Wed: Close M002-gyr99j S03 (deploy both to Vercel)
  Thu: Run Lighthouse + a11y against live URLs; fix any issues
  Fri: Execute LAUNCH-GATES A1 (domain warmup, SPF/DKIM, e-signature, cards)

Week 2:
  Mon: Execute LAUNCH-GATES A2 (LLC, bank, Stripe, insurance, lawyer review)
  Tue: Start M003 S01 (convert command) + S02 (launch command)
  Wed: Farm first 10 prospects → run Prompt ① on 5
  Thu: Run Prompt ② → send first 5 cold emails
  Fri: Weekly review + pipeline check

Week 3+:
  Mon: Farm 10 more prospects
  Tue-Wed: Dossier + outreach for top 5
  Thu: Follow-ups
  Fri: Breakups + review
  
  (Repeat until first reply → discovery call → deposit)
```

**First revenue milestone:** Deposit clears on first signed client. Target: 4–8 weeks from today if LAUNCH-GATES execute in parallel with code work.

---

## RISK REGISTER

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Custom domain DNS fails silently | Medium | High | Print exact records; verify with `dig`; 24–48h propagation buffer |
| Resend domain verify hangs | Medium | Medium | Exponential backoff polling; clear retry instructions |
| Stripe account verification delayed | Low | High | Start Stripe signup immediately; use test mode until verified |
| Lawyer review takes >1 week | Medium | Medium | Send docs early; have fallback generic terms ready |
| First cold emails get zero replies | High | Medium | Iterate subject lines; follow up at day-4 and day-11; qualify in better |
| Lighthouse scores dip on Vercel edge | Medium | Medium | Run against live URL before declaring launch-ready; have 5-point buffer |
| M003 scope creep (trying to automate too much) | Medium | High | Strict scope boundaries; manual steps for GBP, email sending, domain purchase |
| Operator W-2 time conflicts with client work | High | High | Batch all maintenance on Sunday; config-driven updates via `replay`; no midweek emergencies |

---

## DECISIONS TO MAKE

These are open questions that will shape execution. Make them explicitly.

1. **Calendly vs. Cal.com vs. SavvyCal?** — Deferred to post-revenue. Currently using email-only contact flow.
2. **Fresh GitHub repo for clients or transfer pitch repo?** — Leaning: fresh repo (cleaner handoff).
3. **Should `replay` auto-redeploy or stop at `verify`?** — Leaning: stop at `verify`; operator runs `deploy` explicitly.
4. **GBP automated API vs. manual instructions?** — Leaning: manual instructions (OAuth complexity not worth it for solo operator).
5. **Niche after jewelers?** — Candidates: independent dentists, boutique fitness studios, family law attorneys.

---

*This is a living document. Update when milestones complete, requirements validate, or new risks surface.*
