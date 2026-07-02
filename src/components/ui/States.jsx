import React from 'react'
import { Inbox, AlertTriangle, RefreshCw } from 'lucide-react'

export function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="border border-line border-dashed bg-paper-dim/40 px-8 py-14 text-center">
      <Icon className="mx-auto text-ink/25" size={30} strokeWidth={1.5} />
      <h3 className="font-serif text-xl text-ink mt-4">{title}</h3>
      {description && <p className="text-ink/55 mt-2 text-[14px] max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="border border-red-700/30 bg-red-50 px-8 py-12 text-center">
      <AlertTriangle className="mx-auto text-red-700/70" size={28} strokeWidth={1.5} />
      <p className="text-red-800 mt-3 text-[14px]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-red-700 hover:text-red-900"
        >
          <RefreshCw size={13} /> Try again
        </button>
      )}
    </div>
  )
}
