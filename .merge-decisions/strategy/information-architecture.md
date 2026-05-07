# Merge Decision Log: information-architecture.md

## Sources

| File | Version | sha256 (source) | sha256 (emitted) |
|---|---|---|---|
| `playbooks/information-architecture.md` | gsd-design | `52ab0ac3620e57131cca67f73b281a36a678adab2204660140bd084484bf8bf4` | `896cd4c019f5b1b6cb8768101ffc117c83a7c4d8c6e0eefa7c90c85a7b9a7680` |

Cross-checked for equivalents in:
- desigjn-toolkit — no IA playbook found
- open-design — `docs/architecture.md` covers system topology, not site IA
- design-self-create — `ARCHITECTURE.md` covers framework choices, not site IA
- WEBSITES — `prompts/03-discovery-spec.md` includes "Navigation Structure" but as a prompt output format, not a standalone playbook

## Kept From

**gsd-design (100%)** — The gsd-design version is the sole source. All content preserved:

- Core rule: every destination reachable by two logical routes
- Required `IA.md` sections template (User Jobs, Route Inventory, Navigation Model, Cross-Linking Rules, Empty-State Routes, Validation Evidence)
- Storefront-specific IA guidance (directed vs exploratory shopping)
- Navigation audit checklist (8 items)
- What to avoid list (5 anti-patterns)

## Merged From

Nothing merged — no other version contributed an equivalent artifact. Minor editorial canonicalization applied:

- Title-cased headings for consistency with canonical playbook style (`## Storefront-Specific IA`, `## Navigation Audit Checklist`, `## What to Avoid`)
- No semantic changes to content, structure, or rules

## Rejected

**WEBSITES `03-discovery-spec.md` navigation section** — Covers similar ground (nav items, page structure) but is embedded in a 16-section build spec. Extracting it would create a fragment without the surrounding workflow context. The gsd-design playbook is self-contained and purpose-built for IA.

**open-design `architecture.md`** — System architecture doc (deployment topologies, component diagrams). Entirely different domain from site-level information architecture.

**desigjn-toolkit `SUBMISSION-PLAYBOOK.md`** — Marketplace submission process. No IA content.

## Tradeoffs

1. **Per-client path convention: `sites/<name>/` vs `clients/<slug>/`**
   - *Decision:* Kept `sites/<name>/` from gsd-design.
   - *Rationale:* The playbook instructions reference `sites/<name>/IA.md` as the output path. Changing this would break `bin/advance-phase.sh build` and all downstream scaffolding. The vocabulary-map lists `clients/<slug>/` as canonical for active engagements, but no canonical `sites/` equivalent is established yet. Standardizing per-client paths is a repo-wide decision beyond this single playbook.

2. **No reference to `quality gate` terminology**
   - *Decision:* Left the gsd-design phrasing (`bin/advance-phase.sh build` blocks if `IA.md` is missing).
   - *Rationale:* The playbook describes a phase gate mechanism but does not name it "quality gate." The vocabulary-map confirms "quality gate" as the canonical concept, but renaming the shell script or mechanism is out of scope for playbook content synthesis. The canonical term can be adopted when the gate system itself is synthesized.

3. **Playbook cross-references**
   - *Decision:* Cross-references to `playbooks/competitor-research.md`, `playbooks/intake-existing-site.md`, etc. are captured in `playbooks/scenario-routing.md` (the scenario entry point), not in this IA playbook. The IA playbook focuses on route inventory and navigation model; scenario routing handles the dependency graph between playbooks.
   - *Rationale:* Keeping cross-references in scenario-routing.md centralizes the workflow dependency graph. Duplicating them in every playbook would create maintenance overhead.

## Open Questions

1. **Should `sites/<name>/` be renamed to `clients/<slug>/` across all playbooks?** The vocabulary-map marks `clients/<slug>/` as canonical, but no migration plan exists for the gsd-design path convention.
2. **Should the `bin/advance-phase.sh` mechanism be renamed to align with "quality gate" canonical terminology?** If so, all playbook references to the script need updating in a coordinated pass.
3. **Is a fifth scenario needed?** gsd-design covers A-D. Some versions (WEBSITES) treat "jewelry" as a vertical specialization rather than a scenario. A "Vertical specialization" scenario (E) may be needed once industry-kit playbooks are synthesized.
4. **Should the IA playbook include a section on URL structure / slug conventions?** Currently absent. SEO and migration playbooks may cover this; alignment needed.
