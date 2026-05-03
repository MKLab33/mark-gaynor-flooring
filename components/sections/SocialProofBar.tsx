'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Hammer, MapPin, Layers, Shield } from 'lucide-react'

interface Stat {
  icon: React.ReactNode
  target: number
  prefix?: string
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { icon: <Hammer className="w-6 h-6" />, target: 500, suffix: '+', label: 'Floors Fitted' },
  { icon: <Layers className="w-6 h-6" />, target: 25, suffix: 'mm', label: 'Up to Plank Thickness' },
  { icon: <MapPin className="w-6 h-6" />, target: 12, suffix: ' Counties', label: 'Service Area' },
  { icon: <Shield className="w-6 h-6" />, target: 100, suffix: '%', label: 'Workmanship Guarantee' },
]

function CountUp({ target, suffix, prefix = '' }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1700
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{Math.floor(count)}{suffix}
    </span>
  )
}

export default function SocialProofBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative py-12 bg-[#14110D] border-y border-white/6 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(200,132,42,0.05)_60%,transparent_80%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#C8842A]/10 border border-[#C8842A]/20 flex items-center justify-center text-[#C8842A]">
                {stat.icon}
              </div>
              <div
                className="text-3xl sm:text-4xl font-bold text-white leading-none"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-sm text-white/50 uppercase tracking-wider leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
