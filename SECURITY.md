# Security Policy

## Reporting

Report security issues privately through the repository owner. Do not open public issues for secrets, credential exposure, or exploitable vulnerabilities.

## Secrets

- Never commit `.env`, `.env.local`, API keys, OAuth tokens, private keys, or customer credentials.
- Example values in this repository must remain placeholders.
- Run `npm run verify` before opening a PR; the verifier includes repository safety checks and scaffold integrity checks.
