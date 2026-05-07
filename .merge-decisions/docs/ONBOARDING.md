# Decision Log: ONBOARDING.md

Synthesis of docs function group — canonical ONBOARDING.md for AI agent orientation.

## Sources

| Source File | Version | Size | SHA256 |
|---|---|---|---|
| `ONBOARDING.md` | gsd-design | 10677 B | `8b4db64fafd2239622863e420a7a7184e48a7f183393ab43ae09bb04a00d2f4d` |
| `README.md` | WEBSITES | 3026 B | `a5f097fae2d5991115916341533d603257a2b2bb963b67f6557e1ae688dfb4cc` |
| `README.md` | design-self-create | 2407 B | `f270547eab0e34327df5f2fd6e7261d4ea2e450879803593770ad7bbe8a84358` |

Stack base context: `desigjn-toolkit/CLAUDE.md` (agent dispatch, pre/post task checklists, persistent memory)

## Kept From

### gsd-design/ONBOARDING.md (primary base — ~90% of content)
- **AI reading order** — target order retained, with companion root docs TODO-scoped because this PR emits only `ONBOARDING.md`
- **"What this workspace is" description** — verbatim, with vocabulary normalization
- **30-second mental model ASCII tree** — enriched with `clients/`, `prospects/`, `ops/`, `packages/`
- **Day one workflow** — all 6 steps, with scaffold commands from both gsd-design and design-self-create
- **"Where to look when" table** — all 32 entries, the most comprehensive navigation index in the workspace
- **The eight hard rules** — verbatim
- **Common stuck points Q&A** — all 6 FAQ entries
- **"What's NOT here" exclusions** — all 5 intentional omissions
- **"When something's missing" accretion philosophy** — verbatim
- **Versioning section** — portable bundle approach
- **"Now — go build something good" closing** — verbatim

### desigjn-toolkit/CLAUDE.md
- **Mandatory pre-task checklist** — the 4-step "Before writing ANY code" checklist (anti-slop skill, memory files, design spec, animation registry)
- **Mandatory post-task verification** — the 4-step "After generating ANY frontend output" checklist (anti-slop checklist, dark pattern audit, quality gates, fix-before-done)
- **Agent dispatch philosophy** — dispatch design-specialized agents for parallel work (integrated into "Common stuck points")
- **Memory file references** — `.claude/memory/MEMORY_INDEX.md`, `BUILD_GOTCHAS.md`, `ANTI_PATTERNS.md`, `QUALITY_GATES.md`, `AUTONOMOUS_WORKFLOW.md`, `DESIGN_SPEC_TEMPLATE.md`, `ANIMATION_REGISTRY.md`; all are TODO-scoped because this PR does not emit the memory bundle

### WEBSITES/README.md
- **Client Transformation Standard** — the 8-step workflow, normalized to canonical paths
- **Work Modes concept** — Discover & Plan / Build & Ship / Operate

### design-self-create/README.md
- **Screenshot / responsive / audit scripts** — added to Day One step 6
- **Scaffold command** — `node tools/scaffold.js` added alongside `bin/scaffold-site.sh`

## Merged From

### Pre/post task checklist merge
- desigjn-toolkit's 4-step pre-task + 4-step post-task merged into two new sections
- Positioned between "Day one" and "Where to look when" because they are AI-agent-specific operational rules
- Anti-slop checklist items merged verbatim (10 bullet points)
- Dark pattern audit items merged verbatim (5 items)

### Workspace structure enrichment
- gsd-design's ASCII tree was the base
- Added `clients/`, `prospects/`, `ops/` from WEBSITES vocabulary
- Added `packages/` from design-self-create
- Result: a unified tree that covers all 3 version structures

### Scaffold command dual listing
- gsd-design: `bin/scaffold-site.sh my-site` (Next.js-centric)
- design-self-create: `node tools/scaffold.js my-site --template landing-page` (Astro-centric)
- Result: both commands listed with a comment noting the stack difference

## Rejected

