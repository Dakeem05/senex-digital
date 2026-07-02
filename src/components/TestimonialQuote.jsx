import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function TestimonialQuote({ testimonials }) {
  const [i, setI] = useState(0)
  const t = testimonials[i]

  const go = (dir) => setI((prev) => (prev + dir + testimonials.length) % testimonials.length)

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      <Quote className="mx-auto text-gold/40" size={32} strokeWidth={1.5} />
      <p className="mt-6 font-serif italic text-2xl sm:text-3xl text-paper leading-snug text-balance">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-7 font-mono text-[12px] uppercase tracking-widest2 text-gold-light">
        {t.name}
      </div>
      <div className="text-paper/45 text-[13px] mt-1">{t.role}</div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="h-9 w-9 flex items-center justify-center border border-paper/20 text-paper/60 hover:border-gold hover:text-gold transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex items-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-1.5 transition-all ${
                idx === i ? 'w-6 bg-gold' : 'w-1.5 bg-paper/25'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="h-9 w-9 flex items-center justify-center border border-paper/20 text-paper/60 hover:border-gold hover:text-gold transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
