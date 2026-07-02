import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react'
import { useProductDetails } from '../../hooks/useDiscovery.js'
import { useAddToCart } from '../../hooks/useCart.js'
import { reviewsService } from '../../services/reviews.service.js'
import { queryKeys } from '../../lib/queryClient.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import { formatCurrency } from '../../utils/currency.js'
import { formatDate } from '../../utils/date.js'
import { toast } from '../../store/toastStore.js'

export default function ProductDetail() {
  const { id } = useParams()
  const product = useProductDetails(id)
  const addToCart = useAddToCart()
  const queryClient = useQueryClient()

  const reviews = useQuery({
    queryKey: queryKeys.reviews(id),
    queryFn: () => reviewsService.list(id),
    enabled: !!id,
  })

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const submitReview = useMutation({
    mutationFn: reviewsService.create,
    onSuccess: () => {
      toast.success('Review submitted.')
      setComment('')
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews(id) })
    },
    onError: (err) => toast.error(err.message),
  })

  if (product.isLoading) return <FullPageSpinner label="Loading product" />
  if (product.isError) {
    return <ErrorState message={product.error.message} onRetry={product.refetch} />
  }

  const p = product.data
  const hasDiscount = p.discount_price && p.discount_price < p.price

  return (
    <div className="space-y-8">
      <Link
        to="/dashboard/discover"
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

          <button
            onClick={() => addToCart.mutate({ product_id: p.id, quantity: 1 })}
            disabled={addToCart.isPending || !p.is_available}
            className="mt-7 inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-3.5 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
          >
            <ShoppingCart size={15} />
            {!p.is_available ? 'Currently unavailable' : addToCart.isPending ? 'Adding…' : 'Add to cart'}
          </button>
        </div>
      </div>

      <div className="border-t border-line pt-8">
        <h2 className="font-serif text-xl text-ink mb-5">Reviews</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!comment.trim()) return
            submitReview.mutate({ reviewable_id: id, rating, comment })
          }}
          className="bg-white border border-line p-5 mb-6 space-y-3"
        >
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setRating(n)}
                aria-label={`Rate ${n} stars`}
                className="p-0.5"
              >
                <Star
                  size={20}
                  className={n <= rating ? 'fill-gold text-gold' : 'text-line'}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your experience with this product…"
            className="w-full border border-line bg-white px-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus-visible:outline-gold resize-none"
          />
          <button
            type="submit"
            disabled={submitReview.isPending || !comment.trim()}
            className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-5 py-2.5 hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            {submitReview.isPending ? 'Submitting…' : 'Submit Review'}
          </button>
        </form>

        {reviews.isSuccess && (reviews.data || []).length === 0 && (
          <EmptyState title="No reviews yet" description="Be the first to share your thoughts." />
        )}

        <div className="space-y-4">
          {(reviews.data || []).map((review) => (
            <div key={review.id} className="border border-line bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {review.user?.avatar ? (
                    <img src={review.user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="h-8 w-8 rounded-full bg-navy text-paper flex items-center justify-center font-serif text-[12px]">
                      {review.user?.name?.[0] || '?'}
                    </span>
                  )}
                  <span className="text-ink text-[13.5px]">{review.user?.name}</span>
                </div>
                <span className="text-ink/40 text-[12px]">{formatDate(review.created_at)}</span>
              </div>
              <div className="flex items-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={13}
                    className={n <= review.rating ? 'fill-gold text-gold' : 'text-line'}
                  />
                ))}
              </div>
              <p className="text-ink/65 text-[14px] mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
