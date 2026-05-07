# Decision Log: local-business-template

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| templates/local-business-template/ | WEBSITES | 166,390B | `inputs/WEBSITES/templates/local-business-template/` |

## Synthesis Notes

- **Base:** Next.js 15 + React 19 + Tailwind 4 (per WEBSITES inventory row description)
- **Scope:** Single-purpose template for storefronts, restaurants, salons, clinics, and service-area businesses
- **Key features:** Hero, services grid with pricing, testimonials, contact form with Resend, Google Maps embed
- **Simplification:** Removed testing frameworks (Vitest, Playwright, Storybook), Stylelint, Lighthouse CI, size-limit — these are pre-installed in `nextjs-canonical` for teams that need full CI/CD; this template focuses on speed-to-deploy
- **Resend placeholder:** Contact form API route includes Resend integration with clear error message if `RESEND_API_KEY` is unset

## Open Questions

1. Should this include a booking/scheduling integration (Calendly, Square Appointments)?
2. Should we add a reviews/ratings schema.org markup section?
3. CMS integration — Strapi, Sanity, or WordPress headless for menu/service updates?
