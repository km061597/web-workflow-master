# Architecture Decisions — Reference

> **Note**: Stack base for this workspace is **Next.js 16 / React 19 / Tailwind 4 / shadcn/ui** (from desigjn-toolkit). The decisions below are from an alternative architecture (design-self-create, Astro 5-based) and are preserved here for reference and rationale. When building in this workspace, follow the Next.js 16 stack defined in `CLAUDE.md`.

Every tool choice with rationale and rejected alternatives.

## Framework: Next.js 16 (Active Stack)

**Chosen:** Next.js 16 with App Router.

**Why:** Official React framework with best-in-class static export, image optimization, font loading, and App Router for server components. The AI tooling ecosystem (shadcn/ui, MagicUI, React Bits) is built around React. Next.js 16 brings React 19, Turbopack, and improved static generation.

**Alternative considered:**
- **Astro 5** — zero-JS-by-default islands architecture. Excellent for static content but smaller React animation/component ecosystem. Rationale preserved below.

## Styling: Tailwind CSS v4

**Chosen:** Tailwind v4 with CSS-first config.

**Why:** v4's `@theme` directive eliminates `tailwind.config.js` indirection. OKLCH color space is perceptually uniform — 50% lightness actually looks like middle gray, critical for AI-generated accessible palettes. Utility classes are easier for AI to write correctly than CSS-in-JS objects.

**Rejected:**
- Panda CSS — codegen step adds friction, smaller ecosystem
- StyleX — Meta's tool, poor integration, no community templates
- UnoCSS — faster builds but no shadcn/ui compatibility
- Plain CSS — AI generates inconsistent spacing and naming

## Animation: GSAP

**Chosen:** GSAP core + ScrollTrigger.

**Why:** Framework-agnostic, 23KB core. ScrollTrigger handles scroll-linked animations. Timeline API is predictable for AI to generate. Works with both React and Astro.

**Rejected:**
- Framer Motion / Motion — React lock-in, heavier bundle, better for app UI than websites
- CSS animations — AI writes keyframes poorly, hard to sequence
- Anime.js — good but smaller ecosystem than GSAP

## Browser Automation: Playwright CLI + surf

**Chosen:** surf CLI (primary) + Playwright CLI (escape hatch).

**Why:** surf is a direct CLI for browser control with no MCP wrapper overhead. Playwright has auto-waiting, 50+ device profiles, and built-in visual comparison. Direct CLI access is faster than MCP server indirection.

**Rejected:**
- Puppeteer — Chrome-only, declining maintenance
- Cypress — 500MB footprint, slow, overkill for screenshots
- Playwright MCP — server overhead, worse error messages
- Chrome MCP — same wrapper problem

## Asset Generation: ComfyUI

**Chosen:** ComfyUI for local Stable Diffusion.

**Why:** Node-based workflow = reproducible. Save a workflow JSON, re-run exactly. Largest custom node ecosystem. Best Apple Silicon support.

**Rejected:**
- AUTOMATIC1111 — click-based UI, harder to script
- InvokeAI — smaller community
- fal.ai / Replicate — paid APIs, ongoing cost
- DALL-E API — paid, rate limits

## Color System: OKLCH

**Chosen:** OKLCH color space for all tokens.

**Why:** HSL's lightness is perceptually broken. `hsl(60 100% 50%)` (yellow) is blinding while `hsl(240 100% 50%)` (blue) is dark. OKLCH fixes this — 50% lightness is actually middle gray regardless of hue. Essential for AI generating palettes with guaranteed contrast ratios.

**Rejected:**
- HSL — perceptually non-uniform
- Hex — no semantic meaning
- RGB — device-dependent

## Component Primitives: shadcn/ui + React Aria

**Chosen:** shadcn/ui for scaffolding speed, React Aria for custom work.

**Why:** shadcn provides copy-paste components that work immediately. React Aria from Adobe is the gold standard for accessibility — designed a11y-first, not bolted on.

**Rejected:**
- Material UI — opinionated, hard to customize, looks like Google
- Chakra v3 — Panda CSS dependency, more complex setup
- Radix alone — a11y gaps
- Headless UI — smaller component set

## Icons: Lucide

**Chosen:** Lucide React.

**Why:** Modern fork of Feather Icons, actively maintained, tree-shakeable. Clean, consistent stroke width. Sufficient set for most websites.

**Rejected:**
- Heroicons — smaller set
- Iconify — 200+ sets adds complexity and decision fatigue
- Font Awesome — heavy, outdated aesthetic

## Fonts: Fontsource + Next.js Font Optimization

**Chosen:** Fontsource self-hosted variable fonts + Next.js built-in font optimization.

**Why:** Eliminates layout shift from Google Fonts CDN. NPM install means version-locked fonts. Variable fonts reduce file sizes. No external network dependency. Next.js `next/font` provides zero-layout-shift loading.

**Rejected:**
- Google Fonts API — network requests, layout shift
- Adobe Fonts — paid, external dependency
- System fonts only — limited design expression

## Deploy: Vercel

**Chosen:** Vercel for Next.js sites.

**Why:** Best Next.js support (official adapter). Preview deployments per branch. Zero-config for static sites.

**Rejected:**
- Netlify — good but Vercel's Next.js integration is tighter
- Cloudflare Pages — more complex config
- Self-hosted — unnecessary ops overhead
- GitHub Pages — good fallback for pure static
