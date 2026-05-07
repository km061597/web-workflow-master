# Decision Log: intake-existing-site Playbook

## Sources

| Source file | Version | Size | SHA256 |
|---|---|---|---|
| `playbooks/intake-existing-site.md` | gsd-design | 12,297 bytes | `940098307c0dc570baf470709757cc6f64fe2e663e4de881dab22a753a1d62a0` |

## Kept From

- **Entire playbook** from gsd-design. This is a single-source artifact — no other version has an existing-site intake playbook.

## Merged From

- Nothing. Only one source exists.

## Rejected

- Nothing rejected from this source.
- We did NOT merge in open-design's `design-brief` skill (which could inform BRIEF.md structure) or desigjn-toolkit's `visual-qa.md` skill (which could inform the audit sections). Scope bounded to explicit intake.json rows.

## Tradeoffs

1. **Vocabulary normalization — `sites/<name>/` → `clients/<slug>/`**: Applied throughout, ~25+ occurrences. Same rationale as intake-greenfield. The migration subdirectory structure (`migration/urls-raw.txt`, `migration/feature-parity.md`, etc.) was preserved under the new parent path.
2. **Tool references made portable**: Repo-local click-path and release-gate paths were replaced with active-project workflow guidance. Generic external tools and shell snippets remain as examples.
3. **Cross-reference to intake-greenfield**: The original references `playbooks/intake-greenfield.md` analytics section. We kept this as a cross-playbook reference but noted in the greenfield playbook that the canonical path is `playbooks/intake-greenfield.md`.
4. **Mobile requirements reference**: The original referenced a repo-local mobile requirements file. We generalized this to "mobile requirements spec" to avoid binding to a specific file that may not exist in the master repo structure.

## Open Questions

1. **Highest-risk playbook**: This playbook handles DNS cutover, redirect maps, and SEO preservation — the highest-stakes operations in the entire workflow. Should it have an explicit "runbook mode" with a mandatory pre-flight checklist before execution?
2. **Stack dependency**: Like intake-greenfield, this still assumes crawl, audit, and release-readiness capabilities exist. The exact command wiring remains owner-scoped until the master repo emits a canonical scaffold/quality toolchain.
3. **Rollback plan detail**: The rollback section is only 3 bullets. For a production cutover, this feels thin. Should we add: DNS TTL timing, Vercel deployment rollback CLI commands, and a communication template for notifying the client?
