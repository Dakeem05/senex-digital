import React from 'react'
import { Link } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import OrderStatusBadge from '../../components/dashboard/OrderStatusBadge.jsx'
import { formatCurrency } from '../../utils/currency.js'
import { formatDate } from '../../utils/date.js'

export default function Orders() {
  const orders = useOrders()

  if (orders.isLoading) return <FullPageSpinner label="Loading orders" />
  if (orders.isError) return <ErrorState message={orders.error.message} onRetry={orders.refetch} />

  const list = orders.data?.data || []

  return (
    <div className="space-y-7">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">History</span>
        <h1 className="font-serif text-3xl text-ink mt-1.5">Orders</h1>
      </div>

      {list.length === 0 && (
        <EmptyState
          title="No orders yet"
          description="Orders you place will appear here."
          action={
            <Link
              to="/dashboard/discover"
              className="inline-flex font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-5 py-2.5 hover:bg-navy-light"
            >
              Browse products
            </Link>
          }
        />
      )}

      <div className="bg-white border border-line divide-y divide-line">
        {list.map((order) => (
          <Link
            key={order.id}
            to={`/dashboard/orders/${order.id}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-5 py-4 hover:bg-paper-dim/40 transition-colors"
          >
            <div className="min-w-0">
              <p className="text-ink text-[14px] truncate">{order.payment_reference}</p>
              <p className="text-ink/45 text-[12px] mt-0.5">
                {formatDate(order.created_at)} · {order.line_items?.length || 0} item
                {order.line_items?.length === 1 ? '' : 's'}
              </p>
              {order.order_notes && (
                <p className="text-ink/50 text-[12.5px] mt-1.5 truncate">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 mr-1.5">Note:</span>
                  {order.order_notes}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-mono text-[14px] text-ink">
                {formatCurrency(order.net_total_amount, order.currency)}
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
