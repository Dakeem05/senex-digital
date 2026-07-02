import React from 'react'
import FadeIn from './animations/FadeIn.jsx'

export default function PageHeader({ tag, title, sub }) {
  return (
    <section className="bg-navy dot-grid border-b border-paper/10">
      <FadeIn direction="up" className="max-w-site mx-auto px-6 lg:px-10 pt-20 pb-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-[11px] text-gold-light border border-gold-light/40 px-1.5 py-0.5">
            FILE
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-light">
            {tag}
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl text-paper max-w-3xl leading-[1.1] text-balance">
          {title}
        </h1>
        {sub && <p className="mt-5 text-paper/55 max-w-xl text-[16px] leading-relaxed">{sub}</p>}
      </FadeIn>
    </section>
  )
}
