# Decision Log: Memory Workflow Files

## Sources
- `desigjn-toolkit/.claude/memory/MEMORY_INDEX.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/REFERENCE_INDEX.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/CLIENT_MIGRATION_WORKFLOW.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/MAINTENANCE_WORKFLOW.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/COMPETITOR_RESEARCH_WORKFLOW.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/BRAND_BOOTSTRAP_WORKFLOW.md` (desigjn-toolkit)
- `desigjn-toolkit/.claude/memory/AUTONOMOUS_WORKFLOW.md` (desigjn-toolkit)

## Kept From
- **desigjn-toolkit**: All 6 workflow files and MEMORY_INDEX.md kept largely intact. These are high-quality, well-structured project memory files with clear frontmatter, structured tables, and actionable processes.

## Merged From
- Minor cross-references between workflow files unified (e.g., `COMPETITOR_RESEARCH_WORKFLOW.md` referenced by both `BRAND_BOOTSTRAP_WORKFLOW.md` and `AUTONOMOUS_WORKFLOW.md`)
- `AUTONOMOUS_WORKFLOW.md` enhanced with mobile-first references from gsd-design's MOBILE.md philosophy

## Rejected
- No content rejected — these files only exist in desigjn-toolkit and are the canonical versions.
- gsd-design had equivalent concepts in `playbooks/` directory but they were problem-specific depth playbooks, not workflow memory files. Both coexist.
- WEBSITES and design-self-create had no equivalent workflow memory files.

## Tradeoffs
- **Kept separate files vs merged into one**: Kept as 6 separate files + MEMORY_INDEX.md for readability and targeted loading. MEMORY_INDEX.md serves as the router.
- **Frontmatter format**: Kept YAML frontmatter with `name`, `description`, `type` fields from desigjn-toolkit format. This is the SKILL.md-style format requested.

## Open Questions
- Should `MOBILE.md` (from gsd-design) be added to the core memory index? It's referenced in AUTONOMOUS_WORKFLOW.md but not listed in MEMORY_INDEX.md's core table. Added a reference in AUTONOMOUS_WORKFLOW.md but kept it out of the core table to avoid bloating the always-read list.
