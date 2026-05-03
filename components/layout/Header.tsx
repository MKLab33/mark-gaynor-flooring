'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Floor Finder', href: '#floor-finder' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Location', href: '#location' },
  { label: 'FAQ', href: '#faq' },
]

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
      <div className="w-10 h-10 rounded-md bg-[#C8842A] flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden">
        <svg viewBox="0 0 40 40" className="w-7 h-7" aria-hidden="true">
          <rect x="6" y="10" width="28" height="6" fill="#fff" opacity="0.92" rx="0.5" />
          <rect x="6" y="17" width="28" height="6" fill="#fff" opacity="0.78" rx="0.5" />
          <rect x="6" y="24" width="28" height="6" fill="#fff" opacity="0.92" rx="0.5" />
          <line x1="14" y1="10" x2="14" y2="16" stroke="#C8842A" strokeWidth="0.6" />
          <line x1="22" y1="17" x2="22" y2="23" stroke="#C8842A" strokeWidth="0.6" />
          <line x1="28" y1="24" x2="28" y2="30" stroke="#C8842A" strokeWidth="0.6" />
        </svg>
      </div>
      <div className="leading-tight">
        <span
          className="block text-white font-bold tracking-tight text-base"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Mark Gaynor
        </span>
        <span
          className="block text-[#C8842A] font-semibold tracking-[0.18em] text-[10px] uppercase -mt-0.5"
        >
          Flooring
        </span>
      </div>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0807]/85 backdrop-blur-md border-b border-white/6 shadow-lg shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Logo />

            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+353877678389"
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C8842A]" />
                087 767 8389
              </a>
              <Link
                href="#quote"
                className="px-5 py-2.5 bg-[#C8842A] hover:bg-[#b3741f] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-700/30 active:scale-95"
              >
                Free Quote
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0A0807]/98 backdrop-blur-lg flex flex-col pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-2xl font-bold text-white hover:text-[#C8842A] transition-colors border-b border-white/8"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="tel:+353877678389"
                className="flex items-center justify-center gap-2 py-3.5 border border-white/15 rounded-xl text-white font-medium"
              >
                <Phone className="w-5 h-5 text-[#C8842A]" />
                087 767 8389
              </a>
              <Link
                href="#quote"
                onClick={() => setMobileOpen(false)}
                className="py-3.5 bg-[#C8842A] hover:bg-[#b3741f] text-white text-center font-bold text-lg rounded-xl transition-colors"
              >
                Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
