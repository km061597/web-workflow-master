# Decision Log: kami-landing

## Sources

- `gsd-design/.claude/skills/kami-landing/SKILL.md` (gsd-design, 9534B) — Kami paper-document landing skill, multilingual (EN · zh-CN · ja)

## Kept From

- **gsd-design/kami-landing** (sole source, canonical base): Complete skill preserved with master-repo portability notes — `od:` front-matter, page structure, workflow contract (4 steps), language stack table, component primitives, self-check list, boundaries, and see-also references.

## Merged From

- Nothing to merge. This is a unique artifact with no duplicates across the 5 version repos.

## Rejected

- Nothing rejected. The skill contract is self-contained, but companion quick-start/example files are TODO-scoped because they are not emitted by this PR.

## Tradeoffs

1. **Unique artifact pass-through with TODO scoping**: Chose to preserve the skill's core contract. Missing companion files and source-repo design-system paths are marked TODO pending owner so the emitted PR does not imply those files are present.
2. **Path canonicalization**: Placed at `.claude/skills/kami-landing/` to match the vocabulary-map pattern. The original was already at `.claude/skills/kami-landing/` in gsd-design, so this is a zero-delta move.
3. **Internal references TODO-scoped**: The skill references `../../design-systems/kami/DESIGN.md`, `../kami-deck/`, and the upstream `tw93/kami` link. The master repo does not emit the design-system or deck paths in this PR, so those references are marked TODO pending owner in the skill.

## Open Questions

1. The skill references `design-systems/kami/DESIGN.md` as the token source of truth, but the master repo does not yet have a `design-systems/` directory. Should the kami design system be ported into master as a prerequisite, or should the skill be rewritten to be self-contained?
2. The skill references `../kami-deck/` (sibling skill) which does not exist in master. If `kami-deck` is never synthesized, should the "See also" reference be removed or redirected?
3. The upstream link to `tw93/kami` is an external GitHub repo. Should this be maintained as a live reference, or should the skill become fully self-contained with no external dependencies?
4. The `example.html` file is referenced but not included in the canonical artifact. Should we attempt to locate and port it from the gsd-design inputs?
