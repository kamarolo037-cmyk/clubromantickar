import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerStore } from '../store/playerStore'
import { useGameStore } from '../store/gameStore'
import { loadScene } from '../services/sceneService'
import { saveProgress, logChoice, applyEffects, applyFlags } from '../services/progressService'
import Background from '../components/Scene/Background'
import CharacterSprite from '../components/Scene/CharacterSprite'
import DialogueBox from '../components/Scene/DialogueBox'
import ChoicePanel from '../components/Scene/ChoicePanel'
import SaveIndicator from '../components/UI/SaveIndicator'
import LoadingScreen from '../components/UI/LoadingScreen'

function InGameMenu({ onClose, onMainMenu }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,4,0.85)', backdropFilter: 'blur(12px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '280px', padding: '32px 24px',
        background: 'rgba(10,10,20,0.95)', border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '12px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '32px' }}>🌹</span>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', color: '#c9a84c', marginTop: '8px' }}>Пауза</p>
        </div>
        <button onClick={onClose} style={{
          padding: '14px', background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.1))',
          border: '1px solid rgba(201,168,76,0.4)', borderRadius: '10px',
          color: '#c9a84c', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
        }}>▶ Продолжить</button>
        <button onClick={onMainMenu} style={{
          padding: '14px', background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
          color: 'rgba(240,232,220,0.7)', fontFamily: "'Lora', serif", fontSize: '14px', cursor: 'pointer',
        }}>🏠 Главное меню</button>
      </div>
    </div>
  )
}

function RelationshipToast({ character, delta }) {
  const NAMES = { ivan: 'Иван', inessa: 'Инесса', evgeniya: 'Евгения', milana: 'Милана', vladislava: 'Владислава', kartush: 'Картуш', vovka: 'Вовка' }
  const COLORS = { ivan: '#7ab8e8', inessa: '#e87aa8', evgeniya: '#a8e87a', milana: '#e8c87a', vladislava: '#c87ae8', kartush: '#7ae8d4', vovka: '#e8a87a' }
  const isPositive = delta > 0
  return (
    <div style={{
      position: 'absolute', top: '60px', right: '16px', zIndex: 150,
      background: 'rgba(10,10,20,0.92)', border: `1px solid ${COLORS[character] || '#c9a84c'}44`,
      borderRadius: '10px', padding: '8px 14px',
      display: 'flex', alignItems: 'center', gap: '8px',
      animation: 'toastSlide 0.3s ease both',
    }}>
      <style>{`@keyframes toastSlide { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }`}</style>
      <span style={{ fontSize: '14px' }}>{isPositive ? '💖' : '💔'}</span>
      <div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '12px', color: COLORS[character] || '#c9a84c' }}>{NAMES[character] || character}</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '11px', color: isPositive ? '#a8e87a' : '#e87a7a' }}>
          {isPositive ? '+' : ''}{delta}
        </p>
      </div>
    </div>
  )
}

const TYPING_SPEED = 30

