import { create } from 'zustand'

let nextId = 1

export const useToastStore = create((set) => ({
  toasts: [],
  push: (toast) =>
    set((state) => {
      const id = nextId++
      const entry = { id, variant: 'success', duration: 4500, ...toast }
      setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
      }, entry.duration)
      return { toasts: [...state.toasts, entry] }
    }),
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export const toast = {
  success: (message) => useToastStore.getState().push({ message, variant: 'success' }),
  error: (message) => useToastStore.getState().push({ message, variant: 'error' }),
  info: (message) => useToastStore.getState().push({ message, variant: 'info' }),
}
