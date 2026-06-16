import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { BalloonIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * Teddy Bear Component - Pink
 */
function PinkTeddyBear({ className = '' }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Body */}
      <ellipse cx="50" cy="70" rx="18" ry="25" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Head */}
      <circle cx="50" cy="40" r="15" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Left Ear */}
      <circle cx="35" cy="25" r="8" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Right Ear */}
      <circle cx="65" cy="25" r="8" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Ears Inner */}
      <circle cx="35" cy="25" r="4" fill="#FFC0E0" />
      <circle cx="65" cy="25" r="4" fill="#FFC0E0" />
      {/* Left Arm */}
      <ellipse cx="28" cy="65" rx="8" ry="16" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Right Arm */}
      <ellipse cx="72" cy="65" rx="8" ry="16" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Left Leg */}
      <ellipse cx="38" cy="95" rx="9" ry="14" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Right Leg */}
      <ellipse cx="62" cy="95" rx="9" ry="14" fill="#FFB6D9" stroke="#FF69B4" strokeWidth="1" />
      {/* Belly */}
      <ellipse cx="50" cy="75" rx="10" ry="14" fill="#FFC0E0" />
      {/* Face - Eyes */}
      <circle cx="43" cy="37" r="2.5" fill="#333" />
      <circle cx="57" cy="37" r="2.5" fill="#333" />
      {/* Nose */}
      <circle cx="50" cy="43" r="2" fill="#FF1493" />
      {/* Mouth */}
      <path
        d="M 50 43 Q 46 46 43 45"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 50 43 Q 54 46 57 45"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

/**
 * Teddy Bear Component - Blue
 */
function BlueTeddyBear({ className = '' }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 120"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    >
      {/* Body */}
      <ellipse cx="50" cy="70" rx="18" ry="25" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Head */}
      <circle cx="50" cy="40" r="15" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Left Ear */}
      <circle cx="35" cy="25" r="8" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Right Ear */}
      <circle cx="65" cy="25" r="8" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Ears Inner */}
      <circle cx="35" cy="25" r="4" fill="#C5E3FF" />
      <circle cx="65" cy="25" r="4" fill="#C5E3FF" />
      {/* Left Arm */}
      <ellipse cx="28" cy="65" rx="8" ry="16" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Right Arm */}
      <ellipse cx="72" cy="65" rx="8" ry="16" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Left Leg */}
      <ellipse cx="38" cy="95" rx="9" ry="14" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Right Leg */}
      <ellipse cx="62" cy="95" rx="9" ry="14" fill="#A7D8FF" stroke="#4A90E2" strokeWidth="1" />
      {/* Belly */}
      <ellipse cx="50" cy="75" rx="10" ry="14" fill="#C5E3FF" />
      {/* Face - Eyes */}
      <circle cx="43" cy="37" r="2.5" fill="#333" />
      <circle cx="57" cy="37" r="2.5" fill="#333" />
      {/* Nose */}
      <circle cx="50" cy="43" r="2" fill="#1E5BA8" />
      {/* Mouth */}
      <path
        d="M 50 43 Q 46 46 43 45"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 50 43 Q 54 46 57 45"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

/**
 * Decorative Star Component
 */
function Star({ delay = 0, position = 'top-left' }) {
  return (
    <motion.svg
      className="absolute w-8 h-8 text-yellow-300"
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
        <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-2">
          Am I a <span className="text-blue-600">BOY</span> or a <span className="text-pink-600">GIRL</span>?
        </h2>
        <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-pink-400 to-blue-400" />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="font-body text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Can't wait to meet our little one? <br />
        <span className="font-semibold text-gray-700">Open the gift to reveal!</span>
      </motion.p>

      {/* Main Content Area */}
      <div className="relative w-full max-w-2xl">
        {/* Teddy Bears - Left and Right */}
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
        <div className="flex justify-center gap-6 mb-8 lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <PinkTeddyBear className="w-20 h-20 sm:w-28 sm:h-28" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <BlueTeddyBear className="w-20 h-20 sm:w-28 sm:h-28" />
          </motion.div>
        </div>

        {/* Gift Box and Reveal Card */}
        <div className="relative flex items-center justify-center min-h-[320px]">
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
                  <GradientGiftBox className="w-56 h-56 sm:w-72 sm:h-72 drop-shadow-2xl" />
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <motion.p
                  className="font-heading text-2xl sm:text-3xl font-bold text-pink-600 mt-4 drop-shadow-sm"
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
                className={`w-full max-w-md invite-card bg-gradient-to-br ${revealColorClasses} rounded-3xl px-8 sm:px-12 py-12 sm:py-16 shadow-2xl border-4 ${borderColor}`}
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
                  className="mb-4"
                >
                  <span className="text-5xl">
                    {status === 'boy' ? '👦' : status === 'girl' ? '👧' : '🎉'}
                  </span>
                </motion.div>

                <motion.p
                  className="font-heading text-4xl sm:text-6xl font-bold leading-tight"
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