# Local Business Website Template

Next.js 15.5 + React 19 + Tailwind 4 + Resend. Designed for storefronts, restaurants, salons, clinics, and service-area businesses.

## Stack

- **Framework:** Next.js 15.5 (App Router)
- **Runtime:** React 19, TypeScript 5.7
- **Styling:** Tailwind CSS 4
- **Email:** Resend (contact form notifications)
- **Analytics:** Vercel Analytics
- **Icons:** Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, about, services, testimonials, contact |
| `/services` | Service detail cards with pricing |
| `/contact` | Contact form + map embed |

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — for contact form email
- `BUSINESS_EMAIL` — recipient address

## Verification

```bash
npm run verify:setup    # scaffold integrity check
npm run verify:a11y     # accessibility scan
npm run typecheck       # TypeScript check
```

## Deployment

Optimized for Vercel. Set `BUSINESS_EMAIL` and `RESEND_API_KEY` in project settings.
