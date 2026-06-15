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
    { top: '8%', size: 'w-40', duration: 'animate-drift', delay: '0s', opacity: 0.9 },
    { top: '22%', size: 'w-56', duration: 'animate-driftSlow', delay: '5s', opacity: 0.7 },
    { top: '45%', size: 'w-32', duration: 'animate-drift', delay: '12s', opacity: 0.8 },
    { top: '70%', size: 'w-48', duration: 'animate-driftSlow', delay: '3s', opacity: 0.6 },
  ]

  return (
    <>
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className={`absolute ${cloud.size} ${cloud.duration}`}
          style={{ top: cloud.top, left: '-15%', opacity: cloud.opacity, animationDelay: cloud.delay }}
        >
          <CloudIcon className="w-full drop-shadow-sm" />
        </div>
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
    { left: '8%', color: '#FFD6E8', size: 'w-14', delay: '0s' },
    { left: '78%', color: '#A7D8FF', size: 'w-20', delay: '1.5s' },
    { left: '45%', color: '#E6D6FF', size: 'w-12', delay: '0.8s' },
    { left: '60%', color: '#FFF2B3', size: 'w-16', delay: '2.2s' },
    { left: '20%', color: '#A7D8FF', size: 'w-10', delay: '1s' },
  ]
  return (
    <>
      {balloons.map((b, i) => (
        <div
          key={i}
          className={`absolute bottom-[-10%] ${b.size} animate-bob`}
          style={{ left: b.left, animationDelay: b.delay }}
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
