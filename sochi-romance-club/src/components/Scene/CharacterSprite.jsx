import React, { useState } from 'react'
import { getAssetUrl } from '../../services/supabase'

const POSITION_STYLES = {
  left:   { left: '0%',   transform: 'translateX(-10%)' },
  center: { left: '50%',  transform: 'translateX(-50%)' },
  right:  { right: '0%',  transform: 'translateX(10%)' },
}

// Плейсхолдер-эмодзи для персонажей (пока нет реальных спрайтов)
const CHARACTER_EMOJI = {
  ivan:       '🧑',
  inessa:     '👩',
  evgeniya:   '👩‍🦰',
  milana:     '👩‍🦱',
  vladislava: '👧',
  kartush:    '🧔',
  vovka:      '🐕',
  narrator:   null,
}

export default function CharacterSprite({ character, isActive }) {
  const { id, position = 'center', emotion = 'neutral' } = character
  const [imgError, setImgError] = useState(false)

  const posStyle = POSITION_STYLES[position] || POSITION_STYLES.center
  const imageUrl = getAssetUrl('characters', `${id}/${emotion}.webp`)
  const emoji = CHARACTER_EMOJI[id] || '👤'

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '30%',
        width: '200px',
        height: '300px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        opacity: isActive ? 1 : 0.5,
        filter: isActive ? 'none' : 'brightness(0.6)',
        transition: 'opacity 0.4s ease, filter 0.4s ease',
        ...posStyle,
      }}
    >
      {!imgError ? (
        <img
          src={imageUrl}
          alt={id}
          style={{ height: '100%', objectFit: 'contain', objectPosition: 'bottom' }}
          onError={() => setImgError(true)}
        />
      ) : (
        // Fallback: красивый плейсхолдер
        <div style={{
          width: '120px',
          height: '200px',
          background: 'rgba(201,168,76,0.1)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '48px' }}>{emoji}</span>
          <span style={{
            fontSize: '11px',
            color: 'rgba(201,168,76,0.7)',
            textTransform: 'capitalize',
            fontFamily: "'Lora', serif",
          }}>{id}</span>
        </div>
      )}
    </div>
  )
}
