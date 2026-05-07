---
name: client-lifecycle
aliases: client-project-guide, onboarding, competitor-research, brand-bootstrap
description: Client project lifecycle phases 1-3: onboarding questions, competitor research, and brand bootstrap from personality to design tokens. Use at project start.
type: project
---

# Client Lifecycle

## Section 1: Onboarding

Ask these BEFORE designing. Extract answers into a design brief.

### Business Basics

1. **Business name** — Exact spelling, tagline if any
2. **Industry** — Restaurant, salon, contractor, etc.
3. **Years in business** — Trust signal
4. **Location(s)** — Address, service area
5. **Hours** — Opening hours, emergency availability
6. **Phone, email, social** — All contact methods

### Brand Personality (Pick 3 max)

| Trait        | Description                       |
| ------------ | --------------------------------- |
| Playful      | Fun, energetic, approachable      |
| Professional | Serious, expert, trustworthy      |
| Luxury       | Premium, exclusive, refined       |
| Friendly     | Warm, inviting, personal          |
| Bold         | Confident, loud, stands out       |
| Minimal      | Clean, simple, quiet              |
| Rustic       | Handmade, natural, heritage       |
| Modern       | Tech-forward, sleek, current      |
| Traditional  | Established, classic, reliable    |
| Edgy         | Risk-taking, unconventional, loud |

### Differentiation

7. **What makes you different from competitors?** — Specific, not generic
8. **Why do customers choose you?** — Real reason, not marketing speak
9. **What's your biggest strength?** — Speed, quality, price, service, expertise
10. **What do you want to be known for?** — One thing

### Audience

11. **Who is your ideal customer?** — Age, income, location, values
12. **What problem do you solve for them?** — Pain point
13. **How do they find you?** — Google, social, referral, walk-in

### Visual References

14. **3 websites you LIKE** — What do you like about each?
15. **3 websites you DISLIKE** — What do you dislike?
16. **Any existing branding?** — Logo, colors, fonts to keep or avoid
17. **Mood in one word** — Cozy, energetic, calming, bold, etc.

### Content

18. **Photos available?** — Professional, phone, stock, need photographer?
19. **Reviews/testimonials?** — How many, where (Google, Yelp, etc.)
20. **Services/products list** — With prices? With descriptions?
21. **Team bios** — Names, roles, photos?
22. **FAQ** — What do customers ask most?

### Functional Requirements

23. **Booking needed?** — Online, phone, walk-in only
24. **E-commerce?** — Products, services, gift cards
25. **Blog?** — How often updated
26. **Multilingual?** — Languages needed
27. **Special features?** — Menu, portfolio, calculator, etc.

### Anti-Slop Checks

After extracting answers, verify:

- [ ] Business name is NOT generic ("Best Services LLC")
- [ ] Differentiation is SPECIFIC (not "quality service")
- [ ] Audience is NARROW (not "everyone")
- [ ] Mood word is DISTINCTIVE (not "professional")
- [ ] At least one visual reference is UNEXPECTED

If checks fail, push client for more specific answers.

---

## Section 2: Competitor Research

Run this at the start of every new client project. Research informs design variation selection and prevents same-looking output across projects.

### Phase 1: Identify (Firecrawl Search)

Find 3-5 competitors in the client's industry, location, and price tier:

```
Use firecrawl MCP to search:
- "[industry] [city] website design"
- "[industry] [city] top rated"
- "[industry] [city] best"

Select competitors that:
- Serve the same customer demographic
- Are in the same geographic market
- Are successful (high traffic, good reviews)
```

Output: list of 3-5 competitor URLs.

### Phase 2: Extract (Firecrawl Scrape)

For each competitor URL, extract systematically:

1. **Color palette**: Sample DOM colors, convert to OKLCH. Identify primary, secondary, accent, neutral, semantic colors.
2. **Typography**: Font families used, scale (heading levels), line lengths, weights.
3. **Layout**: Page width, grid system, spacing rhythm, section patterns.
4. **Component inventory**: Navigation, hero, cards, CTAs, forms, footer. Note variations.
5. **Content structure**: Headline tone and length, body copy style, CTAs, value propositions.
6. **Navigation**: Info architecture depth, label patterns, mobile nav pattern.
7. **Differentiators**: What makes each site stand out or feel dated?

Use `firecrawl` MCP to scrape each competitor. Extract screenshots via surf CLI at 3 viewports (375, 768, 1440).

### Phase 3: Analyze

Answer for each competitor:

- What patterns repeat across the industry? (These are conventions — follow or intentionally break)
- What differentiates the market leaders? (Adopt these patterns)
- What feels dated? (Avoid these)
- What's missing that users would want?

