import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

/**
 * ============================================================
 *  FIREBASE CONFIGURATION
 * ============================================================
 *  All values are read from environment variables so that
 *  secrets are never committed to source control.
 *
 *  1. Copy `.env.example` to `.env`
 *  2. Fill in your Firebase project credentials
 *     (Firebase Console > Project Settings > General > Your apps)
 *  3. Restart the dev server after editing `.env`
 * ============================================================
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Avoid re-initializing the app on hot-reloads
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export default app
