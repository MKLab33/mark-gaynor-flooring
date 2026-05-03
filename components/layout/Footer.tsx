import Link from 'next/link'
import { Phone, MessageCircle, MapPin } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Floor Finder', href: '#floor-finder' },
  { label: 'Free Quote', href: '#quote' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Location', href: '#location' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F0C09] border-t border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">

          {/* Col 1 — logo & blurb */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-10 h-10 rounded-md bg-[#C8842A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
                  <rect x="6" y="10" width="28" height="6" fill="#fff" opacity="0.92" rx="0.5" />
                  <rect x="6" y="17" width="28" height="6" fill="#fff" opacity="0.78" rx="0.5" />
                  <rect x="6" y="24" width="28" height="6" fill="#fff" opacity="0.92" rx="0.5" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold tracking-tight text-base" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Mark Gaynor
                </span>
                <span className="block text-[#C8842A] font-semibold tracking-[0.18em] text-[10px] uppercase -mt-0.5">
                  Flooring
                </span>
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Dublin&apos;s wood flooring specialists. Engineered oak, herringbone parquet, laminate and luxury vinyl — supplied and fitted with craftsman precision.
            </p>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/markgaynorflooring/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#C8842A]/40 hover:bg-[#C8842A]/10 flex items-center justify-center text-white/40 hover:text-[#C8842A] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/353877678389"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border border-white/10 hover:border-[#C8842A]/40 hover:bg-[#C8842A]/10 flex items-center justify-center text-white/40 hover:text-[#C8842A] transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 — links */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em]">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-[#C8842A] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — contact */}
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em]">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-4">
              <a href="tel:+353877678389" className="flex gap-3 text-white/40 hover:text-white transition-colors group">
                <Phone className="w-4 h-4 text-[#C8842A] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>087 767 8389</p>
                  <p className="text-white/30 text-xs mt-0.5">WhatsApp also available</p>
                </div>
              </a>
              <div className="flex gap-3 text-white/40">
                <MapPin className="w-4 h-4 text-[#C8842A] flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Dublin &amp; surrounding counties</p>
                  <p className="text-white/30 text-xs mt-0.5">Mobile fitting service</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/6">
              <p className="text-xs text-white/25 leading-relaxed">
                Mon–Fri: 9:00am – 6:00pm<br />
                Saturday: 10:00am – 3:00pm<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Mark Gaynor Flooring. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Trading as Mark II Flooring · Dublin, Ireland
          </p>
        </div>
      </div>
    </footer>
  )
}
