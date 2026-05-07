# Decision Log: design-brief Skill

## Sources

| Source file | Version | Size | SHA256 |
|---|---|---|---|
| `open-design/skills/design-brief/SKILL.md` | open-design | 13,426 bytes | `ddcb70ae1ba4688ee948a3a0f8d3fb7888ad89a49d3e71c2e97661de7d81ae5b` |
| `.claude/skills/design-brief/SKILL.md` | gsd-design | 13,426 bytes | `ddcb70ae1ba4688ee948a3a0f8d3fb7888ad89a49d3e71c2e97661de7d81ae5b` |

## Kept From

- Both versions contributed the **entire identical content**. SHA256 match confirms byte-for-byte duplication.
- Frontmatter, all 5 sections, the 8-dimension framework, token resolution tables, and the 9-section DESIGN.md template are identical across both versions.

## Merged From

- Nothing to merge — the two versions are perfect duplicates. No content was combined; one copy was promoted to canonical.

## Rejected

- Nothing rejected. All content from both sources is preserved in the canonical artifact.

## Tradeoffs

1. **Version-neutral references**: Replaced "Open Design" in the Background section with "source design system" to avoid binding the canonical artifact to a single version namespace. The internal reference to `design-systems/` was kept because it's a generic directory name.
2. **`od:` frontmatter retained**: Both versions use the `od:` key (open-design specific). Since both source versions agree on this structure, we kept it as a shared convention rather than inventing a new frontmatter schema.
3. **No path abstraction for `design-systems/`**: The vocabulary map notes this as an open-design directory. We kept it as-is because the skill's Background section genuinely references this directory as part of its analytical origin story. Removing it would make the Background paragraph nonsensical.
4. **No attempt to merge desigjn-toolkit's design-research skill**: The desigjn-toolkit has a `design-research.md` skill that overlaps conceptually (extracting patterns from references). However, it uses a completely different format (no frontmatter, no I-Lang, no token resolution) and serves a different stage (research vs. brief-to-spec). Intentionally excluded to keep the scope bounded to the intake function group's explicit rows.

## Open Questions

1. **Should the `od:` frontmatter key be renamed?** It's version-specific shorthand for "open-design." A future cross-version frontmatter standard (e.g., `meta:` or `skill:`) would improve portability.
2. **Missing master-repo integration**: The source stack had agent and memory integrations that are not emitted by this PR. Should this skill stay self-contained, or should a future design-system owner wire it to canonical research/design-system workflows?
3. **Token table extensibility**: The closed vocabulary in Section 2.1 is hard-coded. A future iteration might want to load tokens from a separate `tokens/` directory to avoid editing the skill file when adding new palettes or fonts.
