import { useMemo, useState } from 'react'
import { Minus, Plus, Check, Loader2, Leaf, Sparkles } from 'lucide-react'
import type { CartApi } from '../lib/useCart'
import { CATEGORIES, tagLabel } from '../lib/menu'
import type { MenuCategory, MenuItem } from '../types'

const DIET_COLOR: Record<string, string> = {
  veg:   'bg-matcha/12 text-matcha-dark ring-1 ring-matcha/25',
  vegan: 'bg-matcha/20 text-matcha-dark ring-1 ring-matcha/30',
  gf:    'bg-caramel/15 text-caramel ring-1 ring-caramel/30',
}

export default function Menu({
  menu,
  loading,
  error,
  cart,
}: {
  menu: MenuItem[]
  loading: boolean
  error: string | null
  cart: CartApi
}) {
  const [active, setActive] = useState<MenuCategory>('coffee')

  const filtered = useMemo(() => menu.filter((m) => m.category === active), [menu, active])

  return (
    <section id="menu" className="relative scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-matcha">The Digital Menu</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-espresso sm:text-5xl">Tap, pick &amp; relish</h2>
          <p className="mt-4 text-espresso/65">Filter by craving. Every item carries dietary tags so you can order with confidence.</p>
        </div>

        <div className="mt-10 flex justify-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto rounded-full bg-espresso/5 p-1.5 ring-1 ring-espresso/10">
            {CATEGORIES.map((c) => (
              <button key={c.id} onClick={() => setActive(c.id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-5 ${
                  active === c.id ? 'bg-espresso text-cream shadow-md shadow-espresso/25' : 'text-espresso/70 hover:bg-espresso/10'}`}>
                <span>{c.emoji}</span>
                <span className="whitespace-nowrap">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-espresso/50">
              <Loader2 className="animate-spin" /> <span className="ml-2">Brewing the menu…</span>
            </div>
          ) : error ? (
            <div className="rounded-2xl bg-red-500/10 p-6 text-center text-red-600">{error}</div>
          ) : (
            <div key={active} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <MenuCard key={item.id} item={item} cart={cart} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function MenuCard({ item, cart, index }: { item: MenuItem; cart: CartApi; index: number }) {
  const qty = cart.qtyOf(item.id)

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-3xl border border-espresso/8 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-espresso/10 animate-card-in"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="h-full w-full bg-espresso/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60" />
        {item.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-caramel px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-espresso shadow-md">
            <Sparkles size={11} /> Chef's Pick
          </span>
        )}
        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1.5">
          {item.tags.map((t) => (
            <span key={t} className={`tag-pill ${DIET_COLOR[t] ?? 'bg-espresso/10 text-espresso'}`}>
              {t === 'vegan' && <Leaf size={10} />}
              {tagLabel(t)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold leading-snug text-espresso">{item.name}</h3>
        {item.description && <p className="mt-1.5 text-sm leading-relaxed text-espresso/60">{item.description}</p>}

        <div className="mt-4 flex items-center justify-between">
          {/* Inter + tabular-nums keeps the ₹ glyph and digits on one shared baseline */}
          <span className="price text-2xl text-matcha-dark">₹{Number(item.price).toFixed(0)}</span>

          {qty === 0 ? (
            <button onClick={() => cart.add(item)}
              className="inline-flex items-center gap-1.5 rounded-full bg-matcha px-4 py-2.5 text-sm font-semibold text-cream shadow-md shadow-matcha/25 transition-all hover:bg-matcha-dark active:scale-95">
              <Plus size={15} /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1 rounded-full bg-espresso/5 p-1 ring-1 ring-espresso/10">
              <button onClick={() => cart.decrement(item)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-espresso transition-all hover:bg-espresso hover:text-cream active:scale-90" aria-label="Decrease">
                <Minus size={15} />
              </button>
              <span className="price min-w-6 text-center text-espresso">{qty}</span>
              <button onClick={() => cart.add(item)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-matcha text-cream transition-all hover:bg-matcha-dark active:scale-90" aria-label="Increase">
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>

        {qty > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-matcha-dark animate-fade-in">
            <Check size={13} /> Added to your order
          </div>
        )}
      </div>
    </article>
  )
}
