import React from 'react'

export default function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
  disabled = false,
  textarea = false,
  rows = 4,
}) {
  const sharedClasses =
    'mt-2 w-full border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold disabled:bg-paper-dim disabled:text-ink/40'
  const borderClass = error ? 'border-red-700/60' : 'border-line'

  return (
    <div>
      <label className="font-mono text-[11px] uppercase tracking-wide text-ink/70" htmlFor={id}>
        {label}
        {required && ' *'}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`${sharedClasses} ${borderClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={!onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`${sharedClasses} ${borderClass}`}
        />
      )}
      {error && <p className="text-[12px] text-red-700 mt-1.5">{error}</p>}
    </div>
  )
}
