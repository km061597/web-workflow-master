---
name: accessibility
description: Design, implement, and audit inclusive digital products using WCAG 2.2 Level AA standards. Use this skill for semantic ARIA, keyboard navigation, focus management, screen-reader compatibility, and the five cross-mode tests (dark mode, reduced motion, forced colors, 200% zoom, RTL).
origin: synthesized
---

# Accessibility (WCAG 2.2)

This skill ensures digital interfaces are Perceivable, Operable, Understandable, and Robust (POUR) for all users, including those using screen readers, switch controls, or keyboard navigation.

## When to Use

- Defining UI component specifications for web, iOS, or Android.
- Auditing existing code for accessibility barriers or compliance gaps.
- Implementing WCAG 2.2 standards like Target Size (Minimum) and Focus Appearance.
- Running the five cross-mode tests before shipping any site.

## Core Concepts

- **POUR Principles**: Perceivable, Operable, Understandable, Robust.
- **Semantic Mapping**: Use native elements over generic containers.
- **Accessibility Tree**: The representation assistive technologies actually "read."
- **Focus Management**: Controlling order and visibility of the keyboard/screen-reader cursor.
- **Labeling & Hints**: `aria-label`, `aria-describedby`, `accessibilityLabel`, `contentDescription`.

## How It Works

### Step 1: Identify the Component Role

Use the most semantic native element before custom roles.

### Step 2: Define Perceivable Attributes

- Text contrast: **4.5:1** (normal) or **3:1** (large/UI) minimum; prefer APCA Lc≥75 for body text.
- Alt text for all non-text content.
- Responsive reflow: up to **400% zoom** without loss of function.

### Step 3: Implement Operable Controls

- Minimum **24×24 CSS pixel** target size (WCAG 2.2 SC 2.5.8); prefer 44×44px visible hitbox for mobile.
- All interactive elements keyboard-reachable with visible focus indicator (SC 2.4.11).
- Single-pointer alternatives for dragging movements.

### Step 4: Ensure Understandable Logic

- Consistent navigation patterns.
- Descriptive error messages with suggestions for correction (SC 3.3.3).
- "Redundant Entry" (SC 3.3.7): don't ask for the same data twice.

### Step 5: Verify Robust Compatibility

- Correct `Name, Role, Value` patterns.
- `aria-live` or live regions for dynamic status updates.

## Cross-Platform Mapping

| Feature | Web (HTML/ARIA) | iOS (SwiftUI) | Android (Compose) |
|---|---|---|---|
| Primary Label | `aria-label` / `<label>` | `.accessibilityLabel()` | `contentDescription` |
| Secondary Hint | `aria-describedby` | `.accessibilityHint()` | `Modifier.semantics { stateDescription }` |
| Action Role | `role="button"` | `.accessibilityAddTraits(.isButton)` | `Modifier.semantics { role = Role.Button }` |
| Live Updates | `aria-live="polite"` | `.accessibilityLiveRegion(.polite)` | `Modifier.semantics { liveRegion = LiveRegionMode.Polite }` |

## The Five Cross-Mode Tests

Every site must pass these before shipping.

### 1. Dark Mode Parity

- All interactive elements visible and usable in dark mode.
- No "dark mode = just invert colors" — test with real `prefers-color-scheme: dark`.
- Check: focus rings, disabled states, error states, placeholder text, borders on cards.
- Logos with light backgrounds must have dark-mode variants or transparent backgrounds.

### 2. Reduced Motion

- Respect `prefers-reduced-motion: reduce`.
- Provide static alternatives for all animated content.
- Do not disable functionality — just remove motion.
- In GSAP: wrap animations in `matchMedia('(prefers-reduced-motion: no-preference)')`.

### 3. Forced Colors (Windows High Contrast)

- Test with `forced-colors: active`.
- Do not rely on color alone for meaning.
- Ensure borders, focus rings, and selection states remain visible.
- Use `currentColor` and `Canvas`/`CanvasText` system colors where possible.

### 4. 200% Browser Zoom

- Zoom to 200% in browser.
- Verify: no clipping, no horizontal scroll, all content reachable.
- Check: navigation doesn't collapse into unclickable state, forms remain usable, text doesn't overlap.
- Use relative units (`rem`, `%`, `vw`, `vh`) — never `px` for layout.

### 5. RTL Audit (Right-to-Left Languages)

- Test with `dir="rtl"` on `<html>`.
- Verify: text alignment flips, horizontal padding/margin on directional properties (`margin-inline-start` not `margin-left`), icons with directional meaning flip (arrows, chevrons), tables and grids handle reversed flow.
- Use logical properties: `inline-start/end`, `block-start/end`, `margin-inline`, `padding-inline`, `border-inline-start`.

## Anti-Patterns to Avoid

- **Div-Buttons**: `<div>` for click events without role and keyboard support.
- **Color-Only Meaning**: Indicating error/status only with color change.
- **Uncontained Modal Focus**: Modals that don't trap focus. Must contain AND be escapable via `Escape` or close button (WCAG SC 2.1.2).
- **Redundant Alt Text**: "Image of..." or "Picture of..." — screen readers already announce "Image."
- **Placeholder-as-Label**: Disappears when filled; never acceptable.
- **Missing Skip Link**: Keyboard users must be able to bypass navigation.

## Best Practices Checklist

- [ ] Interactive elements meet 24×24px (Web) or 44×44pt (Native) target size.
- [ ] Focus indicators clearly visible and high-contrast.
- [ ] Modals **contain focus** while open, release cleanly on close.
- [ ] Dropdowns and menus restore focus to trigger element on close.
- [ ] Forms provide text-based error suggestions.
- [ ] All icon-only buttons have descriptive text label.
- [ ] Content reflows properly when text is scaled to 200%.
- [ ] All five cross-mode tests passed with evidence.

## References

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
- [APCA Contrast Calculator](https://www.myndex.com/APCA/)

## Related Skills

- `browser-qa` — automated visual testing
- `performance` — animation performance and Core Web Vitals
- `frontend-patterns` — React/Next.js component patterns
