import { ArrowRight, Award, Layers, Package, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import HomeProductCard from "@/components/sections/HomeProductCard";
import { products } from "@/data/products";

const perks = [
  { icon: ShieldCheck, label: "High Strength" },
  { icon: Layers, label: "Durable & Long Lasting" },
  { icon: Award, label: "Uniform Quality" },
  { icon: Truck, label: "Bulk Supply" },
];

export default function Products() {
  return (
    <section id="products" className="relative isolate overflow-hidden pb-24 pt-16 sm:pb-28 lg:pt-20">
      {/* soft background + red swooshes in the bottom corners */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-white via-[#f6f7f9] to-[#f1f3f6]" />
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-12 w-full sm:h-16 lg:h-24">
        <path d="M0 120 L0 56 C 200 70, 420 100, 640 120 Z" fill="#ef2f23" />
        <path d="M1440 120 L1440 30 C 1300 60, 1120 96, 880 120 Z" fill="#ef2f23" />
      </svg>

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-3 text-base font-bold text-brand">
            <span aria-hidden className="h-0.5 w-6 bg-brand" /> Our Products <span aria-hidden className="h-0.5 w-6 bg-brand" />
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Explore Our <span className="text-brand">Cement Products</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            A complete range of precast and cement products for fencing, landscaping and infrastructure.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2.5 sm:gap-4">
          {perks.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-4 text-[13px] font-bold text-ink shadow-[0_6px_20px_-8px_rgba(20,24,35,0.25)] ring-1 ring-black/5 sm:gap-3 sm:pl-3 sm:pr-5 sm:text-[15px]"
            >
              <Icon className="size-5 shrink-0 text-brand sm:size-6" strokeWidth={1.7} aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.slice(0, 8).map((product, i) => (
            <Reveal key={product.slug} delay={(i % 4) * 90} className="h-full">
              <HomeProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <a
            href="/products"
            className="inline-flex items-center gap-3 rounded-xl bg-brand px-8 py-4 text-base font-bold text-white shadow-[0_14px_32px_-10px_rgba(217,40,31,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark sm:text-lg"
          >
            <Package className="size-5 sm:size-6" aria-hidden /> View All {products.length} Products{" "}
            <ArrowRight className="size-5" aria-hidden />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
