'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronRight, CheckCircle, Loader2 } from 'lucide-react'
import { getSupabase } from '@/lib/supabase'

type Step = 1 | 2 | 3

interface FormData {
  floorType: string
  serviceType: string
  areaSqm: string
  name: string
  phone: string
  email: string
  message: string
}

const FLOOR_TYPES = [
  'Engineered Oak',
  'Solid Wood',
  'Herringbone / Parquet',
  'Laminate',
  'Luxury Vinyl / LVT',
  'Floor Sanding',
  'Not sure yet',
]

const SERVICE_OPTIONS = [
  'Supply & Fit',
  'Fit Only',
  'Sanding / Restoration',
  'Repair Existing Floor',
  'Site Survey & Quote',
]

const STEP_LABELS = ['Floor Type', 'Service & Size', 'Your Details']

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

export default function QuickQuote() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [step, setStep] = useState<Step>(1)
  const [dir, setDir] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    floorType: '',
    serviceType: '',
    areaSqm: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const goNext = () => {
    setDir(1)
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s))
  }

  const goBack = () => {
    setDir(-1)
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const { error: sbError } = await getSupabase().from('bookings').insert({
        floor_type: form.floorType,
        service_type: form.serviceType,
        area_sqm: form.areaSqm,
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
      })
      if (sbError) throw sbError
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please call us on 087 767 8389 or send us a WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls =
    'w-full bg-[#0A0807] border border-white/10 focus:border-[#C8842A] rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm outline-none transition-colors duration-200'

  return (
    <section id="quote" ref={ref} className="py-24 bg-[#0A0807] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(200,132,42,0.06),transparent)]" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
            Free Quotation
          </span>
          <h2
            className="mt-3 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Get a Quote in Minutes
          </h2>
          <p className="mt-3 text-white/50">
            Tell us a little about your job and we&apos;ll be in touch with a free, no-obligation quote.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 sm:p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-[#C8842A]" />
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Quote Request Received!
              </h3>
              <p className="text-white/60 max-w-sm">
                Thanks {form.name}! Mark will be in touch on {form.phone} shortly to discuss your project and arrange a free site survey.
              </p>
              <button
                onClick={() => { setSubmitted(false); setStep(1); setForm({ floorType: '', serviceType: '', areaSqm: '', name: '', phone: '', email: '', message: '' }) }}
                className="mt-2 text-[#C8842A] text-sm font-semibold hover:underline"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-8">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1
                  const active = step === n
                  const done = step > n
                  return (
                    <div key={label} className="flex items-center gap-2 flex-1 last:flex-none">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            done
                              ? 'bg-[#C8842A] text-white'
                              : active
                              ? 'bg-[#C8842A] text-white ring-4 ring-[#C8842A]/20'
                              : 'bg-white/5 text-white/30 border border-white/10'
                          }`}
                        >
                          {done ? '✓' : n}
                        </div>
                        <span
                          className={`text-xs font-medium hidden sm:block ${active ? 'text-white' : 'text-white/30'}`}
                        >
                          {label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className={`flex-1 h-px mx-2 ${done ? 'bg-[#C8842A]/40' : 'bg-white/8'}`} />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="overflow-hidden min-h-[260px]">
                <AnimatePresence custom={dir} mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="text-lg font-bold text-white">What kind of floor are you thinking about?</h3>
                      <div className="grid grid-cols-2 gap-2.5">
                        {FLOOR_TYPES.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update('floorType', opt)}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border text-left transition-all duration-200 ${
                              form.floorType === opt
                                ? 'bg-[#C8842A] border-[#C8842A] text-white'
                                : 'bg-white/3 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-4"
                    >
                      <h3 className="text-lg font-bold text-white">What service and how big is the area?</h3>
                      <div className="grid grid-cols-2 gap-2.5">
                        {SERVICE_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => update('serviceType', opt)}
                            className={`py-3 px-4 rounded-xl text-sm font-medium border text-left transition-all duration-200 ${
                              form.serviceType === opt
                                ? 'bg-[#C8842A] border-[#C8842A] text-white'
                                : 'bg-white/3 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Approximate area (e.g. 35 m²)"
                        value={form.areaSqm}
                        onChange={(e) => update('areaSqm', e.target.value)}
                        className={inputCls}
                      />
                      <p className="text-white/30 text-xs">
                        Don&apos;t know the size? Pop the room dimensions in the message field on the next step and we&apos;ll work it out.
                      </p>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={dir}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-3"
                    >
                      <h3 className="text-lg font-bold text-white">Your contact details</h3>
                      <input
                        type="text"
                        placeholder="Full Name *"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={inputCls}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputCls}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputCls}
                      />
                      <textarea
                        placeholder="Anything else we should know? (room dimensions, deadline, photos coming via WhatsApp, etc.)"
                        value={form.message}
                        onChange={(e) => update('message', e.target.value)}
                        rows={3}
                        className={`${inputCls} resize-none`}
                      />
                      {error && <p className="text-red-400 text-sm">{error}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex justify-between items-center mt-6 pt-6 border-t border-white/8">
                <button
                  onClick={goBack}
                  className={`text-sm text-white/40 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                >
                  ← Back
                </button>
                {step < 3 ? (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-6 py-3 bg-[#C8842A] hover:bg-[#b3741f] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-700/30 active:scale-[0.98]"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.phone}
                    className="flex items-center gap-2 px-6 py-3 bg-[#C8842A] hover:bg-[#b3741f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-700/30 active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {loading ? 'Sending…' : 'Send Enquiry'}
                  </button>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
