# Decision Log: ARCHITECTURE.md

## Sources
- `design-self-create/ARCHITECTURE.md` (design-self-create)

## Kept From
- **design-self-create**: All architecture decisions preserved for reference. The rationale for each tool choice is well-documented.

## Merged From
- Added explicit note at top: **Stack base = Next.js 16 / React 19 / Tailwind 4 / shadcn** (from desigjn-toolkit). The architecture decisions in this file are from design-self-create's Astro 5 perspective and serve as an alternative architecture reference, not the active stack.

## Rejected
- **Astro 5 as active framework**: Explicitly rejected per stack base directive. The document is preserved as "Architecture Decisions — Reference" rather than "Architecture Decisions — Active."
- **Deploy targets**: Vercel + GitHub Pages is preserved as an option but Next.js 16 projects deploy primarily to Vercel.

## Tradeoffs
- Preserved the full document because the individual tool-choice rationales (OKLCH, GSAP, ComfyUI, Lucide, Fontsource) are valuable regardless of framework. Only the framework choice differs.
- Could have been split into per-tool decision files but kept as one document for coherence.

## Open Questions
- Should individual architecture decisions be inlined into CLAUDE.md? No — they belong in a separate reference document.
- Should the Astro 5 vs Next.js debate be documented as a decision in DECISIONS.md? Yes, this should be logged.
