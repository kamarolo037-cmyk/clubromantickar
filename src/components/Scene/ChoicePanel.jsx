import React, { useState } from 'react'

export default function ChoicePanel({ choices, onChoose }) {
  const [pressed, setPressed] = useState(null)
  if (!choices || choices.length === 0) return null

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '20px 16px 36px',
      background: 'linear-gradient(to top, rgba(3,3,12,0.98) 0%, rgba(5,5,15,0.93) 75%, transparent 100%)',
      display: 'flex', flexDirection: 'column', gap: '9px',
    }}>
      <style>{`
        @keyframes choiceIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
      `}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3))' }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '11px', color: 'rgba(201,168,76,0.55)', letterSpacing: '3px', whiteSpace: 'nowrap' }}>ВАШ ВЫБОР</p>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.3), transparent)' }} />
      </div>

      {choices.map((choice, i) => (
        <button key={i} onClick={(e) => { e.stopPropagation(); onChoose(choice) }}
          onPointerDown={() => setPressed(i)} onPointerUp={() => setPressed(null)} onPointerLeave={() => setPressed(null)}
          style={{
            background: pressed === i
              ? 'linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.12))'
              : 'rgba(201,168,76,0.07)',
            border: `1px solid ${pressed === i ? 'rgba(201,168,76,0.65)' : 'rgba(201,168,76,0.3)'}`,
            borderRadius: '12px', padding: '14px 16px',
            color: '#f0e8dc', fontFamily: "'Lora', serif",
            fontSize: '15px', lineHeight: '1.5', textAlign: 'left',
            cursor: 'pointer', transition: 'all 0.15s ease',
            transform: pressed === i ? 'scale(0.99)' : 'scale(1)',
            boxShadow: pressed === i ? '0 0 0 1px rgba(201,168,76,0.3) inset' : 'none',
            animation: `choiceIn 0.3s ease both`, animationDelay: `${i * 0.07}s`,
            display: 'flex', alignItems: 'flex-start', gap: '10px',
          }}>
          <span style={{
            minWidth: '22px', height: '22px', borderRadius: '50%',
            background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Playfair Display', serif", fontSize: '11px', color: '#c9a84c',
            flexShrink: 0, marginTop: '1px',
          }}>{i + 1}</span>
          <span style={{ flex: 1 }}>{choice.text}</span>
          {choice.effects && Object.keys(choice.effects).length > 0 && (
            <span style={{ fontSize: '14px', flexShrink: 0, opacity: 0.6, marginTop: '2px' }}>💫</span>
          )}
        </button>
      ))}
    </div>
  )
}
