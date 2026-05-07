# Synthesis Decision Log: scripts/discovery.mjs

## Sources

| Source File | Version | Description |
|---|---|---|
| `scripts/lib/research-orchestrator.mjs` | WEBSITES | Business research orchestrator: Google Maps, geocoding, website audit, review enrichment |
| `tools/competitor-research.js` | design-self-create | Technical competitor analyzer: stack detection, design patterns, structure analysis |

## Kept From

### `scripts/lib/research-orchestrator.mjs` (WEBSITES)
- **Modular ESM architecture** with named exports — better for programmatic reuse than the inline script approach
- **Cache system** (`loadCache`/`saveCache`) with TTL support — critical for avoiding repeated API calls and rate limits
- **Geocoding via Nominatim** — self-contained, no API key required
- **Business research data model** (`research` object with name, address, phone, website, rating, reviews, hours, coordinates, gaps, sources) — well-structured for downstream consumption
- **`withHuman` flag** for optional enrichment via surf-based scrapers — keeps the core script headless while allowing human-in-the-loop when needed
- **`saveResearchArtifact()`** with directory creation — automates research artifact persistence
- **Logging convention** (`logCall` with category/target/result) — consistent with other WEBSITES tooling

### `tools/competitor-research.js` (design-self-create)
- **`curl`-based fetching** via `execSync` — simple, self-contained, no heavy dependencies
- **Comprehensive stack detection** (WordPress, Shopify, Squarespace, Wix, Webflow, Next.js, Nuxt, React, Vue, Astro, Svelte) — covers all major platforms
- **CSS framework detection** (Tailwind, Bootstrap) with regex heuristics
- **Color extraction** (hex + OKLCH) — useful for palette analysis
- **Font extraction** (Google Fonts + declared font-family)
- **Typography metrics** (h1 sizes, body size)
- **Page structure detection** (hero, testimonials, pricing, blog, team, FAQ, CTA)
- **Performance hints** (image count, script count, lazy loading, WebP/AVIF)
- **Pattern analysis** (`findCommonPatterns`, `findOpportunities`) — generates actionable differentiation insights
- **JSON report generation** with timestamp and summary

## Merged From

### Unified CLI interface
- Combined both scripts' CLIs into a single entry point with two modes:
  - `--research "Business Name" --city "City" --slug client-slug` — business research mode
  - `--analyze https://competitor.com` — competitor analysis mode
  - Both flags can be combined for a single run
- Added `--from-file` for batch competitor analysis (from design-self-create)
- Added `--with-human` flag for optional enrichment (from WEBSITES)

### Unified report output
- Stack analysis reports go to `clients/<slug>/research/reports/` (canonical per vocab map)
- Business research artifacts go to `clients/<slug>/research/business-research.json`
- Both use the same directory structure, making it easy for the playbook to reference

### Cache system unification
- The WEBSITES cache system is now self-contained (no dependency on sibling `api-utils.mjs`)
- Cache directory: `.cache/discovery/` in the project root
- Both business research and competitor analysis use the same cache infrastructure

### Optional dependency pattern
- Google Maps browser scraper, website auditor, Yelp surf, and GMaps surf are all **optional** imports
- The script attempts to load them dynamically and gracefully skips if modules are absent
- This makes the core script fully self-contained while allowing teams to plug in heavy browser automation when needed

### Data model extensions
- Added `hasTeam`, `hasFAQ`, `hasCTA` to structure detection (beyond the original 4)
- Added `hasLazyLoading`, `hasWebp`, `hasAvif` to performance metrics
- Added `Svelte` to framework detection

## Rejected

### From `scripts/lib/research-orchestrator.mjs`
- **Hard dependency on sibling modules** (`./api-utils.mjs`, `./google-maps-browser.mjs`, etc.) — replaced with optional dynamic imports. The original script would fail entirely without the WEBSITES-specific module structure. The canonical version must be deployable standalone.
- **`prospects/<slug>/` output directory** — replaced with canonical `clients/<slug>/` per vocabulary-map.md
- **Synchronous `writeFileSync` for `saveResearchArtifact`** — replaced with async `writeFile` for consistency with the rest of the script

