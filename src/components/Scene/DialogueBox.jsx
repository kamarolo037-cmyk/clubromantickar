import React from 'react'

const SPEAKER_COLORS = {
  ivan: '#7ab8e8', inessa: '#e87aa8', evgeniya: '#a8e87a',
  milana: '#e8c87a', vladislava: '#c87ae8', kartush: '#7ae8d4',
  vovka: '#e8a87a', narrator: '#c9a84c',
}
const SPEAKER_NAMES = {
  ivan: 'Иван', inessa: 'Инесса', evgeniya: 'Евгения', milana: 'Милана',
  vladislava: 'Владислава', kartush: 'Картуш', vovka: 'Вовка', narrator: '...',
}

export default function DialogueBox({ speaker, text, displayedText, isTyping, hasNextScene, onSkip }) {
  const speakerColor = SPEAKER_COLORS[speaker] || '#c9a84c'
  const speakerName = SPEAKER_NAMES[speaker] || speaker || ''
  const isNarrator = !speaker || speaker === 'narrator'

  return (
    <div onClick={isTyping ? onSkip : undefined} style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      minHeight: '32%',
      background: 'linear-gradient(to top, rgba(3,3,12,0.97) 0%, rgba(4,4,14,0.93) 70%, transparent 100%)',
      padding: '16px 22px 36px',
      display: 'flex', flexDirection: 'column', gap: '8px',
    }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0);opacity:0.5} 50%{transform:translateY(-4px);opacity:1} }
        @keyframes nameIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      {/* Полоска имени */}
      {!isNarrator && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          animation: 'nameIn 0.3s ease both',
        }}>
          <div style={{
            width: '3px', height: '20px', borderRadius: '2px',
            background: speakerColor,
            boxShadow: `0 0 8px ${speakerColor}88`,
          }} />
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: '700',
            color: speakerColor, letterSpacing: '0.5px',
            textShadow: `0 0 16px ${speakerColor}44`,
          }}>{speakerName}</span>
        </div>
      )}

      {/* Текст */}
      <div style={{
        fontFamily: "'Lora', serif",
        fontSize: isNarrator ? '14px' : '16px',
        lineHeight: '1.75', color: isNarrator ? 'rgba(240,232,220,0.78)' : '#f0e8dc',
        fontStyle: isNarrator ? 'italic' : 'normal',
        letterSpacing: isNarrator ? '0.4px' : '0',
        minHeight: '56px',
      }}>
        {displayedText}
        {isTyping && (
          <span style={{
            display: 'inline-block', width: '2px', height: '15px',
            background: speakerColor, marginLeft: '2px', verticalAlign: 'middle',
            animation: 'blink 0.65s step-end infinite',
          }} />
        )}
      </div>

      {/* Продолжить */}
      {!isTyping && hasNextScene && (
        <div style={{
          alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px',
          fontSize: '11px', color: 'rgba(201,168,76,0.5)',
          fontFamily: "'Lora', serif", letterSpacing: '0.5px',
        }}>
          <span style={{ animation: 'bounce 1.4s ease-in-out infinite', display: 'block' }}>▼</span>
          <span>продолжить</span>
        </div>
      )}
    </div>
  )
}
