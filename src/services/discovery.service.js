import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const discoveryService = {
  getProducts: () => apiClient.get(ENDPOINTS.discovery.products).then(unwrap),

  getCategories: () => apiClient.get(ENDPOINTS.discovery.categories).then(unwrap),

  getProductsByCategory: (categoryId) =>
    apiClient.get(ENDPOINTS.discovery.productsByCategory(categoryId)).then(unwrap),

  /** Cursor-paginated per the API response (`next_cursor`/`prev_cursor`/`has_more`). */
  search: (query, { cursor } = {}) =>
    apiClient
      .get(ENDPOINTS.discovery.search, { params: { query, cursor } })
      .then(unwrap),

  getProductDetails: (productId) =>
    apiClient.get(ENDPOINTS.discovery.productDetails(productId)).then(unwrap),
}
