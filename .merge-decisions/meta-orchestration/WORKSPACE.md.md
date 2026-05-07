# Decision Log: WORKSPACE.md

## Sources
- `gsd-design/WORKSPACE.md` (gsd-design)

## Kept From
- **gsd-design**: Entire workspace overview kept with minor adaptations. The gsd-design WORKSPACE.md is the most comprehensive and well-organized workspace guide among all 4 versions.

## Merged From
- **desigjn-toolkit**: Added CLI tools from desigjn-toolkit that gsd-design didn't mention (surf CLI, firecrawl-cli). Merged into the CLI tools section.
- **desigjn-toolkit**: Added `site/` single-project directory alongside gsd-design's `sites/` multi-site model.
- **desigjn-toolkit**: Added design system specs (Next.js 16, React 19, Tailwind 4) to the default stack section.

## Rejected
- **gsd-design's `bin/` scripts**: Replaced with `scripts/` directory (desigjn-toolkit naming convention). The `bin/` directory had GSD-specific scripts (run-mcp.sh, scaffold-site.sh, advance-phase.sh, project-status.sh) that were tightly coupled to the GSD workflow system. Removed in favor of simpler `scripts/` structure.
- **gsd-design's `.gsd/` directory**: GSD workflow state is specific to gsd-design's proprietary workflow system. Removed.
- **gsd-design's `templates/` directory**: Listed but noted as optional — the canonical scaffolding is via `scripts/create-project.sh`.
- **gsd-design's 72 skills inventory**: Replaced with the consolidated skill list from the merged CLAUDE.md. The 72-skill list was too long and many were redundant.
- **Hardcoded paths** to /Users/kylemetzger/Projects/gsd-design: Removed.

## Tradeoffs
- **Simplified structure**: Removed GSD-specific directories (.gsd/, bin/) to make the workspace more generic and portable.
- **Next.js 16 vs 14**: Updated from gsd-design's "Next.js 14+" to "Next.js 16" to match the desigjn-toolkit stack base.

## Open Questions
- Should `templates/` be kept as a directory? gsd-design had 3 starter templates. Left out of the core layout for simplicity but could be added back.
