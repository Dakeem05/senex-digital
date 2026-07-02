import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function ServiceRow({ service, expanded = false }) {
  return (
    <div className="group border-b border-line py-10 first:pt-0">
      <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-10">
        <span className="font-mono text-sm text-gold shrink-0 w-10">{service.id}</span>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-serif text-2xl sm:text-[28px] text-ink leading-tight">
              {service.name}
            </h3>
            <ArrowUpRight
              className="hidden sm:block text-ink/30 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-2"
              size={20}
            />
          </div>
          <p className="mt-3 text-ink/65 leading-relaxed max-w-2xl">{service.short}</p>

          {expanded && (
            <>
              <p className="mt-4 text-ink/65 leading-relaxed max-w-2xl">{service.description}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 max-w-2xl">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[14px] text-ink/75">
                    <span className="text-gold mt-1.5 font-mono text-[10px]">&#9656;</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="flex flex-wrap gap-2 mt-6">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-wide text-teal border border-teal/30 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
