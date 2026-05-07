# Excluded scaffold inputs

Inputs below were evaluated during scaffold synthesis but are not emitted as
standalone artifacts in this PR. The emitted artifacts are
`scaffolds/nextjs-canonical/` and `scaffolds/astro-canonical/`.

Excluded or folded inputs:
- nextjs-minimal: superseded by nextjs-canonical.
- scaffold-cli: tooling concept, not a scaffold artifact in this PR.
- seo-schemas: reference data, not a scaffold artifact in this PR.
- vite-react-canonical: framework variant; can be emitted by a future scaffold PR.
- framework-test-fixtures: skill-internal test data excluded by v4.1 inventory scope rules.
- local-business-template: folded into nextjs-canonical business-site defaults; not emitted separately.

Emitted scaffolds:
- nextjs-canonical (desigjn-toolkit/site/ base)
- astro-canonical (design-self-create base)
- local-business-template (WEBSITES/templates/local-business-template/ base)
