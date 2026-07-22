import { ArrowDown, Wifi, Star } from 'lucide-react'

export default function Hero({ onViewMenu }: { onViewMenu: () => void }) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-espresso text-cream">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-matcha/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-caramel/20 blur-3xl" />

      <div className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600)' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/80 to-espresso" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pt-24 pb-16">
        <div className="max-w-2xl">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-matcha/40 bg-matcha/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-matcha-light">
            <span className="h-1.5 w-1.5 rounded-full bg-matcha-light" /> Scan · Order · Relish
          </span>

          <h1 className="mt-6 font-display text-[2.6rem] font-bold leading-[1.05] sm:text-6xl md:text-7xl"
            style={{ animation: 'fadeUp 0.7s ease-out 0.1s both' }}>
            Artisanal Brews &amp;
            <span className="block bg-gradient-to-r from-matcha-light via-matcha to-caramel bg-clip-text text-transparent">Handcrafted Pastries.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
            style={{ animation: 'fadeUp 0.7s ease-out 0.25s both' }}>
            A cozy corner where single-origin beans meet fresh-baked mornings. Scan the QR at your
            table, build your order, and tap to send it straight to our kitchen.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animation: 'fadeUp 0.7s ease-out 0.4s both' }}>
            <button onClick={onViewMenu} className="btn-primary text-base">View Table QR Menu <ArrowDown size={18} /></button>
            <a href="https://maps.google.com/?q=Roast+and+Relish+Cafe" target="_blank" rel="noopener noreferrer" className="btn-ghost">Find Us</a>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-4" style={{ animation: 'fadeUp 0.7s ease-out 0.55s both' }}>
            <Stat icon={<Star size={16} />} value="4.9" label="2k+ reviews" />
            <Stat icon={<Wifi size={16} />} value="120 Mbps" label="Wi-Fi for work" />
            <Stat icon={<span className="text-base">☕</span>} value="20+" label="Daily brews" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-6 hidden animate-float lg:block">
        <div className="relative">
          <span className="steam left-2 -top-6" style={{ animationDelay: '0s' }} />
          <span className="steam left-7 -top-6" style={{ animationDelay: '0.8s' }} />
          <span className="steam left-12 -top-6" style={{ animationDelay: '1.4s' }} />
          <div className="flex h-24 w-20 items-end justify-center rounded-b-2xl rounded-t-md bg-gradient-to-b from-cream-dark to-cream shadow-2xl">
            <div className="mb-3 h-10 w-12 rounded-full bg-espresso/85" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-matcha-light">{icon}</div>
      <div className="mt-1.5 font-display text-xl font-semibold text-cream">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-cream/55">{label}</div>
    </div>
  )
}
