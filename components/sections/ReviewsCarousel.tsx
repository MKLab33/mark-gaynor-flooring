'use client'

import { useRef, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Review {
  name: string
  location: string
  text: string
  job: string
}

const REVIEWS: Review[] = [
  {
    name: 'Aisling D.',
    location: 'Rathmines',
    job: 'Herringbone Engineered Oak',
    text: 'Mark was a pleasure from start to finish. The herringbone in the living room and hall is absolutely stunning — neighbours keep asking who did it. Spotless work, no mess left behind.',
  },
  {
    name: 'Conor M.',
    location: 'Stillorgan',
    job: 'Engineered Oak Through Ground Floor',
    text: 'Got three quotes — Mark was the most thorough and the most honest about subfloor prep. Took longer than the others promised but the finish is flawless and the floor is rock solid underfoot.',
  },
  {
    name: 'Niamh R.',
    location: 'Drumcondra',
    job: 'Laminate, Three Bedrooms',
    text: 'Quick turnaround, fair price and lovely finish. He even moved the wardrobe back for us. Will definitely have him back for the kitchen LVT next year.',
  },
  {
    name: 'Brendan O.',
    location: 'Lucan',
    job: 'Sanding & Re-finishing 1930s Pitch Pine',
    text: 'I thought the original pine was a write-off. Mark sanded and oiled it and the floor is the showpiece of the house now. Massive difference, fraction of replacement cost.',
  },
  {
    name: 'Sarah K.',
    location: 'Howth',
    job: 'LVT in Kitchen & Utility',
    text: 'Brilliant job. Waterproof LVT down on a tricky uneven slab — Mark levelled it properly first, no bouncing or hollow spots. Looks like real timber.',
  },
  {
    name: 'David L.',
    location: 'Greystones',
    job: 'Full House Engineered Oak',
    text: 'Three storeys, four flights of stairs, all done in a week with a team that knew exactly what they were doing. Tidy, polite, on time. Worth every cent.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#C8842A] text-[#C8842A]" />
      ))}
    </div>
  )
}

export default function ReviewsCarousel() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="reviews" ref={sectionRef} className="py-24 bg-[#14110D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
              Customer Stories
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              What our customers say.
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <Stars />
              <span className="text-white font-bold text-sm">5.0</span>
              <span className="text-white/40 text-sm">· verified Dublin homeowners</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              aria-label="Previous review"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-[#C8842A]/50 bg-white/3 hover:bg-[#C8842A]/10 flex items-center justify-center text-white/60 hover:text-[#C8842A] transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next review"
              className="w-11 h-11 rounded-full border border-white/10 hover:border-[#C8842A]/50 bg-white/3 hover:bg-[#C8842A]/10 flex items-center justify-center text-white/60 hover:text-[#C8842A] transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={emblaRef}
          className="overflow-hidden"
        >
          <div className="flex gap-5">
            {REVIEWS.map((review) => (
              <div
                key={review.name + review.job}
                className="flex-none w-[85vw] sm:w-[380px] lg:w-[360px]"
              >
                <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 h-full">
                  <Stars />
                  <p className="text-white/70 text-sm leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/8">
                    <div>
                      <div className="font-bold text-white text-sm">{review.name}</div>
                      <div className="text-white/40 text-xs">{review.location}</div>
                    </div>
                    <span className="text-[#C8842A]/80 text-[10px] font-semibold uppercase tracking-wider text-right max-w-[140px] leading-tight">
                      {review.job}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
