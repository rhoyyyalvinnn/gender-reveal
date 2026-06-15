import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { HeartIcon, TeddyBearIcon, BalloonIcon, StarIcon } from '../components/decor/Decorations.jsx'

// Stagger the paragraphs in one after another, like pages turning
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function InvitationMessageSection() {
  return (
    <SectionContainer
      id="invitation-message"
      background={
        <FloatingBackground
          layers={['stars', 'moon', 'hearts', 'balloons']}
          gradient="from-lavender via-baby-blue to-soft-pink"
        />
      }
      className="text-center flex flex-col items-center justify-center"
    >
      {/* Sparkle accents */}
      <motion.div
        className="flex gap-3 mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <StarIcon
            key={i}
            className="w-5 h-5 text-light-yellow animate-twinkle"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </motion.div>

      <motion.h2
        className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Hello Tito & Tita, Cousins, Grandpa & Grandma!
      </motion.h2>

      {/* The letter card, flanked by two teddy bears leaning on it */}
      <div className="relative max-w-2xl mx-auto">
        {/* Left teddy bear, overlapping the card's left edge */}
        <motion.div
          className="hidden sm:block absolute -left-10 sm:-left-14 bottom-2 sm:bottom-6 z-10"
          initial={{ opacity: 0, x: -30, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: -6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <div className="relative animate-bob">
            <TeddyBearIcon className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-lg" />
            <BalloonIcon
              color="#A7D8FF"
              className="absolute -left-4 -top-8 w-7 h-11 animate-floatY"
              style={{ animationDelay: '1.2s' }}
            />
          </div>
        </motion.div>

        {/* Right teddy bear, mirrored, overlapping the card's right edge */}
        <motion.div
          className="hidden sm:block absolute -right-10 sm:-right-14 bottom-2 sm:bottom-6 z-10"
          initial={{ opacity: 0, x: 30, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4, delay: 0.1 }}
        >
          <div className="relative animate-bob" style={{ animationDelay: '0.5s' }}>
            <TeddyBearIcon className="w-24 h-24 sm:w-32 sm:h-32 drop-shadow-lg scale-x-[-1]" />
            <BalloonIcon
              color="#FFD6E8"
              className="absolute -right-4 -top-8 w-7 h-11 animate-floatY"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
        </motion.div>

        {/* Small teddy peeking centered on top for mobile, where side bears are hidden */}
        <motion.div
          className="sm:hidden flex justify-center mb-2"
          initial={{ opacity: 0, scale: 0.6, y: -20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <TeddyBearIcon className="w-20 h-20 drop-shadow-lg animate-bob" />
        </motion.div>

        <motion.div
          className="relative invite-card mx-2 sm:mx-12 px-6 sm:px-10 pt-12 pb-10 font-body text-lg sm:text-xl leading-relaxed text-[#5B4B66] shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          {/* Heart "wax seal" pinned to the top of the letter */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg border-4 border-soft-pink"
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 12 }}
          >
            <HeartIcon className="w-7 h-7" color="#FF9EC4" />
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={item}>
              Mama and Papa prayed for a little me, and finally, I'm here!
            </motion.p>

            <motion.p variants={item} className="mt-4">
              I felt all the happiness and excitement when my Mama &amp; Papa shared this news
              with their closest friends and loved ones.
            </motion.p>

            <motion.p variants={item} className="mt-4">
              So, I'd love to invite you to my very intimate{' '}
              <span className="font-semibold text-soft-pink-deep">Gender Reveal</span> and{' '}
              <span className="font-semibold text-baby-blue-deep">Baby Shower</span> to celebrate
              with us.
            </motion.p>

            <motion.p variants={item} className="mt-4">
              In a few months, I'll be seeing the world, and I can't wait to see you soon!
            </motion.p>

            {/* Little divider */}
            <motion.div variants={item} className="flex justify-center my-6">
              <div className="flex items-center gap-2 text-soft-pink-deep">
                <span className="h-px w-10 bg-soft-pink-deep/40" />
                <HeartIcon className="w-4 h-4" color="#FF9EC4" />
                <span className="h-px w-10 bg-soft-pink-deep/40" />
              </div>
            </motion.div>

            <motion.p variants={item} className="font-heading text-lg">
              Lots of love,
            </motion.p>
            <motion.p variants={item} className="mt-1 font-semibold font-heading text-xl gradient-text">
              Mama and Papa's Little One
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}