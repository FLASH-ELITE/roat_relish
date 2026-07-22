import { useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Menu from './components/Menu'
import OrderSection from './components/OrderSection'
import Vibes from './components/Vibes'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import FloatingCart from './components/FloatingCart'
import { useCart } from './lib/useCart'
import { fetchMenu } from './lib/menu'
import type { MenuItem } from './types'

export default function App() {
  const cart = useCart()
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    let alive = true
    fetchMenu()
      .then((items) => { if (alive) { setMenu(items); setError(null) } })
      .catch((e) => { if (alive) setError(e.message ?? 'Could not load the menu.') })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const goMenu = () => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-cream">
      <Header cartCount={cart.count} onCart={() => setCartOpen(true)} />
      <main>
        <Hero onViewMenu={goMenu} />
        <Menu menu={menu} loading={loading} error={error} cart={cart} />
        <OrderSection cart={cart} onOpenCart={() => setCartOpen(true)} />
        <Vibes />
      </main>
      <Footer />
      <FloatingCart count={cart.count} total={cart.total} onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </div>
  )
}
