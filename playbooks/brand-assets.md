# Brand Asset Pipeline

One source image (SVG logo + brand colors) → every favicon, OG card, app icon, splash screen, and social profile asset a site needs. Run once per brand; commit the outputs.

## What Gets Generated

| Asset | Sizes / formats | Where it goes |
|---|---|---|
| Favicons | 16, 32, 48, 96, 192, 512 PNG + ICO | `public/` root |
| Apple touch icons | 180px | `public/apple-touch-icon.png` |
| Android Chrome icons | 192, 512 PNG (regular + maskable) | `public/icon-*.png` |
| `manifest.webmanifest` | full PWA manifest with icons | `public/` |
| `mstile-150x150.png` | Windows tile | `public/` |
| `safari-pinned-tab.svg` | mono SVG for Safari pinned tabs | `public/` |
| OG card (default) | 1200×630 PNG | `public/og.png` |
| OG card per-page | 1200×630 PNG, generated dynamically | `/api/og?title=...` |
| Twitter card | 1200×600 PNG (or reuse OG) | inherits OG |
| iOS splash screens | 8 sizes per device family | `public/splash/` |
| Theme colors | meta tags for browsers + light/dark | `<head>` |

## Run the Pipeline

### One-time: install tooling

```bash
npm i -D sharp pwa-asset-generator @vercel/og
brew install librsvg                   # for SVG → PNG conversion via sharp
```

### Generate everything from one SVG

Per site, drop your master logo at `brand/logo.svg` (must be ≥512×512 viewBox, single color preferred for maskability), then:

```bash
npx pwa-asset-generator brand/logo.svg public \
  --background "#0a0a0a" \
  --padding "10%" \
  --opaque false \
  --maskable true \
  --favicon true \
  --mstile true \
  --path-override "/" \
  --manifest public/manifest.webmanifest \
  --index public/index.html \
  --type png \
  --quality 90
```

### Generate the default OG card

```bash
# Static (one image, used on every page that doesn't customize)
# TODO pending owner: node scripts/generate-og.mjs --title "<site name>" --output public/og.png
```

`scripts/generate-og.mjs` — **TODO pending owner** (build function group) — render an HTML template to PNG via sharp. Template lives at `brand/og-template.html` — **TODO pending owner** (scaffold function group). Per-site customization happens here.

### Generate per-page OG cards (dynamic)

For Next.js, use `@vercel/og` with an edge function:

```ts
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Untitled';

  return new ImageResponse(
    (
      <div style={/* match brand */}>
        <h1>{title}</h1>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

Then in page metadata:

```ts
export const metadata = {
  openGraph: {
    images: [`/api/og?title=${encodeURIComponent(title)}`],
  },
};
```

## Required `<head>` Snippets

Every site must include:

```html
<!-- Standard favicon set -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- PWA manifest -->
<link rel="manifest" href="/manifest.webmanifest">

<!-- Theme color (light + dark) -->
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)">

<!-- iOS web app -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="<short name>">

<!-- Safari pinned tab -->
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0a0a0a">

<!-- Open Graph (default — pages override) -->
<meta property="og:image" content="https://example.com/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="<descriptive alt>">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://example.com/og.png">
```

## Validation

Before shipping, verify:

- [ ] Favicon shows up in browser tabs (Chrome, Safari, Firefox)
- [ ] iOS home-screen icon is square, not letter-boxed
- [ ] Android home-screen icon doesn't get cropped (test maskable)
- [ ] OG card preview works in [opengraph.xyz](https://www.opengraph.xyz/) for the homepage
- [ ] OG card preview works for a deep page (per-page generation)
- [ ] Twitter card preview works in [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Slack unfurl shows the right image + title
- [ ] Theme color matches brand in mobile Chrome (top bar tinted)
- [ ] Safari pinned tab icon renders mono (not the full color logo)

## Maskable Icons — The Gotcha

Android Chrome adaptive icons crop your logo to a circle on some launchers, square on others. **All artwork must live inside the inner 80% safe zone.** Test at [maskable.app](https://maskable.app/).

If your logo is a wordmark or has no safe maskable form, ship two icons:

```jsonc
// manifest.webmanifest
{
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

The maskable variant has the logo + brand-colored padded background filling the full canvas.

## Splash Screens (iOS PWAs)

iOS doesn't auto-generate splash screens; you must ship one per device family. `pwa-asset-generator` produces all 8 (iPhone SE through Pro Max + iPad). Reference them in `<head>`:

```html
<link rel="apple-touch-startup-image" href="/splash/iphone15pro_portrait.png"
      media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)">
<!-- ...repeat for each device/orientation combo -->
```

The generator outputs the full block — paste it into the head template.

## Tooling Alternatives

| Tool | Use | Cost |
|---|---|---|
| `pwa-asset-generator` | All-in-one (favicons + splash + manifest) | free |
| `realfavicongenerator.net` | Web UI, downloads a zip | free |
| `sharp-cli` | Custom resizing scripts | free |
| `@vercel/og` | Dynamic per-page OG cards | free (Vercel) |
| `@cloudflare/satori` | Same as @vercel/og but framework-agnostic | free |
