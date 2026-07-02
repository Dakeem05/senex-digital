import React from 'react'
import { Link } from 'react-router-dom'
import { Wallet as WalletIcon, Package, Bell, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { useWalletBalance } from '../../hooks/useWallet.js'
import { useOrders } from '../../hooks/useOrders.js'
import { useUnreadCount } from '../../hooks/useNotifications.js'
import Spinner from '../../components/ui/Spinner.jsx'
import { ErrorState } from '../../components/ui/States.jsx'
import { formatCurrency } from '../../utils/currency.js'
import { formatDate } from '../../utils/date.js'
import OrderStatusBadge from '../../components/dashboard/OrderStatusBadge.jsx'

export default function DashboardOverview() {
  const wallet = useWalletBalance()
  const orders = useOrders()
  const unread = useUnreadCount()

  const recentOrders = (orders.data?.data || []).slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Overview</span>
        <h1 className="font-serif text-3xl text-ink mt-1.5">Your dashboard</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SummaryCard
          icon={WalletIcon}
          label="Wallet Balance"
          value={wallet.isLoading ? '—' : formatCurrency(wallet.data?.balance ?? 0, wallet.data?.currency)}
          to="/dashboard/wallet"
        />
        <SummaryCard
          icon={Package}
          label="Total Orders"
          value={orders.isLoading ? '—' : (orders.data?.data?.length ?? 0)}
          to="/dashboard/orders"
        />
        <SummaryCard
          icon={Bell}
          label="Unread Notifications"
          value={unread.isLoading ? '—' : (unread.data?.unread ?? 0)}
          to="/dashboard/notifications"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line">
          <div className="flex items-center justify-between px-6 py-4 border-b border-line">
            <h2 className="font-serif text-lg text-ink">Recent Orders</h2>
            <Link
              to="/dashboard/orders"
              className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim hover:text-ink"
            >
              View all
            </Link>
          </div>

          {orders.isLoading && (
            <div className="py-12 flex justify-center">
              <Spinner />
            </div>
          )}
          {orders.isError && <div className="p-6"><ErrorState message={orders.error.message} onRetry={orders.refetch} /></div>}
          {orders.isSuccess && recentOrders.length === 0 && (
            <div className="px-6 py-10 text-center text-ink/50 text-[14px]">
              No orders yet.{' '}
              <Link to="/dashboard/discover" className="text-gold-dim hover:underline">
                Start browsing
              </Link>
            </div>
          )}
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              to={`/dashboard/orders/${order.id}`}
              className="flex items-center justify-between px-6 py-4 border-b border-line last:border-b-0 hover:bg-paper-dim/40 transition-colors"
            >
              <div>
                <p className="text-ink text-[14px]">{order.payment_reference}</p>
                <p className="text-ink/45 text-[12px] mt-0.5">{formatDate(order.created_at)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[13px] text-ink">
                  {formatCurrency(order.net_total_amount, order.currency)}
                </span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-navy p-6 flex flex-col gap-4">
          <h2 className="font-serif text-lg text-paper">Quick Actions</h2>
          <Link
            to="/dashboard/discover"
            className="flex items-center justify-between border border-paper/15 px-4 py-3 text-paper hover:border-gold-light transition-colors"
          >
            <span className="flex items-center gap-2.5 text-[13px]">
              <ShoppingBag size={16} /> Browse products
            </span>
            <ArrowUpRight size={15} />
          </Link>
          <Link
            to="/dashboard/wallet"
            className="flex items-center justify-between border border-paper/15 px-4 py-3 text-paper hover:border-gold-light transition-colors"
          >
            <span className="flex items-center gap-2.5 text-[13px]">
              <WalletIcon size={16} /> Fund wallet
            </span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ icon: Icon, label, value, to }) {
  return (
    <Link to={to} className="bg-white border border-line p-5 hover:border-gold transition-colors group">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-ink/45">{label}</span>
        <Icon size={16} className="text-ink/25 group-hover:text-gold transition-colors" strokeWidth={1.75} />
      </div>
      <p className="font-serif text-2xl text-ink mt-3">{value}</p>
    </Link>
  )
}
