import React from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerStore } from '../store/playerStore'

export default function StartPage() {
  const navigate = useNavigate()
  const { progress, updateProgress } = usePlayerStore()

  const isNewGame = !progress?.current_scene || progress.current_scene === 'scene_001'

  // BUG FIX: "Начать заново" сбрасывает прогресс до scene_001 перед навигацией
  const handleNewGame = () => {
    updateProgress({
      current_scene: 'scene_001',
      chapter: 1,
      relationships: {
        ivan: 0, inessa: 0, evgeniya: 0,
        milana: 0, vladislava: 0, kartush: 0, vovka: 0,
      },
      flags: {},
    })
    navigate('/game')
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(180deg, #0a0a14 0%, #1a0820 50%, #0a0a14 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Декоративные огни */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(196,92,138,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />

      {/* Логотип */}
      <div style={{ textAlign: 'center', zIndex: 1, marginBottom: '60px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🌹</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '26px',
          fontWeight: '700',
          color: '#f0e8dc',
          letterSpacing: '1px',
          lineHeight: '1.3',
        }}>
          Клуб романтики
        </h1>
        <p style={{
          fontFamily: "'Lora', serif",
          fontSize: '13px',
          color: '#c9a84c',
          letterSpacing: '6px',
          marginTop: '8px',
        }}>
          В СОЧИ
        </p>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
          margin: '16px auto 0',
        }} />
      </div>

      {/* Кнопки */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '260px',
        zIndex: 1,
      }}>
        <button
          onClick={() => navigate('/game')}
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #a07830)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 24px',
            color: '#0a0a14',
            fontFamily: "'Playfair Display', serif",
            fontSize: '17px',
            fontWeight: '700',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
          }}
        >
          {isNewGame ? '✨ Начать историю' : '▶ Продолжить'}
        </button>

        {/* BUG FIX: кнопка теперь сбрасывает прогресс через handleNewGame */}
        {!isNewGame && (
          <button
            onClick={handleNewGame}
            style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '12px',
              padding: '14px 24px',
              color: '#c9a84c',
              fontFamily: "'Lora', serif",
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Начать заново
          </button>
        )}
      </div>

      {/* Версия */}
      <p style={{
        position: 'absolute',
        bottom: '24px',
        fontSize: '11px',
        color: 'rgba(240,232,220,0.2)',
        fontFamily: "'Lora', serif",
        letterSpacing: '1px',
      }}>
        Глава 1 · Лето в Сочи
      </p>
    </div>
  )
}
