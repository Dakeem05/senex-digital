import React from 'react'
import { Loader2 } from 'lucide-react'

export default function Spinner({ size = 18, className = '' }) {
  return <Loader2 size={size} className={`animate-spin text-gold ${className}`} strokeWidth={2} />
}

export function FullPageSpinner({ label = 'Loading' }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
      <Spinner size={26} />
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40">{label}</span>
    </div>
  )
}
