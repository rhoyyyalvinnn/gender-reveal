import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { useCountdown } from '../hooks/useCountdown.js'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 8 — Countdown Timer
 * A live countdown to the event with smoothly "flipping" digit cards,
 * set against a starry night sky with a glowing moon.
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
        <FloatingBackground layers={['stars', 'moon', 'stars', 'moon', 'hearts', 'hearts']} gradient="from-lavender via-baby-blue to-cream" />
      }
      className="text-center flex flex-col items-center justify-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-3">
        {isPast ? "It's Almost Time!" : 'Counting Down To The Big Day'}
      </h2>
      <p className="font-body text-lg text-[#5B4B66] mb-10">
        {isPast
          ? 'We hope to see you there!'
          : "Mark your calendars — every second brings us closer!"}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {units.map((unit) => (
          <FlipCard key={unit.label} value={unit.value} label={unit.label} />
        ))}
      </div>
    </SectionContainer>
  )
}

function FlipCard({ value, label }) {
  const display = String(value).padStart(2, '0')

  return (
    <div className="flex flex-col items-center">
      <div className="relative invite-card w-20 h-24 sm:w-28 sm:h-32 flex items-center justify-center overflow-hidden shadow-2xl">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -40, opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-heading text-3xl sm:text-5xl font-bold text-soft-pink-deep"
          >
            {display}
          </motion.span>
        </AnimatePresence>
        {/* Center divider line for a "flip clock" feel */}
        <div className="absolute left-0 right-0 top-1/2 h-px bg-[#5B4B66]/10" />
      </div>
      <p className="mt-2 font-body text-sm uppercase tracking-widest text-[#5B4B66]">{label}</p>
    </div>
  )
}
