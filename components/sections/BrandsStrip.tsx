'use client'

const BRANDS = [
  'Boen',
  'Junckers',
  'Kährs',
  'Quick-Step',
  'Karndean',
  'Amtico',
  'Polyflor',
  'Egger',
  'Tarkett',
]

const TRACK = [...BRANDS, ...BRANDS]

export default function BrandsStrip() {
  return (
    <section className="py-14 bg-[#0A0807] border-y border-white/6 overflow-hidden">
      <div className="mb-6 text-center">
        <span className="text-white/30 text-xs font-bold tracking-[0.25em] uppercase">
          Brands We Fit
        </span>
      </div>

      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div className="flex whitespace-nowrap marquee-track">
          {TRACK.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center gap-6 px-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8842A]/40 flex-shrink-0" />
              <span
                className="text-2xl font-semibold text-white/20 hover:text-white/60 transition-colors duration-300 tracking-tight select-none"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
