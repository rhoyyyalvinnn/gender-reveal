import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Heart } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { TeddyBearIcon, StarIcon, BalloonIcon, FootprintIcon, HeartIcon } from '../components/decor/Decorations.jsx'
import { useConfetti } from '../hooks/useConfetti.js'

/* ─── Fluffy cloud blob SVG ─────────────────────────────────── */
function CloudBlob({ className = '', color = '#A7D8FF', style = {}, strokeColor = null }) {
  return (
    <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg"
      className={className} style={style} aria-hidden="true">
      {strokeColor && (
        <>
          <ellipse cx="80"  cy="130" rx="75"  ry="52"  fill="none" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="160" cy="105" rx="100" ry="72"  fill="none" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="240" cy="125" rx="78"  ry="56"  fill="none" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="130" cy="80"  rx="65"  ry="50"  fill="none" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="200" cy="72"  rx="55"  ry="45"  fill="none" stroke={strokeColor} strokeWidth="2" />
        </>
      )}
      <ellipse cx="80"  cy="130" rx="75"  ry="52"  fill={color} />
      <ellipse cx="160" cy="105" rx="100" ry="72"  fill={color} />
      <ellipse cx="240" cy="125" rx="78"  ry="56"  fill={color} />
      <ellipse cx="130" cy="80"  rx="65"  ry="50"  fill={color} />
      <ellipse cx="200" cy="72"  rx="55"  ry="45"  fill={color} />
    </svg>
  )
}

/* ─── Drifting white cloud (moves L→R across screen) ────────── */
function DriftingCloud({ top, width, duration, delay, color = 'rgba(255,255,255,0.85)', strokeColor = null }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top, width }}
      initial={{ x: '-20vw' }}
      animate={{ x: '115vw' }}
      transition={{ duration, delay, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
    >
      <CloudBlob color={color} strokeColor={strokeColor} className="w-full drop-shadow-lg" />
    </motion.div>
  )
}

/* ─── Main Section ───────────────────────────────────────────── */
export default function WelcomeSection({ onOpen }) {
  const { burst } = useConfetti()

  useEffect(() => {
    const timer = setTimeout(() => burst({ particleCount: 80, spread: 70 }), 700)
    return () => clearTimeout(timer)
  }, [burst])

  const handleOpen = () => {
    burst({ particleCount: 160, spread: 110, origin: { y: 0.5 } })
    onOpen?.()
  }

  return (
    <SectionContainer
      id="welcome"
      background={<PosterBackground />}
      className="text-center flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Sparkle row */}
        <motion.div className="flex gap-3 mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}>
          {['#FDE68A', '#C4B5FD', '#F9A8D4'].map((color, i) => (
            <StarIcon key={i} className="w-6 h-6 sm:w-8 sm:h-8 animate-twinkle"
              style={{ color, animationDelay: `${i * 0.3}s`, filter: 'drop-shadow(0 0 5px currentColor)' }} />
          ))}
        </motion.div>

        {/* JOIN US label */}
        <motion.p
          className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[#5B4B66]/70 mb-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}>
          Join us for a Celebration of Love and New Beginnings
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold gradient-text drop-shadow-sm leading-tight"
          style={{ fontFamily: "'Anton', sans-serif" }}
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}>
          You're Invited!
        </motion.h1>

        {/* He or She */}
        <motion.div className="grid grid-cols-[auto_auto_auto] place-items-center justify-center gap-4 sm:gap-8 my-4"
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}>
          <span className="text-6xl sm:text-7xl md:text-8xl text-baby-blue-deep drop-shadow-lg leading-none" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>He</span>
          <span className="font-body text-xl sm:text-2xl text-[#5B4B66]/50 italic leading-none">or</span>
          <span className="text-6xl sm:text-7xl md:text-8xl text-soft-pink-deep drop-shadow-lg leading-none" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>She?</span>
        </motion.div>

        {/* Teddy bear with glow */}
        <motion.div className="my-4 relative animate-bob"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249,168,212,0.45) 0%, transparent 70%)',
              transform: 'scale(1.7)',
              zIndex: -1,
            }}
            animate={{ scale: [1.5, 1.9, 1.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <TeddyBearIcon className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-xl" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl text-[#5B4B66] max-w-md sm:max-w-lg mx-auto mb-3 leading-relaxed"
          style={{ fontFamily: "'Dancing Script', cursive", letterSpacing: '0.02em' }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}>
          A little miracle is on the way!<br /><span className="text-3xl sm:text-4xl">🌙✨</span>
        </motion.p>

        {/* Emoji row */}
        <motion.div className="flex gap-2 mb-6 text-xl sm:text-2xl"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}>
          {['🩵', '🌸', '🤍', '🌸', '🩵'].map((e, i) => (
            <motion.span key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ delay: i * 0.15, duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, type: 'spring' }}>
          <PrimaryButton onClick={handleOpen} variant="pink" aria-label="Open the invitation">
            Open Invitation 💌
          </PrimaryButton>
        </motion.div>

        {/* Hint */}
        <motion.p className="mt-5 text-sm text-[#5B4B66]/50 animate-bob"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}>
          scroll or tap to begin ↓
        </motion.p>
      </motion.div>
    </SectionContainer>
  )
}

