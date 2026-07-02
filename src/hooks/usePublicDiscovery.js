import { useQuery } from '@tanstack/react-query'
import { publicDiscoveryService } from '../services/publicDiscovery.service.js'

export function usePublicProducts() {
  return useQuery({
    queryKey: ['public', 'discovery', 'products'],
    queryFn: publicDiscoveryService.getProducts,
  })
}

export function usePublicCategories() {
  return useQuery({
    queryKey: ['public', 'discovery', 'categories'],
    queryFn: publicDiscoveryService.getCategories,
  })
}

export function usePublicProductsByCategory(categoryId) {
  return useQuery({
    queryKey: ['public', 'discovery', 'category', categoryId],
    queryFn: () => publicDiscoveryService.getProductsByCategory(categoryId),
    enabled: !!categoryId,
  })
}

export function usePublicProductSearch(query) {
  return useQuery({
    queryKey: ['public', 'discovery', 'search', query],
    queryFn: () => publicDiscoveryService.search(query),
    enabled: query.trim().length > 0,
  })
}

export function usePublicProductDetails(productId) {
  return useQuery({
    queryKey: ['public', 'discovery', 'product', productId],
    queryFn: () => publicDiscoveryService.getProductDetails(productId),
    enabled: !!productId,
  })
}
