import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useOrderDetails } from '../../hooks/useOrders.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState } from '../../components/ui/States.jsx'
import OrderStatusBadge from '../../components/dashboard/OrderStatusBadge.jsx'
import { formatCurrency } from '../../utils/currency.js'
import { formatDate } from '../../utils/date.js'

export default function OrderDetail() {
  const { id } = useParams()
  const order = useOrderDetails(id)

  if (order.isLoading) return <FullPageSpinner label="Loading order" />
  if (order.isError) return <ErrorState message={order.error.message} onRetry={order.refetch} />

  const o = order.data

  return (
    <div className="space-y-7">
      <Link
        to="/dashboard/orders"
        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={14} /> Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">
            {o.payment_reference}
          </span>
          <h1 className="font-serif text-3xl text-ink mt-1.5">Order Details</h1>
        </div>
        <OrderStatusBadge status={o.status} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-line divide-y divide-line">
          {(o.line_items || []).map((item) => (
            <div key={item.id} className="flex gap-4 p-4">
              <div className="h-16 w-16 shrink-0 bg-paper-dim overflow-hidden">
                {item.product?.avatar?.[0] && (
                  <img src={item.product.avatar[0]} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-ink text-[14px]">{item.product?.name}</p>
                  <p className="text-ink/45 text-[12px] mt-0.5">Qty {item.quantity}</p>
                </div>
                <span className="font-mono text-[14px] text-ink">{formatCurrency(item.subtotal, item.currency)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-line p-6 space-y-3 h-fit">
          <h2 className="font-serif text-lg text-ink mb-2">Summary</h2>
          <SummaryRow label="Placed" value={formatDate(o.created_at, { withTime: true })} />
          {o.paid_at && <SummaryRow label="Paid" value={formatDate(o.paid_at, { withTime: true })} />}
          {o.completed_at && (
            <SummaryRow label="Completed" value={formatDate(o.completed_at, { withTime: true })} />
          )}
          <SummaryRow label="Gross Total" value={formatCurrency(o.gross_total_amount, o.currency)} />
          {o.coupon_discount > 0 && (
            <SummaryRow label={`Coupon (${o.coupon_code})`} value={`-${formatCurrency(o.coupon_discount, o.currency)}`} muted />
          )}
          <div className="border-t border-line pt-3 flex items-center justify-between">
            <span className="text-ink/60 text-[13.5px]">Net Total</span>
            <span className="font-mono text-[16px] text-ink">{formatCurrency(o.net_total_amount, o.currency)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between text-[13.5px]">
      <span className={muted ? 'text-ink/40' : 'text-ink/60'}>{label}</span>
      <span className="font-mono text-ink/80">{value}</span>
    </div>
  )
}
