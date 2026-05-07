> Stack: Master-repo portable intake playbook. Use project-provided scaffold, audit, and release commands when present; otherwise treat command references as owner-scoped tasks to wire up.

# Intake — greenfield site (no existing site, no brand)

The client has no website, sometimes no logo, occasionally no finalized business name. Everything starts from zero. This playbook turns a conversation into a scaffolded project with brand direction, content plan, and staged rollout.

The operating metaphor: **you're not just building a website — you're building the first version of the business's digital identity.** Decisions made here echo for years.

## Discovery interview

These 12 questions extract everything you need to write the BRIEF.md. Ask them in conversation, not as a form — the follow-ups reveal more than the answers.

### The 12 questions

1. **What does the business do?** (In one sentence. If they can't, that's a branding problem to solve first.)
2. **Who is the primary customer?** (Demographics, geography, how they currently find businesses like this. "Everyone" is not an answer — push for specifics.)
3. **What action should a visitor take?** (Call, book, buy, request quote, visit in person, sign up. One primary CTA.)
4. **What's the competitive landscape?** (Name 2-3 competitors. If they don't know, that's research the agent does — see competitor research section below.)
5. **What transactions happen?** (Online purchase, appointment booking, quote request, phone call, walk-in. This determines the tech stack.)
6. **What content exists?** (Photos of the business/products, testimonials, service descriptions, pricing, certifications/licenses. "Nothing" is common and fine — plan for content creation.)
7. **What pages are essential?** (Let them say it, then compare against the project's small-business page inventory guidance when present.)
8. **Are there legal/regulatory requirements?** (HIPAA for healthcare, ADA compliance, food service permits, licensing disclosures, privacy policies for specific industries.)
9. **What's the budget for ongoing costs?** (Hosting, domain, email, CMS, monitoring. Set expectations with the active project's stack-cost guidance.)
10. **Who updates the site after launch?** (The owner? A staff member? You on retainer? This determines CMS choice and training needs.)
11. **What's the timeline?** (Hard deadline like a grand opening? Or "whenever it's ready"?)
12. **What sites do they admire?** (Not "what industry sites" — any site they think looks good. This reveals aesthetic preferences more reliably than abstract questions about "modern" or "professional".)

### What to do with the answers

Write them into `clients/<slug>/BRIEF.md` using the active project's client-site scaffold. Every `<TODO:>` marker in the brief must be filled before design begins.

## Brand foundation

When the client has no existing brand, you need to establish the minimum viable brand before design work begins.

### When to run brand strategy

Use the active project's brand strategy workflow or agent when:
- The client has no logo, no colors, no typography preferences
- The client has a name but no visual identity
- The client is choosing between multiple business names

