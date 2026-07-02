import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const settingsService = {
  show: () => apiClient.get(ENDPOINTS.settings.show).then(unwrap),
  updateCurrency: (currency) =>
    apiClient.put(ENDPOINTS.settings.updateCurrency, { currency }).then(unwrap),
}
