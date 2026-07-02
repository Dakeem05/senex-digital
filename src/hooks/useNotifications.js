import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { notificationsService } from '../services/notifications.service.js'
import { queryKeys } from '../lib/queryClient.js'
import { toast } from '../store/toastStore.js'

export function useNotifications() {
  return useQuery({
    queryKey: queryKeys.notifications.list,
    queryFn: notificationsService.list,
  })
}

export function useUnreadCount() {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount,
    queryFn: notificationsService.unreadCount,
    refetchInterval: 60_000,
  })
}

function useNotificationMutation(mutationFn) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list })
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.unreadCount })
    },
    onError: (err) => toast.error(err.message),
  })
}

export function useMarkRead() {
  return useNotificationMutation(notificationsService.markRead)
}

export function useMarkAllRead() {
  return useNotificationMutation(notificationsService.markAllRead)
}

export function useDeleteNotification() {
  return useNotificationMutation(notificationsService.destroy)
}

export function useDeleteAllNotifications() {
  return useNotificationMutation(notificationsService.destroyAll)
}
