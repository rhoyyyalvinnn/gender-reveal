import { useEffect, useRef, useState } from 'react'
import WelcomeSection from '../sections/WelcomeSection.jsx'
import ParentsSection from '../sections/ParentsSection.jsx'
import GenderRevealSection from '../sections/GenderRevealSection.jsx'
import ShowerDetailsSection from '../sections/ShowerDetailsSection.jsx'
import AttireSection from '../sections/AttireSection.jsx'
import InvitationMessageSection from '../sections/InvitationMessageSection.jsx'
import GiftListSection from '../sections/GiftListSection.jsx'
import CountdownSection from '../sections/CountdownSection.jsx'
import RsvpSection from '../sections/RsvpSection.jsx'
import NavDots from '../components/NavDots.jsx'

const SECTIONS = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'invitation-message', label: 'Invitation' },
  { id: 'parents', label: 'Parents' },
  { id: 'gender-reveal', label: 'Reveal' },
  { id: 'shower-details', label: 'Details' },
  { id: 'attire', label: 'Attire' },
  { id: 'gift-list', label: 'Gifts' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'rsvp', label: 'RSVP' },
]

/**
 * HomePage renders the entire "storybook" invitation as a vertically
 * scroll-snapped sequence of full-screen sections. The first slide
 * (Welcome) locks scrolling until the guest taps "Open Invitation",
 * after which the rest of the invitation unfolds.
 */
export default function HomePage() {
  const containerRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [activeId, setActiveId] = useState('welcome')

  // Track which section is currently in view for the nav dots
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { root: container, threshold: 0.5 }
    )

    const slides = container.querySelectorAll('.snap-slide')
    slides.forEach((slide) => observer.observe(slide))

    return () => observer.disconnect()
  }, [])

  const handleOpen = () => {
    setStarted(true)
    // Scroll to the next slide once the storybook unlocks
    setTimeout(() => {
      const next = document.getElementById('invitation-message')
      next?.scrollIntoView({ behavior: 'smooth' })
    }, 250)
  }

  const handleNavigate = (id) => {
    if (!started && id !== 'welcome') {
      setStarted(true)
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <NavDots sections={SECTIONS} activeId={activeId} onNavigate={handleNavigate} />

      <div ref={containerRef} className={`snap-container ${started ? '' : 'locked'}`}>
        <WelcomeSection onOpen={handleOpen} />
        <InvitationMessageSection />
        <ParentsSection />
        <GenderRevealSection />
        <ShowerDetailsSection />
        <AttireSection />
        <GiftListSection />
        <CountdownSection />
        <RsvpSection />
      </div>
    </div>
  )
}
