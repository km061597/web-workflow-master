---
name: web-prototype
description: |
  General-purpose desktop web prototype builder. Produce a single, self-contained HTML file by composing section layouts from a layout library against a token-based seed template. Default for any landing page, marketing page, SaaS page, docs page, or homepage when no more specific skill matches. Supports design-system integration via DESIGN.md tokens.
triggers:
  - "prototype"
  - "mockup"
  - "landing"
  - "single page"
  - "marketing page"
  - "homepage"
  - "web page"
---

# Web Prototype Skill

Produce a single, self-contained HTML prototype using the bundled seed and layout library — **not** by writing CSS from scratch. The seed encodes good defaults (typography, spacing, accent budget). Your job is to compose it.

## Resource map

```
web-prototype/
├── SKILL.md                ← this file
├── assets/
│   └── template.html       ← seed: tokens + class system + chrome (READ FIRST)
└── references/
    ├── layouts.md          ← paste-ready section skeletons
    └── checklist.md        ← P0/P1/P2 self-review
```

## Workflow

### Step 0 — Pre-flight

1. **Read `assets/template.html` — **TODO pending owner** (not yet bundled) end-to-end** — at minimum through the `<style>` block.
2. **Read `references/layouts.md` — **TODO pending owner** (not yet bundled)** so you know which section skeletons exist.
3. **Read the active DESIGN.md** (already injected). Map its colors to the six `:root` variables; don't introduce new tokens.

### Step 1 — Copy the seed

Copy `assets/template.html` — **TODO pending owner** (not yet bundled) as `index.html`. Replace the six `:root` variables with the active design system's tokens. Replace the page `<title>` and topnav brand.

### Step 2 — Plan the section list

**Pick layouts before writing copy.** Default rhythms:

| Page kind | Default rhythm |
|---|---|
| Landing | hero → 3 features → 4 stats or 5 quote → custom split → 6 cta |
| Marketing / editorial | hero-center → 7 log list → 6 cta |
| Pricing | hero-center → 8 comparison table → 6 cta |
| Docs index | hero-center → 7 log list (sections) → 6 cta |

State the chosen list in one sentence to the user *before* writing.

### Step 3 — Paste and fill

For each chosen layout, copy the `<section>` block into `<main id="content">`. Replace `[REPLACE]` with real, specific copy. **No filler** — if a slot is empty, pick a different layout.

### Step 4 — Self-check

Run through `references/checklist.md` — **TODO pending owner** (not yet bundled) top to bottom. Every P0 item must pass.

### Step 5 — Emit the artifact

Wrap `index.html` in `<artifact>` tags. One sentence before describing what's there. Stop after `</artifact>`.

## Hard rules (the seed protects most)

- **Single accent, used at most twice per screen.** Eyebrow + primary CTA is the default budget.
- **Display font is serif** (Iowan Old Style / Charter / Georgia). Sans for body. Mono for numerics, captions, eyebrows.
- **Image placeholders, not external URLs.** Use `.ph-img` class — never link to a stock photo CDN.
- **Mobile reflow already works** via the seed's media query at 920px. Don't break it with fixed widths.
- **`data-od-id` on every `<section>`** so comment mode can target it.

## Output contract

```
<artifact identifier="kebab-case-slug" type="text/html" title="Human Title">
<!doctype html>
<html>...</html>
</artifact>
```

One sentence before the artifact. Nothing after.
