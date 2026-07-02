import React, { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  LayoutGrid,
  ShoppingBag,
  Wallet as WalletIcon,
  Package,
  ShoppingCart,
  Bell,
  UserCircle,
  Menu,
  X,
  LogOut,
} from 'lucide-react'
import Logo from '../components/Logo.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { useWalletBalance } from '../hooks/useWallet.js'
import { useUnreadCount } from '../hooks/useNotifications.js'
import { useCart } from '../hooks/useCart.js'
import { formatCurrency } from '../utils/currency.js'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/dashboard/discover', label: 'Discover', icon: ShoppingBag },
  { to: '/dashboard/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/dashboard/orders', label: 'Orders', icon: Package },
  { to: '/dashboard/wallet', label: 'Wallet', icon: WalletIcon },
  { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
  { to: '/dashboard/profile', label: 'Profile', icon: UserCircle },
]

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout, isLoggingOut } = useAuth()
  const { data: wallet } = useWalletBalance()
  const { data: unread } = useUnreadCount()
  const { data: cart } = useCart()

  const cartCount = cart?.items?.length || 0

  return (
    <div className="min-h-screen bg-paper-dim/30 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[248px] shrink-0 bg-navy flex-col">
        <div className="h-[78px] flex items-center px-6 border-b border-navy-line">
          <Link to="/dashboard">
            <Logo dark />
          </Link>
        </div>
        <SidebarNav onNavigate={() => {}} />
        <div className="mt-auto p-5 border-t border-navy-line">
          <button
            onClick={() => logout()}
            disabled={isLoggingOut}
            className="w-full inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest2 text-paper/55 hover:text-paper transition-colors disabled:opacity-50"
          >
            <LogOut size={15} />
            {isLoggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-ink/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[260px] bg-navy flex flex-col">
            <div className="h-[78px] flex items-center justify-between px-5 border-b border-navy-line">
              <Logo dark />
              <button onClick={() => setMobileOpen(false)} className="text-paper p-1" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <SidebarNav onNavigate={() => setMobileOpen(false)} />
            <div className="mt-auto p-5 border-t border-navy-line">
              <button
                onClick={() => logout()}
                className="w-full inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest2 text-paper/55"
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="h-[78px] bg-paper border-b border-line flex items-center justify-between px-5 lg:px-8 sticky top-0 z-30">
          <button
            className="lg:hidden p-2 -ml-2 text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block font-mono text-[11px] uppercase tracking-widest2 text-ink/40">
            {user?.name ? `Welcome back, ${user.name.split(' ')[0]}` : 'Dashboard'}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/dashboard/wallet"
              className="hidden sm:flex items-center gap-2 border border-line bg-white px-3.5 py-2 font-mono text-[12px] text-ink hover:border-gold transition-colors"
            >
              <WalletIcon size={14} className="text-gold-dim" />
              {formatCurrency(wallet?.balance ?? 0, wallet?.currency)}
            </Link>

            <IconLink to="/dashboard/cart" icon={ShoppingCart} badge={cartCount} label="Cart" />
            <IconLink to="/dashboard/notifications" icon={Bell} badge={unread?.unread} label="Notifications" />

            <Link to="/dashboard/profile" aria-label="Profile" className="ml-1">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover border border-line"
                />
              ) : (
                <span className="h-9 w-9 rounded-full bg-navy text-paper flex items-center justify-center font-serif text-sm">
                  {user?.name?.[0]?.toUpperCase() || '?'}
                </span>
              )}
            </Link>
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-8 py-7 max-w-[1280px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarNav({ onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-6 space-y-1">
      {NAV.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3.5 py-2.5 font-mono text-[12px] uppercase tracking-wide transition-colors ${
              isActive ? 'bg-gold text-paper' : 'text-paper/60 hover:text-paper hover:bg-navy-light'
            }`
          }
        >
          <Icon size={16} strokeWidth={1.75} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

function IconLink({ to, icon: Icon, badge, label }) {
  return (
    <Link to={to} aria-label={label} className="relative p-2 text-ink/70 hover:text-ink transition-colors">
      <Icon size={19} strokeWidth={1.75} />
      {!!badge && (
        <span className="absolute -top-0.5 -right-0.5 bg-gold text-paper text-[10px] font-mono leading-none rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  )
}
