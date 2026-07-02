import React from 'react'

// Every status here was observed directly in the collection's saved responses
// (order stats breakdown + update-status response). Unknown future statuses
// fall back to a neutral style rather than guessing a color/meaning for them.
const STYLES = {
  PENDING: 'bg-paper-dim text-ink/60 border-line',
  PAID: 'bg-gold/15 text-gold-dim border-gold/40',
  PROCESSING: 'bg-blue-50 text-blue-700 border-blue-200',
  COMPLETED: 'bg-green-50 text-green-700 border-green-200',
  DELIVERED: 'bg-green-50 text-green-700 border-green-200',
  CANCELLED: 'bg-red-50 text-red-700 border-red-200',
}

export default function OrderStatusBadge({ status }) {
  const style = STYLES[status] || 'bg-paper-dim text-ink/50 border-line'
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-widest2 border px-2 py-1 ${style}`}
    >
      {status || 'UNKNOWN'}
    </span>
  )
}
