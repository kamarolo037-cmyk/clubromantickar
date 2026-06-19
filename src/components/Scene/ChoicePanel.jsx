import React from 'react'

export default function ChoicePanel({ choices, onChoose }) {
  if (!choices || choices.length === 0) return null

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '20px 16px 32px',
      background: 'linear-gradient(to top, rgba(5,5,15,0.97) 0%, rgba(5,5,15,0.9) 80%, transparent 100%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '13px',
        color: 'rgba(201,168,76,0.7)',
        letterSpacing: '2px',
        textAlign: 'center',
        marginBottom: '4px',
      }}>
        — ВЫБЕРИТЕ —
      </p>

      {choices.map((choice, i) => (
        <button
          key={i}
          onClick={() => onChoose(choice)}
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: '10px',
            padding: '14px 18px',
            color: '#f0e8dc',
            fontFamily: "'Lora', serif",
            fontSize: '15px',
            lineHeight: '1.5',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          onPointerDown={e => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.18)'
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.7)'
          }}
          onPointerUp={e => {
            e.currentTarget.style.background = 'rgba(201,168,76,0.08)'
            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.35)'
          }}
        >
          <span style={{
            color: 'rgba(201,168,76,0.7)',
            marginRight: '8px',
            fontFamily: "'Playfair Display', serif",
          }}>
            {i + 1}.
          </span>
          {choice.text}
        </button>
      ))}
    </div>
  )
}
