"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Sticky header shell: plain at the top, glassy with a soft shadow once the page is scrolled. */
export default function HeaderBar({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-neutral-200/80 bg-white/85 shadow-[0_10px_30px_-14px_rgba(17,24,39,0.3)] backdrop-blur-xl"
          : "border-transparent bg-white",
      )}
    >
      {children}
    </header>
  );
}
