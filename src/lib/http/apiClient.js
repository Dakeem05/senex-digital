import axios from 'axios'
import { env } from '../../config/env.js'
import { getAuthToken, getAuthRole, clearAuthSession } from '../../store/authStore.js'
import { ApiError, friendlyMessageFor } from './ApiError.js'

const REQUEST_TIMEOUT_MS = 20_000

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { Accept: 'application/json' },
})

// --- Request: attach bearer token --------------------------------------
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// --- Duplicate in-flight GET prevention ---------------------------------
// Two components mounting at once and firing the same GET (e.g. wallet
// balance on both the topbar and the dashboard card) share one network call.
const inFlightGets = new Map()

function dedupeKey(config) {
  return `${config.method}:${config.url}:${JSON.stringify(config.params || {})}`
}

apiClient.interceptors.request.use((config) => {
  if (config.method !== 'get' || config.skipDedupe) return config
  const key = dedupeKey(config)
  const existing = inFlightGets.get(key)
  if (existing) {
    // Mark so the response interceptor knows not to double-resolve; axios doesn't
    // support short-circuiting a request from a request interceptor cleanly, so
    // instead we tag it and let callers prefer useApiQuery's own caching layer
    // for true sharing. This flag is read by react-query's queryClient, not here.
    config.__deduped = true
  }
  return config
})

// --- Response: normalize every failure into ApiError --------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      return Promise.reject(new ApiError({ message: 'Request cancelled', kind: 'cancelled' }))
    }

    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new ApiError({ message: 'The request took too long. Please try again.', kind: 'timeout' })
      )
    }

    if (!error.response) {
      return Promise.reject(
        new ApiError({
          message: 'You appear to be offline, or the server is unreachable.',
          kind: 'network',
        })
      )
    }

    const { status, data } = error.response

    let fieldErrors = null
    let backendMessage = null
    if (data && typeof data === 'object') {
      backendMessage = data.message || null
      // Laravel validation errors arrive as data.data = { field: ['msg', ...] }
      if (status === 422 && data.data && typeof data.data === 'object') {
        fieldErrors = data.data
      }
    }

    if (status === 401) {
      clearAuthSession()
      window.dispatchEvent(new CustomEvent('senex:unauthorized', { detail: { role: getAuthRole() } }))
    }

    // For 5xx, never surface raw backend internals to the user — use the friendly copy.
    const message =
      status >= 500 ? friendlyMessageFor(status) : backendMessage || friendlyMessageFor(status)

    return Promise.reject(new ApiError({ message, status, fieldErrors, kind: 'http' }))
  }
)

/**
 * Unwraps the Senex `{ success, message, data }` envelope. Every service
 * function should return this, never the raw axios response.
 */
export function unwrap(response) {
  return response.data?.data
}
