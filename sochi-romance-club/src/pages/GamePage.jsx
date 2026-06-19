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

const TYPING_SPEED = 30 // мс на символ

export default function GamePage() {
  const navigate = useNavigate()
  const { telegramId, progress, updateProgress } = usePlayerStore()
  const { currentScene, isTyping, displayedText, setCurrentScene, setTyping, setDisplayedText } = useGameStore()

  const [showChoices, setShowChoices] = useState(false)
  const [savedIndicator, setSavedIndicator] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  const typingTimer = useRef(null)
  const fullText = useRef('')

  // Загрузка сцены
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
    setPageLoading(false)
    startTyping(scene.dialogue)
  }, [])

  // Старт анимации печати
  const startTyping = (text) => {
    fullText.current = text
    setDisplayedText('')
    setTyping(true)
    setShowChoices(false)
    let i = 0
    clearInterval(typingTimer.current)
    typingTimer.current = setInterval(() => {
      i++
      setDisplayedText(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(typingTimer.current)
        setTyping(false)
        setShowChoices(true)
      }
    }, TYPING_SPEED)
  }

  // Пропустить анимацию
  const skipTyping = () => {
    if (isTyping) {
      clearInterval(typingTimer.current)
      setDisplayedText(fullText.current)
      setTyping(false)
      setShowChoices(true)
    }
  }

  // Нажатие на сцену (вне кнопок выбора)
  const handleSceneTap = () => {
    if (isTyping) {
      skipTyping()
      return
    }
    // Если нет выборов и есть next_scene — авто-переход
    if (currentScene && (!currentScene.choices || currentScene.choices.length === 0)) {
      if (currentScene.next_scene) {
        goToScene(currentScene.next_scene)
      }
    }
  }

  // Переход к сцене
  const goToScene = (sceneId) => {
    fetchScene(sceneId)
    updateProgress({ current_scene: sceneId })
  }

  // Обработка выбора
  const handleChoice = async (choice) => {
    if (!progress || !telegramId) return

    const newRelationships = applyEffects(progress.relationships, choice.effects || {})
    const newFlags = applyFlags(progress.flags, choice.set_flags || {})
    const newChapter = choice.chapter || progress.chapter

    const updatedProgress = {
      current_scene: choice.next_scene,
      chapter: newChapter,
      relationships: newRelationships,
      flags: newFlags,
    }

    updateProgress(updatedProgress)

    // Логируем выбор
    await logChoice(telegramId, {
      sceneId: currentScene.id,
      choiceText: choice.text,
      nextScene: choice.next_scene,
    })

    // Сохраняем прогресс
    await saveProgress(telegramId, updatedProgress)
    setSavedIndicator(v => !v) // триггер для SaveIndicator

    goToScene(choice.next_scene)
  }

  // Первичная загрузка
  useEffect(() => {
    if (!progress) {
      navigate('/')
      return
    }
    fetchScene(progress.current_scene || 'scene_001')
    return () => clearInterval(typingTimer.current)
  }, [])

  if (pageLoading) return <LoadingScreen />

  const characters = currentScene?.characters || []
  const activeSpeaker = currentScene?.speaker

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      onClick={handleSceneTap}
    >
      {/* Фон */}
      <Background backgroundKey={currentScene?.background} />

      {/* Персонажи */}
      {characters.map((char) => (
        <CharacterSprite
          key={char.id}
          character={char}
          isActive={char.id === activeSpeaker || !activeSpeaker}
        />
      ))}

      {/* Диалог или выборы */}
      {showChoices && currentScene?.choices?.length > 0 ? (
        <ChoicePanel
          choices={currentScene.choices}
          onChoose={handleChoice}
        />
      ) : (
        <DialogueBox
          speaker={currentScene?.speaker}
          text={currentScene?.dialogue}
          displayedText={displayedText}
          isTyping={isTyping}
          onSkip={skipTyping}
        />
      )}

      {/* Индикатор сохранения */}
      <SaveIndicator visible={savedIndicator} />

      {/* Кнопка меню */}
      <button
        onClick={(e) => { e.stopPropagation(); navigate('/') }}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(10,10,20,0.7)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '8px',
          padding: '6px 12px',
          color: 'rgba(201,168,76,0.8)',
          fontSize: '13px',
          fontFamily: "'Lora', serif",
          cursor: 'pointer',
          zIndex: 100,
        }}
      >
        ☰ Меню
      </button>
    </div>
  )
}
