import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  return (
    <article className="border border-line bg-white/40 flex flex-col h-full p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-serif text-xl text-ink">{service.name}</h3>
        <span className="font-mono text-sm text-gold shrink-0">{service.id}</span>
      </div>
      <p className="mt-3 text-[14px] text-ink/60 leading-relaxed flex-1">{service.short}</p>

      <div className="flex flex-wrap gap-2 mt-6 border-t border-line pt-5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] uppercase tracking-wide text-teal border border-teal/30 px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        to="/services"
        className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest2 text-ink hover:text-gold transition-colors"
      >
        View Service <ArrowRight size={13} />
      </Link>
    </article>
  )
}
