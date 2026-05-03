'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react'

const HOURS = [
  { day: 'Monday – Friday', time: '9:00am – 6:00pm', open: true },
  { day: 'Saturday', time: '10:00am – 3:00pm', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
]

const SERVICE_AREAS = [
  'Dublin City',
  'South Dublin',
  'North Dublin',
  'Fingal',
  'Dún Laoghaire–Rathdown',
  'Wicklow',
  'Kildare',
  'Meath',
]

export default function LocationMap() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="location" ref={ref} className="py-24 bg-[#0A0807]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#C8842A] text-xs font-bold tracking-[0.2em] uppercase">
            Where We Work
          </span>
          <h2
            className="mt-3 text-4xl sm:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Dublin &amp; the Greater Leinster Area
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <h3
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Get in Touch
              </h3>

              <div className="flex gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-[#C8842A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">Mobile fitting service</p>
                  <p className="text-sm">Based in Dublin · we travel to you</p>
                </div>
              </div>

              <a
                href="tel:+353877678389"
                className="flex gap-3 items-center text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5 text-[#C8842A] flex-shrink-0" />
                <div className="text-sm">
                  <p>087 767 8389</p>
                </div>
              </a>

              <a
                href="https://wa.me/353877678389"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 items-center text-white/60 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-[#C8842A] flex-shrink-0" />
                <span className="text-sm">WhatsApp — send photos for fast quote</span>
              </a>
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#C8842A]" />
                <h3
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Opening Hours
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {HOURS.map(({ day, time, open }) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-sm text-white/60">{day}</span>
                    <span
                      className={`text-sm font-medium ${open ? 'text-white' : 'text-white/30'}`}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/8">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-white/40">Same-week site surveys most weeks</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl overflow-hidden border border-white/8 h-[300px]">
              <iframe
                title="Mark Gaynor Flooring service area"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d76216.4!2d-6.27!3d53.35!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin!5e0!3m2!1sen!2sie!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.6)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="glass-card rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-[0.18em]">
                We cover
              </h3>
              <div className="flex flex-wrap gap-2">
                {SERVICE_AREAS.map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1.5 rounded-full bg-[#C8842A]/8 border border-[#C8842A]/20 text-[#C8842A]/90 text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <p className="text-white/40 text-xs pt-1">
                Outside this area? Give us a call — we travel for the right job.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
