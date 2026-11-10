import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { products } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

export default function ApplicationSection({ app, index }) {
  const { slug, title, short, icon: Icon, image, alt, tagline, text, points, productSlugs } = app;
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <section
      id={slug}
      className={cn("relative isolate scroll-mt-16 overflow-hidden py-16 lg:py-24", flip ? "bg-surface" : "bg-white")}
    >
      {/* giant faint number */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-6 -z-10 select-none font-display text-[12rem] font-bold leading-none text-neutral-900/[0.035] sm:text-[18rem]",
          flip ? "left-4" : "right-4",
        )}
      >
        {number}
      </span>

      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo (1:1, never cropped) – stays in view while the long text scrolls on desktop */}
        <Reveal
          from={flip ? "right" : "left"}
          className={cn("relative mx-auto w-full max-w-xl lg:sticky lg:top-28", flip && "lg:order-2")}
        >
          <span
            aria-hidden
            className={cn("absolute -bottom-4 size-28 rounded-3xl bg-brand", flip ? "-left-4" : "-right-4")}
          />
          <span
            aria-hidden
            className={cn(
              "absolute -top-5 size-24 opacity-60 [background-image:radial-gradient(#d9281f_1.5px,transparent_1.5px)] [background-size:12px_12px]",
              flip ? "-right-5" : "-left-5",
            )}
          />

          <div className="group relative aspect-square overflow-hidden rounded-3xl shadow-[0_24px_60px_-18px_rgba(17,24,39,0.5)] ring-1 ring-black/5">
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 font-display text-sm font-bold text-white backdrop-blur-sm">
              {number}
            </span>

            {/* glass info chip */}
            <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/15 p-3 ring-1 ring-white/30 backdrop-blur-md">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-md">
                <Icon className="size-6" strokeWidth={1.8} aria-hidden />
              </span>
              <p className="min-w-0 text-white">
                <span className="block font-display text-base font-bold leading-tight">{short}</span>
                <span className="flex items-center gap-1.5 text-sm text-white/85">
                  <Package className="size-3.5" aria-hidden /> {productSlugs.length} products suited
                </span>
              </p>
            </div>
          </div>
        </Reveal>

        {/* Details */}
        <Reveal from={flip ? "left" : "right"}>
          <p className="inline-flex items-center gap-2.5 text-sm font-bold text-brand">
            <span aria-hidden className="h-0.5 w-6 bg-brand" /> Application {number}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">{title}</h2>
          <p className="mt-3 text-lg font-semibold leading-snug text-brand sm:text-xl">{tagline}</p>
          <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">{text}</p>

          <h3 className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-ink/55">
            How it helps <span aria-hidden className="h-px flex-1 bg-neutral-200" />
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-2xl bg-white p-3.5 text-[15px] font-semibold leading-snug text-ink shadow-[0_4px_16px_rgba(20,24,35,0.07)] ring-1 ring-black/5"
              >
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-ink/55">
            Products we supply <span aria-hidden className="h-px flex-1 bg-neutral-200" />
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {productSlugs.map((s) => {
              const p = bySlug[s];
              return (
                <li key={s}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-[0_2px_12px_rgba(20,24,35,0.07)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(20,24,35,0.14)] hover:ring-brand/40"
                  >
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </span>
                    <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                      {p.name}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink(`Hi, I need products for ${title}. Please share details and price.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb957]"
            >
              <WhatsAppIcon className="size-5" /> Get a Quote for {short}
            </a>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-bold text-ink shadow-[0_6px_18px_rgba(20,24,35,0.1)] ring-1 ring-black/10 transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/40"
            >
              All Products <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
