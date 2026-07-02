import { useQueryClient } from '@tanstack/react-query'
import { cartService } from '../services/cart.service.js'
import { useGuestCartStore } from '../store/guestCartStore.js'

export function useGuestCartMerge() {
  const queryClient = useQueryClient()

  /**
   * Best-effort: adds each guest-cart line to the now-authenticated user's
   * real cart, one request per line (matches the add-item endpoint's shape -
   * there's no bulk-add). A single failed line (e.g. a product that went
   * out of stock while they were browsing) doesn't block the rest.
   */
  async function mergeGuestCartIntoAccount() {
    const items = useGuestCartStore.getState().items
    if (items.length === 0) return

    await Promise.allSettled(
      items.map((item) => cartService.addItem({ product_id: item.product.id, quantity: item.quantity }))
    )

    useGuestCartStore.getState().clear()
    queryClient.invalidateQueries({ queryKey: ['cart'] })
  }

  return { mergeGuestCartIntoAccount }
}
