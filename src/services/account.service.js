import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import { toFormData } from './auth.service.js'

export const accountService = {
  getProfile: () => apiClient.get(ENDPOINTS.account.profile).then(unwrap),

  /**
   * The API documents this update as query-string params on the URL with an
   * empty body (see Postman: `PUT /user/account/update?name=...`), so we
   * mirror that exactly rather than guessing a JSON/form-data body shape
   * that was never demonstrated.
   */
  updateProfile: (fields) =>
    apiClient.put(ENDPOINTS.account.update, null, { params: fields }).then(unwrap),

  updateAvatar: (file) =>
    apiClient
      .post(ENDPOINTS.account.updateAvatar, toFormData({ avatar: file }), {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(unwrap),

  deleteAccount: () => apiClient.delete(ENDPOINTS.account.profile).then(unwrap),

  logout: () => apiClient.post(ENDPOINTS.account.logout).then(unwrap),
}
