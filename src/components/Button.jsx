import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const base =
  'inline-flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-widest2 px-6 py-3.5 transition-colors duration-200 whitespace-nowrap'

const variants = {
  primary: 'bg-gold text-paper hover:bg-gold-light border border-gold',
  dark: 'bg-ink text-paper hover:bg-navy-light border border-ink',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  'outline-light': 'border border-paper/40 text-paper hover:bg-paper hover:text-navy',
  ghost: 'text-ink hover:text-gold border border-transparent',
}

export default function Button({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  icon = true,
  className = '',
  children,
}) {
  const classes = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowRight size={14} strokeWidth={2.5} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}
