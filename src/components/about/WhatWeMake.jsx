import Image from "next/image";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/data/about";
import { products } from "@/data/products";

const nameBySlug = Object.fromEntries(products.map((p) => [p.slug, p.name]));

export default function WhatWeMake() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <SectionHeading
          eyebrow="What We Make"
          title="One Place for All Your Precast Needs"
          description="From a simple wall to paving and drainage – here is what we make, in four easy groups."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 90}>
              <article className="group h-full overflow-hidden rounded-3xl bg-white shadow-[0_4px_20px_rgba(20,24,35,0.08)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,24,35,0.16)]">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1280px) 310px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <h3 className="absolute bottom-3 left-4 font-display text-xl font-bold text-white">{c.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-base text-ink/70">{c.text}</p>
                  <ul className="mt-4 space-y-2">
                    {c.slugs.map((slug) => (
                      <li key={slug} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
                        <Check className="mt-1 size-4 shrink-0 text-brand" strokeWidth={3} aria-hidden />
                        {nameBySlug[slug]}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
