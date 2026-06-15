import { useEffect, useState } from 'react'

/**
 * useCountdown
 * Returns a live-updating breakdown of time remaining until `targetDate`.
 *
 * @param {string|Date} targetDate - ISO date string or Date object
 * @returns {{days:number, hours:number, minutes:number, seconds:number, isPast:boolean}}
 */
export function useCountdown(targetDate) {
  const target = new Date(targetDate).getTime()

  const [timeLeft, setTimeLeft] = useState(() => calculate(target))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculate(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  return timeLeft
}

function calculate(target) {
  const now = Date.now()
  const distance = target - now

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isPast: false }
}
