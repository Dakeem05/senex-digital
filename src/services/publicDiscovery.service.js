import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const publicDiscoveryService = {
  getProducts: () => apiClient.get(ENDPOINTS.publicDiscovery.products).then(unwrap),

  getCategories: () => apiClient.get(ENDPOINTS.publicDiscovery.categories).then(unwrap),

  getProductsByCategory: (categoryId) =>
    apiClient.get(ENDPOINTS.publicDiscovery.productsByCategory(categoryId)).then(unwrap),

  search: (query, { cursor } = {}) =>
    apiClient
      .get(ENDPOINTS.publicDiscovery.search, { params: { query, cursor } })
      .then(unwrap),

  getProductDetails: (productId) =>
    apiClient.get(ENDPOINTS.publicDiscovery.productDetails(productId)).then(unwrap),
}
