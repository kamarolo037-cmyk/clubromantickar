import { supabase } from './supabase'

/**
 * Загружает сцену по id из таблицы scenes
 */
export async function loadScene(sceneId) {
  const { data, error } = await supabase
    .from('scenes')
    .select('*')
    .eq('id', sceneId)
    .single()

  if (error) {
    console.error('loadScene error:', error)
    return null
  }
  return data
}

/**
 * Загружает первую сцену первой главы (для новых игроков)
 */
export async function loadFirstScene() {
  const { data, error } = await supabase
    .from('scenes')
    .select('*')
    .eq('chapter', 1)
    .order('sort_order', { ascending: true })
    .limit(1)
    .single()

  if (error) {
    console.error('loadFirstScene error:', error)
    return null
  }
  return data
}
