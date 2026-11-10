"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { applicationDetails } from "@/data/applicationDetails";
import { cn } from "@/lib/cn";

/** Where each of the three tilted cards sits. --r = tilt, --d = float delay. */
const LAYOUT = {
  desktop: {
    sizes: "260px",
    card: "rounded-[1.75rem] ring-[5px] shadow-[0_28px_60px_-16px_rgba(0,0,0,0.7)]",
    pill: "gap-2 px-3.5 py-2 text-sm",
    icon: "size-[18px]",
    slots: [
      { pos: "left-0 top-14 w-[17rem]", rot: "-6deg", z: "z-10", delay: "-2s", pillAt: "bottom-3 left-3" },
      { pos: "right-0 top-0 w-[15.5rem]", rot: "7deg", z: "z-0", delay: "0s", pillAt: "bottom-3 left-3" },
      { pos: "bottom-0 left-[8.5rem] w-[15rem]", rot: "-3deg", z: "z-20", delay: "-4s", pillAt: "bottom-3 left-3" },
    ],
  },
  mobile: {
    sizes: "220px",
    card: "rounded-2xl ring-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]",
    pill: "gap-1.5 px-2.5 py-1 text-xs",
    icon: "size-3.5",
    // the pill sits in a corner that no other card covers
    slots: [
      { pos: "left-1 top-5 w-[56%]", rot: "-6deg", z: "z-10", delay: "-2s", pillAt: "left-2 top-2" },
      { pos: "right-1 top-0 w-[50%]", rot: "7deg", z: "z-0", delay: "0s", pillAt: "right-2 top-2" },
      { pos: "bottom-0 left-[22%] w-[52%]", rot: "-3deg", z: "z-20", delay: "-4s", pillAt: "bottom-2 left-2" },
    ],
  },
};

const START = ["parks", "residential", "roads"];

/**
 * Three tilted photo cards that keep changing: every few seconds one card fades to the next
 * application (Commercial, Industrial, ...), never repeating one that is already on screen.
 * Stays still if the visitor prefers reduced motion.
 */
export default function AppCollage({ variant = "desktop", interval = 2200 }) {
  const cfg = LAYOUT[variant];
  const count = applicationDetails.length;
  const [shown, setShown] = useState(() =>
    START.map((slug) => Math.max(0, applicationDetails.findIndex((a) => a.slug === slug))),
  );
  const tick = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const slot = tick.current++ % cfg.slots.length;
      setShown((prev) => {
        const taken = new Set(prev);
        let next = (prev[slot] + 1) % count;
        while (taken.has(next)) next = (next + 1) % count;
        const copy = [...prev];
        copy[slot] = next;
        return copy;
      });
    }, interval);
    return () => clearInterval(t);
  }, [cfg.slots.length, count, interval]);

  return (
    <>
      {cfg.slots.map((slot, s) => (
        <div key={s} className={cn("float absolute", slot.pos, slot.z)} style={{ "--r": slot.rot, "--d": slot.delay }}>
          <div className={cn("relative aspect-[4/3] overflow-hidden bg-slate-700 ring-white", cfg.card)}>
            {applicationDetails.map((a, i) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.slug}
                  className={cn("absolute inset-0 transition-opacity duration-700 ease-in-out", shown[s] === i ? "opacity-100" : "opacity-0")}
                >
                  <Image src={a.image} alt="" fill sizes={cfg.sizes} className="object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                  <span
                    className={cn(
                      "absolute inline-flex items-center rounded-full bg-black/50 font-bold text-white ring-1 ring-white/20 backdrop-blur-md",
                      slot.pillAt,
                      cfg.pill,
                    )}
                  >
                    <Icon className={cfg.icon} strokeWidth={1.8} />
                    {a.short}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}
