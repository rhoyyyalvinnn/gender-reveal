import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, Plus, Minus } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { submitRsvp } from '../firebase/rsvpService.js'
import { useConfetti } from '../hooks/useConfetti.js'

const initialFormState = {
  fullName: '',
  phoneNumber: '',
  attendance: '',
  guestCount: 1,
  // guestNames only tracks ACCOMPANYING guests (index 0 = first extra guest)
  // The submitter themselves is added at submit/summary time from fullName
  guestNames: [],
  message: '',
}

/**
 * SLIDE 9 — RSVP Section
 * Phase 1 (form): user fills their name, phone, attendance, + accompanying guests by name.
 * Phase 2 (summary): shows full guest list with submitter as "Guest 1 (You)".
 */
export default function RsvpSection() {
  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('')
  const [showSummary, setShowSummary] = useState(false)
  const { successBurst } = useConfetti()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleGuestNameChange = (index, value) => {
    const newGuestNames = [...values.guestNames]
    newGuestNames[index] = value
    setValues((prev) => ({ ...prev, guestNames: newGuestNames }))
    if (errors[`guestName-${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`guestName-${index}`]
        return newErrors
      })
    }
  }

  // accompanyingCount = total guests minus the submitter themselves
  const accompanyingCount = values.guestCount - 1

  const handleGuestCountChange = (direction) => {
    const newCount =
      direction === 'add'
        ? Math.min(values.guestCount + 1, 20)
        : Math.max(values.guestCount - 1, 1)

    const newAccompanying = newCount - 1
    const newGuestNames = values.guestNames.slice(0, newAccompanying)
    while (newGuestNames.length < newAccompanying) newGuestNames.push('')

    setValues((prev) => ({
      ...prev,
      guestCount: newCount,
      guestNames: newGuestNames,
    }))
  }

  const handleAttendanceChange = (option) => {
    setValues((prev) => ({
      ...prev,
      attendance: option,
      guestCount: 1,
      guestNames: [],
    }))
    setErrors((prev) => ({ ...prev, attendance: '' }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!values.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!values.phoneNumber.trim()) newErrors.phoneNumber = 'Contact number is required'
    if (!values.attendance) newErrors.attendance = 'Please select your attendance option'

    if (values.attendance === 'Happily Attending') {
      values.guestNames.forEach((name, index) => {
        if (!name.trim()) {
          newErrors[`guestName-${index}`] = 'Guest name is required'
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = () => {
    if (validateForm()) setShowSummary(true)
  }

  const handleSubmit = async () => {
    setStatus('submitting')
    setSubmitError('')

    try {
      // Build full guest list: submitter first, then accompanying guests
      const fullGuestNames = [
        values.fullName.trim(),
        ...values.guestNames.map((n) => n.trim()),
      ]

      const submitData = {
        fullName: values.fullName.trim(),
        phoneNumber: values.phoneNumber.trim(),
        attendance: values.attendance,
        guestCount: values.guestCount,
        guestNames: fullGuestNames,
        message: values.message.trim(),
        submittedAt: new Date().toISOString(),
      }

      await submitRsvp(submitData)
      setStatus('success')
      successBurst()
      setValues(initialFormState)
      setShowSummary(false)
    } catch (err) {
      setStatus('error')
      setSubmitError(err.message || 'Something went wrong. Please try again.')
      setShowSummary(false)
    }
  }

  return (
    <SectionContainer
      id="rsvp"
      background={
        <FloatingBackground layers={['clouds', 'hearts']} gradient="from-soft-pink via-cream to-baby-blue" />
      }
      className="text-center"
    >
      <h2 className="font-heading text-3xl sm:text-5xl font-bold gradient-text mb-2 sm:mb-3">
        Will You Celebrate With Us?
      </h2>
      <p className="font-body text-sm sm:text-lg text-[#5B4B66] mb-6 sm:mb-8 px-2">
        Please RSVP below — we'd love to know if you can make it!
      </p>

      {/* RSVP Deadline Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-soft-pink/30 to-baby-blue/30 border-2 border-soft-pink/50"
      >
        <p className="font-heading text-xs sm:text-sm uppercase tracking-widest text-soft-pink-deep">
          📅 RSVP Deadline: July 11, 2026
        </p>
      </motion.div>

      {/* Main Form or Summary */}
      {!showSummary ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="invite-card relative z-20 max-w-2xl mx-auto p-4 sm:p-8 shadow-2xl text-left space-y-5 sm:space-y-6"
        >
          {/* Attendance Selection */}
          <div>
            <label className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-3">
              Will you be attending?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {['Happily Attending', "Sorry, I Can't Attend"].map((option) => (
                <button
                  key={option}
                  onClick={() => handleAttendanceChange(option)}
                  className={`p-3 sm:p-4 rounded-2xl border-2 font-body text-sm sm:text-base transition-all ${
                    values.attendance === option
                      ? option === 'Happily Attending'
                        ? 'border-soft-pink-deep bg-soft-pink/40'
                        : 'border-baby-blue-deep bg-baby-blue/40'
                      : 'border-cream bg-white/60 hover:border-soft-pink/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.attendance && (
              <p className="text-xs sm:text-sm text-red-500 mt-2">{errors.attendance}</p>
            )}
          </div>

          {/* Full Name */}
          <FieldInput
            label="Your Full Name"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="John Doe"
            required
          />

          {/* Contact Number */}
          <FieldInput
            label="Contact Number"
            name="phoneNumber"
            type="tel"
            value={values.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            placeholder="+639 (12) 345-6789"
            required
          />

          {/* Guest section — only if attending */}
          {values.attendance === 'Happily Attending' && (
            <>
              {/* Guest Count */}
              <div>
                <label className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-2">
                  Number of Guests
                </label>
                <p className="font-body text-xs sm:text-sm text-[#5B4B66] mb-3">
                  Include yourself in the count. If you're bringing others, add their names below.
                </p>

                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 p-4 rounded-2xl bg-white/40">
                  <button
                    onClick={() => handleGuestCountChange('subtract')}
                    disabled={values.guestCount <= 1}
                    className="p-2 rounded-full bg-soft-pink/30 text-soft-pink-deep disabled:opacity-50 disabled:cursor-not-allowed hover:bg-soft-pink/50 transition"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-heading text-2xl sm:text-3xl text-soft-pink-deep w-12 text-center">
                    {values.guestCount}
                  </span>
                  <button
                    onClick={() => handleGuestCountChange('add')}
                    disabled={values.guestCount >= 20}
                    className="p-2 rounded-full bg-baby-blue/30 text-baby-blue-deep disabled:opacity-50 disabled:cursor-not-allowed hover:bg-baby-blue/50 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Accompanying guest name fields (only shown when guestCount > 1) */}
              {accompanyingCount > 0 && (
                <div className="space-y-3">
                  <label className="block font-heading text-xs sm:text-sm uppercase tracking-widest text-baby-blue-deep">
                    Accompanying Guests
                  </label>
                  {values.guestNames.map((name, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`guest-${index}`}
                        className="block font-heading text-xs uppercase tracking-widest text-[#5B4B66]/60 mb-1"
                      >
                        Guest {index + 2}
                      </label>
                      <input
                        id={`guest-${index}`}
                        type="text"
                        value={name}
                        onChange={(e) => handleGuestNameChange(index, e.target.value)}
                        placeholder="Full name"
                        className="w-full rounded-2xl border-2 border-cream bg-white/70 px-3 sm:px-4 py-2 sm:py-3 font-body text-xs sm:text-base text-[#5B4B66] focus:border-baby-blue-deep focus:outline-none transition"
                        aria-invalid={!!errors[`guestName-${index}`]}
                      />
                      {errors[`guestName-${index}`] && (
                        <p className="text-xs text-red-500 mt-1">{errors[`guestName-${index}`]}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Optional message — attending */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={2}
                  value={values.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-cream bg-white/70 px-3 sm:px-4 py-2 sm:py-3 font-body text-xs sm:text-base text-[#5B4B66] focus:border-soft-pink-deep focus:outline-none"
                  placeholder="Share your excitement or well wishes!"
                />
              </div>
            </>
          )}

          {/* Optional message — not attending */}
          {values.attendance === "Sorry, I Can't Attend" && (
            <div>
              <label
                htmlFor="message-decline"
                className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1"
              >
                Message (Optional)
              </label>
              <textarea
                id="message-decline"
                name="message"
                rows={3}
                value={values.message}
                onChange={handleChange}
                className="w-full rounded-2xl border-2 border-cream bg-white/70 px-3 sm:px-4 py-2 sm:py-3 font-body text-xs sm:text-base text-[#5B4B66] focus:border-soft-pink-deep focus:outline-none"
                placeholder="We'll miss you! Send your best wishes."
              />
            </div>
          )}

          {status === 'error' && (
            <p role="alert" className="text-xs sm:text-sm text-red-500 text-center bg-red-100 p-2 rounded">
              {submitError}
            </p>
          )}

          <div className="flex gap-3 justify-center pt-2">
            <PrimaryButton onClick={handleContinue} variant="pink">
              Continue
            </PrimaryButton>
          </div>
        </motion.div>
      ) : (
        <SummaryView
          values={values}
          onBack={() => setShowSummary(false)}
          onSubmit={handleSubmit}
          isSubmitting={status === 'submitting'}
        />
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="RSVP submitted successfully"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStatus('idle')}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="invite-card relative z-30 max-w-sm w-full p-6 sm:p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-baby-blue-deep mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#5B4B66] mb-2">Thank You!</h3>
              <p className="font-body text-xs sm:text-base text-[#5B4B66]/80 mb-6">
                Your RSVP has been received. We can't wait to celebrate with you!
              </p>
              <PrimaryButton variant="blue" onClick={() => setStatus('idle')}>
                Close
              </PrimaryButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  )
}

function FieldInput({ label, name, error, required, ...inputProps }) {
  return (
    <div>
      <label htmlFor={name} className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1">
        {label} {required && '*'}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-2xl border-2 border-cream bg-white/70 px-3 sm:px-4 py-2 sm:py-3 font-body text-xs sm:text-base text-[#5B4B66] focus:border-soft-pink-deep focus:outline-none transition"
        {...inputProps}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs sm:text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

function SummaryView({ values, onBack, onSubmit, isSubmitting }) {
  // Build the full guest list for display: submitter is always Guest 1
  const fullGuestList = [
    values.fullName.trim() || '—',
    ...values.guestNames.map((n) => n.trim() || '—'),
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="invite-card relative z-20 max-w-2xl mx-auto p-4 sm:p-8 shadow-2xl text-left space-y-5"
    >
      <h3 className="font-heading text-xl sm:text-2xl font-bold text-soft-pink-deep text-center mb-6">
        Review Your RSVP
      </h3>

      <SummaryItem label="Attendance" value={values.attendance} />
      <SummaryItem label="Contact Number" value={values.phoneNumber} />

      {values.attendance === 'Happily Attending' && (
        <>
          <SummaryItem label="Total Guests" value={`${values.guestCount}`} />

          <div className="space-y-2">
            <p className="font-heading text-sm uppercase tracking-widest text-baby-blue-deep">
              Guest Names
            </p>
            <div className="bg-white/40 rounded-2xl p-4 space-y-2">
              {fullGuestList.map((name, index) => (
                <div key={index} className="flex justify-between text-xs sm:text-sm font-body">
                  <span className="text-[#5B4B66]/70">
                    {index === 0 ? 'Guest 1 (You)' : `Guest ${index + 1}`}:
                  </span>
                  <span className="font-semibold text-[#5B4B66]">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {values.message && <SummaryItem label="Your Message" value={values.message} />}
        </>
      )}

      {values.attendance === "Sorry, I Can't Attend" && values.message && (
        <SummaryItem label="Your Message" value={values.message} />
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <button
          onClick={onBack}
          className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border-2 border-cream bg-white/60 font-heading text-xs sm:text-sm uppercase tracking-widest text-[#5B4B66] hover:border-soft-pink transition"
        >
          Back
        </button>
        <PrimaryButton onClick={onSubmit} disabled={isSubmitting} variant="pink">
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              Submitting...
            </span>
          ) : (
            'Submit RSVP 💌'
          )}
        </PrimaryButton>
      </div>
    </motion.div>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-3 border-b border-cream">
      <span className="font-heading text-sm uppercase tracking-widest text-soft-pink-deep">{label}</span>
      <span className="font-body text-xs sm:text-base text-[#5B4B66] font-semibold">{value}</span>
    </div>
  )
}