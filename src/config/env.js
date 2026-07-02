// Centralized environment access. Never read import.meta.env directly elsewhere —
// that scatters config and makes it easy to typo a var name with no warning.
const required = (key, fallback) => {
  const value = import.meta.env[key] ?? fallback
  if (!value) {
    // Fail loudly in dev rather than silently calling the wrong host.
    // eslint-disable-next-line no-console
    console.error(`Missing required env var: ${key}. Check your .env file against .env.example.`)
  }
  return value
}

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL', 'https://senex-api.test/api/v1'),
  isDev: import.meta.env.DEV,
}