### From `tools/competitor-research.js`
- **`node:fs/promises` mixed with `node:fs` sync APIs** — normalized to async throughout (with `existsSync` retained where needed for directory checks)
- **Report saved to `research/` (relative to script)** — normalized to `clients/<slug>/research/reports/` for consistency with business research artifacts
- **`process.argv` parsing inline in `main()`** — extracted to a small `getFlag` helper for readability
- **No cache system** — added the WEBSITES cache system to avoid repeated fetches during iterative analysis
- **No export of internal functions** — added named exports for all functions to support programmatic use
- **No geocoding or business research** — merged in from WEBSITES

### Shared rejections
- **No TypeScript** — both source scripts are plain JS/ESM. Kept as ESM `.mjs` for maximum compatibility across the canonical scaffold (which supports Astro, Next.js, Vite, etc.)
- **No test coverage** — neither source had tests. Noted as an open question.

## Tradeoffs

1. **Self-contained vs. modular dependencies**: Chose to make the script fully self-contained with optional heavy dependencies. Tradeoff: the script is ~350 lines instead of ~150 with clear separation. But it can be dropped into any project without the WEBSITES-specific module graph.

2. **curl vs. fetch**: Kept `curl` via `execSync` for competitor HTML fetching (from design-self-create) rather than using `fetch()` or Playwright. Tradeoff: `curl` is fast and bypasses most anti-bot, but it only gets static HTML (no JS-rendered content). For JS-heavy sites, users are directed to use `scrapling` or `firecrawl-cli` per the playbook.

3. **One script vs. two scripts**: Merged into a single `discovery.mjs` rather than keeping separate `research-orchestrator.mjs` and `competitor-research.js`. Tradeoff: the unified script has two distinct modes that share no runtime state. But having one canonical script reduces cognitive load and aligns with the unified playbook.

4. **Cache directory location**: Chose `.cache/discovery/` at project root. Some teams may prefer `node_modules/.cache/` or `/tmp/`. Tradeoff: `.cache/` is gitignore-friendly and visible, but may clutter the workspace. Added to the decision log for future review.

5. **Framework detection heuristics**: The regex-based detection (e.g., `html.includes('_next')`) is fast but brittle. A more robust approach would use AST parsing or HTTP header inspection. Tradeoff: regex is good enough for 90% of cases and requires zero dependencies. Documented as a known limitation.

## Open Questions

1. **Google Maps scraper module**: The `searchGoogleMaps` function attempts to load `scripts/lib/google-maps-browser.mjs`, which is not part of the canonical discovery artifact. Should this module be synthesized in a future phase, or should the discovery script include a simpler HTTP-based fallback (e.g., Google Places API)?

2. **Website auditor module**: The `auditWebsite` function attempts to load `scripts/lib/website-auditor.mjs`. This is a separate quality/testing artifact. Should discovery depend on it, or should it be an independent pipeline stage?

3. **Playwright dependency**: The human-in-the-loop enrichment (`--with-human`) requires Playwright-based scrapers (`yelp-surf.mjs`, `gmaps-surf.mjs`). Playwright is a heavy dependency (~50MB). Should the canonical script avoid Playwright entirely and rely only on `curl`/`fetch`, leaving browser automation to external tools (`surf`, `scrapling`)?

4. **Rate limiting**: Neither source script implements rate limiting for `curl` fetches or Nominatim API calls. In batch analysis mode (`--from-file` with many URLs), this could trigger blocks. Should exponential backoff be added?

5. **Test coverage**: Neither source script had tests. Given the regex heuristics and external API dependencies, should a test suite be added with mock HTML fixtures and stubbed `fetch`/`curl`?

6. **TypeScript conversion**: The canonical scaffold includes TypeScript variants. Should a `.mts` / `.ts` version of this script be provided for TypeScript projects?
