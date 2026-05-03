'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, RotateCcw, ArrowRight } from 'lucide-react'

type Room = 'living' | 'bedroom' | 'kitchen' | 'bathroom' | 'hallway'
type Budget = 'value' | 'mid' | 'premium'
type Look = 'classic' | 'modern' | 'rustic'

interface Recommendation {
  title: string
  subtitle: string
  blurb: string
  why: string[]
}

const ROOM_LABELS: Record<Room, string> = {
  living: 'Living / Dining',
  bedroom: 'Bedrooms',
  kitchen: 'Kitchen',
  bathroom: 'Bathroom / Utility',
  hallway: 'Hall & Stairs',
}

const BUDGET_LABELS: Record<Budget, string> = {
  value: 'Value (€20–€35 / m²)',
  mid: 'Mid-Range (€35–€65 / m²)',
  premium: 'Premium (€65+ / m²)',
}

const LOOK_LABELS: Record<Look, string> = {
  classic: 'Classic Oak',
  modern: 'Modern / Grey',
  rustic: 'Rustic / Character',
}

function recommend(room: Room, budget: Budget, look: Look): Recommendation {
  // Wet rooms — push LVT
  if (room === 'kitchen' || room === 'bathroom') {
    return {
      title: 'Luxury Vinyl Tile (LVT)',
      subtitle: 'Waterproof, warm and quiet underfoot',
      blurb: `For ${ROOM_LABELS[room].toLowerCase()}, LVT is the smart choice — fully waterproof, soft on the feet and incredibly hard-wearing. Modern LVT looks remarkably like real timber.`,
      why: [
        '100% waterproof — no warping near sinks, dishwashers or showers',
        'Quiet, soft, warm to walk on barefoot',
        'Easy to clean and replace individual planks if damaged',
      ],
    }
  }

  // Premium budget anywhere → engineered oak / herringbone
  if (budget === 'premium') {
    return {
      title: look === 'classic' ? 'Herringbone Engineered Oak' : 'Wide-Plank Engineered Oak',
      subtitle: 'Real oak with the stability of an engineered base',
      blurb: `Top-tier real wood — a 4–6mm oak wear layer over multi-ply that won't move with the seasons. Compatible with underfloor heating and re-sandable down the line.`,
      why: [
        'Genuine oak surface that adds value to your home',
        'Compatible with underfloor heating — won\'t cup or warp',
        'Can be sanded and refinished in 15–20 years\' time',
      ],
    }
  }

  // Mid + classic/rustic → engineered oak
  if (budget === 'mid' && look !== 'modern') {
    return {
      title: 'Engineered Oak (Plank or Wide)',
      subtitle: 'Real wood, sensible price',
      blurb: 'A 3mm oak wear layer over a stable plywood base — the sweet spot of looks, longevity and price. Available in dozens of stains and finishes.',
      why: [
        'Real oak surface, not a printed image',
        'Great with underfloor heating',
        'Wide range of widths and finishes',
      ],
    }
  }

  // Mid + modern look → high-end laminate or LVT
  if (budget === 'mid' && look === 'modern') {
    return {
      title: 'Premium AC5 Laminate',
      subtitle: 'High-resolution decor, super durable',
      blurb: 'Modern laminate is a different animal to the cheap stuff of 15 years ago — embossed grain, grey and stone-look decors and rated for heavy domestic use.',
      why: [
        'Scratch and dent resistant — kid and pet friendly',
        'Huge variety of modern looks',
        'Click-fit so easy to lift later if you change your mind',
      ],
    }
  }

  // Value tier
  return {
    title: 'AC4 Laminate Flooring',
    subtitle: 'Smart-budget, hard-wearing',
    blurb: 'Quality laminate at the value end is fantastic in bedrooms and lower-traffic rooms. A great way to refresh a whole house without a premium outlay.',
    why: [
      'Best price-per-m² of any flooring type',
      'Quick to install — minimal disruption',
      'Hundreds of looks to suit any decor',
    ],
  }
}

export default function FloorFinder() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [room, setRoom] = useState<Room | null>(null)
  const [budget, setBudget] = useState<Budget | null>(null)
  const [look, setLook] = useState<Look | null>(null)

  const reset = () => { setRoom(null); setBudget(null); setLook(null) }

  const result = room && budget && look ? recommend(room, budget, look) : null

  const optBtn = (active: boolean) =>
    `py-3 px-4 rounded-xl text-sm font-medium border text-left transition-all duration-200 ${
      active
        ? 'bg-[#C8842A] border-[#C8842A] text-white'
        : 'bg-white/3 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
    }`

  return (
    <section id="floor-finder" ref={ref} className="py-24 bg-[#0A0807] relative overflow-hidden parquet-bg">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,132,42,0.05),transparent)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive
          </span>
          <h2
            className="mt-3 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Floor Finder
          </h2>
          <p className="mt-3 text-white/50">
            Three quick questions and we&apos;ll suggest the right floor for your space and budget.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-8"
              >
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">1. Which room?</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(ROOM_LABELS) as Room[]).map((r) => (
                      <button key={r} onClick={() => setRoom(r)} className={optBtn(room === r)}>
                        {ROOM_LABELS[r]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">2. Budget per m²?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(BUDGET_LABELS) as Budget[]).map((b) => (
                      <button key={b} onClick={() => setBudget(b)} className={optBtn(budget === b)}>
                        {BUDGET_LABELS[b]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider">3. Look you like?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {(Object.keys(LOOK_LABELS) as Look[]).map((l) => (
                      <button key={l} onClick={() => setLook(l)} className={optBtn(look === l)}>
                        {LOOK_LABELS[l]}
                      </button>
                    ))}
                  </div>
                </div>

                {!result && (
                  <p className="text-white/30 text-xs text-center pt-2">
                    Pick all three to see your recommendation.
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex flex-col gap-2">
                    <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
                      Our recommendation
                    </span>
                    <h3
                      className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {result.title}
                    </h3>
                    <p className="text-[#C8842A] text-sm font-semibold">{result.subtitle}</p>
                  </div>
                  <button
                    onClick={reset}
                    className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Start over
                  </button>
                </div>

                <p className="text-white/60 leading-relaxed">{result.blurb}</p>

                <div className="bg-[#0A0807]/60 border border-white/8 rounded-xl p-5">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">Why it suits you</p>
                  <ul className="flex flex-col gap-2.5">
                    {result.why.map((reason) => (
                      <li key={reason} className="flex items-start gap-2.5 text-white/70 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C8842A] flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#quote"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C8842A] hover:bg-[#b3741f] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-700/30 active:scale-[0.98] w-fit"
                >
                  Get a Quote for {result.title} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
