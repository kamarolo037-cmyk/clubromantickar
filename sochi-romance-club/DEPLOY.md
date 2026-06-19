# 🚀 Инструкция по деплою — Клуб романтики в Сочи

## Содержание
1. [GitHub — загрузить проект](#1-github)
2. [Supabase — настроить базу данных](#2-supabase)
3. [Vercel — деплой фронтенда](#3-vercel)
4. [Telegram Bot — подключить Mini App](#4-telegram)
5. [Проверка и тест](#5-проверка)

---

## 1. GitHub

### 1.1 Создать репозиторий

1. Зайди на [github.com](https://github.com) → New repository
2. Название: `sochi-romance-club`
3. Visibility: **Private** (рекомендуется)
4. **НЕ** добавляй README, .gitignore (они уже есть)
5. Нажми **Create repository**

### 1.2 Загрузить код

```bash
# Перейди в папку проекта
cd sochi-romance-club

# Инициализируй git
git init

# Добавь все файлы
git add .

# Первый коммит
git commit -m "feat: initial project setup"

# Подключи GitHub репозиторий (замени YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/sochi-romance-club.git

# Загрузи
git push -u origin main
```

> ✅ Готово. Код на GitHub.

---

## 2. Supabase

### 2.1 Создать проект

1. Зайди на [supabase.com](https://supabase.com) → New project
2. Название: `sochi-romance-club`
3. Придумай **Database Password** (сохрани его!)
4. Region: выбери ближайший (например, `eu-central-1`)
5. Нажми **Create new project** — подождать ~1 минуту

### 2.2 Накатить схему базы данных

1. В левом меню: **SQL Editor** → **New query**
2. Открой файл `supabase/schema.sql` из проекта
3. Вставь всё содержимое в редактор
4. Нажми **Run** (зелёная кнопка)
5. Должно появиться: `Success. No rows returned`

> ⚠️ Если ошибка с `storage.buckets` — выполни сначала всё до этой секции,
> потом создай бакеты вручную (шаг 2.4)

### 2.3 Получить ключи

1. **Settings** → **API** (левое меню)
2. Скопируй:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### 2.4 Создать Storage бакеты (если SQL не сработал)

1. **Storage** → **New bucket**
2. Создай два бакета:
   - Имя: `backgrounds`, поставь галку **Public bucket**
   - Имя: `characters`, поставь галку **Public bucket**

### 2.5 Структура файлов в Storage

```
backgrounds/
  sochi_beach.webp
  sochi_embankment_night.webp
  sochi_hotel_lobby.webp
  sochi_cafe.webp
  sochi_mountains.webp

characters/
  ivan/
    neutral.webp
    happy.webp
    sad.webp
    surprised.webp
    angry.webp
  inessa/
    neutral.webp
    shy.webp
    happy.webp
    sad.webp
    angry.webp
    surprised.webp
  vladislava/
    neutral.webp
    happy.webp
    sad.webp
  kartush/
    neutral.webp
    happy.webp
  evgeniya/
    neutral.webp
    happy.webp
  milana/
    neutral.webp
    happy.webp
  vovka/
    neutral.webp
```

> 💡 Пока нет реальных изображений — игра показывает эмодзи-плейсхолдеры.
> Это нормально для MVP.

---

## 3. Vercel (деплой фронтенда)

### 3.1 Подключить GitHub → Vercel

1. Зайди на [vercel.com](https://vercel.com) → **Add New Project**
2. **Import Git Repository** → выбери `sochi-romance-club`
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`

### 3.2 Добавить переменные окружения

В разделе **Environment Variables** добавь:

| Key | Value |
|-----|-------|
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJxxx...` |

### 3.3 Deploy

1. Нажми **Deploy**
2. Подожди ~1-2 минуты
3. Получишь URL типа: `https://sochi-romance-club.vercel.app`

> Запомни этот URL — он нужен для Telegram

---

## 4. Telegram Bot

### 4.1 Создать бота

1. Открой [@BotFather](https://t.me/BotFather) в Telegram
2. `/newbot`
3. Название: `Клуб романтики в Сочи`
4. Username: `SochiRomanceClubBot` (или любой свободный)
5. Сохрани **токен бота**

### 4.2 Создать Mini App

1. В BotFather: `/newapp`
2. Выбери своего бота
3. Заполни:
   - Title: `Клуб романтики в Сочи`
   - Description: `Визуальная новелла. Лето. Сочи. Выборы, которые меняют всё.`
   - URL: `https://sochi-romance-club.vercel.app` (твой Vercel URL)
4. Получишь ссылку на Mini App

### 4.3 Настроить кнопку меню (опционально)

```
/setmenubutton → выбери бота → введи URL
```

---

## 5. Проверка

### Тест в браузере (локально)

```bash
# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env
# Вставь реальные значения Supabase

# Запустить
npm run dev
```

Открой `http://localhost:5173` — должна появиться стартовая страница.

### Тест в Telegram

1. Открой своего бота
2. Нажми кнопку Menu / отправь `/start`
3. Должно открыться приложение

---

## 6. Как добавлять новые сцены

### Вариант A — SQL вставка

```sql
INSERT INTO scenes (id, chapter, sort_order, background, characters, speaker, dialogue, choices, next_scene)
VALUES (
  'scene_010', 2, 1,
  'sochi_mountains',
  '[{"id": "inessa", "position": "center", "emotion": "sad"}]',
  'inessa',
  'Здесь наверху кажется, что всё внизу не настоящее.',
  '[
    {"text": "«А ты настоящая?»", "next_scene": "scene_011a", "effects": {"inessa": 3}},
    {"text": "Молчать.", "next_scene": "scene_011b", "effects": {"inessa": 1}}
  ]',
  NULL
);
```

### Вариант B — через JSON файл

Добавь сцену в `supabase/scenes_example.json` по образцу,
потом вставь через Supabase Table Editor или SQL.

---

## 7. Будущее масштабирование

| Задача | Что делать |
|--------|-----------|
| Новая глава | `chapter: 2`, новые сцены в БД |
| Новый персонаж | Добавить в `DEFAULT_RELATIONSHIPS` + папку в Storage |
| Платный контент | `is_premium: true` в сцене + проверка Stars на фронте |
| Новый сезон | Новый диапазон `chapter` (11–20) |
| Пуш-уведомления | Telegram Bot API `/sendMessage` по расписанию |
