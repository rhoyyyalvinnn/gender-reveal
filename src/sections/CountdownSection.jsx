import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { useCountdown } from '../hooks/useCountdown.js'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 8 — Countdown Timer
 * A live countdown to the event with smoothly "flipping" digit cards,
 * set against a starry night sky with a glowing moon.
 * Mobile responsive with optimized layout.
 */
export default function CountdownSection() {
  const { days, hours, minutes, seconds, isPast } = useCountdown(eventConfig.eventDateTime)

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ]

  return (
    <SectionContainer
      id="countdown"
      background={
        <FloatingBackground layers={['stars', 'moon', 'stars', 'moon', 'hearts', 'hearts', 'balloons']} gradient="from-lavender via-baby-blue to-cream" />
      }
      className="text-center flex flex-col items-center justify-center py-6 sm:py-8"
    >
      <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2 sm:mb-3">
        {isPast ? "It's Almost Time!" : 'Counting Down'}
      </h2>
      <p className="font-body text-sm sm:text-base lg:text-lg text-[#5B4B66] mb-6 sm:mb-8 px-2">
        {isPast
          ? 'We hope to see you there!'
          : "Every second brings us closer!"}
      </p>

      {/* Mobile: 3-1 grid, Desktop: flex single row */}
      <div className="w-full max-w-4xl mx-auto px-2">
        {/* Mobile layout: 3 cols + centered second row */}
        <div className="lg:hidden grid grid-cols-3 gap-2 sm:gap-3 justify-items-center">
          {units.map((unit, index) => (
            <div key={unit.label} className={index === 3 ? 'col-start-2 col-span-1' : ''}>
              <FlipCard value={unit.value} label={unit.label} />
            </div>
          ))}
        </div>

        {/* Desktop layout: flex single row */}
        <div className="hidden lg:flex flex-wrap items-center justify-center gap-4 lg:gap-6">
          {units.map((unit) => (
            <FlipCard key={unit.label} value={unit.value} label={unit.label} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

function FlipCard({ value, label }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative invite-card w-16 h-20 sm:w-20 sm:h-24 lg:w-28 lg:h-32 flex items-center justify-center overflow-hidden shadow-lg">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -40, opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold text-soft-pink-deep"
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* Center divider line for a "flip clock" feel */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#5B4B66]/10" />
      </div>
      <p className="mt-1.5 sm:mt-2 font-body text-xs sm:text-sm uppercase tracking-widest text-[#5B4B66]">
        {label}
      </p>
    </div>
  )
}