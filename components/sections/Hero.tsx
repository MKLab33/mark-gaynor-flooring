'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, FileText, ChevronDown } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const STATS = [
  { value: 'Engineered', label: 'Real-Wood Quality' },
  { value: 'Herringbone', label: 'Parquet Specialists' },
  { value: 'Free', label: 'On-Site Quote' },
]

interface Plank {
  x: number
  y: number
  w: number
  h: number
  rot: number
  shade: string
  delay: number
}

const PLANK_W = 70
const PLANK_H = 22

// Build a herringbone-style fan around centre. Each pair of planks at perpendicular angles.
function buildHerringbone(): Plank[] {
  const planks: Plank[] = []
  const shades = ['#7B4A1F', '#8E5826', '#A2682E', '#6E3F18', '#945E29', '#7E4B1E']
  const cx = 240
  const cy = 230
  // Three rows of chevrons
  const rows = 4
  const cols = 5
  let i = 0
  for (let r = -rows / 2; r < rows / 2; r++) {
    for (let c = -cols / 2; c < cols / 2; c++) {
      const baseX = cx + c * (PLANK_W * 0.86)
      const baseY = cy + r * (PLANK_H * 2.2)
      // left plank
      planks.push({
        x: baseX,
        y: baseY,
        w: PLANK_W,
        h: PLANK_H,
        rot: -45,
        shade: shades[i % shades.length],
        delay: 0.1 + (Math.abs(r) + Math.abs(c)) * 0.05,
      })
      // right plank, offset
      planks.push({
        x: baseX + PLANK_W * 0.5,
        y: baseY + PLANK_H * 0.5,
        w: PLANK_W,
        h: PLANK_H,
        rot: 45,
        shade: shades[(i + 3) % shades.length],
        delay: 0.18 + (Math.abs(r) + Math.abs(c)) * 0.05,
      })
      i++
    }
  }
  return planks
}

const PLANKS = buildHerringbone()

interface Callout {
  x: number
  y: number
  label: string
  value: string
  delay: number
  anchor: 'start' | 'end'
}

const CALLOUTS: Callout[] = [
  { x: 70, y: 90, label: 'PLANK', value: '20mm Engineered Oak', delay: 1.6, anchor: 'start' },
  { x: 410, y: 130, label: 'FINISH', value: 'UV-Cured Lacquer', delay: 1.8, anchor: 'end' },
  { x: 60, y: 360, label: 'PATTERN', value: 'Herringbone Parquet', delay: 2.0, anchor: 'start' },
  { x: 420, y: 380, label: 'FIT', value: 'Glue-Down · Floating', delay: 2.2, anchor: 'end' },
]

function HerringboneSVG() {
  return (
    <div className="relative w-full max-w-[520px] lg:max-w-[560px] select-none">
      <svg viewBox="0 0 480 460" className="w-full" style={{ overflow: 'visible' }} aria-hidden="true">
        {/* Glow behind */}
        <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8842A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#C8842A" stopOpacity="0" />
        </radialGradient>
        <ellipse cx={240} cy={230} rx={220} ry={180} fill="url(#amberGlow)" />

        {/* Floor base shadow */}
        <ellipse cx={240} cy={420} rx={210} ry={10} fill="rgba(0,0,0,0.4)" />

        {/* Planks */}
        <g style={{ transformOrigin: '240px 230px' }}>
          {PLANKS.map((p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: p.rot }}
              animate={{ opacity: 1, scale: 1, rotate: p.rot }}
              transition={{
                duration: 0.55,
                delay: p.delay,
                ease: EASE,
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              <g transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}>
                <rect
                  x={-PLANK_W / 2}
                  y={-PLANK_H / 2}
                  width={PLANK_W}
                  height={PLANK_H}
                  rx="1.5"
                  fill={p.shade}
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth="0.6"
                />
                {/* wood grain lines */}
                <line x1={-PLANK_W / 2 + 6} y1={-PLANK_H / 2 + 5} x2={PLANK_W / 2 - 6} y2={-PLANK_H / 2 + 5} stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
                <line x1={-PLANK_W / 2 + 6} y1={0} x2={PLANK_W / 2 - 6} y2={0} stroke="rgba(255,255,255,0.06)" strokeWidth="0.4" />
                <line x1={-PLANK_W / 2 + 6} y1={PLANK_H / 2 - 5} x2={PLANK_W / 2 - 6} y2={PLANK_H / 2 - 5} stroke="rgba(0,0,0,0.2)" strokeWidth="0.4" />
              </g>
            </motion.g>
          ))}
        </g>

        {/* Vignette mask edges */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
            <stop offset="60%" stopColor="black" stopOpacity="0" />
            <stop offset="100%" stopColor="#0A0807" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="480" height="460" fill="url(#vignette)" pointerEvents="none" />

        {/* Callouts */}
        {CALLOUTS.map((c) => (
          <motion.g
            key={c.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: c.delay }}
          >
            {/* Tick line into floor */}
            <motion.line
              x1={c.x}
              y1={c.y}
              x2={c.anchor === 'start' ? c.x + 30 : c.x - 30}
              y2={c.y}
              stroke="#C8842A"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3, delay: c.delay + 0.1 }}
            />
            <circle cx={c.x} cy={c.y} r={3} fill="#C8842A" />
            <text
              x={c.anchor === 'start' ? c.x + 36 : c.x - 36}
              y={c.y - 3}
              fill="white"
              fontSize="11"
              fontWeight="700"
              textAnchor={c.anchor === 'start' ? 'start' : 'end'}
              fontFamily="var(--font-playfair)"
            >
              {c.value}
            </text>
            <text
              x={c.anchor === 'start' ? c.x + 36 : c.x - 36}
              y={c.y + 9}
              fill="#C8842A"
              fontSize="7"
              fontWeight="700"
              letterSpacing="1.5"
              textAnchor={c.anchor === 'start' ? 'start' : 'end'}
            >
              {c.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden wood-grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(200,132,42,0.08),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0807]/60 via-transparent to-[#0A0807]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-4 items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C8842A]/30 bg-[#C8842A]/10 text-[#C8842A] text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8842A] animate-pulse" />
                Dublin&apos;s Wood Flooring Specialists
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.98] tracking-tight text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Floors Built
              <br />
              to <span className="italic text-[#C8842A]">Last</span>
              <span className="text-[#C8842A]">.</span>
              <br />
              Fitted to Last.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-md leading-relaxed">
              Engineered oak, herringbone parquet, laminate and luxury vinyl — supplied and laid by Mark Gaynor across Dublin and Leinster. Honest pricing, craftsman finish.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="#quote"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C8842A] hover:bg-[#b3741f] text-white font-bold text-lg rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-amber-700/30 active:scale-[0.98]"
              >
                <FileText className="w-5 h-5" />
                Get a Free Quote
              </Link>
              <a
                href="tel:+353877678389"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-[#C8842A]" />
                087 767 8389
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-6 pt-4 border-t border-white/8"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-xl font-bold text-[#C8842A]" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <HerringboneSVG />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
