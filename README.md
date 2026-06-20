# 🌹 Клуб романтики в Сочи

> Telegram Mini App · Визуальная новелла · React + Supabase

---

## Стек

- **Frontend**: React 18 + Vite + Zustand
- **Backend**: Supabase (PostgreSQL + Storage)
- **Platform**: Telegram Mini App (`@twa-dev/sdk`)

## Персонажи

| Персонаж | Возраст | Роль |
|----------|---------|------|
| Иван | 21 | Центральный мужской персонаж |
| Инесса | 26 | Основная романтическая линия |
| Евгения | 22 | — |
| Милана | 22 | — |
| Владислава | 19 | Романтическая линия с Картушем |
| Картуш | 21 | — |
| Вовка | 2 | Пёс, влияет на события |

## Запуск

```bash
cp .env.example .env
# Заполни VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY

npm install
npm run dev
```

## Деплой

См. [DEPLOY.md](./DEPLOY.md)

## Структура сцен

```json
{
  "id": "scene_001",
  "chapter": 1,
  "background": "sochi_beach",
  "characters": [{ "id": "ivan", "position": "center", "emotion": "neutral" }],
  "speaker": "ivan",
  "dialogue": "Текст реплики...",
  "choices": [
    {
      "text": "Вариант ответа",
      "next_scene": "scene_002",
      "effects": { "ivan": 2 },
      "set_flags": { "met_ivan": true }
    }
  ]
}
```
