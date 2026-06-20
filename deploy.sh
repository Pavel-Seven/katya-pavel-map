#!/bin/bash

cd "/Users/pavelseven/Katja Pavel?/KnowledgeTree"

echo "1. Checking GitHub authentication..."
gh auth status || gh auth login

echo "2. Creating GitHub Repository..."
gh repo create katya-pavel-map --public --description "Карта нашего будущего — Паша & Катя 💍"

echo "3. Preparing files (backing up desktop map)..."
if [ -f index.html ] && ! grep -q "Katya App" index.html; then
  mv index.html desktop.html
  echo "Original index.html saved as desktop.html"
fi
cp katya_mobile.html index.html

echo "4. Pushing to GitHub..."
git init
git remote add origin https://github.com/pavelseven/katya-pavel-map.git || git remote set-url origin https://github.com/pavelseven/katya-pavel-map.git
git add index.html katya_mobile.html desktop.html
git commit -m "💍 Katya mobile app — our future map"
git branch -M main
git push -u origin main

echo "5. Enabling GitHub Pages..."
gh api repos/pavelseven/katya-pavel-map/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}' || echo "Pages might already be enabled or repo needs a moment."

echo "Waiting for GitHub Pages to build (60s)..."
sleep 60

echo "✅ ССЫЛКА ДЛЯ КАТИ:"
echo "https://pavelseven.github.io/katya-pavel-map/"
echo ""
echo "Скинь эту ссылку Кате в WhatsApp/Telegram."
echo "Она откроет с iPhone — будет как нативное приложение."
echo "Можно добавить на главный экран: Safari → Поделиться → «На экран «Домой»» → иконка появится как приложение."
