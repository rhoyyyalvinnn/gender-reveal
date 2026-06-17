import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * Pink Teddy Bear (reused from GenderRevealSection)
 */
function PinkTeddyBear({ className = '' }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 680 500"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <circle cx="255" cy="155" r="48" fill="#f4a0c0" />
      <circle cx="425" cy="155" r="48" fill="#f4a0c0" />
      <circle cx="255" cy="155" r="28" fill="#f9c0d5" />
      <circle cx="425" cy="155" r="28" fill="#f9c0d5" />
      <ellipse cx="340" cy="360" rx="90" ry="105" fill="#f4a0c0" />
      <circle cx="340" cy="220" r="100" fill="#f4a0c0" />
      <ellipse cx="340" cy="248" rx="52" ry="40" fill="#f9c0d5" />
      <ellipse cx="340" cy="360" rx="58" ry="72" fill="#f9c0d5" />
      <circle cx="308" cy="205" r="13" fill="#2d1a1a" />
      <circle cx="372" cy="205" r="13" fill="#2d1a1a" />
      <circle cx="313" cy="200" r="5" fill="white" />
      <circle cx="377" cy="200" r="5" fill="white" />
      <ellipse cx="340" cy="235" rx="10" ry="7" fill="#c0547a" />
      <path d="M 325 248 Q 340 262 355 248" stroke="#c0547a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="228" cy="350" rx="36" ry="65" fill="#f4a0c0" transform="rotate(-12 228 350)" />
      <ellipse cx="452" cy="350" rx="36" ry="65" fill="#f4a0c0" transform="rotate(12 452 350)" />
      <ellipse cx="295" cy="448" rx="42" ry="30" fill="#f4a0c0" />
      <ellipse cx="385" cy="448" rx="42" ry="30" fill="#f4a0c0" />
      <ellipse cx="295" cy="455" rx="28" ry="18" fill="#f9c0d5" />
      <ellipse cx="385" cy="455" rx="28" ry="18" fill="#f9c0d5" />
      <path d="M 340 348 C 340 348 325 334 318 340 C 311 346 318 358 340 370 C 362 358 369 346 362 340 C 355 334 340 348 340 348 Z" fill="#e8608a" />
    </motion.svg>
  )
}

/**
 * Blue Teddy Bear (reused from GenderRevealSection)
 */
function BlueTeddyBear({ className = '' }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 680 500"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    >
      <circle cx="255" cy="155" r="48" fill="#93c5fd" />
      <circle cx="425" cy="155" r="48" fill="#93c5fd" />
      <circle cx="255" cy="155" r="28" fill="#bfdbfe" />
      <circle cx="425" cy="155" r="28" fill="#bfdbfe" />
      <ellipse cx="340" cy="360" rx="90" ry="105" fill="#93c5fd" />
      <circle cx="340" cy="220" r="100" fill="#93c5fd" />
      <ellipse cx="340" cy="248" rx="52" ry="40" fill="#bfdbfe" />
      <ellipse cx="340" cy="360" rx="58" ry="72" fill="#bfdbfe" />
      <circle cx="308" cy="205" r="13" fill="#1e2d3d" />
      <circle cx="372" cy="205" r="13" fill="#1e2d3d" />
      <circle cx="313" cy="200" r="5" fill="white" />
      <circle cx="377" cy="200" r="5" fill="white" />
      <ellipse cx="340" cy="235" rx="10" ry="7" fill="#2563eb" />
      <path d="M 325 248 Q 340 262 355 248" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="228" cy="350" rx="36" ry="65" fill="#93c5fd" transform="rotate(-12 228 350)" />
      <ellipse cx="452" cy="350" rx="36" ry="65" fill="#93c5fd" transform="rotate(12 452 350)" />
      <ellipse cx="295" cy="448" rx="42" ry="30" fill="#93c5fd" />
      <ellipse cx="385" cy="448" rx="42" ry="30" fill="#93c5fd" />
      <ellipse cx="295" cy="455" rx="28" ry="18" fill="#bfdbfe" />
      <ellipse cx="385" cy="455" rx="28" ry="18" fill="#bfdbfe" />
      <path d="M 340 330 L 346 345 L 362 345 L 349 355 L 354 370 L 340 361 L 326 370 L 331 355 L 318 345 L 334 345 Z" fill="#1d4ed8" />
    </motion.svg>
  )
}

/**
 * Logo/Seal Badge Icon — with large prominent t-shirt graphic, no text
 */
function OnesieIcon({ fill, stroke, label, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Outer seal circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill={fill}
        stroke={stroke}
        strokeWidth="4"
      />

      {/* Inner circle border for seal effect */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Decorative dots around the seal */}
      <circle cx="100" cy="18" r="4" fill={stroke} opacity="0.8" />
      <circle cx="150" cy="35" r="4" fill={stroke} opacity="0.8" />
      <circle cx="182" cy="100" r="4" fill={stroke} opacity="0.8" />
      <circle cx="165" cy="165" r="4" fill={stroke} opacity="0.8" />
      <circle cx="100" cy="182" r="4" fill={stroke} opacity="0.8" />
      <circle cx="35" cy="165" r="4" fill={stroke} opacity="0.8" />
      <circle cx="18" cy="100" r="4" fill={stroke} opacity="0.8" />
      <circle cx="35" cy="35" r="4" fill={stroke} opacity="0.8" />

      {/* Large T-Shirt Design */}
      {/* Left sleeve */}
      <path
        d="M 45 65 Q 35 70 40 85 L 60 80 Q 65 70 65 60 Z"
        fill={stroke}
        opacity="0.85"
      />

      {/* Right sleeve */}
      <path
        d="M 155 65 Q 165 70 160 85 L 140 80 Q 135 70 135 60 Z"
        fill={stroke}
        opacity="0.85"
      />

      {/* Main shirt body */}
      <path
        d="M 60 80 L 60 155 Q 60 165 70 165 L 130 165 Q 140 165 140 155 L 140 80 C 140 65 125 55 100 55 C 75 55 60 65 60 80 Z"
        fill={stroke}
        opacity="0.85"
      />

      {/* Shirt neckline - circle */}
      <circle
        cx="100"
        cy="62"
        r="14"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Neck opening - small circle in center */}
      <circle
        cx="100"
        cy="62"
        r="6"
        fill={fill}
      />
    </svg>
  )
}

