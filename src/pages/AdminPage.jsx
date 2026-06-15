import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, Download, RefreshCw, ArrowLeft } from 'lucide-react'
import { getAllRsvps } from '../firebase/rsvpService.js'
import { exportRsvpsToCsv } from '../utils/csvExport.js'

/**
 * /admin — Optional dashboard for the hosts to review RSVP responses.
 *
 * NOTE: By default, Firestore security rules block reads from this
 * collection (see firestore.rules). To use this page, update the rules
 * to allow reads for authenticated admins (recommended) or, for a quick
 * start, allow public reads and keep this URL private.
 */
export default function AdminPage() {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

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
    return rsvps.filter((r) =>
      [r.fullName, r.email, r.phoneNumber, r.message]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term))
    )
  }, [rsvps, search])

  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.attendance === 'Happily Attending')
    const declined = rsvps.filter((r) => r.attendance === "Sorry, Can't Attend")
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B4B66]/50" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or message..."
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

        {/* Table */}
        {error && (
          <div className="invite-card p-4 mb-4 text-red-600 text-sm" role="alert">
            {error}
            <p className="mt-2 text-[#5B4B66]/80">
              If this is your first time here, check that your Firestore security rules allow
              the admin dashboard to read the <code>rsvps</code> collection (see{' '}
              <code>firestore.rules</code>).
            </p>
          </div>
        )}

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
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Guests</Th>
                  <Th>Status</Th>
                  <Th>Message</Th>
                  <Th>Submitted</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-cream last:border-0"
                  >
                    <Td>{r.fullName}</Td>
                    <Td>{r.email}</Td>
                    <Td>{r.phoneNumber}</Td>
                    <Td>{r.guestCount ?? 0}</Td>
                    <Td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          r.attendance === 'Happily Attending'
                            ? 'bg-baby-blue/40 text-baby-blue-deep'
                            : 'bg-soft-pink/40 text-soft-pink-deep'
                        }`}
                      >
                        {r.attendance}
                      </span>
                    </Td>
                    <Td className="max-w-xs truncate" title={r.message}>
                      {r.message || '—'}
                    </Td>
                    <Td>{formatDate(r.submittedAt)}</Td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
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

function Th({ children }) {
  return <th className="px-4 py-3 font-heading whitespace-nowrap">{children}</th>
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
  const date = typeof timestamp?.toDate === 'function' ? timestamp.toDate() : new Date(timestamp)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString()
}
