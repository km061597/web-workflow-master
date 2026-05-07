# Synthesis Decision Log: playbooks/discovery.md

## Sources

| Source File | Version | Description |
|---|---|---|
| `playbooks/competitor-research.md` | gsd-design | Competitor teardown playbook with 5-axis scoring framework |
| `playbooks/industry-research.md` | gsd-design | Industry research protocol with 6-step methodology |

## Kept From

### `playbooks/competitor-research.md` (gsd-design)
- **5-axis teardown framework** (Visual identity, Content/voice, IA/navigation, Conversion patterns, Technical/performance) — this is the strongest, most detailed scoring rubric across all versions
- **4-type competitor taxonomy** (direct, adjacent, exemplar, anti-competitor) — clearer than the simple "5 in-market + 2 out-of-market" split in industry-research
- **"How to NOT copy competitors"** section — unique to this version, essential guidance
- **Pattern-to-adopt / Trap-to-avoid** format — clear, actionable output format
- **Tooling section** with firecrawl-cli, surf, scrapling, site-cloner — detailed commands with examples
- **Definition of Done** checklist — comprehensive and specific

### `playbooks/industry-research.md` (gsd-design)
- **6-step methodology** as overarching structure — the phased approach (scope → competitors → patterns → glossary → regulatory → trust/seasonality) provides better narrative flow than competitor-research's flat structure
- **Scope definition questions** (business, buyer, mental model, geography, purchase type) — prerequisite context that competitor-research assumed was already known
- **Regulatory and compliance scan** — unique to this version, critical for legal liability
- **Domain glossary** construction methodology — unique to this version, essential for copy-editor handoff
- **Trust signals inventory** — unique to this version, critical for conversion design
- **Seasonality scan** — unique to this version, drives CMS architecture decisions
- **"When to skip steps"** guidance — pragmatic time-boxing rules
- **Tool stack table** with cost information — useful for planning

## Merged From

### Structure
- Merged the 6-step methodology from industry-research with the 5-axis teardown from competitor-research into **three phases**:
  - Phase 1: Industry landscape mapping (scope + competitor identification)
  - Phase 2: Competitor teardown (5-axis scoring)
  - Phase 3: Domain deep-dive (glossary + regulatory + trust + seasonality)
- This avoids the flat listing in competitor-research and prevents the repetition between industry-research Step 2 (identify competitors) and competitor-research's "How to identify competitors"

### Tooling
- Combined both tool lists into a single **Tooling reference** table
- Added `scripts/discovery.mjs` as a canonical tool (the synthesized script artifact)
- Normalized tool descriptions to consistent format (Use / Fallback)
- Kept all concrete CLI examples from both sources

### Output templates
- Merged the `competitors.md` template from competitor-research with the `RESEARCH.md` template from industry-research
- The unified template includes: scope, competitor list with scores, detailed teardowns, structural patterns, domain glossary, regulatory requirements, trust signals, seasonality, differentiation summary, and design recommendations
- This is more comprehensive than either source template alone

### Feeding into DESIGN.md
- Merged both sources' DESIGN.md integration sections
- Added domain glossary and regulatory guardrails as explicit items (from industry-research)

## Rejected

### From `playbooks/competitor-research.md`
- **Output directory `sites/<name>/`** — replaced with canonical `clients/<slug>/` per vocabulary-map.md
- **"During audit phase" as a standalone When-to-invoke** — folded into the 4-item list; kept as item #2 but reworded for consistency
- **Exemplar reference to `exemplars/tier-a-plus/`** — normalized to just `exemplars/` since the vocabulary map confirms this is the canonical term

### From `playbooks/industry-research.md`
- **"Five competitors total is the minimum; eight is the ceiling"** from competitor-research replaced the looser "5 in-market + 2 out-of-market" guidance
- **Cost column in tool table** — removed; cost information is volatile and the canonical stack should not hardcode pricing
- **Separate `conventions/voice-and-tone.md` cross-reference** — kept the reference but noted it may not exist in all deployments
- **WebSearch MCP regulation check example** — kept as concept but removed specific bash snippet (firecrawl-cli search is the canonical tool; MCP references are supplementary)

## Tradeoffs

1. **Single playbook vs. two playbooks**: Merged both into one unified `discovery.md` rather than keeping `competitor-research.md` and `industry-research.md` separate. Tradeoff: slightly longer file (20KB) but eliminates duplication and gives readers one canonical reference. The two topics were already 70% overlapping (both cover competitor identification, scraping, and structural analysis).

2. **3-phase structure vs. 6-step structure**: Chose 3 phases over the original 6-step flat list. Tradeoff: the 5-axis teardown (originally a standalone section) is now embedded in Phase 2, which may make it slightly less discoverable for readers looking specifically for the scoring rubric. Mitigated by keeping clear axis headers.

3. **Output location `clients/<slug>/`**: This is the vocabulary-map canonical, but some versions (WEBSITES, design-self-create) use `prospects/` or per-site directories. Tradeoff: using `clients/<slug>/` may require migration for teams coming from those versions. Added a note that `prospects/<slug>/` is used for pre-intake.

4. **Tool normalization**: Both playbooks mention `surf`, `firecrawl-cli`, and `scrapling`. Kept all three but normalized to `firecrawl-cli` as primary with `scrapling` as fallback, matching the vocabulary-map's stack base context (desigjn-toolkit uses these as primary tools).

5. **Removed "design-self-create" and "WEBSITES" playbook references**: These versions had no playbooks in the discovery function group, so no content to merge from them. The script artifacts from those versions are synthesized separately in `scripts/discovery.mjs`.

## Open Questions

1. **Counter-example directory structure**: The playbook references `exemplars/tier-c-counter-examples/` but the master repo scaffold does not yet include this directory. Should counter-examples be part of the scaffold, a separate artifact, or referenced as external URLs?

2. **Site-cloner agent**: Referenced as a tool for deep design-system extraction, but no site-cloner artifact exists in any version's discovery function group. Is this a planned agent in another function group (e.g., meta-orchestration), or should it be scoped out separately?

3. **MCP tool integration**: The playbook mentions WebSearch MCP and Context7 MCP. These are mentioned in the gsd-design industry-research playbook but there is no MCP configuration artifact in the discovery group. Should MCP tool configs be part of this function group or meta-orchestration?

4. **Regulatory scan depth**: The compliance scan lists 6 industries with specific rules. Is this comprehensive enough, or should it be expanded? Should it reference a canonical legal/compliance playbook (not present in any version)?

5. **Playbook length**: At ~20KB, this is a substantial file. Should it be split into sub-playbooks (e.g., `discovery-competitors.md`, `discovery-industry.md`) in a future revision?
