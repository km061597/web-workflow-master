---
name: skills-and-references
aliases: reference-index, skill-architecture, community-skills-ecosystem
description: 21 reference repos organized by design phase, skill architecture patterns (Capability Uplift vs Encoded Preference), and community skills catalog with security notes. Tells the AI what to consult, when, and what NOT to do.
type: reference
---

# Skills & References

## Reference Index

21 reference repositories catalogued for a future reference-pack checkout. The actual reference-pack directory is TODO pending owner (reference-pack function group).

### Phase: Research

Consult during discovery and competitor analysis.

| Repo               | What It Contains                                                        | When to Consult                        | Key Files                      |
| ------------------ | ----------------------------------------------------------------------- | -------------------------------------- | ------------------------------ |
| `web-check/`       | 35 API endpoint website analyzer (DNS, SSL, security, perf, tech stack) | Auditing existing sites pre-migration  | README for API list            |
| `Scrapling/`       | Stealth web scraping patterns                                           | Extracting content from JS-heavy sites | Source for stealth patterns    |
| `browser-harness/` | Browser automation patterns                                             | Automating research workflows          | Source for automation examples |

### Phase: Design

Consult during visual design and token generation.

| Repo                 | What It Contains                                                                              | When to Consult                                     | Key Files                            |
| -------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------ |
| `impeccable/`        | **Premier**: 23 design commands, 27 anti-pattern rules, OKLCH color laws, 7 domain references | EVERY design task. Run `critique` before finalizing | `skill/SKILL.md`, `skill/reference/` |
| `taste-skill/`       | Anti-slop framework: variance/motion/density dials, font bans, hero patterns                  | Before building any page layout                     | `skills/taste-skill/SKILL.md`        |
| `awesome-design-md/` | Curated design resources                                                                      | Finding specific design references                  | README                               |
| `huashu-design/`     | Chinese design system patterns                                                                | Alternative design language reference               | Source                               |
| `open-design/`       | Open design system                                                                            | Reference for design token structure                | Source                               |

### Phase: Build

Consult during component creation and page assembly.

| Repo             | What It Contains                                               | When to Consult                                      | Key Files                       |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------- |
| `magicui/`       | 76 animated React components (install via shadcn CLI)          | Selecting animation components for specific sections | List in `COMPONENT_AND_ANIMATION_REGISTRY.md` |
| `react-bits/`    | 110+ animated React components (text, backgrounds, components) | Unique text effects, advanced backgrounds            | `src/ts-default/` directory     |
| `design-blocks/` | 170+ Bootstrap 4 HTML blocks (by Froala)                       | Layout inspiration by section type                   | Browse by category              |
| `animate.css/`   | CSS animation library (already a dependency)                   | Simple CSS-only animations                           | Documentation                   |
| `gsap-skills/`   | Official GSAP example code                                     | Complex scroll animations                            | Source                          |

### Phase: Quality

Consult during verification and pre-launch.

| Repo                               | What It Contains                                             | When to Consult                                  | Key Files                                   |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------------- |
| `Front-End-Checklist/`             | 70+ item pre-launch checklist with priority levels           | Before delivering any site                       | README                                      |
| `Front-End-Performance-Checklist/` | Performance-specific optimization checklist                  | Before launch for any public-facing site         | README                                      |
| `ai-website-cloner-template/`      | 5-phase reverse-engineering pipeline with parallel worktrees | When cloning/reverse-engineering reference sites | README, `docs/research/INSPECTION_GUIDE.md` |

### Phase: Reference Only

Consult when curious or for inspiration. Do NOT import directly.

| Repo                   | What It Contains                             | Notes                     |
| ---------------------- | -------------------------------------------- | ------------------------- |
| `open-lovable/`        | AI chat-to-build React apps (Firecrawl team) | Builder workflow patterns |
| `stitch-skills/`       | Google Stitch patterns                       | Compatibility reference   |
| `ui-ux-pro-max-skill/` | UI/UX skill patterns                         | Pattern reference         |
| `awesome-shadcn-ui/`   | Curated shadcn component collections         | Discovery only            |
| `design.md/`           | Google design.md format                      | Format reference          |

### Rules

- Never import from reference repos directly — read patterns, write fresh
- Never modify reference repos — read-only consumption
- Consult Impeccable on every design task — it's the quality floor
- If unsure which repo to consult, check this index before guessing

