import { create } from 'zustand'

export const useGameStore = create((set) => ({
  currentScene: null,
  isLoading: false,
  isTyping: false,  // анимация печати текста
  displayedText: '', // текст который сейчас показывается (для эффекта печати)

  setCurrentScene: (scene) => set({ currentScene: scene }),
  setLoading: (v) => set({ isLoading: v }),
  setTyping: (v) => set({ isTyping: v }),
  setDisplayedText: (text) => set({ displayedText: text }),
}))
