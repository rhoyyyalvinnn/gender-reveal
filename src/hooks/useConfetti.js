import { useCallback } from 'react'
import confetti from 'canvas-confetti'

/**
 * useConfetti
 * Returns trigger functions for various confetti effects used across the
 * invitation (welcome burst, gender reveal explosion, RSVP success).
 */
export function useConfetti() {
  const burst = useCallback((options = {}) => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#A7D8FF', '#E6D6FF', '#FFF2B3', '#FFFFFF'],
      ...options,
    })
  }, [])

  const genderBurst = useCallback((status) => {
    let colors = ['#FFD6E8', '#A7D8FF', '#E6D6FF', '#FFF2B3']
    if (status === 'boy') colors = ['#A7D8FF', '#FFFFFF', '#E6D6FF']
    if (status === 'girl') colors = ['#FFD6E8', '#FF9EC4', '#FFFFFF']

    // Big celebratory burst from both sides
    const end = Date.now() + 1200
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    // Central pop
    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.5 },
      colors,
    })
  }, [])

  const fireworks = useCallback(() => {
    const colors = ['#FFD6E8', '#A7D8FF', '#FFF2B3', '#E6D6FF']
    const duration = 1500
    const end = Date.now() + duration

    ;(function frame() {
      confetti({
        particleCount: 4,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
        colors,
        shapes: ['star', 'circle'],
        scalar: 1.1,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [])

  const successBurst = useCallback(() => {
    confetti({
      particleCount: 180,
      spread: 120,
      startVelocity: 40,
      origin: { y: 0.6 },
      colors: ['#FFD6E8', '#A7D8FF', '#E6D6FF', '#FFF2B3', '#FFFFFF'],
    })
  }, [])

  return { burst, genderBurst, fireworks, successBurst }
}
