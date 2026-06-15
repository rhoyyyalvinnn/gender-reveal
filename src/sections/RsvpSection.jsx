import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2 } from 'lucide-react'
import SectionContainer from '../components/SectionContainer.jsx'
import FloatingBackground from '../components/FloatingBackground.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import { validateRsvpForm, isFormValid } from '../utils/validation.js'
import { submitRsvp } from '../firebase/rsvpService.js'
import { useConfetti } from '../hooks/useConfetti.js'

const initialFormState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  guestCount: '1',
  attendance: '',
  message: '',
}

/**
 * SLIDE 9 — RSVP Section
 * The final slide. Collects guest responses and writes them to the
 * `rsvps` collection in Firestore. Shows inline validation, a loading
 * state while submitting, and a celebratory success popup with confetti.
 */
export default function RsvpSection() {
  const [values, setValues] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [submitError, setSubmitError] = useState('')
  const { successBurst } = useConfetti()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateRsvpForm(values)
    setErrors(validationErrors)
    if (!isFormValid(validationErrors)) return

    setStatus('submitting')
    setSubmitError('')

    try {
      await submitRsvp(values)
      setStatus('success')
      successBurst()
      setValues(initialFormState)
    } catch (err) {
      setStatus('error')
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <SectionContainer
      id="rsvp"
      background={
        <FloatingBackground layers={['clouds', 'balloons', 'hearts']} gradient="from-soft-pink via-cream to-baby-blue" />
      }
      className="text-center"
    >
      <h2 className="font-heading text-4xl sm:text-5xl font-bold gradient-text mb-3">
        Will You Celebrate With Us?
      </h2>
      <p className="font-body text-lg text-[#5B4B66] mb-12">
        Please RSVP by filling out the form below.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="invite-card relative z-20 max-w-xl mx-auto p-6 sm:p-10 shadow-2xl text-left space-y-5"
        noValidate
      >
        <Field
          label="Full Name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
          required
        />

        <Field
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />

        <Field
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={values.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          autoComplete="tel"
          required
        />

        <fieldset>
          <legend className="font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-2">
            Will you be attending?
          </legend>
          <div className="flex flex-col sm:flex-row gap-3">
            {['Happily Attending', "Sorry, Can't Attend"].map((option) => (
              <label
                key={option}
                className={`flex-1 cursor-pointer rounded-2xl border-2 px-4 py-3 text-center font-body transition-colors ${
                  values.attendance === option
                    ? 'border-soft-pink-deep bg-soft-pink/40'
                    : 'border-cream bg-white/60 hover:border-soft-pink'
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value={option}
                  checked={values.attendance === option}
                  onChange={handleChange}
                  className="sr-only"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.attendance && <p className="text-sm text-red-500 mt-1">{errors.attendance}</p>}
        </fieldset>

        {values.attendance === 'Happily Attending' && (
          <Field
            label="Number of Guests"
            name="guestCount"
            type="number"
            min="1"
            max="20"
            value={values.guestCount}
            onChange={handleChange}
            error={errors.guestCount}
            required
          />
        )}

        <div>
          <label htmlFor="message" className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1">
            Message for the Parents (optional)
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={values.message}
            onChange={handleChange}
            className="w-full rounded-2xl border-2 border-cream bg-white/70 px-4 py-3 font-body text-[#5B4B66] focus:border-soft-pink-deep focus:outline-none"
            placeholder="Share your excitement, well wishes, or advice!"
          />
        </div>

        {status === 'error' && (
          <p role="alert" className="text-sm text-red-500 text-center">
            {submitError}
          </p>
        )}

        <div className="flex justify-center pt-2">
          <PrimaryButton type="submit" variant="pink" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                Sending...
              </span>
            ) : (
              'Send RSVP 💌'
            )}
          </PrimaryButton>
        </div>
      </motion.form>

      {/* Success popup */}
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
              className="invite-card relative z-30 max-w-sm w-full p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle2 className="w-14 h-14 text-baby-blue-deep mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-heading text-2xl font-bold text-[#5B4B66] mb-2">Thank You!</h3>
              <p className="font-body text-[#5B4B66]/80 mb-6">
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

function Field({ label, name, error, ...inputProps }) {
  return (
    <div>
      <label htmlFor={name} className="block font-heading text-sm uppercase tracking-widest text-soft-pink-deep mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className="w-full rounded-2xl border-2 border-cream bg-white/70 px-4 py-3 font-body text-[#5B4B66] focus:border-soft-pink-deep focus:outline-none"
        {...inputProps}
      />
      {error && (
        <p id={`${name}-error`} role="alert" className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}
