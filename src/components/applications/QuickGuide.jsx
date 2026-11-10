import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { applicationDetails } from "@/data/applicationDetails";
import { products } from "@/data/products";

export default function QuickGuide() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="Quick Guide"
          title="Which Product Fits Where?"
          description="Not sure what to pick? This table shows where each product is most often used."
        />

        {/* Phones and tablets: one card per product, with chips for where it is used (no sideways scrolling) */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:hidden">
          {products.map((p, i) => {
            const uses = applicationDetails.filter((a) => a.productSlugs.includes(p.slug));
            return (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 80}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full items-start gap-3.5 rounded-2xl bg-white p-3 shadow-[0_6px_22px_-10px_rgba(20,24,35,0.25)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:ring-brand/30"
                >
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
                    {p.image && <Image src={p.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-110" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">{p.name}</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {uses.length > 0 ? (
                        uses.map(({ slug, short, icon: Icon }) => (
                          <span
                            key={slug}
                            className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-brand ring-1 ring-brand/10"
                          >
                            <Icon className="size-3.5" strokeWidth={2} aria-hidden /> {short}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-ink/50">Ask us where it fits</span>
                      )}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        {/* Laptops: the full table */}
        <Reveal className="mt-10 hidden lg:block">
          {/* `relative` keeps the table's sr-only labels (position: absolute) inside this scroller, so they never widen the page */}
          <div className="relative overflow-x-auto rounded-3xl bg-white shadow-[0_8px_30px_rgba(20,24,35,0.1)] ring-1 ring-black/5">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">Products and the areas where they are used</caption>
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="sticky left-0 z-10 bg-surface px-5 py-4 text-sm font-bold uppercase tracking-wide text-ink/60">
                    Product
                  </th>
                  {applicationDetails.map(({ slug, short, icon: Icon }) => (
                    <th key={slug} scope="col" className="px-3 py-4 text-center">
                      <a href={`#${slug}`} className="group inline-flex flex-col items-center gap-1.5">
                        <span className="grid size-10 place-items-center rounded-xl bg-white text-brand ring-1 ring-black/5 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                          <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                        </span>
                        <span className="text-xs font-bold text-ink">{short}</span>
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="group border-t border-neutral-100 transition-colors hover:bg-neutral-50">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-5 py-3 text-[15px] font-bold text-ink transition-colors group-hover:bg-neutral-50"
                    >
                      <span className="flex items-center gap-3">
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                          <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                        </span>
                        {p.name}
                      </span>
                    </th>
                    {applicationDetails.map((a) => {
                      const used = a.productSlugs.includes(p.slug);
                      return (
                        <td key={a.slug} className="px-3 py-3 text-center">
                          {used ? (
                            <span className="mx-auto grid size-7 place-items-center rounded-full bg-brand text-white">
                              <Check className="size-4" strokeWidth={3} aria-hidden />
                              <span className="sr-only">Used in {a.title}</span>
                            </span>
                          ) : (
                            <span aria-hidden className="text-neutral-300">
                              –
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
