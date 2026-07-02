import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CalendarCheck, CheckCircle2 } from 'lucide-react'
import { consultationService } from '../services/consultation.service.js'
import { ApiError } from '../lib/http/ApiError.js'

const initial = { name: '', email: '', company: '', goals: '', website: '' }
const MAX_GOALS = 500

export default function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const submitMutation = useMutation({
    mutationFn: () =>
      consultationService.submit({
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        message: values.goals,
        website: values.website || undefined,
      }),
    onSuccess: () => setSubmitted(true),
    onError: (err) => {
      if (err instanceof ApiError && err.isValidationError) {
        setErrors(Object.fromEntries(Object.entries(err.fieldErrors).map(([k, v]) => [k, v[0]])))
      } else {
        setErrors({ form: err.message || 'Something went wrong. Please try again.' })
      }
    },
  })

  const update = (key) => (e) => {
    const val = e.target.value
    if (key === 'goals' && val.length > MAX_GOALS) return
    setValues((v) => ({ ...v, [key]: val }))
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Full name is required.'
    if (!values.email.trim()) {
      next.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = 'Enter a valid email address.'
    }
    if (!values.goals.trim()) next.goals = 'Tell us a little about what you need.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      submitMutation.mutate()
    }
  }

  if (submitted) {
    return (
      <div className="bg-paper border border-line p-10 text-center">
        <CheckCircle2 className="mx-auto text-gold" size={36} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-ink mt-4">Request received</h3>
        <p className="text-ink/60 mt-2 text-[15px] leading-relaxed">
          We read every consultation request personally. Expect a reply from a strategist,
          not a sales rep, within one business day.
        </p>
        <button
          onClick={() => {
            setValues(initial)
            setSubmitted(false)
          }}
          className="mt-6 font-mono text-[11px] uppercase tracking-widest2 text-gold hover:text-gold-dim transition-colors"
        >
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-paper border border-line p-7 sm:p-9 space-y-5" noValidate>
      {/* Honeypot - hidden from real visitors via CSS, bots tend to fill every field they find */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink/70" htmlFor="name">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={update('name')}
          placeholder="Enter your full name"
          className="mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
        />
        {errors.name && <p className="text-[12px] text-red-700 mt-1.5">{errors.name}</p>}
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink/70" htmlFor="email">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={update('email')}
          placeholder="Enter your email address"
          className="mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
        />
        {errors.email && <p className="text-[12px] text-red-700 mt-1.5">{errors.email}</p>}
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink/70" htmlFor="company">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          value={values.company}
          onChange={update('company')}
          placeholder="Enter your company name"
          className="mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
        />
      </div>

      <div>
        <label className="font-mono text-[11px] uppercase tracking-wide text-ink/70" htmlFor="goals">
          Tell Us About Your Goals *
        </label>
        <textarea
          id="goals"
          rows={4}
          value={values.goals}
          onChange={update('goals')}
          placeholder={`What are your main marketing challenges and goals? (Max ${MAX_GOALS} characters)`}
          className="mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold resize-none"
        />
        <div className="flex items-center justify-between mt-1">
          {errors.goals ? <p className="text-[12px] text-red-700">{errors.goals}</p> : <span />}
          <div className="text-right font-mono text-[11px] text-ink/40">
            {values.goals.length}/{MAX_GOALS} characters
          </div>
        </div>
      </div>

      {errors.form && <p className="text-[13px] text-red-700">{errors.form}</p>}

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-4 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
      >
        {submitMutation.isPending ? 'Sending…' : 'Book Free Consultation'}
        <CalendarCheck size={15} />
      </button>
    </form>
  )
}