The brand strategy workflow produces:
- Brand positioning statement (who, what, why different)
- Voice and tone direction (reference the active project's voice and tone guidance)
- Color palette (2-3 primary colors + neutrals, with documented contrast ratios)
- Typography direction (1-2 typeface families, with rationale)

### Naming (when needed)

If the client doesn't have a name yet:
1. Understand the business domain and competitive landscape
2. Generate 10-15 name candidates across categories: descriptive, evocative, abstract, compound
3. For each: check domain availability (`whois <name>.com` or Cloudflare domain search)
4. Present top 5 with available `.com` domains
5. Client picks — do NOT proceed without a name decision

### Minimum viable brand deliverables

Before entering the DESIGN phase:

```markdown
## Brand direction (in BRIEF.md)

### Name
<business name>

### Positioning
<one sentence: what they do, for whom, why they're different>

### Voice
- Tone: <e.g., warm and professional, direct and confident, friendly and casual>
- Vocabulary level: <e.g., everyday language, technical but accessible>
- Things we never say: <e.g., "synergy", "leverage", industry jargon the customer wouldn't use>

### Visual direction
- Primary color: <hex> (rationale: ___)
- Secondary color: <hex>
- Neutral palette: <2-3 neutrals>
- Display typeface: <name> (rationale: ___)
- Body typeface: <name>
- Imagery style: <e.g., real photography, lifestyle shots, illustrated icons>

### Admired sites
- <url> — what they liked about it
- <url> — what they liked about it
```

## Exemplar selection

Use high-quality exemplars to anchor the design direction WITHOUT copying. The process:

1. Read the client's admired sites from the discovery interview
2. Find the closest high-quality references in the active project's exemplar set or through fresh research (for example, institutional, fintech-minimal, product-dense, developer-facing, and marketing-forward references)
3. Read the teardown — specifically the "What to steal" and "What this site refuses to do" sections
4. Extract the applicable principles, not the specific design
5. Also identify weak counter-examples and explicitly list 2-3 patterns to avoid

Document this in `clients/<slug>/DESIGN.md` under a "Design references" section:

```markdown
## Design references

### Principles borrowed from
- Mercury: single-column clarity, generous whitespace, letting the product speak
- Linear: information density done right, keyboard shortcuts visible but not cluttering

### Anti-patterns we're avoiding
- generic-saas-template: no gradient mesh hero, no "trusted by" logo bar unless real logos exist
- hero-chasm: no generic tagline + CTA above the fold with no supporting context
- carousel-default: no auto-advancing carousel — ever
```

## Content sourcing

### Real photography

The single biggest differentiator between a professional site and AI slop. Guidelines:

- **Client's own photos** are almost always better than stock, even if they're iPhone photos. Real > polished-but-fake.
- **If the client has no photos**: recommend a professional shoot for the hero, team, and location. Budget: $300-800 for a small business.
- **Stock as last resort**: use Unsplash or Pexels, but only for abstract/textural images (backgrounds, section dividers). Never use stock for: the team, the location, the products, testimonials. That's the express lane to tier-C.
- **AI-generated images**: avoid for anything representing the business. AI-generated "photos" of fake people, fake products, or fake locations will be recognizable as such within 12 months, and they erode trust.

### Copy

- **Client writes it**: best outcome. Ask for rough drafts; the `copy-editor` agent refines. Real business voice > polished generic.
- **Agent writes it**: acceptable for structural copy (nav labels, footer text, form labels) and SEO-necessary content. Use the active project's voice, tone, and microcopy guidance. Run through the banned-words detector before shipping.
- **Nobody writes it**: the site ships with Lorem ipsum or "Coming soon" sections. This is a failure. Every page in the BRIEF must have real content before the build phase advance script passes.

## Domain + email + analytics + DNS setup

### Setup checklist

```markdown
## Infrastructure checklist

- [ ] Domain registered (prefer Cloudflare Registrar — at-cost pricing)
- [ ] DNS managed by Cloudflare (free tier)
- [ ] Email forwarding configured (Cloudflare Email Routing → client's existing email)
- [ ] SSL certificate: automatic via Vercel or Cloudflare
- [ ] Analytics installed: Plausible (EU-safe, no consent banner) or Vercel Web Analytics
- [ ] Google Search Console: domain verified, sitemap submitted
- [ ] Google Business Profile: updated with new website URL (critical for local businesses)
- [ ] Uptime monitoring: UptimeRobot (free tier) configured
- [ ] Error monitoring: Sentry free tier or Vercel monitoring
```

### When to set up each piece

| Item | Phase | Why not earlier |
|---|---|---|
| Domain registration | BRIEF (once name is final) | Need the name to register |
| DNS | BRIEF | Needed for email routing |
| Email forwarding | BRIEF | Client needs email before the site is done |
| Analytics | BUILD | Need pages to track |
| Search Console | BUILD | Need a deployed preview to verify |
| Business Profile | SHIP | Update only when the real site is live |
| Uptime monitoring | SHIP | Only makes sense when production URL exists |

## Competitor research

When the client can name competitors (question 4), or when they can't and you need to find them:

```bash
# Search for competitors in the client's industry + location
firecrawl search "best <industry> in <city>" --limit 10

# For each competitor site:
firecrawl scrape https://competitor-site.com -f markdown -o competitor-1.md

# Run performance audit on competitors
unlighthouse --site https://competitor-site.com

# Run the active project's click-path audit to find their weaknesses,
# then save the report as competitor-1-audit.json.
```

Document findings in `clients/<slug>/migration/competitor-research.md`:

```markdown
## Competitor analysis

### Competitor 1: <name> (<url>)
- **What they do well**: <specific observations>
- **What's broken**: <click-path audit findings, mobile issues, slow pages>
- **Their SEO position**: <what they rank for, how strong>
- **Design quality**: <reference tier-C patterns if applicable>
- **Gap we can exploit**: <what they're NOT doing that the client should>

### Competitor 2: ...
```

This becomes input for the DESIGN phase — the new site should be measurably better than the competition on mobile performance, accessibility, and UX clarity.

## Staged rollout

### Stage 1: Placeholder (optional, for businesses that need a web presence immediately)

A single-page "coming soon" with:
- Business name and logo
- Contact info (phone, email, address)
- Google Maps embed
- Hours of operation
- Deployed to the real domain

Build time: 30 minutes when the active project scaffold has a placeholder template.

### Stage 2: Soft launch

Full site deployed but not publicly promoted:
- All pages built with real content
- Forms tested with real submissions
- Mobile CWV gates passing
- Release gate passing: run the active project's release/readiness gate against the preview URL
- Click-path audit clean: run the active project's click-path audit on the preview URL
- Share preview URL with client for review

### Stage 3: Full launch

- DNS pointed to production
- Google Business Profile updated
- Search Console verified + sitemap submitted
- Analytics baseline captured (see the existing-site intake playbook analytics section when migrating from an existing site)
- Maintenance handoff written using the active project's handoff format
- Client trained on CMS updates (if applicable)
- Handoff package delivered

## Mobile requirements

Every greenfield site is designed mobile-first per the mobile requirements spec:

- Body/input text ≥16px (prevents iOS auto-zoom)
- Touch targets ≥24px visible / ≥44px hitbox
- `100dvh` not `100vh`
- `viewport-fit=cover` + `env(safe-area-inset-*)` on edge elements
- Mobile CWV gates: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on Slow 4G + 4× CPU throttle
- Test with `surf emulate.device "iPhone 15"` and `surf emulate.device "Pixel 7"` at minimum

## Industry-specific considerations

The workspace doesn't have pre-built templates per industry, but the discovery interview + competitor research fills this gap. For unfamiliar industries:

1. **Research first**: `firecrawl search "<industry> website best practices"` + read top 3 results
2. **Regulatory check**: research industry-specific legal requirements (HIPAA, ADA, PCI-DSS, food safety disclosures)
3. **Schema.org selection**: pick the right JSON-LD from project schema templates or Schema.org examples — LocalBusiness for storefronts, Product for e-commerce, Organization for service businesses
4. **Content structure**: different industries need different page structures (restaurants need menus + hours prominently; contractors need portfolio + certifications; healthcare needs provider bios + insurance accepted)
5. **Run visual research** with the active project's design research workflow if the exemplar set does not cover the industry

## Definition of done for intake-greenfield

- [ ] Discovery interview completed — all 12 questions answered
- [ ] Client-site scaffold run — client directory exists
- [ ] `clients/<slug>/BRIEF.md` — every `<TODO:>` marker filled with real content
- [ ] Brand direction documented (name, colors, type, voice) — even if minimal
- [ ] Content plan: who writes what, photography sourced or shoot scheduled
- [ ] Domain registered and DNS configured
- [ ] Email forwarding working (test: send an email, verify delivery)
- [ ] Competitor research documented (at least 2 competitors analyzed)
- [ ] High-quality exemplar references selected
- [ ] Weak counter-examples selected as anti-patterns
- [ ] Design phase readiness check passes — BRIEF phase DoD met
- [ ] Mobile-first commitment documented in DESIGN.md (not aspirational — specific targets)
