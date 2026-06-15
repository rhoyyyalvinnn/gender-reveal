import { motion } from 'framer-motion'
import { useEffect } from 'react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { TeddyBearIcon, StarIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'

/* ─── Main Section ───────────────────────────────────────────── */
export default function WelcomeSection({ onOpen }) {
  const { burst } = useConfetti()

  useEffect(() => {
    const timer = setTimeout(() => burst({ particleCount: 80, spread: 70 }), 600)
    return () => clearTimeout(timer)
  }, [burst])

  const handleOpen = () => {
    burst({ particleCount: 150, spread: 100, origin: { y: 0.5 } })
    onOpen?.()
  }

  return (
    <SectionContainer
      id="welcome"
      background={<FloatingBackground layers={['clouds', 'balloons', 'hearts']} gradient="from-lavender-deep via-soft-pink to-baby-blue-deep" />}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center relative z-10"
      >
        {/* ── Sparkle row ── */}
        <motion.div
          className="flex gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {['#FDE68A', '#C4B5FD', '#F9A8D4'].map((color, i) => (
            <StarIcon
              key={i}
              className="w-7 h-7 animate-twinkle"
              style={{ color, animationDelay: `${i * 0.3}s`, filter: 'drop-shadow(0 0 4px currentColor)' }}
            />
          ))}
        </motion.div>

        {/* ── Headline ── */}
        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold gradient-text drop-shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          You're Invited!
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          className="font-body text-base sm:text-lg text-[#7C3AED]/70 mt-1 mb-4 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          to a very special celebration ✨
        </motion.p>

        {/* ── Floating teddy bear ── */}
        <motion.div
          className="my-5 animate-bob relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {/* Glow ring behind teddy */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,168,212,0.45) 0%, transparent 70%)',
              transform: 'scale(1.5)',
              zIndex: -1,
            }}
            animate={{ scale: [1.4, 1.7, 1.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <TeddyBearIcon className="w-32 h-32 sm:w-40 sm:h-40 drop-shadow-lg" />
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          className="font-body text-xl sm:text-2xl text-[#5B4B66] max-w-sm mx-auto mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          A little miracle is on the way! 🌙✨
        </motion.p>

        {/* ── Balloon emoji row ── */}
        <motion.div
          className="flex gap-2 mb-6 text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
        >
          {['🎈', '🌸', '🎀', '🌸', '🎈'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ delay: i * 0.15, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, type: 'spring' }}
        >
          <PrimaryButton onClick={handleOpen} variant="pink" aria-label="Open the invitation">
            Open Invitation 💌
          </PrimaryButton>
        </motion.div>

        {/* ── Hint ── */}
        <motion.p
          className="mt-6 text-sm text-[#5B4B66]/55 animate-bob"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          scroll or tap to begin ↓
        </motion.p>
      </motion.div>
    </SectionContainer>
  )
}