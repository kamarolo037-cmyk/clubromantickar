// src/components/Scene/Background.jsx
// ✨ Обновленная версия для работы с Supabase Storage

import React, { useMemo, useState, useEffect } from 'react'
import { getAssetUrl } from '../../services/supabase'

// Справочник всех фонов с метаданными
const BACKGROUNDS_MAP = {
  sochi_beach: {
    name: 'Пляж в Сочи',
    color: '#1e90ff',
    description: 'Красивый пляж с видом на горы'
  },
  sochi_hotel_lobby: {
    name: 'Лобби отеля',
    color: '#d4af37',
    description: 'Элегантное лобби отеля'
  },
  sochi_cafe: {
    name: 'Кафе на набережной',
    color: '#8b7355',
    description: 'Уютное кафе с видом на море'
  },
  sochi_embankment: {
    name: 'Набережная (День)',
    color: '#4a90e2',
    description: 'Солнечная набережная'
  },
  sochi_embankment_night: {
    name: 'Набережная (Ночь)',
    color: '#1a1a2e',
    description: 'Набережная в ночи с огнями'
  },
  sochi_mountains: {
    name: 'Горы Кавказа',
    color: '#8b7355',
    description: 'Вид на Кавказские горы'
  },
  sochi_terrace: {
    name: 'Терраса с видом',
    color: '#ffa500',
    description: 'Уютная терраса'
  },
  sochi_old_city: {
    name: 'Старый город',
    color: '#a0826d',
    description: 'Улицы старого Сочи'
  },
  sochi_yard: {
    name: 'Двор дома',
    color: '#696969',
    description: 'Уютный двор многоэтажки'
  },
  sochi_station: {
    name: 'Железнодорожный вокзал',
    color: '#556b7f',
    description: 'Вокзал Сочи'
  },
  train_compartment: {
    name: 'Купе поезда',
    color: '#2c2c2c',
    description: 'Купе с видом в окно'
  },
}

export default function Background({ backgroundKey }) {
  const [imageUrl, setImageUrl] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(null)

  const bgData = useMemo(() => {
    return BACKGROUNDS_MAP[backgroundKey] || BACKGROUNDS_MAP.sochi_beach
  }, [backgroundKey])

  // Загрузка изображения
  useEffect(() => {
    if (!backgroundKey) {
      setImageUrl(null)
      setLoaded(false)
      return
    }

    // Получить URL из Supabase Storage
    const url = getAssetUrl('backgrounds', `${backgroundKey}.webp`)
    
    if (!url) {
      console.warn(`No URL for background: ${backgroundKey}`)
      setImageUrl(null)
      setLoaded(true) // fallback на цвет
      return
    }

    // Загрузить изображение (для проверки что оно есть)
    const img = new Image()
    
    img.onload = () => {
      setImageUrl(url)
      setLoaded(true)
      setError(null)
    }
    
    img.onerror = () => {
      console.error(`Failed to load background: ${backgroundKey}`)
      setImageUrl(null)
      setLoaded(true) // fallback
      setError(`Не удалось загрузить фон: ${bgData.name}`)
    }
    
    img.src = url
  }, [backgroundKey, bgData.name])

  // Fallback цвет если нет изображения
  const fallbackGradient = `linear-gradient(135deg, ${bgData.color || '#0a0a14'}, #1a1a2e)`

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: imageUrl ? `url('${imageUrl}')` : fallbackGradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: bgData.color,
        opacity: 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Градиент поверх для улучшения читаемости текста */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Debug информация (только если изображение не загрузилось) */}
      {!imageUrl && loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '16px',
            color: 'rgba(240, 232, 220, 0.6)',
            fontSize: '12px',
            fontFamily: "'Lora', serif",
            pointerEvents: 'none',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <div style={{ fontSize: '32px' }}>🎨</div>
          <div>{bgData.name}</div>
          {error && <div style={{ fontSize: '10px', color: 'rgba(255, 100, 100, 0.7)' }}>{error}</div>}
        </div>
      )}

      {/* Loading состояние */}
      {!loaded && imageUrl && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: fallbackGradient,
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.8; }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
