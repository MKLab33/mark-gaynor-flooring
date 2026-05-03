'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { FileText, Phone } from 'lucide-react'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative py-28 overflow-hidden bg-[#0A0807]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(200,132,42,0.13),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8842A]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8842A]/20 to-transparent" />

      <div className="absolute inset-0 wood-grain opacity-50" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8842A]/30 bg-[#C8842A]/10 text-[#C8842A] text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8842A] animate-pulse" />
            Free Site Survey · No Obligation
          </span>

          <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.98] tracking-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Ready for the
            <br />
            <span className="italic text-[#C8842A]">floor of your home?</span>
          </h2>

          <p className="text-white/55 text-lg max-w-xl leading-relaxed">
            Get an honest quote from a fitter who&apos;ll be on site himself, not subbing the work out. WhatsApp Mark a few photos for a same-day quote, or book a survey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="#quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8842A] hover:bg-[#b3741f] text-white font-bold text-xl rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-amber-700/30 active:scale-[0.98]"
            >
              <FileText className="w-5 h-5" />
              Get a Free Quote
            </Link>
            <a
              href="tel:+353877678389"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-xl rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              <Phone className="w-5 h-5 text-[#C8842A]" />
              087 767 8389
            </a>
          </div>

          <p className="text-white/25 text-sm">
            Mon–Fri 9am–6pm · Sat 10am–3pm · Dublin and surrounding counties
          </p>
        </motion.div>
      </div>
    </section>
  )
}
