import Link from "next/link";
import { ChevronRight, Home, Layers, Package, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import ShowcaseRotator from "@/components/products/ShowcaseRotator";
import { whatsappLink } from "@/lib/whatsapp";

const features = [
  { icon: ShieldCheck, label: "Durable & Strong" },
  { icon: Layers, label: "Uniform Quality" },
  { icon: Truck, label: "Bulk Supply" },
];

/** Banner photos – they fade from one to the next. Add more paths here to add more slides. */
const SHOWCASES = [
  "/images/banners/products-showcase-v1.webp",
  "/images/banners/products-showcase-v2.webp",
  "/images/banners/products-showcase-v3.webp",
];

export default function ProductsBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-[#0f1626] via-[#16213a] to-[#1d2b4a] pb-24 pt-8 text-white sm:pt-12 lg:min-h-[34rem] lg:pb-36 lg:pt-14">
      {/* glow + dots */}
      <div aria-hidden className="absolute -left-24 top-0 -z-10 size-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* Desktop: product showcase on the right, with red arcs peeking out behind it */}
      <div aria-hidden className="absolute bottom-14 right-0 -z-10 hidden w-[54%] max-w-[62rem] lg:block">
        <div className="absolute -inset-x-[5%] inset-y-[6%] -z-10 rounded-[50%] border-[14px] border-brand/85 [mask-image:linear-gradient(to_right,#000,transparent_20%,transparent_80%,#000)]" />
        <div className="absolute inset-x-[10%] bottom-0 -z-10 h-1/2 rounded-full bg-brand/25 blur-3xl" />
        <ShowcaseRotator images={SHOWCASES} sizes="(min-width: 1024px) 54vw, 0px" className="relative" />
      </div>

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-sm text-white/75" style={{ "--d": "0ms" }}>
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
            <Home className="size-4" aria-hidden /> Home
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <span className="font-semibold text-white">Products</span>
        </nav>

        <h1
          className="fade-up mt-6 max-w-xl font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          style={{ "--d": "100ms" }}
        >
          All Our <span className="text-brand">Precast</span>
          <br className="hidden sm:block" />{" "}
          <span className="relative inline-block">
            Products
            {/* red swoosh next to the word */}
            <svg
              aria-hidden
              viewBox="0 0 200 20"
              preserveAspectRatio="none"
              className="absolute bottom-2 left-[108%] hidden h-4 w-32 text-brand lg:block"
            >
              <path d="M2 16 C 50 4, 120 2, 198 6" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="fade-up mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg" style={{ "--d": "200ms" }}>
          Walls, poles, paving, jali blocks, benches and more. Pick a product and get a quote on
          WhatsApp in one tap.
        </p>

        <ul className="fade-up mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold sm:text-[15px]" style={{ "--d": "300ms" }}>
          {features.map(({ icon: Icon, label }, i) => (
            <li key={label} className="flex items-center gap-x-5">
              {i > 0 && <span aria-hidden className="hidden h-6 w-px bg-white/25 sm:block" />}
              <span className="inline-flex items-center gap-2.5">
                <Icon className="size-6 text-brand" strokeWidth={1.7} aria-hidden /> {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ "--d": "400ms" }}>
          <a
            href="#catalog"
            className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-8px_rgba(217,40,31,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <Package className="size-5" aria-hidden /> Explore Products <span aria-hidden>→</span>
          </a>
          <a
            href={whatsappLink("Hi, I want to know about your products.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 px-6 py-3.5 text-base font-bold text-white ring-1 ring-white/45 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
          >
            <WhatsAppIcon className="size-5" /> Chat on WhatsApp
          </a>
        </div>
      </Container>

      {/* Phones and tablets: showcase sits below the text */}
      <div aria-hidden className="relative mx-auto mt-8 w-full max-w-lg px-4 lg:hidden">
        <div className="absolute inset-x-[8%] inset-y-[10%] -z-10 rounded-[50%] border-[10px] border-brand/85 [mask-image:linear-gradient(to_right,#000,transparent_22%,transparent_78%,#000)]" />
        <ShowcaseRotator images={SHOWCASES} sizes="(max-width: 1023px) 92vw, 0px" className="relative" />
      </div>

      {/* Curved bottom edge: red band that thins out to the right, then white */}
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
  );
}
