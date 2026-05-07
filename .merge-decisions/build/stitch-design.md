# Decision Log: stitch-design

## Sources

- `gsd-design/skills/stitch/skills/design-md/SKILL.md` (gsd-design, 7654B) — DESIGN.md synthesis from Stitch projects
- `gsd-design/skills/stitch/skills/shadcn-ui/SKILL.md` (gsd-design, 9207B) — shadcn/ui component generation
- `gsd-design/skills/stitch/skills/stitch-design/SKILL.md` (gsd-design, 3724B) — Core Stitch design skill
- `gsd-design/skills/stitch/skills/react-components/SKILL.md` (gsd-design, 3475B) — React component generation
- `gsd-design/skills/stitch/skills/enhance-prompt/SKILL.md` (gsd-design, 6640B) — Prompt enhancement for AI design
- `gsd-design/skills/stitch/skills/stitch-loop/SKILL.md` (gsd-design, 10328B) — Stitch iteration loop
- `gsd-design/skills/stitch/skills/remotion/SKILL.md` (gsd-design, 12954B) — Remotion video creation
- `gsd-design/skills/stitch/skills/taste-design/SKILL.md` (gsd-design, 12568B) — Stitch taste design
- `gsd-design/refs/stitch-skills/` (gsd-design, 249141B) — Reference docs and examples

## Kept From

- **gsd-design/stitch/design-md** (main): DESIGN.md synthesis workflow (namespace discovery → project lookup → screen lookup → metadata fetch → asset download → analysis), output format, best practices, common pitfalls.
- **gsd-design/stitch/shadcn-ui**: shadcn/ui generation rules — Radix primitives, Tailwind, CSS variables, accessibility.
- **gsd-design/stitch/remotion**: Remotion video creation guidance — React-based composition, design tokens, social media ratios.
- **gsd-design/stitch/enhance-prompt**: Prompt enhancement best practices — design vocabulary, platform context, animation behavior.
- **gsd-design/stitch/stitch-loop**: Iteration methodology for refining Stitch outputs.
- **gsd-design/stitch/react-components**: React component generation from design references.

## Merged From

- **DESIGN.md + shadcn + components**: Merged the DESIGN.md creation workflow with component generation rules into a unified "Stitch Design System" skill.
- **Prompt enhancement + iteration loop**: Merged prompt enhancement and stitch-loop into a single "Prompt Enhancement" section focused on iterative refinement.
- **Remotion**: Kept as a distinct subsection because video creation is a separate workflow from static design.
- **Taste-design**: Merged taste application patterns into the DESIGN.md synthesis section (atmosphere descriptions).

## Rejected

- **stitch-design core (3.7KB)**: Very small core skill that was mostly superseded by design-md and shadcn-ui. Rejected as redundant.
- **react-components (3.4KB)**: Small skill that overlapped with shadcn-ui. Core content (component generation from references) merged into shadcn-ui section.
- **refs/stitch-skills/ (249KB)**: Large reference directory. Not inlined in canonical skill — kept as external reference material.

## Tradeoffs

1. **Stitch-specific vs. general**: The skill is Stitch-specific but includes generalizable concepts (DESIGN.md format, prompt enhancement). Chose to keep it Stitch-branded because the MCP server calls are Stitch-specific.
2. **Video as subsection vs. separate skill**: Remotion video creation is a significant topic (12KB). Kept as subsection because it's part of the Stitch ecosystem, but could be extracted if it grows.
3. **MCP tool references**: The skill references Stitch MCP tools by prefix pattern (`[prefix]:list_projects`). This is necessary for actual usage but makes the skill less self-contained.

## Open Questions

1. Should Remotion video creation be promoted to its own canonical skill?
2. Should the DESIGN.md format be standardized as a shared spec used by non-Stitch skills too?
3. The refs/stitch-skills/ directory is 249KB — should any of this be promoted to the canonical skill?
4. How should we handle the fact that Stitch is a Google-specific tool that may not be available to all users?
