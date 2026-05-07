# Decision Log: WORKFLOW.md

## Sources

| Source File | Version | Description |
|-------------|---------|-------------|
| `.claude/memory/AUTONOMOUS_WORKFLOW.md` | desigjn-toolkit v1 | How the AI operates autonomously — phases 1-5, escalation paths, self-correction |
| `.claude/memory/MEMORY_INDEX.md` | desigjn-toolkit v1 | Index of all persistent memory files, reference repos, scripts, site code |

## Kept From

- **AUTONOMOUS_WORKFLOW.md**: All 5 phases (Discovery, Shape, Build, Polish, Verify), new project workflow, maintenance workflow reference, migration workflow reference, escalation paths, self-correction rules, "Never" list.
- **MEMORY_INDEX.md**: All tables — Core Memory, Task Memory, Scripts, Site Code, Reference Repos. Kept all file cross-references.

## Merged From

- Combined into one document: the workflow is the primary content; the memory index becomes a reference appendix.
- Updated MEMORY_INDEX cross-references to point to the emitted artifact names (for example `COMPONENT_AND_ANIMATION_REGISTRY.md` instead of separate component/animation registries, `ANTI_SLOP_GUIDE.md` instead of anti-pattern source files, and `BUILD_GOTCHAS.md` + `QUALITY_GATES.md` instead of the source build guide). Design-spec references are marked TODO pending owner for the design-spec function group.
- Removed MEMORY_INDEX's duplicate entries for `ANIMATION_REGISTRY.md` and `COMMUNITY_SKILLS_ECOSYSTEM.md` (they appeared twice in the original).
- Reorganized the index into a cleaner 4-table structure: Core Memory, Task Memory, Scripts, Site Code, Reference Repos.

## Rejected

- The "Workflow Memory" and "Decision Memory" sub-tables from MEMORY_INDEX.md were flattened into the main tables. The original 5-table structure (Core, Workflow, Decision, Task, Scripts, Site Code, Reference) was too granular for a synthesized index.
- The "Skills and References" detailed content (skill architecture, community ecosystem) was NOT merged here; it lives in its own canonical file `SKILLS_AND_REFERENCES.md`. Only cross-references are kept in the index.

## Tradeoffs

- **Tradeoff**: The workflow document is now "self-aware" — it contains its own table of contents. This creates a small circularity (the index references the file that contains the index), but in practice this is valuable: the AI reads the workflow first, then has the index at hand without opening a second file.
- **Tradeoff**: The MEMORY_INDEX was originally described as "Read these files at the start of every design task." Now that instruction is implicit in the workflow's Phase 1 Step 3 ("Check memory"). The explicit instruction is preserved in the index heading.

## Open Questions

- Should the workflow include a "Pre-Flight Checklist" (a distilled 5-bullet version of Phase 1) at the very top for quick reference?
- Former workflow references such as competitor research, maintenance, and migration are now routed to `CLIENT_LIFECYCLE.md` and `CLIENT_OPERATIONS.md`; no standalone client project guide is emitted in this PR.
