import { create } from 'zustand'
import { loadOrCreateProgress } from '../services/progressService'

export const usePlayerStore = create((set) => ({
  telegramId: null,
  loading: true,
  progress: null, // { current_scene, chapter, relationships, flags }

  setTelegramId: (id) => set({ telegramId: id }),

  loadProgress: async (telegramId) => {
    set({ loading: true })
    const progress = await loadOrCreateProgress(telegramId)
    set({ progress, loading: false })
  },

  updateProgress: (updates) =>
    set((state) => ({
      progress: { ...state.progress, ...updates },
    })),
}))
