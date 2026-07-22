import { Coffee, Menu as MenuIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const NAV = [
  { id: 'menu', label: 'Menu' },
  { id: 'order', label: 'Order' },
  { id: 'vibes', label: 'Cafe Vibes' },
]

export default function Header({ cartCount, onCart }: { cartCount: number; onCart: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
      scrolled ? 'bg-espresso/95 shadow-lg shadow-espresso/20 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-matcha text-cream shadow-md shadow-matcha/40">
            <Coffee size={18} strokeWidth={2.4} />
          </span>
          <span className="font-display text-lg font-semibold leading-none text-cream">
            Roast & Relish
            <span className="block text-[10px] font-sans font-medium uppercase tracking-[0.22em] text-cream/60">Artisanal Cafe</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}
              className="rounded-full px-4 py-2 text-sm font-medium text-cream/80 transition-colors hover:bg-white/10 hover:text-cream">
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={onCart}
            className="relative flex items-center gap-2 rounded-full bg-matcha px-4 py-2.5 text-sm font-semibold text-cream shadow-md shadow-matcha/30 transition-all hover:bg-matcha-dark active:scale-95">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cream px-1.5 text-xs font-bold text-matcha">{cartCount}</span>
            )}
          </button>
          <button onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream md:hidden" aria-label="Toggle menu">
            {open ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="animate-fade-in border-t border-white/10 bg-espresso/98 px-5 py-3 md:hidden">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)}
              className="block w-full rounded-lg px-3 py-3 text-left text-cream/90 hover:bg-white/10">{n.label}</button>
          ))}
        </nav>
      )}
    </header>
  )
}
