---
name: gsap-animation
description: |
  Official GSAP animation skill covering core API, timelines, ScrollTrigger, plugins, React integration, and utility functions. Use when the user asks for JavaScript animation, timeline sequencing, scroll-driven animation, SVG animation, or performant UI motion in React/Vue/vanilla JS. GSAP is framework-agnostic and powers Webflow Interactions. Stack: React 19 / Next.js 16 / Tailwind 4.
triggers:
  - "animation"
  - "gsap"
  - "scroll animation"
  - "timeline"
  - "motion"
  - "transition"
  - "scrolltrigger"
  - "svg animation"
  - "webflow"
---

# GSAP Animation

GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library for the web. Use it for complex sequencing, scroll-driven motion, SVG morphing, and performant UI animations.

## When to Use GSAP

**Use GSAP when you need:**
- Complex animation sequencing
- Timeline-based animation control
- Performant UI animation
- Scroll-driven animation (ScrollTrigger)
- SVG animation, especially morphing between shapes
- Coordinated animations across multiple elements

**Prefer GSAP over CSS animations when you need:**
- Timeline sequencing
- Runtime control (pause, reverse, seek)
- Complex easing
- Scroll-based animation
- Dynamic values calculated in JavaScript

## Core Tween Methods

- `gsap.to(targets, vars)` — animate from current state to `vars`. Most common.
- `gsap.from(targets, vars)` — animate from `vars` to current state (good for entrances).
- `gsap.fromTo(targets, fromVars, toVars)` — explicit start and end.
- `gsap.set(targets, vars)` — apply immediately (duration 0).

Always use **property names in camelCase** (e.g. `backgroundColor`, `rotationX`).

## Common Vars

- **duration** — seconds (default 0.5).
- **delay** — seconds before start.
- **ease** — string or function. Prefer built-in: `"power1.out"`, `"power3.inOut"`, `"back.out(1.7)"`, `"elastic.out(1, 0.3)"`.
- **stagger** — number (seconds between) or object: `{ amount: 0.3, from: "center" }`, `{ each: 0.1, from: "random" }`.
- **repeat** — number or `-1` for infinite.
- **yoyo** — boolean; with repeat, alternates direction.
- **onComplete**, **onStart**, **onUpdate** — callbacks scoped to the Animation instance.

## Transform Aliases (Prefer Over Raw transform)

| GSAP property | Equivalent CSS |
|---------------|----------------|
| `x`, `y`, `z` | translateX/Y/Z (default: px) |
| `xPercent`, `yPercent` | translateX/Y in % |
| `scale`, `scaleX`, `scaleY` | scale |
| `rotation` | rotate (default: deg) |
| `rotationX`, `rotationY` | 3D rotate |
| `skewX`, `skewY` | skew |

- **autoAlpha** — Prefer over `opacity`. Sets `visibility: hidden` at 0.
- **CSS variables** — GSAP can animate custom properties (e.g. `"--hue": 180`).
- **Directional rotation** — Append `_short`, `_cw`, `_ccw` to rotation values.

## Easing

Built-in eases: base (same as `.out`), `.in`, `.out`, `.inOut`:

```
"none"
"power1" ... "power4"
"back"    "bounce"    "circ"    "elastic"    "expo"    "sine"
```

Use `CustomEase` plugin for cubic-bezier or complex SVG path curves.

## Timelines

For sequencing multiple tweens, use `gsap.timeline()` instead of chaining with `delay`:

```javascript
const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.out" } });
tl.to(".box", { x: 100 })
  .to(".circle", { y: 50 }, "-=0.2") // overlap by 0.2s
  .from(".text", { opacity: 0, y: 20 });
```

## ScrollTrigger

ScrollTrigger links animations to scroll position:

```javascript
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true,
    pin: true
  },
  x: 300
});
```

Common ScrollTrigger options:
- `trigger` — element that triggers the animation
- `start` / `end` — position strings (e.g. `"top center"`, `"+=200"`)
- `scrub` — smooth scrubbing (number for smoothing, `true` for direct)
- `pin` — pin the trigger element during animation
- `toggleActions` — control behavior on enter/leave (e.g. `"play none none reverse"`)

## Responsive & Reduced Motion (gsap.matchMedia)

```javascript
let mm = gsap.matchMedia();
mm.add({
  isDesktop: "(min-width: 800px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, reduceMotion } = context.conditions;
  gsap.to(".box", {
    rotation: isDesktop ? 360 : 180,
    duration: reduceMotion ? 0 : 2
  });
  return () => { /* cleanup */ };
});
```

Use `mm.revert()` on component unmount. All animations and ScrollTriggers created inside matchMedia are automatically reverted when the query stops matching.

## React Integration

Use `useGSAP()` hook (from `@gsap/react` — **TODO pending owner** (not yet bundled)) for proper cleanup:

```javascript
import { useGSAP } from "@gsap/react";

function MyComponent() {
  const container = useRef();
  useGSAP(() => {
    gsap.to(".box", { x: 100 });
  }, { scope: container });
  return <div ref={container}><div className="box" /></div>;
}
```

Register plugins in a module that runs once:
```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

## Best Practices

- ✅ Use transform aliases (`x`, `y`, `scale`, `rotation`) over raw `transform` string
- ✅ Use `autoAlpha` instead of `opacity` when elements should be hidden at 0
- ✅ Prefer timelines over chained `delay` values
- ✅ Use `gsap.matchMedia()` for responsive breakpoints and `prefers-reduced-motion`
- ✅ Store tween/timeline return values when controlling playback
- ✅ Use `useGSAP()` in React for automatic cleanup

- ❌ Animate layout-heavy properties (`width`, `height`, `top`, `left`) when transforms can achieve the same
- ❌ Use both `svgOrigin` and `transformOrigin` on the same SVG element
- ❌ Rely on default `immediateRender: true` when stacking multiple `from()` tweens on the same property
- ❌ Nest `gsap.context()` inside `gsap.matchMedia()` — matchMedia creates its own context
- ❌ Forget that `gsap.from()` uses current state as end state

## Common Plugins

- **Flip** — animate between layout states
- **Draggable** — drag elements with constraints
- **SplitText** — split text into chars/words/lines for animation
- **MorphSVG** — morph between SVG shapes
- **MotionPath** — animate along SVG paths
- **ScrollTo** — smooth scroll to elements
- **Observer** — unified gesture detection (wheel, touch, pointer)
- **Inertia** — momentum-based physics for Draggable

Register plugins once at app startup:
```javascript
gsap.registerPlugin(Flip, ScrollTrigger, SplitText);
```
