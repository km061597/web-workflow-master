# Merge Decision Log: scenario-routing.md

## Sources

| File | Version | sha256 (source) | sha256 (emitted) |
|---|---|---|---|
| `playbooks/scenario-routing.md` | gsd-design | `f2524f1d09f068268a76d6bbe5b75dc45086fe558c4d83284feda8da9645eca6` | `4f593b2273e58ff60ff66fdb4919b7167fbd9c960a2064acae8722449043e90f` |

Cross-checked for equivalents in:
- desigjn-toolkit — no scenario-routing playbook found
- open-design — no scenario-routing playbook found
- design-self-create — no scenario-routing playbook found
- WEBSITES — `prompts/03-discovery-spec.md` and `ops/sales/discovery-script.md` cover client intake but as a linear sales workflow, not as agent scenario routing

## Kept From

**gsd-design (100%)** — The gsd-design version is the sole source. All content preserved:

- Four scenarios (A: existing site, B: greenfield+brand, C: greenfield no brand, D: storefront/catalog)
- Per-scenario required playbooks list
- Per-scenario required artifacts list
- Scenario decision table (6 client conditions → scenario + first playbook)
- "What agents must not do" anti-rules (5 items)

## Merged From

Nothing merged — no other version contributed an equivalent artifact. Minor editorial canonicalization applied:

- Title-cased headings for consistency (`## The Four Scenarios`, `## Scenario Decision Table`, `## What Agents Must Not Do`)
- No semantic changes

Cross-referenced enrichment considered but rejected:
- WEBSITES `discovery-script.md` adds a "Red Flags" section (8 warning signs). This is valuable but belongs in an intake/sales playbook, not scenario routing. Noted as a candidate for `intake-greenfield.md` / `intake-existing-site.md` synthesis.
- WEBSITES `discovery-questionnaire.md` adds vertical-specific add-ons (jewelry). This is intake content, not scenario routing.

## Rejected

**WEBSITES `03-discovery-spec.md`** — 16-section build spec. Covers tier selection, page scope, image inventory, and copy voice. These are downstream outputs of scenario routing, not the routing logic itself. The gsd-design playbook focuses on selecting the right starting scenario; the WEBSITES doc focuses on what to produce after the scenario is chosen. Both can coexist; neither supersedes the other.

**WEBSITES `discovery-script.md`** — Sales call script with red flags. Valuable but belongs in the intake function group, not strategy.

**WEBSITES `discovery-questionnaire.md`** — 20-question client questionnaire. Again, intake function group. The scenario-routing playbook assumes the agent already knows the client's situation (via intake) and now must pick the right build workflow.

**desigjn-toolkit `SKILL_ARCHITECTURE.md`** — Describes skill registry topology. Not relevant to client scenario routing.

## Tradeoffs

1. **Scenario granularity: 4 scenarios vs. more/fewer**
   - *Decision:* Kept gsd-design's 4 scenarios (A, B, C, D).
   - *Rationale:* The 4-scenario model is battle-tested and covers the combinatorial space (existing vs. greenfield × brand vs. no-brand × storefront vs. no-storefront). WEBSITES does not have an explicit scenario model; it uses tier-based scoping (Starter/Standard/Premium) which is orthogonal. Adding tiers as scenarios would conflate "how big" with "what kind."

2. **Scenario D as an overlay vs. standalone**
   - *Decision:* Kept gsd-design's model: D is additive to A/B/C.
   - *Rationale:* A site can be both "existing site" and "storefront." The decision table correctly shows "Add D to A/B/C." WEBSITES treats storefront as a vertical (jewelry), which is a different axis. Both are valid; the overlay model is more flexible.

3. **Required artifacts list kept verbatim**
   - *Decision:* Preserved exact artifact filenames (`migration/urls-raw.txt`, `RESEARCH.md`, `IA.md`, etc.).
   - *Rationale:* These are contractual outputs of the scenario. Renaming them before the artifact naming convention is synthesized would break consistency.

## Open Questions

1. **Tier system integration:** WEBSITES uses Starter/Standard/Premium tiers. Should the scenario-routing playbook mention tier selection, or is that a separate sales/intake concern? Currently no tier concept exists in gsd-design.
2. **Scenario E — Migration-only:** Should there be a scenario for " migrate to new platform, no redesign" (preserve everything including design)? Currently Scenario A says "preserve and improve" which implies some change.
3. **Scenario F — Maintenance / update:** Should routine maintenance (content updates, plugin updates) be a scenario? Currently out of scope.
4. **Link to `bin/scaffold-site.sh`:** The playbook references this script. If the scaffold function group synthesizes a different tool, this reference needs updating.
