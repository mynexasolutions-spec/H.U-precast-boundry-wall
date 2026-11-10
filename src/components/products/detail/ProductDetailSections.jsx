import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardList, Hammer, ShieldCheck, Truck } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CatalogProductCard from "@/components/products/CatalogProductCard";
import { orderChecklist } from "@/data/productDetails";
import { getCategory } from "@/lib/catalog";
import { categoryIcons } from "@/lib/categoryIcons";

const assurances = [
  { icon: Hammer, label: "Made in moulds" },
  { icon: ShieldCheck, label: "Checked before delivery" },
  { icon: Truck, label: "Bulk supply" },
];

function NeighbourLink({ product, dir }) {
  const next = dir === "next";
  return (
    <Link
      href={`/products/${product.slug}`}
      className={`group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_6px_22px_-10px_rgba(20,24,35,0.25)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(20,24,35,0.3)] hover:ring-brand/40 ${next ? "flex-row-reverse text-right" : ""}`}
    >
      <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
        <Image src={product.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold uppercase tracking-wide text-ink/50">
          {next ? "Next product" : "Previous product"}
        </span>
        <span className="mt-0.5 block text-[15px] font-bold leading-snug text-ink">{product.name}</span>
      </span>
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_6px_14px_-4px_rgba(217,40,31,0.7)]">
        {next ? (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        ) : (
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        )}
      </span>
    </Link>
  );
}

export default function ProductDetailSections({ product, details, apps, related, prev, next }) {
  return (
    <>
      {/* About + order checklist */}
      <section className="py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal from="left">
            <SectionHeading align="left" eyebrow="About This Product" title={`What is ${product.name}?`} />
            <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">{details.description}</p>
            <p className="mt-4 text-base leading-relaxed text-ink/75 sm:text-lg">
              Every piece is made in a mould, cured well and checked before it leaves our workshop at
              Dadri Bypass, so you get the same quality on every order.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-3">
              {assurances.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-[15px] font-bold text-ink shadow-[0_6px_20px_-10px_rgba(20,24,35,0.25)] ring-1 ring-black/5"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/10">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal from="right">
            <div className="rounded-3xl bg-linear-to-br from-surface to-white p-6 shadow-[0_12px_40px_-16px_rgba(20,24,35,0.25)] ring-1 ring-black/5 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(217,40,31,0.8)]">
                <ClipboardList className="size-6" strokeWidth={1.8} aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">What to tell us when you order</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {orderChecklist.map((c, i) => (
                  <li key={c.title} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <span className="grid size-8 place-items-center rounded-full bg-brand text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <p className="mt-2.5 text-[15px] font-bold text-ink">{c.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-ink/65">{c.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Where it is used */}
      {apps.length > 0 && (
        <section className="bg-surface py-16 lg:py-20">
          <Container>
            <SectionHeading
              eyebrow="Where It Is Used"
              title={`Best Places to Use ${product.name}`}
              description="This product is most often used in these areas."
            />
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {apps.map(({ slug, title, tagline, icon: Icon, image }, i) => (
                <Reveal as="li" key={slug} delay={(i % 3) * 90}>
                  <Link
                    href={`/applications#${slug}`}
                    className="group flex h-full items-center gap-4 rounded-3xl bg-white p-3 pr-5 shadow-[0_8px_28px_-12px_rgba(20,24,35,0.25)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(20,24,35,0.35)] hover:ring-brand/40"
                  >
                    <span className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-neutral-200">
                      <Image src={image} alt="" fill sizes="96px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <span className="absolute bottom-1.5 left-1.5 grid size-8 place-items-center rounded-lg bg-white text-brand shadow-md">
                        <Icon className="size-4" strokeWidth={2} aria-hidden />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold leading-tight text-ink transition-colors group-hover:text-brand">{title}</span>
                      <span className="mt-1 block text-[14px] leading-snug text-ink/70">{tagline}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Related products */}
      <section className="py-16 lg:py-20">
        <Container>
          <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p, i) => {
              const cat = getCategory(p.slug);
              return (
                <Reveal key={p.slug} delay={i * 90} className="h-full">
                  <CatalogProductCard product={p} badge={cat} BadgeIcon={categoryIcons[cat]} />
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <NeighbourLink product={prev} dir="prev" />
            <NeighbourLink product={next} dir="next" />
          </div>

          <p className="mt-8 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-base font-bold text-brand hover:underline">
              <ArrowLeft className="size-4" aria-hidden /> Back to all products
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
