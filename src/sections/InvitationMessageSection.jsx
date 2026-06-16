import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { TeddyBearIcon } from '../components/decor/Decorations.jsx'

// ── Animation variants ──────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ── SVGs ────────────────────────────────────────────────────────────────────
function BalloonSVG({ color, className = '', style }) {
  return (
    <svg viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <ellipse cx="14" cy="16" rx="13" ry="15" fill={color} opacity=".9" />
      <ellipse cx="8.5" cy="10" rx="4" ry="3" fill="white" opacity=".5" />
      <path d="M14 31 Q13 34 14 36 Q15 34 14 31Z" fill={color} opacity=".7" />
      <path d="M14 36 Q11 40 13 48" stroke={color} strokeWidth="1.1" opacity=".55" fill="none" />
    </svg>
  )
}

function StarSparkle({ className = '', color = '#FDE68A', style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path d="M12 2 L13.5 9.5 L21 12 L13.5 14.5 L12 22 L10.5 14.5 L3 12 L10.5 9.5 Z"
        fill={color} />
    </svg>
  )
}

function WaveDivider() {
  return (
    <svg viewBox="0 0 120 14" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-28 sm:w-36 mx-auto my-2" aria-hidden="true">
      <path d="M0 7 Q15 1 30 7 Q45 13 60 7 Q75 1 90 7 Q105 13 120 7"
        stroke="#f9a8d4" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  )
}

// ── Decoration configs — kept minimal so they don't crowd a compact layout ──
const BALLOONS = [
  { pos: { left: '1%',   top: '8%'  }, color: '#93c5fd', size: 'w-6 sm:w-9',  delay: 0.2 },
  { pos: { left: '10%',  top: '3%'  }, color: '#f9a8d4', size: 'w-5 sm:w-7',  delay: 1.0 },
  { pos: { left: '2%',   top: '75%' }, color: '#86efac', size: 'w-5 sm:w-7',  delay: 1.8 },
  { pos: { right: '2%',  top: '6%'  }, color: '#c4b5fd', size: 'w-6 sm:w-9',  delay: 0.6 },
  { pos: { right: '10%', top: '2%'  }, color: '#f9a8d4', size: 'w-5 sm:w-7',  delay: 1.4 },
  { pos: { right: '3%',  top: '78%' }, color: '#fca5a5', size: 'w-5 sm:w-7',  delay: 0.4 },
]

const STARS = [
  { pos: { left: '7%',   top: '30%' }, size: 'w-3 sm:w-4', color: '#FDE68A', delay: 0.5 },
  { pos: { left: '16%',  top: '65%' }, size: 'w-2 sm:w-3', color: '#c4b5fd', delay: 1.3 },
  { pos: { right: '8%',  top: '28%' }, size: 'w-3 sm:w-4', color: '#FDE68A', delay: 0.8 },
  { pos: { right: '17%', top: '62%' }, size: 'w-2 sm:w-3', color: '#f9a8d4', delay: 1.7 },
]

const BEARS = [
  { pos: { left: '0%',   top: '2%'  }, flip: false, size: 'w-9 sm:w-12',  delay: 0.0, anim: 'animate-bob',  opacity: 0.85 },
  { pos: { right: '0%',  top: '2%'  }, flip: true,  size: 'w-9 sm:w-12',  delay: 0.5, anim: 'animate-bobR', opacity: 0.85 },
  { pos: { left: '12%',  top: '82%' }, flip: false, size: 'w-7 sm:w-9',   delay: 1.2, anim: 'animate-bobR', opacity: 0.6  },
  { pos: { right: '12%', top: '82%' }, flip: true,  size: 'w-7 sm:w-9',   delay: 0.8, anim: 'animate-bob',  opacity: 0.6  },
]

