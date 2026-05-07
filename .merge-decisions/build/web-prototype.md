# Decision Log: web-prototype

## Sources

- `open-design/skills/web-prototype/SKILL.md` (open-design, 4162B) — General-purpose desktop web prototype with seed template, 8 layouts, checklist
- `open-design/skills/web-prototype-taste-soft/SKILL.md` (open-design, 4159B) — Soft taste variant
- `open-design/skills/web-prototype-taste-brutalist/SKILL.md` (open-design, 4009B) — Brutalist taste variant
- `open-design/skills/web-prototype-taste-editorial/SKILL.md` (open-design, 3305B) — Editorial taste variant
- `gsd-design/skills/web-prototype/SKILL.md` (gsd-design, 4162B) — Identical to open-design main
- `gsd-design/skills/web-prototype-taste-soft/SKILL.md` (gsd-design, 4159B) — Identical to open-design soft
- `gsd-design/skills/web-prototype-taste-brutalist/SKILL.md` (gsd-design, 4009B) — Identical to open-design brutalist
- `gsd-design/skills/web-prototype-taste-editorial/SKILL.md` (gsd-design, 3305B) — Identical to open-design editorial

## Kept From

- **open-design/web-prototype** (main, canonical): Core workflow (pre-flight → copy seed → plan sections → paste/fill → self-check → emit), resource map, hard rules, output contract.
- **open-design/web-prototype-taste-soft**: Default rhythm table (landing, marketing, pricing, docs) and aesthetic defaults.
- **open-design/web-prototype-taste-brutalist**: Brutalist layout patterns and typographic rules.
- **open-design/web-prototype-taste-editorial**: Editorial typography defaults (serif display, generous whitespace).

## Merged From

- **Taste variants consolidated**: All four taste variants (default, soft, brutalist, editorial) were essentially the same skill with different aesthetic defaults. Merged into a single canonical skill that references the active `DESIGN.md` for aesthetic direction rather than hardcoding a specific taste.
- **Duplicate versions**: open-design and gsd-design had identical copies of all 4 variants. Merged by treating them as the same content.

## Rejected

- **Taste-specific hardcoded defaults**: Each taste variant had hardcoded color, font, and spacing defaults. Rejected in favor of reading from the active `DESIGN.md` — the canonical skill is taste-agnostic.
- **Duplicated content across versions**: Since open-design and gsd-design had byte-identical files, the gsd-design copies added no new information. Rejected as duplicates.

## Tradeoffs

1. **Taste-agnostic vs. taste-specific**: Chose taste-agnostic with `DESIGN.md` integration. This means the skill is more flexible but requires an active design system. Users without a design system get neutral defaults from the seed template.
2. **Gsd-design vs. open-design origin**: Both repos had identical files. Chose open-design as the canonical source because it's the primary design repo, but the content was the same.
3. **Desktop-only vs. responsive**: Kept desktop-only framing with mobile reflow from the seed. The original skills were desktop-first; changing to mobile-first would be a larger rewrite than synthesis.

## Open Questions

1. Should the seed template and layout library be included inline in the skill, or referenced as separate files in the workspace?
2. Should we add a mobile-first variant of this skill for mobile-optimized landing pages?
3. The checklist.md reference is mentioned but not inlined — should P0/P1/P2 checklist items be included in the SKILL.md for self-containedness?
