"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const arrowCls =
  "grid size-11 place-items-center sm:size-12 rounded-full bg-white text-ink shadow-[0_10px_28px_-8px_rgba(17,24,39,0.45)] ring-1 ring-black/5 transition-all duration-200 hover:scale-105 hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const AUTOPLAY_MS = 3500;

/**
 * Infinite carousel: the photos are rendered in 3 identical sets and we always rest in the middle one.
 * When a scroll ends in the first or last set we silently jump one set-width, so it loops forever, in both directions.
 */
export default function ProjectsCarousel({ projects }) {
  const track = useRef(null);
  const count = projects.length;
  const [index, setIndex] = useState(count); // global index across the 3 sets (starts at the middle set)
  const indexRef = useRef(count);
  const pausedRef = useRef(false);
  const wrapTimer = useRef(null);

  const items = [0, 1, 2].flatMap((set) => projects.map((p, n) => ({ ...p, set, n })));

  const padLeft = (el) => parseFloat(getComputedStyle(el).paddingLeft) || 0;
  const cardLeft = (el, i) => el.children[i].offsetLeft - el.offsetLeft - padLeft(el);

  /** Smoothly scrolls so that card `i` (global index) sits at the left edge. */
  const goTo = useCallback((i) => {
    const el = track.current;
    if (!el || !el.children[i]) return;
    el.scrollTo({ left: cardLeft(el, i), behavior: "smooth" });
  }, []);

  const nearest = useCallback(() => {
    const el = track.current;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const d = Math.abs(cardLeft(el, i) - el.scrollLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }, []);

  // Start in the middle set.
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: cardLeft(el, count), behavior: "instant" });
  }, [count]);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const g = nearest();
    indexRef.current = g;
    setIndex(g);

    // Once scrolling has settled, hop back into the middle set (same picture, so the jump is invisible).
    clearTimeout(wrapTimer.current);
    wrapTimer.current = setTimeout(() => {
      const cur = nearest();
      const setWidth = cardLeft(el, count) - cardLeft(el, 0);
      if (cur < count) el.scrollTo({ left: el.scrollLeft + setWidth, behavior: "instant" });
      else if (cur >= count * 2) el.scrollTo({ left: el.scrollLeft - setWidth, behavior: "instant" });
    }, 160);
  }, [count, nearest]);

  useEffect(() => () => clearTimeout(wrapTimer.current), []);

  // Autoplay: one card at a time, forever. Pauses only while the controls are hovered or the track is being touched.
  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [goTo]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);
  const active = index % count;

  return (
    <div>
      <div>
        <ul
          ref={track}
          onScroll={onScroll}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(resume, 2500)}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-10 pt-6 scroll-pl-4 sm:pb-14 [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] [scrollbar-width:none] sm:px-6 sm:scroll-pl-6 min-[1400px]:px-[calc((100%-1400px)/2+1.5rem)] min-[1400px]:scroll-pl-[calc((100%-1400px)/2+1.5rem)] [&::-webkit-scrollbar]:hidden"
          aria-label="Project photos"
        >
          {items.map((p) => {
            const copy = p.set !== 1; // the outer sets are only there for the loop
            return (
              <li
                key={`${p.set}-${p.title}`}
                aria-hidden={copy || undefined}
                className="h-60 shrink-0 snap-start sm:h-72 lg:h-80"
              >
                <Link
                  href="/projects"
                  tabIndex={copy ? -1 : undefined}
                  style={{ aspectRatio: `${p.width} / ${p.height}` }}
                  className="group relative block h-full overflow-hidden rounded-3xl bg-neutral-200 shadow-[0_8px_30px_rgba(20,24,35,0.15)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-10px_rgba(20,24,35,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  <Image
                    src={p.image}
                    alt={copy ? "" : p.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 340px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent via-55%" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-bold text-ink shadow-sm backdrop-blur-sm">
                    {String(p.n + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                    <h3 className="font-display text-lg font-bold leading-tight drop-shadow sm:text-xl">{p.title}</h3>
                    <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-brand opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-sm:translate-y-0 max-sm:opacity-100">
                      <ArrowRight className="size-5" aria-hidden />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls: progress dots + counter + arrows (always enabled – it loops) */}
      <Container
        className="flex items-center justify-between gap-4"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(index - active + i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === active ? "w-9 bg-brand" : "w-2.5 bg-neutral-300 hover:bg-neutral-400",
              )}
            />
          ))}
        </div>

        <p className="hidden font-display text-base font-bold text-ink/50 sm:block" aria-hidden>
          <span className="text-ink">{String(active + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
        </p>

        <div className="flex items-center gap-3">
          <button type="button" aria-label="Previous photo" onClick={() => goTo(index - 1)} className={arrowCls}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => goTo(index + 1)} className={arrowCls}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </Container>
    </div>
  );
}
