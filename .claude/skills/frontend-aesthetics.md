---
name: frontend-aesthetics
description: Anti-slop frontend design steering. Use when generating ANY frontend code — pages, components, sections, or full sites. Prevents distributional convergence toward generic AI aesthetics. Make sure to use this skill whenever building, styling, designing, or modifying any web UI, HTML, CSS, React component, or page layout. This skill is NOT optional — skipping it produces AI slop.
---

# Frontend Aesthetics — Anti-Convergence Steering

You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates the "AI slop" aesthetic — Inter fonts, purple gradients, predictable layouts, and cookie-cutter designs. Break this pattern. Make creative, distinctive frontends that surprise and delight.

## Typography

Choose fonts that are beautiful, unique, and interesting. **Never use**: Inter, Roboto, Open Sans, Lato, Arial, system fonts, or Geist (unless explicitly requested).

Good alternatives by context:

- **Code/technical aesthetic**: JetBrains Mono, Fira Code, IBM Plex Mono, Space Grotesk
- **Editorial/literary**: Playfair Display, Crimson Pro, Newsreader, Lora
- **Modern/sleek**: Cabinet Grotesk, Satoshi, Outfit, Syne, Switzer
- **Distinctive/artistic**: Bricolage Grotesque, Clash Display, Instrument Sans

Pairing principle: high contrast pairings (Display + Monospace, Serif + Geometric Sans). Use extreme weight jumps (100 vs 900, not 400 vs 600). Size hierarchies should jump 3x+ between levels.

## Color & Theme

Commit to a cohesive aesthetic using CSS variables. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from these themes for inspiration:

- **IDE themes**: Dracula, Nord, Tokyo Night, Catppuccin, One Dark Pro, Monokai
- **Cultural aesthetics**: Japanese minimalism (wabi-sabi), Brutalism, Swiss design, Bauhaus
- **Historical**: Art Deco, Memphis design, Vaporwave, Y2K, 90s rave
- **Natural**: Deep ocean, desert at dusk, boreal forest, volcanic
- **Industrial**: Concrete + steel, neon + darkness, laboratory white

**Never use**: purple-to-blue gradients on white backgrounds. **Never use**: #7C3AED or #3B82F6 as primary colors (these are AI default tells).

## Motion

Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML output; use Framer Motion for React. Focus on **high-impact moments**: one well-orchestrated page load with staggered reveals (`animation-delay`) creates more delight than scattered micro-interactions.

- UI feedback: 150-200ms ease-out
- Reveals: 400-600ms, staggered by 80-120ms
- Page transitions: 300-400ms
- Scroll-driven: GSAP ScrollTrigger + Lenis for smooth scrolling
- **Never animate layout properties** (height, width, top, left) — use `transform` and `opacity` only
- Always respect `prefers-reduced-motion`
- **Vary animation types**: not everything fades in. Use slide, scale, blur, clip-path, mask

## Backgrounds

Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients (radial + linear combos), use geometric patterns (grid lines, dot patterns), noise textures, or contextual effects. Match the background to the overall aesthetic theme.

- Never use solid white (#fff) or solid black (#000) — always tint toward the theme
- Use `oklch()` colorspace for perceptually uniform color manipulation
- Layer multiple gradients with varying opacity for depth
- Consider CSS `background-image` with `radial-gradient` + `linear-gradient` combinations
- Noise/grain overlays add texture and break the "too clean" AI look

## Anti-Slop Checklist (verify before output)

- [ ] No Inter, Roboto, Arial, or system fonts
- [ ] No purple-to-blue gradients on white backgrounds
- [ ] No #7C3AED or #3B82F6 as primary colors
- [ ] Not everything centered — use asymmetric layouts
- [ ] Not everything fades in — vary animation types
- [ ] No uniform spacing — use spatial hierarchy
- [ ] No generic copy ("seamless", "robust", "cutting-edge")
- [ ] Background has atmosphere and depth
- [ ] Typography pairing has high contrast (weight + size + style)
- [ ] Color palette drawn from a named theme, not AI defaults

## Think Outside the Box

Make unexpected choices that feel genuinely designed for the specific context. Vary between light and dark themes, different fonts, different aesthetics. If the output would blend into a gallery of 10 other AI-generated sites, start over with a bolder direction.
