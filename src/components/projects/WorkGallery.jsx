"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { workItems, workTags } from "@/data/projects";
import { products } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const productName = Object.fromEntries(products.map((p) => [p.slug, p.name]));
const tabs = ["All", ...workTags];
const countOf = (t) => (t === "All" ? workItems.length : workItems.filter((w) => w.tag === t).length);

function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  const nav =
    "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-white"
      >
        <X className="size-5" aria-hidden />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            className={`${nav} left-3 sm:left-6`}
            onClick={(e) => {
              e.stopPropagation();
              onStep(-1);
            }}
          >
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            className={`${nav} right-3 sm:right-6`}
            onClick={(e) => {
              e.stopPropagation();
              onStep(1);
            }}
          >
            <ChevronRight className="size-6" aria-hidden />
          </button>
        </>
      )}

      <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <Image
          key={item.id}
          src={item.src}
          alt={item.title}
          width={item.width}
          height={item.height}
          sizes="90vw"
          className="fade-up h-auto max-h-[68vh] w-auto max-w-full rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
          style={{ "--d": "0ms" }}
        />
        <figcaption className="mt-5 w-full max-w-2xl text-center text-white">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold">{item.tag}</span>
          <h3 className="mt-2 font-display text-xl font-bold sm:text-2xl">{item.title}</h3>
          <p className="mt-1 text-base text-white/80">{item.caption}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappLink(`Hi, I saw "${item.title}" on your website. I need something like this.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.9)] transition hover:-translate-y-0.5 hover:bg-[#1fb957]"
            >
              <WhatsAppIcon className="size-5" /> I Need This
            </a>
            {item.product && (
              <Link
                href={`/products/${item.product}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-base font-bold text-white ring-1 ring-white/25 transition hover:bg-white/20"
              >
                View {productName[item.product]} <ArrowRight className="size-4" aria-hidden />
              </Link>
            )}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default function WorkGallery() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(null);

  const shown = active === "All" ? workItems : workItems.filter((w) => w.tag === active);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  return (
    <section id="gallery" className="scroll-mt-20 bg-linear-to-b from-surface to-white pb-16 pt-16">
      <Container>
        <SectionHeading
          eyebrow="Photo Gallery"
          title="See Our Products in Real Use"
          description="Walls, benches and ready stock – photos from our work. Tap a photo to see it bigger."
        />

      </Container>

      {/* Sticky filter bar – stays under the header while you scroll the gallery */}
      <div className="sticky top-16 z-30 mt-8 border-y border-neutral-200/70 bg-white/85 shadow-[0_8px_24px_-16px_rgba(17,24,39,0.25)] backdrop-blur-md">
        <Container>
        <div role="group" aria-label="Filter photos" className="flex gap-2.5 overflow-x-auto py-3 [scrollbar-width:none] sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = active === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(t)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-bold transition-all duration-200",
                  on
                    ? "bg-brand text-white shadow-[0_8px_20px_-8px_rgba(217,40,31,0.8)]"
                    : "bg-white text-ink ring-1 ring-black/10 hover:-translate-y-0.5 hover:ring-brand/40",
                )}
              >
                {t}
                <span
                  className={cn(
                    "grid min-w-6 place-items-center rounded-full px-1.5 py-0.5 text-xs font-bold",
                    on ? "bg-white/25 text-white" : "bg-neutral-100 text-ink/70",
                  )}
                >
                  {countOf(t)}
                </span>
              </button>
            );
          })}
        </div>
        </Container>
      </div>

      <Container>
        {/* Masonry: photos keep their real shape – nothing is cropped */}
        <div key={active} className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {shown.map((w, i) => (
            <Reveal key={w.id} delay={(i % 3) * 90} className="mb-5 break-inside-avoid">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${w.title}`}
                className="group relative block w-full overflow-hidden rounded-2xl bg-neutral-200 text-left shadow-[0_4px_20px_rgba(20,24,35,0.1)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,24,35,0.2)] hover:ring-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <Image
                  src={w.src}
                  alt={w.title}
                  width={w.width}
                  height={w.height}
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 45vw, 92vw"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="size-5" aria-hidden />
                </span>
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm">
                    {w.tag}
                  </span>
                  <span className="mt-1.5 block font-display text-lg font-bold leading-tight">{w.title}</span>
                  <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] [@media(hover:none)]:hidden">
                    <span className="overflow-hidden text-sm font-normal leading-snug text-white/85">
                      <span className="block pt-1.5">{w.caption}</span>
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {open !== null && shown[open] && <Lightbox items={shown} index={open} onClose={close} onStep={step} />}
    </section>
  );
}
