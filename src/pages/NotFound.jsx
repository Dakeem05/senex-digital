import React from 'react'
import Button from '../components/Button.jsx'

export default function NotFound() {
  return (
    <section className="bg-paper dot-grid-paper min-h-[60vh] flex items-center">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-24 text-center w-full">
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim border border-gold/40 px-2 py-1">
          File Not Found
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl text-ink mt-6">404</h1>
        <p className="mt-4 text-ink/60 max-w-md mx-auto leading-relaxed">
          This case file doesn&rsquo;t exist, or it&rsquo;s been archived. Let&rsquo;s get
          you back to something real.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <Button to="/" variant="dark">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )
}
