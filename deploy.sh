#!/usr/bin/env bash

set -e

TOTAL=$(jq length stores.json)
COUNT=0
START_TIME=$(date +"%Y-%m-%d %H:%M:%S")

echo "==============================================="
echo "🚀 Shopify Theme Deployment Started"
echo "🕒 Start time: $START_TIME"
echo "📦 Total stores: $TOTAL"
echo "==============================================="
echo ""

for row in $(jq -c '.[]' stores.json); do
  COUNT=$((COUNT + 1))
  STORE=$(echo "$row" | jq -r '.store')
  THEME_ID=$(echo "$row" | jq -r '.theme_id')

  echo "------------------------------------------------"
  echo "➡️  [$COUNT / $TOTAL] Deploying to:"
  echo "   Store: $STORE"
  echo "   Theme: $THEME_ID"
  echo "   Time : $(date +"%H:%M:%S")"
  echo "------------------------------------------------"

  shopify theme push \
    --store "$STORE" \
    --theme "$THEME_ID" \
    --allow-live

  echo "✅ Completed: $STORE"
  echo ""
done

END_TIME=$(date +"%Y-%m-%d %H:%M:%S")

echo "==============================================="
echo "🎉 Deployment Complete"
echo "🕒 End time: $END_TIME"
echo "==============================================="
