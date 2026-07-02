import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { settingsService } from '../services/settings.service.js'
import { toast } from '../store/toastStore.js'

const SETTINGS_KEY = ['settings']

export function useUserSettings() {
  return useQuery({
    queryKey: SETTINGS_KEY,
    queryFn: settingsService.show,
  })
}

export function useUpdateCurrency() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: settingsService.updateCurrency,
    onSuccess: () => {
      // Every amount anywhere in the app is presented server-side in the
      // user's currency, so the simplest correct thing to do after changing
      // it is to refetch everything money-related rather than try to
      // re-derive conversions on the client.
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEY })
      queryClient.invalidateQueries({ queryKey: ['wallet'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      queryClient.invalidateQueries({ queryKey: ['discovery'] })
      toast.success('Currency updated.')
    },
    onError: (err) => toast.error(err.message),
  })
}
