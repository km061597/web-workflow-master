---
name: design-research
description: Use when starting a new page design, redesigning sections, analyzing competitor sites, or extracting design patterns from reference URLs. Make sure to use this skill before building any new page or section.
---

# Design Research

Extract design patterns from reference websites.

## When to Use

- Starting a new page design
- Redesigning existing sections
- Analyzing competitor approaches
- Finding component inspiration

## Process

1. Identify target URLs (1-3 competitors or references)

2. Scrape with Firecrawl MCP:

   ```
   Use firecrawl MCP to scrape https://example.com and extract:
   - CSS color values
   - Typography (font-family, sizes, weights)
   - Layout patterns (grid, max-width, spacing)
   - Component structures
   ```

3. Or use surf CLI for manual exploration:

   ```bash
   surf go https://example.com
   surf read --depth 2
   ```

4. Save findings to `design-assets/research/[site-name].md` — **TODO pending owner** (path lands with design-assets/ owner)

5. Generate actionable snippets:
   - Color palette as CSS variables
   - Typography scale as Tailwind classes
   - Spacing system

## Output Format

```markdown
# Research: [Site Name]

URL: https://example.com
Date: [YYYY-MM-DD]

## Color Palette

| Name    | Hex  | Usage          |
| ------- | ---- | -------------- |
| Primary | #hex | Buttons, links |

## Typography

- Headings: Font, weight, size scale
- Body: Font, size, line-height

## Layout

- Container: max-width
- Grid: columns, gap
- Breakpoints: values

## Components

- Buttons: [description + screenshot ref]
- Cards: [description + screenshot ref]
```

## Reference

- Dispatch `research-agent` for deep competitive analysis
- `refs/Scrapling/` — **TODO pending owner** — advanced scraping patterns
- `refs/web-check/` — **TODO pending owner** — audit methodology
