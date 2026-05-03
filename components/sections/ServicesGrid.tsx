'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Layers, TreePine, Square, Droplet, SprayCan, Sparkles } from 'lucide-react'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  cta: string
}

const SERVICES: Service[] = [
  {
    icon: <TreePine className="w-6 h-6" />,
    title: 'Engineered Oak',
    description: 'Real oak top layers (3–6mm) bonded to a stable plywood base. Perfect for underfloor heating and wide planks.',
    cta: 'View options',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'Herringbone & Parquet',
    description: 'Classic herringbone, chevron and panel patterns. Hand-laid for the timeless look that adds value to any home.',
    cta: 'See patterns',
  },
  {
    icon: <Square className="w-6 h-6" />,
    title: 'Laminate Flooring',
    description: 'Hard-wearing, scratch-resistant and budget-friendly. Hundreds of decors from rustic oak to modern grey.',
    cta: 'Get a quote',
  },
  {
    icon: <Droplet className="w-6 h-6" />,
    title: 'Luxury Vinyl & LVT',
    description: 'Waterproof, warm underfoot and ideal for kitchens and bathrooms. Click-fit or fully glue-down.',
    cta: 'Get a quote',
  },
  {
    icon: <SprayCan className="w-6 h-6" />,
    title: 'Sanding & Restoration',
    description: 'Bring tired solid floors back to life. Sanding, gap-filling and choice of oil, wax or lacquer finishes.',
    cta: 'Book a survey',
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Subfloor Preparation',
    description: 'Self-levelling screed, moisture barriers, ply overlays — the unseen work that makes a floor last.',
    cta: 'Learn more',
  },
]

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE },
  }),
}

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} className="py-24 bg-[#0A0807]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center gap-3"
        >
          <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
            What We Do
          </span>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Flooring, end-to-end.
          </h2>
          <p className="text-white/50 max-w-lg">
            Supply, fit, prep and finish. Whether it&apos;s a single room or a full house, we handle every step under one roof.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group relative glass-card rounded-2xl p-7 flex flex-col gap-5 cursor-default overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(200,132,42,0.25), 0 0 32px rgba(200,132,42,0.10)' }}
              />

              <div className="w-12 h-12 rounded-xl bg-[#C8842A]/15 border border-[#C8842A]/20 flex items-center justify-center text-[#C8842A] group-hover:bg-[#C8842A] group-hover:text-white group-hover:border-[#C8842A] transition-all duration-300">
                {service.icon}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {service.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
              </div>

              <Link
                href="#quote"
                className="inline-flex items-center gap-1.5 text-[#C8842A] text-sm font-semibold hover:gap-3 transition-all duration-200"
              >
                {service.cta}
                <span className="text-lg leading-none">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
