/** Two offset coin stacks (lucide-style API: className, strokeWidth). */
export default function CoinStackIcon({ strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* back stack – 3 coins */}
      <ellipse cx="8.5" cy="4.5" rx="5" ry="2" />
      <path d="M3.5 4.5v2.4c0 1.1 2.2 2 5 2s5-.9 5-2V4.5" />
      <path d="M3.5 6.9v2.4c0 1.1 2.2 2 5 2" />
      {/* front stack – 3 coins */}
      <ellipse cx="15.5" cy="12.5" rx="5" ry="2" />
      <path d="M10.5 12.5v2.4c0 1.1 2.2 2 5 2s5-.9 5-2v-2.4" />
      <path d="M10.5 14.9v2.4c0 1.1 2.2 2 5 2s5-.9 5-2v-2.4" />
      <path d="M10.5 17.3v2.2c0 1.1 2.2 2 5 2s5-.9 5-2v-2.2" />
      {/* small front-left coin */}
      <path d="M3.5 15.5c0-1.1 2.2-2 5-2" />
      <path d="M3.5 15.5v2.4c0 1.1 2.2 2 5 2" />
    </svg>
  );
}
