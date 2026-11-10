import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Handshake, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";

const trust = [
  { icon: ShieldCheck, label: "Trusted Quality" },
  { icon: Handshake, label: "Reliable Support" },
  { icon: Clock, label: "On-Time Delivery" },
];

export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#111827] pb-28 pt-10 text-white sm:pt-14 lg:pb-32">
      <Image
        src="/images/banners/hero-3.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[75%_center]"
      />
      {/* navy fade from the left keeps the text readable; the photo stays bright on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 max-lg:bg-[#111827]/70 lg:bg-linear-to-r lg:from-[#111827] lg:from-5% lg:via-[#111827]/75 lg:via-35% lg:to-transparent lg:to-65%"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-black/40 to-transparent" />

      {/* red corner accents */}
      <span aria-hidden className="absolute left-0 top-0 -z-10 h-16 w-24 bg-brand [clip-path:polygon(0_0,100%_0,0_100%)] sm:h-24 sm:w-40" />
      <span aria-hidden className="absolute bottom-0 right-0 -z-10 h-20 w-36 bg-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:h-28 sm:w-56" />

      <Container>
        <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-1.5 text-sm text-white/80" style={{ "--d": "0ms" }}>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <span className="font-semibold text-white">Contact</span>
        </nav>

        <h1
          className="fade-up mt-6 font-display text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl"
          style={{ "--d": "100ms" }}
        >
          Contact <span className="text-brand">Us</span>
        </h1>

        <p
          className="fade-up mt-6 max-w-lg text-base leading-relaxed text-white/90 sm:text-xl sm:leading-relaxed"
          style={{ "--d": "200ms" }}
        >
          Have a question or need a quote? We&apos;re here to help you with the best precast solutions
          for your construction needs.
        </p>

        <span aria-hidden className="fade-up mt-6 block h-0.5 w-14 bg-brand" style={{ "--d": "300ms" }} />

        <ul className="fade-up mt-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-y-4" style={{ "--d": "400ms" }}>
          {trust.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 text-center text-[13px] font-semibold leading-tight sm:flex-row sm:gap-3 sm:pr-5 sm:text-left sm:text-[15px] sm:[&:not(:last-child)]:mr-5 sm:[&:not(:last-child)]:border-r sm:[&:not(:last-child)]:border-white/25"
            >
              <span className="grid size-10 place-items-center rounded-full bg-white/15 text-[#ff6a5f] ring-1 ring-white/30 backdrop-blur-sm">
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
