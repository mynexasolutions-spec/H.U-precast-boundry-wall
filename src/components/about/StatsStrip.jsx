import { Headset, Layers, MapPin, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/about/CountUp";
import { applications } from "@/data/content";
import { products } from "@/data/products";

/** Numbers come from the site data (product and area lists). */
const stats = [
  { icon: Layers, value: <CountUp to={products.length} suffix="+" />, label: "Product Types" },
  { icon: MapPin, value: <CountUp to={applications.length} suffix="+" />, label: "Areas We Serve" },
  { icon: Package, value: "Bulk", label: "Orders Welcome" },
  { icon: Headset, value: "Free", label: "Quote on WhatsApp" },
];

export default function StatsStrip() {
  return (
    <Container className="relative z-10 -mt-4 sm:-mt-6 lg:-mt-32">
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {stats.map((s, i) => (
          <Reveal as="li" key={s.label} delay={i * 90}>
            <div className="group relative flex h-full items-center gap-3 overflow-hidden rounded-2xl bg-white py-4 pl-6 pr-3 shadow-[0_18px_44px_-14px_rgba(17,24,39,0.35)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_-14px_rgba(17,24,39,0.45)] sm:gap-4 sm:py-5 sm:pl-8 sm:pr-5">
              {/* red arrow tab on the left edge */}
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-9 w-2.5 -translate-y-1/2 bg-brand [clip-path:polygon(0_0,100%_50%,0_100%)] transition-all duration-300 group-hover:w-3.5 sm:h-12"
              />
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/10 transition-all duration-300 group-hover:from-brand group-hover:to-brand-dark group-hover:text-white sm:size-16 sm:rounded-2xl">
                <s.icon className="size-6 sm:size-8" strokeWidth={1.6} aria-hidden />
              </span>
              <p className="min-w-0">
                <span className="block font-display text-3xl font-bold leading-none text-ink sm:text-5xl">{s.value}</span>
                <span className="mt-1 block text-[13px] font-semibold leading-snug text-ink/65 sm:mt-1.5 sm:text-base">{s.label}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}
