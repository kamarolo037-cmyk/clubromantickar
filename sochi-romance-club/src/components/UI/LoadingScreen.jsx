import React from 'react'

export default function LoadingScreen() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a0a14 0%, #1a0a1e 100%)',
      gap: '24px',
    }}>
      <div style={{
        fontSize: '48px',
        animation: 'pulse 2s ease-in-out infinite',
      }}>🌹</div>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '20px',
        color: '#c9a84c',
        letterSpacing: '2px',
      }}>Клуб романтики</p>
      <p style={{
        fontFamily: "'Lora', serif",
        fontSize: '14px',
        color: 'rgba(240, 232, 220, 0.5)',
        letterSpacing: '4px',
      }}>СОЧИ</p>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}
