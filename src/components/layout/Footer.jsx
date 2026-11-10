import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUp, ChevronRight, Layers, Leaf, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { quickLinks } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;

const colTitle =
  "font-display text-xl font-bold text-white after:mt-2.5 after:block after:h-0.5 after:w-9 after:rounded-full after:bg-brand";

const trust = [
  { icon: ShieldCheck, label: "Durable" },
  { icon: Layers, label: "High Quality" },
  { icon: Leaf, label: "Long Lasting" },
];

const socials = [
  { label: "WhatsApp", href: whatsappLink(), icon: WhatsAppIcon, external: true, hover: "hover:bg-[#25D366]" },
  { label: "Call us", href: `tel:${siteConfig.phone}`, icon: Phone, hover: "hover:bg-brand" },
  { label: "Email us", href: `mailto:${siteConfig.email}`, icon: Mail, hover: "hover:bg-brand" },
];

const contacts = [
  { icon: Phone, label: "Call Us", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
  { icon: Mail, label: "Email Us", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPin, label: "Visit Us", value: siteConfig.address, href: mapsUrl, external: true },
];

const imgBySlug = Object.fromEntries(products.map((p) => [p.slug, p.image]));

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-linear-to-b from-[#121a2c] to-[#0a0f1b] text-white">
      {/* red swooshes in the top corners */}
      <svg aria-hidden viewBox="0 0 1440 110" preserveAspectRatio="none" className="absolute inset-x-0 top-0 -z-10 h-12 w-full sm:h-16 lg:h-24">
        <path d="M0 0 L620 0 C 330 8, 110 34, 0 96 Z" fill="#ef2f23" />
        <path d="M1440 0 L1150 0 C 1290 12, 1390 40, 1440 86 Z" fill="#ef2f23" />
      </svg>

      {/* glow, dots and faint product photos in the corners */}
      <div aria-hidden className="absolute -left-24 top-1/3 -z-10 size-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 bottom-16 -z-10 mx-auto h-40 max-w-3xl bg-brand/10 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 -z-10 hidden h-56 w-80 opacity-30 [mask-image:linear-gradient(to_top_right,#000,transparent_75%)] lg:block"
      >
        <Image src={imgBySlug["precast-slabs-blocks"]} alt="" fill sizes="320px" className="object-cover grayscale" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-0 right-0 -z-10 hidden h-72 w-96 opacity-30 [mask-image:linear-gradient(to_top_left,#000,transparent_75%)] lg:block"
      >
        <Image src={imgBySlug["rcc-well-manhole-rings"]} alt="" fill sizes="384px" className="object-cover grayscale" />
      </div>

      <Container className="grid gap-10 pb-12 pt-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[1.25fr_0.75fr_1.3fr_1.1fr] lg:gap-8 lg:pb-16 lg:pt-24">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">
            A trusted provider of high-quality precast and cement products for homes, commercial
            buildings, roads and industrial sites.
          </p>

          <ul className="mt-6 grid max-w-sm grid-cols-3 gap-2.5">
            {trust.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.05] px-2 py-3.5 text-center text-xs font-semibold ring-1 ring-white/10 sm:text-[13px]"
              >
                <Icon className="size-6 text-brand" strokeWidth={1.7} aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-6 max-w-sm border-t border-white/10 pt-5">
            <p className="text-[15px] text-white/80">Connect with us</p>
            <ul className="mt-4 flex gap-3">
              {socials.map(({ label, href, icon: Icon, external, hover }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`grid size-12 place-items-center rounded-xl bg-white/[0.07] text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-transparent ${hover}`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className={colTitle}>Quick Links</h3>
          <ul className="mt-6">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="group flex items-center justify-between gap-4 border-b border-white/[0.06] py-3 text-[15px] text-white/80 transition-colors last:border-0 hover:text-white lg:border-0 lg:py-3.5"
                >
                  {l.label}
                  <ChevronRight className="size-4 text-white/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className={colTitle}>Our Products</h3>
          <ul className="mt-6 space-y-1.5">
            {products.slice(0, 7).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex items-center gap-3 rounded-xl py-1 pr-1 text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/10">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100"
                      />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">{p.name}</span>
                  <ChevronRight className="size-4 shrink-0 text-white/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/products"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-brand px-5 py-2.5 text-[15px] font-bold text-brand transition-all hover:-translate-y-0.5 hover:bg-brand hover:text-white"
          >
            View all {products.length} products <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {/* Contact */}
        <div className="sm:col-span-2 lg:col-span-1 lg:border-l lg:border-white/10 lg:pl-8">
          <h3 className={colTitle}>Contact Us</h3>
          <ul className="mt-6 space-y-5">
            {contacts.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-[#6b1b1d] to-[#2a1720] text-white ring-1 ring-brand/30 transition-all duration-300 group-hover:from-brand group-hover:to-brand-dark group-hover:ring-transparent">
                    <Icon className="size-6" strokeWidth={1.7} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/55">{label}</span>
                    <span className="block break-words text-base font-semibold leading-snug text-white">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/20">
        <Container className="flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-center text-sm text-white/65 sm:text-left">
            © {siteConfig.copyrightYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-xl border border-brand/70 bg-brand/10 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:bg-brand"
          >
            Back to top <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden />
          </a>
        </Container>
      </div>
    </footer>
  );
}
