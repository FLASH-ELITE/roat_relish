import { Wifi, Clock, MapPin, Instagram, Coffee, BookOpen, Leaf } from 'lucide-react'

const GALLERY = [
  'https://images.pexels.com/photos/1857648/pexels-photo-1857648.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/1303094/pexels-photo-1303094.jpeg?auto=compress&cs=tinysrgb&w=800',
]

const VIBES = [
  { icon: <Wifi size={20} />, title: 'Work-From-Cafe Ready', text: 'Symmetrical 120 Mbps fibre, ample power sockets at every seat, and bottomless filter coffee for the deep-work grind.', accent: 'text-matcha-dark' },
  { icon: <BookOpen size={20} />, title: 'Quiet Reading Nooks', text: 'A curated shelf of titles, soft jazz, and corner booths made for slow mornings and a good book.', accent: 'text-caramel' },
  { icon: <Leaf size={20} />, title: 'Garden Courtyard', text: 'Step into our plant-filled courtyard — open-air seating, dappled light, and a living wall of herbs we brew with.', accent: 'text-matcha-dark' },
]

export default function Vibes() {
  return (
    <section id="vibes" className="scroll-mt-20 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-matcha">Cafe Vibes</span>
          <h2 className="mt-3 font-display text-4xl font-bold text-espresso sm:text-5xl">A space to linger</h2>
          <p className="mt-4 text-espresso/65">Warm light, slow music, fast Wi-Fi. Whether you're working, reading, or catching up — we built this corner for you to stay a while.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VIBES.map((v, i) => (
            <div key={v.title}
              className="rounded-3xl border border-espresso/8 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-espresso/10 animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-espresso/5 ${v.accent}`}>{v.icon}</div>
              <h3 className="mt-4 font-display text-xl font-semibold text-espresso">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/60">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <InfoTile icon={<Wifi size={18} />} title="Wi-Fi Speed" value="120 Mbps" sub="Symmetric · unlimited" />
          <InfoTile icon={<Clock size={18} />} title="Open Hours" value="8 AM – 11 PM" sub="Every day of the week" />
          <InfoTile icon={<MapPin size={18} />} title="Find Us" value="12 Garden Lane" sub="Indiranagar, Bengaluru" />
        </div>

        <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl font-bold text-espresso">
                <span className="bg-gradient-to-r from-matcha to-caramel bg-clip-text text-transparent">@roastandrelish</span>
              </h3>
              <p className="mt-1 text-sm text-espresso/60">Tag us in your moments — we love seeing you relish.</p>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95 sm:inline-flex">
              <Instagram size={16} /> Follow
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {GALLERY.map((src, i) => (
              <a key={src} href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-2xl animate-fade-in"
                style={{ gridColumn: i === 0 ? 'span 2' : undefined, gridRow: i === 0 ? 'span 2' : undefined, animationDelay: `${i * 0.05}s` }}>
                <img src={src} alt={`Cafe moment ${i + 1}`} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-300 group-hover:bg-espresso/40 group-hover:opacity-100">
                  <Instagram size={22} className="text-cream" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 py-3 text-sm font-semibold text-white shadow-md">
              <Instagram size={16} /> Follow @roastandrelish
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Coffee size={28} className="text-matcha" />
          <p className="mt-4 max-w-2xl font-display text-2xl font-medium italic text-espresso/80 sm:text-3xl">"Good coffee is a pleasure. Good company, a gift. Here's to both."</p>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-espresso/40">— The Roast & Relish Family</p>
        </div>
      </div>
    </section>
  )
}

function InfoTile({ icon, title, value, sub }: { icon: React.ReactNode; title: string; value: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-espresso px-5 py-4 text-cream">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-matcha/25 text-matcha-light">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-wide text-cream/55">{title}</div>
        <div className="font-display text-lg font-semibold leading-tight">{value}</div>
        <div className="text-xs text-cream/55">{sub}</div>
      </div>
    </div>
  )
}
