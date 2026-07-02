import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import { toFormData } from './auth.service.js'

export const reviewsService = {
  /** @param {string} reviewableId - product id (or other reviewable entity id) */
  list: (reviewableId) => apiClient.get(ENDPOINTS.reviews.index(reviewableId)).then(unwrap),

  create: ({ reviewable_id, rating, comment }) =>
    apiClient
      .post(ENDPOINTS.reviews.create, toFormData({ reviewable_id, rating, comment }))
      .then(unwrap),
}
