import { motion } from 'framer-motion'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import { eventConfig } from '../utils/eventConfig.js'

// ── Decorative SVGs ──────────────────────────────────────────────────────────

function HeartOutline({ className = '', color = '#f9a8d4', style }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path d="M12 20 C12 20 2 13 2 6.5 C2 3.4 4.4 1 7.5 1 C9.2 1 10.8 1.9 12 3.2 C13.2 1.9 14.8 1 16.5 1 C19.6 1 22 3.4 22 6.5 C22 13 12 20 12 20Z"
        stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function HeartFilled({ className = '', color = '#f9a8d4', style }) {
  return (
    <svg viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path d="M12 20 C12 20 2 13 2 6.5 C2 3.4 4.4 1 7.5 1 C9.2 1 10.8 1.9 12 3.2 C13.2 1.9 14.8 1 16.5 1 C19.6 1 22 3.4 22 6.5 C22 13 12 20 12 20Z"
        fill={color} />
    </svg>
  )
}

function Star4({ className = '', color = '#93c5fd', style }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <path d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z"
        fill={color} />
    </svg>
  )
}

function Cloud({ className = '', color = '#fff', style }) {
  return (
    <svg viewBox="0 0 100 55" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      <ellipse cx="20" cy="35" rx="18" ry="14" fill={color} opacity=".7" />
      <ellipse cx="45" cy="28" rx="26" ry="20" fill={color} opacity=".8" />
      <ellipse cx="72" cy="34" rx="18" ry="14" fill={color} opacity=".7" />
      <ellipse cx="58" cy="40" rx="20" ry="12" fill={color} opacity=".6" />
      <ellipse cx="30" cy="40" rx="20" ry="12" fill={color} opacity=".6" />
    </svg>
  )
}

// Floating scatter positions
const SCATTER = [
  // Stars — blue & yellow
  { type: 'star4', color: '#93c5fd', pos: { left: '5%',   top: '8%'  }, size: 'w-4 sm:w-5', delay: 0.2, anim: 'animate-twinkle' },
  { type: 'star4', color: '#FDE68A', pos: { left: '15%',  top: '18%' }, size: 'w-3 sm:w-4', delay: 0.9, anim: 'animate-twinkle' },
  { type: 'star4', color: '#93c5fd', pos: { right: '6%',  top: '6%'  }, size: 'w-5 sm:w-6', delay: 0.5, anim: 'animate-twinkle' },
  { type: 'star4', color: '#FDE68A', pos: { right: '14%', top: '20%' }, size: 'w-3 sm:w-4', delay: 1.3, anim: 'animate-twinkle' },
  { type: 'star4', color: '#c4b5fd', pos: { left: '8%',   top: '70%' }, size: 'w-3 sm:w-4', delay: 1.6, anim: 'animate-twinkle' },
  { type: 'star4', color: '#FDE68A', pos: { right: '7%',  top: '72%' }, size: 'w-3 sm:w-4', delay: 0.7, anim: 'animate-twinkle' },
  // Hearts
  { type: 'heart', color: '#f9a8d4', pos: { left: '3%',   top: '42%' }, size: 'w-5 sm:w-6', delay: 0.4, anim: 'animate-floatY' },
  { type: 'heart', color: '#fca5a5', pos: { right: '4%',  top: '38%' }, size: 'w-4 sm:w-5', delay: 1.1, anim: 'animate-floatY' },
  { type: 'heart', color: '#f9a8d4', pos: { left: '18%',  top: '82%' }, size: 'w-4 sm:w-5', delay: 1.8, anim: 'animate-floatY' },
  { type: 'heart', color: '#c4b5fd', pos: { right: '17%', top: '80%' }, size: 'w-3 sm:w-4', delay: 0.6, anim: 'animate-floatY' },
]

