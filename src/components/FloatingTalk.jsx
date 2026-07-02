import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function FloatingTalk() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const onScroll = () => setVisible(window.scrollY > 560)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  if (pathname === '/contact') return null

  return (
    <Link
      to="/contact"
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-ink text-paper border border-gold/60 pl-4 pr-5 py-3 font-mono text-[11px] uppercase tracking-widest2 hover:bg-navy-light transition-all duration-300 shadow-lg ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <MessageCircle size={15} className="text-gold-light" />
      Talk to a Strategist
    </Link>
  )
}
