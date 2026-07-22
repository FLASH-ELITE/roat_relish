import { useCallback, useMemo, useEffect, useState } from 'react'
import type { CartLine, MenuItem } from '../types'
import { supabase } from '../lib/supabase'

const CAFE_WA = '919000000000'
const TABLE_KEY = 'rr_table'

export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([])
  const [tableNumber, setTableNumber] = useState<string>(
    () => localStorage.getItem(TABLE_KEY) ?? '',
  )

  useEffect(() => {
    if (tableNumber) localStorage.setItem(TABLE_KEY, tableNumber)
  }, [tableNumber])

  const add = useCallback((item: MenuItem) => {
    setLines((p) => {
      const hit = p.find((l) => l.item.id === item.id)
      return hit
        ? p.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty + 1 } : l))
        : [...p, { item, qty: 1 }]
    })
  }, [])

  const decrement = useCallback((item: MenuItem) => {
    setLines((p) =>
      p.map((l) => (l.item.id === item.id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0),
    )
  }, [])

  const removeLine = useCallback((id: string) => {
    setLines((p) => p.filter((l) => l.item.id !== id))
  }, [])

  const clear = useCallback(() => setLines([]), [])
  const qtyOf = useCallback((id: string) => lines.find((l) => l.item.id === id)?.qty ?? 0, [lines])
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines])
  const total = useMemo(() => lines.reduce((s, l) => s + l.qty * Number(l.item.price), 0), [lines])

  const sendToKitchen = useCallback(
    async (notes: string): Promise<{ ok: boolean; error?: string }> => {
      const table = tableNumber.trim()
      if (!table) return { ok: false, error: 'Enter your table number first.' }
      if (lines.length === 0) return { ok: false, error: 'Cart is empty.' }

      try {
        await supabase.from('orders').insert({
          table_number: Number(table),
          items: lines.map((l) => ({ name: l.item.name, price: Number(l.item.price), qty: l.qty })),
          total,
          notes: notes.trim() || null,
          status: 'received',
        })
      } catch (e) {
        console.error('order persist failed', e)
      }

      const body =
        `*New Order — Roast & Relish*\nTable: ${table}\n\n` +
        lines.map((l) => `• ${l.qty}× ${l.item.name} — ₹${(l.qty * Number(l.item.price)).toFixed(0)}`).join('\n') +
        `\n\nTotal: ₹${total.toFixed(0)}` +
        (notes.trim() ? `\nNotes: ${notes.trim()}` : '') +
        `\n\n— sent via QR Menu`

      window.open(`https://wa.me/${CAFE_WA}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer')
      return { ok: true }
    },
    [lines, tableNumber, total],
  )

  return { lines, tableNumber, setTableNumber, add, decrement, removeLine, clear, qtyOf, count, total, sendToKitchen }
}

export type CartApi = ReturnType<typeof useCart>
