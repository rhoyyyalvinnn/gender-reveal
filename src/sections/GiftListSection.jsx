import { motion } from 'framer-motion'
import { Milk, Shirt, Droplet, Sparkles, Cloud, Moon, Gift, Heart as HeartLucide } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { TeddyBearIcon, HeartIcon, BalloonIcon } from '../components/decor/Decorations.jsx'

const items = [
  { label: 'Breastfeeding essentials', icon: Milk, bg: 'bg-soft-pink' },
  { label: 'Neutral color baby clothes', icon: Shirt, bg: 'bg-baby-blue' },
  { label: 'Cetaphil baby essentials', icon: Droplet, bg: 'bg-lavender' },
  { label: 'Baby detergent', icon: Sparkles, bg: 'bg-light-yellow' },
  { label: 'Burping cloths', icon: Cloud, bg: 'bg-baby-blue' },
  { label: 'Newborn swaddles', icon: Moon, bg: 'bg-lavender' },
  { label: 'Or any baby essentials', icon: Gift, bg: 'bg-soft-pink' },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function GiftListSection() {
  return (
    <SectionContainer
      id="gift-list"
      background={
        <FloatingBackground layers={['clouds', 'balloons', 'hearts']} gradient="from-soft-pink via-cream to-baby-blue" />
      }
      className="text-center flex flex-col items-center justify-center"
    >
      {/* Teddy bear holding a little gift, with balloons drifting by */}
      <motion.div
        className="relative mb-3"
        initial={{ opacity: 0, scale: 0.6, y: -10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <TeddyBearIcon className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg animate-bob" />
        <BalloonIcon
          color="#E6D6FF"
          className="absolute -right-6 -top-3 w-8 h-12 animate-floatY"
          style={{ animationDelay: '0.6s' }}
        />
      </motion.div>

      <motion.h2
        className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-2"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Gifts &amp; Wishes
      </motion.h2>

      <motion.div
        className="flex items-center justify-center gap-2 mb-6 text-soft-pink-deep"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <span className="h-px w-8 bg-soft-pink-deep/40" />
        <HeartIcon className="w-4 h-4" color="#FF9EC4" />
        <span className="h-px w-8 bg-soft-pink-deep/40" />
      </motion.div>

      {/* The card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="invite-card max-w-2xl mx-auto px-6 sm:px-10 py-8 sm:py-10 shadow-xl"
      >
        <p className="font-body text-base sm:text-lg leading-relaxed text-[#5B4B66]">
          Your love, presence, and prayers are all that we need — but if you wish to give a
          little something, here are a few ideas that would be{' '}
          <span className="font-semibold text-soft-pink-deep">truly appreciated</span>.
        </p>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left"
        >
          {items.map(({ label, icon: Icon, bg }) => (
            <motion.li
              key={label}
              variants={item}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm"
            >
              <span className={`flex-shrink-0 ${bg} rounded-full p-2`}>
                <Icon className="w-5 h-5 text-[#5B4B66]" aria-hidden="true" />
              </span>
              <span className="font-body text-sm sm:text-base text-[#5B4B66]">{label}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 flex flex-col items-center gap-2"
        >
          <HeartLucide className="w-5 h-5 text-soft-pink-deep" aria-hidden="true" />
          <p className="font-heading text-lg sm:text-xl gradient-text font-semibold">
            See you there!
          </p>
        </motion.div>
      </motion.div>
    </SectionContainer>
  )
}