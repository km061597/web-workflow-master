# Decision Log: AGENTS.md

## Sources
- `WEBSITES/AGENTS.md` (WEBSITES)
- `design-self-create/AGENTS.md` (design-self-create)
- `desigjn-toolkit/site/AGENTS.md` (desigjn-toolkit — not in function group but exists)

## Kept From
- **WEBSITES**: Agent dispatch rules, role definitions (Planner/Executor/Critic/Memory), coordination patterns, agent selection matrix, communication format, escalation rules, workspace-specific patterns (design system build, new client site, maintenance update, migration)
- **design-self-create**: Coordination principles, statelessness rule, forbidden patterns
- **desigjn-toolkit/site/AGENTS.md**: Project structure context (site/ directory layout)

## Merged From
- Combined WEBSITES' detailed dispatch rules with design-self-create's coordination principles into unified coordination contract
- Merged agent selection matrix — added gsd-design agents (mobile-web-specialist, performance-engineer, etc.) to WEBSITES' matrix
- Added mobile-first and quality-gate rules from both versions
- Unified forbidden patterns list from both sources

## Rejected
- **WEBSITES' specific prompt references**: Removed references to "Prompt ①", "Prompt ②" etc. that were WEBSITES-specific pipeline prompts. Those belong in the WEBSITES-specific ops docs.
- **design-self-create's `AGENTS.md` project structure**: Replaced with the unified project structure from desigjn-toolkit/gsd-design.
- **Any file paths referencing `/Users/kylemetzger/`**: Replaced with relative paths.

## Tradeoffs
- **Table vs text dispatch**: Kept the matrix table for quick reference but also kept the detailed workflow patterns for complex projects.
- **Statelessness**: Explicitly declared agents are stateless to prevent confusion. All context is in workspace files.

## Open Questions
- Should the Planner/Executor/Critic/Memory abstraction be mapped to specific agent files? The current model leaves it as conceptual roles rather than concrete agents.
- How does `art-director` relate to the "Planner" role? `art-director` is the implementation of the Planner role for design tasks.
