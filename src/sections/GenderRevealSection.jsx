import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { BalloonIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * Teddy Bear Component - Pink with Glow
 */
function PinkTeddyBear({ className = '' }) {
  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(249,168,212,0.45) 0%, transparent 70%)',
          transform: 'scale(1.7)',
          zIndex: -1,
        }}
        animate={{ scale: [1.5, 1.9, 1.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.svg
        className={className}
        viewBox="0 0 680 500"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Ears (behind head) */}
        <circle cx="255" cy="155" r="48" fill="#f4a0c0" />
        <circle cx="425" cy="155" r="48" fill="#f4a0c0" />
        {/* Ear inner */}
        <circle cx="255" cy="155" r="28" fill="#f9c0d5" />
        <circle cx="425" cy="155" r="28" fill="#f9c0d5" />

        {/* Body */}
        <ellipse cx="340" cy="360" rx="90" ry="105" fill="#f4a0c0" />

        {/* Head */}
        <circle cx="340" cy="220" r="100" fill="#f4a0c0" />

        {/* Snout */}
        <ellipse cx="340" cy="248" rx="52" ry="40" fill="#f9c0d5" />

        {/* Belly patch */}
        <ellipse cx="340" cy="360" rx="58" ry="72" fill="#f9c0d5" />

        {/* Eyes */}
        <circle cx="308" cy="205" r="13" fill="#2d1a1a" />
        <circle cx="372" cy="205" r="13" fill="#2d1a1a" />
        {/* Eye shine */}
        <circle cx="313" cy="200" r="5" fill="white" />
        <circle cx="377" cy="200" r="5" fill="white" />

        {/* Nose */}
        <ellipse cx="340" cy="235" rx="10" ry="7" fill="#c0547a" />

        {/* Mouth */}
        <path d="M 325 248 Q 340 262 355 248" stroke="#c0547a" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <ellipse cx="228" cy="350" rx="36" ry="65" fill="#f4a0c0" transform="rotate(-12 228 350)" />
        <ellipse cx="452" cy="350" rx="36" ry="65" fill="#f4a0c0" transform="rotate(12 452 350)" />

        {/* Legs */}
        <ellipse cx="295" cy="448" rx="42" ry="30" fill="#f4a0c0" />
        <ellipse cx="385" cy="448" rx="42" ry="30" fill="#f4a0c0" />
        {/* Paw pads */}
        <ellipse cx="295" cy="455" rx="28" ry="18" fill="#f9c0d5" />
        <ellipse cx="385" cy="455" rx="28" ry="18" fill="#f9c0d5" />

        {/* Heart on belly */}
        <path d="M 340 348 C 340 348 325 334 318 340 C 311 346 318 358 340 370 C 362 358 369 346 362 340 C 355 334 340 348 340 348 Z" fill="#e8608a" />
      </motion.svg>
    </motion.div>
  )
}

/**
 * Teddy Bear Component - Blue with Glow
 */
function BlueTeddyBear({ className = '' }) {
  return (
    <motion.div className="relative" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.45) 0%, transparent 70%)',
          transform: 'scale(1.7)',
          zIndex: -1,
        }}
        animate={{ scale: [1.5, 1.9, 1.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      <motion.svg
        className={className}
        viewBox="0 0 680 500"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      >
        {/* Ears (behind head) */}
        <circle cx="255" cy="155" r="48" fill="#93c5fd" />
        <circle cx="425" cy="155" r="48" fill="#93c5fd" />
        {/* Ear inner */}
        <circle cx="255" cy="155" r="28" fill="#bfdbfe" />
        <circle cx="425" cy="155" r="28" fill="#bfdbfe" />

        {/* Body */}
        <ellipse cx="340" cy="360" rx="90" ry="105" fill="#93c5fd" />

        {/* Head */}
        <circle cx="340" cy="220" r="100" fill="#93c5fd" />

        {/* Snout */}
        <ellipse cx="340" cy="248" rx="52" ry="40" fill="#bfdbfe" />

        {/* Belly patch */}
        <ellipse cx="340" cy="360" rx="58" ry="72" fill="#bfdbfe" />

        {/* Eyes */}
        <circle cx="308" cy="205" r="13" fill="#1e2d3d" />
        <circle cx="372" cy="205" r="13" fill="#1e2d3d" />
        {/* Eye shine */}
        <circle cx="313" cy="200" r="5" fill="white" />
        <circle cx="377" cy="200" r="5" fill="white" />

        {/* Nose */}
        <ellipse cx="340" cy="235" rx="10" ry="7" fill="#2563eb" />

        {/* Mouth */}
        <path d="M 325 248 Q 340 262 355 248" stroke="#2563eb" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Arms */}
        <ellipse cx="228" cy="350" rx="36" ry="65" fill="#93c5fd" transform="rotate(-12 228 350)" />
        <ellipse cx="452" cy="350" rx="36" ry="65" fill="#93c5fd" transform="rotate(12 452 350)" />

        {/* Legs */}
        <ellipse cx="295" cy="448" rx="42" ry="30" fill="#93c5fd" />
        <ellipse cx="385" cy="448" rx="42" ry="30" fill="#93c5fd" />
        {/* Paw pads */}
        <ellipse cx="295" cy="455" rx="28" ry="18" fill="#bfdbfe" />
        <ellipse cx="385" cy="455" rx="28" ry="18" fill="#bfdbfe" />

        {/* Star on belly */}
        <path d="M 340 330 L 346 345 L 362 345 L 349 355 L 354 370 L 340 361 L 326 370 L 331 355 L 318 345 L 334 345 Z" fill="#1d4ed8" />
      </motion.svg>
    </motion.div>
  )
}

