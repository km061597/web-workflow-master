# Decision Log: taste-design-system

## Sources

- `gsd-design/skills/taste-brutalist-skill/SKILL.md` (gsd-design, 8456B) — Industrial brutalism & tactical telemetry UI
- `gsd-design/skills/taste-soft-skill/SKILL.md` (gsd-design, 10561B) — High-end agency-level soft structuralism
- `gsd-design/skills/taste-minimalist-skill/SKILL.md` (gsd-design, 7901B) — Minimalist design system
- `gsd-design/skills/taste-redesign-skill/SKILL.md` (gsd-design, 15060B) — Redesign workflow skill
- `gsd-design/skills/taste-image-to-code-skill/SKILL.md` (gsd-design, 36442B) — Image-to-code conversion
- `gsd-design/skills/taste-brandkit/SKILL.md` (gsd-design) — Brand kit generation
- `gsd-design/skills/taste-output-skill/SKILL.md` (gsd-design, 2592B) — Output formatting skill
- `gsd-design/skills/taste-gpt-tasteskill/SKILL.md` (gsd-design) — GPT taste skill
- `gsd-design/skills/taste-imagegen-frontend-web/SKILL.md` (gsd-design) — Web frontend image generation
- `gsd-design/skills/taste-imagegen-frontend-mobile/SKILL.md` (gsd-design) — Mobile frontend image generation
- `gsd-design/skills/taste/skills/taste-skill/SKILL.md` (gsd-design) — Core taste skill
- `open-design/skills/taste-design/SKILL.md` (open-design) — Open design taste skill
- `gsd-design/skills/stitch/skills/taste-design/SKILL.md` (gsd-design, 12568B) — Stitch taste design

## Kept From

- **gsd-design/taste-brutalist-skill**: Complete brutalist aesthetic system (Swiss Industrial Print + Tactical Telemetry CRT Terminal), typography architecture (macro/micro/textural), color system (light/dark substrates), layout rules (blueprint grid, visible compartmentalization, zero border-radius), UI symbology (ASCII framing, industrial markers), textural effects (halftone, CRT scanlines, mechanical noise), web engineering directives.
- **gsd-design/taste-soft-skill**: The "Absolute Zero" anti-patterns directive (banned fonts, icons, borders, shadows, layouts, motion), Variance Engine (Vibe + Layout archetypes), Double-Bezel architecture (Doppelrand), Nested CTA & Island Button, Spatial Rhythm & Tension, Motion Choreography (Fluid Island Nav, Magnetic Button, Scroll Interpolation), Performance Guardrails, Mobile Override rules, Execution Protocol, Pre-Output Checklist.
- **gsd-design/taste-minimalist-skill**: Minimalist spacing rules and typography constraints.
- **gsd-design/taste-redesign-skill**: Redesign workflow methodology (audit → direction → execute).
- **gsd-design/stitch/taste-design**: Stitch-specific taste application patterns.

## Merged From

- **Anti-patterns**: Merged the comprehensive banned list from taste-soft with brutalist-specific bans (gradients, soft shadows) into a unified "Absolute Zero Directive".
- **Aesthetic archetypes**: Merged brutalist (Swiss Industrial / CRT Terminal), soft structuralism, ethereal glass, and editorial luxury into a single "Taste Archetypes" section. Each archetype is a pick-ONE choice per project.
- **Component architecture**: Merged Double-Bezel (from soft) with brutalist compartmentalization into a unified component mastery section.
- **Motion**: Merged brutalist's analog degradation effects with soft's motion choreography into a single motion section with GPU-safe constraints.
- **Typography**: Merged brutalist's extreme scale contrast with soft's agency-level font recommendations into a unified typographic architecture.

## Rejected

- **taste-image-to-code-skill**: Large skill (36KB) focused on converting images to code. This is a separate workflow from aesthetic direction. Rejected — should be its own skill or part of a code-generation skill.
- **taste-brandkit**: Overlaps significantly with the new `brand-identity` canonical skill. Content merged there instead.
- **taste-output-skill**: Very small (2.5KB) skill about output formatting. Too narrow for a canonical taste skill; content absorbed into execution protocol.
- **taste-gpt-tasteskill**: GPT-specific taste prompting. Too narrow; not broadly applicable.
- **taste-imagegen-frontend-web/mobile**: Frontend image generation. Overlaps with `image-media-studio` canonical skill.
- **taste-redesign-skill's full workflow**: The redesign workflow is useful but too procedural for a taste skill. The core aesthetic direction content was kept; the step-by-step redesign process was trimmed.

## Tradeoffs

1. **One skill vs. many taste skills**: The source repos had 12+ separate taste-related skills. Consolidating into one risks being too broad, but splitting by taste would mean the agent has to pick the right taste skill before it even knows the project direction. Chose unified skill with archetype picker.
2. **React/Tailwind specificity**: Both brutalist and soft skills assume React/Tailwind. The canonical skill preserves this but notes that brutalist CSS can be vanilla. This is a compromise — the skill is stack-biased.
3. **Pre-output checklist length**: The soft skill had an extensive 10-item checklist. Kept it because it's a genuine quality filter, but it makes the skill longer.

## Open Questions

1. Should each taste archetype have its own sub-skill for deep-dive reference?
2. The image-to-code workflow (36KB from taste-image-to-code-skill) is substantial — should it be a standalone canonical skill?
3. Should the "Absolute Zero" directive be extracted as a shared anti-pattern reference used by all build skills?
4. The "Vibe Archetypes" list is currently 4 items — should we expand to include more (e.g., Y2K, Cyberpunk, Art Deco)?
