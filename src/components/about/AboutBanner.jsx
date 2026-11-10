import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, MapPin, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/lib/whatsapp";

export default function AboutBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f1626] pt-6 text-white sm:pt-10 lg:pb-48 lg:pt-16">
      <Image
        src="/images/banners/about-hero-v2.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-zoom -z-20 hidden object-cover object-[78%_center] lg:block"
      />
      {/* navy fade: solid behind the text, clear over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block lg:bg-linear-to-r lg:from-[#0f1626] lg:from-12% lg:via-[#0f1626]/80 lg:via-38% lg:to-transparent lg:to-62%"
      />

      <Container>
        <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-sm text-white/75" style={{ "--d": "0ms" }}>
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
            <Home className="size-4" aria-hidden /> Home
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <span className="font-semibold text-white">About Us</span>
        </nav>

        <p
          className="fade-up mt-7 inline-flex items-center gap-3 rounded-2xl border border-brand/70 bg-white/[0.04] py-2 pl-2 pr-5 text-sm font-semibold backdrop-blur-sm sm:text-[15px]"
          style={{ "--d": "80ms" }}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
            <MapPin className="size-[18px]" aria-hidden />
          </span>
          Dadri Bypass · Precast Manufacturer
        </p>

        <h1
          className="fade-up mt-6 max-w-2xl font-display text-[2.4rem] font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ "--d": "160ms" }}
        >
          We Make Cement
          <br className="hidden sm:block" /> Products That{" "}
          <span className="relative inline-block text-brand">
            Last
            {/* hand-drawn underline */}
            <svg
              aria-hidden
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-[105%] text-white sm:h-4"
            >
              <path d="M2 10 C 50 2, 120 2, 198 8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="fade-up mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg" style={{ "--d": "260ms" }}>
          H.U Precast Boundary Wall makes strong, neat and long-lasting precast products for homes,
          shops, farms, parks and roads.
        </p>

        <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" }}>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-8px_rgba(217,40,31,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <Package className="size-5" aria-hidden /> Our Products <span aria-hidden>→</span>
          </Link>
          <a
            href={whatsappLink("Hi, I want to know more about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 px-6 py-3.5 text-base font-bold text-white ring-1 ring-white/45 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
          >
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
        </div>
      </Container>

      {/* Phones and tablets: the photo sits clearly below the text instead of behind it */}
      <div className="relative mt-8 aspect-[11/5] w-full sm:aspect-[2/1] lg:hidden">
        <Image
          src="/images/banners/about-hero-v2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
        <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#0f1626] to-transparent" />
      </div>

      {/* Curved bottom edge: red band that thins out to the right, then white */}
      <svg
        aria-hidden
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 -z-10 h-20 w-full sm:h-28 lg:h-36"
      >
        <path d="M0 28 C 420 108, 950 152, 1440 160 C 950 160, 420 128, 0 56 Z" fill="#ef2f23" />
        <path d="M0 56 C 420 128, 950 160, 1440 160 L1440 161 L0 161 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
