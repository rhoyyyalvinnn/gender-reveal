import { motion } from 'framer-motion'
import { Shirt, Waves } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 5 — Attire Guide
 * Shows the dress-code theme and suggested pastel colors as sequentially
 * animated cards, each with a small clothing illustration. Since the venue
 * is a resort, also includes a friendly note encouraging guests to pack
 * swimwear for the pool.
 */
export default function AttireSection() {
  const { theme, description, suggestions, resortNote } = eventConfig.attire

  return (
    <SectionContainer
      id="attire"
      background={
        <FloatingBackground layers={['clouds', 'hearts']} gradient="from-baby-blue via-cream to-lavender" />
      }
      className="text-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-3">What to Wear</h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-body text-lg text-[#5B4B66] mb-2"
      >
        Theme: <span className="font-semibold text-soft-pink-deep">{theme}</span>
      </motion.p>

      <p className="font-body text-base text-[#5B4B66]/80 max-w-xl mx-auto mb-10">{description}</p>

      <div className="flex justify-center gap-5">
        {suggestions.map((color, i) => (
          <motion.div
            key={color.name}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -8 }}
            className="invite-card p-5 flex flex-col items-center shadow-lg"
          >
            <div
              className="w-16 h-16 rounded-full border-4 border-white shadow-md flex items-center justify-center mb-3"
              style={{ backgroundColor: color.hex }}
            >
              <Shirt className="w-7 h-7 text-white/90" aria-hidden="true" />
            </div>
            <p className="font-heading text-base text-[#5B4B66]">{color.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Resort / swimwear note */}
      {resortNote && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
          className="invite-card max-w-xl mx-auto mt-8 px-6 py-5 flex flex-col sm:flex-row items-center gap-4 shadow-lg"
        >
          <span className="flex-shrink-0 bg-baby-blue rounded-full p-3 animate-floatYSlow">
            <Waves className="w-6 h-6 text-[#5B4B66]" aria-hidden="true" />
          </span>
          <p className="font-body text-sm sm:text-base text-[#5B4B66] text-center sm:text-left">
            <span className="font-heading text-soft-pink-deep">Pool tip:</span> {resortNote}
          </p>
        </motion.div>
      )}
    </SectionContainer>
  )
}