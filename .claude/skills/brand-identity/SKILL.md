---
name: brand-identity
description: |
  Brand identity and voice skill. Generate brand voice guidelines, theme factories, and design system tokens that ensure consistency across all outputs. Covers voice archetypes, tone matrices, visual identity rules, and cross-platform coherence. Use when the user asks for brand guidelines, voice, tone, visual identity, or design system consistency.
triggers:
  - "brand"
  - "voice"
  - "tone"
  - "identity"
  - "guidelines"
  - "theme"
  - "brand book"
  - "style guide"
---

# Brand Identity & Voice

Ensure consistency across all design outputs by defining and applying brand voice, visual identity, and design system tokens.

## When to Use

- Creating or refining brand voice and tone
- Establishing visual identity rules (color, typography, spacing)
- Ensuring cross-platform consistency (web, mobile, social, print)
- Building brand guidelines documents
- Auditing existing work for brand alignment

## Voice Archetypes

| Archetype | Tone | Vocabulary | Avoid |
|-----------|------|------------|-------|
| **Pioneer** | Bold, confident, forward-looking | "Revolutionary," "first," "breakthrough" | Apologetic, tentative |
| **Guardian** | Reliable, trustworthy, calm | "Proven," "secure," "trusted" | Hype, exaggeration |
| **Creator** | Expressive, imaginative, playful | "Crafted," "designed," "imagined" | Corporate jargon |
| **Sage** | Knowledgeable, precise, measured | "Research shows," "data indicates" | Ambiguity, fluff |
| **Everyperson** | Friendly, approachable, honest | "We," "together," "simple" | Pretension, complexity |
| **Hero** | Determined, competitive, strong | "Challenge," "win," "conquer" | Weakness, passivity |
| **Lover** | Warm, intimate, sensual | "Feel," "experience," "connect" | Cold, detached |
| **Jester** | Playful, irreverent, surprising | "Fun," "wild," "unexpected" | Boring, predictable |
| **Caregiver** | Nurturing, supportive, gentle | "Help," "care," "support" | Aggressive, pushy |
| **Ruler** | Authoritative, commanding, elite | "Premium," "exclusive," "leader" | Cheap, mass-market |

## Tone Matrix

Adjust tone based on context while maintaining core voice:

| Context | Tone Adjustment | Example |
|---------|----------------|---------|
| Onboarding | Warm, encouraging | "Welcome! Let's get you set up." |
| Error | Calm, helpful | "Something went wrong. Here's how to fix it." |
| Success | Celebratory, brief | "Done! Your changes are live." |
| Pricing | Clear, confident | "Simple pricing. No surprises." |
| Legal | Precise, formal | "By continuing, you agree to our Terms." |
| Marketing | Energetic, aspirational | "Build something extraordinary." |

## Visual Identity Rules

### Color System
- Define semantic tokens: `primary`, `secondary`, `accent`, `surface`, `background`, `text`, `error`, `warning`, `success`
- Use hex values in design tokens, never raw hex in components
- Dark mode: desaturated / lighter tonal variants, not inverted colors
- Maximum 1–2 accent colors per interface

### Typography
- Display font: distinctive, characterful (avoid Inter, Roboto, Arial)
- Body font: readable, complementary to display
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64 / 96
- Line-height: 1.5–1.75 body, 0.85–1.1 display
- Max 2 font families per project

### Spacing
- Base unit: 4px or 8px
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Section padding: `py-24` to `py-40` minimum
- Component gaps: `gap-4` to `gap-8`

### Shape & Depth
- Border radius: consistent system (none / sm / md / lg / xl / full)
- Shadows: subtle ambient only (`shadow-sm` to `shadow-md`), no harsh dark drops
- No border-radius mixing within the same component family

## Cross-Platform Coherence

| Platform | Adaptation | Constraints |
|----------|-----------|-------------|
| Web | Full expression | 60fps animations, responsive breakpoints |
| Mobile iOS | System gestures, safe areas | 44pt touch targets, Dynamic Type |
| Mobile Android | Material patterns | 48dp touch targets, predictive back |
| Social | Square/vertical crops | 1080×1080 or 1080×1920, text overlay safe zones |
| Email | Table-based layouts | Max 600px width, inline styles |
| Print | CMYK conversion | 300dpi, bleed margins |

## Brand Audit Checklist

- [ ] Voice is consistent across all touchpoints
- [ ] Tone matches context (error ≠ marketing)
- [ ] Color tokens are semantic, not arbitrary
- [ ] Typography scale is systematic
- [ ] Spacing follows base unit
- [ ] Animation style matches brand personality
- [ ] Mobile adaptations preserve brand feel
- [ ] Dark mode is designed, not inverted
- [ ] All team members can apply the system without asking
