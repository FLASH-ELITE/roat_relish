import { X, Minus, Plus, Trash2, MessageCircle, Hash } from 'lucide-react'
import { useState } from 'react'
import type { CartApi } from '../lib/useCart'

export default function CartDrawer({ open, onClose, cart }: { open: boolean; onClose: () => void; cart: CartApi }) {
  const [notes, setNotes] = useState('')
  const [sending, setSending] = useState(false)
  const [flash, setFlash] = useState<string | null>(null)

  const handleSend = async () => {
    setSending(true)
    const res = await cart.sendToKitchen(notes)
    setSending(false)
    if (res.ok) {
      setFlash('Opening WhatsApp…')
      setNotes('')
      setTimeout(() => { cart.clear(); setFlash(null); onClose() }, 1200)
    } else {
      setFlash(res.error ?? 'Something went wrong.')
      setTimeout(() => setFlash(null), 3000)
    }
  }

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-espresso/50 backdrop-blur-sm transition-opacity duration-300 ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={onClose} />
      <aside className={`fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <h3 className="font-display text-xl font-bold text-espresso">Your Cart</h3>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso/5 text-espresso hover:bg-espresso/10" aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <label className="block text-xs font-semibold uppercase tracking-wide text-espresso/60">Table number</label>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-espresso/10 focus-within:ring-matcha/50">
            <Hash size={16} className="text-matcha" />
            <input inputMode="numeric" value={cart.tableNumber}
              onChange={(e) => cart.setTableNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 7"
              className="w-full bg-transparent font-semibold text-espresso placeholder:text-espresso/40 focus:outline-none" />
          </div>

          {cart.count === 0 ? (
            <div className="mt-10 text-center text-espresso/50">
              <p className="font-medium">Your cart is empty.</p>
              <button onClick={() => { onClose(); document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="mt-3 text-sm font-semibold text-matcha-dark hover:underline">Browse the menu →</button>
            </div>
          ) : (
            <ul className="mt-4 space-y-3">
              {cart.lines.map((l) => (
                <li key={l.item.id} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-espresso/5">
                  <img src={l.item.image_url ?? ''} alt={l.item.name} className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-espresso">{l.item.name}</p>
                    <p className="price text-xs text-espresso/55">₹{Number(l.item.price).toFixed(0)}</p>
                    <div className="mt-1.5 flex items-center gap-1">
                      <button onClick={() => cart.decrement(l.item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-dark text-espresso hover:bg-espresso hover:text-cream"><Minus size={13} /></button>
                      <span className="price min-w-6 text-center text-sm font-bold text-espresso">{l.qty}</span>
                      <button onClick={() => cart.add(l.item)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-matcha text-cream hover:bg-matcha-dark"><Plus size={13} /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="price font-semibold text-espresso">₹{(l.qty * Number(l.item.price)).toFixed(0)}</span>
                    <button onClick={() => cart.removeLine(l.item.id)} className="text-espresso/30 hover:text-red-500" aria-label="Remove"><Trash2 size={15} /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.count > 0 && (
            <div className="mt-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-espresso/60">Notes (optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                placeholder="Any special requests?"
                className="mt-1.5 w-full resize-none rounded-xl bg-white px-3 py-2.5 text-sm text-espresso placeholder:text-espresso/40 ring-1 ring-espresso/10 focus:outline-none focus:ring-matcha/50" />
            </div>
          )}
        </div>

        {cart.count > 0 && (
          <div className="border-t border-espresso/10 px-5 py-4">
            {flash && <div className="mb-3 rounded-lg bg-matcha/12 px-3 py-2 text-sm font-medium text-matcha-dark">{flash}</div>}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-espresso/70">Total</span>
              <span className="price text-2xl font-bold text-matcha-dark">₹{cart.total.toFixed(0)}</span>
            </div>
            <button onClick={handleSend} disabled={sending || !cart.tableNumber.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-[#0a3d1f] shadow-lg shadow-[#25D366]/25 transition-all hover:brightness-105 active:scale-95 disabled:opacity-40">
              <MessageCircle size={18} />
              {sending ? 'Sending…' : 'Send to Kitchen via WhatsApp'}
            </button>
            {!cart.tableNumber.trim() && <p className="mt-2 text-center text-xs text-espresso/50">Enter your table number to send.</p>}
          </div>
        )}
      </aside>
    </>
  )
}
