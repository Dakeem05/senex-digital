import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import Logo from './Logo.jsx'
import Button from './Button.jsx'
import { nav } from '../data/content.js'
import { useAuthStore } from '../store/authStore.js'
import { useGuestCartStore } from '../store/guestCartStore.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAuthenticated = useAuthStore((s) => !!s.token)
  const guestCount = useGuestCartStore((s) => s.count())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/95 backdrop-blur-sm border-b transition-colors ${
        scrolled ? 'border-line' : 'border-transparent'
      }`}
    >
      <nav className="max-w-site mx-auto px-6 lg:px-10 h-[78px] flex items-center justify-between">
        <Link to="/" aria-label="Senex Digital home">
          <Logo />
        </Link>

        <ul className="hidden lg:flex items-center gap-9">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `relative font-mono text-[12px] uppercase tracking-widest2 pb-1 transition-colors ${
                    isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute -bottom-[3px] left-0 h-[2px] bg-gold transition-all ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {!isAuthenticated && guestCount > 0 && (
            <Link to="/discover" aria-label="Cart" className="relative p-1.5 text-ink/70 hover:text-ink">
              <ShoppingCart size={19} strokeWidth={1.75} />
              <span className="absolute -top-1 -right-1 bg-gold text-paper text-[10px] font-mono leading-none rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {guestCount > 9 ? '9+' : guestCount}
              </span>
            </Link>
          )}
          <Button to={isAuthenticated ? '/dashboard' : '/login'} variant="dark">
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </Button>
        </div>

        <button
          className="lg:hidden p-2 -mr-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-line bg-paper px-6 py-6">
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-mono text-[13px] uppercase tracking-widest2 ${
                      isActive ? 'text-gold' : 'text-ink'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button
              to={isAuthenticated ? '/dashboard' : '/login'}
              variant="dark"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {isAuthenticated ? 'Dashboard' : 'Login'}
              {!isAuthenticated && guestCount > 0 ? ` (${guestCount} in cart)` : ''}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
