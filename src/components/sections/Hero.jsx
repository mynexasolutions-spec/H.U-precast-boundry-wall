"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Button from "@/components/ui/Button";
import { heroSlides } from "@/data/heroSlides";
import { cn } from "@/lib/cn";

const INTERVAL = 6500;
const count = heroSlides.length;

/** Same as Container, but on very wide screens (4K) the text lines up with the photo instead of floating in the middle. */
const wrap = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 min-[1700px]:max-w-none min-[1700px]:px-[7%]";

export default function Hero() {
  // `prev` + `dir` let the leaving slide slide out while the new one slides in – works for any slide count, forever.
  const [state, setState] = useState({ index: 0, prev: null, dir: "next" });
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const { index, prev, dir } = state;

  const go = useCallback(
    (to, direction) =>
      setState((s) => {
        const target = ((to % count) + count) % count;
        if (target === s.index) return s;
        return { index: target, prev: s.index, dir: direction ?? (to > s.index ? "next" : "prev") };
      }),
    [],
  );
  const next = useCallback(() => go(index + 1, "next"), [go, index]);
  const back = useCallback(() => go(index - 1, "prev"), [go, index]);

  // Autoplay: restarts after every change and pauses while the pointer is on the controls.
  // It keeps running with "reduce motion" too – the CSS then swaps slides instantly instead of sliding.
  useEffect(() => {
    if (paused || count < 2) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [paused, next]);

  const onTouchStart = (e) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? next : back)();
  };

  /** Prev / dots / next. Phones: under the buttons. Laptops: overlay at the bottom-left of the hero. */
  const renderControls = (className) => (
    // Autoplay only pauses while the pointer is on these controls - never just because the mouse is over the hero
    <div
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <button
        type="button"
        aria-label="Previous slide"
        onClick={back}
        className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all hover:scale-105 hover:bg-brand hover:ring-brand"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>

      <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className={cn(
              "relative h-2.5 overflow-hidden rounded-full transition-all duration-300",
              i === index ? "w-12 bg-white/35" : "w-2.5 bg-white/45 hover:bg-white/70",
            )}
          >
            {i === index && (
              <span
                key={`${index}-${prev}`}
                aria-hidden
                className="hero-progress absolute inset-y-0 left-0 w-full origin-left rounded-full bg-brand"
                style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? "paused" : "running" }}
              />
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all hover:scale-105 hover:bg-brand hover:ring-brand"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="relative isolate grid touch-pan-y overflow-hidden bg-[#0b1730] text-white lg:bg-[#111827]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {heroSlides.map((s, i) => {
        const active = i === index;
        const leaving = i === prev && !active;
        const role = active ? (prev === null ? "idle" : `in-${dir}`) : leaving ? `out-${dir}` : "off";
        const Heading = i === 0 ? "h1" : "h2";

        return (
          <div
            key={s.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            data-role={role}
            className={cn(
              "hero-slide relative isolate col-start-1 row-start-1 sm:pb-44 sm:pt-20 lg:flex lg:min-h-[max(600px,37.5vw,min(calc(100svh_-_9rem),42vw))] lg:flex-col lg:justify-center lg:pb-44 lg:pt-20",
              // phone with a 4:5 photo: leave room below the text for the products part of the photo
              s.mobileImage
                ? "pb-[calc(68vw+0.5rem)] pt-6 max-sm:flex max-sm:min-h-[calc(100svh_-_4rem)] max-sm:flex-col max-sm:justify-center"
                : "pb-40 pt-10",
            )}
          >
            {/* Photos */}
            {/* Phone, 4:5 photo: shown whole at the bottom (no crop); the sky colour fills everything above it, so the text sits on sky */}
            {s.mobileImage && (
              <div aria-hidden className="absolute inset-0 -z-20 sm:hidden" style={{ backgroundColor: s.mobileBg }}>
                <div className="absolute inset-x-0 bottom-0 aspect-[4/5]">
                  <Image src={s.mobileImage} alt="" fill priority={i === 0} quality={95} sizes="100vw" className="object-cover" />
                  <div
                    className="absolute inset-x-0 top-0 h-1/3"
                    style={{ backgroundImage: `linear-gradient(to bottom, ${s.mobileBg}, transparent)` }}
                  />
                </div>
              </div>
            )}
            <div className={cn("absolute inset-0 -z-20", s.mobileImage && "max-sm:hidden", active && "hero-zoom")}>
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                quality={95}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.mobileImage ? "right" : s.mobilePosition }}
              />
            </div>

            {s.mobileImage && (
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-b from-[#0b1730]/75 via-[#0b1730]/45 via-45% to-transparent to-72% sm:hidden"
              />
            )}
            {/* Mobile: navy from the top-left keeps the heading readable */}
            <div
              aria-hidden
              className={cn("absolute inset-0 -z-10 bg-linear-to-br from-[#0b1730]/90 via-[#0b1730]/45 via-55% to-transparent lg:hidden", s.mobileImage && "max-sm:hidden")}
            />
            {/* Desktop: navy fade from the left, photo stays bright on the right */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 hidden lg:block lg:bg-linear-to-r lg:from-[#111827] lg:from-5% lg:via-[#111827]/70 lg:via-35% lg:to-transparent lg:to-62%"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-black/30 to-transparent" />

            <div className={wrap}>
              <div className="max-w-2xl min-[2200px]:max-w-4xl">
                <span
                  className={cn(
                    "inline-block rounded-lg bg-[#0b1730]/45 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm",
                    active && "fade-up",
                  )}
                  style={{ "--d": "250ms" }}
                >
                  {s.badge}
                </span>

                <Heading
                  className={cn(
                    "mt-6 font-display text-[2.15rem] font-bold leading-[1.1] tracking-tight max-sm:[text-shadow:0_2px_16px_rgba(6,20,50,0.75)] min-[420px]:text-4xl sm:text-5xl lg:text-[3.5rem] min-[2200px]:text-[5rem]",
                    active && "fade-up",
                  )}
                  style={{ "--d": "350ms" }}
                >
                  {s.lines.map((line, n) => (
                    <span key={line} className={cn("block", n === s.lines.length - 1 && "text-brand")}>
                      {line}
                    </span>
                  ))}
                </Heading>

                <p
                  className={cn("mt-6 max-w-md text-base font-medium leading-relaxed text-white max-sm:[text-shadow:0_1px_10px_rgba(6,20,50,0.8)] sm:font-normal sm:text-white/90 sm:text-lg min-[2200px]:max-w-xl min-[2200px]:text-2xl", active && "fade-up")}
                  style={{ "--d": "450ms" }}
                >
                  {s.text}
                </p>

                {/* Side by side; on a very narrow phone the second one wraps to its own line */}
                <div
                  className={cn("mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-3.5", active && "fade-up")}
                  style={{ "--d": "550ms" }}
                >
                  <Button
                    href={s.primary.href}
                    tabIndex={active ? 0 : -1}
                    className="justify-center whitespace-nowrap px-4 py-3 text-[15px] sm:px-6 sm:py-3.5 sm:text-base"
                  >
                    {s.primary.label} <ArrowRight className="size-4" aria-hidden />
                  </Button>
                  <Button
                    href={s.secondary.href}
                    variant="ghost"
                    tabIndex={active ? 0 : -1}
                    className="justify-center whitespace-nowrap px-4 py-3 text-[15px] backdrop-blur-sm sm:px-6 sm:py-3.5 sm:text-base"
                  >
                    {s.secondary.whatsapp && <WhatsAppIcon className="size-[18px] shrink-0" />} {s.secondary.label}
                  </Button>
                </div>

                {active && count > 1 && renderControls("mt-6 flex items-center gap-3 lg:hidden")}
              </div>
            </div>
          </div>
        );
      })}

      {/* Laptops: controls sit above the trust bar overlap */}
      {count > 1 && (
        <div className="relative z-20 col-start-1 row-start-1 self-end max-lg:hidden">
          {renderControls(cn(wrap, "flex items-center gap-4 lg:pb-28"))}
        </div>
      )}
    </section>
  );
}
