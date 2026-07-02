import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const notificationsService = {
  list: () => apiClient.get(ENDPOINTS.notifications.index).then(unwrap),
  unreadCount: () => apiClient.get(ENDPOINTS.notifications.unreadCount).then(unwrap),
  show: (id) => apiClient.get(ENDPOINTS.notifications.show(id)).then(unwrap),
  markRead: (id) => apiClient.post(ENDPOINTS.notifications.markRead(id)).then(unwrap),
  markAllRead: () => apiClient.post(ENDPOINTS.notifications.markAllRead).then(unwrap),
  destroy: (id) => apiClient.delete(ENDPOINTS.notifications.destroy(id)).then(unwrap),
  destroyAll: () => apiClient.delete(ENDPOINTS.notifications.destroyAll).then(unwrap),
}
