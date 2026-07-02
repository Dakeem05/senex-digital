import { QueryClient } from '@tanstack/react-query'
import { ApiError } from './http/ApiError.js'

function shouldRetry(failureCount, error) {
  if (failureCount >= 2) return false
  if (error instanceof ApiError) {
    // Never retry validation/auth/permission/not-found errors — retrying won't fix a 422.
    if ([400, 401, 403, 404, 409, 422].includes(error.status)) return false
  }
  return true
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
    mutations: {
      retry: false,
    },
  },
})

export const queryKeys = {
  account: ['account'],
  wallet: {
    balance: ['wallet', 'balance'],
    transactions: ['wallet', 'transactions'],
  },
  discovery: {
    products: ['discovery', 'products'],
    categories: ['discovery', 'categories'],
    byCategory: (id) => ['discovery', 'category', id],
    search: (query) => ['discovery', 'search', query],
    product: (id) => ['discovery', 'product', id],
  },
  reviews: (reviewableId) => ['reviews', reviewableId],
  cart: ['cart'],
  orders: {
    list: ['orders'],
    detail: (id) => ['orders', id],
  },
  notifications: {
    list: ['notifications'],
    unreadCount: ['notifications', 'unread-count'],
  },
  blog: {
    categories: ['blog', 'categories'],
    list: ['blog', 'list'],
    detail: (id) => ['blog', id],
  },
}
