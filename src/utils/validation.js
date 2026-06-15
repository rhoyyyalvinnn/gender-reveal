/**
 * Validation helpers for the RSVP form.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validates the RSVP form data.
 * @param {Object} values
 * @returns {Object} errors - map of field name -> error message (empty if valid)
 */
export function validateRsvpForm(values) {
  const errors = {}

  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = 'Please tell us your name.'
  }

  if (!values.email || !values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!values.phoneNumber || !values.phoneNumber.trim()) {
    errors.phoneNumber = 'Please enter a phone number.'
  }

  if (!values.attendance) {
    errors.attendance = 'Please let us know if you can attend.'
  }

  if (values.attendance === 'Happily Attending') {
    const guestCount = Number(values.guestCount)
    if (!values.guestCount || Number.isNaN(guestCount) || guestCount < 1) {
      errors.guestCount = 'Please enter how many guests will attend.'
    }
  }

  return errors
}

export function isFormValid(errors) {
  return Object.keys(errors).length === 0
}
