import { useQuery } from '@tanstack/react-query'
import { ordersService } from '../services/orders.service.js'
import { queryKeys } from '../lib/queryClient.js'

export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders.list,
    queryFn: ordersService.list,
  })
}

export function useOrderDetails(orderId) {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: () => ordersService.show(orderId),
    enabled: !!orderId,
  })
}
