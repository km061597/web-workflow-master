# Decision Log: intake-greenfield Playbook

## Sources

| Source file | Version | Size | SHA256 |
|---|---|---|---|
| `playbooks/intake-greenfield.md` | gsd-design | 13,329 bytes | `6f6fc5d1d33cfae7e90269895c7765307b08db086962bce57ec9dc86ddc90833` |

## Kept From

- **Entire playbook** from gsd-design. This is a single-source artifact — no other version has a greenfield intake playbook.

## Merged From

- Nothing. Only one source exists.

## Rejected

- Nothing rejected from this source.
- However, we **did NOT** attempt to merge content from the open-design or desigjn-toolkit stacks, even though:
  - open-design's `design-brief` skill covers "discovery" concepts that overlap with the 12 questions
  - desigjn-toolkit's `brand-guidelines.md` skill covers brand direction
  We kept the scope bounded to the explicit function-group rows in `intake.json`.

## Tradeoffs

1. **Vocabulary normalization applied**: Per `vocabulary-map.md`, we replaced `sites/<name>/` with `clients/<slug>/` throughout the playbook. This is the most significant edit — ~30 occurrences changed. The vocabulary map explicitly states: "Canonical: `clients/<slug>/` for active engagements; `prospects/<slug>/` for pre-intake."
2. **Tool references made portable**: Source references to repo-local scaffold, quality, convention, exemplar, schema, storefront, maintenance, mobile, and launch-gate assets were replaced with active-project workflow names or owner-scoped guidance because those assets are not emitted by this PR.
3. **Version-agnostic phrasing for "Open Design"**: The original referenced "71 design systems bundled with Open Design" in related source material, but this playbook does not need that source-specific path language.
4. **Section references normalized**: Missing cross-playbook references were rewritten to point at the active project's guidance or to the existing-site intake playbook when that file is emitted in this PR.

## Open Questions

1. **Tooling dependency**: The playbook still assumes crawl, audit, and release-readiness capabilities exist somewhere in the active project. The exact commands remain owner-scoped until the master repo emits a canonical scaffold/quality toolchain.
2. **Brand strategy execution**: The playbook now asks for the active project's brand strategy workflow or agent instead of naming a missing agent file. The master repo still needs to decide whether that workflow is an agent, skill, or checklist.
3. **No open-design equivalent**: open-design has no playbooks at all — only skills. Is the master repo meant to be a playbook + skill hybrid, or should we eventually convert playbook content into skill format?
