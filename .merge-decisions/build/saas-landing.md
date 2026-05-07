# Decision Log: saas-landing

## Sources

- `open-design/docs/examples/saas-landing-skill/SKILL.md` (open-design, 4497B) — docs/examples variant with minimal `od:` block
- `open-design/skills/saas-landing/SKILL.md` (open-design, 4596B) — skills/ variant with full `od:` block
- `gsd-design/.claude/skills/saas-landing/SKILL.md` (gsd-design, 4596B) — `.claude/skills` variant, byte-identical to open-design/skills version

## Kept From

- **open-design/skills/saas-landing** (canonical base): Full `od:` front-matter with `platform: desktop`, `scenario: marketing`, and `craft: requires: [typography, color, anti-ai-slop]`. The complete 6-step workflow body (Read context → Plan sections → Apply design system → Write the file → Self-check → Done).
- **open-design/docs/examples/saas-landing-skill**: The "For skill authors reading this as a reference" appendix section, which exists in all three sources. The note about `od:` front-matter being optional for Claude-Code-only compatibility.

## Merged From

- **`od:` front-matter enrichment**: Merged the richer front-matter from open-design/skills and gsd-design (which are identical) into the canonical artifact. The docs/examples variant was missing `platform`, `scenario`, and `craft` fields.
- **Body content**: All three sources share identical body content. No textual merging was needed — the canonical version uses the same workflow, section structure, self-check list, and skill-author appendix.

## Rejected

- **docs/examples path location**: The open-design repo placed one copy under `docs/examples/` and another under `skills/`. The canonical placement is `.claude/skills/saas-landing/` per the vocabulary-map.md pattern (`.claude/skills` → skill, 507 occurrences — the dominant skill pattern).
- **Duplicative sha256-identical gsd-design copy**: gsd-design's `.claude/skills/saas-landing/SKILL.md` is byte-identical to open-design's `skills/saas-landing/SKILL.md`. It contributed nothing new beyond confirming the front-matter is stable across repos.

## Tradeoffs

1. **Path canonicalization**: Chose `.claude/skills/saas-landing/` over `skills/saas-landing/` because `.claude/skills` is the dominant pattern (507 vs. 3 occurrences in vocabulary-map). This aligns with other canonical skills already in master.
2. **No body edits**: The skill body is mature and stable. Rather than "improving" it, we preserved it verbatim to avoid introducing drift. The only change is the enriched front-matter.
3. **Internal relative paths preserved**: The reference to `../../skills-protocol.md` is kept as-is. This assumes the master repo will eventually host `skills-protocol.md` at root, consistent with both source repos.

## Open Questions

1. Should `saas-landing` be generalized to `product-landing` to cover non-SaaS products (e.g., physical goods, services)? The triggers already include "marketing page" and "product landing".
2. The skill has no `example.html` or starter template. Should we add a canonical `example.html` like `kami-landing` and `open-design-landing` have?
3. Should the self-check list be expanded with accessibility checks (e.g., Lighthouse a11y score, color contrast) now that `craft: anti-ai-slop` is required?
