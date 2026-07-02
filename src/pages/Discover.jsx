import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart } from 'lucide-react'
import {
  usePublicProducts,
  usePublicCategories,
  usePublicProductsByCategory,
  usePublicProductSearch,
} from '../hooks/usePublicDiscovery.js'
import { useAuthStore } from '../store/authStore.js'
import { useGuestCartStore } from '../store/guestCartStore.js'
import { useAddToCart } from '../hooks/useCart.js'
import { toast } from '../store/toastStore.js'
import Spinner from '../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../components/ui/States.jsx'
import ProductCard from '../components/dashboard/ProductCard.jsx'
import PageHeader from '../components/PageHeader.jsx'

function useDebounced(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function Discover() {
  const isAuthenticated = useAuthStore((s) => !!s.token)
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounced(searchInput)
  const isSearching = debouncedSearch.trim().length > 0

  const categories = usePublicCategories()
  const allProducts = usePublicProducts()
  const categoryProducts = usePublicProductsByCategory(activeCategory)
  const searchResults = usePublicProductSearch(debouncedSearch)

  const addToCartAuthed = useAddToCart()
  const guestAddItem = useGuestCartStore((s) => s.addItem)
  const guestCount = useGuestCartStore((s) => s.count())

  const activeQuery = isSearching ? searchResults : activeCategory ? categoryProducts : allProducts
  const products = activeQuery.data?.data || []

  function handleAddToCart(productId) {
    if (isAuthenticated) {
      addToCartAuthed.mutate({ product_id: productId, quantity: 1 })
      return
    }
    const product = products.find((p) => p.id === productId)
    if (!product) return
    guestAddItem(product, 1)
    toast.success('Added to cart. Sign in to check out.')
  }

  return (
    <>
      <PageHeader
        tag="Shop"
        title="Browse what we offer — no account needed to look around."
        sub="Add anything to your cart now. We'll ask you to sign in only when you're ready to check out."
      />

      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-14 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products…"
                className="w-full border border-line bg-white pl-10 pr-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
              />
            </div>

            {!isAuthenticated && guestCount > 0 && (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 border border-ink px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors"
              >
                <ShoppingCart size={14} />
                {guestCount} in cart — sign in to check out
              </Link>
            )}
          </div>

          {!isSearching && (
            <div className="flex flex-wrap gap-2">
              <CategoryChip active={!activeCategory} onClick={() => setActiveCategory(null)}>
                All
              </CategoryChip>
              {categories.data?.data?.map((cat) => (
                <CategoryChip
                  key={cat.id}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </CategoryChip>
              ))}
            </div>
          )}

          {activeQuery.isLoading && (
            <div className="py-16 flex justify-center">
              <Spinner size={24} />
            </div>
          )}
          {activeQuery.isError && (
            <ErrorState message={activeQuery.error.message} onRetry={activeQuery.refetch} />
          )}
          {activeQuery.isSuccess && products.length === 0 && (
            <EmptyState
              title={isSearching ? 'No matches found' : 'No products here yet'}
              description={isSearching ? `Nothing matched "${debouncedSearch}".` : 'Check back soon.'}
            />
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                adding={isAuthenticated && addToCartAuthed.isPending && addToCartAuthed.variables?.product_id === product.id}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function CategoryChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[11px] uppercase tracking-widest2 px-3.5 py-2 border transition-colors ${
        active ? 'bg-ink text-paper border-ink' : 'border-line text-ink/60 hover:border-ink hover:text-ink'
      }`}
    >
      {children}
    </button>
  )
}
