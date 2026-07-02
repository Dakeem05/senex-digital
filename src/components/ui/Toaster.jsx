import React from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useToastStore } from '../../store/toastStore.js'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const ACCENTS = {
  success: 'border-gold text-gold-dim',
  error: 'border-red-700/60 text-red-700',
  info: 'border-line text-ink/70',
}

export default function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  const dismiss = useToastStore((s) => s.dismiss)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2.5 w-[min(380px,calc(100vw-2.5rem))]">
      {toasts.map((t) => {
        const Icon = ICONS[t.variant] || Info
        return (
          <div
            key={t.id}
            role="status"
            className={`bg-ink text-paper border-l-2 ${ACCENTS[t.variant]} shadow-lg flex items-start gap-3 px-4 py-3.5`}
          >
            <Icon size={18} className="shrink-0 mt-0.5" strokeWidth={1.75} />
            <p className="text-[13.5px] leading-snug flex-1">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="text-paper/40 hover:text-paper shrink-0"
            >
              <X size={15} />
            </button>
          </div>
        )
      })}
    </div>
  )
}
