# Client Scenario Routing

Every site starts in one of four scenarios. Choosing the scenario prevents the agent from using a greenfield workflow for a migration, or a polished redesign workflow for a business with no brand.

`bin/scaffold-site.sh` — **TODO pending owner** (scaffold function group) — creates `BRIEF.md` with scenario fields. Fill them before advancing to DESIGN.

## The Four Scenarios

### Scenario A — Existing Site, Preserve and Improve

Client has a working site. The job is a rebuild or redesign.

Use:
- `playbooks/intake-existing-site.md` — **TODO pending owner** (intake function group)
- `playbooks/competitor-research.md` — **TODO pending owner** (discovery function group, PR #10)
- `playbooks/information-architecture.md`

Required artifacts:
- `migration/urls-raw.txt`
- `migration/feature-parity.md`
- `migration/redirects.csv`
- `migration/seo-audit.txt`
- `RESEARCH.md`
- `IA.md`

Non-negotiable: preserve working business functions unless removal is explicitly documented.

### Scenario B — Greenfield, No Site but Has Brand

Client has business name, logo, colors, maybe photos, but no site.

Use:
- `playbooks/intake-greenfield.md` — **TODO pending owner** (intake function group)
- `playbooks/industry-research.md` — **TODO pending owner** (discovery function group, PR #10)
- `playbooks/competitor-research.md` — **TODO pending owner** (discovery function group, PR #10)
- `playbooks/information-architecture.md`

Required artifacts:
- `RESEARCH.md`
- `IA.md`
- `DESIGN.md`
- brand asset inventory in `design/assets/`

### Scenario C — Greenfield, No Brand

Client has a business idea or operation but no identity.

Use:
- `playbooks/intake-greenfield.md` — **TODO pending owner** (intake function group)
- `playbooks/industry-research.md` — **TODO pending owner** (discovery function group, PR #10)
- `conventions/voice-and-tone.md` — **TODO pending owner** (conventions function group)
- `conventions/color-apca.md` — **TODO pending owner** (conventions function group)

Required artifacts:
- `RESEARCH.md`
- `BRIEF.md` with positioning
- `DESIGN.md` with brand direction, tokens, voice, imagery
- `design/assets/brand-board.md`

Non-negotiable: do not start UI until positioning and visual direction are chosen.

### Scenario D — Storefront / Catalog

Any site with products, menus, services, bookable offerings, packages, or shoppable inventory.

Use:
- `playbooks/storefront-small-business.md` — **TODO pending owner** (storefront function group)
- `playbooks/product-discovery.md`
- `playbooks/information-architecture.md`
- `schemas/seo-jsonld/product.json` or `local-business.json` — **TODO pending owner** (schemas function group)

Required artifacts:
- `PRODUCTS.md`
- `IA.md`
- schema source data for catalog items
- owner-update flow in `MAINTENANCE.md`

Non-negotiable: no flat grid masquerading as a storefront. Products must be findable, filterable/sortable when catalog size justifies it, and connected through related-item paths.

## Scenario Decision Table

| Client Condition | Scenario | First Playbook |
|---|---|---|
| Existing website with traffic | A | `intake-existing-site.md` |
| Existing website but abandoned/broken | A, but mark broken features separately | `intake-existing-site.md` |
| No website, clear brand | B | `intake-greenfield.md` |
| No website, no brand | C | `intake-greenfield.md` + brand-strategist |
| Products/services/menu/booking | Add D to A/B/C | `product-discovery.md` |
| Unknown industry | Add industry research | `industry-research.md` |

## What Agents Must Not Do

- Treat a migration as a blank canvas.
- Remove a working feature because it is annoying to rebuild.
- Invent branding without checking competitors and buyer expectations.
- Create a product grid without product attributes, filters, related items, and schema data.
- Start build before `RESEARCH.md` and `IA.md` are complete.
