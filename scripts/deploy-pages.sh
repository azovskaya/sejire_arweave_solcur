#!/usr/bin/env bash
# Deploy apps/web/dist to origin/gh-pages (GitHub Pages only).
# Does NOT upload vaults or the SPA via Turbo/third-party CDNs.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/apps/web"

export VITE_PUBLISH_MODE="${VITE_PUBLISH_MODE:-self}"
export VITE_QA_TOOLS="${VITE_QA_TOOLS:-0}"
echo "Building Pages with VITE_PUBLISH_MODE=${VITE_PUBLISH_MODE} VITE_QA_TOOLS=${VITE_QA_TOOLS}"
npm run build

STAGE=$(mktemp -d)
cp -R dist/. "$STAGE/"
touch "$STAGE/.nojekyll"
if [[ -d "$ROOT/presentation" ]]; then
  mkdir -p "$STAGE/presentation"
  cp -a "$ROOT/presentation/." "$STAGE/presentation/"
fi

REMOTE_URL="$(git -C "$ROOT" remote get-url origin)"
# Derive Pages URL for github.com remotes
PAGES_HINT="(enable Settings → Pages → branch gh-pages)"
if [[ "$REMOTE_URL" =~ github.com[:/]([^/]+)/([^/.]+) ]]; then
  OWNER="${BASH_REMATCH[1]}"
  REPO="${BASH_REMATCH[2]}"
  PAGES_HINT="https://${OWNER}.github.io/${REPO}/"
fi

cd "$STAGE"
git init -b gh-pages
git config user.email "sejire-deploy@users.noreply.github.com"
git config user.name "SEJIRE Deploy"
git add -A
git commit -m "Deploy SEJIRE Pages $(date -u +%Y-%m-%dT%H:%MZ)"
git remote add origin "$REMOTE_URL"
git push -f origin gh-pages

echo "Published gh-pages. Open: ${PAGES_HINT}"
echo "Vault data is not uploaded by this script — users publish to Arweave L1 from the app."
