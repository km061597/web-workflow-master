# Agents Consolidation: 30 → 15

## Dropped Agents → Folded Into Surviving Agents

| Dropped Agent | Folded Into | Reasoning |
|--------------|-------------|-----------|
| color-theorist | design-system-agent | Palette generation, contrast ratios, color story |
| typography-specialist | design-system-agent | Type scale, font pairing, hierarchy |
| iconographer | design-system-agent | Icon system design, SVG optimization |
| illustration-director | design-system-agent | Illustration direction, art direction |
| layout-agent | design-system-agent | Grid systems, spacing scale |
| component-librarian | design-system-agent | Component library management |
| responsive-engineer | ui-engineer | Responsive breakpoints, mobile-first patterns |
| mobile-web-specialist | ui-engineer | Mobile UX, touch targets, viewport, iOS quirks |
| touch-interaction-designer | interaction-engineer | Touch gestures, interaction patterns |
| copy-editor | content-modeler | Content editing, tone consistency |
| device-tester | accessibility-auditor | Cross-device testing, viewport validation |
| e2e-tester | accessibility-auditor | Playwright user-journey coverage, visual snapshots |
| visual-qa-agent | art-director | Visual quality assurance, design review |
| analytics-wirer | performance-engineer | Analytics integration, performance monitoring |
| security-reviewer | performance-engineer | Security headers, CSP, best practices |
| image-pipeliner | performance-engineer | Image optimization, lazy loading |
| seo-specialist | brand-strategist | SEO strategy, meta tags, structured data |

## Surviving 15 Agents

| # | Agent | File | Role | Gate |
|---|-------|------|------|------|
| 1 | intake-interviewer | `.claude/agents/intake-interviewer.md` | Gate 1: requirements, schema fill, gap detection | Discovery |
| 2 | research-agent | `.claude/agents/research-agent.md` | Competitor teardowns + deep site extraction | Discovery |
| 3 | exemplar-curator | `.claude/agents/exemplar-curator.md` | Per-project tier-a+ shortlist | Discovery |
| 4 | brand-strategist | `.claude/agents/brand-strategist.md` | Positioning, voice, naming + SEO absorbed | Strategy |
| 5 | content-modeler | `.claude/agents/content-modeler.md` | CMS schema + copy-editing tone absorbed | Strategy |
| 6 | art-director | `.claude/agents/art-director.md` | Orchestration, final taste call + visual-qa absorbed | Strategy |
| 7 | design-system-agent | `.claude/agents/design-system-agent.md` | Tokens, themes, color, type, layout, icons, illustration | Design |
| 8 | variant-orchestrator | `.claude/agents/variant-orchestrator.md` | Spawn 3 parallel directions from one brief | Design |
| 9 | animation-agent | `.claude/agents/animation-agent.md` | GSAP + Framer Motion, scroll reveals | Design |
| 10 | ui-engineer | `.claude/agents/ui-engineer.md` | React/Tailwind/shadcn + responsive + mobile absorbed | Implementation |
| 11 | interaction-engineer | `.claude/agents/interaction-engineer.md` | Forms, focus, keyboard, touch gestures absorbed | Implementation |
| 12 | accessibility-auditor | `.claude/agents/accessibility-auditor.md` | WCAG 2.2 AA + e2e + device testing absorbed | Quality |
| 13 | performance-engineer | `.claude/agents/performance-engineer.md` | CWV + analytics + security + images absorbed | Quality |
| 14 | design-critic | `.claude/agents/design-critic.md` | Adversarial review, AI-slop hunting | Quality |
| 15 | shipper | `.claude/agents/shipper.md` | Vercel deploy + canary monitoring | Ship |

## Synthesized / Renamed Roles

| Old | New | Rationale |
|-----|-----|-----------|
| design-researcher + site-cloner | **research-agent** | Both discovery modes (broad research + deep extraction) share the same output principle: extracted values, not vibes. Keeping them separate caused confusion about which to dispatch. |
| (new) | **intake-interviewer** | No formal intake agent existed in the 30-agent set. Added as Gate 1 to ensure every project starts with structured requirements. |
| (new) | **exemplar-curator** | Exemplar management was implicit. Extracting it ensures per-project curation, not passive reference. |
| (new) | **variant-orchestrator** | Variant exploration was ad-hoc. Formalizing it ensures clients get real choices, not one direction with tweaks. |

## Files Removed

- `.claude/agents/design-researcher.md` → merged into `research-agent.md`
- `.claude/agents/site-cloner.md` → merged into `research-agent.md`
- `.claude/agents/e2e-tester.md` → folded into `accessibility-auditor.md`

## Files Added

- `.claude/agents/intake-interviewer.md` — new synthesized role
- `.claude/agents/research-agent.md` — consolidated from design-researcher + site-cloner
- `.claude/agents/exemplar-curator.md` — new synthesized role
- `.claude/agents/variant-orchestrator.md` — new synthesized role

## Root Doc Updates

- `CLAUDE.md` — agent table updated to 15 agents; stale memory/quality refs marked TODO
- `AGENTS.md` — selection matrix + dispatch patterns updated to 15 agents
- `WORKSPACE.md` — quality/ship-gate.sh and .claude/memory/ refs marked TODO