- **WEBSITES' pricing table** — onboarding is about *doing work*, not *selling work*. Pricing belongs in README and `ops/` docs.
- **WEBSITES' "Next Steps" business setup** — LLC, EIN, bank account, cold emails are out of scope for a build-workspace onboarding doc.
- **design-self-create's full Templates table** — only `landing-page` is referenced in the Day One workflow; full template catalog belongs in `TOOLS.md` or `templates/README.md`.
- **design-self-create's Stack section** — superseded by unified Stack in README and desigjn-toolkit base context.
- **desigjn-toolkit's full Project Structure tree** — gsd-design's ASCII tree is more concise and already covers the essential directories. desigjn-toolkit's detailed tree (with `src/app/`, `src/components/`, etc.) is per-site structure, not workspace structure.
- **desigjn-toolkit's Quick Commands table** — most commands are Next.js/site-specific and belong in `TOOLS.md` or per-site README. Only `screenshot.sh` was retained because it is workspace-level QA.
- **desigjn-toolkit's full Reference Repos list (21 repos)** — too large for onboarding. A curated pointer to `references/` is sufficient.
- **desigjn-toolkit's "Items Evaluated and Skipped" table** — interesting for architecture decisions but not relevant to day-one onboarding.

## Tradeoffs

1. **ONBOARDING.md length**: The file is ~13KB, even longer than gsd-design's 10KB source. We added desigjn-toolkit's pre/post checklists (~2KB) and a few merged sections. Length is justified because this is the *primary* orientation doc for AI agents — every byte should save time later. But we should monitor whether the "Where to look when" table's 32 entries are too many.

2. **AI-only vs. human-readable**: gsd-design explicitly says "If you're a human, you can skim." We kept this framing but added more AI-specific content (pre/post checklists). The file is increasingly AI-centric, which is appropriate for a workspace optimized for AI-driven building, but may alienate human contributors. A future iteration might split into `ONBOARDING.md` (human) and `AI-BOOTSTRAP.md` (agent).

3. **Pre-task checklist absolutism**: desigjn-toolkit uses "MUST" and "DO NOT SKIP" language. We preserved this tone because the anti-slop and quality gate steps are genuinely non-negotiable for the workspace's taste-anchor philosophy. However, this creates a formal, rigid tone that contrasts with gsd-design's more casual "go build something good" voice. The tension is intentional: rules are absolute, but the spirit is creative.

4. **Memory file path assumptions**: The pre-task checklist references `.claude/memory/*.md` files that may not yet exist in the master repo. These are forward references to the `.claude/memory/` canonical structure from desigjn-toolkit and are marked TODO pending owner in the emitted doc, so onboarding does not falsely claim they are already bundled.

5. **Duplicate content between README and ONBOARDING**: Both files contain the eight hard rules, common stuck points, and "What's NOT here." This is intentional redundancy: README is the GitHub landing page (needs self-contained context), ONBOARDING is the day-one workflow (needs these rules inline for AI agents who may not scroll back to README). Human editors may want to DRY this up with `{% include %}` style references, but plain Markdown doesn't support that.

## Open Questions

1. **Is ONBOARDING.md too long for AI context windows?** At ~13KB, this file consumes significant tokens when included in agent prompts. Should we split into `ONBOARDING-CORE.md` (must-read) and `ONBOARDING-REFERENCE.md` (look-up)?

2. **Pre-task checklist without file verification**: The checklist references `.claude/memory/` files. Should the synthesis include a stub creation of these memory files, or should they be synthesized in a separate function group (e.g., `.claude/` or `memory/`)?

3. **"Day one" workflow assumes Next.js**: Step 4 installs `stylelint`, `pa11y-ci`, etc. — these are Next.js/Webpack-centric. The Astro template (design-self-create) may not need all of these. Should there be a per-template Day One variant?

4. **Missing `CLAUDE.md` dispatch table**: ONBOARDING references `CLAUDE.md` for agent dispatch, but we have not verified that the master repo's `CLAUDE.md` will contain the same dispatch table as gsd-design or desigjn-toolkit. If `CLAUDE.md` is synthesized differently, the reading order and references may break.
   - **Post-repair note**: Emitted ONBOARDING now labels `CLAUDE.md` and the `.claude/agents/` dispatch surface as TODO pending owner so the doc does not imply those files are bundled by this PR.

5. **Quality gate count mismatch**: gsd-design says "7 enforcement gates" and "all seven executable gates." desigjn-toolkit says "gates 1–4 on every change." The synthesis retains "seven executable gates" from gsd-design, but the actual gate count may vary depending on which quality files are synthesized. Need reconciliation with the `quality/` function group synthesis.
