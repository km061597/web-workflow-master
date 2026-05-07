# Discovery Playbook

Research the landscape before designing. Learn the industry, study competitors, and extract patterns — then decide what to adopt, adapt, or actively refuse.

## When to invoke

1. **Before design phase.** After BRIEF.md is filled and before DESIGN.md begins. The output directly informs palette, voice, IA, and differentiation decisions.
2. **During audit phase.** A gut-check — did we accidentally converge on a competitor's exact execution? Are we missing a table-stakes feature every competitor ships?
3. **When the client says "I like how [competitor] does X."** Research what X actually is, then decide whether to adopt the pattern, adapt it, or reject it with reasoning.
4. **When you don't know the industry.** Skip this at your peril — sites that use the wrong words, miss expected pages, or ignore compliance requirements get rejected by the business owner on first review.

## Phase 1: Industry landscape mapping

### Step 1: Define scope (15 min)

Before searching, answer these questions:

- **What does this business actually sell?** Not the category — the specific offering. "Custom wedding cakes in Austin" not "bakery."
- **Who is the buyer?** The person making the purchase decision. Age, context, urgency, budget sensitivity.
- **What is the buyer's mental model?** When they search, what words do they use? What do they expect to see first?
- **What geographic scope?** Local (single city), regional, national, or e-commerce (borderless).
- **Is this a considered purchase or an impulse/emergency?** This shapes the entire IA. Emergency services need phone number above the fold. Considered purchases need comparison content.

```bash
# Quick landscape scan
firecrawl-cli search "best [industry] websites [city]" --limit 10
firecrawl-cli search "[industry] near me [city]" --limit 10
```

### Step 2: Identify competitors and exemplars (30 min)

Collect four kinds. Five competitors total is the minimum; eight is the ceiling before diminishing returns.

**1. In-market direct** — Same service, same geography, same customer. The ones the client already names.

**2. In-market adjacent** — Same customer, different service — or same service, different customer. A catering company for the bakery. A restaurant-supply retailer for the bakery-supplier.

**3. Out-of-market exemplar** — A company in a completely different industry that shares the same job-to-be-done. These often have the best UX patterns because they've iterated longer on the core interaction. See `exemplars/` — **TODO pending owner** (scaffold function group) — for curated taste anchors.

**4. Anti-competitor** — The site you do NOT want to look like. Usually a direct competitor with obvious problems. Name it explicitly so the team knows which patterns to actively refuse.

```bash
# Map each competitor's full site structure
firecrawl-cli map "https://competitor1.com" --limit 200
firecrawl-cli map "https://competitor2.com" --limit 200

# Scrape key pages for content patterns
firecrawl-cli scrape "https://competitor1.com" --formats markdown
firecrawl-cli scrape "https://competitor1.com/services" --formats markdown
firecrawl-cli scrape "https://competitor1.com/about" --formats markdown
```

For each competitor, record:
- URL
- Pages they have (full sitemap from `map`)
- What's above the fold on the homepage (screenshot via `surf`)
- Primary CTA text and placement
- How they handle mobile (viewport emulation via `surf --viewport 375x812`)
- Trust signals visible without scrolling
- Booking/contact/purchase flow (how many clicks to convert?)

## Phase 2: Competitor teardown

Score each axis 1-5 for each competitor. This framework mirrors the `exemplars/` teardown structure.

### Axis 1: Visual identity

- What is the color palette? How many colors? Is there a gradient system or is it flat?
- Typography: display font, body font, number of weights in use, type scale
- Photography style: custom, stock, illustrated, none? Lifestyle vs. catalog?
- Overall density: airy/spacious or packed/information-dense?
- Does it look like a template? Can you identify the template?
- **Score 1-5:** 1 = obvious template, 5 = distinctive and cohesive

### Axis 2: Content and voice

- Read the hero headline. Is it benefit-driven, feature-driven, clever, or generic?
- Read the CTA labels. "Get Started" vs. "Order Now" vs. "See Menu" — specificity matters
- Is the copy confident or apologetic? Active or passive?
- Does it sound like a real person wrote it or like AI-generated filler?
- Check `exemplars/tier-c-counter-examples/` — **TODO pending owner** (scaffold function group) — does it match any tells?
- **Score 1-5:** 1 = lorem-ipsum-tier, 5 = voice you'd recognize blind

### Axis 3: Information architecture and navigation

- How many top-level nav items? How deep does the hierarchy go?
- Can you reach the most important page (menu/products/services) in 1 click from anywhere?
- Is there a footer with navigation? Breadcrumbs? Search?
- On mobile: hamburger-only, or do key items remain visible?
- Are there orphan pages (reachable only via direct URL)?
- **Score 1-5:** 1 = lost in 2 clicks, 5 = everything findable via 2+ routes

### Axis 4: Conversion patterns

