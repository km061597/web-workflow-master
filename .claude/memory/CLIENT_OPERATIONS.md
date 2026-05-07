---
name: client-operations
aliases: client-project-guide, migration, maintenance, cms-integration
description: Client project operations: site migration (audit → preserve → rebuild), ongoing maintenance workflow, and CMS integration paths (Decap vs Headless). Use after delivery or for existing sites.
type: project
---

# Client Operations

## Section 4: Client Migration

When client has an existing website that needs to be replaced while preserving all current functionality, SEO rankings, URLs, and content.

### Phase 1: Audit

Crawl the existing site comprehensively:

1. **Sitemap extraction**: Parse sitemap.xml or crawl all internal links
2. **Content inventory**: Every page, its URL, title, meta description, H1, word count, images
3. **Technical audit**: Run web-check (35 checks: DNS, SSL, headers, security, performance, tech stack)
4. **SEO snapshot**: Current meta tags, headings, structured data, page speed, mobile-friendliness
5. **Functional inventory**: Forms, integrations, ecommerce, auth, dynamic content

Tools: Firecrawl MCP for content extraction, surf CLI for screenshots, web-check for technical audit.

### Phase 2: Preserve

Map everything that must survive the migration:

1. **URL map**: Every old URL → new URL (maintain exact matches where possible, 301 redirects for changes)
2. **SEO preserve list**: All meta titles, descriptions, H1s, image alt text, structured data
3. **Form inventory**: Every form field, validation rules, submission endpoint
4. **Integration inventory**: Analytics, email, payment, CRM, scheduling
5. **Content migration plan**: What content copies, what improves, what's removed

Output: `MIGRATION_MAP.md` documenting every preservation item.

### Phase 3: Analyze

Evaluate what's working and what's broken:

1. **What works**: Fast pages, high-traffic content, converting CTAs, good SEO, functional features
2. **What's broken**: Slow pages, a11y violations, broken links, missing mobile support, confusing navigation
3. **What's missing**: Pages competitors have, expected features, accessibility, performance
4. **UX audit**: User journeys that dead-end, confusing navigation, inconsistent UI

Output: `AUDIT_FINDINGS.md` with prioritized fixes and improvements.

### Phase 4: Design

Apply design system on top of preserved structure:

1. Keep all URL paths and navigation structure (users know them, search engines rank them)
2. Redesign visual layer: colors, typography, spacing, components
3. Improve UX: add missing pages, fix dead-end journeys, add cross-linking
4. Apply design variation system — same structure, fresh skin
5. Generate new brand tokens from Impeccable/taste-skill

Output: `DESIGN_BRIEF.md` with before/after for each page.

### Phase 5: Build

Rebuild with preservation + improvement:

1. Scaffold project from `create-project.sh`
2. Build each page matching preserved URL structure
3. Re-implement all forms, integrations, and functionality
4. Carry forward SEO metadata and structured data
5. Add improvements identified in audit

### Phase 6: Validate

Side-by-side comparison before launch:

1. **URL check**: Every old URL returns 200 or 301 to correct new URL
2. **SEO parity**: Compare meta tags, headings, structured data — new must be ≥ old
3. **Content completeness**: All content from old site present in new
4. **Functionality check**: Every form submits, every integration works
5. **A11y improvement**: New site must have better accessibility scores than old
6. **Performance improvement**: New site must load faster than old
7. **Redirect plan**: Generate 301 redirects for any changed URLs

### Anti-Slop Rules

- Never remove content without client approval — it may serve a purpose you don't see
- Never change URL structure without explicit client approval — it affects SEO
- Never downgrade SEO — new site must match or exceed old site's meta quality
- Never break form functionality — test every form end-to-end before delivery
- Document what you changed and why — client needs to know what improved

---

## Section 5: Maintenance

After a client site is delivered and the client requests a change. Every change, regardless of size, follows this workflow to prevent regressions and half-fixes.

### Step 1: Triage

Categorize the change:

| Category       | Risk        | Example                                        |
| -------------- | ----------- | ---------------------------------------------- |
| Content update | Low         | Change text, swap image, update price          |
| Style change   | Low-Medium  | Change color, adjust spacing, update font size |
| Feature add    | Medium-High | New page, new section, new form                |
| Bug fix        | Variable    | Fix broken link, fix validation, fix layout    |

### Step 2: Scope

Identify affected files and risk surface:

