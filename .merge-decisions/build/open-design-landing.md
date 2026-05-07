# Decision Log: open-design-landing

## Sources

- `gsd-design/.claude/skills/open-design-landing/SKILL.md` (gsd-design, 13531B) — Atelier Zero editorial landing skill, parameterized with `inputs.json` + composer pipeline

## Kept From

- **gsd-design/open-design-landing** (sole source, canonical base): Complete skill preserved with master-repo portability notes — rich `od:` front-matter with typed `schema.ts` references, the 4-step workflow contract (Gather brand inputs → Decide image strategy → Compose the artifact → Optional Astro mirror), three image strategies (placeholder/generate/bring-your-own), composer architecture diagram, self-check list, and boundaries.

## Merged From

- Nothing to merge. This is a unique artifact with no duplicates across the 5 version repos.

## Rejected

- Nothing rejected. The skill contract is retained, but companion schema/style/script/assets files are TODO-scoped because they are not emitted by this PR.

## Tradeoffs

1. **Complex skill pass-through with TODO scoping**: This is the most complex skill in the build group (13.5KB, 4 workflow steps, external dependencies like `fal.ai`, `tsx`, Astro). The core workflow is preserved, while missing companion files are explicitly marked TODO pending owner.
2. **Path canonicalization**: Placed at `.claude/skills/open-design-landing/` to match vocabulary-map pattern. Original was at the same relative path in gsd-design, so this is a zero-delta move.
3. **Internal references TODO-scoped**: The skill references sibling artifacts (`../open-design-landing-deck/`), design system (`../../design-systems/atelier-zero/DESIGN.md`), and deployable app (`../../apps/landing-page/`). These are marked TODO pending owner because the master repo does not yet emit those structures.
4. **Historical label kept**: The `output_format` enum includes `nextjs-app` as a historical label for the Astro-based `apps/landing-page/` tree. We kept this label to avoid breaking existing `inputs.json` files that may reference it, even though it's technically an Astro app, not Next.js.

## Open Questions

1. The skill requires `schema.ts`, `styles.css`, `inputs.example.json`, `example.html`, and 3 scripts (`compose.ts`, `imagegen.ts`, `placeholder.ts`) plus `assets/` directory. None of these companion files were in the function-group JSON. Should we attempt to locate and port the full skill bundle from gsd-design inputs?
2. `apps/landing-page/` and `design-systems/atelier-zero/` are referenced but do not exist in master. Should the skill be rewritten to remove the "optional Astro mirror" step and make it fully self-contained?
3. The `nextjs-app` enum value is historically misleading (it's Astro, not Next.js). Should we deprecate it and add `astro-app` as a new enum value, or keep the misleading label for backward compatibility?
4. The skill depends on external API keys (`FAL_KEY`) and paid services (`fal.ai`, `Azure gpt-image-2`). Should a fully-offline variant be added to the skill?
