import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// NOTE on token storage: the Senex API issues a single long-lived Sanctum
// bearer token (no refresh-token endpoint exists in the collection — see
// /auth/login response, just `token`). There's no cookie-session support
// either, so the realistic choices for an SPA are localStorage or sessionStorage.
// We use localStorage so a session survives a tab close, same as most
// consumer apps. The XSS risk this carries is mitigated elsewhere (strict
// input sanitization, no dangerouslySetInnerHTML, CSP via hosting config) —
// not by where the token sits. If the backend later adds refresh tokens or
// httpOnly cookie sessions, this store is the only place that needs to change.

const STORAGE_KEY = 'senex_auth'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      // 'user' | 'admin' — drives which API namespace requests hit and which routes are reachable
      role: null,

      isAuthenticated: () => !!get().token,

      setSession: (user, token, role = 'user') => set({ user, token, role }),

      updateUser: (patch) => set((state) => ({ user: { ...state.user, ...patch } })),

      clearSession: () => set({ user: null, token: null, role: null }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token, role: state.role }),
    }
  )
)

// Plain (non-hook) accessors for use outside React components, e.g. inside the axios interceptor.
export const getAuthToken = () => useAuthStore.getState().token
export const getAuthRole = () => useAuthStore.getState().role
export const clearAuthSession = () => useAuthStore.getState().clearSession()
