// src/services/supabase.js
// ✨ Обновленная версия с getAssetUrl для Supabase Storage

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Supabase env variables missing! Check .env file.')
  console.error('   VITE_SUPABASE_URL:', SUPABASE_URL ? '✓' : '✗')
  console.error('   VITE_SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? '✓' : '✗')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Получить полный публичный URL для файла в Supabase Storage
 * @param {string} bucket - имя bucket'а ("backgrounds", "characters", и т.д.)
 * @param {string} path - путь файла внутри bucket'а ("sochi_beach.webp")
 * @returns {string|null} полный URL или null если параметры неверные
 * 
 * Пример:
 * getAssetUrl('backgrounds', 'sochi_beach.webp')
 * → https://xxxxx.supabase.co/storage/v1/object/public/backgrounds/sochi_beach.webp
 */
export const getAssetUrl = (bucket, path) => {
  if (!SUPABASE_URL) {
    console.warn('Supabase URL not configured')
    return null
  }

  if (!bucket || !path) {
    console.warn('getAssetUrl requires bucket and path parameters')
    return null
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

/**
 * Загрузить файл в Supabase Storage
 * @param {string} bucket - имя bucket'а
 * @param {string} path - путь для сохранения
 * @param {File|Blob} file - файл для загрузки
 * @param {boolean} upsert - перезаписать если существует
 * @returns {Promise<{url: string, error: Error|null}>}
 */
export async function uploadFile(bucket, path, file, upsert = true) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert })

    if (error) {
      console.error(`Upload error (${bucket}/${path}):`, error)
      return { url: null, error }
    }

    const url = getAssetUrl(bucket, path)
    return { url, error: null }
  } catch (err) {
    console.error('Upload failed:', err)
    return { url: null, error: err }
  }
}

/**
 * Загрузить несколько файлов в Supabase Storage
 * @param {string} bucket - имя bucket'а
 * @param {File[]|FileList} files - файлы для загрузки
 * @param {string} prefix - префикс пути (например "sochi/")
 * @returns {Promise<{urls: string[], errors: Error[]}>}
 */
export async function uploadMultipleFiles(bucket, files, prefix = '') {
  const urls = []
  const errors = []

  for (const file of files) {
    const path = prefix ? `${prefix}${file.name}` : file.name
    const { url, error } = await uploadFile(bucket, path, file)

    if (error) {
      errors.push({ file: file.name, error })
    } else {
      urls.push(url)
    }
  }

  return { urls, errors }
}

/**
 * Удалить файл из Supabase Storage
 * @param {string} bucket - имя bucket'а
 * @param {string} path - путь файла
 * @returns {Promise<{success: boolean, error: Error|null}>}
 */
export async function deleteFile(bucket, path) {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error(`Delete error (${bucket}/${path}):`, error)
      return { success: false, error }
    }

    return { success: true, error: null }
  } catch (err) {
    console.error('Delete failed:', err)
    return { success: false, error: err }
  }
}

/**
 * Получить список файлов в bucket'е
 * @param {string} bucket - имя bucket'а
 * @param {string} path - путь внутри bucket'а
 * @returns {Promise<{files: any[], error: Error|null}>}
 */
export async function listFiles(bucket, path = '') {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path)

    if (error) {
      console.error(`List error (${bucket}/${path}):`, error)
      return { files: [], error }
    }

    return { files: data || [], error: null }
  } catch (err) {
    console.error('List failed:', err)
    return { files: [], error: err }
  }
}

/**
 * Получить публичный URL с опциональным истечением
 * (только для приватных bucket'ов)
 * @param {string} bucket - имя bucket'а
 * @param {string} path - путь файла
 * @param {number} expiresIn - срок в секундах (0 = никогда)
 * @returns {Promise<{url: string, error: Error|null}>}
 */
export async function getSignedUrl(bucket, path, expiresIn = 3600) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) {
      console.error(`Signed URL error (${bucket}/${path}):`, error)
      return { url: null, error }
    }

    return { url: data.signedUrl, error: null }
  } catch (err) {
    console.error('Signed URL failed:', err)
    return { url: null, error: err }
  }
}

// ============================================
// Storage Service (упрощенное использование)
// ============================================

export const storageService = {
  // Фоны
  backgrounds: {
    getUrl: (filename) => getAssetUrl('backgrounds', filename),
    upload: (file) => uploadFile('backgrounds', file.name, file),
    delete: (filename) => deleteFile('backgrounds', filename),
    list: () => listFiles('backgrounds'),
  },

  // Спрайты персонажей
  characters: {
    getUrl: (filename) => getAssetUrl('characters', filename),
    upload: (file) => uploadFile('characters', file.name, file),
    delete: (filename) => deleteFile('characters', filename),
    list: () => listFiles('characters'),
  },

  // Произвольный bucket
  custom: {
    getUrl: (bucket, filename) => getAssetUrl(bucket, filename),
    upload: (bucket, file) => uploadFile(bucket, file.name, file),
    delete: (bucket, filename) => deleteFile(bucket, filename),
    list: (bucket) => listFiles(bucket),
  },
}

export default supabase
