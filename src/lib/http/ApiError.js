/**
 * Normalized error every service call throws. Components only ever deal with
 * this shape — never raw axios errors or raw backend JSON.
 */
export class ApiError extends Error {
  /**
   * @param {object} opts
   * @param {string} opts.message - User-safe message, never raw backend internals for 5xx.
   * @param {number|null} opts.status - HTTP status code, or null for network/timeout errors.
   * @param {Record<string,string[]>|null} opts.fieldErrors - Laravel-style 422 validation errors.
   * @param {'network'|'timeout'|'cancelled'|'http'|'parse'} opts.kind
   */
  constructor({ message, status = null, fieldErrors = null, kind = 'http' }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
    this.kind = kind
  }

  get isValidationError() {
    return this.status === 422 && !!this.fieldErrors
  }

  get isAuthError() {
    return this.status === 401
  }

  get isForbidden() {
    return this.status === 403
  }

  /** First field error message, useful for toast fallback when not rendering inline. */
  firstFieldError() {
    if (!this.fieldErrors) return null
    const firstKey = Object.keys(this.fieldErrors)[0]
    return firstKey ? this.fieldErrors[firstKey][0] : null
  }
}

const FRIENDLY_MESSAGES = {
  400: 'That request could not be processed.',
  401: 'Your session has expired. Please log in again.',
  403: "You don't have permission to do that.",
  404: 'We could not find what you were looking for.',
  409: 'This conflicts with the current state of that resource.',
  422: 'Please check the fields below.',
  429: "You're doing that too much — please wait a moment and try again.",
  500: 'Something went wrong on our end. Please try again shortly.',
  503: 'The service is temporarily unavailable. Please try again shortly.',
}

export function friendlyMessageFor(status) {
  return FRIENDLY_MESSAGES[status] || 'Something unexpected happened. Please try again.'
}
