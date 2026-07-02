export function formatDate(value, opts = {}) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-NG', {
    dateStyle: 'medium',
    timeStyle: opts.withTime ? 'short' : undefined,
  }).format(date)
}

export function timeAgo(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [unit, secondsInUnit] of units) {
    const count = Math.floor(seconds / secondsInUnit)
    if (count >= 1) return `${count} ${unit}${count > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
