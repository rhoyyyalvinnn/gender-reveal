import { motion } from 'framer-motion'

/**
 * SectionContainer wraps each "slide" of the storybook invitation.
 * It provides:
 *  - full-viewport height with scroll-snap alignment
 *  - a consistent fade/slide-up entrance animation when the slide
 *    scrolls into view
 *  - a slot for background decorations + foreground content
 *
 * Props:
 *  - id: anchor id for navigation
 *  - background: a <FloatingBackground /> element (or any decorative node)
 *  - className: extra classes for the content wrapper
 */
export default function SectionContainer({ id, background, className = '', children }) {
  return (
    <section id={id} className="snap-slide" aria-label={id}>
      {background}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`section-content relative z-10 w-full max-w-5xl mx-auto px-6 py-16 ${className}`}
      >
        {children}
      </motion.div>
    </section>
  )
}
