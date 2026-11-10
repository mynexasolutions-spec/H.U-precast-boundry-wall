"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Auto-rotating image frame: crossfade + slow zoom. Fills its (positioned) parent.
 * images: [{ src, alt }]   interval/offset: ms   Pauses on hover; static if motion is reduced.
 */
export default function ImageSlideshow({ images, sizes, interval = 4500, offset = 0, showDots = false, className }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const next = () => setIndex((i) => (i + 1) % count);
    let iv;
    const t = setTimeout(() => {
      next();
      iv = setInterval(next, interval);
    }, interval + offset);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [paused, count, interval, offset]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, i) => {
        const active = i === index;
        return (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            sizes={sizes}
            aria-hidden={!active}
            className={cn(
              "object-cover transition-[opacity,transform] ease-out",
              active
                ? "scale-100 opacity-100 duration-[1100ms,6000ms]"
                : "scale-[1.12] opacity-0 duration-[1100ms,6000ms]",
            )}
          />
        );
      })}

      {showDots && count > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/35 px-3 py-2 backdrop-blur-sm">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