/**
 * Individual "BABY" letter badges
 */
function BabyBadge({ color }) {
  return (
    <div className="flex gap-0.5">
      {['B', 'A', 'B', 'Y'].map((letter) => (
        <span
          key={letter}
          className="inline-flex items-center justify-center w-4 h-4 rounded text-white font-black"
          style={{ backgroundColor: color, fontSize: '9px' }}
        >
          {letter}
        </span>
      ))}
    </div>
  )
}

/**
 * Decorative twinkling star
 */
function StarDeco({ className = '', delay = 0 }) {
  return (
    <motion.span
      className={`absolute text-yellow-400 text-base select-none pointer-events-none ${className}`}
      animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      ✦
    </motion.span>
  )
}

/**
 * SLIDE 5 — Dress Code / Attire Guide
 * Two-panel card layout — always 2 columns, including on mobile.
 */
export default function AttireSection() {
  const { resortNote } = eventConfig.attire

  const pinkAccent = '#D4537E'
  const blueAccent = '#185FA5'

  return (
    <SectionContainer
      id="attire"
      background={
        <FloatingBackground
          layers={['stars', 'hearts']}
          gradient="from-blue-100 via-pink-50 to-blue-100"
        />
      }
      className="text-center flex flex-col items-center justify-center relative"
    >
      {/* Decorative stars */}
      <StarDeco className="top-3 left-14" delay={0} />
      <StarDeco className="top-6 right-16" delay={0.5} />
      <StarDeco className="bottom-10 left-10" delay={1} />
      <StarDeco className="bottom-8 right-12" delay={0.7} />
      <StarDeco className="top-20 left-5" delay={1.4} />
      <StarDeco className="top-20 right-5" delay={0.3} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-1"
      >
        <h2 className="font-heading text-2xl sm:text-5xl font-black tracking-widest uppercase gradient-text">
          What to Wear?
        </h2>
        <div className="h-1 w-20 mx-auto mt-2 mb-4 rounded-full bg-gradient-to-r from-pink-400 to-blue-400" />
      </motion.div>

      {/* Two-panel cards — always 2 columns */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full max-w-lg px-3 sm:px-4">

        {/* PINK — GIRL card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl border-4 border-pink-300 bg-gradient-to-b from-pink-100 to-pink-50 flex flex-col items-center py-4 px-2 sm:py-6 sm:px-4 gap-2 sm:gap-3 shadow-lg"
        >
          <p className="font-body text-[10px] sm:text-sm font-bold text-[#5B4B66]">Wear</p>

          <p
            className="font-heading text-2xl sm:text-4xl font-black uppercase leading-tight text-soft-pink-deep"
          >
            PINK
          </p>

          <p className="font-body text-[9px] sm:text-xs font-semibold text-[#5B4B66]">
            if you think it's a
          </p>

          <div className="flex flex-col items-center gap-1">
            <BabyBadge color={pinkAccent} />
            <span
              className="font-heading text-lg sm:text-2xl font-black uppercase text-soft-pink-deep"
            >
              GIRL
            </span>
          </div>

          <PinkTeddyBear className="w-20 h-16 sm:w-32 sm:h-28" />

          <OnesieIcon
            fill="#f9c0d5"
            stroke={pinkAccent}
            label="GIRL"
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
        </motion.div>

        {/* BLUE — BOY card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl border-4 border-blue-300 bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center py-4 px-2 sm:py-6 sm:px-4 gap-2 sm:gap-3 shadow-lg"
        >
          <p className="font-body text-[10px] sm:text-sm font-bold text-[#5B4B66]">Wear</p>

          <p
            className="font-heading text-2xl sm:text-4xl font-black uppercase leading-tight text-baby-blue-deep"
          >
            BLUE
          </p>

          <p className="font-body text-[9px] sm:text-xs font-semibold text-[#5B4B66]">
            if you think it's a
          </p>

          <div className="flex flex-col items-center gap-1 ">
            <BabyBadge color={blueAccent} />
            <span
              className="font-heading text-lg sm:text-2xl font-black uppercase text-baby-blue-deep"
            >
              BOY
            </span>
          </div>

          <BlueTeddyBear className="w-20 h-16 sm:w-32 sm:h-28" />

          <OnesieIcon
            fill="#bfdbfe"
            stroke={blueAccent}
            label="BOY"
            className="w-20 h-20 sm:w-24 sm:h-24"
          />
        </motion.div>
      </div>

      {/* Pool / resort note */}
      {resortNote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="invite-card max-w-sm mx-auto mt-4 sm:mt-6 px-4 py-3 sm:px-5 sm:py-4 flex items-start sm:items-center gap-2 sm:gap-3 shadow-md"
        >
          <span className="text-xl sm:text-2xl shrink-0">🏊</span>
          <p className="font-body text-xs sm:text-sm text-[#5B4B66] text-left">
            <span className="font-heading text-soft-pink-deep">Pool tip: </span>
            {resortNote}
          </p>
        </motion.div>
      )}
    </SectionContainer>
  )
}