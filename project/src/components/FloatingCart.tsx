import { ShoppingBag } from 'lucide-react'

export default function FloatingCart({ count, total, onClick }: { count: number; total: number; onClick: () => void }) {
  if (count === 0) return null
  return (
    <button onClick={onClick}
      className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full bg-matcha px-5 py-3.5 text-cream shadow-2xl shadow-matcha/40 ring-1 ring-white/20 transition-all hover:bg-matcha-dark active:scale-95 animate-slide-up">
      <span className="flex items-center gap-2 font-semibold"><ShoppingBag size={18} />{count} item{count > 1 ? 's' : ''}</span>
      <span className="h-5 w-px bg-white/30" />
      <span className="price font-bold">₹{total.toFixed(0)}</span>
      <span className="text-cream/80">View cart →</span>
    </button>
  )
}
