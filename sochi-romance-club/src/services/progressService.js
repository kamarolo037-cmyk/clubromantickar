import { supabase } from './supabase'

const DEFAULT_RELATIONSHIPS = {
  ivan: 0,
  inessa: 0,
  evgeniya: 0,
  milana: 0,
  vladislava: 0,
  kartush: 0,
  vovka: 0,
}

/**
 * Загружает прогресс игрока. Если не найден — создаёт новый.
 */
export async function loadOrCreateProgress(telegramId) {
  const { data, error } = await supabase
    .from('player_progress')
    .select('*')
    .eq('telegram_id', telegramId)
    .single()

  if (error && error.code === 'PGRST116') {
    // Нет записи — создаём новую
    return await createProgress(telegramId)
  }

  if (error) {
    console.error('loadProgress error:', error)
    return null
  }

  return data
}

async function createProgress(telegramId) {
  const { data, error } = await supabase
    .from('player_progress')
    .insert({
      telegram_id: telegramId,
      current_scene: 'scene_001',
      chapter: 1,
      relationships: DEFAULT_RELATIONSHIPS,
      flags: {},
    })
    .select()
    .single()

  if (error) {
    console.error('createProgress error:', error)
    return null
  }
  return data
}

/**
 * Сохраняет прогресс игрока после выбора
 */
export async function saveProgress(telegramId, { currentScene, chapter, relationships, flags }) {
  const { error } = await supabase
    .from('player_progress')
    .update({
      current_scene: currentScene,
      chapter,
      relationships,
      flags,
      updated_at: new Date().toISOString(),
    })
    .eq('telegram_id', telegramId)

  if (error) console.error('saveProgress error:', error)
}

/**
 * Логирует выбор игрока
 */
export async function logChoice(telegramId, { sceneId, choiceText, nextScene }) {
  const { error } = await supabase.from('choice_log').insert({
    telegram_id: telegramId,
    scene_id: sceneId,
    choice_text: choiceText,
    next_scene: nextScene,
  })

  if (error) console.error('logChoice error:', error)
}

/**
 * Применяет эффекты выбора к relationships
 */
export function applyEffects(relationships, effects = {}) {
  const updated = { ...relationships }
  for (const [char, delta] of Object.entries(effects)) {
    const current = updated[char] ?? 0
    updated[char] = Math.min(100, Math.max(0, current + delta))
  }
  return updated
}

/**
 * Применяет флаги выбора
 */
export function applyFlags(flags, newFlags = {}) {
  return { ...flags, ...newFlags }
}
