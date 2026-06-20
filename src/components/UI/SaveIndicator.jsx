import React, { useEffect, useState } from 'react'

export default function SaveIndicator({ saveCount }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (saveCount === 0) return
    setShow(true)
    const timer = setTimeout(() => setShow(false), 2200)
    return () => clearTimeout(timer)
  }, [saveCount])

  if (!show) return null

  return (
    <div style={{
      position: 'absolute', top: '56px', right: '16px',
      background: 'rgba(8,8,18,0.9)', backdropFilter: 'blur(8px)',
      border: '1px solid rgba(201,168,76,0.35)', borderRadius: '8px',
      padding: '7px 13px', fontSize: '12px', color: '#c9a84c',
      fontFamily: "'Lora', serif", letterSpacing: '0.5px',
      display: 'flex', alignItems: 'center', gap: '6px',
      zIndex: 100, animation: 'saveIn 0.3s ease both',
    }}>
      <style>{`
        @keyframes saveIn { from{opacity:0;transform:translateY(-6px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
      `}</style>
      <span style={{ color: '#a8e87a' }}>✓</span> Сохранено
    </div>
  )
}
