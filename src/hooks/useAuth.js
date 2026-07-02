import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore.js'
import { accountService } from '../services/account.service.js'
import { toast } from '../store/toastStore.js'

export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const token = useAuthStore((s) => s.token)
  const role = useAuthStore((s) => s.role)
  const clearSession = useAuthStore((s) => s.clearSession)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logoutMutation = useMutation({
    mutationFn: accountService.logout,
    onSettled: () => {
      // Clear locally even if the network call fails — an expired/invalid
      // token means the server already considers the session gone.
      clearSession()
      queryClient.clear()
      navigate('/login', { replace: true })
    },
  })

  return {
    user,
    isAuthenticated: !!token,
    role,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  }
}