export default function GamePage() {
  const navigate = useNavigate()
  const { telegramId, progress, updateProgress } = usePlayerStore()
  const { currentScene, isTyping, displayedText, setCurrentScene, setTyping, setDisplayedText } = useGameStore()

  const [showChoices, setShowChoices] = useState(false)
  const [saveCount, setSaveCount] = useState(0)
  const [pageLoading, setPageLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [relToasts, setRelToasts] = useState([]) // { id, char, delta }
  const [transitionKey, setTransitionKey] = useState(0)

  const typingTimer = useRef(null)
  const fullText = useRef('')
  const isTypingRef = useRef(false)

  const startTyping = useCallback((text, speed = TYPING_SPEED) => {
    fullText.current = text
    setDisplayedText('')
    setTyping(true)
    isTypingRef.current = true
    setShowChoices(false)
    let i = 0
    clearInterval(typingTimer.current)
    typingTimer.current = setInterval(() => {
      i++
      setDisplayedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(typingTimer.current)
        setTyping(false)
        isTypingRef.current = false
        setShowChoices(true)
      }
    }, speed)
  }, [setDisplayedText, setTyping])

  const fetchScene = useCallback(async (sceneId) => {
    setPageLoading(true)
    setShowChoices(false)
    setDisplayedText('')
    const scene = await loadScene(sceneId)
    if (!scene) {
      console.error('Scene not found:', sceneId)
      setPageLoading(false)
      return
    }
    setCurrentScene(scene)
    setTransitionKey(k => k + 1)
    setPageLoading(false)
    // Настройки скорости из localStorage
    let speed = TYPING_SPEED
    try {
      const s = JSON.parse(localStorage.getItem('crk_settings') || '{}')
      if (s.textSpeed) speed = s.textSpeed
    } catch {}
    startTyping(scene.dialogue, speed)
  }, [startTyping, setCurrentScene, setDisplayedText])

  const skipTyping = useCallback(() => {
    if (isTypingRef.current) {
      clearInterval(typingTimer.current)
      setDisplayedText(fullText.current)
      setTyping(false)
      isTypingRef.current = false
      setShowChoices(true)
    }
  }, [setDisplayedText, setTyping])

  const handleSceneTap = useCallback(() => {
    if (menuOpen) return
    if (isTypingRef.current) { skipTyping(); return }
    if (currentScene && (!currentScene.choices || currentScene.choices.length === 0)) {
      if (currentScene.next_scene) goToScene(currentScene.next_scene)
    }
  }, [currentScene, skipTyping, menuOpen])

  const goToScene = useCallback((sceneId) => {
    fetchScene(sceneId)
    updateProgress({ current_scene: sceneId })
  }, [fetchScene, updateProgress])

  const handleChoice = useCallback(async (choice) => {
    if (!progress || !telegramId) return

    const newRelationships = applyEffects(progress.relationships, choice.effects || {})
    const newFlags = applyFlags(progress.flags, choice.set_flags || {})
    const newChapter = choice.chapter || progress.chapter

    // Показываем тосты об изменении отношений
    Object.entries(choice.effects || {}).forEach(([char, delta]) => {
      if (delta !== 0) {
        const id = Date.now() + Math.random()
        setRelToasts(prev => [...prev, { id, char, delta }])
        setTimeout(() => setRelToasts(prev => prev.filter(t => t.id !== id)), 2500)
      }
    })

    const updatedProgress = {
      current_scene: choice.next_scene, chapter: newChapter,
      relationships: newRelationships, flags: newFlags,
    }
    updateProgress(updatedProgress)
    await logChoice(telegramId, { sceneId: currentScene.id, choiceText: choice.text, nextScene: choice.next_scene })
    await saveProgress(telegramId, updatedProgress)
    setSaveCount(c => c + 1)
    goToScene(choice.next_scene)
  }, [progress, telegramId, currentScene, updateProgress, goToScene])

  useEffect(() => {
    if (!progress) { navigate('/'); return }
    fetchScene(progress.current_scene || 'scene_001')
    return () => clearInterval(typingTimer.current)
  }, [])

  if (pageLoading) return <LoadingScreen progress={50} />

  const characters = currentScene?.characters || []
  const activeSpeaker = currentScene?.speaker

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      onClick={handleSceneTap}>
      <style>{`
        @keyframes bgFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes sceneIn { from{opacity:0;transform:scale(1.02)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {/* Фон */}
      <div key={`bg-${transitionKey}`} style={{ animation: 'bgFadeIn 0.6s ease' }}>
        <Background backgroundKey={currentScene?.background} />
      </div>

      {/* Персонажи */}
      <div key={`chars-${transitionKey}`} style={{ animation: 'sceneIn 0.5s ease' }}>
        {characters.map((char) => (
          <CharacterSprite key={char.id} character={char}
            isActive={char.id === activeSpeaker || !activeSpeaker} />
        ))}
      </div>

      {/* Диалог или выборы */}
      {showChoices && currentScene?.choices?.length > 0 ? (
        <ChoicePanel choices={currentScene.choices} onChoose={handleChoice} />
      ) : (
        <DialogueBox
          speaker={currentScene?.speaker}
          text={currentScene?.dialogue}
          displayedText={displayedText}
          isTyping={isTyping}
          hasNextScene={!!(currentScene?.next_scene)}
          onSkip={skipTyping}
        />
      )}

      {/* Тосты отношений */}
      {relToasts.map((t, i) => (
        <div key={t.id} style={{ position: 'absolute', top: `${60 + i * 60}px`, right: 0, zIndex: 150 }}>
          <RelationshipToast character={t.char} delta={t.delta} />
        </div>
      ))}

      <SaveIndicator saveCount={saveCount} />

      {/* Кнопка меню */}
      <button onClick={(e) => { e.stopPropagation(); setMenuOpen(true) }} style={{
        position: 'absolute', top: '16px', left: '16px',
        background: 'rgba(10,10,20,0.75)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(201,168,76,0.35)', borderRadius: '10px',
        padding: '8px 14px', color: 'rgba(201,168,76,0.9)',
        fontSize: '18px', cursor: 'pointer', zIndex: 100,
        display: 'flex', alignItems: 'center', gap: '6px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        ☰
      </button>

      {/* Глава */}
      {progress?.chapter && (
        <div style={{
          position: 'absolute', top: '16px', right: '16px', zIndex: 100,
          background: 'rgba(10,10,20,0.6)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px',
          padding: '6px 12px',
          fontFamily: "'Lora', serif", fontSize: '11px',
          color: 'rgba(201,168,76,0.6)', letterSpacing: '1px',
        }}>
          Гл. {progress.chapter}
        </div>
      )}

      {/* Внутриигровое меню */}
      {menuOpen && (
        <InGameMenu
          onClose={() => setMenuOpen(false)}
          onMainMenu={() => navigate('/')}
        />
      )}
    </div>
  )
}
