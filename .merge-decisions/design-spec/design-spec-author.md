# Decision Log: design-spec-author (SKILL.md)

## Sources

| Source | Version | Size | Path |
|---|---|---|---|
| DESIGN_SPEC_TEMPLATE.md | desigjn-toolkit | 4,426B | `inputs/desigjn toolkit/.claude/memory/DESIGN_SPEC_TEMPLATE.md` |
| DESIGN_VARIATIONS.md | desigjn-toolkit | 5,756B | `inputs/desigjn toolkit/.claude/memory/DESIGN_VARIATIONS.md` |

## Emitted Artifact

- `skills/design-spec-author/SKILL.md` — **Not** `.claude/memory/DESIGN_SPEC.md` (that path is owned by PR #5 memory function group). This skill lives at top-level `skills/` with frontmatter `name: design-spec-author`, `type: skill`.

## Kept From

### desigjn-toolkit / DESIGN_SPEC_TEMPLATE.md (primary base)
- **Structure:** 10-section template (Project Identity → Accessibility) with fill-in-the-blank format
- **Color system:** OKLCH token mapping with CSS variable spec
- **Typography:** Font selection rationale, scale, weights, line-height, forbidden fonts list
- **Layout system:** Grid, gutters, breakpoints, navigation, alignment tokens
- **Component architecture:** Card strategy, image treatment, button style, border radius, shadow
- **Motion design:** Scroll/animation libraries, duration scale, easing, section reveals, hero treatment, hover states, page transitions
- **Depth & atmosphere:** Layered background approach with CSS technique slots
- **Do's and Don'ts:** Free-form brand guidelines section
- **Responsive strategy:** Mobile/tablet/desktop breakpoints with touch targets and image loading
- **Accessibility targets:** WCAG AA, contrast ratios, focus states, labels, alt text, ARIA landmarks
- **Approval checklist:** Human review gate with anti-slop verification

### desigjn-toolkit / DESIGN_VARIATIONS.md
- **Constraint philosophy:** "AI has too many degrees of freedom = generic output"
- **Palette table:** 8 pre-defined color palettes (A1–A8) with hex values + mood descriptors
- **Typography pairings:** 8 pre-defined font pairings (T1–T8)
- **Hero patterns:** 6 pre-defined hero layouts (H1–H6)
- **Content patterns:** 6 pre-defined content layouts (C1–C6)
- **Animation personalities:** 5 pre-defined motion styles (M1–M5)
- **Spacing philosophies:** 3 pre-defined density approaches (S1–S3)
- **Usage flow:** Step-by-step process for picking constraints before building
- **Combination math:** 34,560 unique combinations from constraint tables

## Merged From

### Template + Variations integration
- Variation tables are now **embedded into relevant template sections** rather than being a standalone document:
  - Color palettes → Section 2 (Color System)
  - Typography pairings → Section 3 (Typography)
  - Hero + Content patterns → Section 4 (Layout System)
  - Animation personalities → Section 6 (Motion Design)
  - Spacing philosophies → new Section 8 (Spacing Philosophy)
- Added "Usage Flow" appendix at the bottom combining the template's "produce before implementation" rule with the variations' step-by-step constraint-picking process
- Added AI slop detection list (from variations' anti-pattern awareness) into Section 9 (Do's and Don'ts)
- Combined approval checklists: template's "Human reviewed / all sections filled" + variations' "ONE of each table chosen" checks

### Vocabulary normalization
- Used canonical term `playbook` for the procedural nature of the document
- Referenced canonical `.claude/memory/` path for persistent memory per vocabulary-map.md
- Normalized "memory" artifact type to canonical `project` type in frontmatter

## Rejected

### Typography pairings using forbidden fonts
- **Source:** DESIGN_VARIATIONS.md table T1–T8
- **What changed:** T1 used "Inter" for body, T4 used "Roboto" for body, T8 used "Open Sans" for body
- **Reason:** DESIGN_SPEC_TEMPLATE.md has an explicit, stronger rule: "Forbidden fonts: Inter, Roboto, Open Sans, Lato, Arial, system fonts." This anti-slop rule takes precedence.
- **Fix:** Replaced forbidden fonts with acceptable alternatives (Source Sans Pro, DM Sans, Work Sans) while keeping the same personality descriptors.

### DESIGN_VARIATIONS.md as standalone file
- **Reason:** The constraint tables are reference data that belong inside the spec template where they're used. A separate file creates navigation friction and risks the two drifting apart. The combination math and usage flow are preserved in the merged document.

### Hex-first color specification
- **Reason:** DESIGN_SPEC_TEMPLATE.md specifies OKLCH tokens. The variations' hex values are kept as "Palette Options" for quick reference but explicitly require OKLCH token mapping before production use.

## Tradeoffs

1. **Single merged document vs. two files:** Merging makes the spec self-contained but increases file size (~13KB). The benefit is that a developer filling out the spec has all choices in one scroll. If the file grows beyond 20KB in future iterations, consider splitting variations into a separate `DESIGN_VARIATIONS.md` reference.

2. **Font replacement in pairings:** Swapping Inter/Roboto/Open Sans for Source Sans Pro/DM Sans/Work Sans changes the exact personality of some pairings. T1 "Editorial, magazine, premium" with Source Sans Pro instead of Inter is arguably *more* editorial (Inter is generic). T4 with DM Sans instead of Roboto is an upgrade. The personalities are preserved; the execution is improved.

3. **Section renumbering:** Adding Spacing Philosophy as Section 8 pushes Do's and Don'ts to 9, Responsive to 10, Accessibility to 11. This is a breaking renumbering but necessary for logical flow. Decision: accept the renumbering since this is a canonical synthesis, not a patch.

4. **OKLCH default vs. variations' hex:** The variations use hex for human-readable palette names. The template enforces OKLCH for production. We kept both: hex for the "pick one" table, OKLCH for the "implement this" tokens.

## Open Questions

1. **Palette hex → OKLCH auto-conversion:** Should we provide a script or reference table for converting the 8 palette hex values to OKLCH so users don't need to compute them manually?

2. **Font loading strategy:** The spec mentions fonts but doesn't specify loading strategy (Fontsource, Google Fonts, self-hosted, `next/font`). Should a "Font Loading" subsection be added?

3. **Dark mode as first-class:** The color section mentions dark mode inversion briefly. Should dark mode be a fully separate "Theme Strategy" section rather than a token inversion note?

4. **Component library default:** The template lists `[shadcn/ui | custom | none]` as options. Given the scaffold stack (Next.js + Tailwind), should shadcn/ui be the recommended default with a note?

5. **Animation library stack alignment:** The spec allows `[Lenis | GSAP ScrollSmoother | native]` and `[Framer Motion | GSAP | CSS-only]`. The scaffold stack includes GSAP by default. Should the spec default to GSAP to reduce decision fatigue?
