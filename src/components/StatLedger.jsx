import React from 'react'

export default function StatLedger({ stats, dark = false }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-4 border ${
        dark ? 'border-paper/15' : 'border-line'
      }`}
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`px-5 py-6 sm:px-7 ${
            i !== 0 ? (dark ? 'border-l border-paper/15' : 'border-l border-line') : ''
          } ${i >= 2 ? (dark ? 'border-t border-paper/15 sm:border-t-0' : 'border-t border-line sm:border-t-0') : ''}`}
        >
          <div className={`font-mono text-3xl sm:text-4xl ${dark ? 'text-gold-light' : 'text-gold-dim'}`}>
            {stat.value}
          </div>
          <div className={`mt-2 text-[13px] leading-snug ${dark ? 'text-paper/55' : 'text-ink/55'}`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
