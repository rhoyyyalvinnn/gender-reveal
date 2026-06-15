/**
 * A collection of small, reusable inline SVG illustrations used throughout
 * the invitation for its cute, baby-themed aesthetic.
 * Each component accepts standard props like `className` and `style`.
 */

export function CloudIcon({ className = '', style = {}, color = '#FFFFFF' }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 200 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="65" rx="50" ry="30" fill={color} />
      <ellipse cx="110" cy="55" rx="60" ry="38" fill={color} />
      <ellipse cx="155" cy="68" rx="40" ry="26" fill={color} />
    </svg>
  )
}

export function StarIcon({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 0l2.6 7.9H23l-6.7 4.9L18.9 21 12 16.1 5.1 21l2.6-8.2L1 7.9h8.4z" />
    </svg>
  )
}

export function MoonIcon({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export function BalloonIcon({ className = '', style = {}, color = '#FFD6E8' }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 60 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="30" cy="30" rx="28" ry="32" fill={color} />
      <path d="M30 62 L26 70 L34 70 Z" fill={color} />
      <line x1="30" y1="70" x2="30" y2="100" stroke="#C7A9FF" strokeWidth="1.5" />
      <ellipse cx="20" cy="18" rx="6" ry="9" fill="#FFFFFF" opacity="0.5" />
    </svg>
  )
}

export function HeartIcon({ className = '', style = {}, color = '#FF9EC4' }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 21s-7.5-4.6-10-9.1C.6 8.7 2.2 5 6 5c2.2 0 3.7 1.3 6 3.7C14.3 6.3 15.8 5 18 5c3.8 0 5.4 3.7 4 6.9C19.5 16.4 12 21 12 21z" />
    </svg>
  )
}

export function TeddyBearIcon({ className = '', style = {} }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ears */}
      <circle cx="30" cy="22" r="14" fill="#E6CBA8" />
      <circle cx="90" cy="22" r="14" fill="#E6CBA8" />
      <circle cx="30" cy="22" r="6" fill="#FFD6E8" />
      <circle cx="90" cy="22" r="6" fill="#FFD6E8" />
      {/* head */}
      <circle cx="60" cy="46" r="34" fill="#E6CBA8" />
      {/* snout */}
      <ellipse cx="60" cy="56" rx="16" ry="12" fill="#FFF8F0" />
      <circle cx="60" cy="50" r="4" fill="#5B4B66" />
      {/* eyes */}
      <circle cx="48" cy="40" r="3.5" fill="#5B4B66" />
      <circle cx="72" cy="40" r="3.5" fill="#5B4B66" />
      {/* body */}
      <ellipse cx="60" cy="100" rx="38" ry="28" fill="#E6CBA8" />
      {/* belly */}
      <ellipse cx="60" cy="104" rx="20" ry="16" fill="#FFF8F0" />
      {/* bow */}
      <path d="M52 78 L60 86 L68 78 L60 90 Z" fill="#FF9EC4" />
    </svg>
  )
}

export function FootprintIcon({ className = '', style = {}, color = '#C7A9FF' }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 40 60"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="20" cy="38" rx="16" ry="20" />
      <circle cx="9" cy="10" r="5" />
      <circle cx="20" cy="6" r="6" />
      <circle cx="31" cy="10" r="5" />
      <circle cx="36" cy="18" r="4" />
    </svg>
  )
}

export function GiftBoxIcon({ className = '', style = {}, color = '#FF9EC4' }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="15" y="40" width="70" height="50" rx="4" fill={color} />
      <rect x="15" y="40" width="70" height="14" fill="#FFFFFF" opacity="0.4" />
      <rect x="44" y="40" width="12" height="50" fill="#FFFFFF" opacity="0.7" />
      <path
        d="M50 40 C40 20 25 20 30 35 C33 42 45 40 50 40 C55 40 67 42 70 35 C75 20 60 20 50 40 Z"
        fill={color}
      />
    </svg>
  )
}
