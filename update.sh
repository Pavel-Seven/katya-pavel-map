#!/bin/bash
cd "/Users/pavelseven/Katja Pavel?/KnowledgeTree"
echo "🔄 Обновляем сайт для Кати..."
cp desktop.html map.html
git add -A
git commit -m "💍 Update $(date '+%d.%m.%Y %H:%M')"
git push origin main
echo "✅ Готово! Катя увидит обновление через 30 секунд"
echo "🔗 Ссылка: https://pavel-seven.github.io/katya-pavel-map/"
