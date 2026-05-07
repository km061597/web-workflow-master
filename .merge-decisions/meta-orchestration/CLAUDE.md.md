# Decision Log: CLAUDE.md

## Sources
- `desigjn-toolkit/CLAUDE.md` (desigjn-toolkit)
- `gsd-design/CLAUDE.md` (gsd-design)
- `WEBSITES/CLAUDE.md` (WEBSITES)
- `design-self-create/CLAUDE.md` (design-self-create)

## Kept From
- **desigjn-toolkit**: Stack definition (Next.js 16 / React 19 / Tailwind 4 / shadcn), project structure, quick commands table, design system specs, testing/QA section, reference repos list, anti-slop checklist (10-point), pre/post-task verification, skill listings, workflow: new page, workflow: component design, persistent memory section, rules
- **gsd-design**: Multi-site model (`sites/<name>/`), mobile-first mandate, quality enforcement directory structure (`quality/`, `conventions/`, `exemplars/`, `playbooks/`), 30-agent dispatch table with model assignments, playbooks index, ship workflow with parallel reviewer pattern, CLI tools inventory (unlighthouse, axe, sharp, svgo), mobile-first rules section
- **WEBSITES**: Business context section (Metzger Website Design brand, niche, tiers, sales rhythm), out-of-scope rules, read order for new sessions
- **design-self-create**: Not applicable — architecture decisions moved to separate ARCHITECTURE.md artifact; stack conflict resolved in favor of Next.js

## Merged From
- Combined desigjn-toolkit's `site/` single-project structure with gsd-design's `sites/` multi-site model into unified project structure showing both
- Merged agent tables: 5 desigjn-toolkit agents + 30 gsd-design agents, with overlapping roles unified (e.g., `qa-visual-agent` renamed `visual-qa-agent` to match gsd-design naming while keeping desigjn-toolkit content)
- Merged quality systems: desigjn-toolkit's 4-gate verification + gsd-design's ship-gate/sh mobile CWV system
- Merged skill ecosystems: desigjn-toolkit's 3 custom + 6 official + 4 ECC + impeccable + taste-skill with gsd-design's expanded skill catalog

## Rejected
- **design-self-create's Astro 5 stack**: Explicitly rejected in favor of Next.js 16 (desigjn-toolkit as stack base per instructions). Astro 5 architecture decisions preserved in separate ARCHITECTURE.md for reference but not used as active stack.
- **gsd-design's `Remix` as default**: Rejected — Next.js 16 is the canonical framework.
- **WEBSITES' separate `.mcp.json`**: WEBSITES had no actual MCP config file (file missing in inputs). Its conceptual MCP usage merged into the settings.json artifact.
- **gsd-design's `PLAYBOOKS.md` inline dispatch**: The full 15-playbook dispatch chains from gsd-design's PLAYBOOKS.md are too large for CLAUDE.md. Referenced via "See PLAYBOOKS.md" link instead. Key ship workflow kept inline.
- **desigjn-toolkit's `surf CLI v2.7.2` version pin**: Removed version number to avoid staleness.
- **gsd-design's per-site `vite` / `remix` alternatives**: Removed from default stack section — workspace defaults to Next.js. Per-site framework choice is an escape hatch, not the standard.

## Tradeoffs
- **Single-project vs multi-site**: Kept both `site/` (single Next.js app) and `sites/<name>/` (multi-site) in project structure. The workspace supports both modes.
- **30 agents in table vs inline dispatch**: Kept compact table in CLAUDE.md; full agent specs live in `.claude/agents/*.md` files. This balances referenceability with detail.
- **Business context in CLAUDE.md**: Added a "Business Context" section to anchor the workspace purpose. This could be removed if the workspace becomes generic, but for now it's the primary use case.
- **OKLCH vs HSL**: Kept OKLCH (from design-self-create and desigjn-toolkit) as the canonical color space. More correct than HSL for AI-generated palettes.
- **Geist vs Fontsource**: Listed both — Geist for Next.js projects, Fontsource as the self-hosted variable font option. Not contradictory, just context-dependent.

## Open Questions
- Should `sites/<name>/` replace `site/` entirely, or keep both? Currently both exist to support single-project and multi-site workflows.
- The `ops/` directory contains business-specific sales templates. Should this be genericized or kept as-is? Kept as-is since it's the actual workspace purpose.
- `design-self-create` had a strong "zero JS shipped unless needed" philosophy with Astro. This is lost with Next.js. Could be partially recovered with Next.js App Router server components, but not fully.
- Mobile-first mandate from gsd-design may conflict with some desigjn-toolkit workflows that don't explicitly mention mobile in every step. The merged document adds mobile verification to all workflows.
