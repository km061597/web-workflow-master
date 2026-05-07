# Decision Log: image-media-studio

## Sources

- `open-design/skills/image-poster/SKILL.md` (open-design, 3474B) — Single-image generation for posters/key art
- `open-design/skills/magazine-poster/SKILL.md` (open-design, 3581B) — Magazine layout generation
- `open-design/skills/video-shortform/SKILL.md` (open-design, 4447B) — Short-form video generation
- `open-design/skills/audio-jingle/SKILL.md` (open-design, 4294B) — Audio jingle generation
- `open-design/skills/motion-frames/SKILL.md` (open-design, 4255B) — Motion frame / animated GIF generation
- `open-design/skills/sprite-animation/SKILL.md` (open-design, 3474B) — Sprite sheet animation
- `open-design/skills/hatch-pet/SKILL.md` (open-design, 23858B) — Hatch pet (image generation with specific theme)
- `gsd-design/skills/taste-imagegen-frontend-web/SKILL.md` (gsd-design) — Frontend web image generation (from taste)
- `gsd-design/skills/taste-imagegen-frontend-mobile/SKILL.md` (gsd-design) — Frontend mobile image generation (from taste)

## Kept From

- **open-design/image-poster** (main, canonical): Prompt composition workflow (subject → lighting → palette → camera → avoid), media contract dispatch syntax, hard rules.
- **open-design/magazine-poster**: Magazine-specific layout guidance (multi-column, image+text balance, captions).
- **open-design/video-shortform**: Video-specific guidance (9:16 format, 3-second hook, subtitle burn-in).
- **open-design/audio-jingle**: Audio-specific guidance (3–15 seconds, BPM/key/instrumentation).
- **open-design/motion-frames**: Motion-specific guidance (loop-friendly, under 5 seconds, frame rate).
- **open-design/sprite-animation**: Sprite-specific guidance (consistent dimensions, transparent background, animation sequence).

## Merged From

- **Surface-specific guidance**: Merged all 6 surface types into a single "Surface-Specific Guidance" section with a table at the top for quick lookup.
- **Prompt composition**: Kept the universal 5-step prompt composition from image-poster and added surface-specific additions.
- **Media contract dispatch**: Kept the unified dispatcher pattern as the canonical workflow across all media types.

## Rejected

- **hatch-pet**: Large (23KB) skill with very specific "pet hatching" theme and narrative. Too narrow for a general media studio. Rejected as standalone.
- **taste-imagegen-frontend-web/mobile**: These were taste-specific image generation skills. The core prompt composition workflow was identical to image-poster. Rejected as duplicates with taste-specific framing.
- **Duplicate gsd-design copies**: gsd-design had identical copies of the open-design media skills. Rejected.

## Tradeoffs

1. **Unified skill vs. per-surface skills**: All 6 surfaces share the same prompt composition and dispatch workflow. A unified skill is more usable, but the surface-specific guidance is less detailed than a dedicated skill would be.
2. **Image-centric vs. balanced**: The skill is still image-centric because image generation is the most common request. Video/audio/motion/sprite sections are shorter.
3. **No output artifact tag**: Kept the rule of not emitting `<artifact>` for media files. This matches the original skills but differs from most other build skills.

## Open Questions

1. Should hatch-pet be preserved as a standalone "themed media" skill or is it too specific?
2. Should video generation include more detail on editing workflows (cuts, transitions, music sync)?
3. Should audio generation include voice/TTS alongside jingles?
4. The media contract dispatcher syntax (`node "$OD_BIN" media generate`) assumes a specific CLI — should this be generalized?
