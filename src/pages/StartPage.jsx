import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerStore } from '../store/playerStore'

const MENU_SCREENS = {
  MAIN: 'main',
  SETTINGS: 'settings',
  GALLERY: 'gallery',
  STATS: 'stats',
  ABOUT: 'about',
}

function RelBar({ name, value, color }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontFamily: "'Lora', serif", fontSize: '12px', color: 'rgba(240,232,220,0.7)' }}>{name}</span>
        <span style={{ fontFamily: "'Lora', serif", fontSize: '12px', color: '#c9a84c' }}>{value}/100</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '2px',
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          width: `${value}%`,
          boxShadow: `0 0 6px ${color}66`,
          transition: 'width 1s ease',
        }} />
      </div>
    </div>
  )
}

function SettingsScreen({ settings, onUpdate, onBack }) {
  return (
    <div style={{ padding: '0 8px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#c9a84c', marginBottom: '24px', textAlign: 'center' }}>
        ⚙️ Настройки
      </h2>

      {/* Скорость текста */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: 'rgba(240,232,220,0.6)', marginBottom: '12px', letterSpacing: '1px' }}>СКОРОСТЬ ТЕКСТА</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ label: 'Медленно', val: 60 }, { label: 'Норм', val: 30 }, { label: 'Быстро', val: 10 }].map(opt => (
            <button key={opt.val} onClick={() => onUpdate({ textSpeed: opt.val })} style={{
              flex: 1, padding: '10px 6px',
              background: settings.textSpeed === opt.val ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${settings.textSpeed === opt.val ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
              borderRadius: '8px', color: settings.textSpeed === opt.val ? '#c9a84c' : 'rgba(240,232,220,0.6)',
              fontFamily: "'Lora', serif", fontSize: '12px', cursor: 'pointer',
              transition: 'all 0.2s',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>

      {/* Звук */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: 'rgba(240,232,220,0.6)', marginBottom: '12px', letterSpacing: '1px' }}>МУЗЫКА И ЗВУК</p>
        {[
          { key: 'musicOn', label: '🎵 Фоновая музыка' },
          { key: 'sfxOn', label: '🔊 Звуковые эффекты' },
          { key: 'vibration', label: '📳 Вибрация' },
        ].map(item => (
          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontFamily: "'Lora', serif", fontSize: '14px', color: 'rgba(240,232,220,0.85)' }}>{item.label}</span>
            <div onClick={() => onUpdate({ [item.key]: !settings[item.key] })} style={{
              width: '44px', height: '24px', borderRadius: '12px', cursor: 'pointer',
              background: settings[item.key] ? 'linear-gradient(90deg, #c9a84c, #a07830)' : 'rgba(255,255,255,0.1)',
              position: 'relative', transition: 'all 0.3s',
              boxShadow: settings[item.key] ? '0 0 8px rgba(201,168,76,0.4)' : 'none',
            }}>
              <div style={{
                position: 'absolute', top: '3px',
                left: settings[item.key] ? '23px' : '3px',
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'white', transition: 'left 0.3s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Тема текста */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: 'rgba(240,232,220,0.6)', marginBottom: '12px', letterSpacing: '1px' }}>РАЗМЕР ТЕКСТА</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[{ label: 'A', size: 14 }, { label: 'A', size: 16 }, { label: 'A', size: 18 }].map((opt, i) => (
            <button key={i} onClick={() => onUpdate({ fontSize: opt.size })} style={{
              flex: 1, padding: '12px',
              background: settings.fontSize === opt.size ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${settings.fontSize === opt.size ? '#c9a84c' : 'rgba(201,168,76,0.2)'}`,
              borderRadius: '8px', color: settings.fontSize === opt.size ? '#c9a84c' : 'rgba(240,232,220,0.6)',
              fontFamily: "'Playfair Display', serif", fontSize: opt.size, cursor: 'pointer',
              transition: 'all 0.2s',
            }}>{opt.label}</button>
          ))}
        </div>
      </div>

      <button onClick={onBack} style={{
        width: '100%', padding: '14px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))',
        border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
        color: '#c9a84c', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
        marginTop: '8px',
      }}>← Назад</button>
    </div>
  )
}

function StatsScreen({ progress, onBack }) {
  const rels = progress?.relationships || {}
  const relEntries = [
    { key: 'ivan', name: 'Иван', color: '#7ab8e8' },
    { key: 'inessa', name: 'Инесса', color: '#e87aa8' },
    { key: 'evgeniya', name: 'Евгения', color: '#a8e87a' },
    { key: 'milana', name: 'Милана', color: '#e8c87a' },
    { key: 'vladislava', name: 'Владислава', color: '#c87ae8' },
    { key: 'kartush', name: 'Картуш', color: '#7ae8d4' },
    { key: 'vovka', name: 'Вовка', color: '#e8a87a' },
  ]

  const chapterNames = { 1: 'Глава 1 · Прибытие', 2: 'Глава 2 · Первые встречи', 3: 'Глава 3 · Тайны города' }
  const choicesMade = Object.values(rels).reduce((a, b) => a + Math.floor(b / 10), 0)

  return (
    <div style={{ padding: '0 8px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#c9a84c', marginBottom: '20px', textAlign: 'center' }}>
        📖 Статистика
      </h2>

      {/* Текущее место */}
      <div style={{
        background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)',
        borderRadius: '12px', padding: '14px 16px', marginBottom: '20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: 'rgba(240,232,220,0.5)', letterSpacing: '1px' }}>ТЕКУЩАЯ ГЛАВА</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', color: '#f0e8dc', marginTop: '4px' }}>
            {chapterNames[progress?.chapter] || 'Начало'}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: 'rgba(240,232,220,0.5)', letterSpacing: '1px' }}>ВЫБОРОВ</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#c9a84c' }}>{choicesMade}</p>
        </div>
      </div>

      {/* Отношения */}
      <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: 'rgba(240,232,220,0.5)', letterSpacing: '2px', marginBottom: '12px' }}>ОТНОШЕНИЯ</p>
      {relEntries.map(r => (
        <RelBar key={r.key} name={r.name} value={rels[r.key] || 0} color={r.color} />
      ))}

      <button onClick={onBack} style={{
        width: '100%', padding: '14px', marginTop: '16px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))',
        border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
        color: '#c9a84c', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
      }}>← Назад</button>
    </div>
  )
}

function GalleryScreen({ onBack }) {
  const locations = [
    { emoji: '🏖️', name: 'Пляж Сочи', locked: false },
    { emoji: '🌴', name: 'Набережная', locked: false },
    { emoji: '🏨', name: 'Гранд Отель', locked: true },
    { emoji: '🍷', name: 'Ресторан «Романтика»', locked: true },
    { emoji: '⛰️', name: 'Горы Красной Поляны', locked: true },
    { emoji: '🌊', name: 'Закат на море', locked: true },
  ]

  return (
    <div style={{ padding: '0 8px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#c9a84c', marginBottom: '8px', textAlign: 'center' }}>
        🖼️ Галерея
      </h2>
      <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: 'rgba(240,232,220,0.4)', textAlign: 'center', marginBottom: '20px', letterSpacing: '1px' }}>
        Открывайте локации, читая историю
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        {locations.map((loc, i) => (
          <div key={i} style={{
            aspectRatio: '1',
            background: loc.locked ? 'rgba(255,255,255,0.03)' : 'rgba(201,168,76,0.1)',
            border: `1px solid ${loc.locked ? 'rgba(255,255,255,0.08)' : 'rgba(201,168,76,0.35)'}`,
            borderRadius: '12px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '8px', position: 'relative', overflow: 'hidden',
          }}>
            {loc.locked ? (
              <>
                <span style={{ fontSize: '28px', filter: 'grayscale(1)', opacity: 0.3 }}>{loc.emoji}</span>
                <span style={{ fontSize: '20px' }}>🔒</span>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '10px', color: 'rgba(240,232,220,0.25)', textAlign: 'center', padding: '0 8px' }}>{loc.name}</p>
              </>
            ) : (
              <>
                <span style={{ fontSize: '36px' }}>{loc.emoji}</span>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: '#c9a84c', textAlign: 'center', padding: '0 8px' }}>{loc.name}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{
        width: '100%', padding: '14px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))',
        border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
        color: '#c9a84c', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
      }}>← Назад</button>
    </div>
  )
}

function AboutScreen({ onBack }) {
  return (
    <div style={{ padding: '0 8px' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#c9a84c', marginBottom: '20px', textAlign: 'center' }}>
        🌹 О Игре
      </h2>
      <div style={{
        background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: '12px', padding: '20px', marginBottom: '16px',
      }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#f0e8dc', lineHeight: '1.7', fontStyle: 'italic', textAlign: 'center' }}>
          «Жаркое сочинское лето. Море, горы и тайны, которые вам предстоит раскрыть...»
        </p>
      </div>
      {[
        { icon: '📖', label: 'Жанр', val: 'Визуальная новелла' },
        { icon: '🌍', label: 'Место действия', val: 'Сочи, Россия' },
        { icon: '💫', label: '★ Глав', val: '3 (в разработке)' },
        { icon: '🎭', label: 'Персонажей', val: '7 уникальных героев' },
        { icon: '🔀', label: 'Концовок', val: 'Множество вариантов' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: 'rgba(240,232,220,0.6)' }}>{item.icon} {item.label}</span>
          <span style={{ fontFamily: "'Lora', serif", fontSize: '13px', color: '#c9a84c' }}>{item.val}</span>
        </div>
      ))}
      <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: 'rgba(240,232,220,0.25)', textAlign: 'center', marginTop: '16px' }}>
        Версия 1.1.0 · Клуб Романтики в Сочи
      </p>
      <button onClick={onBack} style={{
        width: '100%', padding: '14px', marginTop: '16px',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))',
        border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
        color: '#c9a84c', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
      }}>← Назад</button>
    </div>
  )
}

export default function StartPage() {
  const navigate = useNavigate()
  const { progress, updateProgress } = usePlayerStore()
  const [screen, setScreen] = useState(MENU_SCREENS.MAIN)
  const [confirmReset, setConfirmReset] = useState(false)
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('crk_settings') || 'null') || { textSpeed: 30, musicOn: true, sfxOn: true, vibration: true, fontSize: 16 } }
    catch { return { textSpeed: 30, musicOn: true, sfxOn: true, vibration: true, fontSize: 16 } }
  })

  const isNewGame = !progress?.current_scene || progress.current_scene === 'scene_001'

  const updateSettings = (updates) => {
    const newS = { ...settings, ...updates }
    setSettings(newS)
    try { localStorage.setItem('crk_settings', JSON.stringify(newS)) } catch {}
  }

  const handleNewGame = () => {
    updateProgress({
      current_scene: 'scene_001', chapter: 1,
      relationships: { ivan: 0, inessa: 0, evgeniya: 0, milana: 0, vladislava: 0, kartush: 0, vovka: 0 },
      flags: {},
    })
    navigate('/game')
  }

  const [particles] = useState(() => Array.from({ length: 20 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2, dur: 3 + Math.random() * 5, delay: Math.random() * 4,
  })))

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 50% 20%, #2a0a1e 0%, #0d0a18 50%, #000008 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.1;transform:scale(0.8)} 50%{opacity:0.8;transform:scale(1.2)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes roseFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.05)} }
        @keyframes roseGlow { 0%,100%{filter:drop-shadow(0 0 10px rgba(196,92,138,0.5)) drop-shadow(0 0 25px rgba(196,92,138,0.25))} 50%{filter:drop-shadow(0 0 20px rgba(196,92,138,0.8)) drop-shadow(0 0 50px rgba(201,168,76,0.3))} }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes orbPulse { 0%,100%{transform:scale(1);opacity:0.12} 50%{transform:scale(1.15);opacity:0.2} }
        @keyframes menuSlideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .menu-btn:active { transform: scale(0.97) !important; }
      `}</style>

      {/* Звёзды */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, background: 'white', borderRadius: '50%',
          animation: `twinkle ${p.dur}s ease-in-out infinite`, animationDelay: `${p.delay}s`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Фоновые орбы */}
      <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 320, height: 320, background: 'radial-gradient(circle, rgba(196,92,138,0.12) 0%, transparent 70%)', borderRadius: '50%', animation: 'orbPulse 6s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 200, height: 200, background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', borderRadius: '50%', animation: 'orbPulse 8s ease-in-out infinite', animationDelay: '2s' }} />

      {/* Верхняя секция: логотип */}
      {screen === MENU_SCREENS.MAIN && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 2, animation: 'slideDown 0.6s ease both' }}>
          <div style={{ animation: 'roseFloat 4s ease-in-out infinite', fontSize: '72px', marginBottom: '16px' }}>
            <span style={{ animation: 'roseGlow 3s ease-in-out infinite', display: 'block' }}>🌹</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: '700',
            background: 'linear-gradient(135deg, #e8c97a 0%, #c9a84c 40%, #f0e8dc 70%, #c9a84c 100%)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite',
            letterSpacing: '1px', textAlign: 'center', marginBottom: '8px',
          }}>Клуб Романтики</h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '11px', color: '#c9a84c', letterSpacing: '8px', marginBottom: '12px' }}>В СОЧИ</p>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)' }} />
          {progress?.chapter && progress.chapter > 1 && (
            <p style={{ fontFamily: "'Lora', serif", fontSize: '12px', color: 'rgba(201,168,76,0.6)', marginTop: '10px', fontStyle: 'italic' }}>
              Глава {progress.chapter} · продолжается...
            </p>
          )}
        </div>
      )}

      {/* Нижняя секция */}
      <div style={{
        width: '100%', padding: '0 24px 40px',
        zIndex: 2, maxWidth: '400px',
      }}>

        {/* ГЛАВНОЕ МЕНЮ */}
        {screen === MENU_SCREENS.MAIN && (
          <div style={{ animation: 'slideUp 0.6s ease both', animationDelay: '0.1s' }}>
            {/* Кнопка играть */}
            <button className="menu-btn" onClick={() => navigate('/game')} style={{
              width: '100%', padding: '18px 24px', marginBottom: '12px',
              background: 'linear-gradient(135deg, #c9a84c 0%, #a07830 100%)',
              border: 'none', borderRadius: '14px',
              color: '#0a0a14', fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px',
              cursor: 'pointer', transition: 'transform 0.15s ease',
              boxShadow: '0 6px 30px rgba(201,168,76,0.35), 0 2px 8px rgba(0,0,0,0.4)',
              position: 'relative', overflow: 'hidden',
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>
                {isNewGame ? '✨ Начать историю' : '▶ Продолжить'}
              </span>
              <div style={{
                position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </button>

            {/* Второй ряд кнопок */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <button className="menu-btn" onClick={() => setScreen(MENU_SCREENS.STATS)} style={{
                padding: '14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px',
                color: 'rgba(240,232,220,0.85)', fontFamily: "'Lora', serif", fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>📊</span>
                Статистика
              </button>
              <button className="menu-btn" onClick={() => setScreen(MENU_SCREENS.GALLERY)} style={{
                padding: '14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px',
                color: 'rgba(240,232,220,0.85)', fontFamily: "'Lora', serif", fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>🖼️</span>
                Галерея
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button className="menu-btn" onClick={() => setScreen(MENU_SCREENS.SETTINGS)} style={{
                padding: '14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px',
                color: 'rgba(240,232,220,0.85)', fontFamily: "'Lora', serif", fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>⚙️</span>
                Настройки
              </button>
              <button className="menu-btn" onClick={() => setScreen(MENU_SCREENS.ABOUT)} style={{
                padding: '14px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(201,168,76,0.3)', borderRadius: '12px',
                color: 'rgba(240,232,220,0.85)', fontFamily: "'Lora', serif", fontSize: '13px',
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
              }}>
                <span style={{ fontSize: '22px' }}>ℹ️</span>
                Об игре
              </button>
            </div>

            {/* Начать заново с подтверждением */}
            {!isNewGame && !confirmReset && (
              <button className="menu-btn" onClick={() => setConfirmReset(true)} style={{
                width: '100%', marginTop: '12px', padding: '12px',
                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: 'rgba(240,232,220,0.35)',
                fontFamily: "'Lora', serif", fontSize: '13px', cursor: 'pointer',
                transition: 'all 0.2s',
              }}>Начать заново</button>
            )}

            {!isNewGame && confirmReset && (
              <div style={{ marginTop: '12px', padding: '14px', background: 'rgba(200,50,50,0.1)', border: '1px solid rgba(200,50,50,0.3)', borderRadius: '10px' }}>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '12px', color: 'rgba(240,200,200,0.8)', textAlign: 'center', marginBottom: '12px' }}>
                  Весь прогресс будет удалён. Вы уверены?
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setConfirmReset(false)} style={{
                    flex: 1, padding: '10px', background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px',
                    color: 'rgba(240,232,220,0.7)', fontFamily: "'Lora', serif", fontSize: '13px', cursor: 'pointer',
                  }}>Отмена</button>
                  <button onClick={handleNewGame} style={{
                    flex: 1, padding: '10px', background: 'rgba(200,50,50,0.2)',
                    border: '1px solid rgba(200,50,50,0.4)', borderRadius: '8px',
                    color: '#f08080', fontFamily: "'Lora', serif", fontSize: '13px', cursor: 'pointer',
                  }}>Сбросить</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ПОДЭКРАНЫ */}
        {screen !== MENU_SCREENS.MAIN && (
          <div style={{
            background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201,168,76,0.2)', borderRadius: '20px',
            padding: '24px 20px', animation: 'menuSlideIn 0.3s ease both',
            maxHeight: '70vh', overflowY: 'auto',
          }}>
            {screen === MENU_SCREENS.SETTINGS && (
              <SettingsScreen settings={settings} onUpdate={updateSettings} onBack={() => setScreen(MENU_SCREENS.MAIN)} />
            )}
            {screen === MENU_SCREENS.STATS && (
              <StatsScreen progress={progress} onBack={() => setScreen(MENU_SCREENS.MAIN)} />
            )}
            {screen === MENU_SCREENS.GALLERY && (
              <GalleryScreen onBack={() => setScreen(MENU_SCREENS.MAIN)} />
            )}
            {screen === MENU_SCREENS.ABOUT && (
              <AboutScreen onBack={() => setScreen(MENU_SCREENS.MAIN)} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
