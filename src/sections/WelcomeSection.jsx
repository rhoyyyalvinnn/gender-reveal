import { motion } from 'framer-motion'
import { useEffect } from 'react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { TeddyBearIcon, StarIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'

/**
 * SLIDE 1 — Welcome Screen
 * The very first thing guests see. A joyful landing animation with
 * floating balloons, sparkles, a confetti burst and a teddy bear,
 * inviting guests to "open" the storybook invitation.
 */
export default function WelcomeSection({ onOpen }) {
  const { burst } = useConfetti()

  // Greet guests with a small confetti burst shortly after the page loads
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
      background={<FloatingBackground layers={['clouds', 'balloons', 'hearts']} />}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* Sparkle row */}
        <motion.div
          className="flex gap-3 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <StarIcon
              key={i}
              className="w-6 h-6 text-light-yellow animate-twinkle"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </motion.div>

        <motion.h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold gradient-text drop-shadow-sm"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          You're Invited!
        </motion.h1>

        {/* Floating teddy bear */}
        <motion.div
          className="my-6 animate-bob"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TeddyBearIcon className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-lg" />
        </motion.div>

        <motion.p
          className="font-body text-xl sm:text-2xl text-[#5B4B66] max-w-md mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          A little miracle is on the way! 🌙✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, type: 'spring' }}
        >
          <PrimaryButton onClick={handleOpen} variant="pink" aria-label="Open the invitation">
            Open Invitation 💌
          </PrimaryButton>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-[#5B4B66]/60 animate-bob"
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
