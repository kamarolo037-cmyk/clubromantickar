import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTelegram } from './hooks/useTelegram'
import { usePlayerStore } from './store/playerStore'
import StartPage from './pages/StartPage'
import GamePage from './pages/GamePage'
import LoadingScreen from './components/UI/LoadingScreen'

export default function App() {
  const { telegramId, initTelegram } = useTelegram()
  const { loading, loadProgress } = usePlayerStore()

  useEffect(() => {
    initTelegram()
  }, [])

  useEffect(() => {
    if (telegramId) {
      loadProgress(telegramId)
    }
  }, [telegramId])

  if (loading) return <LoadingScreen />

  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
