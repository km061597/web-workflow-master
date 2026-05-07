# Decision Log: astro-canonical

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| design-self-create/verify-full | design-self-create | 1.4MB | `inputs/design-self-create/verify-full/` |
| design-self-create/verify-swiss | design-self-create | 1.3MB | `inputs/design-self-create/verify-swiss/` |
| design-self-create/verify-dark | design-self-create | 1.3MB | `inputs/design-self-create/verify-dark/` |
| design-self-create/verify-organic | design-self-create | 1.3MB | `inputs/design-self-create/verify-organic/` |
| design-self-create/distant-matter | design-self-create | 3.7MB | `inputs/design-self-create/distant-matter/` |
| design-self-create/templates/landing-page | design-self-create | 352K | `inputs/design-self-create/templates/landing-page/` |
| open-design/apps/landing-page | open-design | 2.3MB | `inputs/open-design/open-design/apps/landing-page/` |

## Kept From

### design-self-create/verify-full (primary base)
- **Stack:** Astro 6.2.2, Tailwind CSS 4.2.4, GSAP 3.15.0, @gsap/react 2.1.2
- **Tailwind integration:** `@tailwindcss/vite` plugin in `astro.config.mjs`
- **Testing:** Playwright 1.59.1 with multi-browser config (chromium-desktop, chromium-mobile, chromium-tablet, firefox, webkit)
- **Quality scripts:** `audit`, `validate`, `check-links`, `quality` composite script
- **Linting:** ESLint 9.39.4, Prettier 3.8.3, Stylelint 17.10.0, Husky 9.1.7, lint-staged
- **TypeScript:** 5.8.0 strict
- **A11y testing:** `@axe-core/playwright` 4.11.3, Lighthouse 13.2.0
- **Lighthouserc.json** with thresholds
- **Netlify.toml + vercel.json** deployment configs

### design-self-create/distant-matter
- **Content patterns:** Real production site structure (sections, components)
- **Design system integration:** @design-self-create/design-system workspace pattern
- **Larger asset pipeline:** image optimization, font subsetting patterns

### open-design/apps/landing-page
- **Astro 5.15.4** (older version — upgraded to 6.2.2 in synthesis)
- **React 18.3.1** integration pattern (Astro islands)
- **Deployment patterns:** Vercel adapter

## Merged From

### Package.json synthesis
- Base from verify-full (most complete tooling)
- Unified Astro to ^6.2.2 (latest stable)
- Unified Tailwind to ^4.2.4
- Kept GSAP + @gsap/react for animation
- Kept Playwright, ESLint, Prettier, Stylelint, Husky, lint-staged
- Added `@fontsource-variable/inter` as default font
- Kept Vite 7.3.2 as peer (Astro uses Vite under the hood)

### astro.config.mjs
- Simple `defineConfig` with `@tailwindcss/vite` plugin
- No adapter included (static output by default)
- Documented how to add `@astrojs/vercel` or `@astrojs/netlify` adapters

### playwright.config.ts
- Multi-browser from verify-full (desktop + mobile + tablet + firefox + webkit)
- Base URL localhost:4321 (Astro preview port)
- WebServer command: `npm run preview`
- A11y testMatch for mobile/tablet/firefox/webkit

### tsconfig.json
- Extends `astro/tsconfigs/strict`
- `jsx: "react-jsx"` for React islands
- Path alias `@/*` → `src/*`

### eslint.config.mjs
- Full custom config from verify-full (not Astro-specific — general TS/ESLint)
- @typescript-eslint, jsx-a11y, import plugins
- Strict rules: no-explicit-any, no-unused-vars, import/order

## Rejected

### open-design/apps/landing-page — Astro 5 + React 18
- **Reason:** Older versions. Astro 6.2.2 and React 19 are the stack base. The React island pattern is kept but upgraded to React 19.
- **Impact:** Any React components used as Astro islands must be React 19 compatible.

### design-self-create — workspace/monorepo structure
- **Reason:** The scaffold is a standalone project, not a workspace. The `packages/design-system/` pattern is documented but not enforced.

### Next.js-specific tooling
- **Reason:** Different framework. Next.js patterns (App Router, Image component, etc.) don't apply to Astro.

### Vite-specific SPA patterns
- **Reason:** Astro is a static site generator with islands architecture, not a Vite SPA. Different mental model.

### gsd-design distant-matter — @once-ui-system/core
- **Reason:** Not an Astro project. No overlap.

## Tradeoffs

1. **Static output default:** Astro builds to static HTML by default. For SSR (API routes, auth), users need to add an adapter (`@astrojs/vercel`, `@astrojs/netlify`, `@astrojs/node`). Documented in README.

2. **GSAP included by default:** GSAP is the animation library of choice across all design-self-create sources. Included as default but documented as removable.

3. **React islands optional:** `jsx: "react-jsx"` is configured but no React components are pre-installed. Users add React components as islands when needed.

4. **No shadcn/ui:** shadcn/ui is React-only and doesn't work in Astro `.astro` files. For React islands, users can install shadcn separately. The scaffold uses plain Tailwind + custom components.

5. **Multi-deployment configs:** Both `netlify.toml` and `vercel.json` are included. Users delete the one they don't need.

6. **Husky + lint-staged:** Pre-commit hooks are included (design-self-create standard). Can be disabled by removing `prepare: "husky"` from package.json.

## Open Questions

1. **CMS integration:** Astro has first-class Content Collections. Should a Content Collection example be included?
2. **MDX:** Should `@astrojs/mdx` be pre-installed for blog/markdown content?
3. **i18n:** Should `@astrojs/sitemap` + `astro-i18next` be included for multi-language?
4. **Image optimization:** Astro has `@astrojs/image` (now built-in). Should image pipeline examples be included?
5. **View Transitions:** Astro 3+ has built-in View Transitions. Should an example be included?
