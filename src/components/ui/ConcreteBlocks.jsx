import { cn } from "@/lib/cn";

/**
 * Soft white concrete-block decoration for section edges (purely visual).
 * side="left" hugs the left edge, side="right" the right edge.
 */
export default function ConcreteBlocks({ side = "left", className }) {
  const left = side === "left";
  const gradId = `block-${side}`;

  return (
    <svg
      aria-hidden
      viewBox="0 0 160 240"
      preserveAspectRatio={left ? "xMinYMid slice" : "xMaxYMid slice"}
      className={cn(
        "pointer-events-none absolute top-0 hidden h-full w-40 drop-shadow-[0_6px_10px_rgba(20,24,35,0.12)] md:block",
        left ? "left-0" : "right-0",
        className,
      )}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde0e5" />
        </linearGradient>
      </defs>

      {left ? (
        <g fill={`url(#${gradId})`}>
          <rect x="-50" y="12" width="120" height="48" rx="5" transform="rotate(24 10 36)" />
          <rect x="-60" y="82" width="110" height="46" rx="5" transform="rotate(-8 -5 105)" />
          <rect x="-40" y="146" width="130" height="52" rx="5" transform="rotate(14 25 172)" />
        </g>
      ) : (
        <g fill={`url(#${gradId})`}>
          <rect x="70" y="20" width="150" height="52" rx="5" transform="rotate(-28 145 46)" />
          <rect x="95" y="150" width="130" height="46" rx="5" transform="rotate(-20 160 173)" />
        </g>
      )}
    </svg>
  );
}