---

## Skill Architecture

Based on Nate Herk's framework (via Firecrawl blog, Apr 2026) and the Agent Skills open standard.

### Two Kinds of Skills

#### Capability Uplift

Claude **cannot do the task** without this skill. The skill teaches new capabilities.

Examples:

- Firecrawl (web scraping at scale)
- Webapp Testing (Playwright browser tests)
- Remotion (programmatic video)
- Document Skills (PDF/DOCX/XLSX creation)

Install pattern: `npx -y <cli> init` — the skill installs its own CLI tooling.

#### Encoded Preference

Claude **already knows how**, but the skill captures your specific way. Without it, Claude guesses — and converges toward generic defaults.

Examples:

- frontend-aesthetics (anti-slop design steering)
- Design spec template guidance (TODO pending owner: design-spec function group)
- Code review checklists
- Commit message formats
- NDA review processes

**This is the category that prevents AI slop.** Claude knows how to build a website. The skill encodes the specific choices that make it _yours_ — not the statistical mean of its training data.

### Progressive Disclosure Architecture

Skills use a three-tier loading model to stay out of context until needed:

| Tier                    | What loads       | Token cost       | When                             |
| ----------------------- | ---------------- | ---------------- | -------------------------------- |
| 1. Name + description   | ~100 tokens      | At startup       | Always                           |
| 2. SKILL.md body        | ~400-2000 tokens | On trigger match | When task matches description    |
| 3. References + scripts | Variable         | On demand        | When skill explicitly loads them |

This is why skills beat system prompts: a 400-token design skill stays completely out of context until you're actually building UI. A permanent system prompt burns those 400 tokens on every single message.

### The Open Standard

Agent Skills spec adopted by: Claude Code, OpenAI Codex CLI, Cursor, Gemini CLI, GitHub Copilot. A skill works across all tools without modification.

YAML frontmatter contract:

```yaml
---
name: my-skill
description: A clear sentence about what this skill does and when to use it.
---
```

Description = trigger, not summary. Write: "Use when users want to [do X]" not "A skill for X."

### Installation Scopes

- **Personal**: `~/.claude/skills/` — private, available across all projects
- **Project**: `.claude/skills/` — shared with everyone who clones the repo
- **Plugin** (via `gh skill install`): `.claude/skills-official/` or `.claude/skills-ecc/`

### Skill Design Rules

1. **Description is the trigger.** If it doesn't fire when it should, rewrite the description.
2. **Pushiness combats undertriggering.** Add "Make sure to use this skill whenever..." for critical skills.
3. **Keep SKILL.md under 1000 tokens** when possible. Move details to references/.
4. **One skill = one domain.** Don't combine web scraping + design + testing into one file.
5. **Security**: 36% of community skills contain prompt injection (Snyk ToxicSkills 2026). Always preview before installing.

---

## Community Skills Ecosystem

Open-source Claude Code skills for frontend design. Installable via `gh skill install` or manual clone to `.claude/skills/`.

### Worth Installing

| Skill                 | Source                    | What It Does                                                                                                         | Stars           |
| --------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------- |
| `frontend-design`     | `anthropics/skills`       | Official. Distinctive frontend interfaces. Bans Inter/Roboto/Arial. Design-thinking-first workflow.                  | 72k+ installs   |
| `web-design`          | `KAOPU-XiaoPu/web-design` | Spec-first: 9-section DESIGN.md → code. 100-score quality self-audit. 3-phase workflow.                              | New (Apr 2026)  |
| `web-design-engineer` | `ConardLi/garden-skills`  | Anti-cliché blocklist. oklch color theory. 6 curated color×font pairings. 520-line advanced patterns library.        | Popular         |
| `cc-design`           | `ZeroZ-lab/cc-design`     | 68+ brand design systems loadable on demand (Stripe, Vercel, Notion, Linear, Apple, Tesla). Playwright verification. | New (Apr 2026)  |
| `ui-skills`           | `ibelick/ui-skills`       | Polish pack: `/baseline-ui`, `/fixing-accessibility`, `/fixing-motion-performance`, `/fixing-metadata`.              | Quality-of-life |
| `taste-skill`         | `Leonxlnx/taste-skill`    | 3-parameter tuning (VARIANCE/MOTION/DENSITY). 9 specialized variants. Reference checkout is TODO pending owner.      | 13.3k           |
| `remotion-dev/skills` | Official Remotion         | Video as React components. 25k+ installs first week. Scaffold, animate, render from prompts.                         | 39k (Remotion)  |

