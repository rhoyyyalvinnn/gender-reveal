import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 4 — Baby Shower Details
 * Presents the date, time, venue and address as animated cards that slide
 * into view, plus a button linking out to Google Maps.
 */
export default function ShowerDetailsSection() {
  const { title, date, time, venue, address, mapsUrl } = eventConfig.babyShower

  const cards = [
    { icon: Calendar, label: 'Date', value: date, color: 'bg-soft-pink' },
    { icon: Clock, label: 'Time', value: time, color: 'bg-baby-blue' },
    { icon: MapPin, label: 'Venue', value: venue, color: 'bg-lavender' },
    { icon: Navigation, label: 'Address', value: address, color: 'bg-light-yellow' },
  ]

  return (
    <SectionContainer
      id="shower-details"
      background={
        <FloatingBackground layers={['clouds', 'footprints']} gradient="from-cream via-light-yellow to-soft-pink" />
      }
      className="text-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-3">{title}</h2>
      <p className="font-body text-lg text-[#5B4B66] mb-10">
        Mark your calendars — we can't wait to celebrate with you!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="invite-card p-6 flex flex-col items-center text-center shadow-lg"
          >
            <div className={`${card.color} rounded-full p-4 mb-3 animate-floatYSlow`}>
              <card.icon className="w-7 h-7 text-[#5B4B66]" aria-hidden="true" />
            </div>
            <p className="font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1">
              {card.label}
            </p>
            <p className="font-body text-lg text-[#5B4B66] font-semibold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-10"
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