- What files need to change? (list every file)
- What else could break? (components that import changed files, pages that use changed components)
- What tests need updating? (existing tests that cover changed behavior)
- What quality gates apply? (all gates for feature adds, minimal gates for content updates)

### Step 3: Branch

Work in an isolated branch off the client project:

```
git checkout -b update/<client>/<brief-description>
```

Never work directly on the client's main branch for any change.

### Step 4: Implement

Make the change, following all applicable rules:

- Content update: change the content, verify rendering
- Style change: change the token or class, verify all instances
- Feature add: write failing test first (Iron Law #2), build, make test pass
- Bug fix: write test that reproduces the bug first (Iron Law #1), fix, verify test passes

### Step 5: Verify

Run relevant quality gates based on change type:

| Change Type    | Required Gates                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------- |
| Content update | Build, TypeScript, Prettier                                                                         |
| Style change   | Build, TypeScript, Prettier, Visual QA (all viewports)                                              |
| Feature add    | ALL gates: Build, Tests, TypeScript, Prettier, ESLint, A11y, Visual QA, Storybook, Click-path audit |
| Bug fix        | Build, Tests, TypeScript, A11y (if UI related), Click-path audit                                    |

### Step 6: Deploy

Build and deploy the updated site:

1. `npm run build` — must pass
2. Deploy to client host (Vercel, Netlify, or static host)
3. Verify deployment: check key pages load, forms work, links resolve

### Step 7: Log

Update client project documentation:

1. Add entry to client `CHANGELOG.md` with: date, change description, category, files changed
2. Update `COMPONENT_AND_ANIMATION_REGISTRY.md` if components were added/modified
3. Update `PROJECT_REGISTRY.md` with new deploy date

### Anti-Regression Rules

- Never skip tests because "it's a small change" — small changes cause big regressions
- Never deploy without building — unbuilt changes are invisible bugs
- Never work on main — isolation prevents accidental deployment of partial work
- Never skip the changelog — undocumented changes are future mysteries
- If a gate fails, fix it. No exceptions, no "it's just a warning"

---

## Section 6: CMS Integration

Client site is built and delivered. Client needs to edit content (text, images, products, hours) without touching code. The site is a static export — no server, no database.

### Path 1: Decap CMS (Git-based, recommended)

**Best for**: Clients who need to edit text, pages, and blog posts.

**How it works**: Decap CMS is a single-page admin UI that commits directly to the site's git repo. On push, the hosting platform rebuilds the static site.

**Setup**:

1. Add `public/admin/index.html` with Decap CMS script
2. Add `public/admin/config.yml` defining collections (pages, products, posts)
3. Configure git gateway or GitHub OAuth for authentication
4. Set up auto-rebuild webhook on Netlify/Vercel

**Client experience**: Visit `/admin/`, log in, edit content in a WYSIWYG editor, publish. Changes go live in ~60 seconds.

**Pros**: Free, no server, version history via git.
**Cons**: Requires git setup, ~60s rebuild delay.

### Path 2: Headless CMS (Sanity/Contentful)

**Best for**: Complex content, product catalogs, multi-language.

**How it works**: Content lives in a hosted CMS. The site fetches at build time (ISR not available for static export, so use webhook rebuilds).

**Setup**:

1. Create Sanity/Contentful project
2. Define content schemas
3. Install SDK client in site
4. Use `generateStaticParams` to build pages from CMS data
5. Set up webhook to trigger rebuild on content change

**Pros**: Professional editing experience, rich media management, API access.
**Cons**: Monthly cost, rebuild delay, vendor lock-in.

### Path 3: Google Sheets (Ultra-simple)

**Best for**: Clients who need to update a few values: hours, prices, team members.

**How it works**: Publish a Google Sheet as CSV. The build process fetches it and generates content.

**Setup**:

1. Create Google Sheet with structured data
2. Publish to web as CSV
3. Add fetch step in build script to pull CSV
4. Parse CSV into content objects
5. Set up scheduled rebuild (daily via cron + webhook)

**Client experience**: Edit Google Sheet → changes reflect on next scheduled rebuild.

**Pros**: Zero cost, familiar tool, no new login.
**Cons**: Limited to tabular data, manual rebuild trigger, no media management.

### Recommendation

| Client Type                     | Best Path             |
| ------------------------------- | --------------------- |
| Simple site, text updates       | Path 1: Decap CMS     |
| Ecommerce, product catalog      | Path 2: Sanity        |
| Minimal updates (hours, prices) | Path 3: Google Sheets |