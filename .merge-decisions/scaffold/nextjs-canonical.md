# Decision Log: nextjs-canonical

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| desigjn-toolkit/site | v0.1.1 | 10MB | `inputs/desigjn toolkit/site/` |
| desigjn-toolkit/EXTRACT/website | v0.1.1 | 341KB | `inputs/desigjn toolkit/EXTRACT/website/` |
| metzger-website-design | WEBSITES | 1.8MB | `inputs/WEBSITES/templates/metzger-website-design/` |
| local-business-template | WEBSITES | 114KB | `inputs/WEBSITES/templates/local-business-template/` |
| gsd-design/sites/distant-matter | gsd-design | 29MB | `inputs/gsd-design/sites/distant-matter/` |
| designer-level-website-builder | WEBSITES | 1.8MB | `inputs/WEBSITES/specs/designer-level-website-builder/` |
| designer-level-website-builder-v2 | WEBSITES | 2.6MB | `inputs/WEBSITES/specs/designer-level-website-builder-v2/` |
| open-design/apps/web | open-design | 2.3MB | `inputs/open-design/open-design/apps/web/` |

## Kept From

### desigjn-toolkit/site (primary base)
- **Stack foundation:** Next.js 16.2.4, React 19.2.4, React DOM 19.2.3, TypeScript 5.8.2
- **Tailwind 4:** `@tailwindcss/postcss` v4, no legacy tailwind.config.js needed
- **shadcn/ui:** components.json with `base-nova` style, `rsc: true`, `tsx: true`, CSS variables, `iconLibrary: lucide`
- **Dev tooling:** ESLint 9.25, Prettier 3.6, Storybook 9.3, Vitest 3.2 with browser playwright, PostCSS, Autoprefixer
- **Component library:** Radix UI suite (dialog, dropdown, tooltip, slot, select, tabs, navigation-menu, checkbox, popover, accordion, slider, switch, scroll-area, hover-card, aspect-ratio, label, separator, progress, radio-group, toggle, toggle-group, menubar, context-menu, collapsible, alert-dialog)
- **Animation:** Motion 12.10, GSAP 3.13
- **State/form:** Zod 3.25, React Hook Form 7.56
- **UI primitives:** Lucide React 0.509, Embla Carousel 8.6, Sonner 2.0, Vaul 1.1, Recharts 2.15
- **AI integration:** AI SDK (react 2.0, ui 1.12), OpenAI 4.98, Firecrawl 1.27
- **Path aliases:** `@/*` → `./src/*`
- **next.config.ts:** `output: "export"`, `distDir: "dist"`, `images.unoptimized: true`, `trailingSlash: true`, turbopack root
- **tsconfig.json:** Strict mode, `noUncheckedIndexedAccess: true`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`
- **vitest.config.ts:** Unit tests (jsdom) + Storybook browser tests (playwright)

### metzger-website-design / local-business-template
- **Business deps:** Resend 6.12.2 (email), @hookform/resolvers 5.2.2, @vercel/analytics 2.0.1, @vercel/speed-insights 2.0.0
- **Security headers:** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy in next.config.ts
- **Image optimization:** `formats: ["image/avif", "image/webp"]`, `deviceSizes` array
- **Verify scripts:** local-business setup and route/a11y checks were folded into the emitted `scripts/verify-setup.mjs`, `scripts/verify-viewports.mjs`, and `scripts/verify-a11y.mjs` files.

### gsd-design/sites/distant-matter
- **Quality tooling:** Lighthouse CI config (lighthouserc.cjs) with mobile-first thresholds
- **Bundle budgets:** Script 500KB, stylesheet 70KB, image 500KB, font 100KB, total 1.5MB
- **CWV gates:** LCP 2500ms, CLS 0.1, TBT 200ms, performance 0.9, accessibility 0.95
- **Accessibility audits:** pa11y-ci, color-contrast, target-size, aria-required-attr hard gates
- **Stylelint:** stylelint-config-standard + declaration-strict-value
- **Size limiting:** @size-limit/preset-app
- **Biome:** modern formatter alternative to Prettier (noted as option)

### designer-level-website-builder / v2
- **Viewport verification:** `scripts/verify-viewports.mjs` — responsive breakpoint testing
- **A11y verification:** `scripts/verify-a11y.mjs` — automated accessibility scan
- **Typecheck script:** `tsc -p tsconfig.typecheck.json --noEmit`

### open-design/apps/web
- **Workspace pattern:** PNPM workspace with shared packages (not included — kept as reference)
- **AI SDK integration pattern:** `@anthropic-ai/sdk`, `@ai-sdk/react` for AI features

## Merged From

### Package.json synthesis
- Merged all dependency lists with deduplication
- Kept highest versions where conflicts existed (Next.js 16.2.4 everywhere)
- Unified React to ^19.2.4 (was 19.2.0-19.2.4 range)
- Unified TypeScript to ^5.8.2
- Added business deps (Resend, Vercel analytics/speed-insights) as optional groups
- Added quality deps (Lighthouse CI, pa11y-ci, stylelint, size-limit) as dev deps
- Added verification scripts to `scripts/` field

### next.config.ts synthesis
- Export mode from desigjn-toolkit (static site output)
- Image formats + deviceSizes from metzger-website-design
- Security headers from metzger-website-design (CSP, X-Frame, etc.)
- Turbopack root from desigjn-toolkit
- trailingSlash: true from desigjn-toolkit

### tsconfig.json synthesis
- Strict mode + noUncheckedIndexedAccess from desigjn-toolkit (most strict)
- Bundler module resolution from desigjn-toolkit
- Excludes test/storybook files from desigjn-toolkit (clean build)
- Paths alias `@/*` → `./src/*` (universal)

### Testing stack synthesis
- Vitest + jsdom for unit tests (desigjn-toolkit)
- Storybook + browser playwright for component tests (desigjn-toolkit)
- Playwright for E2E (WEBSITES + gsd-design)
- Lighthouse CI for performance auditing (gsd-design)
- pa11y-ci for accessibility (gsd-design)
- verify-viewports.mjs + verify-a11y.mjs from designer-level-website-builder

## Rejected

### gsd-design/sites/distant-matter — @once-ui-system/core
- **Reason:** Stack base is desigjn-toolkit (shadcn/ui + Tailwind 4). @once-ui-system/core is a proprietary design system that contradicts the canonical stack. The quality tooling was kept, but the UI framework was rejected.
- **Impact:** distant-matter's Sass, MDX, OGL rendering, and custom component system are not merged. Only its quality/audit patterns are adopted.

### gsd-design/sites/distant-matter — Biome
- **Reason:** desigjn-toolkit already has ESLint 9 + Prettier. Biome is faster but the ecosystem (Next.js ESLint config, Storybook ESLint plugin) is tied to ESLint. Biome noted as optional alternative in README.

### open-design/apps/web — workspace/monorepo structure
- **Reason:** This is a scaffold, not a monorepo template. The workspace deps (@open-design/*) are application-specific. The AI SDK integration pattern is documented but not enforced as default deps.

### WEBSITES/kimi builds/kimi/app 2/ — Framer Motion
- **Reason:** desigjn-toolkit already uses Motion 12.10 (the modern Framer Motion successor). No need to duplicate.

### WEBSITES/kimi builds/kimi/app/ — Tailwind 3.4
- **Reason:** Stack base mandates Tailwind 4. Tailwind 3 patterns rejected in favor of Tailwind 4 CSS-first configuration.

### WEBSITES/kimi builds/kimi/4Kimi_Agent_Next.js 14 Multi-Page Site/app/ — Next.js 14
- **Reason:** Stack base is Next.js 16. Next.js 14 is two major versions behind and uses deprecated patterns.

### design-self-create — Astro sites
- **Reason:** Different framework. These belong in the astro-canonical artifact, not merged into the Next.js scaffold.

### gsd-design/.claude/skills/impeccable/ — skill directory
- **Reason:** This is a Claude skill/tool, not a scaffold. Framework fixtures are noted in `_excluded_test_fixtures.md` and are not emitted as a standalone scaffold artifact in this PR.

### gsd-design/templates/* (magic-portfolio, ai-website-cloner, open-lovable)
- **Reason:** Not extracted in inputs. Referenced in JSON but no files available for synthesis.

## Tradeoffs

1. **Static export vs SSR:** Chose `output: "export"` (desigjn-toolkit) over SSR (metzger). Rationale: Most projects in this function group are static sites. SSR can be enabled by removing `output: "export"` and adding a server runtime.

2. **Vercel Analytics optional:** Included `@vercel/analytics` and `@vercel/speed-insights` as deps but gated behind env check in layout.tsx. Not everyone deploys to Vercel.

3. **AI SDK deps optional:** Included `ai`, `@ai-sdk/react`, `openai` as deps but wrapped in feature flags. Most sites don't need AI features out of the box.

4. **Quality tooling heavy:** The devDependency list is substantial (Lighthouse CI, pa11y-ci, stylelint, size-limit, Storybook, Vitest, Playwright). Tradeoff: longer initial `npm install` vs. having all gates pre-wired.

5. **shadcn components not pre-installed:** The scaffold includes `components.json` and shadcn registry config, but doesn't pre-install all components. Rationale: keeps scaffold lightweight; components are added via `npx shadcn add <component>`.

6. **Image unoptimized in export mode:** `images.unoptimized: true` is required for static export. This means no Next.js Image optimization — users must pre-optimize images. Documented in README.

7. **CSP string from metzger:** The CSP policy is specific to that site's integrations (Calendly). Generalized to a safer default while keeping the header structure.

8. **Resend + contact form:** Included Resend and Zod form validation as the default contact form backend. Alternative: Netlify Forms, Formspree — documented in README.

## Open Questions

1. **PNPM vs NPM:** desigjn-toolkit uses PNPM (`pnpm-lock.yaml`). metzger uses PNPM. Should the canonical scaffold standardize on PNPM or allow NPM/Yarn? Currently no lockfile is committed — left to user preference.

2. **App Router vs Pages Router:** All sources use App Router (Next.js 13+). No Pages Router scaffold is provided. Is a Pages Router variant needed for legacy migrations?

3. **i18n support:** None of the sources had robust i18n. Should the canonical scaffold include `next-intl` or `i18next`?

4. **CMS integration:** No headless CMS is pre-wired. Sanity, Strapi, Contentful, or TinaCMS — which should be the documented default?

5. **Auth pattern:** No auth layer is included. Clerk, NextAuth.js, or Lucia — which is the canonical choice?

6. **Database:** No database/ORM is included. Prisma, Drizzle, or Supabase — which should be the documented default?

7. **E-commerce:** No e-commerce stack (Stripe, Shopify, Snipcart) is included. Should a commerce variant scaffold be created?

8. **CSS-in-JS vs Tailwind:** All sources converged on Tailwind. The antipattern fixture `framework-next-cssinjs` exists but was rejected. Is CSS Modules support needed as an escape hatch?

9. **GSAP licensing:** GSAP is included (free tier). For commercial use, users need a Club GSAP license. Should GSAP be optional?

10. **Lighthouse CI target:** Default is `filesystem`. For CI/CD pipelines, users need to configure `LHCI_TARGET` env var. Should a GitHub Actions workflow be included?
