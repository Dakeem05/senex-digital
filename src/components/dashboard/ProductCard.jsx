import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { formatCurrency } from '../../utils/currency.js'

export default function ProductCard({ product, onAddToCart, adding }) {
  const image = product.avatar?.[0]
  const hasDiscount = product.discount_price && product.discount_price < product.price

  return (
    <div className="bg-white border border-line group flex flex-col">
      <Link to={`/dashboard/discover/${product.id}`} className="block relative bracket-frame aspect-[4/3] overflow-hidden">
        <span className="bracket-tr" />
        <span className="bracket-bl" />
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-paper-dim flex items-center justify-center text-ink/25 font-mono text-[11px] uppercase">
            No image
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/dashboard/discover/${product.id}`} className="flex-1">
          <h3 className="font-serif text-[15px] text-ink leading-snug line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-baseline gap-2 mt-2.5">
          <span className="font-mono text-[14px] text-ink">
            {formatCurrency(hasDiscount ? product.discount_price : product.price, product.currency)}
          </span>
          {hasDiscount && (
            <span className="font-mono text-[12px] text-ink/35 line-through">
              {formatCurrency(product.price, product.currency)}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          disabled={adding || !product.is_available}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-ink text-ink font-mono text-[11px] uppercase tracking-widest2 px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-ink"
        >
          <ShoppingCart size={13} />
          {!product.is_available ? 'Unavailable' : adding ? 'Adding…' : 'Add to cart'}
        </button>
      </div>
    </div>
  )
}
