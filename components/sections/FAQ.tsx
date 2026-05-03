'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    question: 'Do you supply the floor or just fit it?',
    answer:
      "Both. Most customers prefer us to supply the materials — we get trade pricing on top brands and pass that on. If you've already bought your own floor, that's no problem either, we'll fit it for a labour-only rate.",
  },
  {
    question: 'How long does a typical job take?',
    answer:
      'A single living room is usually a one-day job once the subfloor is right. A full ground floor — kitchen, hallway, living and dining — is typically 3–5 days including prep. Herringbone takes about 30% longer than straight plank because of the cuts.',
  },
  {
    question: 'Can you fit over my underfloor heating?',
    answer:
      "Yes — engineered oak, laminate and LVT are all UFH-compatible if installed correctly. Solid wood is generally not recommended over UFH. We'll always check the system spec on a site visit before quoting.",
  },
  {
    question: 'Do I need to remove my old floor first?',
    answer:
      "We'll lift and dispose of the old floor as part of the job — carpet, vinyl, tiles or old laminate. Skirting boards can usually stay in place, with the new floor running up to a scotia or beading.",
  },
  {
    question: 'What about subfloor preparation?',
    answer:
      'A bouncy or uneven floor is the most common reason a new floor fails early. We always check the subfloor before quoting and use self-levelling compound, ply overlay or moisture barriers as required. Honest prep is the difference between a 5-year floor and a 25-year floor.',
  },
  {
    question: 'Engineered wood vs solid wood — which should I choose?',
    answer:
      "For most modern homes, engineered. The plywood base means it doesn't move with humidity changes, it's suitable for underfloor heating, and a quality 4–6mm wear layer can be sanded just like solid. Solid wood still has a place in period properties but isn't the right pick for a kitchen or anywhere with UFH.",
  },
  {
    question: 'Do you offer a guarantee on your work?',
    answer:
      "Yes — every fit is covered by a 12-month workmanship guarantee. The flooring itself carries the manufacturer's warranty (usually 15–30 years for engineered oak, 25 years for premium laminate, lifetime structural for top LVT brands).",
  },
  {
    question: 'Can I see samples before deciding?',
    answer:
      'Absolutely. We bring a sample case to every site visit so you can hold a real plank up to your wall, your other furniture and the natural light in the room. Pictures online never quite capture it.',
  },
]

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`glass-card rounded-2xl overflow-hidden border transition-colors duration-300 ${isOpen ? 'border-[#C8842A]/25' : 'border-white/8'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`font-bold text-sm sm:text-base transition-colors duration-200 ${isOpen ? 'text-white' : 'text-white/80'}`}
        >
          {item.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
          isOpen ? 'bg-[#C8842A] border-[#C8842A] text-white' : 'border-white/15 text-white/40'
        }`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 text-white/55 text-sm leading-relaxed border-t border-white/6 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section id="faq" ref={ref} className="py-24 bg-[#14110D]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
            Got Questions?
          </span>
          <h2
            className="mt-3 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-3"
        >
          {FAQS.map((faq, i) => (
            <FAQAccordion
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
