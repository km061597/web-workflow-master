# Decision Log: maintainability-handoff

## Sources

- `gsd-design/playbooks/maintainability-handoff.md` (gsd-design, 6354B) — Maintenance handoff playbook for SHIP→MAINTAIN phase transition

## Kept From

- **gsd-design/maintainability-handoff** (sole source, canonical base): Complete playbook preserved with master-repo portability edits — the MAINTENANCE.md template, maintain-phase readiness checklist, owner walkthrough procedure (5 steps), and the "no half-measure" closing argument.

## Merged From

- Nothing to merge. This is a unique artifact with no duplicates across the 5 version repos.

## Rejected

- Nothing rejected. The playbook is self-contained and has no conflicting content with other ship-group artifacts.

## Tradeoffs

1. **Playbook pass-through with portability edits**: This is an operational playbook, not a skill. It prescribes process (the owner walkthrough, the MAINTENANCE.md template) rather than generating artifacts. The process is preserved, while source repo-local script paths were rewritten to active-project gate guidance because those scripts are not emitted here.
2. **Path canonicalization**: The vocabulary-map.md shows `playbooks/` as a recognized pattern. Since master had no `playbooks/` directory yet, we created one at root. This is consistent with the gsd-design source layout.
3. **Template-specific assumptions preserved**: The MAINTENANCE.md template assumes specific stack choices (Vercel, Sanity, Cloudflare, Formspree/Resend, Plausible, Sentry). These are kept as-is because they reflect the "typical" AI-built small-business site stack in the gsd-design workflow. Generalizing them (e.g., "hosting provider" instead of "Vercel") would make the template less actionable.
4. **Hardcoded contact preserved**: The template includes `kylemetzger0615@gmail.com` as the "Owner of the design system" contact. This was kept as-is from the source — it is a real contact in the originating workspace and may serve as a fallback for future maintainers.

## Open Questions

1. The playbook now references active-project click-path, release/readiness, and MAINTAIN-phase readiness checks instead of missing repo-local script paths. The master repo still needs to decide which future owner emits canonical executable gates.
2. The maintain-phase checklist enforces 5 criteria for MAINTENANCE.md. Should these criteria be promoted to a standalone quality-doc or gate script in master?
3. The template is heavily Vercel/Sanity/Cloudflare-biased. Should alternate templates be added for Netlify/Strapi/Route53 stacks, or should the current template be made more generic?
4. The playbook does not address SEO maintenance (sitemap updates, broken link checking, structured data drift). Should an "SEO maintenance" section be added?
