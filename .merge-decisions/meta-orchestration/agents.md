# Decision Log: Agent Consolidation (Final — 15 Agents)

## Sources
- `desigjn-toolkit/.claude/agents/*.md` — 5 agents (design-system-agent, animation-agent, layout-agent, qa-visual-agent, research-agent)
- `gsd-design/.claude/agents/*.md` — 30 agents (art-director, design-critic, brand-strategist, design-researcher, design-system-architect, typography-specialist, color-theorist, layout-architect, motion-designer, illustration-director, iconographer, ui-engineer, component-librarian, responsive-engineer, mobile-web-specialist, touch-interaction-designer, interaction-engineer, device-tester, visual-qa, accessibility-auditor, performance-engineer, seo-specialist, copy-editor, e2e-tester, security-reviewer, shipper, analytics-wirer, content-modeler, image-pipeliner, site-cloner)

## Final Decision: Consolidate 30 → 15

The 4-phase canonical pipeline (Intake → Discovery → Design → Build → Quality → Ship) does not need 30 hyper-specialized agents. Many gsd-design agents are over-specialized for a single-operator agency. Consolidated to 15 essential agents, each with explicit absorbed-concerns sections documenting folded responsibilities.

### Surviving 15 Agents

| # | Agent | File | Origin | Absorbed From |
|---|-------|------|--------|---------------|
| 1 | intake-interviewer | `.claude/agents/intake-interviewer.md` | **Synthesized** — new role | (none — formalizes ad-hoc intake) |
| 2 | research-agent | `.claude/agents/research-agent.md` | **Merged** — desigjn-toolkit research-agent + gsd-design design-researcher + site-cloner | design-researcher, site-cloner |
| 3 | exemplar-curator | `.claude/agents/exemplar-curator.md` | **Synthesized** — new role | (none — extracts implicit exemplar management) |
| 4 | brand-strategist | `.claude/agents/brand-strategist.md` | gsd-design | seo-specialist |
| 5 | content-modeler | `.claude/agents/content-modeler.md` | gsd-design | copy-editor |
| 6 | art-director | `.claude/agents/art-director.md` | gsd-design | visual-qa-agent |
| 7 | design-system-agent | `.claude/agents/design-system-agent.md` | **Merged** — desigjn-toolkit + gsd-design | color-theorist, typography-specialist, iconographer, illustration-director, layout-agent, component-librarian |
| 8 | variant-orchestrator | `.claude/agents/variant-orchestrator.md` | **Synthesized** — new role | (none — formalizes ad-hoc variant exploration) |
| 9 | animation-agent | `.claude/agents/animation-agent.md` | **Merged** — desigjn-toolkit + gsd-design | motion-designer |
| 10 | ui-engineer | `.claude/agents/ui-engineer.md` | gsd-design | responsive-engineer, mobile-web-specialist |
| 11 | interaction-engineer | `.claude/agents/interaction-engineer.md` | gsd-design | touch-interaction-designer |
| 12 | accessibility-auditor | `.claude/agents/accessibility-auditor.md` | gsd-design | e2e-tester, device-tester |
| 13 | performance-engineer | `.claude/agents/performance-engineer.md` | gsd-design | analytics-wirer, security-reviewer, image-pipeliner |
| 14 | design-critic | `.claude/agents/design-critic.md` | gsd-design | (none — adversarial reviewer, no fold) |
| 15 | shipper | `.claude/agents/shipper.md` | gsd-design | (none — terminal deploy gate, no fold) |

### Dropped Agents (folded into surviving agents above)

| Dropped Agent | Folded Into | Key Responsibilities Absorbed |
|--------------|-------------|------------------------------|
| color-theorist | design-system-agent | Palette generation, contrast validation, color story |
| typography-specialist | design-system-agent | Font pairing, type scale, hierarchy, self-hosting |
| iconographer | design-system-agent | Icon system design, SVG optimization, Lucide vs custom |
| illustration-director | design-system-agent | Art direction for generated imagery, photography curation |
| layout-agent | design-system-agent | Grid systems, spacing scale, page composition |
| component-librarian | design-system-agent | Component library organization, variant taxonomy |
| responsive-engineer | ui-engineer | Multi-viewport correctness, breakpoint discipline |
| mobile-web-specialist | ui-engineer | Viewport handling, touch targets, iOS Safari quirks, PWA |
| touch-interaction-designer | interaction-engineer | Gesture specs, thresholds, haptics, Pointer Events API |
| copy-editor | content-modeler | UI copy, microcopy, tone consistency, banned-words filtering |
| device-tester | accessibility-auditor | Cross-device matrix, viewport validation, touch-target verification |
| e2e-tester | accessibility-auditor | Playwright journeys, visual snapshots, data-testid enforcement |
| visual-qa-agent | art-director | Screenshot verification, pixel-diff, responsive matrix |
| analytics-wirer | performance-engineer | GA4/Plausible events, funnel tracking, CWV reporting |
| security-reviewer | performance-engineer | CSP, HSTS, dependency audit, secrets hygiene |
| image-pipeliner | performance-engineer | AVIF/WebP generation, responsive srcset, CDN config |
| seo-specialist | brand-strategist | Meta tags, schema.org, sitemap, OG tags, keyword alignment |
| design-researcher | research-agent | Moodboard curation, competitor teardowns, pattern synthesis |
| site-cloner | research-agent | Reverse-engineering, token extraction, component inventory |

