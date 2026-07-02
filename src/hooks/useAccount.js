import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accountService } from '../services/account.service.js'
import { queryKeys } from '../lib/queryClient.js'
import { useAuthStore } from '../store/authStore.js'
import { toast } from '../store/toastStore.js'

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.account,
    queryFn: accountService.getProfile,
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  const updateUser = useAuthStore((s) => s.updateUser)
  return useMutation({
    mutationFn: accountService.updateProfile,
    onSuccess: (data) => {
      updateUser(data)
      queryClient.setQueryData(queryKeys.account, data)
      toast.success('Profile updated.')
    },
    onError: (err) => toast.error(err.message),
  })
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient()
  const updateUser = useAuthStore((s) => s.updateUser)
  return useMutation({
    mutationFn: accountService.updateAvatar,
    onSuccess: (data) => {
      updateUser(data)
      queryClient.setQueryData(queryKeys.account, data)
      toast.success('Avatar updated.')
    },
    onError: (err) => toast.error(err.message),
  })
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: accountService.deleteAccount,
    onError: (err) => toast.error(err.message),
  })
}
