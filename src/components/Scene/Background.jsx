// src/components/Scene/Background.jsx
import React, { useMemo } from 'react'
import { getAssetUrl } from '../../services/supabase'

const BACKGROUNDS_MAP = {
  sochi_beach: {
    name: 'Пляж в Сочи',
    color: '#1e90ff',
  },
  sochi_hotel_lobby: {
    name: 'Лобби отеля',
    color: '#d4af37',
  },
  sochi_cafe: {
    name: 'Кафе на набережной',
    color: '#8b7355',
  },
  sochi_embankment: {
    name: 'Набережная (День)',
    color: '#4a90e2',
  },
  sochi_embankment_night: {
    name: 'Набережная (Ночь)',
    color: '#1a1a2e',
  },
  sochi_mountains: {
    name: 'Горы Кавказа',
    color: '#8b7355',
  },
  sochi_terrace: {
    name: 'Терраса с видом',
    color: '#ffa500',
  },
  sochi_old_city: {
    name: 'Старый город',
    color: '#a0826d',
  },
  sochi_yard: {
    name: 'Двор дома',
    color: '#696969',
  },
  sochi_station: {
    name: 'Железнодорожный вокзал',
    color: '#556b7f',
  },
  train_compartment: {
    name: 'Купе поезда',
    color: '#2c2c2c',
  },
}

export default function Background({ backgroundKey }) {
  const bgData = useMemo(() => {
    return BACKGROUNDS_MAP[backgroundKey] || BACKGROUNDS_MAP.sochi_beach
  }, [backgroundKey])

  const imageUrl = backgroundKey
    ? getAssetUrl('backgrounds', `${backgroundKey}.webp`)
    : null

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
        transition: 'background-image 0.4s ease',
      }}
    >
      {/* Градиент поверх для читаемости текста */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