export default function ParentsSection() {
  const { momName, dadName, gallery } = eventConfig.parents

  return (
    <SectionContainer
      id="parents"
      background={
        <FloatingBackground
          layers={['hearts']}
          gradient="from-[#fce4ec] via-[#fdf0f5] to-[#fce4ec]"
        />
      }
      className="relative flex flex-col items-center justify-center overflow-hidden min-h-screen py-0"
    >
      {/* Clouds — bottom */}
      <Cloud className="absolute bottom-0 left-0 w-40 sm:w-64 opacity-80 pointer-events-none z-0" color="#fff" />
      <Cloud className="absolute bottom-0 right-0 w-36 sm:w-56 opacity-70 pointer-events-none z-0" color="#fff" />
      <Cloud className="absolute bottom-8 left-1/4 w-28 sm:w-44 opacity-60 pointer-events-none z-0" color="#fce4ec" />

      {/* Scattered decor */}
      {SCATTER.map((d, i) => (
        <motion.div
          key={i}
          className={`absolute ${d.size} ${d.anim} pointer-events-none z-10`}
          style={{ ...d.pos, animationDelay: `${d.delay}s` }}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: d.delay * 0.4, duration: 0.5 }}
        >
          {d.type === 'star4'
            ? <Star4 color={d.color} className="w-full h-full" />
            : <HeartFilled color={d.color} className="w-full h-full" />}
        </motion.div>
      ))}

      {/* ── Main card column ── */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-xs sm:max-w-sm mx-auto px-4">

        {/* Heading above card */}
        <motion.div
          className="flex flex-col items-center mb-3"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          {/* "Meet the" */}
          <p className="font-heading font-semibold text-[#b06090] tracking-wide"
            style={{ fontSize: 'clamp(0.95rem, 3vw, 1.2rem)' }}>
            Meet my
          </p>
          {/* "Parents" in large script style */}
          <div className="flex items-center gap-1.5">
            <h2
              className="font-heading font-bold gradient-text leading-none"
              style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '-0.01em' }}
            >
              Parents
            </h2>
            {/* small heart next to title */}
            <HeartFilled color="#f9a8d4" className="w-4 h-4 sm:w-5 sm:h-5 mb-1 animate-floatY" style={{ animationDelay: '0.5s' }} />
          </div>
        </motion.div>

        {/* Polaroid photo card */}
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0, y: 28, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
        >
          {/* Heart accent top-right of photo */}
          <motion.div
            className="absolute -top-3 -right-3 z-30"
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 12 }}
            viewport={{ once: true }}
            transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 10 }}
          >
            <HeartOutline color="#f9a8d4" className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow" />
          </motion.div>

          {/* The polaroid */}
          <div
            className="w-full rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: '#fff',
              padding: '10px 10px 48px 10px',
              boxShadow: '0 8px 40px rgba(180,100,140,0.18), 0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            {/* Photo */}
          <div
            className="w-full rounded-xl overflow-hidden"
            style={{
              aspectRatio: '3/4',
              letterSpacing: '0.02em',
            }}
          >
            <img
              src={gallery[1]}
              alt={`${momName} and ${dadName}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

            {/* Polaroid name ribbon — overlapping bottom of photo */}
            <div className="relative -mt-5 flex justify-center z-10">
              <div
                className="px-6 py-1.5 rounded-full shadow-md relative"
                style={{
                  background: 'linear-gradient(90deg, #f9a8d4cc, #f472b6cc)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {/* ribbon tail left */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-0 h-0"
                  style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderRight: '14px solid #f9a8d4cc' }} />
                {/* ribbon tail right */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-0 h-0"
                  style={{ borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '14px solid #f472b6cc' }} />

                <p
                  className="text-white text-center whitespace-nowrap drop-shadow-sm"
                  style={{
                    fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                    fontFamily: "'Dancing Script', cursive",
                    letterSpacing: '0.02em',
                    fontWeight: 700,
                  }}
                >
                  {momName} &amp; {dadName}
                </p>
              </div>
            </div>

            {/* Caption inside polaroid white space */}
            <p
              className="font-body text-center italic text-[#c084a0] mt-3"
              style={{ fontSize: 'clamp(0.72rem, 2.2vw, 0.85rem)', lineHeight: 1.5 }}
            >
              Two hearts, one dream,<br />and a new adventure begins…
            </p>
          </div>
        </motion.div>

        {/* Small heart row under caption */}
        <motion.div
          className="flex gap-2 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          {['#f9a8d4', '#c4b5fd', '#f9a8d4'].map((c, i) => (
            <HeartFilled key={i} color={c} className="w-3 h-3 sm:w-4 sm:h-4 animate-floatY"
              style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  )
}