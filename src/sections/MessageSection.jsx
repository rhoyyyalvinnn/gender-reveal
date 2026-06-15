import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { HeartIcon } from '../components/decor/Decorations.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 6 — Message to Our Guests
 * A heartfelt thank-you message set against a starry, dreamy background
 * with floating hearts.
 */
export default function MessageSection() {
  return (
    <SectionContainer
      id="message"
      background={
        <FloatingBackground layers={['stars', 'moon', 'hearts']} gradient="from-lavender via-baby-blue to-soft-pink" />
      }
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex justify-center mb-6"
      >
        <HeartIcon className="w-12 h-12 animate-bob" color="#FF9EC4" />
      </motion.div>

      <motion.h2
        className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-6"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        A Message To Our Guests
      </motion.h2>

      <motion.blockquote
        className="invite-card max-w-2xl mx-auto p-8 sm:p-10 font-body text-lg sm:text-xl leading-relaxed text-[#5B4B66] shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        “{eventConfig.guestMessage}”
        <footer className="mt-4 font-heading text-soft-pink-deep">
          — {eventConfig.guestMessageSignature}
        </footer>
      </motion.blockquote>
    </SectionContainer>
  )
}
