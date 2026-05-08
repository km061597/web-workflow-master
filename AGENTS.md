# AGENTS.md — Agent Coordination Rules

## Purpose

This document defines how AI agents collaborate within this workspace. It is the coordination contract — not the agent definitions themselves (those live in `.claude/agents/*.md`).

## Roles

### Planner
The **Planner** is the routing layer. It analyzes the user's request, breaks it into sub-tasks, and assigns them to the right agents. It never writes code. Its output is a plan.

### Executor
The **Executor** is the doer. It writes code, edits files, runs commands. It reports back to the Planner.

### Critic
The **Critic** reviews work for quality. It files issues, suggests fixes. It is adversarial — its job is to find what's wrong.

### Memory
The **Memory** agent manages persistent state — logs, decisions, specs. It writes to `.claude/memory/` — **TODO pending owner** (quality function group) — and reads from it.

## Dispatch Rules

### 1. Single Agent Mode (Default)
For simple, well-defined tasks (one component, one page, one bug fix), the active agent handles the entire task. No dispatch needed.

### 2. Sequential Multi-Agent (Complex Tasks)
For multi-step work with dependencies, dispatch agents in sequence:

```
research-agent → design-system-agent → ui-engineer → accessibility-auditor
```

Each agent receives the output of the previous as context.

### 3. Parallel Multi-Agent (Independent Work)
When sub-tasks have no dependencies, dispatch in parallel:

```
ui-engineer ‖ accessibility-auditor ‖ performance-engineer
```

All three can run simultaneously on different aspects of the same component.

### 4. Orchestrator Pattern (Large Projects)
For large projects (full site builds, migrations), use `art-director` as orchestrator:

```
art-director dispatches:
  - brand-strategist
  - research-agent
  - design-system-agent
  - ui-engineer
  - animation-agent
  - accessibility-auditor
```

`art-director` synthesizes outputs and makes final taste calls.

### 5. Critic Pattern (Pre-Ship)
Before declaring any work complete, run `design-critic`:

```
executor completes work
  ↓
design-critic reviews (adversarial)
  ↓
if issues found → executor fixes → critic re-reviews
  ↓
if clean → ship
```

## Agent Selection Matrix

| Task Type | Primary Agent | Secondary | Critic |
|---|---|---|---|
| New project intake | `intake-interviewer` | — | `design-critic` |
| Research / teardown | `research-agent` | `exemplar-curator` | `design-critic` |
| Variant exploration | `variant-orchestrator` | — | `design-critic` |
| Brand identity | `brand-strategist` | `research-agent` | `design-critic` |
| Design system | `design-system-agent` | — | `design-critic` |
| Component build | `ui-engineer` | `animation-agent` | `design-critic` |
| Animation | `animation-agent` | — | `design-critic` |
| QA / Testing | `accessibility-auditor` | `performance-engineer` | — |
| Mobile fix | `ui-engineer` (mobile absorbed) | `interaction-engineer` | `accessibility-auditor` |
| Performance | `performance-engineer` | — | `design-critic` |
| SEO | `brand-strategist` (SEO absorbed) | `content-modeler` | — |
| Migration | `art-director` | all specialists | `design-critic` |
| Content model | `content-modeler` | — | `design-critic` |

## Coordination Rules

1. **No agent works on main** — always use feature branches (`update/<description>`)
2. **Spec before code** — Planner must produce a spec; Executor must follow it
3. **Critic is mandatory before ship** — every deliverable passes critic review
4. **Memory is updated after every structural change** — component registry, decisions log
5. **Mobile-first for all UI work** — test at 375px before desktop
6. **Quality gates are non-negotiable** — failing gates = not done
7. **Parallel where possible** — independent work runs in parallel to save time
8. **Serial where dependent** — downstream agents need upstream output

## Communication Format

When an agent reports back to the Planner, it must include:

```markdown
## Status: [complete | blocked | needs-clarification]
## Files Changed
- `path/to/file` — what changed
## Decisions Made
- Decision and rationale
## Issues Found
- [ ] Issue description (file:line)
## Next Steps
1. What needs to happen next
```

## Escalation

| Situation | Action |
|---|---|
| Task exceeds agent scope | Planner re-analyzes and adds agents |
| Agent fails 3 times | Escalate to user with context |
| Conflicting requirements | Planner stops, asks user for priority |
| Quality gate fails | Agent must fix; no shipping with failing gates |
| Agent dependency loop | Planner detects cycle, breaks with priority order |

## Workspace-Specific Patterns

### Autoplan Board

Autoplan Board v1 is the agent-operable dashboard for this repository. Treat [docs/AUTOPLAN_BOARD.md](docs/AUTOPLAN_BOARD.md) as the routing contract before assigning Claude, Kimi, Gemini, or Codex work against the board.

Required packet for any Autoplan worker:

- Scope: `tools/autoplan-board/`, root dashboard scripts, `scripts/ship-gate.mjs`, `evidence/autoplan/`, and `docs/reviews/autoplan-board-*.md`.
- Commands: `npm run dashboard:verify`, `npm run dashboard:test`, `npm run dashboard:smoke`, `npm run dashboard:refresh`, `npm run verify`, and `npm run ship-gate` when claiming local readiness.
- Evidence: `evidence/autoplan/board-refresh.json`, `evidence/autoplan/browser-smoke.json`, `evidence/autoplan/ship-gate.json`, desktop/mobile screenshots, completion audit, and external review log.
- Stop condition: code-side gates can be green while GitHub remains `REVIEW_REQUIRED`; CODEOWNERS approval is a human process gate.

### Design System Build
```
design-system-agent → ui-engineer ‖ animation-agent → design-critic → ship
```

### New Client Site
```
intake-interviewer → research-agent → exemplar-curator → brand-strategist →
  design-system-agent → variant-orchestrator (parallel concepts) →
  ui-engineer → interaction-engineer →
  accessibility-auditor ‖ performance-engineer →
  design-critic → shipper
```

### Maintenance Update
```
planner scopes change → ui-engineer fixes → accessibility-auditor verifies → shipper deploys
```

### Migration (Existing → New)
```
art-director plans → research-agent audits old site →
  ui-engineer rebuilds →
  accessibility-auditor validates (old vs new) → design-critic → shipper
```

## Agent State

Agents are stateless. All context comes from:
1. The plan/spec given by the Planner
2. Files in the workspace
3. `.claude/memory/` persistent memory — **TODO pending owner** (quality function group)

No agent maintains internal state between invocations. State is in the workspace, not in the agent.

## Forbidden Patterns

- ❌ Agent dispatches to itself recursively
- ❌ Two agents edit the same file simultaneously without coordination
- ❌ Critic proposes fixes instead of filing issues (separation of concerns)
- ❌ Executor skips tests because "it's a small change"
- ❌ Planner dispatches without a written plan
- ❌ Any agent works directly on `main` branch
- ❌ Mobile treated as a "polish pass" — it is the lead surface
