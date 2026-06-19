import React, { useEffect, useRef } from 'react'

const SPEAKER_COLORS = {
  ivan:       '#7ab8e8',
  inessa:     '#e87aa8',
  evgeniya:   '#a8e87a',
  milana:     '#e8c87a',
  vladislava: '#c87ae8',
  kartush:    '#7ae8d4',
  vovka:      '#e8a87a',
  narrator:   '#c9a84c',
}

const SPEAKER_NAMES = {
  ivan:       'Иван',
  inessa:     'Инесса',
  evgeniya:   'Евгения',
  milana:     'Милана',
  vladislava: 'Владислава',
  kartush:    'Картуш',
  vovka:      'Вовка',
  narrator:   '...',
}

export default function DialogueBox({ speaker, text, displayedText, isTyping, onSkip }) {
  const speakerColor = SPEAKER_COLORS[speaker] || '#c9a84c'
  const speakerName = SPEAKER_NAMES[speaker] || speaker || ''
  const isNarrator = !speaker || speaker === 'narrator'

  return (
    <div
      onClick={isTyping ? onSkip : undefined}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: '30%',
        background: 'linear-gradient(to top, rgba(5,5,15,0.97) 0%, rgba(5,5,15,0.92) 80%, transparent 100%)',
        padding: '20px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Имя персонажа */}
      {!isNarrator && (
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '16px',
          fontWeight: '700',
          color: speakerColor,
          letterSpacing: '0.5px',
          textShadow: `0 0 12px ${speakerColor}55`,
        }}>
          {speakerName}
        </div>
      )}

      {/* Текст диалога */}
      <div style={{
        fontFamily: "'Lora', serif",
        fontSize: isNarrator ? '15px' : '16px',
        lineHeight: '1.7',
        color: isNarrator ? 'rgba(240,232,220,0.8)' : '#f0e8dc',
        fontStyle: isNarrator ? 'italic' : 'normal',
        letterSpacing: isNarrator ? '0.3px' : '0',
        minHeight: '60px',
      }}>
        {displayedText}
        {isTyping && (
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '16px',
            background: speakerColor,
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'blink 0.7s step-end infinite',
          }} />
        )}
      </div>

      {/* Подсказка "тап чтобы продолжить" */}
      {!isTyping && (
        <div style={{
          alignSelf: 'flex-end',
          fontSize: '12px',
          color: 'rgba(201,168,76,0.5)',
          fontFamily: "'Lora', serif",
          animation: 'pulse 1.5s ease-in-out infinite',
        }}>
          ▼ продолжить
        </div>
      )}

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
      `}</style>
    </div>
  )
}
