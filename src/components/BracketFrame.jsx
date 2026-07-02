import React from 'react'

export default function BracketFrame({ src, alt, className = '', children }) {
  return (
    <div className={`bracket-frame ${className}`}>
      <span className="bracket-tr" />
      <span className="bracket-bl" />
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
      {children}
    </div>
  )
}
