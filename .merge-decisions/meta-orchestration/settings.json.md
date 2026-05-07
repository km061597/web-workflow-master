# Decision Log: .claude/settings.json

## Sources
- `desigjn-toolkit/.claude/settings.json` (desigjn-toolkit)
- `gsd-design/.mcp.json` (gsd-design)

## Kept From
- **desigjn-toolkit**: Core JSON schema, env vars (sans secrets), permission patterns, hook system (SessionStart, Stop, PostToolUse), mcpServers block structure
- **gsd-design**: Additional MCP servers (shadcn, context7, chrome-devtools), additional Read/Write permissions for sites/quality/conventions/exemplars

## Merged From
- Combined both MCP server lists into a single `mcpServers` block
- Merged permission patterns: added sites/**, quality/**, conventions/**, exemplars/** read permissions from gsd-design
- Kept the hook system from desigjn-toolkit (more mature than gsd-design's simple env setup)

## Rejected
- **gsd-design's `gsd-workflow` MCP**: Hardcoded absolute paths to /Users/kylemetzger/.npm-global/ — not portable. Removed.
- **All actual API keys**: Replaced with `${env:...}` placeholders. Real keys must be set via environment or .env.
- **gsd-design's hardcoded paths**: `cwd: /Users/kylemetzger/Projects/gsd-design` etc. — replaced with env references.
- **gsd-design's `browserbase` run-mcp.sh wrapper**: Replaced with direct npx invocation for simplicity.

## Tradeoffs
- **Single file vs split**: Kept everything in `.claude/settings.json` (Claude Code native) rather than a separate `.mcp.json`. The Claude Code settings format is the canonical way.
- **5 MCP servers vs 6**: Removed `gsd-workflow` because it's not portable and adds GSD-specific coupling. The remaining 5 cover all core needs.
- **Permissions**: Expanded to include gsd-design's workspace directories (sites/, quality/, conventions/, exemplars/) while keeping desigjn-toolkit's site/ refs/ paths.

## Open Questions
- Should `browserbase` remain given its paid nature? Kept as backup but marked "paid backup" in description.
- Should `firecrawl-cli` be preferred over the firecrawl MCP server for cost? The MCP is more convenient for AI-driven workflows; CLI is for manual use.
