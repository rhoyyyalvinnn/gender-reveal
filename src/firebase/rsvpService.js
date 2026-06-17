import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config.js'

const RSVP_COLLECTION = 'rsvps'

/**
 * Submits a new RSVP document to Firestore.
 *
 * Document shape:
 * {
 *   fullName: string,
 *   phoneNumber: string,
 *   guestCount: number,
 *   guestNames: string[],
 *   attendance: string,
 *   message: string,
 *   submittedAt: timestamp
 * }
 *
 * @param {Object} data - validated form data
 * @returns {Promise<string>} the new document's ID
 * @throws Will throw if the Firestore write fails
 */
export async function submitRsvp(data) {
  try {
    const isAttending = data.attendance === 'Happily Attending'

    const docRef = await addDoc(collection(db, RSVP_COLLECTION), {
      fullName: data.fullName?.trim() ?? '',
      phoneNumber: data.phoneNumber?.trim() ?? '',
      attendance: data.attendance,
      guestCount: isAttending ? Number(data.guestCount) : 0,
      guestNames: isAttending
        ? (data.guestNames ?? []).map((n) => (n ?? '').trim()).filter(Boolean)
        : [],
      message: data.message ? data.message.trim() : '',
      submittedAt: serverTimestamp(),
    })

    return docRef.id
  } catch (error) {
    console.error('Error submitting RSVP:', error)
    throw new Error(
      'Something went wrong while sending your RSVP. Please check your connection and try again.'
    )
  }
}

/**
 * Fetches all RSVP documents ordered by submission date (most recent first).
 * Used by the admin dashboard.
 *
 * @returns {Promise<Array<Object>>}
 * @throws Will throw if the Firestore read fails
 */
export async function getAllRsvps() {
  try {
    const q = query(collection(db, RSVP_COLLECTION), orderBy('submittedAt', 'desc'))
    const snapshot = await getDocs(q)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching RSVPs:', error)
    throw new Error('Unable to load RSVPs right now. Please try again later.')
  }
}