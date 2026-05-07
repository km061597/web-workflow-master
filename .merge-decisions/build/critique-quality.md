# Decision Log: critique-quality

## Sources

- `open-design/skills/critique/SKILL.md` (open-design, 9684B) — 5-dimension expert design review
- `open-design/skills/tweaks/SKILL.md` (open-design, 8804B) — Design tweaks workflow
- `open-design/skills/pptx-html-fidelity-audit/SKILL.md` (open-design) — PPTX to HTML fidelity audit
- `gsd-design/skills/critique/SKILL.md` (gsd-design, 9684B) — Identical to open-design
- `gsd-design/skills/tweaks/SKILL.md` (gsd-design, 8804B) — Identical to open-design
- `gsd-design/skills/html-ppt-presenter-mode-reveal/SKILL.md` (gsd-design) — Presenter mode critique patterns

## Kept From

- **open-design/critique** (main, canonical): Complete 5-dimension review system (Philosophy, Visual Hierarchy, Detail Execution, Functionality, Innovation), scoring discipline, review report structure, output contract.
- **open-design/tweaks**: Small refinement workflow (identify type → apply → verify → re-review).
- **open-design/pptx-html-fidelity-audit**: Format conversion audit methodology (pixel-perfect comparison, typography audit, color audit, layout audit, asset audit, interaction audit).

## Merged From

- **Critique + tweaks**: Merged the tweaks workflow into the main critique skill as a "Design Tweaks Workflow" subsection. Tweaks are essentially micro-critiques.
- **Fidelity audit**: Merged the PPTX-to-HTML fidelity audit into a standalone "Fidelity Audit (Format Conversion)" section. Generalized beyond PPTX to apply to any format conversion.
- **Presenter mode patterns**: Merged presenter-mode-reveal's review patterns (slide-specific checks) into the Detail Execution dimension.

## Rejected

- **Duplicate gsd-design copies**: gsd-design had identical copies of critique and tweaks. Rejected.
- **Presenter mode as separate skill**: The presenter mode skill was essentially a critique tool for slide decks. Merged into the main critique skill rather than kept separate.

## Tradeoffs

1. **Unified skill vs. separate critique/tweaks/audit**: Chose unified because all three are quality assurance workflows. The agent is more likely to remember one "critique-quality" skill than three separate ones.
2. **5 dimensions as mandatory**: Kept the rule that partial reports (fewer than 5 dimensions) are not allowed. This ensures thoroughness but adds structure.
3. **HTML report output**: The critique outputs a self-contained HTML report. This is different from most skills that output code or text. Preserved as-is because the radar chart visualization is a key feature.

## Open Questions

1. Should the fidelity audit section be expanded to cover more format pairs (Figma → HTML, Sketch → React)?
2. Should the 5-dimension system be extended to include Accessibility as a 6th dimension?
3. The HTML report template is described but not fully templated — should a complete HTML template be included inline?
4. Should there be an automated self-critique mode where the agent runs this on its own output before emitting?
