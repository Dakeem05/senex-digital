import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const ordersService = {
  list: () => apiClient.get(ENDPOINTS.orders.index).then(unwrap),
  show: (orderId) => apiClient.get(ENDPOINTS.orders.show(orderId)).then(unwrap),
}