Synthesize into a comparison matrix: columns = competitors, rows = {palette, type, layout, nav pattern, hero style, CTA style, differentiation angle}.

### Phase 4: Synthesize

Create a design brief with:

- **Adopt**: Conventions to follow (users expect them)
- **Avoid**: Dated patterns and overused conventions to break
- **Differentiate**: 2-3 angles that make this client unique in their market
- **Constrain**: Which design variation parameters to lock based on findings (e.g., this industry tends toward palette A3, hero H1 — pick a different palette and hero to stand out)

### Phase 5: Apply

Feed the synthesized brief into the design variation system:

1. Select a color palette that differentiates while fitting the industry
2. Choose typography pairing that matches the brand personality
3. Pick hero and content patterns from the constrained set
4. Set taste-skill dials (VARIANCE, MOTION, DENSITY) based on brand personality

Save findings to `.claude/memory/RESEARCH_FINDINGS.md` in the client project.

### Anti-Slop Rules

- Never copy a competitor's palette directly — extract the strategy, not the values
- Never generate "dark blue for tech" or "green for health" without evidence from actual research
- If 3+ competitors use the same hero pattern, you MUST pick a different pattern
- Research output must include specific OKLCH values, font names, and layout measurements — not adjectives

---

## Section 3: Brand Bootstrap

When client has no existing website, no logo, no brand identity. Generates a complete visual identity from research + client personality.

### Phase 1: Industry Context

Research 5 competitors in the client's industry. Extract:

- Common color patterns (OKLCH values)
- Typography trends (what fonts do leaders use?)
- Visual density norms (airy vs dense)
- Differentiation gaps (what's missing?)

Use Competitor Research Phase 1-3 for structured extraction.

### Phase 2: Client Personality

Extract from onboarding answers:

| Trait           | Questions                              | Output                        |
| --------------- | -------------------------------------- | ----------------------------- |
| Energy          | Bold/professional/warm/minimal/playful | 1 of 5 personality archetypes |
| Audience        | Who are they serving?                  | Demographics, expectations    |
| Values          | What matters?                          | 3-5 brand values              |
| Differentiation | What makes them different?             | Unique selling points         |

### Phase 3: Mood Directions

Generate 3 distinct mood boards (text descriptions, not images):

1. **Safe** — Industry-conventional. Feels familiar, trusted, professional. Low risk.
2. **Bold** — Breaks 1-2 conventions. Stands out while staying credible. Medium risk.
3. **Wild** — Radically different. High differentiation, higher risk. For brave clients.

For each direction:

- Color palette (3-5 colors in OKLCH)
- Typography pairing (heading + body)
- Spacing philosophy (airy/balanced/compact)
- Motion personality (subtle/dynamic/playful)
- 3 adjective pairs describing the mood
- 1 competitor this direction resembles
- 1 way it differentiates

Present to client for choice. Default to "Bold" if client doesn't choose.

### Phase 4: Token Generation

From chosen direction, generate formal design tokens:

**Color** (OKLCH format):
- Background, foreground
- Primary, primary-foreground
- Secondary, secondary-foreground
- Muted, muted-foreground
- Accent, accent-foreground
- Destructive
- Border, input, ring

**Typography**:
- Font family (heading + body, from Google Fonts or similar)
- Scale (base 16px, major third ratio 1.25)
- Weights (regular 400, medium 500, semibold 600, bold 700)

**Spacing**:
- Base unit (4px default)
- Section spacing (loose/tight/standard)

**Animation**:
- Duration tokens (fast 150ms, normal 250ms, slow 500ms)
- Easing curves

Write tokens to client project's `globals.css` as CSS custom properties.

### Phase 5: Brand Brief

Generate 1-page brand document:

```
# [Client Name] — Brand Brief

## Mission
[One sentence — what they do and why]

## Voice
- Tone: [3 adjectives]
- Do: [examples]
- Don't: [examples]

## Visual Identity
- Colors: [palette name + OKLCH values]
- Typography: [heading font] + [body font]
- Photography: [style direction]
- Iconography: [style]

## Do's and Don'ts
- Do: [brand-appropriate choices]
- Don't: [competitor-appropriate traps to avoid]

## Differentiation
- Industry norm: [what everyone does]
- Our angle: [how we're different]
```

### Anti-Slop Rules

- Never generate a palette without OKLCH values — adjectives don't compile
- Never pick "Inter" or "Roboto" — they're AI defaults
- Never use AI purple (#7C3AED) or AI blue (#3B82F6) as primary
- Never generate the same palette for two projects
- Cross-reference with the design-spec function group variation tables when emitted; TODO pending owner (design-spec function group)

---
