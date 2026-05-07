# Discovery Files — Conflict Resolution vs PR #8

## Conflict
PR #8 (synthesis-strategy) originally contained `scripts/discovery.mjs` and `playbooks/discovery.md`.
PR #10 (synthesis-discovery) also contained these files with different content.

## Resolution
PR #8 was revised per issue #13 to remove files belonging to other function groups.
`scripts/discovery.mjs` and `playbooks/discovery.md` were removed from PR #8.

PR #10 now owns the canonical discovery files uncontested.

## Canonical Files
- `scripts/discovery.mjs` — 20,508 bytes (single ESM with `--research` and `--analyze` modes)
- `playbooks/discovery.md` — Unified 3-phase discovery playbook

## Decision
No merge required — PR #8 yielded ownership to PR #10 per function-group boundaries.

## Open Questions
- Should discovery.mjs be moved to a `tools/` or `scripts/` directory in final structure?
- Playwright enrichment (~50MB) — keep inline or extract to external dependency?