/* ─── Poster-style background with NO empty space ───────────── */
function PosterBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FFFAF5]" aria-hidden="true">

      {/* BIG CORNER CLOUDS */}

      {/* Pink cluster — top right */}
      <motion.div className="absolute -top-10 -right-16 sm:-top-16 sm:-right-20"
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}>
        <CloudBlob color="#FFE4F0" className="absolute -top-4 -right-4 w-[180px] sm:w-[400px] opacity-80" />
        <CloudBlob color="#FFB8D9" className="relative w-[150px] sm:w-[360px]" />
      </motion.div>

      {/* Blue cluster — bottom left */}
      <motion.div className="absolute -bottom-10 -left-16 sm:-bottom-16 sm:-left-20"
        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}>
        <CloudBlob color="#C8E9FF" className="absolute -bottom-4 -left-4 w-[180px] sm:w-[400px] opacity-80" />
        <CloudBlob color="#85CAFF" className="relative w-[150px] sm:w-[360px]" />
      </motion.div>

      {/* Pink accent — mid left */}
      <motion.div className="absolute top-[28%] -left-12"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <CloudBlob color="#FFD6E8" className="w-[140px] sm:w-[200px] opacity-75" />
      </motion.div>

      {/* Blue accent — mid right */}
      <motion.div className="absolute top-[20%] -right-12"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <CloudBlob color="#A7D8FF" className="w-[140px] sm:w-[200px] opacity-75" />
      </motion.div>

      {/* Lavender accent — top left mid */}
      <motion.div className="absolute top-[5%] left-[22%]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}>
        <CloudBlob color="#E6D6FF" className="w-[100px] sm:w-[140px] opacity-60" />
      </motion.div>

      {/* Yellow accent — bottom right mid */}
      <motion.div className="absolute bottom-[5%] right-[22%]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
        <CloudBlob color="#FFF2B3" className="w-[100px] sm:w-[130px] opacity-60" />
      </motion.div>

      {/* DRIFTING WHITE CLOUDS (move L→R across screen) */}
      <DriftingCloud top="12%"  width="max(100px, min(160px, 24vw))" duration={55} delay={0}  color="rgba(240,248,255,0.90)" strokeColor="rgba(200,220,240,0.50)" />
      <DriftingCloud top="35%"  width="max(130px, min(220px, 30vw))" duration={75} delay={8}  color="rgba(245,245,250,0.85)" strokeColor="rgba(200,200,230,0.45)" />
      <DriftingCloud top="58%"  width="max(90px, min(140px, 22vw))" duration={60} delay={20} color="rgba(240,245,255,0.88)" strokeColor="rgba(200,220,240,0.50)" />
      <DriftingCloud top="78%"  width="max(120px, min(190px, 26vw))" duration={85} delay={5}  color="rgba(245,240,250,0.82)" strokeColor="rgba(200,200,230,0.45)" />
      <DriftingCloud top="48%"  width="max(80px, min(120px, 20vw))" duration={65} delay={35} color="rgba(255,240,245,0.70)" strokeColor="rgba(220,180,200,0.40)" />
      <DriftingCloud top="20%"  width="max(70px, min(100px, 18vw))" duration={90} delay={45} color="rgba(230,245,255,0.75)" strokeColor="rgba(180,210,240,0.40)" />

      {/* OUTLINE HEARTS — poster corner accents */}
      <motion.div className="absolute top-[7%] left-[5%]"
        initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}>
        <Heart className="w-9 h-9 sm:w-14 sm:h-14 text-soft-pink-deep animate-floatYSlow"
          strokeWidth={2.5} fill="none" />
      </motion.div>

      <motion.div className="absolute bottom-[7%] right-[5%]"
        initial={{ opacity: 0, scale: 0.4, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 12 }}
        transition={{ delay: 0.8, duration: 0.7, type: 'spring' }}>
        <Heart className="w-10 h-10 sm:w-16 sm:h-16 text-baby-blue-deep animate-floatY"
          strokeWidth={2.5} fill="none" />
      </motion.div>

      {/* Small filled hearts floating up */}
      {[
        { left: '8%',  delay: '0s',   color: '#FF9EC4', size: 'w-4' },
        { left: '28%', delay: '2.5s', color: '#A7D8FF', size: 'w-3' },
        { left: '65%', delay: '1.2s', color: '#FF9EC4', size: 'w-5' },
        { left: '88%', delay: '3.5s', color: '#C7A9FF', size: 'w-4' },
        { left: '48%', delay: '4.5s', color: '#FFD6E8', size: 'w-3' },
      ].map((h, i) => (
        <HeartIcon key={i} color={h.color}
          className={`absolute bottom-0 ${h.size} animate-heartFloat`}
          style={{ left: h.left, animationDelay: h.delay }} />
      ))}

      {/* BALLOONS — clustered left, right, and bottom center */}
      {[
        { left: '3%',  bottom: '18%', color: '#85CAFF', size: 'w-10 sm:w-14', delay: 0.5 },
        { left: '9%',  bottom: '5%',  color: '#FFB8D9', size: 'w-8  sm:w-11', delay: 0.8 },
        { left: '16%', bottom: '28%', color: '#E6D6FF', size: 'w-7  sm:w-10', delay: 1.0 },
        { left: '82%', bottom: '20%', color: '#FFD6E8', size: 'w-10 sm:w-14', delay: 0.6 },
        { left: '75%', bottom: '32%', color: '#FFF2B3', size: 'w-7  sm:w-10', delay: 1.1 },
        { left: '44%', bottom: '-4%', color: '#FFB8D9', size: 'w-8  sm:w-11', delay: 1.2 },
        { left: '55%', bottom: '3%',  color: '#C8E9FF', size: 'w-7  sm:w-9',  delay: 1.4 },
      ].map((b, i) => (
        <motion.div key={i}
          className={`absolute ${b.size} animate-bob`}
          style={{ left: b.left, bottom: b.bottom, animationDelay: `${i * 0.35}s` }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: b.delay, duration: 0.9, ease: 'easeOut' }}>
          <BalloonIcon color={b.color} className="w-full drop-shadow-lg" />
        </motion.div>
      ))}

      {/* FOOTPRINTS — scattered across empty areas */}
      {[
        { left: '5%',  top: '42%', rotate: '20deg',  delay: '0s',   opacity: 0.25 },
        { left: '12%', top: '55%', rotate: '-15deg', delay: '0.4s', opacity: 0.20 },
        { left: '72%', top: '40%', rotate: '10deg',  delay: '0.8s', opacity: 0.25 },
        { left: '80%', top: '52%', rotate: '-8deg',  delay: '0.2s', opacity: 0.20 },
        { left: '28%', top: '72%', rotate: '15deg',  delay: '1.0s', opacity: 0.18 },
        { left: '60%', top: '68%', rotate: '-20deg', delay: '0.6s', opacity: 0.18 },
        { left: '40%', top: '15%', rotate: '8deg',   delay: '1.2s', opacity: 0.15 },
      ].map((p, i) => (
        <FootprintIcon key={i}
          className="absolute w-7 sm:w-9 animate-floatYSlow"
          style={{ left: p.left, top: p.top, opacity: p.opacity, transform: `rotate(${p.rotate})`, animationDelay: p.delay }} />
      ))}

      {/* STARS — filling left and right voids */}
      {[
        { left: '6%',  top: '18%', size: 16, delay: '0s',   color: '#FDE68A' },
        { left: '14%', top: '34%', size: 11, delay: '0.9s', color: '#C4B5FD' },
        { left: '7%',  top: '64%', size: 14, delay: '1.6s', color: '#F9A8D4' },
        { left: '20%', top: '80%', size: 10, delay: '0.5s', color: '#FDE68A' },
        { left: '86%', top: '14%', size: 13, delay: '0.3s', color: '#C4B5FD' },
        { left: '78%', top: '30%', size: 10, delay: '1.1s', color: '#FDE68A' },
        { left: '90%', top: '62%', size: 15, delay: '0.7s', color: '#F9A8D4' },
        { left: '74%', top: '78%', size: 11, delay: '1.9s', color: '#FDE68A' },
        { left: '38%', top: '8%',  size: 10, delay: '1.3s', color: '#C4B5FD' },
        { left: '58%', top: '12%', size: 13, delay: '0.2s', color: '#FDE68A' },
        { left: '35%', top: '88%', size: 10, delay: '0.8s', color: '#F9A8D4' },
        { left: '62%', top: '84%', size: 12, delay: '1.5s', color: '#C4B5FD' },
      ].map((s, i) => (
        <StarIcon key={i}
          className="absolute animate-twinkle"
          style={{
            left: s.left, top: s.top,
            width: s.size, height: s.size,
            color: s.color,
            animationDelay: s.delay,
            filter: 'drop-shadow(0 0 3px currentColor)',
          }} />
      ))}
    </div>
  )
}