import React from 'react'
import { getAssetUrl } from '../../services/supabase'

// Фоллбэк-градиенты если картинка не загрузилась
const FALLBACK_GRADIENTS = {
  sochi_beach:            'linear-gradient(180deg, #1a4a7a 0%, #2d6b9e 40%, #c4a882 100%)',
  sochi_embankment_night: 'linear-gradient(180deg, #0a0a1e 0%, #1a1a3e 50%, #0d2a4a 100%)',
  sochi_hotel_lobby:      'linear-gradient(180deg, #1a1208 0%, #2d2010 60%, #1a1208 100%)',
  sochi_cafe:             'linear-gradient(180deg, #1a0a0a 0%, #3d1515 60%, #1a0a0a 100%)',
  sochi_mountains:        'linear-gradient(180deg, #0d1a0d 0%, #1a3320 50%, #2d4d2d 100%)',
  default:                'linear-gradient(180deg, #0a0a14 0%, #1a0a1e 100%)',
}

export default function Background({ backgroundKey }) {
  const fallback = FALLBACK_GRADIENTS[backgroundKey] || FALLBACK_GRADIENTS.default
  const imageUrl = backgroundKey
    ? getAssetUrl('backgrounds', `${backgroundKey}.webp`)
    : null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: fallback,
        transition: 'background 0.8s ease',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      )}
      {/* Overlay для читаемости текста снизу */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)',
      }} />
    </div>
  )
}
