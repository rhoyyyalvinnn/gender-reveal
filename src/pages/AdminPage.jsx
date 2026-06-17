import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Download, RefreshCw, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react'
import { getAllRsvps } from '../firebase/rsvpService.js'
import { exportRsvpsToCsv } from '../utils/csvExport.js'

/**
 * /admin — Dashboard for hosts to review RSVP responses.
 * Updated to match new RSVP shape: no email, guestNames array instead.
 */
export default function AdminPage() {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalMessage, setModalMessage] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)

  const openModal = (msg) => setModalMessage(msg)
  const closeModal = () => setModalMessage(null)
  const TRUNCATE_LENGTH = 40
  const truncate = (text, n = TRUNCATE_LENGTH) =>
    text && text.length > n ? text.slice(0, n) + '...' : text

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getAllRsvps()
      setRsvps(data)
    } catch (err) {
      setError(err.message || 'Failed to load RSVPs.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return rsvps
    return rsvps.filter((r) => {
      const fields = [r.fullName, r.phoneNumber, r.message, ...(r.guestNames ?? [])]
      return fields.filter(Boolean).some((f) => f.toLowerCase().includes(term))
    })
  }, [rsvps, search])

  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.attendance === 'Happily Attending')
    const declined = rsvps.filter((r) => r.attendance === "Sorry, I Can't Attend")
    const totalGuests = attending.reduce((sum, r) => sum + (Number(r.guestCount) || 0), 0)
    return {
      totalResponses: rsvps.length,
      totalAttending: attending.length,
      totalDeclined: declined.length,
      totalGuests,
    }
  }, [rsvps])

  return (
    <div className="min-h-screen bg-cream font-body text-[#5B4B66] p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-soft-pink-deep hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to invitation
          </Link>
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-soft-pink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" />
            Refresh
          </button>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold gradient-text mb-6">
          RSVP Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Responses" value={stats.totalResponses} color="bg-soft-pink" />
          <StatCard label="Attending" value={stats.totalAttending} color="bg-baby-blue" />
          <StatCard label="Can't Attend" value={stats.totalDeclined} color="bg-lavender" />
          <StatCard label="Total Guests" value={stats.totalGuests} color="bg-light-yellow" />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B4B66]/50"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, guest, or message..."
              aria-label="Search RSVPs"
              className="w-full rounded-full border-2 border-cream bg-white px-10 py-2 focus:border-soft-pink-deep focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => exportRsvpsToCsv(filtered, 'baby-bloom-rsvps.csv')}
            disabled={filtered.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-soft-pink-deep text-white px-5 py-2 font-heading font-semibold shadow disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="invite-card p-4 mb-4 text-red-600 text-sm" role="alert">
            {error}
            <p className="mt-2 text-[#5B4B66]/80">
              Check that your Firestore security rules allow the admin dashboard to read the{' '}
              <code>rsvps</code> collection (see <code>firestore.rules</code>).
            </p>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <p className="text-center py-10">Loading RSVPs...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-10 text-[#5B4B66]/60">No RSVPs found.</p>
        ) : (
          <div className="overflow-x-auto invite-card shadow-lg">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-soft-pink/40">
                  <Th>Name</Th>
                  <Th>Phone</Th>
                  <Th className="whitespace-nowrap">Status</Th>
                  <Th>Guests</Th>
                  <Th>Message</Th>
                  <Th>Submitted</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => {
                  const isExpanded = expandedRow === r.id
                  const hasGuests = r.guestNames && r.guestNames.length > 0

                  return (
                    <>
                      <motion.tr
                        key={r.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-cream last:border-0"
                      >
                        {/* Name */}
                        <Td className="whitespace-nowrap font-semibold">{r.fullName}</Td>

                        {/* Phone */}
                        <Td className="whitespace-nowrap">{r.phoneNumber || '—'}</Td>

                        {/* Status badge */}
                        <Td className="whitespace-nowrap">
                          <span
                            className={`inline-block whitespace-nowrap px-2 py-1 rounded-full text-xs font-semibold ${
                              r.attendance === 'Happily Attending'
                                ? 'bg-baby-blue/40 text-baby-blue-deep'
                                : 'bg-soft-pink/40 text-soft-pink-deep'
                            }`}
                          >
                            {r.attendance}
                          </span>
                        </Td>

                        {/* Guest count + expand toggle */}
                        <Td>
                          {r.attendance === 'Happily Attending' ? (
                            <button
                              type="button"
                              onClick={() => setExpandedRow(isExpanded ? null : r.id)}
                              disabled={!hasGuests}
                              className="inline-flex items-center gap-1 text-baby-blue-deep hover:underline disabled:no-underline disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
                              aria-label={
                                isExpanded
                                  ? `Collapse guest list for ${r.fullName}`
                                  : `Expand guest list for ${r.fullName}`
                              }
                              aria-expanded={isExpanded}
                            >
                              <span className="font-semibold">{r.guestCount ?? 0}</span>
                              {hasGuests && (
                                isExpanded
                                  ? <ChevronUp className="w-3 h-3" />
                                  : <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          ) : (
                            <span className="text-[#5B4B66]/40">—</span>
                          )}
                        </Td>

                        {/* Message */}
                        <Td className="max-w-[10rem]">
                          {r.message ? (
                            <button
                              type="button"
                              onClick={() => openModal(r.message)}
                              className="text-left w-full truncate text-sm leading-tight hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
                              aria-label={`View full message from ${r.fullName}`}
                            >
                              {truncate(r.message)}
                            </button>
                          ) : (
                            '—'
                          )}
                        </Td>

                        {/* Date */}
                        <Td className="whitespace-nowrap text-xs text-[#5B4B66]/70">
                          {formatDate(r.submittedAt)}
                        </Td>
                      </motion.tr>

                      {/* Expandable guest names row */}
                      <AnimatePresence>
                        {isExpanded && hasGuests && (
                          <motion.tr
                            key={`${r.id}-guests`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <td colSpan={6} className="px-4 pb-4 pt-0 bg-baby-blue/10">
                              <div className="rounded-2xl bg-white/60 p-3 space-y-1">
                                <p className="font-heading text-xs uppercase tracking-widest text-baby-blue-deep mb-2">
                                  Guest Names
                                </p>
                                {r.guestNames.map((name, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center gap-2 text-xs sm:text-sm font-body text-[#5B4B66]"
                                  >
                                    <span className="text-[#5B4B66]/50 w-20 shrink-0">
                                      {idx === 0 ? 'Guest 1 (Host)' : `Guest ${idx + 1}`}
                                    </span>
                                    <span className="font-semibold">{name || '—'}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Full message modal */}
        {modalMessage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black/40" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative invite-card max-w-xl w-full p-6 shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-3 right-3 text-[#5B4B66]/50 hover:text-[#5B4B66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
                aria-label="Close message"
              >
                ✕
              </button>
              <h2 className="font-heading text-xl gradient-text font-bold mb-3">Message</h2>
              <p className="whitespace-pre-wrap text-sm sm:text-base text-[#5B4B66]">
                {modalMessage}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center shadow`}>
      <p className="font-heading text-2xl sm:text-3xl font-bold text-[#5B4B66]">{value}</p>
      <p className="font-body text-xs sm:text-sm uppercase tracking-wide text-[#5B4B66]/80">{label}</p>
    </div>
  )
}

function Th({ children, className = '' }) {
  return (
    <th className={`px-4 py-3 font-heading whitespace-nowrap ${className}`}>{children}</th>
  )
}

function Td({ children, className = '', ...props }) {
  return (
    <td className={`px-4 py-3 ${className}`} {...props}>
      {children}
    </td>
  )
}

function formatDate(timestamp) {
  if (!timestamp) return '—'
  const date =
    typeof timestamp?.toDate === 'function' ? timestamp.toDate() : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}