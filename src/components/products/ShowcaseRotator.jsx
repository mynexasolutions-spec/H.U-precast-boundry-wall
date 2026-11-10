"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Crossfades between the product showcase photos, one after another, forever.
 * All photos share one grid cell, so the box keeps the same size and nothing jumps.
 * Stays on the first photo if the visitor prefers reduced motion.
 */
export default function ShowcaseRotator({ images, sizes, interval = 2800, className }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className={cn("grid", className)}>
      {images.map((src, n) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={1500}
          height={750}
          priority={n === 0}
          sizes={sizes}
          className={cn(
            "col-start-1 row-start-1 h-auto w-full transition-opacity duration-700 ease-in-out",
            n === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
