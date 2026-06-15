/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'baby-blue': '#A7D8FF',
        'baby-blue-deep': '#6FB7EE',
        'soft-pink': '#FFD6E8',
        'soft-pink-deep': '#FF9EC4',
        'cream': '#FFF8F0',
        'lavender': '#E6D6FF',
        'lavender-deep': '#C7A9FF',
        'light-yellow': '#FFF2B3',
        'butter': '#FFE49C',
      },
      fontFamily: {
        heading: ['Fredoka', 'ui-rounded', 'sans-serif'],
        body: ['Quicksand', 'ui-rounded', 'sans-serif'],
      },
      keyframes: {
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatX: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '50%': { transform: 'translateX(15px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-10vw)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        heartFloat: {
          '0%': { transform: 'translateY(0) scale(0.8)', opacity: 0 },
          '10%': { opacity: 1 },
          '100%': { transform: 'translateY(-120vh) scale(1.2)', opacity: 0 },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        floatYSlow: 'floatY 10s ease-in-out infinite',
        floatX: 'floatX 8s ease-in-out infinite',
        drift: 'drift 60s linear infinite',
        driftSlow: 'drift 90s linear infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        heartFloat: 'heartFloat 8s ease-in infinite',
        bob: 'bob 4s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
