import { useQuery } from '@tanstack/react-query'
import { discoveryService } from '../services/discovery.service.js'
import { queryKeys } from '../lib/queryClient.js'

export function useProducts() {
  return useQuery({
    queryKey: queryKeys.discovery.products,
    queryFn: discoveryService.getProducts,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.discovery.categories,
    queryFn: discoveryService.getCategories,
  })
}

export function useProductsByCategory(categoryId) {
  return useQuery({
    queryKey: queryKeys.discovery.byCategory(categoryId),
    queryFn: () => discoveryService.getProductsByCategory(categoryId),
    enabled: !!categoryId,
  })
}

export function useProductSearch(query) {
  return useQuery({
    queryKey: queryKeys.discovery.search(query),
    queryFn: () => discoveryService.search(query),
    enabled: query.trim().length > 0,
  })
}

export function useProductDetails(productId) {
  return useQuery({
    queryKey: queryKeys.discovery.product(productId),
    queryFn: () => discoveryService.getProductDetails(productId),
    enabled: !!productId,
  })
}
