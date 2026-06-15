/**
 * ============================================================
 *  EVENT CONFIGURATION
 * ============================================================
 *  Edit the values below to personalize the invitation.
 *  No other files need to be touched to update the basic
 *  event details, names, photos, attire, gallery, etc.
 * ============================================================
 */

export const eventConfig = {
  // ---- Hosts / Parents-to-be ----
  parents: {
    momName: 'Rachel',
    dadName: 'Dominique',
    momPhoto: 'https://placehold.co/400x400/FFD6E8/5B4B66?text=Mom',
    dadPhoto: 'https://placehold.co/400x400/A7D8FF/5B4B66?text=Dad',
  },

  // ---- Gender Reveal ----
  // status: 'boy' | 'girl' | 'surprise'
  // 'surprise' keeps the reveal a mystery until the event itself.
  genderReveal: {
    status: 'surprise',
    revealTextBoy: "It's a BOY! 💙",
    revealTextGirl: "It's a GIRL! 💗",
    revealTextSurprise: 'Still a Sweet Surprise!',
    subTextSurprise: "We can't wait to find out together at the party!",
  },

  // ---- Baby Shower Event Details ----
  babyShower: {
    title: 'Baby Shower Celebration',
    date: 'Saturday, July 18, 2026',
    time: '4:00 PM – 9:00 PM',
    venue: 'Paul\'s Place',
    address: 'Blk 3 Lot 10, Costa Verde Subd., Cagay, Roxas City, Capiz',
    mapsUrl: 'https://maps.app.goo.gl/wvmSmm5jzQmNbDAz8'
  },

  // ISO date-time used for the live countdown timer
  eventDateTime: '2026-07-18T13:00:00',

  // ---- Attire Guide ----
  attire: {
    theme: 'Pastel Colors',
    description:
      'Come dressed in your softest pastels to match our dreamy baby-themed celebration!',
    suggestions: [
      { name: 'Baby Blue', hex: '#A7D8FF' },
      { name: 'Soft Pink', hex: '#FFD6E8' },
    ],
    resortNote:
      "Paul's Place has a pool, so feel free to bring your swimwear and a change of clothes if you'd like to take a dip!",
  },

  // ---- Message to Guests ----
  guestMessage:
    'We are incredibly grateful to share this special moment with all of you. Your love and support mean the world to our growing family. Thank you for being part of our story!',
  guestMessageSignature: 'With love, Rachel & Dominique', 

  // ---- Photo Gallery ----
  gallery: [
    {
      src: 'https://placehold.co/600x600/FFD6E8/5B4B66?text=Mom+%26+Dad',
      caption: 'Our happy little family',
    },
    {
      src: 'https://placehold.co/600x600/A7D8FF/5B4B66?text=Ultrasound',
      caption: 'Our first peek at you',
    },
    {
      src: 'https://placehold.co/600x600/E6D6FF/5B4B66?text=Baby+Bump',
      caption: 'Growing every day',
    },
    {
      src: 'https://placehold.co/600x600/FFF2B3/5B4B66?text=Memories',
      caption: 'Sweet memories together',
    },
  ],
}

export default eventConfig
