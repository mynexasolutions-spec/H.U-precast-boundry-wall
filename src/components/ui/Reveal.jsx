"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades/slides its content in once it scrolls into view (plays once).
 * from: "up" | "left" | "right"   delay: ms (use it to stagger siblings)
 * Styles live in globals.css (.reveal); with JS off or reduced motion the content just shows.
 */
export default function Reveal({ as: Tag = "div", from = "up", delay = 0, className, children, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-from={from}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ "--d": `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
