import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import FadeIn from '../components/animations/FadeIn.jsx'

export default function AuthLayout({ eyebrow, title, sub, children, footer }) {
  return (
    <div className="min-h-screen bg-navy dot-grid flex flex-col">
      <div className="max-w-site mx-auto w-full px-6 lg:px-10 pt-10">
        <Link to="/" aria-label="Senex Digital home">
          <Logo dark />
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <FadeIn direction="up" className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-5">
            <span className="font-mono text-[11px] text-gold-light border border-gold-light/40 px-1.5 py-0.5">
              ACCOUNT
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-light">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-paper leading-[1.1]">{title}</h1>
          {sub && <p className="mt-3 text-paper/55 text-[15px] leading-relaxed">{sub}</p>}

          <div className="mt-8 bg-paper border border-paper/10 p-7 sm:p-8">{children}</div>

          {footer && <div className="mt-6 text-center">{footer}</div>}
        </FadeIn>
      </div>
    </div>
  )
}