/**
 * Decorative Star Component
 */
function Star({ delay = 0, position = 'top-left' }) {
  return (
    <motion.svg
      className="hidden sm:block absolute w-6 sm:w-8 text-yellow-300"
      viewBox="0 0 24 24"
      fill="currentColor"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6 }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </motion.svg>
  )
}

/**
 * Gradient Gift Box Component - Pink to Blue
 */
function GradientGiftBox({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFB6D9', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FF69B4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4A90E2', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Main Gift Box */}
      <rect x="30" y="50" width="140" height="120" fill="url(#giftGradient)" rx="8" />

      {/* Box Shadow/Depth */}
      <rect x="30" y="50" width="140" height="120" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" rx="8" />

      {/* Top Lid */}
      <rect x="20" y="35" width="160" height="30" fill="url(#giftGradient)" rx="8" />
      <ellipse cx="100" cy="35" rx="80" ry="12" fill="rgba(255,255,255,0.2)" />

      {/* Vertical Ribbon (Gold) */}
      <rect x="92" y="25" width="16" height="155" fill="url(#ribbonGradient)" rx="2" />

      {/* Horizontal Ribbon (Gold) */}
      <rect x="25" y="59" width="150" height="16" fill="url(#ribbonGradient)" rx="2" />

      {/* Ribbon Bow - Left Loop */}
      <ellipse cx="70" cy="35" rx="18" ry="22" fill="url(#ribbonGradient)" opacity="0.9" />
      <ellipse cx="68" cy="35" rx="10" ry="14" fill="white" opacity="0.3" />

      {/* Ribbon Bow - Right Loop */}
      <ellipse cx="130" cy="35" rx="18" ry="22" fill="url(#ribbonGradient)" opacity="0.9" />
      <ellipse cx="132" cy="35" rx="10" ry="14" fill="white" opacity="0.3" />

      {/* Bow Center */}
      <circle cx="100" cy="35" r="12" fill="url(#ribbonGradient)" />
      <circle cx="100" cy="35" r="8" fill="rgba(255,215,0,0.6)" />

      {/* Highlight on box */}
      <ellipse cx="80" cy="90" rx="30" ry="20" fill="white" opacity="0.15" />

      {/* Gift Tag */}
      <rect x="140" y="70" width="45" height="35" fill="white" rx="4" />
      <text x="162" y="93" fontSize="20" textAnchor="middle" fill="#FF69B4" fontWeight="bold">
        ♥
      </text>
    </svg>
  )
}

/**
 * SLIDE 3 — Enhanced Gender Reveal Announcement
 * Interactive gift box with teddy bears, improved design, and festive elements
 */
