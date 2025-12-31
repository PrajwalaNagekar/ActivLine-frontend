const ActivlineLogo = ({ className = "h-8" }) => (
  <svg viewBox="0 -28 220 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="45" fontFamily="sans-serif" fontWeight="bold" fontSize="38" fill="currentColor" letterSpacing="-1">
      activl
    </text>
    <g transform="translate(104, 0)">
       <rect x="2" y="19" width="5.5" height="26" fill="currentColor" />
       <circle cx="4.75" cy="11" r="3.5" fill="#F97316" />
       <path d="M-5.25 2 A 10 10 0 0 1 14.75 2" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
       <path d="M-11.25 -4 A 16 16 0 0 1 20.75 -4" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
       <path d="M-17.25 -10 A 22 22 0 0 1 26.75 -10" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
    <text x="116" y="45" fontFamily="sans-serif" fontWeight="bold" fontSize="38" fill="currentColor" letterSpacing="-1">
      ne
    </text>
  </svg>
);

export default ActivlineLogo;