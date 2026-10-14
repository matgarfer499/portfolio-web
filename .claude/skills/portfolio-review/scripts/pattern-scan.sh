#!/usr/bin/env bash
# Deterministic checks for the project rules that ESLint does not cover.
# Usage: pattern-scan.sh [base-ref]  (default: latest v4-p* tag, else v3). Scans files changed since base.
# Prints "file:line rule: text". Exit 0 always: the reviewer judges each hit.
set -uo pipefail
cd "$(git rev-parse --show-toplevel)"
BASE="${1:-$(git describe --tags --abbrev=0 --match 'v4-p*' 2>/dev/null || echo v3)}"
mapfile -t FILES < <(git diff --name-only --diff-filter=AM "$(git merge-base "$BASE" HEAD)" HEAD -- 'src/**' | grep -E '\.(ts|tsx|css)$')
[ ${#FILES[@]} -eq 0 ] && { echo "no changed src files since $BASE"; exit 0; }
TSX=(); TS=(); for f in "${FILES[@]}"; do [[ $f == *.tsx ]] && TSX+=("$f"); [[ $f == *.ts ]] && TS+=("$f"); done
echo "base: $BASE"

hit() { echo "$1 $2"; }
section() { echo; echo "## $1"; }

section "Inline class strings with more than 4 classes in .tsx (architecture §3: move to Name.variants.ts)"
for f in "${TSX[@]}"; do
  grep -nE 'className="[^"]*"|cn\("[^"]*"' "$f" | while IFS= read -r line; do
    cls=$(echo "$line" | grep -oE '(className=|cn\()"[^"]*"' | head -1 | sed -E 's/^(className=|cn\()"//; s/"$//')
    [ "$(echo "$cls" | wc -w)" -gt 4 ] && hit "$f:${line%%:*}" "inline-classes: $cls"
  done
done

section "Hex colours outside globals.css and src/app/brand.ts (DESIGN.md: tokens only)"
# brand.ts mirrors tokens for places without CSS variables (viewport themeColor, manifest, OG images).
for f in "${FILES[@]}"; do
  [[ $f == src/app/globals.css || $f == src/app/brand.ts || $f == *.test.ts ]] && continue
  grep -nE '#[0-9a-fA-F]{3,8}\b' "$f" | grep -vE "href=\"#|'#[a-z]" | sed "s|^|$f:|"
done

section "Component folders: Name/Name.tsx + Name.variants.ts, no forwardRef, no barrels in shared/"
for f in "${FILES[@]}"; do
  [[ $f == src/shared/* && ( $(basename "$f") == index.ts || $(basename "$f") == index.tsx ) ]] && hit "$f" "barrel in shared/ (import the file)"
  [[ $f == src/features/*/*/* && $(basename "$f") == index.ts ]] && hit "$f" "nested barrel (only the feature root has index.ts)"
  grep -n 'forwardRef' "$f" | sed "s|^|$f:|"
  if [[ $f == */components/*/*.tsx ]]; then
    dir=$(basename "$(dirname "$f")"); name=$(basename "$f" .tsx)
    [ "$dir" != "$name" ] && [[ $name != *.test ]] && hit "$f" "file name differs from its folder ($dir)"
    grep -q 'className' "$f" && [ ! -f "$(dirname "$f")/$name.variants.ts" ] && hit "$f" "styled component without $name.variants.ts"
  fi
done

section "Server boundaries"
for f in "${FILES[@]}"; do
  [[ $f == src/server/* && $f != *.test.ts ]] && ! grep -q "^import 'server-only'" "$f" && hit "$f" "server/ file without import 'server-only'"
  if grep -qE "^['\"]use client['\"]" "$f"; then grep -nE "from '@/server/" "$f" | sed "s|^|$f:|; s|$| (client file importing server code)|"; fi
  [[ $f != src/server/* && $f != src/shared/config/site.ts ]] && grep -nE 'process\.env' "$f" | sed "s|^|$f:|; s|$| (env read outside src/server and site.ts)|"
done

section "Motion and style bans (DESIGN.md)"
for f in "${FILES[@]}"; do
  grep -nE 'transition-all|transition: all|backdrop-blur|backdrop-filter|gradient\(|bg-gradient|cursor: *url' "$f" | sed "s|^|$f:|; s|$| (banned)|"
  grep -nE 'transition-\[[^]]*(width|height|top|left|margin|padding)' "$f" | sed "s|^|$f:|; s|$| (animating a layout property)|"
  [[ $f == *.test.ts ]] || grep -n 'mylove' "$f" | sed "s|^|$f:|; s|$| (NEVER ship this photo)|"
done

section "Leftovers"
for f in "${FILES[@]}"; do grep -nE 'console\.(log|debug)|TODO|FIXME|XXX|eslint-disable|@ts-ignore|@ts-expect-error' "$f" | sed "s|^|$f:|"; done

section "Comment density (ESLint caps a comment at 3 lines; flag files where comments outweigh code)"
for f in "${FILES[@]}"; do
  c=$(grep -cE '^\s*(//|/\*|\*)' "$f"); t=$(grep -cvE '^\s*$' "$f")
  [ "$t" -gt 0 ] && [ $((c * 100 / t)) -gt 25 ] && hit "$f" "comments are $c of $t non-blank lines"
done

section "Tests: changed pure modules without a sibling test"
for f in "${TS[@]}"; do
  [[ $f == *.test.ts || $f == *.variants.ts || $f == *.d.ts || $f == */index.ts || $f == */types.ts ]] && continue
  [[ $f == */model.ts || $f == src/shared/lib/* || $f == src/shared/events/* || $f == src/server/* || $f == src/content/* ]] || continue
  [[ $f == src/content/* && -f src/content/content.test.ts ]] && continue  # data files: covered by content.test.ts
  [ -f "${f%.ts}.test.ts" ] || hit "$f" "no ${f%.ts}.test.ts"
done
echo; echo "scan done: ${#FILES[@]} files"
