import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Search,
  Download,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Trash2,
  Eye,
  X,
  Users,
  Filter,
} from 'lucide-react'
import {
  getAllRsvps,
  deleteRsvp,
  removeGuestsFromRsvp,
} from '../firebase/rsvpService.js'
import { exportRsvpsToCsv } from '../utils/csvExport.js'

const ATTENDING = 'Happily Attending'
const DECLINED = "Sorry, I Can't Attend"

/**
 * /admin — Dashboard for hosts to review RSVP responses.
 * RSVP shape: no email, guestNames array instead.
 */
export default function AdminPage() {
  const [rsvps, setRsvps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalMessage, setModalMessage] = useState(null)
  const [expandedRow, setExpandedRow] = useState(null)

  // Filters
  const [statusFilter, setStatusFilter] = useState('All')
  const [guestCountFilter, setGuestCountFilter] = useState('All')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Details modal (view RSVP + manage accompanying guests)
  const [detailsRsvp, setDetailsRsvp] = useState(null)
  const [selectedGuestIdx, setSelectedGuestIdx] = useState([])
  const [guestToRemove, setGuestToRemove] = useState(null) // { idx, name } | 'bulk'
  const [guestActionLoading, setGuestActionLoading] = useState(false)
  const [guestActionError, setGuestActionError] = useState('')

  // Delete RSVP confirmation
  const [rsvpToDelete, setRsvpToDelete] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  // Guest list modal (from "Total Guests" card)
  const [showGuestList, setShowGuestList] = useState(false)

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

  const toDateObj = (timestamp) => {
    if (!timestamp) return null
    const date =
      typeof timestamp?.toDate === 'function' ? timestamp.toDate() : new Date(timestamp)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    const from = fromDate ? new Date(fromDate + 'T00:00:00') : null
    const to = toDate ? new Date(toDate + 'T23:59:59') : null

    return rsvps.filter((r) => {
      // Search
      if (term) {
        const fields = [r.fullName, r.phoneNumber, r.message, ...(r.guestNames ?? [])]
        const matches = fields.filter(Boolean).some((f) => f.toLowerCase().includes(term))
        if (!matches) return false
      }

      // Status filter
      if (statusFilter === 'Attending' && r.attendance !== ATTENDING) return false
      if (statusFilter === 'Not Attending' && r.attendance !== DECLINED) return false

      // Guest count filter
      if (guestCountFilter !== 'All') {
        const count = Number(r.guestCount) || 0
        if (guestCountFilter === '0' && count !== 0) return false
        if (guestCountFilter === '1' && count !== 1) return false
        if (guestCountFilter === '2' && count !== 2) return false
        if (guestCountFilter === '3+' && count < 3) return false
      }

      // Date range filter
      if (from || to) {
        const submitted = toDateObj(r.submittedAt)
        if (!submitted) return false
        if (from && submitted < from) return false
        if (to && submitted > to) return false
      }

      return true
    })
  }, [rsvps, search, statusFilter, guestCountFilter, fromDate, toDate])

  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.attendance === ATTENDING)
    const declined = rsvps.filter((r) => r.attendance === DECLINED)
    const totalGuests = attending.reduce((sum, r) => sum + (Number(r.guestCount) || 0), 0)
    return {
      totalResponses: rsvps.length,
      totalAttending: attending.length,
      totalDeclined: declined.length,
      totalGuests,
    }
  }, [rsvps])

  const activeFilterCount =
    (statusFilter !== 'All' ? 1 : 0) +
    (guestCountFilter !== 'All' ? 1 : 0) +
    (fromDate ? 1 : 0) +
    (toDate ? 1 : 0)

  const clearFilters = () => {
    setStatusFilter('All')
    setGuestCountFilter('All')
    setFromDate('')
    setToDate('')
  }

  // ---- Delete RSVP ----
  const confirmDeleteRsvp = (r) => {
    setDeleteError('')
    setRsvpToDelete(r)
  }

  const handleDeleteRsvp = async () => {
    if (!rsvpToDelete) return
    setDeleteLoading(true)
    setDeleteError('')
    try {
      await deleteRsvp(rsvpToDelete.id)
      setRsvps((prev) => prev.filter((r) => r.id !== rsvpToDelete.id))
      if (detailsRsvp?.id === rsvpToDelete.id) setDetailsRsvp(null)
      setRsvpToDelete(null)
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete RSVP.')
    } finally {
      setDeleteLoading(false)
    }
  }

  // ---- View details ----
  const openDetails = (r) => {
    setDetailsRsvp(r)
    setSelectedGuestIdx([])
    setGuestActionError('')
  }
  const closeDetails = () => {
    setDetailsRsvp(null)
    setSelectedGuestIdx([])
    setGuestActionError('')
  }

  // ---- Remove guest(s) ----
  const applyGuestRemoval = async (indicesToRemove) => {
    if (!detailsRsvp) return
    setGuestActionLoading(true)
    setGuestActionError('')
    try {
      const updatedNames = detailsRsvp.guestNames.filter(
        (_, idx) => !indicesToRemove.includes(idx)
      )
      await removeGuestsFromRsvp(detailsRsvp.id, updatedNames)

      const updatedRsvp = { ...detailsRsvp, guestNames: updatedNames, guestCount: updatedNames.length }
      setDetailsRsvp(updatedRsvp)
      setRsvps((prev) => prev.map((r) => (r.id === updatedRsvp.id ? updatedRsvp : r)))
      setSelectedGuestIdx([])
      setGuestToRemove(null)
    } catch (err) {
      setGuestActionError(err.message || 'Failed to remove guest(s).')
    } finally {
      setGuestActionLoading(false)
    }
  }

  const toggleGuestSelected = (idx) => {
    setSelectedGuestIdx((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    )
  }

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
          <StatCard
            label="Total Guests"
            value={stats.totalGuests}
            color="bg-light-yellow"
            onClick={() => setShowGuestList(true)}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
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
            onClick={() => setShowFilters((s) => !s)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2 text-sm shadow hover:bg-soft-pink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
            aria-expanded={showFilters}
          >
            <Filter className="w-4 h-4" aria-hidden="true" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-soft-pink-deep text-white text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
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

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="invite-card p-4 mb-4 grid grid-cols-1 sm:grid-cols-4 gap-3">
                <FilterField label="RSVP Status">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full rounded-lg border-2 border-cream bg-white px-3 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="Attending">Attending</option>
                    <option value="Not Attending">Not Attending</option>
                  </select>
                </FilterField>

                <FilterField label="Number of Guests">
                  <select
                    value={guestCountFilter}
                    onChange={(e) => setGuestCountFilter(e.target.value)}
                    className="w-full rounded-lg border-2 border-cream bg-white px-3 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
                  >
                    <option value="All">All</option>
                    <option value="0">No Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3+">3+ Guests</option>
                  </select>
                </FilterField>

                <FilterField label="From Date">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full rounded-lg border-2 border-cream bg-white px-3 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
                  />
                </FilterField>

                <FilterField label="To Date">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full rounded-lg border-2 border-cream bg-white px-3 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
                  />
                </FilterField>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="sm:col-span-4 text-sm text-soft-pink-deep hover:underline text-left"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
                  <Th className="whitespace-nowrap">Actions</Th>
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
                              r.attendance === ATTENDING
                                ? 'bg-baby-blue/40 text-baby-blue-deep'
                                : 'bg-soft-pink/40 text-soft-pink-deep'
                            }`}
                          >
                            {r.attendance}
                          </span>
                        </Td>

                        {/* Guest count + expand toggle */}
                        <Td>
                          {r.attendance === ATTENDING ? (
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

                        {/* Actions */}
                        <Td className="whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => openDetails(r)}
                              className="p-2 rounded-full hover:bg-baby-blue/30 text-baby-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
                              aria-label={`View details for ${r.fullName}`}
                              title="View details"
                            >
                              <Eye className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() => confirmDeleteRsvp(r)}
                              className="p-2 rounded-full hover:bg-red-100 text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
                              aria-label={`Delete RSVP for ${r.fullName}`}
                              title="Delete RSVP"
                            >
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
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
                            <td colSpan={7} className="px-4 pb-4 pt-0 bg-baby-blue/10">
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

        {/* RSVP details modal */}
        {detailsRsvp && (
          <DetailsModal
            rsvp={detailsRsvp}
            onClose={closeDetails}
            selectedGuestIdx={selectedGuestIdx}
            toggleGuestSelected={toggleGuestSelected}
            onRequestRemoveGuest={(idx, name) => setGuestToRemove({ idx, name })}
            onRequestBulkRemove={() => setGuestToRemove('bulk')}
            onRequestDeleteRsvp={() => confirmDeleteRsvp(detailsRsvp)}
            actionError={guestActionError}
          />
        )}

        {/* Confirm single/bulk guest removal */}
        {guestToRemove && detailsRsvp && (
          <ConfirmModal
            title={guestToRemove === 'bulk' ? 'Remove Selected Guests' : 'Remove Guest'}
            message={
              guestToRemove === 'bulk'
                ? `Remove ${selectedGuestIdx.length} selected accompanying guest${
                    selectedGuestIdx.length === 1 ? '' : 's'
                  } from this RSVP?`
                : 'Remove this accompanying guest from the RSVP?'
            }
            confirmLabel={guestToRemove === 'bulk' ? 'Delete Selected Guests' : 'Remove Guest'}
            confirmTone="danger"
            loading={guestActionLoading}
            error={guestActionError}
            onCancel={() => setGuestToRemove(null)}
            onConfirm={() =>
              applyGuestRemoval(
                guestToRemove === 'bulk' ? selectedGuestIdx : [guestToRemove.idx]
              )
            }
          />
        )}

        {/* Confirm RSVP deletion */}
        {rsvpToDelete && (
          <ConfirmModal
            title="Delete RSVP"
            message={
              <div className="space-y-2 text-left">
                <DetailRow label="Primary Guest" value={rsvpToDelete.fullName} />
                <DetailRow label="Phone" value={rsvpToDelete.phoneNumber || '—'} />
                <DetailRow
                  label="Accompanying Guests"
                  value={String(
                    rsvpToDelete.attendance === ATTENDING ? rsvpToDelete.guestCount ?? 0 : 0
                  )}
                />
                <p className="pt-2 text-sm text-red-600">
                  This action will permanently remove the RSVP record and all associated guest
                  information.
                </p>
              </div>
            }
            confirmLabel="Delete RSVP"
            confirmTone="danger"
            loading={deleteLoading}
            error={deleteError}
            onCancel={() => setRsvpToDelete(null)}
            onConfirm={handleDeleteRsvp}
          />
        )}

        {/* Guest list modal (from Total Guests card) */}
        {showGuestList && (
          <GuestListModal rsvps={rsvps} onClose={() => setShowGuestList(false)} />
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <p className="text-sm">
      <span className="text-[#5B4B66]/60">{label}: </span>
      <span className="font-semibold">{value}</span>
    </p>
  )
}

function FilterField({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-heading uppercase tracking-wide text-[#5B4B66]/70 mb-1">
        {label}
      </span>
      {children}
    </label>
  )
}

function StatCard({ label, value, color, onClick }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`${color} rounded-2xl p-4 text-center shadow w-full ${
        onClick
          ? 'cursor-pointer hover:brightness-95 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue'
          : ''
      }`}
    >
      <p className="font-heading text-2xl sm:text-3xl font-bold text-[#5B4B66]">{value}</p>
      <p className="font-body text-xs sm:text-sm uppercase tracking-wide text-[#5B4B66]/80">{label}</p>
    </Tag>
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

/* ------------------------------------------------------------------ */
/* RSVP Details Modal — primary guest + accompanying guest management */
/* ------------------------------------------------------------------ */

function DetailsModal({
  rsvp,
  onClose,
  selectedGuestIdx,
  toggleGuestSelected,
  onRequestRemoveGuest,
  onRequestBulkRemove,
  onRequestDeleteRsvp,
  actionError,
}) {
  const guests = rsvp.guestNames ?? []
  const isAttending = rsvp.attendance === ATTENDING

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative invite-card max-w-xl w-full p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5B4B66]/50 hover:text-[#5B4B66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
          aria-label="Close details"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <h2 className="font-heading text-xl gradient-text font-bold mb-4">RSVP Details</h2>

        {/* Primary guest */}
        <section className="mb-5">
          <p className="font-heading text-xs uppercase tracking-widest text-soft-pink-deep mb-2">
            Primary Guest
          </p>
          <div className="rounded-2xl bg-white/60 p-3 space-y-1">
            <DetailRow label="Name" value={rsvp.fullName || '—'} />
            <DetailRow label="Contact Number" value={rsvp.phoneNumber || '—'} />
            <DetailRow label="Status" value={rsvp.attendance} />
          </div>
        </section>

        {/* Accompanying guests */}
        <section className="mb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="font-heading text-xs uppercase tracking-widest text-baby-blue-deep">
              Accompanying Guests {isAttending ? `(${guests.length})` : ''}
            </p>
            {selectedGuestIdx.length > 0 && (
              <button
                type="button"
                onClick={onRequestBulkRemove}
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
              >
                <Trash2 className="w-3 h-3" aria-hidden="true" />
                Delete Selected ({selectedGuestIdx.length})
              </button>
            )}
          </div>

          {!isAttending ? (
            <p className="text-sm text-[#5B4B66]/60 italic">Not attending — no guests recorded.</p>
          ) : guests.length === 0 ? (
            <p className="text-sm text-[#5B4B66]/60 italic">No accompanying guests.</p>
          ) : (
            <div className="rounded-2xl bg-white/60 p-3 space-y-2">
              {guests.map((name, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-sm">
                  <label className="flex items-center gap-2 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedGuestIdx.includes(idx)}
                      onChange={() => toggleGuestSelected(idx)}
                      aria-label={`Select guest ${name || idx + 1}`}
                      className="rounded border-cream text-soft-pink-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
                    />
                    <span className="text-[#5B4B66]/50 w-20 shrink-0">
                      {idx === 0 ? 'Guest 1 (Host)' : `Guest ${idx + 1}`}
                    </span>
                    <span className="font-semibold">{name || '—'}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => onRequestRemoveGuest(idx, name)}
                    className="p-1.5 rounded-full hover:bg-red-100 text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
                    aria-label={`Remove ${name || `guest ${idx + 1}`}`}
                    title="Remove guest"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {actionError && <p className="text-sm text-red-600 mt-3">{actionError}</p>}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-cream">
          <button
            type="button"
            onClick={onRequestDeleteRsvp}
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Delete Whole RSVP
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-soft-pink/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Generic confirmation modal (delete RSVP / remove guest(s))         */
/* ------------------------------------------------------------------ */

function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmTone = 'danger',
  loading,
  error,
  onCancel,
  onConfirm,
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative invite-card max-w-sm w-full p-6 shadow-2xl z-10"
      >
        <h2 className="font-heading text-lg gradient-text font-bold mb-3">{title}</h2>
        <div className="text-sm text-[#5B4B66] mb-2">{message}</div>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-full bg-white px-4 py-2 text-sm shadow hover:bg-soft-pink/30 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-full px-4 py-2 text-sm font-semibold text-white shadow disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue ${
              confirmTone === 'danger' ? 'bg-red-500 hover:bg-red-600' : 'bg-soft-pink-deep'
            }`}
          >
            {loading ? 'Working...' : confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Guest List Modal — flattened primary + accompanying guests         */
/* ------------------------------------------------------------------ */

function GuestListModal({ rsvps, onClose }) {
  const [search, setSearch] = useState('')
  const [guestTypeFilter, setGuestTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('name-asc')

  const allGuests = useMemo(() => {
    const rows = []
    rsvps.forEach((r) => {
      // Primary guest row
      rows.push({
        name: r.fullName || '—',
        rsvpOwner: r.fullName || '—',
        phoneNumber: r.phoneNumber || '—',
        guestType: 'Primary Guest',
        attendance: r.attendance,
        submittedAt: r.submittedAt,
        rsvpId: r.id,
      })

      // Accompanying guests (only meaningful when attending)
      if (r.attendance === ATTENDING) {
        ;(r.guestNames ?? []).slice(1).forEach((name, idx) => {
          rows.push({
            name: name || `Guest ${idx + 2}`,
            rsvpOwner: r.fullName || '—',
            phoneNumber: r.phoneNumber || '—',
            guestType: 'Accompanying Guest',
            attendance: r.attendance,
            submittedAt: r.submittedAt,
            rsvpId: r.id,
          })
        })
      }
    })
    return rows
  }, [rsvps])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    let rows = allGuests.filter((g) => {
      if (term) {
        const fields = [g.name, g.rsvpOwner, g.phoneNumber]
        if (!fields.filter(Boolean).some((f) => f.toLowerCase().includes(term))) return false
      }
      if (guestTypeFilter !== 'All' && g.guestType !== guestTypeFilter) return false
      if (statusFilter === 'Attending' && g.attendance !== ATTENDING) return false
      if (statusFilter === 'Not Attending' && g.attendance !== DECLINED) return false
      return true
    })

    const dateVal = (g) => {
      const d =
        typeof g.submittedAt?.toDate === 'function' ? g.submittedAt.toDate() : new Date(g.submittedAt)
      return Number.isNaN(d.getTime()) ? 0 : d.getTime()
    }

    rows = [...rows].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'date-newest':
          return dateVal(b) - dateVal(a)
        case 'date-oldest':
          return dateVal(a) - dateVal(b)
        case 'status':
          return a.attendance.localeCompare(b.attendance)
        default:
          return 0
      }
    })

    return rows
  }, [allGuests, search, guestTypeFilter, statusFilter, sortBy])

  const guestStats = useMemo(() => {
    const primary = filtered.filter((g) => g.guestType === 'Primary Guest').length
    const accompanying = filtered.filter((g) => g.guestType === 'Accompanying Guest').length
    const attending = filtered.filter((g) => g.attendance === ATTENDING).length
    const declined = filtered.filter((g) => g.attendance === DECLINED).length
    return {
      total: filtered.length,
      primary,
      accompanying,
      attending,
      declined,
    }
  }, [filtered])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative invite-card max-w-4xl w-full p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-[#5B4B66]/50 hover:text-[#5B4B66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-baby-blue rounded"
          aria-label="Close guest list"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <h2 className="font-heading text-xl gradient-text font-bold mb-1 flex items-center gap-2">
          <Users className="w-5 h-5" aria-hidden="true" />
          Guest List
        </h2>
        <p className="text-sm text-[#5B4B66]/60 mb-4">
          Every primary and accompanying guest across all RSVPs.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
          <GuestStatCard label="Total Guests" value={guestStats.total} color="bg-light-yellow" />
          <GuestStatCard label="Primary" value={guestStats.primary} color="bg-soft-pink" />
          <GuestStatCard label="Accompanying" value={guestStats.accompanying} color="bg-baby-blue" />
          <GuestStatCard label="Attending" value={guestStats.attending} color="bg-baby-blue" />
          <GuestStatCard label="Not Attending" value={guestStats.declined} color="bg-lavender" />
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
              placeholder="Search by guest name, RSVP owner, or phone..."
              aria-label="Search guests"
              className="w-full rounded-full border-2 border-cream bg-white px-10 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
            />
          </div>

          <select
            value={guestTypeFilter}
            onChange={(e) => setGuestTypeFilter(e.target.value)}
            className="rounded-full border-2 border-cream bg-white px-4 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
            aria-label="Filter by guest type"
          >
            <option value="All">All Guest Types</option>
            <option value="Primary Guest">Primary Guest</option>
            <option value="Accompanying Guest">Accompanying Guest</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border-2 border-cream bg-white px-4 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
            aria-label="Filter by RSVP status"
          >
            <option value="All">All Statuses</option>
            <option value="Attending">Attending</option>
            <option value="Not Attending">Not Attending</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border-2 border-cream bg-white px-4 py-2 text-sm focus:border-soft-pink-deep focus:outline-none"
            aria-label="Sort guest list"
          >
            <option value="name-asc">Name A–Z</option>
            <option value="name-desc">Name Z–A</option>
            <option value="date-newest">RSVP Date Newest</option>
            <option value="date-oldest">RSVP Date Oldest</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Guest table */}
        {filtered.length === 0 ? (
          <p className="text-center py-10 text-[#5B4B66]/60">No guests match these filters.</p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-cream">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-soft-pink/40">
                  <Th>Name</Th>
                  <Th>RSVP Owner</Th>
                  <Th>Phone</Th>
                  <Th>Guest Type</Th>
                  <Th>RSVP Status</Th>
                  <Th>RSVP Date</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((g, i) => (
                  <tr key={`${g.rsvpId}-${i}`} className="border-b border-cream last:border-0">
                    <Td className="font-semibold whitespace-nowrap">{g.name}</Td>
                    <Td className="whitespace-nowrap">{g.rsvpOwner}</Td>
                    <Td className="whitespace-nowrap">{g.phoneNumber}</Td>
                    <Td className="whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          g.guestType === 'Primary Guest'
                            ? 'bg-soft-pink/40 text-soft-pink-deep'
                            : 'bg-baby-blue/40 text-baby-blue-deep'
                        }`}
                      >
                        {g.guestType}
                      </span>
                    </Td>
                    <Td className="whitespace-nowrap">{g.attendance}</Td>
                    <Td className="whitespace-nowrap text-xs text-[#5B4B66]/70">
                      {formatDate(g.submittedAt)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function GuestStatCard({ label, value, color }) {
  return (
    <div className={`${color} rounded-xl p-3 text-center shadow`}>
      <p className="font-heading text-lg sm:text-xl font-bold text-[#5B4B66]">{value}</p>
      <p className="font-body text-[10px] sm:text-xs uppercase tracking-wide text-[#5B4B66]/80">
        {label}
      </p>
    </div>
  )
}