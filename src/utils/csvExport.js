/**
 * Converts an array of RSVP objects into a downloadable CSV file
 * and triggers the browser download.
 *
 * @param {Array<Object>} rows - RSVP records
 * @param {string} filename - desired file name (default: rsvps.csv)
 */
export function exportRsvpsToCsv(rows, filename = 'rsvps.csv') {
  if (!rows || rows.length === 0) return

  const headers = [
    'Full Name',
    'Phone Number',
    'Guests',
    'Attendance',
    'Message',
    'Submitted At',
  ]

  const escapeCell = (value) => {
    const str = String(value ?? '')
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`
    }
    return str
  }

  const lines = [headers.join(',')]

  rows.forEach((row) => {
    const submitted = row.submittedAt
      ? new Date(
          typeof row.submittedAt?.toDate === 'function'
            ? row.submittedAt.toDate()
            : row.submittedAt
        ).toLocaleString()
      : ''

    lines.push(
      [
        escapeCell(row.fullName),
        escapeCell(row.phoneNumber),
        escapeCell(row.guestCount),
        escapeCell(row.attendance),
        escapeCell(row.message),
        escapeCell(submitted),
      ].join(',')
    )
  })

  const csvContent = lines.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}