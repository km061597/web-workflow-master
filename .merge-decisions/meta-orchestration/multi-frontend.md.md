# Decision Log: multi-frontend.md

## Sources
- `desigjn-toolkit/.claude/skills-ecc/multi-frontend.md` (desigjn-toolkit)
- `gsd-design/.claude/commands/multi-frontend.md` (gsd-design)

## Kept From
- Both files were **byte-identical**. Kept the content from either source.

## Merged From
- Nothing to merge — identical content.

## Rejected
- **Hardcoded paths** (`~/.claude/bin/codeagent-wrapper`, `~/.claude/.ccg/prompts/`): These are internal paths that may not exist in all installations. Kept them because they are part of the command's specification — the command only works if those paths exist. No generic alternative available.

## Tradeoffs
- Placed in both `.claude/commands/` (Claude Code command format) and retained in the skills ecosystem. The command format is the canonical location.

## Open Questions
- The multi-frontend command depends on external binaries (`codeagent-wrapper`) that may not be present in all environments. Should this be marked as "optional" or "requires setup"? Left as-is for now.
