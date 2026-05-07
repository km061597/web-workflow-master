# Decision Log: Skills

## Sources
- `desigjn-toolkit/.claude/skills/` — 4 custom skills (frontend-aesthetics, design-research, visual-qa, add-component)
- `gsd-design/.claude/skills/anthropic-skill-creator/` — 1 skill with 3 sub-agents (analyzer, comparator, grader)

## Kept From
- **desigjn-toolkit**: All 4 custom skills copied as-is. These are workspace-specific skills for anti-slop design, research, visual QA, and component addition.
- **gsd-design**: `anthropic-skill-creator` skill directory copied as-is with its 3 agent files (analyzer.md, comparator.md, grader.md).

## Merged From
- The desigjn-toolkit skills use the simple `.md` format at the skills root. The gsd-design skill uses a subdirectory with `SKILL.md` format. Both formats coexist.

## Rejected
- **gsd-design's other skills**: gsd-design had 72+ skill packages in `.claude/skills/` (taste-skill, web-prototype, saas-landing, gamified-app, image-poster, etc.). These were NOT copied because they are not part of the meta-orchestration function group and would bloat the workspace with 70+ skill directories. They can be added back if needed.
- **desigjn-toolkit's `skills-official/` and `skills-ecc/`**: Not part of the function group. These are external skill collections that should be cloned/downloaded separately.

## Tradeoffs
- **4 skills vs 70+ skills**: Kept only the workspace-specific custom skills. The 70+ gsd-design skills are a separate ecosystem that can be reinstalled if needed. This keeps the synthesis focused on meta-orchestration.

## Open Questions
- Should `frontend-aesthetics.md` be reformatted with YAML frontmatter (name, description, type) to match the skill format? Currently it uses the simpler desigjn-toolkit format. Left as-is for compatibility.
