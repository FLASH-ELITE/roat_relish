import { Coffee, Instagram, MapPin, Clock, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-espresso-light text-cream/70">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-matcha text-cream"><Coffee size={18} strokeWidth={2.4} /></span>
              <span className="font-display text-lg font-semibold text-cream">Roast &amp; Relish</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">Artisanal brews &amp; handcrafted pastries, served with warmth since the first roast.</p>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-cream">Visit</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-matcha-light" /> 12 Garden Lane, Indiranagar, Bengaluru 560038</li>
              <li className="flex items-center gap-2"><Clock size={15} className="text-matcha-light" /> 8 AM – 11 PM, every day</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-matcha-light" /> +91 90000 00000</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-cream">Follow</h4>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-cream hover:bg-white/15">
              <Instagram size={16} /> @roastandrelish
            </a>
            <p className="mt-4 text-xs text-cream/40">Scan the QR at your table to land back here anytime.</p>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Roast &amp; Relish Artisanal Cafe. Brewed with love.
        </div>
      </div>
    </footer>
  )
}
