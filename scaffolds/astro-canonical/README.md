# Astro Canonical Scaffold

Production-ready Astro 6 scaffold with Tailwind 4, GSAP, and full quality tooling.

## Stack

| Layer | Choice | Version |
|-------|--------|---------|
| Framework | Astro | 6.2.2 |
| Styling | Tailwind CSS | 4.2.4 |
| Animation | GSAP + @gsap/react | 3.15 / 2.1 |
| Icons | Lucide React | 0.509 |
| Testing | Playwright | 1.59 |
| Linting | ESLint 9 + Prettier + Stylelint | 9.39 / 3.8 / 17.10 |
| Performance | Lighthouse CI | 13.2 |
| A11y | @axe-core/playwright | 4.11 |

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (port 4321) |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run typecheck` | TypeScript check |
| `npm run test:e2e` | Playwright (5 browsers) |
| `npm run audit` | Lighthouse audit |
| `npm run validate` | Content validation |
| `npm run check-links` | Broken link check |
| `npm run quality` | Full quality gate |

## Project Structure

```
├── src/
│   ├── layouts/       # Astro layouts
│   ├── pages/         # Route pages
│   ├── components/    # Astro components + React islands
│   └── styles/        # Global CSS
├── public/            # Static assets
├── tests/             # Playwright E2E tests (add spec files as needed)
├── scripts/           # Quality scripts
│   ├── audit.mjs
│   ├── validate.mjs
│   └── check-links.mjs
└── lighthouserc.json  # Lighthouse CI config
```

## React Islands

To use React components inside Astro:

```astro
---
import Counter from '../components/Counter';
---
<Counter client:load />
```

## Deployment

### Static (default)

```bash
npm run build
# Upload dist/ to any static host
```

### Vercel (SSR)

```bash
npm i @astrojs/vercel
# Add adapter to astro.config.mjs
```

### Netlify

`netlify.toml` is pre-configured. Connect repo for auto-deploy.

## License

MIT
