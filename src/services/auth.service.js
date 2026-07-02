import { apiClient, unwrap } from '../lib/http/apiClient.js'
import { ENDPOINTS } from '../constants/endpoints.js'

function toFormData(fields) {
  const fd = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    fd.append(key, value)
  })
  return fd
}

export const authService = {
  /** @returns {Promise<{success:boolean,message:string}>} success=false here just means "already registered", not an HTTP error */
  checkEmail: (email) =>
    apiClient.post(ENDPOINTS.auth.checkEmail, toFormData({ email })).then((r) => r.data),

  register: ({ name, username, email, password, password_confirmation }) =>
    apiClient
      .post(
        ENDPOINTS.auth.register,
        toFormData({ name, username, email, password, password_confirmation })
      )
      .then(unwrap),

  resendRegisterOtp: (email) =>
    apiClient.post(ENDPOINTS.auth.resendRegisterOtp, toFormData({ email })).then(unwrap),

  verifyRegisterOtp: ({ email, verification_code }) =>
    apiClient
      .post(ENDPOINTS.auth.verifyRegisterOtp, toFormData({ email, verification_code }))
      .then(unwrap),

  /** `username` accepts either email or username per the API's own field description. */
  login: ({ username, password }) =>
    apiClient.post(ENDPOINTS.auth.login, toFormData({ username, password })).then(unwrap),

  sendForgotPasswordOtp: (email) =>
    apiClient.post(ENDPOINTS.auth.sendForgotPasswordOtp, toFormData({ email })).then(unwrap),

  verifyOtp: ({ email, verification_code }) =>
    apiClient.post(ENDPOINTS.auth.verifyOtp, toFormData({ email, verification_code })).then(unwrap),

  resetPassword: ({ email, password, password_confirmation }) =>
    apiClient
      .post(ENDPOINTS.auth.resetPassword, toFormData({ email, password, password_confirmation }))
      .then(unwrap),
}

export { toFormData }
