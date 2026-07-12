import React from 'react'
import { ArrowRight } from 'lucide-react'
import BracketFrame from './BracketFrame.jsx'

export default function CaseStudyCard({ study }) {
  return (
    <article className="border border-line bg-white/40 flex flex-col h-full">
      <BracketFrame src={study.image} alt={study.name} className="h-48 w-full overflow-hidden" />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-ink">{study.name}</h3>
          <span className="font-mono text-[10px] uppercase tracking-wide text-teal border border-teal/30 px-2 py-1 whitespace-nowrap">
            {study.category}
          </span>
        </div>
        <p className="mt-3 text-[14px] text-ink/60 leading-relaxed flex-1">{study.summary}</p>

        <div className="grid grid-cols-3 mt-6 border-t border-line pt-5">
          {study.stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-lg text-gold-dim">{s.value}</div>
              <div className="text-[11px] text-ink/45 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