### How to Install

```bash
# Search
gh skill search frontend

# Preview (SECURITY: always read before installing!)
gh skill preview anthropics/skills frontend-design

# Install to project
gh skill install anthropics/skills frontend-design --scope project --agent claude-code

# Pin to commit for reproducibility
gh skill install anthropics/skills frontend-design --pin 5128e18

# Manual clone
git clone <repo> ~/.claude/skills/<skill-name>
```

Supports 30+ AI agents: Claude Code, GitHub Copilot, Cursor, Codex, Gemini CLI, Windsurf, etc.

### Video Generation (Remotion + Claude Code)

Remotion is React for video. Claude Code can now generate videos from prompts:

```bash
npx skills add remotion-dev/skills
```

Then prompt Claude Code:

> "Create a 30-second product launch video with logo animation, feature callouts, and CTA"

Claude scaffolds a Remotion project, writes animation logic (interpolate, spring, Sequence), and renders to MP4.

Core patterns:

```tsx
const frame = useCurrentFrame();
const opacity = interpolate(frame, [0, 2 * fps], [0, 1], {
  extrapolateRight: "clamp",
});
```

Ecosystem: Claude Code Video Toolkit (`wilwaldon`), Launchpad (`trycua`), Remotion MCP Server (`@remotion/mcp`), AI SaaS Starter Kit.

Use cases: product demos, data visualizations, explainer videos, personalized video at scale.

### The Master List: wilwaldon Toolkit

**wilwaldon/Claude-Code-Frontend-Design-Toolkit** (172 stars, 70+ tools, 10 sections):
[github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit)

The most comprehensive community-curated resource. Sections:

1. **Design Skills** — Kill AI slop (frontend-design official, UI/UX Pro Max 62.6k stars, taste-skill)
2. **Site-Wide Theming** — Design tokens, CSS variables
3. **Animation & Motion** — GSAP, Framer Motion, scroll effects
4. **UI/UX Intelligence** — Patterns, a11y, research
5. **Design-to-Code** — Figma pipeline
6. **Testing & Browser Automation** — Give Claude eyes
7. **Docs & Context** — Stop hallucinating APIs
8. **Framework Skills** — React, Tailwind, Three.js, D3
9. **Deploy & Preview** — Ship it
10. **Recommended Stacks** — What to install together

### Most-Installed Skills (aitmpl.com, May 2026)

| Skill                                    | Installs | Category             |
| ---------------------------------------- | -------- | -------------------- |
| **Frontend Design** (Anthropic official) | 22,847   | Anti-slop            |
| Code Reviewer                            | 17,239   | Quality              |
| Senior Frontend                            | 14,630   | Development          |
| Senior Backend                           | 12,764   | Development          |
| Skill Creator                            | 11,341   | Meta                 |
| Senior Architect                         | 10,903   | Architecture         |
| **UI UX Pro Max**                        | 9,885    | Design (240+ styles) |
| UI Design System                         | 8,456    | Design tokens        |
| React Best Practices                     | 8,036    | Performance          |
| Webapp Testing                           | 6,153    | Testing              |
| Canvas Design                            | 5,571    | Visual art           |
| Brainstorming                            | 5,104    | Pre-work             |

**Pattern**: The most-installed skill (Frontend Design, 22.8k) is an Encoded Preference skill — it doesn't add new capabilities, it encodes design taste. This confirms that anti-slop steering is the single most valuable thing you can add to an AI coding agent.

```bash
gh skill search frontend          # discover
gh skill preview <repo> <skill>   # read before installing
gh skill install <repo> <skill>   # install
gh skill list                     # what's installed
gh skill update <skill>           # update
```

### Security Warning

A Snyk "ToxicSkills" study (2026):

- **36%** of tested skills contained prompt injection
- **1,467** malicious payloads identified
- Always `gh skill preview` before installing
- Pin to specific commit with `--pin`
- Prefer official/verified repos: `anthropics/skills`, `vercel-labs/agent-skills`
- Review SKILL.md with same rigor as PR code review
