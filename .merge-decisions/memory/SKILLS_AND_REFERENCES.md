# Decision Log: SKILLS_AND_REFERENCES.md

## Sources

| Source File | Version | Description |
|-------------|---------|-------------|
| `.claude/memory/REFERENCE_INDEX.md` | desigjn-toolkit v1 | 21 reference repos organized by design phase |
| `.claude/memory/SKILL_ARCHITECTURE.md` | desigjn-toolkit v1 | Skill architecture patterns — Capability Uplift vs Encoded Preference |
| `.claude/memory/COMMUNITY_SKILLS_ECOSYSTEM.md` | desigjn-toolkit v1 | Community skills catalog with security notes |

## Kept From

- **REFERENCE_INDEX.md**: All 21 repos across 5 phases (Research, Design, Build, Quality, Reference Only), rules section.
- **SKILL_ARCHITECTURE.md**: Two-kinds framework, progressive disclosure tiers, open standard YAML contract, installation scopes, design rules.
- **COMMUNITY_SKILLS_ECOSYSTEM.md**: Worth-installing table, installation commands, video generation section, wilwaldon toolkit, most-installed skills list, security warning.

## Merged From

- Combined into one document with 3 sections: Reference Index, Skill Architecture, Community Skills Ecosystem.
- Added cross-references between sections: the Reference Index's "impeccable" entry now connects to the Skill Architecture's "Encoded Preference" concept; the Community Skills table's "taste-skill" entry references the Reference Index's taste-skill catalog entry.
- Removed duplicate animation registry and community skills entries that appeared twice in the source index; emitted content now lives in `COMPONENT_AND_ANIMATION_REGISTRY.md` and `SKILLS_AND_REFERENCES.md`.
- Kept the Snyk security warning prominent at the end of the Community Skills section.

## Rejected

- The "Video Generation (Remotion + Claude Code)" section was kept but trimmed slightly. The original had extensive Remotion code examples that felt more like a tutorial than a reference. Kept the core pattern (`useCurrentFrame` + `interpolate`) and the ecosystem links, removed the longer scaffolding narrative.

## Tradeoffs

- **Tradeoff**: Three distinct topics (reference repos, skill theory, community catalog) in one file. They share the theme of "external resources the AI can use" but serve different purposes (lookup vs. education vs. discovery). The single file works because all three are read infrequently and at similar times ("I need a skill for X" or "what repo should I check?").
- **Tradeoff**: The wilwaldon toolkit link is a GitHub URL. If it moves, the link rots. No way to prevent this; external links are inherently fragile.

## Open Questions

- Should the Reference Index include a "Last Verified" date column for external repos? Many repos (magicui, react-bits) are actively changing.
- Should the "Worth Installing" table be sorted by install count, category, or alphabetically? Currently it's a curated list without strict ordering.
