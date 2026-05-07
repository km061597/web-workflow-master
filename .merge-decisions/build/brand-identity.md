# Decision Log: brand-identity

## Sources

- `open-design/skills/brand-voice/SKILL.md` (open-design, 3636B) — Brand voice guidelines
- `gsd-design/skills/anthropic-brand-guidelines/SKILL.md` (gsd-design, 2235B) — Anthropic brand guidelines
- `gsd-design/skills/anthropic-theme-factory/SKILL.md` (gsd-design, 3124B) — Anthropic theme factory
- `gsd-design/skills/taste-brandkit/SKILL.md` (gsd-design) — Taste brand kit generation
- `gsd-design/skills/uiux-brand/SKILL.md` (gsd-design, 2943B) — UI brand skill

## Kept From

- **open-design/brand-voice** (main, canonical): Voice archetypes table (10 archetypes with tone, vocabulary, avoid columns), tone matrix by context, cross-platform coherence table.
- **gsd-design/anthropic-brand-guidelines**: Brand consistency rules, visual identity fundamentals.
- **gsd-design/anthropic-theme-factory**: Theme generation methodology, token-based color system.
- **gsd-design/taste-brandkit**: Brand kit generation workflow.

## Merged From

- **Voice + visual**: Merged brand voice (tone, archetypes) with visual identity (color, typography, spacing, shape) into a unified brand skill.
- **Theme factory + brandkit**: Merged theme generation and brand kit workflows into "Visual Identity Rules" and "Cross-Platform Coherence" sections.
- **UI brand**: Merged UI-specific brand rules (component-level brand application) into the visual identity section.

## Rejected

- **Duplicate gsd-design copies**: gsd-design had some overlap with open-design on brand concepts. Rejected duplicates.
- **Anthropic-specific framing**: The anthropic-brand-guidelines and anthropic-theme-factory had Anthropic-specific examples. Generalized to brand-agnostic language while keeping the underlying methodology.

## Tradeoffs

1. **Voice-first vs. visual-first**: The skill leads with voice because that's the most unique content (10 archetypes). Visual identity is standard design system material that overlaps with other skills.
2. **10 archetypes**: Kept all 10 Jungian-inspired archetypes (Pioneer, Guardian, Creator, Sage, Everyperson, Hero, Lover, Jester, Caregiver, Ruler). This is comprehensive but may be more than most users need. The table format makes it scannable.
3. **Cross-platform table**: Included web, mobile iOS/Android, social, email, and print. This is broader than the canonical stack but necessary for a brand skill.

## Open Questions

1. Should the 10 archetypes be trimmed to a more common subset (e.g., 5–6) with the rest in an appendix?
2. Should brand audit be integrated with the `critique-quality` skill's 5-dimension review?
3. Should visual identity rules (color, typography, spacing) be de-duplicated with `taste-design-system`?
4. Should the tone matrix be expanded with more contexts (e.g., loading states, empty states, deletion confirmations)?
