# Product Discovery and Storefront Merchandising Playbook

This is the standard for sites that sell products, menus, services, packages, courses, appointments, or anything catalog-like. The workspace should not produce a "storefront" that is only a pretty product grid.

Output: `sites/<name>/PRODUCTS.md`. If `BRIEF.md` marks `Storefront/catalog: yes`, `bin/advance-phase.sh build` — **TODO pending owner** (scaffold function group) — requires `PRODUCTS.md` to exist and have no `<TODO:>` markers.

## The Product Model

Every product/service item needs enough structure to support filtering, sorting, SEO, accessibility, and owner updates.

```markdown
# PRODUCTS — [site]

## Catalog Type

- Type: physical products / services / menu / appointments / mixed
- Fulfillment: pickup / delivery / booking / quote request / external checkout
- Owner update flow: Sanity / MDX / external POS / manual

## Product Fields

| Field | Required | Example | Notes |
|---|---:|---|---|
| name | yes | "Birthday Cake — 8 inch" | Customer-facing name |
| slug | yes | birthday-cake-8-inch | Stable URL |
| category | yes | Cakes | Customer mental model |
| short_description | yes | "Serves 8-10…" | Grid/card text |
| long_description | yes | ... | PDP text |
| price | conditional | 48.00 | Use "from" pricing if variable |
| availability | yes | in-stock / seasonal / made-to-order | Filters + schema |
| images | yes | hero + gallery | Real photos preferred |
| attributes | conditional | size, color, allergens, duration | Filterable fields |
| related_items | yes | ... | Exploration |
| schema_type | yes | Product / Service / MenuItem | JSON-LD source |
```

## Filters

Required filter types depend on catalog type:

### Physical Products
- Category
- Price range
- Availability
- Brand / maker if multi-brand
- Size / color / material where relevant
- Shipping/pickup availability

### Food / Restaurant / Bakery
- Category/menu section
- Dietary tags: vegetarian, vegan, gluten-free, dairy-free, nut-free where real
- Spice level where relevant
- Availability: all-day, breakfast, lunch, dinner, seasonal
- Price range
- Pickup/delivery options

### Services
- Service category
- Residential/commercial if relevant
- Urgency: emergency / scheduled
- Location/service area
- Price model: fixed / estimate / consultation
- Duration where bookable

### Appointments / Classes
- Date/time
- Instructor/provider
- Location
- Duration
- Skill level
- Availability

## Sorting

At minimum:
- Featured / recommended
- Newest
- Price low → high (if prices exist)
- Price high → low (if prices exist)
- Popular / best-selling if real data exists

Never invent popularity. If no data, use "Featured" curated by owner.

## Product Page Requirements

Every product detail page includes:

- Product/service name as the only H1
- Real image gallery with alt text
- Price or "request quote" explanation
- Availability / seasonal status
- Primary action: add to cart, book, request quote, call
- Delivery/pickup/returns/cancellation info where relevant
- Related products/services
- Breadcrumbs
- JSON-LD (`Product`, `Service`, or appropriate schema)
- FAQ or care/details section if buyers commonly hesitate
- Trust signal near CTA (reviews, guarantee, licensing, ingredients, warranty)

## Discovery Patterns That Make Stores Feel Good

Use at least two:

- Staff picks / owner favorites
- "Best for…" collections (gifts, first-time buyers, events, emergencies)
- Bundles / packages
- Related items based on category/attributes
- Recently viewed
- "Customers also ask" / buying guide
- Seasonal collection
- Popular locally / most requested service

## Empty and Edge States

Every filter/search needs a recovery path:

- No filter results → clear filters + show popular categories
- Product unavailable → waitlist/notify + related alternatives
- Out of service area → explain boundary + contact fallback
- Quote-only pricing → explain why, show examples/ranges if honest
- No images yet → block launch or use a deliberately-designed placeholder, never a blank card

## Verification Checklist

- [ ] Catalog can be browsed without search.
- [ ] Catalog can be searched or filtered by buyer-relevant attributes.
- [ ] Sorting works and does not reset filters unexpectedly.
- [ ] Product detail pages link back to category and related items.
- [ ] Filter state is shareable/bookmarkable for catalogs with >20 items.
- [ ] Mobile filters are reachable, understandable, and dismissible.
- [ ] Empty results recover gracefully.
- [ ] Every product has JSON-LD source data.
- [ ] Owner can update product data through the selected content flow.

## What to Avoid

- One flat grid with no categories.
- Filters based on internal business terms buyers do not know.
- Fake scarcity ("Only 2 left!") without real inventory.
- Fake reviews, fake popularity, fake "best seller."
- Product cards whose only CTA is "Learn more" when the buyer intent is "buy/book/call."
