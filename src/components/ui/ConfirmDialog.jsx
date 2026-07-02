import React, { useEffect, useRef } from 'react'

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null)

  useEffect(() => {
    if (open) confirmRef.current?.focus()
  }, [open])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onCancel()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 px-6"
      onClick={onCancel}
    >
      <div
        className="bg-paper border border-line max-w-sm w-full p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="font-serif text-xl text-ink">
          {title}
        </h2>
        {description && <p className="text-ink/60 text-[14px] mt-2.5 leading-relaxed">{description}</p>}
        <div className="flex gap-3 mt-7">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 font-mono text-[11px] uppercase tracking-widest2 border border-line text-ink px-4 py-3 hover:bg-paper-dim transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 font-mono text-[11px] uppercase tracking-widest2 px-4 py-3 text-paper transition-colors disabled:opacity-50 ${
              danger ? 'bg-red-700 hover:bg-red-800' : 'bg-ink hover:bg-navy-light'
            }`}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
