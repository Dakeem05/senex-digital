import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const blogService = {
  getCategories: () => apiClient.get(ENDPOINTS.blog.categories).then(unwrap),
  list: () => apiClient.get(ENDPOINTS.blog.index).then(unwrap),
  show: (id) => apiClient.get(ENDPOINTS.blog.show(id)).then(unwrap),
}