- What is the primary CTA? Is it visible without scrolling on mobile?
- How many CTAs compete for attention on the hero section?
- Is there a clear funnel: browse → select → act?
- Forms: how many fields? Are they mobile-optimized? Do they work?
- Trust signals: reviews, badges, guarantees, real photos, team bios?
- **Score 1-5:** 1 = no clear action, 5 = frictionless path to conversion

### Axis 5: Technical and performance

```bash
surf screenshot https://competitor.com --width 375 --height 812 -o research/screenshots/competitor-perf.png
```

Check in browser DevTools or via Lighthouse:
- Mobile load time (3G simulation)
- Layout shifts during load
- Image optimization (WebP/AVIF or uncompressed JPEGs?)
- Font loading (FOUT/FOIT behavior)
- Core Web Vitals — LCP, INP, CLS
- **Score 1-5:** 1 = 10s+ load, 5 = sub-2s LCP on mobile

## Phase 3: Domain deep-dive

### Step 3: Extract structural patterns (45 min)

Across all competitors, look for convergence:

**Pages they all have** — these are non-negotiable for the industry. If every plumber has a "Service Areas" page, your plumber needs one too. Missing an expected page erodes trust.

**Pages that differentiate** — pages only 1-2 have. These are opportunities.

**Above-the-fold patterns** — what appears in the first viewport? Phone number? Hero image? Booking widget? Price range?

**Navigation structure** — how many top-level items? What are they called? This reveals the customer's mental model.

**Transactional verbs** — "Book Now," "Get a Quote," "Order Online," "Schedule," "Reserve," "Request Estimate." Using the wrong verb for the industry sounds off. Restaurants "reserve." Plumbers give "estimates." Lawyers offer "consultations."

**Calls-to-action** — primary and secondary. Where are they? How are they phrased? Sticky header CTA? Floating button? Bottom bar on mobile?

### Step 4: Build the domain glossary (30 min)

Every industry has terms-of-art that outsiders get wrong. A site that says "hair appointment" instead of "booking" or "lawyer" instead of "attorney" signals the builder doesn't understand the business.

From the scraped content, extract:

- **Service names** — the exact words used for services. Not synonyms, the actual terms customers use.
- **Category labels** — how services are grouped. "Residential vs Commercial" or "Preventive vs Emergency."
- **Credential names** — licenses, certifications, professional designations. These have exact names (e.g., "Licensed Master Plumber" not "certified plumber").
- **Industry jargon that customers know** — terms buyers use when informed (e.g., "HVAC" is universally understood; "mini-split" is known by some).
- **Industry jargon that customers don't know** — terms to avoid or explain (e.g., "occlusal adjustment" → say "bite correction" instead).

The glossary directly informs `copy-editor` and voice-and-tone decisions. See `conventions/voice-and-tone.md` — **TODO pending owner** (conventions function group) — for the voice framework.

### Step 5: Regulatory and compliance scan (30 min)

Some industries have rules about what you can and cannot say or collect on a website. Getting this wrong is a legal liability.

**Health / Medical / Dental:**
- HIPAA: contact forms that collect health information need encrypted transmission, BAA with form processor, and privacy notice
- No guaranteed outcomes ("we will fix your back" → "we treat back pain")
- Testimonials may need disclaimers depending on state
- ADA website accessibility is actively enforced

**Legal:**
- Most states require "attorney advertising" disclaimers
- "No attorney-client relationship" disclaimer on contact forms
- Cannot guarantee outcomes
- Prior results don't guarantee future outcomes (must be stated)

**Financial / Insurance:**
- Licensing disclosures (NMLS numbers, state registrations)
- Rate disclaimers (APR, terms, conditions)
- FINRA compliance for investment advisors
- Privacy policy requirements (GLBA)

**Food / Restaurant:**
- Allergen information requirements (varies by jurisdiction)
- Health department scores may need to be displayed
- Alcohol: age verification if online ordering includes drinks
- Nutritional information (required for chains with 20+ locations)

**Childcare / Education:**
- Background check certifications
- State licensing numbers
- Staff-to-child ratios (some states require disclosure)
- Photo consent considerations

**Home services / Construction:**
- Contractor license numbers (required in many states)
- Bond and insurance documentation
- Lead paint disclosures (pre-1978 homes)

Use WebSearch to verify current requirements for the specific state/jurisdiction.

### Step 6: Trust signals and seasonality (20 min)

**Trust signal inventory** — what makes a customer trust THIS type of business?

- Licenses and certifications (which ones matter, where to display them)
- Years in business
- Number of jobs/clients/patients served
- Awards and recognitions (which are real vs pay-to-play)
- Memberships (BBB, Chamber of Commerce, trade associations)
- Insurance/bonding (relevant for trades)
- Reviews and ratings (Google, Yelp, industry-specific platforms)
- Before/after photos (trades, salons, landscaping)
- Case studies or portfolio (professional services, creative)
- Team credentials (doctors, lawyers, financial advisors)

