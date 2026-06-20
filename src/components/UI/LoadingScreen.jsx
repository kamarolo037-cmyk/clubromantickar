import React, { useEffect, useState } from 'react'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 3,
  delay: Math.random() * 4,
  dur: 3 + Math.random() * 4,
}))

const TIPS = [
  'Ваши решения влияют на отношения с персонажами',
  'Исследуйте каждый уголок солнечного Сочи',
  'Тайны города раскрываются через диалоги',
  'Разные выборы открывают разные концовки',
]

export default function LoadingScreen({ progress = 0, tip }) {
  const [petals, setPetals] = useState([])
  const [dots, setDots] = useState(0)
  const [currentTip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)])

  useEffect(() => {
    const interval = setInterval(() => setDots(d => (d + 1) % 4), 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timers = []
    const spawnPetal = () => {
      const id = Date.now() + Math.random()
      setPetals(p => [...p, {
        id,
        x: 10 + Math.random() * 80,
        rotation: Math.random() * 360,
        dur: 4 + Math.random() * 3,
        delay: 0,
        size: 8 + Math.random() * 10,
      }])
      timers.push(setTimeout(() => {
        setPetals(p => p.filter(pt => pt.id !== id))
      }, 8000))
    }
    spawnPetal()
    const interval = setInterval(spawnPetal, 800)
    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 30%, #2a0a1e 0%, #0a0a14 60%, #000008 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-20px) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateY(0) rotate(20deg) scale(1); }
          90% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.5); opacity: 0; }
        }
        @keyframes roseGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(196,92,138,0.6)) drop-shadow(0 0 20px rgba(196,92,138,0.3)); transform: scale(1) rotate(0deg); }
          50% { filter: drop-shadow(0 0 18px rgba(196,92,138,0.9)) drop-shadow(0 0 40px rgba(201,168,76,0.4)); transform: scale(1.08) rotate(3deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes progressFill {
          from { width: 0%; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.25; }
        }
      `}</style>

      {/* Фоновые орбы */}
      {[
        { top: '10%', left: '15%', size: 200, color: 'rgba(196,92,138,0.15)', dur: 6 },
        { top: '60%', right: '10%', size: 150, color: 'rgba(201,168,76,0.1)', dur: 8 },
        { bottom: '20%', left: '5%', size: 100, color: 'rgba(120,80,200,0.12)', dur: 5 },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: orb.top, left: orb.left, right: orb.right, bottom: orb.bottom,
          width: orb.size, height: orb.size,
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          borderRadius: '50%',
          animation: `orbFloat ${orb.dur}s ease-in-out infinite`,
          animationDelay: `${i * 1.5}s`,
        }} />
      ))}

      {/* Звёзды */}
      {PARTICLES.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          background: 'white', borderRadius: '50%',
          animation: `starTwinkle ${p.dur}s ease-in-out infinite`,
          animationDelay: `${p.delay}s`,
        }} />
      ))}

      {/* Лепестки */}
      {petals.map(petal => (
        <div key={petal.id} style={{
          position: 'absolute', top: '-20px',
          left: `${petal.x}%`,
          fontSize: petal.size,
          animation: `petalFall ${petal.dur}s ease-in forwards`,
          animationDelay: `${petal.delay}s`,
          pointerEvents: 'none',
          zIndex: 1,
        }}>🌸</div>
      ))}

      {/* Центральная роза */}
      <div style={{
        animation: 'roseGlow 3s ease-in-out infinite',
        fontSize: '72px',
        marginBottom: '24px',
        zIndex: 2,
        animationDelay: '0.5s',
      }}>🌹</div>

      {/* Название */}
      <div style={{ textAlign: 'center', zIndex: 2, animation: 'fadeSlideUp 0.8s ease both', animationDelay: '0.2s' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '28px', fontWeight: '700',
          background: 'linear-gradient(135deg, #e8c97a, #c9a84c, #f0e8dc, #c9a84c)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 3s linear infinite',
          letterSpacing: '1px', marginBottom: '6px',
        }}>Клуб Романтики</h1>
        <p style={{
          fontFamily: "'Lora', serif", fontSize: '12px',
          color: '#c9a84c', letterSpacing: '8px',
        }}>В СОЧИ</p>
        <div style={{
          width: '80px', height: '1px', margin: '14px auto 0',
          background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
        }} />
      </div>

      {/* Прогресс бар */}
      <div style={{
        width: '200px', marginTop: '48px', zIndex: 2,
        animation: 'fadeSlideUp 0.8s ease both', animationDelay: '0.4s',
      }}>
        <div style={{
          width: '100%', height: '2px',
          background: 'rgba(201,168,76,0.15)',
          borderRadius: '2px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            background: 'linear-gradient(90deg, #c9a84c, #e8c97a)',
            boxShadow: '0 0 8px rgba(201,168,76,0.6)',
            animation: 'progressFill 2s ease forwards',
            width: `${progress}%`,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <p style={{
          textAlign: 'center', marginTop: '16px',
          fontFamily: "'Lora', serif", fontSize: '12px',
          color: 'rgba(240,232,220,0.4)', letterSpacing: '2px',
        }}>
          Загрузка{'.' .repeat(dots + 1)}
        </p>
      </div>

      {/* Подсказка */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '24px', right: '24px',
        textAlign: 'center', zIndex: 2,
        animation: 'fadeSlideUp 0.8s ease both', animationDelay: '0.8s',
      }}>
        <p style={{
          fontFamily: "'Lora', serif", fontSize: '11px', fontStyle: 'italic',
          color: 'rgba(201,168,76,0.45)', lineHeight: '1.6', letterSpacing: '0.5px',
        }}>💡 {tip || currentTip}</p>
      </div>
    </div>
  )
}
