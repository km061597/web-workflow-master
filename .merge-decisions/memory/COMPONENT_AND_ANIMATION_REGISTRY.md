# Decision Log: COMPONENT_AND_ANIMATION_REGISTRY.md

## Sources

| Source File | Version | Description |
|-------------|---------|-------------|
| `.claude/memory/COMPONENT_REGISTRY.md` | desigjn-toolkit v1 | Living registry of UI components, page sections, business components, hooks, utilities |
| `.claude/memory/ANIMATION_REGISTRY.md` | desigjn-toolkit v1 | Curated index of 76 magicui + 110+ react-bits animated components |

## Kept From

- **COMPONENT_REGISTRY.md**: All tables — shadcn/ui components, page sections, business components, hooks, utilities. Kept all file paths, variants, test/story references, and registry rules.
- **ANIMATION_REGISTRY.md**: All use-case categories — Hero, Text, CTA Buttons, Backgrounds, Scroll, Social Proof, Cards & Layouts, Special Effects. Kept selection rules, source/slug tables, and anti-slop rules.

## Merged From

- Combined into one document with two major sections: "Component Registry" and "Animation Registry."
- Unified the "registry" mental model: one place to answer "what reusable assets do we have?"
- Added a horizontal rule separator between the two sections.
- Cross-referenced the two sections: the Component Registry's animation utilities (`fadeInUp`, `staggerReveal`) now sit in the same file as the Animation Registry's component catalog, making it easier to pick the right tool.

## Rejected

- No content was rejected. Both files were substantial and non-overlapping. The only "loss" is the separate file identity of ANIMATION_REGISTRY.md, which is now a section rather than a standalone file.

## Tradeoffs

- **Tradeoff**: File is now ~250 lines. However, component and animation concerns are tightly coupled during build ("what component should I use?" and "what animation should I pair it with?" are asked in the same breath). The single file eliminates a context switch.
- **Tradeoff**: Future growth could make this file unwieldy. If the registry exceeds 500 components or 200 animation entries, a split should be reconsidered. For now, ~50 components + ~60 animations is manageable.

## Open Questions

- Should we add a "Pairing Suggestions" subsection that maps common component types to recommended animation categories? (e.g., "ProductCard → Magic Card or TiltedCard + FadeContent")
- Should hooks that are planned but not built (`useMediaQuery`, `useBreakpoint`, etc.) remain in the registry or move to a separate "Backlog" file?
