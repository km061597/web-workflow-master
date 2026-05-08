# Security Policy

## Reporting

Report security issues privately through the repository owner. Do not open public issues for secrets, credential exposure, or exploitable vulnerabilities.

## Secrets

- Never commit `.env`, `.env.local`, API keys, OAuth tokens, private keys, or customer credentials.
- Example values in this repository must remain placeholders.
- Run `npm run verify` before opening a PR; the verifier includes repository safety checks and scaffold integrity checks.

## Dependency Maintenance

- GitHub vulnerability alerts are enabled for this repository.
- GitHub automated security fixes are enabled for security advisories.
- CI runs `npm audit --audit-level=moderate` on every pull request and push to `main`.
- Broad Dependabot version-update PRs are intentionally disabled. The first generated version-update PR broke `npm ci` reproducibility by changing `package.json` without a matching lockfile update.
- Routine version upgrades should be handled as explicit maintenance work: update the relevant `package.json` and lockfile together, then run `npm ci`, `npm audit --audit-level=moderate`, `npm run verify`, and the affected scaffold build checks.
