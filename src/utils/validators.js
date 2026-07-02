const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value) {
  return EMAIL_RE.test(value.trim())
}

/**
 * Best-effort strength check so users don't waste a round trip on an obviously
 * weak password. The backend's own validation (surfaced via 422 field errors)
 * is always the actual source of truth — we never invented stricter client
 * rules than what the API demonstrably enforces.
 */
export function passwordIssues(value) {
  const issues = []
  if (value.length < 8) issues.push('At least 8 characters')
  if (!/[A-Z]/.test(value)) issues.push('One uppercase letter')
  if (!/[0-9]/.test(value)) issues.push('One number')
  return issues
}

export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0
}
