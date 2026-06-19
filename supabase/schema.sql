-- ============================================
-- КЛУБ РОМАНТИКИ В СОЧИ — Supabase Schema
-- Выполнить в: Supabase → SQL Editor → New Query
-- ============================================

-- 1. ТАБЛИЦА СЦЕН
-- ============================================
CREATE TABLE IF NOT EXISTS scenes (
  id           TEXT PRIMARY KEY,                    -- "scene_001"
  chapter      INT NOT NULL DEFAULT 1,              -- номер главы
  sort_order   INT NOT NULL DEFAULT 0,              -- порядок в главе
  background   TEXT,                                -- ключ фона (файл в Storage)
  characters   JSONB DEFAULT '[]',                  -- [{id, position, emotion}]
  speaker      TEXT,                                -- кто говорит (null = нарратор)
  dialogue     TEXT NOT NULL,                       -- текст диалога
  choices      JSONB DEFAULT '[]',                  -- [{text, next_scene, effects, set_flags}]
  next_scene   TEXT,                                -- авто-переход (если нет choices)
  is_premium   BOOLEAN DEFAULT false,               -- для будущего платного контента
  locale       TEXT DEFAULT 'ru',                   -- для локализации
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ПРОГРЕСС ИГРОКА
-- ============================================
CREATE TABLE IF NOT EXISTS player_progress (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id     BIGINT UNIQUE NOT NULL,
  current_scene   TEXT REFERENCES scenes(id),
  chapter         INT DEFAULT 1,
  relationships   JSONB DEFAULT '{
    "ivan": 0,
    "inessa": 0,
    "evgeniya": 0,
    "milana": 0,
    "vladislava": 0,
    "kartush": 0,
    "vovka": 0
  }',
  flags           JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ЛОГ ВЫБОРОВ
-- ============================================
CREATE TABLE IF NOT EXISTS choice_log (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_id BIGINT NOT NULL,
  scene_id    TEXT NOT NULL,
  choice_text TEXT NOT NULL,
  next_scene  TEXT NOT NULL,
  chosen_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Индекс для быстрого поиска по telegram_id
CREATE INDEX IF NOT EXISTS idx_choice_log_telegram ON choice_log(telegram_id);
CREATE INDEX IF NOT EXISTS idx_scenes_chapter ON scenes(chapter, sort_order);

-- ============================================
-- ТЕСТОВЫЕ СЦЕНЫ (Глава 1)
-- ============================================
INSERT INTO scenes (id, chapter, sort_order, background, characters, speaker, dialogue, choices, next_scene)
VALUES

-- ПРОЛОГ
('scene_001', 1, 1,
 'sochi_beach',
 '[]',
 'narrator',
 'Лето в Сочи пахнет морем, магнолиями и чем-то неизбежным. Поезд только что прибыл. Тебя ждут.',
 '[]',
 'scene_002'),

-- ВСТРЕЧА С ИВАНОМ
('scene_002', 1, 2,
 'sochi_beach',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Ну наконец-то. Я уже думал, ты не приедешь. Картуш сказал, ты тот самый человек, который нам нужен.',
 '[
   {"text": "«Зависит от того, что именно вам нужно»", "next_scene": "scene_003a", "effects": {"ivan": 1}},
   {"text": "«Здравствуй. Я Картуш... то есть, я с ним»", "next_scene": "scene_003b", "effects": {"ivan": 0}}
 ]',
 NULL),

-- ВЕТКА A — уверенный ответ
('scene_003a', 1, 3,
 'sochi_beach',
 '[{"id": "ivan", "position": "center", "emotion": "happy"}]',
 'ivan',
 'Хм. Мне нравится. — Он чуть улыбнулся, щурясь от солнца. — Пойдём, там все уже собрались.',
 '[]',
 'scene_004'),

-- ВЕТКА B — неловкий ответ
('scene_003b', 1, 3,
 'sochi_beach',
 '[{"id": "ivan", "position": "center", "emotion": "neutral"}]',
 'ivan',
 'Я знаю. — Коротко. — Пойдём, не будем опаздывать.',
 '[]',
 'scene_004'),

-- ВСТРЕЧА С ИНЕССОЙ
('scene_004', 1, 4,
 'sochi_hotel_lobby',
 '[
   {"id": "inessa", "position": "right", "emotion": "neutral"},
   {"id": "ivan", "position": "left", "emotion": "neutral"}
 ]',
 'narrator',
 'В холле отеля стоит женщина. Двадцать шесть, осанка как у человека, привыкшего к тому, что на неё смотрят. Она не смотрит в ответ.',
 '[]',
 'scene_005'),

('scene_005', 1, 5,
 'sochi_hotel_lobby',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Ещё один. — Не вопрос, констатация. — Вы все думаете, что Сочи — это отпуск. Ошибаетесь.',
 '[
   {"text": "«А что такое Сочи для вас?»", "next_scene": "scene_006a", "effects": {"inessa": 2}},
   {"text": "Промолчать. Просто смотреть на неё.", "next_scene": "scene_006b", "effects": {"inessa": 1}}
 ]',
 NULL),

('scene_006a', 1, 6,
 'sochi_hotel_lobby',
 '[{"id": "inessa", "position": "center", "emotion": "surprised"}]',
 'inessa',
 'Впервые замолчала. Потом: — Это место, где всё становится настоящим. Хочешь ты этого или нет.',
 '[]',
 'scene_007'),

('scene_006b', 1, 6,
 'sochi_hotel_lobby',
 '[{"id": "inessa", "position": "center", "emotion": "neutral"}]',
 'inessa',
 'Молчание ей явно понравилось больше слов. Уголок губ. Едва заметно. — Умный.',
 '[]',
 'scene_007'),

-- КОНЕЦ ГЛАВЫ 1
('scene_007', 1, 7,
 'sochi_embankment_night',
 '[]',
 'narrator',
 'Вечер первый. Море за окном не молчит. Что-то уже началось — ты просто ещё не знаешь, что именно.',
 '[]',
 NULL);

-- ============================================
-- SUPABASE STORAGE BUCKETS
-- ============================================
-- Выполни в SQL Editor:

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('backgrounds', 'backgrounds', true),
  ('characters',  'characters',  true)
ON CONFLICT (id) DO NOTHING;

-- Политики для публичного чтения
CREATE POLICY "Public read backgrounds"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'backgrounds');

CREATE POLICY "Public read characters"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'characters');

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE player_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE choice_log       ENABLE ROW LEVEL SECURITY;

-- scenes — открыты для всех на чтение
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read scenes"
  ON scenes FOR SELECT USING (true);

-- player_progress — только анонимный доступ через service_role
-- Используем service_role key на клиенте для upsert прогресса
-- Или отключаем RLS для MVP:
CREATE POLICY "Allow all on player_progress"
  ON player_progress FOR ALL USING (true);

CREATE POLICY "Allow all on choice_log"
  ON choice_log FOR ALL USING (true);
