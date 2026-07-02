/** Amounts from the API are plain NGN (not kobo) — see e.g. wallet balance: 21000 -> "₦21,000.00". */
export function formatCurrency(amount, currency = 'NGN') {
  if (amount === null || amount === undefined) return '—'
  try {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(Number(amount))
  } catch {
    return `${currency} ${Number(amount).toLocaleString()}`
  }
}
