import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { useProducts, useCategories, useProductsByCategory, useProductSearch } from '../../hooks/useDiscovery.js'
import { useAddToCart } from '../../hooks/useCart.js'
import Spinner from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import ProductCard from '../../components/dashboard/ProductCard.jsx'

function useDebounced(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export default function Discover() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebounced(searchInput)
  const isSearching = debouncedSearch.trim().length > 0

  const categories = useCategories()
  const allProducts = useProducts()
  const categoryProducts = useProductsByCategory(activeCategory)
  const searchResults = useProductSearch(debouncedSearch)
  const addToCart = useAddToCart()

  const activeQuery = isSearching ? searchResults : activeCategory ? categoryProducts : allProducts
  const products = activeQuery.data?.data || []

  return (
    <div className="space-y-7">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Catalog</span>
        <h1 className="font-serif text-3xl text-ink mt-1.5">Discover</h1>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products…"
            className="w-full border border-line bg-white pl-10 pr-4 py-3 text-[14px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
          />
        </div>
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
            adding={addToCart.isPending && addToCart.variables?.product_id === product.id}
            onAddToCart={(product_id) => addToCart.mutate({ product_id, quantity: 1 })}
          />
        ))}
      </div>
    </div>
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
