import React from 'react'

const STYLES = {
  SUCCESSFUL: 'bg-green-50 text-green-700 border-green-200',
  FAILED: 'bg-red-50 text-red-700 border-red-200',
  PENDING: 'bg-paper-dim text-ink/60 border-line',
}

export default function TransactionStatusBadge({ status }) {
  const style = STYLES[status] || 'bg-paper-dim text-ink/50 border-line'
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-widest2 border px-2 py-1 ${style}`}
    >
      {status || 'UNKNOWN'}
    </span>
  )
}
