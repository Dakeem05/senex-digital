import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartService } from '../services/cart.service.js'
import { queryKeys } from '../lib/queryClient.js'
import { toast } from '../store/toastStore.js'

export function useCart() {
  return useQuery({
    queryKey: queryKeys.cart,
    queryFn: cartService.get,
  })
}

function useCartMutation(mutationFn, successMessage) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      if (successMessage) toast.success(successMessage)
    },
    onError: (err) => toast.error(err.message),
  })
}

export function useAddToCart() {
  return useCartMutation(cartService.addItem, 'Added to cart.')
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ itemId, quantity }) => cartService.updateItem(itemId, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.cart }),
    onError: (err) => toast.error(err.message),
  })
}

export function useRemoveCartItem() {
  return useCartMutation(cartService.deleteItem, 'Item removed.')
}

export function useClearCart() {
  return useCartMutation(cartService.clear, 'Cart cleared.')
}

export function useApplyCoupon() {
  return useCartMutation(cartService.applyCoupon, 'Coupon applied.')
}

export function useRemoveCoupon() {
  return useCartMutation(cartService.removeCoupon, 'Coupon removed.')
}

export function useCheckout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartService.checkout,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart })
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.list })
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance })
      if (data.authorization_url) {
        window.open(data.authorization_url, '_blank', 'noopener,noreferrer');
      }
    },
    onError: (err) => toast.error(err.message),
  })
}
