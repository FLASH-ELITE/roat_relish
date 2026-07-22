import { useState } from 'react'
import { Hash, MessageCircle, ArrowRight, CheckCircle2, Loader2, Trash2 } from 'lucide-react'
import type { CartApi } from '../lib/useCart'

const STEPS = [
  { n: 1, label: 'Enter table number' },
  { n: 2, label: 'Pick your items' },
  { n: 3, label: 'Send to kitchen via WhatsApp' },
]

export default function OrderSection({ cart, onOpenCart }: { cart: CartApi; onOpenCart: () => void }) {
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ kind: 'idle' | 'ok' | 'err'; msg: string }>({ kind: 'idle', msg: '' })

  const tableValid = /^\d+$/.test(cart.tableNumber.trim()) && Number(cart.tableNumber.trim()) > 0
  const step = !tableValid ? 1 : cart.count === 0 ? 2 : 3

  const handleSend = async () => {
    setSending(true)
    setStatus({ kind: 'idle', msg: '' })
    const res = await cart.sendToKitchen(notes)
    setSending(false)
    if (res.ok) {
      setStatus({ kind: 'ok', msg: 'Opening WhatsApp… your order is on its way to the kitchen!' })
      setNotes('')
      setTimeout(() => cart.clear(), 600)
    } else {
      setStatus({ kind: 'err', msg: res.error ?? 'Something went wrong.' })
    }
  }

  return (
    <section id="order" className="relative scroll-mt-20 bg-espresso py-20 text-cream sm:py-28">
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-matcha/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-5">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-matcha-light">Table Ordering</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">From table to kitchen in a tap</h2>
          <p className="mt-4 text-cream/70">No waiting for a server. Tell us your table, choose what you love, and we'll whisk your order straight to the kitchen over WhatsApp.</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center gap-2 sm:gap-4">
              <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300 sm:px-4 ${
                step >= s.n ? 'bg-matcha text-cream' : 'bg-white/10 text-cream/50'}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                  step >= s.n ? 'bg-cream text-matcha' : 'bg-white/15 text-cream/60'}`}>
                  {step > s.n ? <CheckCircle2 size={14} /> : s.n}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <ArrowRight size={16} className={step > s.n ? 'text-matcha-light' : 'text-cream/30'} />}
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-6 sm:p-8">
              <label className="block text-sm font-semibold text-cream/90">Your table number</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl bg-espresso-light/60 px-4 py-3.5 ring-1 ring-white/10 focus-within:ring-matcha/50">
                <Hash size={18} className="text-matcha-light" />
                <input inputMode="numeric" pattern="[0-9]*" value={cart.tableNumber}
                  onChange={(e) => cart.setTableNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 7"
                  className="w-full bg-transparent text-lg font-semibold text-cream placeholder:text-cream/40 focus:outline-none" />
              </div>

              <label className="mt-5 block text-sm font-semibold text-cream/90">Notes for the kitchen (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                placeholder="Oat milk for the latte, eggs soft please…"
                className="mt-2 w-full resize-none rounded-2xl bg-espresso-light/60 px-4 py-3 text-sm text-cream placeholder:text-cream/40 ring-1 ring-white/10 focus:outline-none focus:ring-matcha/50" />

              <button onClick={handleSend} disabled={sending || !tableValid || cart.count === 0}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-semibold text-[#0a3d1f] shadow-lg shadow-[#25D366]/25 transition-all hover:brightness-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40">
                {sending ? (<><Loader2 size={18} className="animate-spin" /> Sending…</>)
                  : (<><MessageCircle size={18} /> Send Order to Kitchen via WhatsApp</>)}
              </button>

              {status.kind !== 'idle' && (
                <div className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium animate-fade-in ${
                  status.kind === 'ok' ? 'bg-matcha/20 text-matcha-light ring-1 ring-matcha/30' : 'bg-red-500/15 text-red-300 ring-1 ring-red-500/30'}`}>
                  {status.msg}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-espresso-light/30 p-6 sm:p-8 md:border-l md:border-t-0">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">Your order</h3>
                {cart.count > 0 && (
                  <button onClick={cart.clear} className="inline-flex items-center gap-1 text-xs font-semibold text-cream/60 hover:text-red-300">
                    <Trash2 size={13} /> Clear
                  </button>
                )}
              </div>

              {cart.count === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/15 px-4 py-10 text-center text-cream/50">
                  <p className="text-sm">Nothing picked yet.</p>
                  <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-3 text-sm font-semibold text-matcha-light hover:underline">Browse the menu →</button>
                </div>
              ) : (
                <>
                  <ul className="mt-4 max-h-64 space-y-2.5 overflow-y-auto pr-1 no-scrollbar">
                    {cart.lines.map((l) => (
                      <li key={l.item.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-cream">{l.item.name}</p>
                          <p className="price text-xs text-cream/55">₹{Number(l.item.price).toFixed(0)} × {l.qty}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="price font-semibold text-cream">₹{(l.qty * Number(l.item.price)).toFixed(0)}</span>
                          <button onClick={() => cart.removeLine(l.item.id)} className="text-cream/40 hover:text-red-300" aria-label="Remove">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-sm text-cream/70">Total</span>
                    <span className="price text-2xl text-matcha-light">₹{cart.total.toFixed(0)}</span>
                  </div>
                  <button onClick={onOpenCart}
                    className="mt-4 w-full rounded-full border border-white/15 bg-white/5 py-3 text-sm font-semibold text-cream hover:bg-white/10">Review full cart</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
