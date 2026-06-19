import { usePlayerStore } from '../store/playerStore'

export function useTelegram() {
  const { setTelegramId } = usePlayerStore()

  const initTelegram = () => {
    try {
      const tg = window.Telegram?.WebApp
      if (tg) {
        tg.ready()
        tg.expand()
        tg.setHeaderColor('#0a0a14')
        tg.setBackgroundColor('#0a0a14')

        const user = tg.initDataUnsafe?.user
        if (user?.id) {
          setTelegramId(user.id)
        } else {
          // DEV fallback: используем случайный id для локальной разработки
          console.warn('[DEV] No Telegram user — using dev fallback id')
          setTelegramId(999999999)
        }
      } else {
        // Запуск вне Telegram (браузер)
        console.warn('[DEV] Telegram WebApp not found — using dev fallback id')
        setTelegramId(999999999)
      }
    } catch (e) {
      console.error('Telegram init error:', e)
      setTelegramId(999999999)
    }
  }

  const telegramId = usePlayerStore((s) => s.telegramId)

  return { telegramId, initTelegram }
}
