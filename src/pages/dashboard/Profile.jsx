import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'
import { useProfile, useUpdateProfile, useUpdateAvatar, useDeleteAccount } from '../../hooks/useAccount.js'
import { useUserSettings, useUpdateCurrency } from '../../hooks/useSettings.js'
import { useAuthStore } from '../../store/authStore.js'
import { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState } from '../../components/ui/States.jsx'
import FormField from '../../components/ui/FormField.jsx'
import ConfirmDialog from '../../components/ui/ConfirmDialog.jsx'
import { formatDate } from '../../utils/date.js'
import { toast } from '../../store/toastStore.js'

const MAX_AVATAR_BYTES = 5 * 1024 * 1024
const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function Profile() {
  const profile = useProfile()
  const updateProfile = useUpdateProfile()
  const updateAvatar = useUpdateAvatar()
  const deleteAccount = useDeleteAccount()
  const settings = useUserSettings()
  const updateCurrency = useUpdateCurrency()
  const clearSession = useAuthStore((s) => s.clearSession)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (profile.isLoading) return <FullPageSpinner label="Loading profile" />
  if (profile.isError) return <ErrorState message={profile.error.message} onRetry={profile.refetch} />

  const p = profile.data
  const displayName = name || p.name

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WEBP image.')
      return
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error('Image must be smaller than 5MB.')
      return
    }
    updateAvatar.mutate(file)
  }

  function handleNameSubmit(e) {
    e.preventDefault()
    if (!name.trim() || name.trim() === p.name) return
    updateProfile.mutate({ name: name.trim() })
  }

  function handleDelete() {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        clearSession()
        toast.success('Account deleted.')
        navigate('/login', { replace: true })
      },
      onSettled: () => setConfirmDelete(false),
    })
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Account</span>
        <h1 className="font-serif text-3xl text-ink mt-1.5">Profile</h1>
      </div>

      <div className="bg-white border border-line p-7 flex items-center gap-5">
        <div className="relative">
          {p.avatar ? (
            <img src={p.avatar} alt="" className="h-20 w-20 rounded-full object-cover border border-line" />
          ) : (
            <span className="h-20 w-20 rounded-full bg-navy text-paper flex items-center justify-center font-serif text-2xl">
              {p.name?.[0]?.toUpperCase()}
            </span>
          )}
          <label className="absolute -bottom-1 -right-1 bg-ink text-paper p-1.5 rounded-full cursor-pointer hover:bg-navy-light">
            <Camera size={13} />
            <input
              type="file"
              accept={ACCEPTED_AVATAR_TYPES.join(',')}
              className="sr-only"
              onChange={handleAvatarChange}
              disabled={updateAvatar.isPending}
            />
          </label>
        </div>
        <div>
          <p className="font-serif text-xl text-ink">{p.name}</p>
          <p className="text-ink/50 text-[13.5px] mt-0.5">{p.email}</p>
          <p className="text-ink/35 text-[12px] mt-1">
            {p.email_verified_at ? `Verified · Member since ${formatDate(p.created_at)}` : 'Email not verified'}
          </p>
        </div>
      </div>

      <form onSubmit={handleNameSubmit} className="bg-white border border-line p-7 space-y-5">
        <h2 className="font-serif text-lg text-ink">Personal Information</h2>
        <FormField
          id="name"
          label="Full Name"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
        />
        <FormField id="username" label="Username" value={p.username} disabled />
        <button
          type="submit"
          disabled={updateProfile.isPending || !name.trim() || name.trim() === p.name}
          className="font-mono text-[11px] uppercase tracking-widest2 bg-ink text-paper px-5 py-3 hover:bg-navy-light transition-colors disabled:opacity-50"
        >
          {updateProfile.isPending ? 'Saving…' : 'Save Changes'}
        </button>
      </form>

      <div className="bg-white border border-line p-7">
        <h2 className="font-serif text-lg text-ink">Currency</h2>
        <p className="text-ink/55 text-[13.5px] mt-1.5">
          Prices, wallet balance, and orders are shown in this currency. Change it any time —
          nothing about your account or history is affected.
        </p>
        {settings.isLoading ? (
          <p className="text-ink/40 text-[13px] mt-4">Loading…</p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {(settings.data?.supported_currencies || []).map((code) => {
              const active = settings.data?.currency === code
              return (
                <button
                  key={code}
                  onClick={() => updateCurrency.mutate(code)}
                  disabled={updateCurrency.isPending || active}
                  className={`font-mono text-[12px] uppercase tracking-wide px-4 py-2.5 border transition-colors disabled:cursor-default ${
                    active
                      ? 'bg-ink text-paper border-ink'
                      : 'border-line text-ink/60 hover:border-ink hover:text-ink'
                  }`}
                >
                  {code}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="border border-red-700/30 bg-red-50 p-7">
        <h2 className="font-serif text-lg text-red-800">Danger Zone</h2>
        <p className="text-red-800/70 text-[13.5px] mt-1.5">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={() => setConfirmDelete(true)}
          className="mt-4 font-mono text-[11px] uppercase tracking-widest2 border border-red-700 text-red-700 px-5 py-2.5 hover:bg-red-700 hover:text-white transition-colors"
        >
          Delete Account
        </button>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete your account?"
        description="This permanently removes your account and cannot be undone."
        confirmLabel="Delete account"
        danger
        loading={deleteAccount.isPending}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
