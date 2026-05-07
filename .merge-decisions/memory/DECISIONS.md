# Decision Log: DECISIONS.md

## Sources

| Source File | Version | Description |
|-------------|---------|-------------|
| `.claude/memory/DECISIONS.md` | desigjn-toolkit v1 | Log of design decisions with rationale, alternatives, dates |

## Kept From

- **DECISIONS.md**: All 11 decision entries, unchanged. This file is a chronological append-only log and has no overlapping content with any other file.

## Merged From

- No merging performed. This file was kept as a standalone artifact because it is a running log that gets appended during work. Merging it with other files would break the append-only workflow and create version-control confusion.

## Rejected

- N/A — single source, no deduplication needed.

## Tradeoffs

- **Tradeoff**: Keeping a separate file for decisions means the memory index has one more entry. This is acceptable because decisions are read selectively ("when making new decisions") rather than at task start.
- **Tradeoff**: The file is undated in its header (only individual entries have dates). A "last updated" field could be added, but it would require manual maintenance and is not worth the friction.

## Open Questions

- Should decisions be tagged with the project/client they apply to? Currently they are global.
- Should reversible decisions be marked with an expiration/review date?
