import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { walletService } from '../services/wallet.service.js'
import { queryKeys } from '../lib/queryClient.js'
import { toast } from '../store/toastStore.js'

export function useWalletBalance() {
  return useQuery({
    queryKey: queryKeys.wallet.balance,
    queryFn: walletService.getBalance,
  })
}

export function useWalletTransactions() {
  return useQuery({
    queryKey: queryKeys.wallet.transactions,
    queryFn: walletService.getTransactions,
  })
}

export function useDeposit() {
  return useMutation({
    mutationFn: walletService.deposit,
    onSuccess: (data) => {
      if (data.authorization_url) {
        // Hand off to the payment gateway's hosted checkout page.
        window.open(data.authorization_url, '_blank', 'noopener,noreferrer');
      }
    },
    onError: (err) => toast.error(err.message),
  })
}

export function useInvalidateWallet() {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance })
    queryClient.invalidateQueries({ queryKey: queryKeys.wallet.transactions })
  }
}
