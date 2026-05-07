# Information Architecture and Navigation Playbook

A good site is not a set of isolated pages. It is a map of user intent. This playbook prevents the common AI failure mode where every page technically exists but users can only reach it by guessing the exact URL.

Use this before BUILD. The output is `sites/<name>/IA.md`. `bin/advance-phase.sh build` — **TODO pending owner** (scaffold function group) — blocks if `IA.md` is missing or still has `<TODO:>` markers.

## Core Rule

Every important destination must be reachable by at least **two logical routes**:

1. **A primary route** — main nav, shop grid, service list, category page, search result, or homepage CTA.
2. **A recovery route** — footer, related links, breadcrumb, site search, sitemap, "also popular," or contextual cross-link.

If a page has only one path in, it is fragile. If it has zero paths in, it is dead inventory.

## Required `IA.md` Sections

```markdown
# IA — [site]

## User Jobs

| Job | User Language | Best Landing Page | Primary Action |
|---|---|---|---|
| Find store hours | "are they open now?" | /contact or /hours | Call / directions |
| Compare products | "which one should I buy?" | /shop | Filter / sort / compare |

## Route Inventory

| Route | Purpose | Primary Route In | Secondary Route In | Owner | Status |
|---|---|---|---|---|---|
| / | orient + convert | direct/domain | logo from all pages | site | planned |
| /shop | product discovery | main nav | homepage category card | commerce | planned |
| /shop/[slug] | evaluate product | product grid | related products / search | commerce | planned |

## Navigation Model

### Desktop Nav
- Primary nav items, in order:
  1. ...
- Header CTA:
- Footer groups:

### Mobile Nav
- Always-visible items:
- Hamburger / drawer contents:
- Sticky bottom CTA:
- Search / filter entry point:

## Cross-Linking Rules

- Every product page links to: category, related products, contact/support, delivery/returns.
- Every service page links to: contact/booking, related services, service area, FAQ.
- Every article links to: relevant product/service, next best article, contact/lead capture.

## Empty-State Routes

| State | Message | Action |
|---|---|---|
| No products after filter | "No products match those filters." | Clear filters / contact |
| Search no results | "No match for '___'." | Suggestions / popular categories |

## Validation Evidence

- Click-path audit report:
- Manual mobile navigation screenshot set:
- Keyboard tab order notes:
```

## Storefront-Specific IA

Storefronts must support both **directed shopping** and **exploratory shopping**.

Directed shopping:
- Search by exact name
- Category browse
- Filter by availability, price, size, color, dietary/allergen constraints, service area, or appointment type
- Sort by relevance, newest, price, popularity, featured

Exploratory shopping:
- "Popular right now"
- "Staff picks" / "Owner favorites"
- Bundles / collections / occasions
- Related products
- Recently viewed
- Educational buying guides

If the store only has a flat grid and product pages, it is not a serious storefront.

## Navigation Audit Checklist

- [ ] Every route in `IA.md` is reachable from the homepage within 2 clicks.
- [ ] Every important route has a secondary route in.
- [ ] Every product/service page has breadcrumbs.
- [ ] The mobile header exposes either search, catalog/menu, or primary CTA without opening a mystery menu.
- [ ] Footer contains contact, legal, policies, and sitemap-like navigation.
- [ ] No route relies only on a carousel card or transient UI state for discovery.
- [ ] Search results and filter-empty states have useful recovery actions.
- [ ] Click-path audit passes against the running site.

## What to Avoid

- Unique hidden paths: a page reachable only from one buried card.
- Hamburger-only mobile nav with no visible primary CTA.
- Product categories named from the business's internal vocabulary rather than customer language.
- Overloaded nav: 12 top-level items because the owner wanted everything visible.
- No footer navigation because "the header has it."
