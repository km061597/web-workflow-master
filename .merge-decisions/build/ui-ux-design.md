# Decision Log: ui-ux-design

## Sources

- `gsd-design/skills/ui-ux-pro-max/SKILL.md` (gsd-design, 44776B) — Comprehensive UI/UX design intelligence with 50+ styles, 160+ color palettes, 50+ font pairings, 160+ product types, 100+ UX guidelines, 25 chart types across 10 stacks
- `open-design/skills/uiux-design/SKILL.md` (open-design, 11946B) — UI/UX design skill (open-design variant)
- `open-design/skills/uiux-banner-design/SKILL.md` (open-design, 8146B) — Banner design skill
- `open-design/skills/uiux-ui-styling/SKILL.md` (open-design, 10049B) — UI styling skill
- `open-design/skills/uiux-brand/SKILL.md` (open-design, 2943B) — UI brand skill
- `open-design/skills/uiux-slides/SKILL.md` (open-design, 1166B) — UI slides skill
- `gsd-design/skills/uiux-design/SKILL.md` (gsd-design) — UI/UX design (gsd variant)
- `gsd-design/skills/uiux-banner-design/SKILL.md` (gsd-design) — Banner design (gsd variant)
- `gsd-design/skills/uiux-ui-styling/SKILL.md` (gsd-design) — UI styling (gsd variant)
- `gsd-design/skills/uiux-brand/SKILL.md` (gsd-design) — UI brand (gsd variant)
- `gsd-design/skills/uiux-slides/SKILL.md` (gsd-design) — UI slides (gsd variant)
- `gsd-design/skills/anthropic-frontend-design/SKILL.md` (gsd-design, 4440B) — Anthropic frontend design guidelines

## Kept From

- **gsd-design/ui-ux-pro-max** (main, canonical): Complete UX guideline structure, 10 rule categories with priorities, critical rules per category, pre-delivery checklist. This is the most comprehensive source.
- **open-design/uiux-design**: Trigger keywords and workflow patterns.
- **open-design/uiux-banner-design**: Banner-specific layout rules and responsive constraints.
- **open-design/uiux-ui-styling**: Component-level styling guidance.
- **gsd-design/anthropic-frontend-design**: Bold aesthetic direction, distinctive typography, creative variance mandate.

## Merged From

- **Rule categories**: Merged the 10 priority-ranked categories from ui-ux-pro-max with banner-specific rules from uiux-banner-design and component styling from uiux-ui-styling.
- **Trigger keywords**: Merged triggers from all uiux-* skills into a comprehensive trigger list.
- **Aesthetic direction**: Merged anthropic-frontend-design's "choose a BOLD aesthetic direction" and "NEVER use generic AI aesthetics" into the design thinking preamble.

## Rejected

- **Duplicate versions**: open-design and gsd-design had identical copies of uiux-design, uiux-banner-design, uiux-ui-styling, uiux-brand, and uiux-slides. The gsd-design copies were byte-identical or near-identical. Rejected as duplicates.
- **uiux-brand**: Small (2.9KB) brand-specific UI rules. Merged into brand-identity canonical skill instead.
- **uiux-slides**: Very small (1.1KB) slide-specific UI rules. Too narrow; rejected.
- **Stack-specific deep dives**: ui-ux-pro-max has extensive stack-specific guidance for 10 stacks (React, Vue, SwiftUI, Flutter, etc.). Trimmed to focus on the canonical stack (Next.js 16 / React 19 / Tailwind 4 / shadcn) while keeping cross-platform accessibility rules.

## Tradeoffs

1. **Comprehensive vs. canonical stack**: The original ui-ux-pro-max covers 10 stacks. The canonical skill focuses on React/Next.js/Tailwind but keeps mobile accessibility rules (44pt/48dp touch targets, safe areas) because they're universally applicable.
2. **Rule priority table vs. prose**: Kept the priority table from ui-ux-pro-max because it helps the agent triage when conflicts arise. This adds structure but makes the skill longer.
3. **Anti-pattern integration**: The "NEVER use generic AI aesthetics" from anthropic-frontend-design was merged into the preamble rather than kept as a separate skill. This is a judgment call — it could also live in taste-design-system.

## Open Questions

1. Should the 10-stack compatibility matrix from ui-ux-pro-max be preserved as an appendix?
2. The original skill has 161 color palettes and 57 font pairings — should these be included inline or referenced as external files?
3. Should banner design rules have their own sub-section or be part of the general layout rules?
4. How should we handle the overlap with `taste-design-system` on "avoid generic AI aesthetics"?
