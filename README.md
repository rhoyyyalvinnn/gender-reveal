# 🌸 Baby Bloom Celebration

A magical, storybook-style **Gender Reveal & Baby Shower** digital invitation —
built with React (Vite), Tailwind CSS, Framer Motion, Swiper.js, and Firebase.

---

## ✨ Features

- Storybook-style, scroll-snapped single-page experience (9 slides)
- Animated welcome screen with confetti, floating balloons & a teddy bear
- Parents introduction slide with photo placeholders
- Interactive gift-box gender reveal (Boy / Girl / Surprise) with confetti & fireworks
- Baby shower event details cards with a "View on Google Maps" button
- Pastel attire guide
- Heartfelt message to guests
- Photo gallery carousel (Swiper) with lightbox
- Live countdown timer with flip-style animated digits
- RSVP form with validation, Firebase Firestore storage, and success animation
- Optional `/admin` dashboard: stats, search, CSV export
- Mobile-first, responsive, accessible (ARIA labels, keyboard navigation, focus states)

---

## 🧰 Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Swiper.js
- Firebase Firestore
- canvas-confetti
- lucide-react (icons)
- react-router-dom

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** (start in production mode).
3. In **Project Settings > General**, register a Web App and copy the config values.
4. Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

5. Deploy the included Firestore security rules:

```bash
firebase deploy --only firestore:rules
```

> By default, anyone can **submit** an RSVP, but **no one can read** the
> `rsvps` collection from the client — including the `/admin` page. See
> `firestore.rules` for two options to enable the admin dashboard
> (authenticated admins, or a private-link "allow read: if true" for quick starts).

### 3. Run the dev server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # if not already installed
firebase login
firebase init hosting           # select your project, public dir = "dist"
npm run build
firebase deploy
```

---

## 🎨 Customizing Your Invitation

Almost everything can be edited in **one file**:

```
src/utils/eventConfig.js
```

This includes:

- Parents' names & photos
- Gender reveal status (`boy` | `girl` | `surprise`)
- Baby shower date, time, venue, address & Google Maps link
- Countdown target date/time
- Attire theme & suggested colors
- Message to guests
- Photo gallery images & captions

Replace the placeholder image URLs (`https://placehold.co/...`) with your
own photo URLs (e.g. uploaded to Firebase Storage, Imgur, or your own CMS).

### Color Palette

Defined in `tailwind.config.js`:

| Name        | Hex       |
|-------------|-----------|
| Baby Blue   | `#A7D8FF` |
| Soft Pink   | `#FFD6E8` |
| Cream White | `#FFF8F0` |
| Lavender    | `#E6D6FF` |
| Light Yellow| `#FFF2B3` |

---

## 📁 Project Structure

```
src/
├── components/      # Reusable UI pieces (buttons, backgrounds, nav dots, decor icons)
│   └── decor/        # Cute SVG illustrations (clouds, balloons, hearts, etc.)
├── pages/            # Top-level routes: HomePage ("/") and AdminPage ("/admin")
├── sections/         # The 9 invitation "slides"
├── firebase/         # Firebase config & Firestore service functions
├── hooks/            # useCountdown, useConfetti
├── utils/            # eventConfig, validation, CSV export
└── App.jsx           # Route definitions
```

---

## 🗄️ Firestore Data Model

Collection: `rsvps`

```json
{
  "fullName": "string",
  "email": "string",
  "phoneNumber": "string",
  "guestCount": "number",
  "attendance": "Happily Attending | Sorry, Can't Attend",
  "message": "string",
  "submittedAt": "timestamp"
}
```

---

## ♿ Accessibility

- Semantic landmarks (`<section>`, `<nav>`, `<fieldset>`, `<table>`)
- ARIA labels on interactive elements (gift box, lightbox, nav dots, forms)
- Visible focus states on all interactive elements
- Respects `prefers-reduced-motion`
- Form fields include labels, inline error messages, and `aria-describedby`

---

## 📱 Responsive Design

The invitation is mobile-first and tested to scale gracefully across phones,
tablets, and desktops while preserving its storybook, card-based look.

---

Made with 💗 for your little one.
