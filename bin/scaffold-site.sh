#!/usr/bin/env bash
set -euo pipefail

site_name="${1:-}"
template="${2:-nextjs-canonical}"

if [[ -z "$site_name" ]]; then
  echo "Usage: bin/scaffold-site.sh <site-name> [template]" >&2
  exit 1
fi

node tools/scaffold.js "$site_name" --template "$template"
