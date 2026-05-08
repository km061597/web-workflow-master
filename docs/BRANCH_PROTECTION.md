# Branch Protection Runbook

This repository is production-ready at the code and CI level only when `main` is protected by required checks.

## Required Checks

Use these exact GitHub check names:

- `Validate Workspace`
- `Dependency Audit`
- `verify`
- `Next.js Scaffold`
- `Astro Scaffold`
- `Local Business Scaffold`

## Required Policy

Configure `main` with:

- required status checks enabled
- branches required to be up to date before merging
- the six required check names above
- pull request reviews required before merging
- at least one approving review
- stale approvals dismissed when new commits are pushed
- CODEOWNERS review required
- conversation resolution required
- force pushes disabled
- deletions disabled
- administrators included

## API Setup

Run this after the repository has branch protection support. Private repositories require a GitHub plan that supports branch protection, or the repository must be public.

```sh
unset GH_TOKEN GITHUB_TOKEN
gh api --method PUT repos/metzgerwebsites/web-workflow-master/branches/main/protection \
  --input - <<'JSON'
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "Validate Workspace",
      "Dependency Audit",
      "verify",
      "Next.js Scaffold",
      "Astro Scaffold",
      "Local Business Scaffold"
    ]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true,
    "required_approving_review_count": 1,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "lock_branch": false,
  "allow_fork_syncing": true
}
JSON
```

## Verify Protection

```sh
unset GH_TOKEN GITHUB_TOKEN
gh api repos/metzgerwebsites/web-workflow-master/branches/main \
  --jq '{sha:.commit.sha, protected:.protected}'

gh api repos/metzgerwebsites/web-workflow-master/branches/main/protection \
  --jq '{
    required_status_checks,
    required_pull_request_reviews,
    enforce_admins,
    required_conversation_resolution,
    allow_force_pushes,
    allow_deletions
  }'
```

Expected:

- `protected` is `true`
- `required_status_checks.strict` is `true`
- all six required checks are listed, including `Dependency Audit`
- `enforce_admins.enabled` is `true`
- `required_pull_request_reviews.required_approving_review_count` is `1`
- force pushes and deletions are disabled

## Current Known Blocker

As of the last production-readiness audit, GitHub returned this response for branch protection and rulesets on the private repository:

```text
HTTP 403: Upgrade to GitHub Pro or make this repository public to enable this feature.
```

This is an account or repository visibility blocker, not a code blocker. Do not tag a production baseline until protection is applied and verified.

## Baseline Tag

After protection is verified, tag the protected `main` SHA:

```sh
git fetch origin main --tags
git tag -a v0.1.0 origin/main -m "First protected production baseline"
git push origin v0.1.0
```
