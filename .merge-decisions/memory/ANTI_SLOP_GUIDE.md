# Decision Log: ANTI_SLOP_GUIDE.md

## Sources

| Source File | Version | Description |
|-------------|---------|-------------|
| `.claude/memory/ANTI_PATTERNS.md` | desigjn-toolkit v1 | Design/code anti-patterns, dark patterns, AI tells, build gotchas summary |
| `.claude/memory/DISTINCTIVENESS_TECHNIQUES.md` | desigjn-toolkit v1 | 9 techniques to break AI statistical-mean convergence |

## Kept From

- **ANTI_PATTERNS.md**: All tables — Visual Slop, Animation Slop, Code Slop, AI-Specific Tells, Dark Patterns. The "Distinctiveness Anti-Patterns" subsection was merged into the new Part 6.
- **DISTINCTIVENESS_TECHNIQUES.md**: All 9 techniques (cross-pollinate, constraints, art-director editing, unexpected prompts, exploration not execution, brand-to-AI translation, lock tokens, human review gates, dark pattern audit), the core insight quote.

## Merged From

- Reorganized into 6 numbered parts for scanability: Visual, Animation, Code, AI Tells, Dark Patterns, Distinctiveness Techniques.
- Merged the "Distinctiveness Anti-Patterns" bullet list from ANTI_PATTERNS.md into the full 9-technique expansion from DISTINCTIVENESS_TECHNIQUES.md. The bullet list was a compressed summary; the full techniques document provides the complete reasoning and examples.
- Moved the CHI 2025 dark-patterns citation to the top of Part 5 for prominence.
- Removed the "Build Gotchas" table from ANTI_PATTERNS source material entirely; the canonical build gotchas now live in emitted `BUILD_GOTCHAS.md` with gates in `QUALITY_GATES.md`.

## Rejected

- The "Build Gotchas" summary table in ANTI_PATTERNS source material was excluded because it duplicated emitted `BUILD_GOTCHAS.md` / `QUALITY_GATES.md` content at lower fidelity. Keeping it would risk drift between two sources of truth.
- The separate "Distinctiveness Anti-Patterns" heading was flattened into Part 6; the heading served as a forward-reference to DISTINCTIVENESS_TECHNIQUES.md, which no longer exists as a separate file.

## Tradeoffs

- **Tradeoff**: 9 techniques in one file makes it longer, but the anti-slop theme is unified. A designer looking for "how do I avoid AI slop" gets the full answer (patterns to avoid + techniques to force distinctiveness) in one read.
- **Tradeoff**: The Core Insight quote appears at the bottom of the file rather than at the top of its own document. This is acceptable because it functions as a concluding synthesis, not an opening thesis.

## Open Questions

- Should we add a "Part 7: Auditing Checklist" with a quick 10-point tick-list derived from the frontend-aesthetics skill? Currently the 10-point checklist is only referenced by name.
- The CHI 2025 paper (Krauß et al.) is cited but not linked. Should we add a DOI or arXiv link?
