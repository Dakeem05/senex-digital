import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// A guest's cart lives only in this browser until they log in. On login we
// walk this list and call the real cart API for each line (see
// mergeGuestCartIntoAccount in hooks/useGuestCart.js), then clear it -
// nothing here is ever treated as a source of truth once a session exists.
export const useGuestCartStore = create()(
  persist(
    (set, get) => ({
      items: [], // { product, quantity }

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((i) => i.product.id !== productId)
            : state.items.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
        })),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'senex_guest_cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
