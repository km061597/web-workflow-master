#!/usr/bin/env bash
set -euo pipefail

phase="${1:-}"

case "$phase" in
  design)
    required=(BRIEF.md RESEARCH.md IA.md CONVERSIONS.md TESTING.md)
    ;;
  build)
    required=(BRIEF.md RESEARCH.md IA.md CONVERSIONS.md TESTING.md)
    ;;
  *)
    echo "Usage: bin/advance-phase.sh <design|build>" >&2
    exit 1
    ;;
esac

missing=()
for file in "${required[@]}"; do
  [[ -f "$file" ]] || missing+=("$file")
done

if (( ${#missing[@]} > 0 )); then
  printf 'Missing phase gate artifact(s): %s\n' "${missing[*]}" >&2
  exit 1
fi

echo "Phase gate passed: $phase"
