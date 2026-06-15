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
  const { momName, dadName, gallery } = eventConfig.parents

  return (
    <SectionContainer
      id="parents"
      background={<FloatingBackground layers={['hearts']} gradient="from-lavender via-cream to-soft-pink" />}
      className="text-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-4">
        Meet the Parents-to-Be
      </h2>

      <p className="font-body text-lg sm:text-xl text-[#5B4B66] max-w-xl mx-auto mb-12">
        Join us as we celebrate the upcoming arrival of our little bundle of joy.
      </p>

      <div className="relative mx-auto mb-10 w-full max-w-5xl px-4 sm:px-0">
        <div className="relative flex items-center justify-center">
          <div className="absolute left-[14%] top-16 w-44 h-64 sm:w-52 sm:h-80 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white/80 z-0 transform -translate-x-4">
            <img
              src={gallery[0]}
              alt="Parents gallery left"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="absolute right-[14%] top-16 w-44 h-64 sm:w-52 sm:h-80 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-white/80 z-0 transform translate-x-4">
            <img
              src={gallery[2]}
              alt="Parents gallery right"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="relative z-10 w-72 h-96 sm:w-80 sm:h-[28rem] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-[0_35px_75px_rgba(0,0,0,0.15)] bg-white/90">
            <img
              src={gallery[1]}
              alt="Parents gallery center"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-full">
        <div className="w-full max-w-3xl">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center justify-items-center gap-4">
            <span className="text-soft-pink-deep font-heading text-3xl sm:text-4xl font-bold text-right">
              {momName}
            </span>
            <span className="text-[#5B4B66] text-5xl font-bold">&amp;</span>
            <span className="text-baby-blue-deep font-heading text-3xl sm:text-4xl font-bold text-left">
              {dadName}
            </span>
          </div>
        </div>
        <p className="font-body text-sm uppercase tracking-widest text-[#5B4B66]">
          Mom &amp; Dad
        </p>
      </div>
    </SectionContainer>
  )
}
