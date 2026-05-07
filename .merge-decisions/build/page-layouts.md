# Decision Log: page-layouts

## Sources

- `open-design/skills/saas-landing/SKILL.md` (open-design) — SaaS landing page
- `open-design/skills/dashboard/SKILL.md` (open-design, 2695B) — Dashboard layout
- `open-design/skills/mobile-app/SKILL.md` (open-design, 3798B) — Mobile app landing
- `open-design/skills/gamified-app/SKILL.md` (open-design, 4455B) — Gamified app
- `open-design/skills/dating-web/SKILL.md` (open-design, 3919B) — Dating platform
- `open-design/skills/blog-post/SKILL.md` (open-design, 2749B) — Blog post
- `open-design/skills/digital-eguide/SKILL.md` (open-design, 3423B) — Digital e-guide
- `open-design/skills/docs-page/SKILL.md` (open-design, 2594B) — Documentation page
- `open-design/skills/email-marketing/SKILL.md` (open-design, 3502B) — Marketing email
- `open-design/skills/finance-report/SKILL.md` (open-design, 2115B) — Finance report
- `open-design/skills/team-okrs/SKILL.md` (open-design, 1316B) — Team OKRs
- `open-design/skills/kanban-board/SKILL.md` (open-design, 1504B) — Kanban board
- `open-design/skills/weekly-update/SKILL.md` (open-design, 1519B) — Weekly update
- `open-design/skills/meeting-notes/SKILL.md` (open-design, 1307B) — Meeting notes
- `open-design/skills/invoice/SKILL.md` (open-design, 1396B) — Invoice
- `open-design/skills/pm-spec/SKILL.md` (open-design, 1555B) — PM spec
- `open-design/skills/eng-runbook/SKILL.md` (open-design, 1540B) — Engineering runbook
- `open-design/skills/pricing-page/SKILL.md` (open-design) — Pricing page
- `open-design/skills/social-carousel/SKILL.md` (open-design) — Social carousel
- `open-design/skills/hr-onboarding/SKILL.md` (open-design) — HR onboarding
- `open-design/skills/extract-design/SKILL.md` (open-design) — Extract design
- `open-design/skills/wireframe-sketch/SKILL.md` (open-design, 4030B) — Wireframe sketch
- `gsd-design/skills/dashboard-builder/SKILL.md` (gsd-design, 2344B) — Dashboard builder
- `gsd-design/skills/ui-demo/SKILL.md` (gsd-design, 15244B) — UI demo

## Kept From

- **open-design/page skills** (main, canonical): The open-design repo has ~20 page-specific skills, each with a default rhythm and token mapping. These form the core of the canonical skill.
- **open-design/saas-landing**: Default landing page rhythm (hero → features → stats → pricing → cta).
- **open-design/dashboard**: Sidebar nav + header + metric cards + charts + table rhythm.
- **open-design/mobile-app**: Hero → feature showcase → screenshots → cta rhythm.
- **open-design/blog-post**: Header → meta → content → related → comments rhythm.
- **open-design/email-marketing**: Email-specific constraints (600px max width, inline styles).

## Merged From

- **20+ page templates**: Merged all page-specific skills into a single table with template name, default rhythm, and use case. This replaces 20 separate skills.
- **Gsd-design dashboard-builder**: Merged dashboard-specific builder patterns into the dashboard template entry.
- **Gsd-design ui-demo**: Merged demo presentation patterns (interactive elements, state toggles) into relevant templates.

## Rejected

- **Individual page skills**: Each open-design page skill was a separate file with 1.3–4.5KB of content. Rejected as redundant — the canonical skill covers all 20+ in one reference table.
- **Duplicate gsd-design copies**: gsd-design had identical copies of many page skills. Rejected.
- **extract-design**: This is a design extraction skill, not a page layout template. Moved to standalone note.
- **wireframe-sketch**: Wireframing is a different workflow from page building. Rejected as standalone.

## Tradeoffs

1. **Table vs. detailed sections**: Used a summary table for all 20 templates rather than dedicated sections for each. This is concise but means less detail per template. Each template still has its full skill file in the source repo for deep dives.
2. **Template count**: Included all ~20 templates found in open-design. Could have trimmed to the most common 10, but the marginal cost of listing them is low.
3. **Email as page type**: Email marketing is not a web page but included because it shares the same workflow (seed → sections → tokens → emit).

## Open Questions

1. Should the most popular templates (saas-landing, dashboard, blog-post) have expanded sections with full layout skeletons?
2. Should wireframe-sketch be a separate canonical skill or part of this one?
3. Should extract-design be a separate canonical skill for design-to-code workflows?
4. The template list could grow — should it be dynamically generated from a data file rather than hardcoded in SKILL.md?
