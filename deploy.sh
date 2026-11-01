#!/usr/bin/env bash
# Pubblica il sito su Firebase Hosting, sito edodoc-sito.
# Pubblica i file su disco, modifiche non committate comprese.
# Dalla cartella edodoc-sito-web:
#   ./deploy.sh
set -euo pipefail

root="$(cd "$(dirname "$0")" && pwd)"
project="endless-grail-513417-e7"
site="https://edodoc-sito.web.app"

# Chiave del service account edodoc-deploy, la stessa di edodoc-hq, fuori dal repo
key="$HOME/.config/edodoc/edodoc-deploy.json"
if [[ ! -f "$key" ]]; then
  echo "Manca la chiave $key"
  exit 1
fi

cd "$root"
npm run build
# La CLI preferisce il login salvato, anche se scaduto: un HOME vuoto la costringe a usare la chiave.
firebase_home="$(mktemp -d)"
trap 'rm -rf "$firebase_home"' EXIT
# Il progetto è quello di edodoc-hq: il sito di destinazione è fissato in firebase.json.
HOME="$firebase_home" GOOGLE_APPLICATION_CREDENTIALS="$key" firebase deploy --only hosting --project "$project"

echo
echo "Deploy completato: $site"