**Seasonality scan** — what changes throughout the year?

- Does demand spike seasonally? (HVAC: summer/winter. Landscaping: spring. Tax prep: Jan-April.)
- Do services change? (Restaurant: seasonal menus. Retail: holiday inventory.)
- Do hours change? (Summer hours, holiday hours, seasonal closures.)
- Are there annual events? (Sales, promotions, industry events.)
- Does the hero/homepage need to rotate?

Seasonality drives content architecture. If the business has seasonal variation, the site needs a CMS-driven mechanism for the owner to update seasonal content without developer intervention.

## How to use findings without copying

The goal is pattern extraction, not pixel replication. For each finding, ask:

**"What is the underlying decision, not the surface execution?"**

Examples:
- Competitor uses a full-bleed hero video → The decision is "lead with atmosphere over information." You might lead with atmosphere using a single striking photograph and typographic scale instead.
- Competitor has a sticky bottom bar on mobile → The decision is "keep the primary CTA always reachable." You might achieve this with a scroll-triggered FAB or an inline CTA at natural scroll breakpoints.
- Competitor uses testimonial cards in a carousel → The decision is "social proof near the conversion point." You might use a single pull-quote with attribution instead of a carousel.

### When a competitor does something well

Write it down as a **pattern to adopt**. Name the pattern, not the competitor's implementation:

```
Pattern: Persistent mobile CTA
Source: Competitor A's sticky bottom bar
Our execution: Scroll-triggered pill button, appears after first section scroll,
matches our design tokens. See DESIGN.md accent color.
```

### When a competitor does something poorly

Write it as a **trap to avoid** and cross-reference the counter-example:

```
Trap: Auto-playing hero video on mobile (kills LCP, burns data)
Source: Competitor B
Counter-example: `exemplars/tier-c-counter-examples/autoplay-video-hero.md` — **TODO pending owner** (scaffold function group)
Our stance: Static hero image, video available on tap with play icon
```

## Tooling reference

All tools below are workspace globals — no npm install required unless noted.

| Tool | Use | Fallback |
|---|---|---|
| `firecrawl-cli scrape` | Pull page content as clean markdown | `scrapling` for anti-bot sites |
| `firecrawl-cli map` | Discover full sitemap | Manual sitemap.xml parse |
| `firecrawl-cli search` | Find top competitors in the space | WebSearch MCP |
| `surf screenshot` | Visual inspection at breakpoints | Browser DevTools |
| `scrapling` | Anti-bot scraping when firecrawl is blocked | curl with custom headers |
| `scripts/discovery.mjs` | Automated competitor stack analysis + business research | Manual teardown |
| WebSearch MCP | Landscape understanding, trend scan, regulation verification | firecrawl-cli search |
| Context7 MCP | Library/framework docs when evaluating competitor stacks | Official docs |

### Scrape clean content

```bash
firecrawl-cli scrape https://competitor.com --format markdown > research/competitors/competitor-com.md
```

### Map the full URL inventory

```bash
firecrawl-cli map https://competitor.com > research/competitors/competitor-com-urls.txt
```

### Visual screenshots at key breakpoints

```bash
surf screenshot https://competitor.com --width 375 --height 812 -o research/screenshots/competitor-mobile.png
surf screenshot https://competitor.com --width 1440 --height 900 -o research/screenshots/competitor-desktop.png
```

### Anti-bot scraping fallback

```bash
scrapling fetch https://competitor.com --stealth > research/competitors/competitor-com-stealth.md
```

### Automated stack and pattern analysis

```bash
node scripts/discovery.mjs --analyze https://competitor1.com https://competitor2.com
```

### Full design-system extraction

For deep teardowns where you want to reverse-engineer tokens (color, type, spacing, components):

```
Dispatch: research-agent (deep-extraction mode) with the competitor URL
```

The research-agent extracts design tokens, grid system, component inventory, and motion patterns into a structured report.

## Output artifacts

All research outputs go into the client's research directory:

```
clients/<slug>/
  research/
    RESEARCH.md          ← consolidated industry + competitor research
    screenshots/
      competitor-a-mobile.png
      competitor-a-desktop.png
    reports/
      competitor-stack-analysis.json
```

### Template for `RESEARCH.md`