### Removed Files

- `.claude/agents/design-researcher.md` — merged into `research-agent.md`
- `.claude/agents/site-cloner.md` — merged into `research-agent.md`
- `.claude/agents/e2e-tester.md` — folded into `accessibility-auditor.md`
- `.claude/agents/design-system-architect.md` — superseded by `design-system-agent.md`
- `.claude/agents/motion-designer.md` — superseded by `animation-agent.md`
- `.claude/agents/layout-architect.md` — superseded by `design-system-agent.md`
- `.claude/agents/visual-qa.md` — superseded by `art-director.md`
- `.claude/agents/color-theorist.md` — folded into `design-system-agent.md`
- `.claude/agents/typography-specialist.md` — folded into `design-system-agent.md`
- `.claude/agents/iconographer.md` — folded into `design-system-agent.md`
- `.claude/agents/illustration-director.md` — folded into `design-system-agent.md`
- `.claude/agents/layout-agent.md` — folded into `design-system-agent.md`
- `.claude/agents/component-librarian.md` — folded into `design-system-agent.md`
- `.claude/agents/responsive-engineer.md` — folded into `ui-engineer.md`
- `.claude/agents/mobile-web-specialist.md` — folded into `ui-engineer.md`
- `.claude/agents/touch-interaction-designer.md` — folded into `interaction-engineer.md`
- `.claude/agents/copy-editor.md` — folded into `content-modeler.md`
- `.claude/agents/device-tester.md` — folded into `accessibility-auditor.md`
- `.claude/agents/analytics-wirer.md` — folded into `performance-engineer.md`
- `.claude/agents/security-reviewer.md` — folded into `performance-engineer.md`
- `.claude/agents/image-pipeliner.md` — folded into `performance-engineer.md`
- `.claude/agents/seo-specialist.md` — folded into `brand-strategist.md`

### Files Added (new synthesized roles)

- `.claude/agents/intake-interviewer.md` — Gate 1: structured requirements gathering
- `.claude/agents/research-agent.md` — Consolidated discovery (broad + deep modes)
- `.claude/agents/exemplar-curator.md` — Per-project tier-a+ reference shortlist
- `.claude/agents/variant-orchestrator.md` — 3 parallel design directions from one brief

### Consolidation Verification

Every surviving agent file contains an `## Absorbed concerns (consolidated)` section explicitly documenting:
1. Which dropped agents were folded into this role
2. What specific responsibilities were absorbed
3. Why the fold makes sense (shared output principle or complementary scope)

Root docs updated to dispatch only the 15 surviving canonical agents:
- `CLAUDE.md` — agent table updated, stale memory/quality refs marked TODO
- `AGENTS.md` — selection matrix + dispatch patterns updated
- `PLAYBOOKS.md` — workflow recipes route to surviving agents only
- `WORKSPACE.md` — stale quality/ship refs marked TODO pending owner

## Tradeoffs

- **Fewer agents = simpler dispatch**: 15 agents vs 30 reduces cognitive load for the operator deciding which to invoke. Each surviving agent has broader scope but clear boundaries.
- **Absorbed concerns sections**: Explicit documentation of folded responsibilities prevents capability loss. Future refinements can extract roles back out if the absorbed scope proves too wide.
- **Model assignments preserved**: gsd-design's model assignments (opus for taste/strategy, sonnet for implementation) kept. `variant-orchestrator` and `art-director` use opus; `intake-interviewer` and `exemplar-curator` use sonnet.
- **File naming**: Shorter desigjn-toolkit names (`design-system-agent`, `animation-agent`) preferred over gsd-design's verbose names (`design-system-architect`, `motion-designer`).

## Open Questions (resolved)

- ~~Should `touch-interaction-designer` + `interaction-engineer` be combined?~~ **Resolved: Yes** — folded into `interaction-engineer` with gesture-spec responsibility absorbed.
- ~~Should `component-librarian` be merged with `design-system-agent`?~~ **Resolved: Yes** — folded into `design-system-agent` with component inventory responsibility absorbed.
- ~~Should `e2e-tester` be separate from `accessibility-auditor`?~~ **Resolved: Folded** — e2e journeys are part of quality validation; accessibility-auditor already covers critical flow testing.
