# Playbooks — workflow recipes

Copy-paste workflows for common design tasks. Each playbook lists the agents to dispatch, the order, and what parallel/serial means in context.

**Convention:** `A → B` means serial. `A ‖ B` means parallel (single message, multiple `Agent` tool calls).

**Mobile is the lead.** Every UI playbook has mobile-first DoD. Desktop is a follow-on.

## Where to find depth playbooks

Beyond agent dispatch chains, the workspace will ship problem-specific playbooks at `playbooks/` — **TODO pending owner** (not yet synthesized):

| Concern | File | Status |
|---|---|---|
| Brand asset pipeline (favicons, OG, splash) | `playbooks/brand-assets.md` | **TODO pending owner** |
| Form quality (validation, mobile keyboards, autofill) | `playbooks/form-quality.md` | **TODO pending owner** |
| Service workers (offline, install prompts, push) | `playbooks/service-worker-patterns.md` | **TODO pending owner** |
| Component playground (Storybook setup) | `playbooks/storybook-setup.md` | **TODO pending owner** |
| Dark mode parity audit | `playbooks/dark-mode-parity.md` | **TODO pending owner** |
| Reduced motion / data / transparency | `playbooks/reduced-motion.md` | **TODO pending owner** |
| Ship-readiness 30-point checklist | `playbooks/ship-readiness.md` | **TODO pending owner** (quality function group) |
| Client scenario routing | `playbooks/scenario-routing.md` | **Moved to strategy function group** (PR #8) |
| Competitor research | `playbooks/competitor-research.md` | **Moved to strategy function group** (PR #8) |
| Information architecture + navigation | `playbooks/information-architecture.md` | **Moved to strategy function group** (PR #8) |
| Product discovery + merchandising | `playbooks/product-discovery.md` | **Moved to strategy function group** (PR #8) |
| Existing-site rebuild / migration | `playbooks/intake-existing-site.md` | **TODO pending owner** (intake function group) |
| Greenfield / no-brand intake | `playbooks/intake-greenfield.md` | **TODO pending owner** (intake function group) |
| Visual quality review | `playbooks/visual-quality-review.md` | **TODO pending owner** (quality function group) |
| Conversion flow testing | `playbooks/conversion-flow-testing.md` | **TODO pending owner** (quality function group) |
| Maintainability handoff | `playbooks/maintainability-handoff.md` | **TODO pending owner** (quality function group) |
| Forced colors mode | `playbooks/forced-colors-mode.md` | **TODO pending owner** |
| RTL language support | `playbooks/rtl-audit.md` | **TODO pending owner** |
| 200% browser zoom audit | `playbooks/zoom-200.md` | **TODO pending owner** |
| Print stylesheets | `playbooks/print-styles.md` | **TODO pending owner** |
| Email design infrastructure | `playbooks/email-infra.md` | **TODO pending owner** |
| Industry research | `playbooks/industry-research.md` | **TODO pending owner** |
| Artist / existing-site rebuilds | `playbooks/artist-existing-site-rebuild.md` | **TODO pending owner** |
| DOM-box debugging | `playbooks/dom-box-debugging.md` + `quality/debug/` | **TODO pending owner** |
| AI-assisted workflows | `playbooks/ai-assisted-site-quality.md` | **TODO pending owner** |
| AI prompt pack | `playbooks/ai-site-prompt-pack.md` | **TODO pending owner** |
| AI research digest | `playbooks/ai-assisted-site-quality-research.md` | **TODO pending owner** |
| Quality enforcement map | `quality/enforcement-map.md` | **TODO pending owner** (quality function group) |
| Test evidence | `playbooks/test-evidence.md` | **TODO pending owner** |
| Storefront / small-business commerce | `playbooks/storefront-small-business.md` | **TODO pending owner** |

And reusable conventions at `conventions/` — **TODO pending owner** (not yet synthesized):

| Convention | File | Status |
|---|---|---|
| Voice and tone | `conventions/voice-and-tone.md` | **TODO pending owner** |
| Motion tokens | `conventions/motion-tokens.md` | **TODO pending owner** |
| Color APCA | `conventions/color-apca.md` | **TODO pending owner** |
| Analytics events | `conventions/analytics-events.md` | **TODO pending owner** |
| Banned words | `conventions/banned-words.json` + `conventions/banned-words-detect.sh` | **TODO pending owner** |
| Microcopy library | `conventions/microcopy-library.md` | **TODO pending owner** |
| Schema.org JSON-LD templates | `schemas/seo-jsonld/` | **TODO pending owner** |

**Note:** These playbooks and conventions exist in source repos (desigjn-toolkit, gsd-design, WEBSITES) but have not yet been synthesized into the master workspace. Each will be claimed by a future function-group PR.

---

## 1. New website from scratch (mobile-first; the default)

```
brand-strategist            # positioning, voice, audience
  ↓
research-agent           # moodboard, competitor teardown, refs
  ↓
design-system-agent     # DESIGN.md + tokens (mobile breakpoints first)
  ↓
ui-engineer       # mobile envelope: viewport, safe-area, PWA, iOS quirks
  ↓
design-system-agent ‖ interaction-engineer    # parallel
  ↓
ui-engineer                 # implementation (mobile-first CSS)
  ↓
ui-engineer         # 320 → 2560 viewport pass
  ↓
accessibility-auditor               # phone/tablet/desktop matrix via surf-cli
  ↓
art-director ‖ accessibility-auditor ‖ performance-engineer (mobile preset)    # parallel
  ↓
brand-strategist
  ↓
shipper                     # Vercel deploy
```

Entry point: `art-director` (it dispatches the chain).

Artifacts produced:
- `sites/<name>/CREATIVE-DIRECTION.md` (art-director)
- `sites/<name>/DESIGN.md` (design-system-agent)
- `sites/<name>/RESEARCH.md` (research-agent)
- `sites/<name>/MOBILE-SPEC.md` (ui-engineer)
- `sites/<name>/docs/device-tests/<date>.md` (accessibility-auditor)
- Pre-deploy: WCAG audit report, **mobile** Core Web Vitals, OG card preview

---

## 2. Clone a reference site

```
research-agent                 # extract DESIGN.md + component plan from URL
  ↓
ui-engineer                 # build it (mobile-first regardless of source's stack)
  ↓
ui-engineer         # multi-viewport correctness
  ↓
ui-engineer       # ensure source's mobile decisions translated, not just desktop
  ↓
design-critic               # spot-check for AI-slop, drift from source
  ↓
art-director ‖ accessibility-auditor   # pixel-diff vs reference + real device matrix
```

Tools the agents will reach for:
- `surf-cli` to navigate the reference (in mobile + desktop emulation)
- `firecrawl-cli` to extract content
- `references/awesome-design-md/` — **TODO pending owner** — if the brand has a public DESIGN.md
- `references/open-design/` — **TODO pending owner** — for 72 cataloged brand systems

---

## 3. "Make this look better"

```
design-critic               # find issues, file:line, severity (run mobile + desktop)
  ↓
art-director                # taste calls on what to fix and how
  ↓
relevant specialist(s)      # design-system-agent, animation-agent, etc.
  ↓
art-director ‖ accessibility-auditor   # before/after diff (mobile + desktop)
```

Run `design-critic` first — don't ask the user to pre-list issues.

---

## 4. Mobile-exceptional pass (when "make mobile great" is the brief)

```
ui-engineer       # audit envelope, PWA-readiness, iOS Safari quirks
  ↓
ui-engineer ‖ interaction-engineer ‖ performance-engineer (mobile preset)    # parallel
  ↓
interaction-engineer        # wire any new touch gestures
  ↓
accessibility-auditor               # full matrix: 6 phones + 3 tablets + 4 desktop widths
  ↓
accessibility-auditor       # touch-target audit; gestures with non-gesture fallback
  ↓
art-director                   # mobile-first review
```

Loads `MOBILE.md` — **TODO pending owner** — as the bible for every agent in the chain.

---

## 5. Polish pass before ship

Parallel:
- `animation-agent` — review animations, easing, stagger, `prefers-reduced-motion`
- `design-system-agent` — optical alignment, kerning, fluid scale
- `design-system-agent` — contrast, dark mode parity
- `design-system-agent` — weight/size consistency
- `interaction-engineer` — gesture feel, thumb-zone reachability
- `content-modeler` — microcopy, error states, empty states

Then: `design-critic` → `art-director` ‖ `accessibility-auditor`.

---

## 6. Ship it

```
accessibility-auditor ‖ performance-engineer ‖ brand-strategist    # parallel
  ↓
accessibility-auditor                  # Playwright golden paths (mobile + desktop)
  ↓
shipper                     # Vercel deploy
  ↓
performance-engineer             # post-deploy event QA (canary)
```

The three parallel reviewers must all return pass before `shipper` runs. Any flag → fix → re-run that reviewer only.

**Performance gate:** Mobile Lighthouse Performance ≥90 with Slow 4G + 4× CPU throttle. Desktop is a follow-on.

---

## 7. Brand identity from scratch

```
brand-strategist            # positioning, audience, pillars
  ↓
research-agent           # visual references, what the space looks like
  ↓
design-system-agent ‖ design-system-agent     # parallel
  ↓
design-system-agent                # logomark + supporting glyphs
  ↓
design-system-agent       # photo/illustration style direction
  ↓
content-modeler                 # voice samples, tagline candidates
```

Output: `sites/<name>/BRAND.md` with positioning, voice, palette rationale, type rationale, motion philosophy.

---

## 8. Component library setup

```
design-system-agent         # owns the inventory + naming
  ↓
ui-engineer ‖ interaction-engineer    # parallel implementation
  ↓
ui-engineer ‖ interaction-engineer    # parallel
  ↓
accessibility-auditor       # WCAG 2.2 AA per component (incl. touch targets)
```

Use the `shadcn` MCP to pull base components, then layer brand tokens. Don't write a button from scratch when shadcn has one.

Every component DoD includes: works at 320px, touch target ≥44×44px (48px preferred), keyboard + mouse + touch all functional.

---

## 9. Performance triage (mobile is the gate)

```
performance-engineer        # mobile Lighthouse first; find bottlenecks
  ↓
performance-engineer ‖ ui-engineer    # parallel — images vs JS
  ↓
performance-engineer        # re-audit on mobile preset
```

Likely tools:
- `unlighthouse --site <url>` for bulk mobile Lighthouse across all routes
- `chrome-devtools` MCP for perf traces with throttling
- `sharp -i hero.jpg -o hero.avif` for image conversion
- `svgo` for SVG optimization
- per-site `bundle-analyzer` (`@next/bundle-analyzer` or `vite-bundle-visualizer`)

---

## 10. Accessibility remediation

```
accessibility-auditor       # WCAG 2.2 AA full pass + touch-target audit, file:line findings
  ↓
ui-engineer ‖ interaction-engineer ‖ content-modeler    # parallel — fix layer by layer
  ↓
accessibility-auditor       # re-audit
  ↓
accessibility-auditor                  # keyboard-only journey test + screen reader smoke
```

CLI: `axe <url>` for automated pass; manual VoiceOver / TalkBack for the rest.

---

## 11. SEO + analytics wire-up

```
brand-strategist              # meta, schema.org, sitemap, OG
  ↓
content-modeler             # CMS-side fields for SEO (title, description, OG image)
  ↓
performance-engineer             # GA4/Plausible/Posthog events
  ↓
shipper                     # deploy
  ↓
performance-engineer             # canary check that events fire in prod
```

---

## 12. Adding motion to an existing site

```
animation-agent             # principles, what should move and why
  ↓
interaction-engineer  # mobile gesture-driven motion (if applicable)
  ↓
ui-engineer                 # implement with GSAP
  ↓
performance-engineer (mobile preset)    # ensure motion didn't regress CWV (especially CLS)
  ↓
accessibility-auditor       # respect prefers-reduced-motion
  ↓
art-director ‖ accessibility-auditor   # before/after comparison + real device check
```

Skill to load: `.claude/skills/gsap/` — **TODO pending owner**.

Also load motion-frames and liquid-glass-design (for iOS-style motion).

---

## 13. PWA / mobile-installable build

```
ui-engineer       # owns the manifest, icons, install flow, offline strategy
  ↓
ui-engineer                 # adds vite-plugin-pwa or next-pwa, registers service worker
  ↓
performance-engineer        # service worker shouldn't tank LCP; verify on mobile preset
  ↓
accessibility-auditor               # install on real iPhone + Pixel via Browserbase
  ↓
accessibility-auditor       # PWA-specific: status bar, icon badges, deep links
```

Verify: Lighthouse PWA score ≥90, manifest validates, service worker registers, install prompt fires on supported browsers.

---

## 14. Dogfood / smoke test a deployed site

Don't dispatch agents. Use the CLI directly:

```bash
# Mobile-first dogfood
surf emulate.device "iPhone 15" && surf go <url>
surf emulate.device "Pixel 9 Pro" && surf go <url>
surf emulate.device "iPhone SE" && surf go <url>     # narrow viewport sanity

# Bulk Lighthouse mobile preset
unlighthouse --site <url>

# A11y sweep
axe <url>

# Console + network logs
surf console --level error
surf network --status 4xx,5xx
```

Escalate to `accessibility-auditor` agent if you find device-specific issues. Escalate to `art-director` if you find issues worth a structured report.

---

## 15. Deep competitor teardown

```
research-agent           # main agent
```

Tools it will reach for:
- `surf-cli` for navigation + screenshots (mobile + desktop)
- `firecrawl-cli` for content extraction
- `web-check` (Docker) for OSINT — DNS, headers, security posture, tech stack
- `references/awesome-design-md` — **TODO pending owner** — to compare against published DESIGN.md
- `references/open-design` — **TODO pending owner** — for 72 brand systems

Output: `sites/<name>/research/<competitor>-teardown.md`

---

## Anti-patterns

- **"We'll do mobile in the polish pass."** Mobile is the lead. Read `MOBILE.md` — **TODO pending owner**.
- **Serializing parallelizable work.** If two agents don't share state, dispatch them in one message.
- **Skipping `design-critic` before ship.** AI-slop is the failure mode this workspace exists to prevent.
- **Skipping `accessibility-auditor` before ship.** "Looks fine on my MacBook" ≠ tested.
- **Doing taste calls inline.** Delegate to `art-director` or `design-critic`. The orchestrator is allowed to disagree with you.
- **Using `browserbase` for local dev verification.** Use `surf-cli`. Browserbase is paid quota — earn its use with real-device-only needs.
- **Building components from scratch when shadcn has them.** Pull via the `shadcn` MCP.
- **Guessing at framework APIs.** Use `context7` MCP for current docs.
- **Editing `references/`.** They're upstream clones; treated as read-only.
- **Installing design libs at workspace root.** They go inside `sites/<name>/`.
- **Bare `100vh` for full-height sections.** Use `100dvh`.
- **Targeting desktop CWV scores while ignoring mobile.** Mobile is the gate.

---

## Quick reference: when in doubt

| Question | Action |
|---|---|
| Which agent? | Dispatch `art-director`. |
| Mobile rules? | Read `MOBILE.md` — **TODO pending owner**. |
| Which CLI? | Read `TOOLS.md` — **TODO pending owner**. |
| Which workflow? | Find the closest playbook above. |
| Which MCP? | Try the CLI first. |
| Browser? | `surf-cli` first, browserbase last (real-device only). |
| Library docs? | `context7` MCP. |
| Component? | `shadcn` MCP. |
| Reference design? | `references/awesome-design-md/` or `references/open-design/` — **TODO pending owner**. |
| Mobile envelope quirk? | Dispatch `ui-engineer`. |
| Touch gesture spec? | Dispatch `interaction-engineer`. |
| Device matrix? | Dispatch `accessibility-auditor`. |
