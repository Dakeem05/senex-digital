import React from 'react'

export default function Logo({ dark = false }) {
  return (
    <span className="inline-flex items-center group">
      <span className="relative flex h-16 w-16 -ml-6">
        <img src="/logo.png" alt="" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[17px] tracking-tight ${dark ? 'text-paper' : 'text-ink'}`}
        >
          Senex Digital
        </span>
        <span className="font-mono text-[9px] uppercase tracking-widest2 text-gold-dim mt-0.5">
          Your digital growth partner
        </span>
      </span>
    </span>
  )
}