```markdown
# Discovery research: [Business name] — [Industry]

Date: YYYY-MM-DD
Analyst: research-agent

## Scope
- **Business:** [What they sell, specifically]
- **Buyer:** [Who makes the purchase decision, their context]
- **Buyer mental model:** [What they search for, what they expect to see]
- **Geography:** [Local / Regional / National / E-commerce]
- **Purchase type:** [Impulse / Emergency / Considered / Recurring]

## Competitor list

| Name | Type | URL | Overall score |
|---|---|---|---|
| [Name] | direct | https://... | X/25 |
| [Name] | adjacent | https://... | X/25 |
| [Name] | exemplar | https://... | X/25 |
| [Name] | anti-competitor | https://... | X/25 |

## Detailed teardowns

### [Competitor A]
**Type:** direct
**URL:** https://...
**Screenshots:** `screenshots/competitor-a-mobile.png`, `screenshots/competitor-a-desktop.png`

| Axis | Score | Notes |
|---|---|---|
| Visual identity | X/5 | ... |
| Content/voice | X/5 | ... |
| IA/navigation | X/5 | ... |
| Conversion | X/5 | ... |
| Technical/perf | X/5 | ... |
| **Total** | **X/25** | |

**Patterns to adopt:**
- [Pattern name]: [What it is, why it works, how we'd execute differently]

**Traps to avoid:**
- [Trap name]: [What it is, why it's bad, cross-ref to counter-example]

[Repeat for each competitor]

## Structural patterns

### Pages every competitor has (non-negotiable)
- [page]: [what it contains, typical position in nav]

### Pages that differentiate (opportunities)
- [page]: [who has it, why it works]

### Above-the-fold consensus
- [What appears in the first viewport across all competitors]

### Navigation structure
- [Typical top-level items, typical order, typical depth]

### Transactional verbs used
- Primary CTA: [verb] (e.g., "Book Now", "Get Estimate")
- Secondary CTA: [verb] (e.g., "Learn More", "View Menu")

## Domain glossary
| Term | Usage | Notes |
|---|---|---|
| [term] | [how it's used in this industry] | [avoid/prefer/context] |

## Regulatory requirements
- [Requirement]: [What it means for the site]
- [Disclaimers needed]: [Exact text or pattern]

## Trust signals (ranked by impact)
1. [Signal]: [Where to display, how to source]
2. [Signal]: [Where to display, how to source]

## Seasonality
| Season/Period | What changes | Site impact |
|---|---|---|
| [period] | [what changes] | [what the site must do] |

## Differentiation summary

What we will do that NONE of them do:
- ...

What they ALL do that we must also do (table stakes):
- ...

What our anti-competitor does that we will actively refuse:
- ...

## Recommendations for design
- [Architecture recommendation based on findings]
- [Content recommendation based on findings]
- [Mobile-specific recommendation based on findings]
- [Integration recommendation based on findings]

## Sources
- [URLs scraped, dates, tools used]
```

## Feeding research into DESIGN.md

At the end of discovery, update the site's DESIGN.md with:

1. **Differentiation stance** — one sentence: "We are the [adjective] option in a field of [observation]."
2. **Adopted patterns** — list of patterns with our planned execution
3. **Refused patterns** — list of traps with named counter-examples
4. **Table-stakes features** — things every competitor has that we must ship
5. **Domain glossary** — key terms for copy-editor reference
6. **Regulatory guardrails** — what the site can and cannot say

## When to skip steps

- **Client provided competitor list?** Skip the search in Step 2, but still map and scrape them.
- **You've built for this industry before?** Still run Steps 2-3 — the landscape shifts. Time-box to 30 min total.
- **Emergency/rush project?** Do Steps 1, 2 (3 competitors only), and 4 (glossary). Skip the rest. Note what you skipped in the output.
- **The industry is genuinely well-known to you?** Still run Step 5 (regulatory). This is the one you can't safely skip.

## Definition of Done

- [ ] Scope defined (business, buyer, mental model, geography, purchase type)
- [ ] 4-8 competitors identified across all four types (direct, adjacent, exemplar, anti-competitor)
- [ ] Each competitor scraped with `firecrawl-cli` (content) and `surf` (screenshots at 375px + 1440px)
- [ ] Each competitor scored on all 5 axes with specific notes
- [ ] Domain glossary built with service names, category labels, credentials, jargon
- [ ] Regulatory scan completed for the industry and jurisdiction
- [ ] Trust signals inventoried and ranked by impact
- [ ] Seasonality scan completed (if applicable)
- [ ] Patterns-to-adopt list with our-execution-plan for each
- [ ] Traps-to-avoid list cross-referenced to `exemplars/tier-c-counter-examples/` — **TODO pending owner** (scaffold function group)
- [ ] Differentiation summary written: what we do that none of them do
- [ ] Table-stakes feature list extracted
- [ ] `RESEARCH.md` written to `clients/<slug>/research/RESEARCH.md`
- [ ] Screenshots saved to `clients/<slug>/research/screenshots/`
- [ ] Stack analysis report saved to `clients/<slug>/research/reports/` (if automated tools used)
- [ ] DESIGN.md updated with differentiation stance, adopted patterns, refused patterns, glossary, regulatory guardrails
- [ ] Anti-competitor named explicitly so the team knows what to actively refuse
