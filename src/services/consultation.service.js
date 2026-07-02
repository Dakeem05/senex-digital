import { apiClient } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

export const consultationService = {
  /** @param {{name:string,email:string,company?:string,phone?:string,service?:string,message:string}} payload */
  submit: (payload) => apiClient.post(ENDPOINTS.consultations, payload).then((r) => r.data),
}
