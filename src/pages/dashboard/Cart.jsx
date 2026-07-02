import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, Tag, X } from 'lucide-react'
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
  useApplyCoupon,
  useRemoveCoupon,
  useCheckout,
} from '../../hooks/useCart.js'
import { useWalletBalance } from '../../hooks/useWallet.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import { formatCurrency } from '../../utils/currency.js'

export default function Cart() {
  const cart = useCart()
  const wallet = useWalletBalance()
  const updateItem = useUpdateCartItem()
  const removeItem = useRemoveCartItem()
  const clearCart = useClearCart()
  const applyCoupon = useApplyCoupon()
  const removeCoupon = useRemoveCoupon()
  const checkout = useCheckout()

  const [couponCode, setCouponCode] = useState('')
  const [useWallet, setUseWallet] = useState(false)
  const [confirmClear, setConfirmClear] = useState(false)

  if (cart.isLoading) return <FullPageSpinner label="Loading cart" />
  if (cart.isError) return <ErrorState message={cart.error.message} onRetry={cart.refetch} />

  const data = cart.data
  const items = data.items || []

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <PageTitle />
        <EmptyState
          title="Your cart is empty"
          description="Browse the catalog to add products."
          action={
            <Link
              to="/dashboard/discover"
              className="inline-flex font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-5 py-2.5 hover:bg-navy-light"
            >
              Browse products
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageTitle />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-line flex gap-4 p-4">
              <div className="h-20 w-20 shrink-0 bg-paper-dim overflow-hidden">
                {item.product.avatar?.[0] ? (
                  <img src={item.product.avatar[0]} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-ink text-[14px] leading-snug">{item.product.name}</p>
                  <button
                    onClick={() => removeItem.mutate(item.id)}
                    disabled={removeItem.isPending}
                    aria-label="Remove item"
                    className="text-ink/30 hover:text-red-700 shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-line">
                    <button
                      onClick={() => updateItem.mutate({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })}
                      disabled={updateItem.isPending || item.quantity <= 1}
                      className="p-2 text-ink/60 hover:text-ink disabled:opacity-30"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="px-3 font-mono text-[13px] text-ink">{item.quantity}</span>
                    <button
                      onClick={() => updateItem.mutate({ itemId: item.id, quantity: item.quantity + 1 })}
                      disabled={updateItem.isPending}
                      className="p-2 text-ink/60 hover:text-ink"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-mono text-[14px] text-ink">{formatCurrency(item.subtotal, item.currency)}</span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => setConfirmClear(true)}
            className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 hover:text-red-700 transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="bg-white border border-line p-6 h-fit space-y-5">
          <h2 className="font-serif text-lg text-ink">Summary</h2>

          {data.coupon ? (
            <div className="flex items-center justify-between border border-gold/40 bg-gold/10 px-3 py-2.5">
              <span className="font-mono text-[12px] text-gold-dim flex items-center gap-1.5">
                <Tag size={13} /> {data.coupon.code}
              </span>
              <button
                onClick={() => removeCoupon.mutate()}
                disabled={removeCoupon.isPending}
                aria-label="Remove coupon"
                className="text-gold-dim hover:text-ink"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (couponCode.trim()) applyCoupon.mutate(couponCode.trim())
              }}
              className="flex gap-2"
            >
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon code"
                className="flex-1 border border-line bg-white px-3 py-2.5 text-[13px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
              />
              <button
                type="submit"
                disabled={applyCoupon.isPending || !couponCode.trim()}
                className="font-mono text-[11px] uppercase tracking-widest2 border border-ink px-3.5 hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
              >
                Apply
              </button>
            </form>
          )}

          <div className="space-y-2 text-[13.5px] border-t border-line pt-4">
            <Row label="Subtotal" value={formatCurrency(data.subtotal, data.currency)} />
            {data.total_discount > 0 && (
              <Row label="Discount" value={`-${formatCurrency(data.total_discount, data.currency)}`} muted />
            )}
            <Row label="Total" value={formatCurrency(data.cart_total, data.currency)} bold />
          </div>

          {!wallet.isLoading && wallet.data?.balance > 0 && (
            <label className="flex items-center gap-2.5 text-[13px] text-ink/70 cursor-pointer">
              <input
                type="checkbox"
                checked={useWallet}
                onChange={(e) => setUseWallet(e.target.checked)}
                className="accent-gold"
              />
              Use wallet balance ({formatCurrency(wallet.data.balance, wallet.data.currency)} available)
            </label>
          )}

          <button
            onClick={() => checkout.mutate({ wallet_usage: useWallet })}
            disabled={checkout.isPending}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-3.5 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
          >
            {checkout.isPending ? 'Processing…' : 'Checkout'}
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClear}
        title="Clear your cart?"
        description="This removes every item from your cart. This cannot be undone."
        confirmLabel="Clear cart"
        danger
        loading={clearCart.isPending}
        onCancel={() => setConfirmClear(false)}
        onConfirm={() => clearCart.mutate(undefined, { onSettled: () => setConfirmClear(false) })}
      />
    </div>
  )
}

function PageTitle() {
  return (
    <div>
      <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Checkout</span>
      <h1 className="font-serif text-3xl text-ink mt-1.5">Your Cart</h1>
    </div>
  )
}

function Row({ label, value, muted, bold }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? 'text-ink/45' : 'text-ink/60'}>{label}</span>
      <span className={bold ? 'font-mono text-ink text-[15px]' : 'font-mono text-ink/80'}>{value}</span>
    </div>
  )
}
