#!/usr/bin/env bash
#
# Manual deploy for anhcodes.dev (Next.js static export → Firebase Hosting).
#
# Normally you don't need this: pushing to `master` triggers the GitHub
# Actions workflow (.github/workflows/firebase-hosting-merge.yml), which
# builds web/ and deploys to the Firebase live channel automatically.
#
# Use this script to deploy on demand from your machine.
# Requires `firebase login` (or a FIREBASE_TOKEN) with access to site
# `anhcodesdev`.
#
# Usage: ./deploy.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Build the static export → web/out/
cd "$ROOT/web"
npm ci
npm run build

# Deploy to Firebase Hosting (config: firebase.json, .firebaserc)
cd "$ROOT"
npx firebase-tools deploy --only hosting
