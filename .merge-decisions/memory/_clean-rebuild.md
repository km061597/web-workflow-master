# memory function group — Clean Rebuild

Rebuilt from clean main (53ab2d0) with ONLY memory files.

Removed contamination:
- All .claude/agents/ (belongs to PR #6 meta-orchestration)
- All .claude/skills/ (belongs to PR #11 build)
- .merge-decisions/meta-orchestration/ (belongs to PR #6)
- .merge-decisions/scaffold/ (belongs to PR #7)
- scaffolds/ (belongs to PR #7)
- inventory/ (belongs to PR #6/docs)
- DESIGN_SPEC.md + DESIGN_SYSTEM.md (moved to PR #9 design-spec)
- BUILD_GUIDE.md → split into BUILD_GOTCHAS.md + QUALITY_GATES.md
- CLIENT_PROJECT_GUIDE.md → split into CLIENT_LIFECYCLE.md + CLIENT_OPERATIONS.md

Artifacts: 9 memory files + 9 decision logs
