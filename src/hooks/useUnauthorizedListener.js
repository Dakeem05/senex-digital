import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../store/toastStore.js'

export function useUnauthorizedListener() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  useEffect(() => {
    function handleUnauthorized() {
      queryClient.clear()
      const onAuthPage =
        location.pathname.startsWith('/login') || location.pathname.startsWith('/register')
      if (!onAuthPage) {
        toast.error('Your session has expired. Please log in again.')
        navigate('/login', { replace: true, state: { from: location.pathname } })
      }
    }
    window.addEventListener('senex:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('senex:unauthorized', handleUnauthorized)
  }, [navigate, location, queryClient])
}
