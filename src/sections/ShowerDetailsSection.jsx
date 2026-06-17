import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 4 — Baby Shower Details
 * 2×2 grid of detail cards (Date | Time / Venue | Address),
 * with a Google Maps button below.
 */
export default function ShowerDetailsSection() {
  const { title, date, time, venue, address, mapsUrl } = eventConfig.babyShower

  const cards = [
    { icon: Calendar,   label: 'Date',    value: date,    color: 'bg-soft-pink'    },
    { icon: Clock,      label: 'Time',    value: time,    color: 'bg-baby-blue'    },
    { icon: MapPin,     label: 'Venue',   value: venue,   color: 'bg-lavender'     },
    { icon: Navigation, label: 'Address', value: address, color: 'bg-light-yellow' },
  ]

  return (
    <SectionContainer
      id="shower-details"
      background={
        <FloatingBackground
          layers={['stars', 'footprints', 'hearts']}
          gradient="from-cream via-light-yellow to-soft-pink"
        />
      }
      className="text-center"
    >
      {/* Heading */}
      <h2 className="font-heading text-3xl sm:text-5xl font-bold gradient-text mb-2">
        {title}
      </h2>
      <p className="font-body text-base sm:text-lg text-[#5B4B66] mb-6 sm:mb-10 px-2">
        Mark your calendars — we can't wait to celebrate with you!
      </p>

      {/* 2×2 detail cards — equal height on all sizes */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-2xl mx-auto w-full px-3 sm:px-0">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="invite-card h-full min-h-[160px] sm:min-h-[200px] p-4 sm:p-6 flex flex-col items-center justify-start text-center shadow-lg"
          >
            {/* Icon container with fixed size to prevent overflow */}
            <div className={`${card.color} rounded-full p-2 sm:p-4 mb-2 sm:mb-3 flex-shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 animate-floatYSlow`}>
              <card.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#5B4B66] flex-shrink-0" aria-hidden="true" />
            </div>

            {/* Label */}
            <p className="font-heading text-[9px] sm:text-xs uppercase tracking-widest text-soft-pink-deep mb-1 sm:mb-2 flex-shrink-0">
              {card.label}
            </p>

            {/* Value - grows to fill available space */}
            <p className="font-body text-xs sm:text-base text-[#5B4B66] font-semibold leading-snug break-words">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Maps button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-6 sm:mt-10"
      >
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open venue location in Google Maps">
          <PrimaryButton variant="blue">
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              View on Google Maps
            </span>
          </PrimaryButton>
        </a>
      </motion.div>
    </SectionContainer>
  )
}