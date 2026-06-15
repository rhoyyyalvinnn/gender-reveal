import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { HeartIcon } from '../components/decor/Decorations.jsx'
import { eventConfig } from '../utils/eventConfig.js'

/**
 * SLIDE 2 — Parents Introduction
 * Introduces the parents-to-be with photo placeholders and a warm message,
 * accompanied by gentle floating hearts.
 */
export default function ParentsSection() {
  const { momName, dadName, momPhoto, dadPhoto } = eventConfig.parents

  return (
    <SectionContainer
      id="parents"
      background={<FloatingBackground layers={['clouds', 'hearts']} gradient="from-lavender via-cream to-soft-pink" />}
      className="text-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-4">
        Meet the Parents-to-Be
      </h2>

      <p className="font-body text-lg sm:text-xl text-[#5B4B66] max-w-xl mx-auto mb-12">
        Join us as we celebrate the upcoming arrival of our little bundle of joy.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16">
        <PersonCard name={momName} photo={momPhoto} label="Mom" delay={0.1} />

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HeartIcon className="w-10 h-10" color="#FF9EC4" />
        </motion.div>

        <PersonCard name={dadName} photo={dadPhoto} label="Dad" delay={0.3} />
      </div>
    </SectionContainer>
  )
}

function PersonCard({ name, photo, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <div className="invite-card p-3 rounded-full border-4 border-white shadow-xl">
        <img
          src={photo}
          alt={`Photo of ${label}, ${name}`}
          className="w-32 h-32 sm:w-44 sm:h-44 object-cover rounded-full"
          loading="lazy"
        />
      </div>
      <p className="mt-4 font-heading text-2xl text-[#5B4B66]">{name}</p>
      <p className="font-body text-sm uppercase tracking-widest text-soft-pink-deep">{label}</p>
    </motion.div>
  )
}
