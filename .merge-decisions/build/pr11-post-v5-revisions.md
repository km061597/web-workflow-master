# PR #11 Build — Post-v5 Revisions

## Changes Applied

1. **Dropped html-ppt-studio** — Slides are not website scope per v5 inventory rules.
2. **Dropped browser-automation** — Redundant with firecrawl-based discovery pipeline.
3. **Absorbed 3 landing skills from PR #12 ship**:
   - `saas-landing` — SaaS marketing page skill
   - `kami-landing` — Editorial paper-document skill
   - `open-design-landing` — Parameterized landing skill with composer pipeline

4. **Dedupe: taste-design-system vs design-system (PR #9)**
   - `taste-design-system` (build) — Aesthetic direction skill (brutalist, soft structuralism, editorial luxury). Focus: look-and-feel.
   - `design-system` (PR #9 design-spec) — Token architecture skill (primitive→semantic→component). Focus: systematic tokens.
   - **Resolution**: NOT duplicates. Different purposes. Both kept.

5. **Resolved frontend-patterns open questions**:
   - Server Components: Documented in Stack Base section (Next.js 16 App Router)
   - RHF + Zod: Brief mention in form patterns (Zod schemas listed in When to Activate)
   - react-virtual: Already uses `@tanstack/react-virtual` v3 (line 178)
   - Animation overlap with gsap-animation: frontend-patterns covers component-level motion (Framer Motion); gsap-animation covers sequence-level animation (GSAP timeline). Both kept with distinct scopes.

## Decision Log
- `.merge-decisions/build/html-ppt-studio-dropped.md` — **TODO pending owner** (rationale documented inline above; separate log not yet created)
- `.merge-decisions/build/browser-automation-dropped.md` — **TODO pending owner** (rationale documented inline above; separate log not yet created)
- `.merge-decisions/build/landing-skills-absorbed.md` — **TODO pending owner** (absorption rationale documented above; separate log not yet created)

## Open Questions (moved to batch tracking)
- None remaining — all resolved or deferred to Phase 4-5.
