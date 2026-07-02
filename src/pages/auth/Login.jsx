import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { LogIn } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import FormField from '../../components/ui/FormField.jsx'
import { authService } from '../../services/auth.service.js'
import { useAuthStore } from '../../store/authStore.js'
import { useGuestCartMerge } from '../../hooks/useGuestCart.js'
import { ApiError } from '../../lib/http/ApiError.js'
import { toast } from '../../store/toastStore.js'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((s) => s.setSession)
  const { mergeGuestCartIntoAccount } = useGuestCartMerge()

  const [values, setValues] = useState({ username: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors((fe) => ({ ...fe, [key]: undefined }))
  }

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      setSession(data, data.token, 'user')
      await mergeGuestCartIntoAccount()
      toast.success(`Welcome back, ${data.name?.split(' ')[0] || 'there'}.`)
      navigate(location.state?.from || '/dashboard', { replace: true })
    },
    onError: (err) => {
      if (err instanceof ApiError && err.isValidationError) {
        const flat = Object.fromEntries(
          Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]])
        )
        setFieldErrors(flat)
      } else {
        toast.error(err.message)
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate(values)
  }

  return (
    <AuthLayout
      eyebrow="Sign in"
      title="Welcome back."
      sub="Log in to manage your orders, wallet, and account."
      footer={
        <p className="text-paper/55 text-[13px]">
          New here?{' '}
          <Link to="/register" className="text-gold-light hover:underline">
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <FormField
          id="username"
          label="Email or Username"
          value={values.username}
          onChange={update('username')}
          error={fieldErrors.username}
          placeholder="you@example.com"
          autoComplete="username"
          required
        />
        <div>
          <FormField
            id="password"
            label="Password"
            type="password"
            value={values.password}
            onChange={update('password')}
            error={fieldErrors.password}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
          <div className="text-right mt-2">
            <Link
              to="/forgot-password"
              className="font-mono text-[11px] uppercase tracking-wide text-gold-dim hover:text-ink"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold text-white font-mono text-[12px] uppercase tracking-widest2 px-6 py-4 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
        >
          {loginMutation.isPending ? 'Signing in…' : 'Sign In'}
          <LogIn size={15} />
        </button>
      </form>
    </AuthLayout>
  )
}
