import { motion } from 'framer-motion'

/**
 * Small fixed-position dot navigation showing which "slide" of the
 * storybook invitation is currently active, and allowing guests to
 * jump directly to any section.
 */
export default function NavDots({ sections, activeId, onNavigate }) {
  return (
    <nav
      aria-label="Invitation sections"
      className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onNavigate(section.id)}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center justify-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded-full"
          >
            <span
              className="absolute right-6 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-xs font-body text-[#5B4B66] opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {section.label}
            </span>
            <motion.span
              animate={{
                scale: isActive ? 1.3 : 1,
                backgroundColor: isActive ? '#FF9EC4' : '#FFFFFF',
              }}
              transition={{ duration: 0.25 }}
              className="block w-3 h-3 rounded-full border-2 border-soft-pink-deep shadow"
            />
          </button>
        )
      })}
    </nav>
  )
}
