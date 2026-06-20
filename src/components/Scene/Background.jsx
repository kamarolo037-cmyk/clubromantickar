import React from 'react'
import { getAssetUrl } from '../../services/supabase'

const FALLBACK_GRADIENTS = {
  sochi_beach:              'linear-gradient(180deg, #1a6aa0 0%, #2d8abf 35%, #b8c8b0 70%, #c4a882 100%)',
  sochi_embankment:         'linear-gradient(180deg, #1a5590 0%, #2a6daa 40%, #4a8fbf 70%, #c4a882 100%)',
  sochi_embankment_night:   'linear-gradient(180deg, #04041a 0%, #0a0a2e 40%, #0d1a3a 70%, #0a1220 100%)',
  sochi_hotel_lobby:        'linear-gradient(180deg, #1a1208 0%, #2d2010 50%, #1e1a0e 100%)',
  sochi_cafe:               'linear-gradient(180deg, #120808 0%, #2a1010 50%, #1a0c0c 100%)',
  sochi_mountains:          'linear-gradient(180deg, #0d1a0d 0%, #1a3320 50%, #2d4d2d 100%)',
  sochi_terrace:            'linear-gradient(180deg, #1a3a1a 0%, #2d5a2d 30%, #a8c890 60%, #dfc880 100%)',
  sochi_old_city:           'linear-gradient(180deg, #1a1408 0%, #3a2c10 40%, #5a4820 70%, #c4a870 100%)',
  sochi_yard:               'linear-gradient(180deg, #0d1a0a 0%, #1a3010 40%, #2a4a1a 70%, #8ab858 100%)',
  sochi_station:            'linear-gradient(180deg, #1a1208 0%, #2a1c10 40%, #e8c870 80%, #f0d880 100%)',
  train_compartment:        'linear-gradient(180deg, #0a0a14 0%, #1a1028 50%, #141020 100%)',
  default:                  'linear-gradient(180deg, #0a0a14 0%, #1a0a1e 100%)',
}

export default function Background({ backgroundKey }) {
  const fallback = FALLBACK_GRADIENTS[backgroundKey] || FALLBACK_GRADIENTS.default
  const imageUrl = backgroundKey
    ? getAssetUrl('backgrounds', `${backgroundKey}.webp`)
    : null

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: fallback,
      transition: 'background 0.8s ease',
    }}>
      {imageUrl && (
        <img src={imageUrl} alt="" style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
        }} onError={(e) => { e.target.style.display = 'none' }} />
      )}
      {/* Виньетка снизу */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.75) 100%)',
      }} />
    </div>
  )
}