export default function InvitationMessageSection() {
  return (
    <SectionContainer
      id="invitation-message"
      background={
        <FloatingBackground
          layers={['stars', 'moon', 'hearts']}
          gradient="from-lavender via-baby-blue to-soft-pink"
        />
      }
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen py-0"
    >
      {/* ── Background balloons ── */}
      {BALLOONS.map((b, i) => (
        <motion.div
          key={`balloon-${i}`}
          className={`absolute ${b.size} animate-floatY pointer-events-none z-10`}
          style={{ ...b.pos, animationDelay: `${b.delay}s` }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: b.delay * 0.4 + 0.1, duration: 0.7 }}
        >
          <BalloonSVG color={b.color} className="w-full drop-shadow-md" />
        </motion.div>
      ))}

      {/* ── Background stars ── */}
      {STARS.map((s, i) => (
        <motion.div
          key={`star-${i}`}
          className={`absolute ${s.size} animate-twinkle pointer-events-none z-10`}
          style={{ ...s.pos, animationDelay: `${s.delay}s` }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: s.delay * 0.3 + 0.1, duration: 0.45 }}
        >
          <StarSparkle color={s.color} className="w-full h-full" />
        </motion.div>
      ))}

      {/* ── Background bears ── */}
      {BEARS.map((b, i) => (
        <motion.div
          key={`bear-${i}`}
          className={`absolute ${b.size} ${b.anim} pointer-events-none z-10`}
          style={{
            ...b.pos,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
            ...(b.flip && { transform: 'scaleX(-1)' }),
          }}
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: b.opacity, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: b.delay * 0.35 + 0.1, duration: 0.45, type: 'spring', bounce: 0.3 }}
        >
          <TeddyBearIcon className="w-full h-full drop-shadow-md" />
        </motion.div>
      ))}

      {/* ── All content in a single centred column ── */}
      <div className="relative z-20 w-full max-w-lg mx-auto px-4 flex flex-col items-center gap-3 sm:gap-4">

        {/* Heading block */}
        <motion.div
          className="flex flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55 }}
        >
          {/* Star trio */}
          <div className="flex gap-2">
            {['#FDE68A', '#f9a8d4', '#FDE68A'].map((c, i) => (
              <StarSparkle key={i} color={c}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-twinkle"
                style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <h2 className="font-heading text-xl sm:text-3xl font-bold gradient-text leading-tight text-center">
            Hello Tito &amp; Tita,{' '}
            <span className="inline sm:block">Cousins, Grandpa &amp; Grandma!</span>
          </h2>
        </motion.div>

        {/* Invitation card */}
        <motion.div
          className="w-full invite-card px-5 sm:px-8 pt-8 pb-5 shadow-xl rounded-2xl relative overflow-visible"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.65 }}
        >
          {/* Ribbon top accent */}
          <motion.div
            className="absolute inset-x-0 -top-4 flex justify-center pointer-events-none"
            initial={{ opacity: 0, scaleX: 0.7 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg viewBox="0 0 220 26" fill="none" xmlns="http://www.w3.org/2000/svg"
              className="w-44 sm:w-60 drop-shadow" aria-hidden="true">
              <path d="M0 13 L26 3 L26 23 Z" fill="#f9a8d4" opacity=".8" />
              <path d="M220 13 L194 3 L194 23 Z" fill="#f9a8d4" opacity=".8" />
              <rect x="22" y="2" width="176" height="22" rx="4" fill="#f9a8d4" opacity=".85" />
              <path d="M110 7 C110 5 108 4 107 5.5 C106 4 104 5 104 7 C104 9.5 107 12 110 14 C113 12 116 9.5 116 7 C116 5 114 4 113 5.5 C112 4 110 5 110 7Z"
                fill="white" opacity=".7" />
              {[60, 80, 140, 160].map(x => (
                <circle key={x} cx={x} cy="13" r="2" fill="white" opacity=".45" />
              ))}
            </svg>
          </motion.div>
          {/* Card text */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col text-center"
          >
            <motion.p
              variants={item}
              className="font-body shadows-into-light-regular text-lg sm:text-xl leading-relaxed text-[#4A3B58]"
            >
              Mama and Papa prayed for a little me, and finally, I'm here!
            </motion.p>

            <motion.p
              variants={item}
              className="font-body shadows-into-light-regular text-lg sm:text-xl leading-relaxed text-[#4A3B58] mt-4"
            >
              I felt all the happiness and excitement when my Mama &amp; Papa
              shared this news with their closest friends and loved ones.
            </motion.p>

            <motion.p
              variants={item}
              className="font-body shadows-into-light-regular text-lg sm:text-xl leading-relaxed text-[#4A3B58] mt-4"
            >
              So, I'd love to invite you to my very intimate{' '}
              <span className="font-semibold text-soft-pink-deep">
                Gender Reveal
              </span>{' '}
              &amp;{' '}
              <span className="font-semibold text-baby-blue-deep">
                Baby Shower
              </span>{' '}
              to celebrate with us.
            </motion.p>

            <motion.p
              variants={item}
              className="font-body shadows-into-light-regular text-lg sm:text-xl leading-relaxed text-[#4A3B58] mt-4"
            >
              In a few months, I'll be seeing the world — I can't wait to see
              you soon!
            </motion.p>

            {/* Wave divider */}
            <motion.div variants={item} className="mt-6">
              <WaveDivider />
            </motion.div>

            {/* Sign-off row */}
            <motion.div
              variants={item}
              className="flex items-center justify-center gap-2 sm:gap-3 mt-4"
            >
              {/* Left bears */}
              <div className="flex items-end gap-0.5 flex-shrink-0">
                <TeddyBearIcon className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow animate-bob" />
                <TeddyBearIcon className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow animate-bobR mb-0.5 opacity-75" />
              </div>

              {/* Text */}
              <div className="text-center flex-1 min-w-0 px-1">
                <p className="font-heading text-base sm:text-lg text-[#7A6586]">
                  Lots of love,
                </p>

                <p className="font-heading font-semibold text-lg sm:text-2xl gradient-text leading-snug mt-1">
                  Mama &amp; Papa's Little One
                </p>
              </div>

              {/* Right bears (mirrored) */}
              <div className="flex items-end gap-0.5 flex-shrink-0">
                <TeddyBearIcon className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow animate-bob mb-0.5 opacity-75 scale-x-[-1]" />
                <TeddyBearIcon className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow animate-bobR scale-x-[-1]" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}