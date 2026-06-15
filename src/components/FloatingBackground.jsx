import { motion, useScroll, useTransform } from 'framer-motion'
import {
  CloudIcon,
  StarIcon,
  MoonIcon,
  BalloonIcon,
  HeartIcon,
  FootprintIcon,
} from './decor/Decorations.jsx'

/**
 * FloatingBackground renders ambient, decorative animations behind a slide's
 * content. Choose one or more "layers" depending on the mood of the section.
 *
 * Props:
 *  - layers: array of strings -> any of
 *      'clouds' | 'stars' | 'moon' | 'balloons' | 'hearts' | 'footprints'
 *  - gradient: tailwind gradient classes for the section background
 */
export default function FloatingBackground({
  layers = ['clouds'],
  gradient = 'from-soft-pink via-cream to-baby-blue',
}) {
  const { scrollYProgress } = useScroll()
  // Gentle parallax: background drifts slower than scroll
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${gradient}`}
      style={{ y: parallaxY }}
    >
      {layers.includes('clouds') && <CloudsLayer />}
      {layers.includes('stars') && <StarsLayer />}
      {layers.includes('moon') && <MoonLayer />}
      {layers.includes('balloons') && <BalloonsLayer />}
      {layers.includes('hearts') && <HeartsLayer />}
      {layers.includes('footprints') && <FootprintsLayer />}
    </motion.div>
  )
}

function CloudsLayer() {
  const clouds = [
    {
      top: '8%',
      size: 'w-40',
      opacity: 0.95,
      duration: 75,
      delay: 0,
    },
    {
      top: '22%',
      size: 'w-56',
      opacity: 0.85,
      duration: 95,
      delay: 4,
    },
    {
      top: '45%',
      size: 'w-32',
      opacity: 0.9,
      duration: 70,
      delay: 8,
    },
    {
      top: '70%',
      size: 'w-48',
      opacity: 0.8,
      duration: 110,
      delay: 12,
    },
  ]

  return (
    <>
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className={`absolute ${cloud.size}`}
          style={{
            top: cloud.top,
            opacity: cloud.opacity,
          }}
          initial={{
            x: '-30vw',
            color: '#60A5FA',
          }}
          animate={{
            x: '120vw',
            color: ['#60A5FA', '#60A5FA', '#FBCFE8', '#FBCFE8'],
          }}
          transition={{
            x: {
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: cloud.delay,
            },
            color: {
              duration: cloud.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: cloud.delay,
              times: [0, 0.48, 0.52, 1],
            },
          }}
        >
          <CloudIcon
            className="w-full drop-shadow-lg"
            color="currentColor"
          />
        </motion.div>
      ))}
    </>
  )
}

function StarsLayer() {
  const positions = [
    '10% 15%', '25% 35%', '40% 10%', '60% 25%', '75% 12%', '85% 40%',
    '15% 60%', '50% 70%', '90% 65%', '30% 85%', '70% 90%', '5% 45%',
  ]
  return (
    <>
      {positions.map((pos, i) => {
        const [left, top] = pos.split(' ')
        return (
          <StarIcon
            key={i}
            className="absolute text-light-yellow animate-twinkle"
            style={{
              left,
              top,
              width: `${10 + (i % 3) * 6}px`,
              height: `${10 + (i % 3) * 6}px`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        )
      })}
    </>
  )
}

function MoonLayer() {
  return (
    <MoonIcon className="absolute top-[8%] right-[10%] w-16 h-16 text-light-yellow animate-floatYSlow drop-shadow-lg" />
  )
}

function BalloonsLayer() {
  const balloons = [
    { left: '6%', color: '#60A5FA', size: 'w-16', delay: '0.1s', top: '8%' },
    { left: '14%', color: '#93C5FD', size: 'w-14', delay: '0.6s', bottom: '12%' },
    { left: '26%', color: '#A5B4FC', size: 'w-12', delay: '1.1s', top: '20%' },
    { left: '32%', color: '#60A5FA', size: 'w-14', delay: '0.9s', bottom: '8%' },
    { left: '70%', color: '#FBCFE8', size: 'w-16', delay: '0.2s', top: '10%' },
    { left: '78%', color: '#F9A8D4', size: 'w-14', delay: '0.7s', bottom: '14%' },
    { left: '88%', color: '#FDE1EF', size: 'w-12', delay: '1.2s', top: '24%' },
    { left: '94%', color: '#FBCFE8', size: 'w-14', delay: '1.6s', bottom: '6%' },
  ]
  return (
    <>
      {balloons.map((b, i) => (
        <div
          key={i}
          className={`absolute ${b.size} animate-bob`}
          style={{ left: b.left, top: b.top, bottom: b.bottom, animationDelay: b.delay }}
        >
          <BalloonIcon color={b.color} className="w-full drop-shadow-md" />
        </div>
      ))}
    </>
  )
}

function HeartsLayer() {
  const hearts = [
    { left: '10%', delay: '0s', size: 'w-4', color: '#FF9EC4' },
    { left: '30%', delay: '2s', size: 'w-6', color: '#FFD6E8' },
    { left: '55%', delay: '1s', size: 'w-5', color: '#FF9EC4' },
    { left: '75%', delay: '3s', size: 'w-4', color: '#C7A9FF' },
    { left: '90%', delay: '1.5s', size: 'w-6', color: '#FFD6E8' },
    { left: '45%', delay: '4s', size: 'w-3', color: '#FF9EC4' },
  ]
  return (
    <>
      {hearts.map((h, i) => (
        <HeartIcon
          key={i}
          color={h.color}
          className={`absolute bottom-0 ${h.size} animate-heartFloat`}
          style={{ left: h.left, animationDelay: h.delay }}
        />
      ))}
    </>
  )
}

function FootprintsLayer() {
  const prints = [
    { left: '12%', top: '20%', rotate: '15deg' },
    { left: '20%', top: '32%', rotate: '-10deg' },
    { left: '75%', top: '15%', rotate: '-20deg' },
    { left: '82%', top: '28%', rotate: '10deg' },
    { left: '50%', top: '78%', rotate: '5deg' },
  ]
  return (
    <>
      {prints.map((p, i) => (
        <FootprintIcon
          key={i}
          className="absolute w-6 opacity-30 animate-floatYSlow"
          style={{ left: p.left, top: p.top, transform: `rotate(${p.rotate})`, animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </>
  )
}
