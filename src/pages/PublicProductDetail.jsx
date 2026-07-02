import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { usePublicProductDetails } from '../hooks/usePublicDiscovery.js'
import { useAuthStore } from '../store/authStore.js'
import { useGuestCartStore } from '../store/guestCartStore.js'
import { useAddToCart } from '../hooks/useCart.js'
import { toast } from '../store/toastStore.js'
import { FullPageSpinner } from '../components/ui/Spinner.jsx'
import { ErrorState } from '../components/ui/States.jsx'
import { formatCurrency } from '../utils/currency.js'

export default function PublicProductDetail() {
  const { id } = useParams()
  const isAuthenticated = useAuthStore((s) => !!s.token)
  const product = usePublicProductDetails(id)
  const addToCartAuthed = useAddToCart()
  const guestAddItem = useGuestCartStore((s) => s.addItem)

  if (product.isLoading) return <FullPageSpinner label="Loading product" />
  if (product.isError) {
    return (
      <div className="max-w-site mx-auto px-6 py-24">
        <ErrorState message={product.error.message} onRetry={product.refetch} />
      </div>
    )
  }

  const p = product.data
  const hasDiscount = p.discount_price && p.discount_price < p.price

  function handleAddToCart() {
    if (isAuthenticated) {
      addToCartAuthed.mutate({ product_id: p.id, quantity: 1 })
      return
    }
    guestAddItem(p, 1)
    toast.success('Added to cart. Sign in to check out.')
  }

  return (
    <section className="bg-white">
      <div className="max-w-site mx-auto px-6 lg:px-10 py-14 space-y-8">
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ink/50 hover:text-ink"
        >
          <ArrowLeft size={14} /> Back to catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bracket-frame aspect-square">
            <span className="bracket-tr" />
            <span className="bracket-bl" />
            {p.avatar?.[0] ? (
              <img src={p.avatar[0]} alt={p.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-paper-dim flex items-center justify-center text-ink/25 font-mono text-[11px] uppercase">
                No image
              </div>
            )}
          </div>

          <div>
            {p.category && (
              <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">
                {p.category.name}
              </span>
            )}
            <h1 className="font-serif text-3xl text-ink mt-2 leading-tight">{p.name}</h1>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="font-mono text-xl text-ink">
                {formatCurrency(hasDiscount ? p.discount_price : p.price, p.currency)}
              </span>
              {hasDiscount && (
                <span className="font-mono text-[14px] text-ink/35 line-through">
                  {formatCurrency(p.price, p.currency)}
                </span>
              )}
            </div>

            {p.description && <p className="text-ink/60 text-[14.5px] leading-relaxed mt-5">{p.description}</p>}

            {typeof p.rating === 'number' && (
              <div className="flex items-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={14} className={n <= Math.round(p.rating) ? 'fill-gold text-gold' : 'text-line'} />
                ))}
                {p.reviews_count > 0 && <span className="text-ink/40 text-[12px] ml-1">({p.reviews_count})</span>}
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={addToCartAuthed.isPending || !p.is_available}
              className="mt-7 inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-3.5 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
            >
              <ShoppingCart size={15} />
              {!p.is_available ? 'Currently unavailable' : addToCartAuthed.isPending ? 'Adding…' : 'Add to cart'}
            </button>

            {!isAuthenticated && (
              <p className="text-ink/40 text-[12.5px] mt-3">
                You can add items to your cart now — we'll only ask you to{' '}
                <Link to="/login" className="text-gold-dim hover:underline">
                  sign in
                </Link>{' '}
                when you're ready to check out.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
