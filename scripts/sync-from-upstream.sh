#!/usr/bin/env bash
# Merge Swatinem/rust-cache tag v$VERSION and rebuild dist/.
set -euo pipefail

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: $0 <version>  (e.g. 2.9.2)" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git remote | grep -q '^upstream$'; then
  git remote add upstream https://github.com/Swatinem/rust-cache.git
fi

git fetch upstream "refs/tags/v${VERSION}:refs/tags/upstream-v${VERSION}" || git fetch upstream "v${VERSION}"

# Merge upstream tag (prefer merge commit for history)
git merge "refs/tags/upstream-v${VERSION}" -m "chore: merge upstream v${VERSION}" --no-edit || {
  echo "Merge conflict — resolve manually, preserving fork files:" >&2
  echo "  src/zstd.ts, action.yml (zstd inputs), UPSTREAM.md, renovate.json" >&2
  exit 1
}

# Verify fork-only files exist
for f in src/zstd.ts action.yml UPSTREAM.md; do
  if [[ ! -f "$f" ]]; then
    echo "Missing fork file after merge: $f" >&2
    exit 1
  fi
done

# Update package.json version and upstream metadata
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '${VERSION}';
pkg.upstream.version = '${VERSION}';
pkg.upstream.url = 'https://github.com/Swatinem/rust-cache/releases/tag/v${VERSION}';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

sed -i.bak "s/| Upstream version | \`[^']*\`/| Upstream version | \`${VERSION}\`/" UPSTREAM.md
rm -f UPSTREAM.md.bak

npm install
npm run build
npm test

echo "Synced to Swatinem/rust-cache v${VERSION}. Review dist/ and commit."
