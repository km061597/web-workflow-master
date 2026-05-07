# Decision Log: brand-assets.md

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| brand-assets.md | gsd-design | 6,429B | `inputs/gsd-design/playbooks/brand-assets.md` |

## Kept From

### gsd-design / brand-assets.md (primary and only source)
- **Asset table:** Complete table of 11 asset types with sizes, formats, and output paths
- **One-time install:** `sharp`, `pwa-asset-generator`, `@vercel/og`, `librsvg`
- **SVG-to-all pipeline:** `npx pwa-asset-generator` with full flag list
- **Static OG card generation:** `scripts/generate-og.mjs` — **TODO pending owner** (build function group) — contract defined, implementation not yet emitted
- **Dynamic OG cards:** Next.js `@vercel/og` edge function example with `ImageResponse`
- **Required `<head>` snippets:** Complete meta tag block (favicon, manifest, theme-color, iOS, Safari pinned tab, OG, Twitter)
- **Validation checklist:** 10-item pre-ship checklist covering browsers, iOS, Android, OG previews, Twitter, Slack, theme color, Safari pinned tab
- **Maskable icons explainer:** Android adaptive icon safe zone (80%), test at maskable.app, fallback dual-icon manifest example
- **Splash screens:** iOS PWA requirement, 8 device families, media query pattern for `apple-touch-startup-image`
- **Tooling alternatives table:** 5 tools (pwa-asset-generator, realfavicongenerator, sharp-cli, @vercel/og, @cloudflare/satori) with use/cost

## Merged From

*No merges — this artifact has a single source with no overlaps in the design-spec function group.*

### Vocabulary normalization
- Title normalized from "Brand asset pipeline" to "Brand Asset Pipeline" (title case)
- Section headings normalized to sentence-case consistency
- File placed in `playbooks/` per vocabulary-map.md canonical (`playbook = procedural step-by-step`)

## Rejected

*Nothing rejected — single source with no contradictions.*

### Minor style changes (not rejections)
- **Title case:** "What Gets Generated" vs. "What gets generated" — normalized to title case for heading consistency
- No content was removed or substantively changed.

## Tradeoffs

1. **Next.js coupling in dynamic OG:** The dynamic OG card example uses Next.js `app/api/og/route.tsx` with `@vercel/og`. This is framework-specific. The static OG generation (`scripts/generate-og.mjs`) is framework-agnostic. Kept both because Next.js is the primary scaffold stack, but the static approach works for Astro/Vite too.

2. **No automatic OG template:** The playbook references `brand/og-template.html` — **TODO pending owner** (scaffold function group) — and `scripts/generate-og.mjs` — **TODO pending owner** (build function group) — but neither file is included in this PR. Templates are project-specific; the playbook defines the contract and projects implement the template when the scaffold function group emits the backing files.

3. **PWA scope vs. web-only:** The playbook assumes PWA-level asset generation (splash screens, manifest, maskable icons). For simple marketing sites that don't need PWA, users can skip the iOS/Android-specific sections. The validation checklist lets them opt out by unchecking irrelevant items.

## Open Questions

1. **Framework-agnostic dynamic OG:** Should there be an Astro/Vite equivalent of the `@vercel/og` edge function example? Satori works anywhere but the code pattern differs by framework.

2. **OG template standardization:** Should the master repo include a starter `brand/og-template.html` that works across projects, or is this too brand-specific to canonicalize?

3. **Asset generation in CI:** Should the playbook mention running `pwa-asset-generator` in CI on logo changes, or is this always a manual one-time step?

4. **SVG requirements:** The playbook says "single color preferred for maskability" but many brands have multi-color logos. Should there be guidance on simplifying multi-color logos for the maskable variant?

5. **Missing: Web App Manifest fields:** The manifest snippet only shows icons. Should it include `short_name`, `start_url`, `display`, `background_color` guidance?
