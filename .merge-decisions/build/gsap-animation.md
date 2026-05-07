# Decision Log: gsap-animation

## Sources

- `gsd-design/skills/gsap/skills/gsap-core/SKILL.md` (gsd-design, 14792B) — Core API: tweens, easing, stagger, defaults, matchMedia
- `gsd-design/skills/gsap/skills/gsap-timeline/SKILL.md` (gsd-design, 4394B) — Timeline sequencing
- `gsd-design/skills/gsap/skills/gsap-scrolltrigger/SKILL.md` (gsd-design, 18390B) — Scroll-driven animation
- `gsd-design/skills/gsap/skills/gsap-plugins/SKILL.md` (gsd-design, 21579B) — Plugins: Flip, Draggable, SplitText, MorphSVG, MotionPath, ScrollTo, Observer, Inertia
- `gsd-design/skills/gsap/skills/gsap-react/SKILL.md` (gsd-design, ~12KB) — React integration with useGSAP
- `gsd-design/skills/gsap/skills/gsap-utils/SKILL.md` (gsd-design, 12093B) — Utility functions: clamp, mapRange, interpolate, random, snap
- `gsd-design/skills/gsap/skills/gsap-frameworks/SKILL.md` (gsd-design, ~3KB) — Framework integration notes
- `gsd-design/skills/gsap/examples/react/` (gsd-design, 2416B) — React examples
- `gsd-design/skills/gsap/examples/vue/` (gsd-design, 2973B) — Vue examples
- `gsd-design/skills/gsap/skills/gsap-performance/SKILL.md` (gsd-design) — Performance optimization
- `gsd-design/refs/gsap-skills/` (gsd-design, 148588B) — Reference docs and additional examples

## Kept From

- **gsd-design/gsap-core** (main): Core tween methods (to/from/fromTo/set), common vars, transform aliases, easing system, function-based values, relative values, defaults.
- **gsd-design/gsap-timeline**: Timeline creation, sequencing, position parameters, defaults.
- **gsd-design/gsap-scrolltrigger**: Trigger options, start/end positions, scrub, pin, toggleActions.
- **gsd-design/gsap-plugins**: Plugin registration, common plugins list (Flip, Draggable, SplitText, MorphSVG, MotionPath, ScrollTo, Observer, Inertia).
- **gsd-design/gsap-react**: useGSAP hook, proper cleanup, plugin registration pattern.
- **gsd-design/gsap-utils**: Key utility functions (clamp, mapRange, snap, interpolate) summarized in best practices.
- **gsd-design/gsap-performance**: GPU-safe animation rules, performance guardrails.

## Merged From

- **Core + Timeline + ScrollTrigger**: Merged the three most-used GSAP features into a single coherent guide with cross-references.
- **React integration**: Merged gsap-react content into the main skill as a dedicated "React Integration" section rather than a separate skill.
- **Plugins**: Merged plugin list and registration from gsap-plugins into a "Common Plugins" subsection.
- **Performance**: Merged gsap-performance rules into "Best Practices" (GPU-safe, transform-only, no layout animation).
- **Framework notes**: Merged gsap-frameworks' framework-agnostic recommendations into the introduction.

## Rejected

- **Separate skill files per GSAP feature**: The gsd-design repo had 7 separate GSAP skill files. Rejected as unnecessary fragmentation — a single canonical skill is more usable.
- **Vue/Svelte examples**: Kept only React examples as the canonical stack. Vue/Svelte examples (2.4KB + 2.9KB) are in refs but not in the canonical skill.
- **Extensive reference docs**: The refs/gsap-skills/ directory (148KB) contains detailed docs. Not inlined in the canonical skill — referenced as external deep-dive material.
- **gsap-utils deep dive**: Full utility function documentation (12KB) was summarized into best practices rather than fully reproduced. The detailed docs remain in refs.

## Tradeoffs

1. **Single skill vs. modular skills**: A single GSAP skill risks being long, but splitting by feature (core/timeline/scrolltrigger) means the agent has to know which sub-skill to call. Chose unified because GSAP users typically need multiple features per project.
2. **React-first vs. framework-agnostic**: The skill is React-biased (useGSAP hook) but notes that GSAP is framework-agnostic. This matches the canonical stack while being honest about GSAP's universal applicability.
3. **Example depth**: Included key code examples inline but didn't reproduce every API variant. The refs/ directory has exhaustive docs for deep dives.

## Open Questions

1. Should the refs/gsap-skills/ content be promoted into a `gsap-deep-dive` sub-skill or kept as reference files?
2. Should we include a "GSAP + Next.js App Router" section with Server Component compatibility notes?
3. The ScrollTrigger section is substantial — should it be extracted if it grows further?
4. Should we include `gsap.context()` alongside `useGSAP()` for non-React contexts?
