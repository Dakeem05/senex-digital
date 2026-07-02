import React, { useState } from 'react'
import { CheckCheck, Trash2, Bell } from 'lucide-react'
import {
  useNotifications,
  useMarkRead,
  useMarkAllRead,
  useDeleteNotification,
  useDeleteAllNotifications,
} from '../../hooks/useNotifications.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import { timeAgo } from '../../utils/date.js'

export default function Notifications() {
  const notifications = useNotifications()
  const markRead = useMarkRead()
  const markAllRead = useMarkAllRead()
  const deleteOne = useDeleteNotification()
  const deleteAll = useDeleteAllNotifications()
  const [confirmClearAll, setConfirmClearAll] = useState(false)

  if (notifications.isLoading) return <FullPageSpinner label="Loading notifications" />
  if (notifications.isError) {
    return <ErrorState message={notifications.error.message} onRetry={notifications.refetch} />
  }

  const list = notifications.data?.data || []

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Inbox</span>
          <h1 className="font-serif text-3xl text-ink mt-1.5">Notifications</h1>
        </div>
        {list.length > 0 && (
          <div className="flex gap-3">
            <button
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest2 text-ink/55 hover:text-ink"
            >
              <CheckCheck size={14} /> Mark all read
            </button>
            <button
              onClick={() => setConfirmClearAll(true)}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest2 text-ink/55 hover:text-red-700"
            >
              <Trash2 size={14} /> Clear all
            </button>
          </div>
        )}
      </div>

      {list.length === 0 && (
        <EmptyState icon={Bell} title="You're all caught up" description="No notifications right now." />
      )}

      <div className="bg-white border border-line divide-y divide-line">
        {list.map((n) => {
          const unread = !n.read_at
          return (
            <div
              key={n.id}
              className={`flex items-start justify-between gap-4 px-5 py-4 ${unread ? 'bg-gold/5' : ''}`}
            >
              <div className="flex gap-3 min-w-0">
                <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${unread ? 'bg-gold' : 'bg-transparent'}`} />
                <div className="min-w-0">
                  <p className="text-ink text-[14px]">{n.data?.title || n.type}</p>
                  {n.data?.message && <p className="text-ink/55 text-[13px] mt-0.5">{n.data.message}</p>}
                  <p className="text-ink/35 text-[12px] mt-1">{timeAgo(n.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {unread && (
                  <button
                    onClick={() => markRead.mutate(n.id)}
                    className="font-mono text-[10px] uppercase tracking-widest2 text-gold-dim hover:text-ink"
                  >
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => deleteOne.mutate(n.id)}
                  aria-label="Delete notification"
                  className="text-ink/30 hover:text-red-700"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <ConfirmDialog
        open={confirmClearAll}
        title="Clear all notifications?"
        description="This permanently deletes every notification. This cannot be undone."
        confirmLabel="Clear all"
        danger
        loading={deleteAll.isPending}
        onCancel={() => setConfirmClearAll(false)}
        onConfirm={() => deleteAll.mutate(undefined, { onSettled: () => setConfirmClearAll(false) })}
      />
    </div>
  )
}
