# Merge Decision Log: product-discovery.md

## Sources

| File | Version | sha256 (source) | sha256 (emitted) |
|---|---|---|---|
| `playbooks/product-discovery.md` | gsd-design | `ad53f527a9b06afe39a2936b3e4c67c7b74af04f0665f1dd60e83fb91770e882` | `da1c8a882b345409a917b3c28ae67d37cc60773d4553376ad0b0683892cc23c0` |

Cross-checked for equivalents in:
- desigjn-toolkit — `refs/impeccable/PRODUCT.md` is a product specification for a developer-tool site, not a playbook for catalog discovery
- open-design — no product-discovery playbook found
- design-self-create — no product-discovery playbook found
- WEBSITES — `prompts/03-discovery-spec.md` includes "Product and Price Context" but as a prompt output section, not a standalone playbook

## Kept From

**gsd-design (100%)** — The gsd-design version is the sole source. All content preserved:

- Product model schema (11 fields with required/conditional status)
- Catalog-type specific filter requirements (physical products, food/restaurant, services, appointments/classes)
- Sorting rules (5 options + "never invent popularity" rule)
- Product page requirements (12 elements)
- Discovery patterns (8 options, "use at least two" rule)
- Empty and edge states (5 recovery paths)
- Verification checklist (9 items)
- What to avoid list (5 anti-patterns)

## Merged From

Nothing merged — no other version contributed an equivalent artifact. Minor editorial canonicalization applied:

- Title-cased headings for consistency (`## The Product Model`, `## Product Page Requirements`, `## Discovery Patterns That Make Stores Feel Good`, `## Empty and Edge States`, `## Verification Checklist`, `## What to Avoid`)
- No semantic changes

Enrichment candidates evaluated but not merged:
- **desigjn-toolkit `PRODUCT.md` brand personality section** — Describes "expert, decisive, editorial" voice. This is brand-strategy content, not product discovery. Not applicable to the generic catalog playbook.
- **WEBSITES jewelry add-on questions** — Vertical-specific intake questions. Belongs in `industry-research.md` or a vertical-specific intake doc, not the generic product-discovery playbook.

## Rejected

**desigjn-toolkit `refs/impeccable/PRODUCT.md`** — A product brief for a specific product (Impeccable design skill). It covers brand personality, anti-references, and design principles. None of this is procedural catalog-discovery guidance. Entirely different artifact type.

**WEBSITES `03-discovery-spec.md` Section 5: "Product and Price Context"** — Covers product/service taxonomy, price bands, and quote-required rationale. This is a condensed output format for a specific client's spec. The gsd-design playbook is the comprehensive source standard that produces such sections. Keeping both: the playbook as the canonical process, the spec format as an intake output template.

**WEBSITES `reference-local-business-website-playbook.pdf`** — Not read in full (PDF). Based on filename, appears to be a reference guide for local-business sites, not a procedural playbook. If it contains catalog guidance, it would be vertical-specific and thus belongs in the industry-kit function group. **Cross-check caveat: this PDF was not inspected; if it contains catalog guidance, it should be evaluated when the industry-kit function group is synthesized.**

## Tradeoffs

1. **Filter granularity: keep all catalog types or abstract?**
   - *Decision:* Kept all 4 catalog-type filter lists (physical products, food/restaurant, services, appointments/classes).
   - *Rationale:* The specificity prevents AI from generating generic e-commerce filters for a bakery or a plumbing service. Abstraction would lose the vertical nuance.

2. **"Never invent popularity" rule**
   - *Decision:* Preserved verbatim.
   - *Rationale:* This is a critical anti-AI-slop guardrail. No other version had an equivalent rule; the gsd-design version is the only one that explicitly bans fabricated social proof.

3. **Output path: `sites/<name>/PRODUCTS.md`**
   - *Decision:* Kept as-is.
   - *Rationale:* Same path-consistency rationale as `information-architecture.md`. Changing per-client paths requires a repo-wide convention decision.

4. **Schema references**
   - *Decision:* Kept references to `schemas/seo-jsonld/product.json` and `local-business.json` as used in scenario-routing.md.
   - *Rationale:* These are cross-function dependencies. The schemas function group will synthesize the canonical versions.

## Open Questions

1. **Should the playbook include POS/integration guidance?** Currently mentions "Sanity / MDX / external POS / manual" as owner update flows but does not explain how to choose. A POS-integration guide may be needed in the build or maintenance function groups.
2. **Digital products / subscriptions missing:** The catalog types cover physical, food, services, and appointments. Digital products (downloads, SaaS, subscriptions) are not explicitly addressed. Should a fifth catalog type be added?
3. **Localization / multi-currency:** No guidance for catalogs serving multiple regions or currencies. Internationalization may need a separate playbook or an add-on section here.
4. **Integration with `product-discovery.md` and `storefront-small-business.md`:** The scenario-routing playbook lists both. What's the boundary? `product-discovery.md` covers catalog structure; `storefront-small-business.md` likely covers the storefront build. Clarify relationship once `storefront-small-business.md` is synthesized.
5. **Dietary tag specificity:** The food filter list includes "gluten-free, dairy-free, nut-free." Should this be expanded (e.g., kosher, halal, low-FODMAP) or kept minimal to avoid over-specifying?
