# Maintainability handoff — the package that ships with the site

Every site exits the BUILD/AUDIT/SHIP phases with a maintenance package. This is what separates "I built you a website" from "I built you a website you actually own."

## What this addresses

AI agents are great at first-spike work and bad at five-year maintenance. The handoff package is the thing the *next agent* (or the owner, or a future contractor) needs to keep the site healthy after the original build session ends.

## The MAINTENANCE.md template

Every site under `sites/<name>/` MUST have a `MAINTENANCE.md` at its root before phase 6 (MAINTAIN) is reached. Use this template verbatim and fill it in:

```markdown
# <Site Name> — Maintenance

Last updated: <YYYY-MM-DD>
Maintained by: <name + contact>

## Quick links

- Production URL: https://<domain>
- Repo: https://github.com/<org>/<repo>
- Hosting (Vercel): https://vercel.com/<team>/<project>
- Domain registrar: <Cloudflare / GoDaddy / etc.>
- CMS: <Sanity Studio URL or "MDX in repo">
- Email forwarding: <Cloudflare / ImprovMX / etc.>
- Form submissions: <Formspree dashboard / Resend / etc.>
- Analytics: <Plausible / Vercel Web Analytics URL>
- Error monitoring: <Sentry / Vercel Monitoring URL>
- Uptime monitor: <UptimeRobot URL>

## How to update content

### Through the CMS (preferred)

1. Go to <CMS URL>
2. Log in with the email <owner@example.com>
3. Edit the document you want to change
4. Click "Publish" — changes go live in ~5 minutes

### Through the repo (developer-only)

1. `git clone <repo>`
2. `npm install`
3. Edit MDX/JSON files in `src/content/`
4. `npm run dev` to preview locally
5. Push to `main` — Vercel deploys automatically

## How to deploy

- Pushes to `main` auto-deploy via Vercel
- Preview deployments happen on every PR
- Production rollback: Vercel dashboard → Deployments → "Promote to Production" on a previous deployment

## How to fix the site if it's down

Order of operations when production is broken:

1. **Check Vercel dashboard** — is the latest deployment failing? If so, roll back to a previous deployment.
2. **Check the GitHub Actions tab** — did CI fail? Look at the failed step.
3. **Check Cloudflare/DNS** — did the domain expire? Is DNS resolving?
4. **Check Resend/Formspree** — are forms still receiving submissions?
5. **Check Sentry** — are users hitting JS errors?
6. **Run locally** — `npm install && npm run build` — does it build clean?
7. **Run click-path audit** — use the active project's click-path audit against `<production-url>` — does it report errors?

If steps 1-3 don't reveal it, contact <maintenance contact>.

## How to renew / pay for things

- Domain: auto-renews on <date> from <registrar>; cost ~$10-15/year
- Hosting: Vercel free tier covers <traffic profile>; upgrade to Pro ($20/mo) if traffic exceeds <threshold>
- CMS: Sanity free tier covers <usage>; Growth tier $99/mo at scale
- Email forwarding: free (Cloudflare) or <cost> (ImprovMX paid plan)
- Uptime monitor: free up to 50 monitors

Total predictable cost: <$X/year>.

## How to transfer ownership

1. Domain: log into registrar → request EPP code → recipient claims at their registrar
2. Vercel: settings → transfer project → enter recipient email
3. CMS (Sanity): settings → invite member → make them admin → remove yourself
4. Repo: GitHub settings → transfer ownership
5. Forms: change email destination in Formspree/Resend dashboard
6. Analytics: invite recipient as user, then remove yourself

After transfer, update this MAINTENANCE.md with new owner info and commit.

## Backup / restore

- The repo IS the source of truth for code + content (when content is MDX)
- For Sanity content: run `sanity dataset export` monthly; store snapshots in <backup location>
- For form submissions: Formspree/Resend retain history; export quarterly to <backup location>

## Known quirks / "things to know"

(Document any non-obvious behavior. Examples:)
- Hero image is preloaded — if you change it, also update `<link rel="preload">` in `app/layout.tsx`
- Hours JSON is consumed by both LocalBusiness JSON-LD AND the visible hours block — change in one place: `src/content/hours.json`
- The contact form sends to <email>; CC <other email>; if either changes, update `app/api/contact/route.ts`
- Site uses ISR with 60s revalidation — content changes appear within ~1 minute, not instantly

## Performance & quality history

- Initial Lighthouse mobile scores: Performance <X>, A11y <X>, Best Practices <X>, SEO <X>
- Quarterly re-audit: <date> → <scores>
- If scores drop >5 points, run the active project's release/readiness gate and investigate

## Who to call

- Site issues: <maintenance contact, email, phone>
- Domain: <registrar support>
- Hosting: <Vercel support / community>
- Owner of the business: <owner contact>
- Owner of the design system: kylemetzger0615@gmail.com
```

## What HAS to be in this file before SHIP→MAINTAIN

The active project's MAINTAIN phase readiness check should enforce:

- [ ] `MAINTENANCE.md` exists
- [ ] Contains no TODO/TBD placeholders
- [ ] Contains "deploy" or "update" or "build" sections
- [ ] Contains "owner" or "contact" or "access" sections
- [ ] Production URL in STATUS.md is reachable

These are minimum bars. The full template above is the bar for actually shipping to a paying client.

## The owner walkthrough

Once MAINTENANCE.md is complete:

1. **Schedule a 30-minute call** with the owner (recorded if possible).
2. **Walk through:** the live site, the CMS, how to update one page, how to find form submissions, what the analytics dashboard looks like.
3. **Have them edit a real piece of content** (their hours, a photo, etc.) while you watch.
4. **Print MAINTENANCE.md** as a 1-page PDF and give them a copy.
5. **Send a follow-up email** with all the URLs and login emails (NEVER passwords in plaintext — use 1Password or similar shared vault).

If the owner can't do step 3 in real time without help, the CMS choice was wrong. Iterate.

## The "no half-measure" enforcement

The reason this playbook exists is that "ship the site and walk away" is the failure mode that makes AI-built small-business sites a liability. Every site under this workspace must be transferable. Phase 6 (MAINTAIN) is not optional — it's the difference between a deliverable and a future support nightmare.
