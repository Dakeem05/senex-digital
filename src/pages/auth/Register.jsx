import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { UserPlus, ShieldCheck } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import FormField from '../../components/ui/FormField.jsx'
import { authService } from '../../services/auth.service.js'
import { ApiError } from '../../lib/http/ApiError.js'
import { toast } from '../../store/toastStore.js'
import { passwordIssues } from '../../utils/validators.js'

const initial = { name: '', username: '', email: '', password: '', password_confirmation: '' }

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form') // 'form' | 'otp'
  const [values, setValues] = useState(initial)
  const [fieldErrors, setFieldErrors] = useState({})
  const [otp, setOtp] = useState('')

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    if (fieldErrors[key]) setFieldErrors((fe) => ({ ...fe, [key]: undefined }))
  }

  function applyValidationErrors(err) {
    if (err instanceof ApiError && err.isValidationError) {
      setFieldErrors(Object.fromEntries(Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]])))
    } else {
      toast.error(err.message)
    }
  }

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success('Account created. Check your email for a verification code.')
      setStep('otp')
    },
    onError: applyValidationErrors,
  })

  const verifyMutation = useMutation({
    mutationFn: authService.verifyRegisterOtp,
    onSuccess: () => {
      toast.success('Email verified — you can now sign in.')
      navigate('/login', { replace: true })
    },
    onError: (err) => toast.error(err instanceof ApiError ? err.message : 'Verification failed.'),
  })

  const resendMutation = useMutation({
    mutationFn: authService.resendRegisterOtp,
    onSuccess: () => toast.success('A new code has been sent.'),
    onError: (err) => toast.error(err.message),
  })

  function handleFormSubmit(e) {
    e.preventDefault()
    const issues = passwordIssues(values.password)
    if (issues.length) {
      setFieldErrors((fe) => ({ ...fe, password: `Password needs: ${issues.join(', ')}` }))
      return
    }
    if (values.password !== values.password_confirmation) {
      setFieldErrors((fe) => ({ ...fe, password_confirmation: 'Passwords do not match.' }))
      return
    }
    registerMutation.mutate(values)
  }

  function handleOtpSubmit(e) {
    e.preventDefault()
    verifyMutation.mutate({ email: values.email, verification_code: otp })
  }

  if (step === 'otp') {
    return (
      <AuthLayout
        eyebrow="Verify email"
        title="Check your inbox."
        sub={`We sent a 6-digit code to ${values.email}.`}
      >
        <form onSubmit={handleOtpSubmit} className="space-y-5" noValidate>
          <FormField
            id="otp"
            label="Verification Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000000"
            required
          />
          <button
            type="submit"
            disabled={verifyMutation.isPending || otp.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-4 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
          >
            {verifyMutation.isPending ? 'Verifying…' : 'Verify Email'}
            <ShieldCheck size={15} />
          </button>
          <button
            type="button"
            onClick={() => resendMutation.mutate(values.email)}
            disabled={resendMutation.isPending}
            className="w-full font-mono text-[11px] uppercase tracking-widest2 text-gold-dim hover:text-ink transition-colors disabled:opacity-50"
          >
            {resendMutation.isPending ? 'Sending…' : 'Resend code'}
          </button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      eyebrow="Create account"
      title="Join Senex."
      sub="Set up your account to start ordering."
      footer={
        <p className="text-paper/55 text-[13px]">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-light hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
        <FormField
          id="name"
          label="Full Name"
          value={values.name}
          onChange={update('name')}
          error={fieldErrors.name}
          required
        />
        <FormField
          id="username"
          label="Username"
          value={values.username}
          onChange={update('username')}
          error={fieldErrors.username}
          required
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={values.email}
          onChange={update('email')}
          error={fieldErrors.email}
          autoComplete="email"
          required
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={update('password')}
          error={fieldErrors.password}
          autoComplete="new-password"
          required
        />
        <FormField
          id="password_confirmation"
          label="Confirm Password"
          type="password"
          value={values.password_confirmation}
          onChange={update('password_confirmation')}
          error={fieldErrors.password_confirmation}
          autoComplete="new-password"
          required
        />
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full inline-flex items-center justify-center gap-2 bg-gold text-white font-mono text-[12px] uppercase tracking-widest2 px-6 py-4 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
        >
          {registerMutation.isPending ? 'Creating account…' : 'Create Account'}
          <UserPlus size={15} />
        </button>
      </form>
    </AuthLayout>
  )
}
