"use client";

import { useEffect, useRef, useState } from "react";

/** Counts from 0 up to `to` once it scrolls into view. Shows the final number if motion is reduced. */
export default function CountUp({ to, suffix = "", duration = 1200 }) {
  const ref = useRef(null);
  const [value, setValue] = useState(to);
  const [armed, setArmed] = useState(false);

  // Start from 0 only after hydration, so server HTML and no-JS show the real number.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setArmed(true);
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} data-armed={armed}>
      {value}
      {suffix}
    </span>
  );
}
