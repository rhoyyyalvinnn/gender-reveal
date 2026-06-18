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
    gallery: [
      '/images/parents-1.jpg',
      '/images/parents-2.jpg',
      '/images/parents-3.jpg',
    ],
  },

  // ---- Gender Reveal ----
  // status: 'boy' | 'girl' | 'surprise'
  // 'surprise' keeps the reveal a mystery until the event itself.
  genderReveal: {
    status: 'surprise',
    revealTextBoy: "It's a BOY! 💙",
    revealTextGirl: "It's a GIRL! 💗",
    revealTextSurprise: 'Still a Sweet Surprise!',
    subTextSurprise: "Come and join us as we find out together! Will it be pink or blue? We can’t wait to share this special moment with you!",
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
  eventDateTime: '2026-07-18T16:00:00',

  // ---- Attire Guide ----
  attire: {
    theme: 'Pastel Colors',
    description:
      'Come dressed in your softest pastels to match our dreamy baby-themed celebration!',
    suggestions: [
      { name: 'Blue', hex: '#A7D8FF' },
      { name: 'Pink', hex: '#FFD6E8' },
    ],
    resortNote:
      "The entire venue and swimming pool are exclusively reserved for our celebration, so feel free to bring your swimwear if you’d like to take a dip!",
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