export default function GenderRevealSection() {
  const [opened, setOpened] = useState(false)
  const { genderBurst, fireworks } = useConfetti()
  const { status, revealTextBoy, revealTextGirl, revealTextSurprise, subTextSurprise } =
    eventConfig.genderReveal

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    genderBurst(status)
    setTimeout(() => fireworks(), 300)
  }

  const revealColorClasses =
    status === 'boy'
      ? 'from-blue-50 via-white to-blue-50 text-blue-700'
      : status === 'girl'
      ? 'from-pink-50 via-white to-pink-50 text-pink-700'
      : 'from-purple-50 via-white to-yellow-50 text-purple-700'

  const accentColor =
    status === 'boy' ? '#4A90E2' : status === 'girl' ? '#FF69B4' : '#9B59B6'

  const revealText =
    status === 'boy' ? revealTextBoy : status === 'girl' ? revealTextGirl : revealTextSurprise

  const borderColor =
    status === 'boy'
      ? 'border-blue-300'
      : status === 'girl'
      ? 'border-pink-300'
      : 'border-purple-300'

  return (
    <SectionContainer
      id="gender-reveal"
      background={
        <FloatingBackground layers={['stars']} gradient="from-blue-100 via-pink-50 to-purple-100" />
      }
      className="text-center flex flex-col items-center justify-center relative"
    >
      {/* Decorative Stars */}
      <Star delay={0} />
      <Star delay={0.2} />
      <Star delay={0.4} />

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-1"
      >
        <h2 className="font-heading text-2xl sm:text-4xl text-[#5B4B66]/50 md:text-5xl font-bold mb-2">
          Am I a <span className="text-baby-blue-deep">BOY</span> or a <span className="text-soft-pink-deep">GIRL</span>?
        </h2>
        <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-blue-400" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="font-body text-sm sm:text-base md:text-lg text-gray-600 mb-6 max-w-xl leading-relaxed px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Open the gift to reveal!
      </motion.p>

      {/* Main Content Area */}
      <div className="relative w-full max-w-2xl px-4 sm:px-6">
        {/* Teddy Bears - Left and Right (desktop) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <PinkTeddyBear className="w-32 h-32 sm:w-40 sm:h-40" />
          </motion.div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <BlueTeddyBear className="w-32 h-32 sm:w-40 sm:h-40" />
          </motion.div>
        </div>

        {/* Teddy Bears for Mobile */}
        <div className="flex justify-center gap-5 mb-6 lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <PinkTeddyBear className="w-32 h-32 sm:w-40 sm:h-40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <BlueTeddyBear className="w-32 h-32 sm:w-40 sm:h-40" />
          </motion.div>
        </div>

        {/* Gift Box and Reveal Card */}
        <div className="relative flex items-center justify-center min-h-[280px] sm:min-h-[320px]">
          {/* Decorative balloons */}
          <motion.div
            className="absolute -left-20 -top-10 hidden md:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BalloonIcon color="#FFB6D9" className="w-12 h-12" />
          </motion.div>
          <motion.div
            className="absolute -right-20 -top-10 hidden md:block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <BalloonIcon color="#A7D8FF" className="w-12 h-12" />
          </motion.div>

          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.button
                key="closed"
                type="button"
                onClick={handleOpen}
                aria-label="Open the gift box to reveal the surprise"
                className="relative cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-pink-400 rounded-3xl transition-transform duration-200"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 15 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
              <div className="relative">
                <GradientGiftBox className="w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 drop-shadow-2xl" />

                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-200 via-pink-100 to-blue-200"
                  animate={{
                    opacity: [0.35, 0.7, 0.35],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
                <motion.p
                  className="font-heading text-lg sm:text-2xl md:text-3xl font-bold text-soft-pink-deep mt-2 sm:mt-4 drop-shadow-sm"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Tap to Open! ✨
                </motion.p>
              </motion.button>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
                className={`w-full max-w-md invite-card bg-gradient-to-br ${revealColorClasses} rounded-3xl px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 shadow-2xl border-4 ${borderColor}`}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: accentColor }} />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="mb-3 sm:mb-4"
                >
                  <span className="text-3xl sm:text-5xl">
                    {status === 'boy' ? '👦' : status === 'girl' ? '👧' : '🎉'}
                  </span>
                </motion.div>

                <motion.p
                  className="font-heading text-2xl sm:text-4xl md:text-6xl font-bold leading-tight"
                  style={{ color: accentColor }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {revealText}
                </motion.p>

                {status === 'surprise' && (
                  <motion.p
                    className="font-body text-base sm:text-lg mt-6 text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {subTextSurprise}
                  </motion.p>
                )}

                {status !== 'surprise' && (
                  <motion.div
                    className="mt-8 pt-6 border-t-2 border-opacity-30"
                    style={{ borderColor: accentColor }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <p className="font-body text-sm sm:text-base text-gray-600">
                      {status === 'boy'
                        ? "We're having a sweet little boy! 💙"
                        : "We're having a beautiful little girl! 💗"}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionContainer>
  )
}