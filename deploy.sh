#!/bin/bash
set -e
SERVER="jprud67@2.24.10.163"
REMOTE_SRC="~/web/docs.jambostack.site/src"
REMOTE_WEB="~/web/docs.jambostack.site/public_html"

echo "→ pull + build sur le serveur..."
ssh "$SERVER" "
  cd $REMOTE_SRC &&
  git pull origin main &&
  npm ci --prefer-offline &&
  npm run build &&
  cp -r dist/. $REMOTE_WEB/
"
echo "✓ Déployé sur docs.jambostack.site"
