import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { KeyRound } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import FormField from '../../components/ui/FormField.jsx'
import { authService } from '../../services/auth.service.js'
import { ApiError } from '../../lib/http/ApiError.js'
import { toast } from '../../store/toastStore.js'
import { passwordIssues } from '../../utils/validators.js'

const STEPS = { EMAIL: 'email', OTP: 'otp', RESET: 'reset' }

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.EMAIL)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [passwords, setPasswords] = useState({ password: '', password_confirmation: '' })
  const [error, setError] = useState('')

  const sendCodeMutation = useMutation({
    mutationFn: authService.sendForgotPasswordOtp,
    onSuccess: () => {
      toast.success('A verification code has been sent.')
      setStep(STEPS.OTP)
    },
    onError: (err) => setError(err.message),
  })

  const verifyMutation = useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess: () => setStep(STEPS.RESET),
    onError: (err) => setError(err.message),
  })

  const resetMutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success('Password changed. Please sign in.')
      navigate('/login', { replace: true })
    },
    onError: (err) => setError(err.message),
  })

  function handleEmailSubmit(e) {
    e.preventDefault()
    setError('')
    sendCodeMutation.mutate(email)
  }

  function handleOtpSubmit(e) {
    e.preventDefault()
    setError('')
    verifyMutation.mutate({ email, verification_code: otp })
  }

  function handleResetSubmit(e) {
    e.preventDefault()
    setError('')
    const issues = passwordIssues(passwords.password)
    if (issues.length) return setError(`Password needs: ${issues.join(', ')}`)
    if (passwords.password !== passwords.password_confirmation) {
      return setError('Passwords do not match.')
    }
    resetMutation.mutate({ email, ...passwords })
  }

  const copy = {
    [STEPS.EMAIL]: { eyebrow: 'Reset password', title: 'Forgot your password?', sub: "Enter your email and we'll send you a code." },
    [STEPS.OTP]: { eyebrow: 'Verify code', title: 'Enter the code.', sub: `We sent a 6-digit code to ${email}.` },
    [STEPS.RESET]: { eyebrow: 'New password', title: 'Set a new password.', sub: 'Choose something you have not used before.' },
  }[step]

  return (
    <AuthLayout
      eyebrow={copy.eyebrow}
      title={copy.title}
      sub={copy.sub}
      footer={
        <p className="text-paper/55 text-[13px]">
          Remembered it?{' '}
          <Link to="/login" className="text-gold-light hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      {step === STEPS.EMAIL && (
        <form onSubmit={handleEmailSubmit} className="space-y-5" noValidate>
          <FormField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            autoComplete="email"
            required
          />
          <SubmitButton loading={sendCodeMutation.isPending} label="Send Code" loadingLabel="Sending…" />
        </form>
      )}

      {step === STEPS.OTP && (
        <form onSubmit={handleOtpSubmit} className="space-y-5" noValidate>
          <FormField
            id="otp"
            label="Verification Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={error}
            placeholder="000000"
            required
          />
          <SubmitButton loading={verifyMutation.isPending} label="Verify Code" loadingLabel="Verifying…" />
        </form>
      )}

      {step === STEPS.RESET && (
        <form onSubmit={handleResetSubmit} className="space-y-5" noValidate>
          <FormField
            id="password"
            label="New Password"
            type="password"
            value={passwords.password}
            onChange={(e) => setPasswords((p) => ({ ...p, password: e.target.value }))}
            autoComplete="new-password"
            required
          />
          <FormField
            id="password_confirmation"
            label="Confirm New Password"
            type="password"
            value={passwords.password_confirmation}
            onChange={(e) => setPasswords((p) => ({ ...p, password_confirmation: e.target.value }))}
            error={error}
            autoComplete="new-password"
            required
          />
          <SubmitButton loading={resetMutation.isPending} label="Reset Password" loadingLabel="Resetting…" />
        </form>
      )}
    </AuthLayout>
  )
}

function SubmitButton({ loading, label, loadingLabel }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full inline-flex items-center justify-center gap-2 bg-gold text-white font-mono text-[12px] uppercase tracking-widest2 px-6 py-4 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
    >
      {loading ? loadingLabel : label}
      <KeyRound size={15} />
    </button>
  )
}
