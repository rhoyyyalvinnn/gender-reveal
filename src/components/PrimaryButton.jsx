import { motion } from 'framer-motion'

/**
 * A cheerful, rounded call-to-action button with a gentle "pop" on hover/tap.
 * Spread any extra props (onClick, type, aria-label, etc.) directly onto the button.
 */
export default function PrimaryButton({
  children,
  className = '',
  variant = 'pink',
  ...props
}) {
  const variants = {
    pink: 'bg-soft-pink-deep text-white hover:bg-soft-pink-deep/90',
    blue: 'bg-baby-blue-deep text-white hover:bg-baby-blue-deep/90',
    lavender: 'bg-lavender-deep text-white hover:bg-lavender-deep/90',
    outline: 'bg-white/80 text-soft-pink-deep border-2 border-soft-pink-deep hover:bg-soft-pink/40',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.06, rotate: -1 }}
      whileTap={{ scale: 0.95, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`px-8 py-3 rounded-full font-heading font-semibold text-lg shadow-lg shadow-soft-pink-deep/20 transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
