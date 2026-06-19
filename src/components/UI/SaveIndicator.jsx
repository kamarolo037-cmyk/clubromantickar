import React, { useEffect, useState } from 'react'

export default function SaveIndicator({ visible }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!show) return null

  return (
    <div style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'rgba(10,10,20,0.9)',
      border: '1px solid rgba(201,168,76,0.4)',
      borderRadius: '8px',
      padding: '6px 12px',
      fontSize: '12px',
      color: '#c9a84c',
      fontFamily: "'Lora', serif",
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      zIndex: 100,
      animation: 'fadeIn 0.3s ease',
    }}>
      ✓ Сохранено
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(-4px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  )
}
