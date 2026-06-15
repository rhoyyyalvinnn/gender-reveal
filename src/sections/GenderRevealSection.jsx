import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { GiftBoxIcon, BalloonIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 3 — Gender Reveal Announcement
 * A big interactive gift box guests can tap/click to "open".
 * Depending on `eventConfig.genderReveal.status`, this either reveals
 * Team Pink / Team Blue, or keeps the surprise until the live event.
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
      ? 'from-baby-blue via-cream to-baby-blue text-baby-blue-deep'
      : status === 'girl'
      ? 'from-soft-pink via-cream to-soft-pink text-soft-pink-deep'
      : 'from-lavender via-cream to-light-yellow text-lavender-deep'

  const revealText =
    status === 'boy' ? revealTextBoy : status === 'girl' ? revealTextGirl : revealTextSurprise

  return (
    <SectionContainer
      id="gender-reveal"
      background={
        <FloatingBackground layers={['stars']} gradient="from-baby-blue via-cream to-soft-pink" />
      }
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.h2
        className="font-heading text-4xl sm:text-6xl font-bold gradient-text mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Boy or Girl?
      </motion.h2>

      <p className="font-body text-lg text-[#5B4B66] mb-10 max-w-md">
        Tap the gift box to find out the big news!
      </p>

      <div className="relative flex items-center justify-center min-h-[260px]">
        {/* Floating balloons either side for flavor */}
        <BalloonIcon color="#FFD6E8" className="hidden sm:block absolute -left-16 bottom-0 w-16 animate-bob" />
        <BalloonIcon color="#A7D8FF" className="hidden sm:block absolute -right-16 bottom-0 w-16 animate-bob" style={{ animationDelay: '1s' }} />

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="closed"
              type="button"
              onClick={handleOpen}
              aria-label="Open the gift box to reveal the surprise"
              className="cursor-pointer focus-visible:outline focus-visible:outline-4 focus-visible:outline-baby-blue rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
              whileTap={{ scale: 0.9 }}
              exit={{ opacity: 0, scale: 1.4, rotate: 15 }}
              transition={{ duration: 0.4 }}
            >
              <GiftBoxIcon className="w-48 h-48 sm:w-60 sm:h-60 drop-shadow-2xl animate-wiggle" />
              <p className="font-heading text-xl text-soft-pink-deep mt-2">Tap to Open!</p>
            </motion.button>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className={`invite-card bg-gradient-to-br ${revealColorClasses} rounded-3xl px-10 py-12 shadow-2xl`}
            >
              <motion.p
                className="font-heading text-3xl sm:text-5xl font-bold"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {revealText}
              </motion.p>
              {status === 'surprise' && (
                <motion.p
                  className="font-body text-base mt-3 text-[#5B4B66]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {subTextSurprise}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  )
}
