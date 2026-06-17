import { motion } from 'framer-motion'
import { Package, Droplets, Shirt, Milk, Wind, Waves, Star } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { TeddyBearIcon, HeartIcon } from '../components/decor/Decorations.jsx'

const items = [
  { label: 'Diapers', icon: Package, bg: 'bg-soft-pink' },
  { label: 'Wipes', icon: Droplets, bg: 'bg-baby-blue' },
  { label: 'Clothes', icon: Shirt, bg: 'bg-lavender' },
  { label: 'Feeding supplies', icon: Milk, bg: 'bg-light-yellow'},
  { label: 'Detergent', icon: Wind, bg: 'bg-baby-blue' },
  { label: 'Bath items', icon: Waves, bg: 'bg-lavender' },
  { label: 'Any essentials', icon: Star, bg: 'bg-soft-pink' },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function GiftListSection() {
  return (
    <SectionContainer
      id="gift-list"
      background={
        <FloatingBackground layers={['stars', 'hearts', 'footprints', 'balloons']} gradient="from-soft-pink via-pink-200 to-baby-blue" />
      }
      className="text-center flex flex-col items-center justify-center py-8 sm:py-10"
    >
      {/* Teddy bear */}
      <motion.div
        className="mb-2"
        initial={{ opacity: 0, scale: 0.6, y: -10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      >
        <TeddyBearIcon className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg animate-bob" />
      </motion.div>

      <motion.h2
        className="font-heading text-2xl sm:text-3xl font-bold gradient-text mb-1"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Gifts &amp; Wishes
      </motion.h2>

      <motion.div
        className="flex items-center justify-center gap-2 mb-3 text-soft-pink-deep"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="h-px w-6 bg-soft-pink-deep/40" />
        <HeartIcon className="w-3 h-3" color="#FF9EC4" />
        <span className="h-px w-6 bg-soft-pink-deep/40" />
      </motion.div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="invite-card max-w-2xl mx-auto px-4 sm:px-8 py-5 sm:py-6 shadow-xl w-full"
      >
        <p className="font-body text-sm sm:text-base leading-relaxed text-[#5B4B66] mb-4">
          Your love and presence mean everything — but if you'd like to give a gift:
        </p>

        {/* Baby Essentials Header */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#5B4B66]/50 mb-3 uppercase tracking-wide">
          Baby Essentials
        </h3>

        {/* Gift list */}
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4"
        >
          {items.map(({ label, icon: Icon, bg }) => (
            <motion.li
              key={label}
              variants={item}
              whileHover={{ y: -2, scale: 1.02 }}
              className="flex flex-col items-center gap-2 rounded-xl bg-white/60 px-2 sm:px-3 py-2 sm:py-3 shadow-sm"
            >
              <span className={`${bg} rounded-full p-2 flex-shrink-0`}>
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B4B66]" aria-hidden="true" />
              </span>
              <span className="font-body text-xs sm:text-sm text-[#5B4B66] text-center leading-tight">
                {label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center"
        >
          <p className="font-heading text-base sm:text-lg gradient-text font-semibold">
            ♡ See you there!
          </p>
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}