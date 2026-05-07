---
name: add-component
description: Use when adding new shadcn/ui components, extending existing components with variants, or building composites from primitives. Make sure to use this skill whenever the task involves installing, adding, or creating UI components for the site.
---

# Add Component

Add a shadcn/ui component, then customize it for the project design system.

## When to Use

- Adding new UI primitives (Button, Input, Dialog, etc.)
- Extending existing components with new variants
- Building composite components from shadcn primitives

## Process

1. Install via shadcn CLI:

   ```bash
   cd site && npx shadcn@latest add [component]
   ```

2. Read the generated component file in `site/src/components/ui/`

3. Customize styles to match project theme:
   - Replace hardcoded colors with CSS variables (`bg-primary`, `text-foreground`)
   - Ensure focus-visible rings use `ring-ring`
   - Add transition utilities for hover states

4. For animated components, wrap with Framer Motion:

   ```tsx
   <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
   ```

5. Verify by importing in a page and checking build:
   ```bash
   cd site && npm run build
   ```

## Key Files

- `site/src/components/ui/` — Component output directory
- `site/src/app/globals.css` — Theme variables
- `site/src/lib/utils.ts` — cn() utility

## Reference

- `refs/awesome-shadcn-ui/` — **TODO pending owner** — curated component collections
- `refs/magicui/` — **TODO pending owner** — animated component registry
- Dispatch `design-system-agent` for complex theme customizations
