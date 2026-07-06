import React, { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, Wallet as WalletIcon } from 'lucide-react'
import { useWalletBalance, useWalletTransactions, useDeposit } from '../../hooks/useWallet.js'
import Spinner, { FullPageSpinner } from '../../components/ui/Spinner.jsx'
import { ErrorState, EmptyState } from '../../components/ui/States.jsx'
import { formatCurrency } from '../../utils/currency.js'
import TransactionStatusBadge from '../../components/dashboard/TransactionStatusBadge.jsx'

export default function Wallet() {
  const balance = useWalletBalance()
  const transactions = useWalletTransactions()
  const deposit = useDeposit()

  const [amount, setAmount] = useState('')

  function handleDeposit(e) {
    e.preventDefault()
    const parsed = Number(amount)
    if (!parsed || parsed <= 0) return
    deposit.mutate({ amount: parsed })
  }

  if (balance.isLoading) return <FullPageSpinner label="Loading wallet" />
  if (balance.isError) return <ErrorState message={balance.error.message} onRetry={balance.refetch} />

  const grouped = transactions.data?.data || {}
  const days = Object.keys(grouped)

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-gold-dim">Wallet</span>
        <h1 className="font-serif text-3xl text-ink mt-1.5">Wallet</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-navy text-paper p-7">
          <WalletIcon className="text-gold-light" size={22} strokeWidth={1.5} />
          <p className="font-mono text-[11px] uppercase tracking-widest2 text-paper/50 mt-4">
            Available Balance
          </p>
          <p className="font-serif text-4xl mt-2">{formatCurrency(balance.data.balance, balance.data.currency)}</p>

          {!!transactions.data && (
            <div className="flex gap-6 mt-6 pt-5 border-t border-navy-line">
              <div>
                <p className="text-paper/45 text-[11px] font-mono uppercase">In</p>
                <p className="text-paper text-[15px] mt-1 flex items-center gap-1.5">
                  <ArrowDownToLine size={13} className="text-green-400" />
                  {formatCurrency(transactions.data.in, transactions.data.currency)}
                </p>
              </div>
              <div>
                <p className="text-paper/45 text-[11px] font-mono uppercase">Out</p>
                <p className="text-paper text-[15px] mt-1 flex items-center gap-1.5">
                  <ArrowUpFromLine size={13} className="text-red-400" />
                  {formatCurrency(transactions.data.out, transactions.data.currency)}
                </p>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleDeposit}
          className="lg:col-span-2 bg-white border border-line p-7 flex flex-col justify-between"
        >
          <div>
            <h2 className="font-serif text-xl text-ink">Fund Wallet</h2>
            <p className="text-ink/55 text-[13.5px] mt-1.5">
              You'll be redirected to a secure payment page to complete this deposit.
            </p>
            <div className="mt-5">
              <label
                htmlFor="amount"
                className="font-mono text-[11px] uppercase tracking-wide text-ink/70"
              >
                Amount (NGN)
              </label>
              <input
                id="amount"
                type="number"
                min="10"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="5000"
                className="mt-2 w-full border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink/35 focus-visible:outline-gold"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={deposit.isPending || !amount}
            className="mt-6 w-full sm:w-auto self-end inline-flex items-center justify-center gap-2 bg-gold text-paper font-mono text-[12px] uppercase tracking-widest2 px-6 py-3.5 hover:bg-gold-light transition-colors border border-gold disabled:opacity-60"
          >
            {deposit.isPending ? 'Redirecting…' : 'Deposit'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-serif text-xl text-ink mb-4">Transaction History</h2>

        {transactions.isLoading && (
          <div className="py-12 flex justify-center">
            <Spinner />
          </div>
        )}
        {transactions.isError && (
          <ErrorState message={transactions.error.message} onRetry={transactions.refetch} />
        )}
        {transactions.isSuccess && days.length === 0 && (
          <EmptyState title="No transactions yet" description="Deposits and purchases will show up here." />
        )}

        <div className="space-y-6">
          {days.map((day) => (
            <div key={day}>
              <p className="font-mono text-[11px] uppercase tracking-widest2 text-ink/40 mb-2">{day}</p>
              <div className="bg-white border border-line divide-y divide-line">
                {grouped[day].map((tx) => (
                  <div key={tx.reference} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="text-ink text-[14px]">{tx.description}</p>
                      <p className="text-ink/45 text-[12px] mt-0.5">{tx.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] text-ink">
                        {formatCurrency(tx.amount, tx.currency)}
                      </span>
                      <TransactionStatusBadge status={tx.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
