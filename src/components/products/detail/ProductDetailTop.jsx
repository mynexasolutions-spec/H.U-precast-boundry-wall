import Image from "next/image";
import Link from "next/link";
import { BadgePercent, Box, Check, ChevronRight, Hammer, Home, Layers, Phone, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { categoryIcons } from "@/lib/categoryIcons";
import { siteConfig } from "@/data/site";
import { productQuoteLink } from "@/lib/whatsapp";

export default function ProductDetailTop({ product, details, category }) {
  const CatIcon = categoryIcons[category] ?? Layers;

  const facts = [
    { icon: CatIcon, label: "Category", value: category },
    { icon: Box, label: "Material", value: "Cement concrete / RCC" },
    { icon: Hammer, label: "Made by", value: "Precast (in moulds)" },
    { icon: BadgePercent, label: "Quote", value: "Free on WhatsApp" },
  ];

  return (
    <>
      {/* Title band */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-[#0f1626] via-[#16213a] to-[#1d2b4a] pb-32 pt-8 text-white sm:pt-12 lg:pb-40">
        <div aria-hidden className="absolute -left-24 top-0 -z-10 size-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div aria-hidden className="absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-brand/15 blur-3xl" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
        />

        <Container>
          <nav
            aria-label="Breadcrumb"
            className="fade-up flex flex-wrap items-center gap-2 text-sm text-white/75"
            style={{ "--d": "0ms" }}
          >
            <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
              <Home className="size-4" aria-hidden /> Home
            </Link>
            <ChevronRight className="size-4" aria-hidden />
            <Link href="/products" className="hover:text-white">
              Products
            </Link>
            <ChevronRight className="size-4" aria-hidden />
            <span className="font-semibold text-white">{product.name}</span>
          </nav>

          <p
            className="fade-up mt-6 inline-flex items-center gap-3 rounded-2xl border border-brand/70 bg-white/[0.04] py-2 pl-2 pr-5 text-sm font-semibold backdrop-blur-sm"
            style={{ "--d": "80ms" }}
          >
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
              <CatIcon className="size-[18px]" aria-hidden />
            </span>
            {category}
          </p>

          <h1
            className="fade-up mt-5 max-w-3xl font-display text-[2rem] font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ "--d": "160ms" }}
          >
            {product.name}
          </h1>

          <ul className="fade-up mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85" style={{ "--d": "260ms" }}>
            {[
              [BadgePercent, "Free quote on WhatsApp"],
              [Truck, "Bulk orders welcome"],
            ].map(([Icon, label]) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon className="size-5 text-brand" strokeWidth={1.8} aria-hidden /> {label}
              </li>
            ))}
          </ul>
        </Container>

        {/* curved bottom edge: red band that thins out to the right, then white */}
        <svg
          aria-hidden
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 -z-10 h-16 w-full sm:h-24 lg:h-32"
        >
          <path d="M0 28 C 420 108, 950 152, 1440 160 C 950 160, 420 128, 0 56 Z" fill="#ef2f23" />
          <path d="M0 56 C 420 128, 950 160, 1440 160 L1440 161 L0 161 Z" fill="#ffffff" />
        </svg>
      </section>

      {/* Image + info card, overlapping the band */}
      <Container className="relative z-10 -mt-20 sm:-mt-24 lg:-mt-28">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Photo (1:1, never cropped) – stays in view on laptops while the details scroll */}
          <Reveal from="left" className="relative mx-auto w-full max-w-xl lg:sticky lg:top-24 lg:max-w-none">
            <span aria-hidden className="absolute -bottom-4 -right-4 size-28 rounded-3xl bg-brand" />
            <span
              aria-hidden
              className="absolute -left-5 -top-5 size-24 opacity-60 [background-image:radial-gradient(#d9281f_1.5px,transparent_1.5px)] [background-size:12px_12px]"
            />

            <div className="group relative aspect-square overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-18px_rgba(17,24,39,0.5)] ring-1 ring-black/5">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent via-45%" />

              <div className="absolute inset-x-4 bottom-4 flex items-center gap-3 rounded-2xl bg-white/15 p-3 text-white ring-1 ring-white/30 backdrop-blur-md">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-md">
                  <CatIcon className="size-6" strokeWidth={1.8} aria-hidden />
                </span>
                <p className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-white/80">Category</span>
                  <span className="block truncate font-display text-base font-bold leading-tight">{category}</span>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal from="right">
            <div className="rounded-3xl bg-white p-6 shadow-[0_24px_60px_-18px_rgba(17,24,39,0.35)] ring-1 ring-black/5 sm:p-8">
              <p className="inline-flex items-center gap-2.5 text-sm font-bold text-brand">
                <span aria-hidden className="h-0.5 w-6 bg-brand" /> Product Overview
              </p>
              <p className="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">{details.summary}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {details.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-2xl bg-neutral-50 p-3.5 text-[15px] font-semibold leading-snug text-ink ring-1 ring-black/5"
                  >
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl p-1">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/10">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-bold uppercase tracking-wide text-ink/50">{label}</dt>
                      <dd className="text-[14px] font-bold leading-snug text-ink sm:text-[15px]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap gap-3 border-t border-neutral-100 pt-6">
                <a
                  href={productQuoteLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb957] sm:flex-none"
                >
                  <WhatsAppIcon className="size-5" /> Get Quote on WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-ink px-6 py-3.5 text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft sm:flex-none"
                >
                  <Phone className="size-5" aria-hidden /> Call {siteConfig.phoneDisplay}
                </a>
              </div>
              <p className="mt-4 text-sm text-ink/60">
                Share the size and quantity you need and we will send you the exact price.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
