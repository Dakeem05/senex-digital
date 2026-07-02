import React from 'react'

export default function Eyebrow({ children, dark = false, index }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      {index && (
        <span className="font-mono text-[11px] text-gold border border-gold/50 px-1.5 py-0.5">
          {index}
        </span>
      )}
      <span
        className={`font-mono text-[11px] uppercase tracking-widest2 ${
          dark ? 'text-gold-light' : 'text-gold-dim'
        }`}
      >
        {children}
      </span>
      <span className={`h-px flex-1 max-w-[64px] ${dark ? 'bg-paper/20' : 'bg-line'}`} />
    </div>
  )
}
