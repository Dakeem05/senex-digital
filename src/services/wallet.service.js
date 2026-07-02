import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import { toFormData } from './auth.service.js'

export const walletService = {
  getBalance: () => apiClient.get(ENDPOINTS.wallet.balance).then(unwrap),

  /**
   * @param {{amount: number, gateway?: 'kora'|'paystack'}} params
   * @returns {Promise<{authorization_url: string, reference: string}>}
   */
  deposit: ({ amount, gateway }) =>
    apiClient.post(ENDPOINTS.wallet.deposit, toFormData({ amount, gateway })).then(unwrap),

  getTransactions: () => apiClient.get(ENDPOINTS.wallet.transactions).then(unwrap),
}
