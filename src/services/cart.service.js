import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'
import { toFormData } from './auth.service.js'

export const cartService = {
  get: () => apiClient.get(ENDPOINTS.cart.get).then(unwrap).catch(err => {
    console.log("Cart error", err)
    throw err
  }),

  /** Documented as query params (`?product_id=...&quantity=...`), no body. */
  addItem: ({ product_id, quantity = 1 }) =>
    apiClient.post(ENDPOINTS.cart.add, null, { params: { product_id, quantity } }).then(unwrap),

  updateItem: (itemId, { quantity }) =>
    apiClient
      .put(ENDPOINTS.cart.updateItem(itemId), null, { params: { quantity } })
      .then(unwrap),

  deleteItem: (itemId) => apiClient.delete(ENDPOINTS.cart.deleteItem(itemId)).then(unwrap),

  clear: () => apiClient.delete(ENDPOINTS.cart.clear).then(unwrap),

  /**
   * @param {{wallet_usage: boolean}} params - whether to pay (in full or partially) from wallet balance
   * @returns {Promise<{payment_reference:string, amount:number, gross_total:number, coupon_discount:number, net_total:number, authorization_url?:string}>}
   *   `authorization_url` is only present when the remaining balance is routed to a payment gateway.
   */
  checkout: ({ wallet_usage }) =>
    apiClient
      .post(ENDPOINTS.cart.checkout, toFormData({ wallet_usage: wallet_usage ? 1 : 0 }))
      .then(unwrap),

  validateCoupon: (couponCode) =>
    apiClient
      .put(ENDPOINTS.cart.couponValidate, null, { params: { coupon_code: couponCode } })
      .then(unwrap),

  applyCoupon: (couponCode) =>
    apiClient
      .put(ENDPOINTS.cart.couponApply, null, { params: { coupon_code: couponCode } })
      .then(unwrap),

  removeCoupon: () => apiClient.delete(ENDPOINTS.cart.couponRemove).then(unwrap),
}
