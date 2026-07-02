import React from 'react'
import Button from './Button.jsx'

export default function CTABanner({
  heading = 'Ready to build something that lasts past the next algorithm update?',
  sub = "Tell us where growth has stalled. We'll tell you, honestly, whether we're the right team to fix it.",
}) {
  return (
    <section className="bg-ink dot-grid">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-20 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl text-paper max-w-2xl mx-auto text-balance leading-tight">
          {heading}
        </h2>
        <p className="mt-4 text-paper/55 max-w-lg mx-auto">{sub}</p>
        <div className="mt-8 flex items-center justify-center">
          <Button to="/contact" variant="primary">
            Book a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  )
}
