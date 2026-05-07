# Next.js Canonical Scaffold

Production-ready Next.js 16 scaffold with React 19, Tailwind 4, shadcn/ui, and full quality tooling.

## Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Next.js | 16.2.4 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | 4.1.5 |
| Components | shadcn/ui | base-nova |
| Animation | Motion (Framer Motion) | 12.10 |
| Icons | Lucide React | 0.509 |
| Forms | React Hook Form + Zod | 7.56 / 3.25 |
| Testing | Vitest + Storybook + Playwright | 3.2 / 9.3 / 1.60 |
| Linting | ESLint 9 + Prettier + Stylelint | 9.25 / 3.6 / 17.10 |
| Performance | Lighthouse CI + size-limit | 0.15 / 12.1 |
| Accessibility | pa11y-ci | 4.1 |

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Static export to `dist/` |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint + auto-fix |
| `npm run format` | Prettier write |
| `npm run typecheck` | TypeScript strict check |
| `npm run test` | Vitest unit tests |
| `npm run lighthouse` | Lighthouse CI audit |
| `npm run verify:setup` | Pre-ship verification |
| `npm run verify:viewports` | Responsive breakpoint test |
| `npm run verify:a11y` | Automated a11y scan |
| `npm run quality` | Full quality gate (typecheck → lint → test → build → a11y) |

## Project Structure

```
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/    # Add components here
│   ├── lib/
│   │   └── utils.ts   # cn() helper
│   └── test/          # Vitest tests (add setup.ts when needed)
├── scripts/           # Verification scripts
│   ├── verify-setup.mjs
│   ├── verify-viewports.mjs
│   └── verify-a11y.mjs
├── lighthouserc.cjs   # Lighthouse CI config
├── .stylelintrc.json  # Stylelint config
├── components.json    # shadcn/ui config
└── package.json
```

## Configuration

### Environment Variables

Copy `.env.example` → `.env.local` and fill in:

- `NEXT_PUBLIC_SITE_URL` — production domain (required)
- `RESEND_API_KEY` — email backend (optional)
- `OPENAI_API_KEY` — AI features (optional)

### shadcn/ui

Add components:

```bash
npx shadcn add button
npx shadcn add card
npx shadcn add dialog
```

### Tailwind 4

Tailwind 4 uses CSS-first configuration. Theme tokens are defined in `src/app/globals.css` using `@theme`. No `tailwind.config.js` needed.

### Static Export

`output: "export"` is enabled by default. Remove it from `next.config.ts` if you need SSR, API routes, or image optimization.

**Note:** `images.unoptimized: true` is required for static export. Pre-optimize images before committing.

### Security Headers

CSP and security headers are configured in `next.config.ts`. Customize the CSP policy for your third-party integrations.

## Quality Gates

### Lighthouse CI

```bash
npm run lighthouse
```

Mobile-first thresholds:
- LCP ≤ 2500ms
- CLS ≤ 0.1
- TBT ≤ 200ms
- Performance ≥ 0.90
- Accessibility ≥ 0.95
- Best Practices ≥ 0.95
- SEO ≥ 0.95

### Bundle Budgets
- JS: 500KB
- CSS: 70KB
- Images: 500KB
- Fonts: 100KB
- Total: 1.5MB

### Pre-commit Hooks

Husky + lint-staged run on every commit:
- ESLint auto-fix
- Prettier format
- Stylelint fix

## Deployment

### Vercel (recommended)

```bash
vercel --prod
```

Analytics and Speed Insights auto-enable when deployed to Vercel.

### Static Host (Netlify, Cloudflare Pages, etc.)

```bash
npm run build
# Upload dist/ to your host
```

## Open Questions / Roadmap

1. **CMS:** Add Sanity/Contentful integration guide
2. **Auth:** Add Clerk/NextAuth.js pattern
3. **Database:** Add Prisma/Drizzle + Supabase pattern
4. **Commerce:** Add Stripe checkout pattern
5. **i18n:** Add `next-intl` multi-language support
6. **Pages Router variant:** Legacy migration scaffold

## License

MIT
