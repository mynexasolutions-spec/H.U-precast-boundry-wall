import Image from "next/image";
import { ArrowRight, Check, Hammer } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutPoints } from "@/data/content";
import { siteConfig } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-16 lg:py-20">
      <div aria-hidden className="absolute -left-24 top-1/3 -z-10 size-96 rounded-full bg-brand/5 blur-3xl" />

      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Photos are 1:1, so every frame is square – nothing is cropped */}
        <Reveal from="left" className="relative mx-auto w-full max-w-[34rem] pb-10 pr-6 sm:pr-10">
          <span aria-hidden className="absolute -left-4 -top-4 size-28 rounded-3xl bg-brand" />
          <span
            aria-hidden
            className="absolute -bottom-2 left-8 size-24 rounded-full opacity-60 [background-image:radial-gradient(#d9281f_1.5px,transparent_1.5px)] [background-size:12px_12px]"
          />

          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_24px_60px_-18px_rgba(17,24,39,0.5)] ring-1 ring-black/5">
            <Image
              src="/images/banners/about.jpg"
              alt="Stacked precast poles in front of wall panels"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>

          {/* second photo, overlapping the corner */}
          <div className="absolute bottom-0 right-0 aspect-square w-[40%] overflow-hidden rounded-3xl shadow-[0_16px_40px_rgba(20,24,35,0.35)] ring-[6px] ring-white">
            <Image
              src="/images/products/boundary-wall.jpg"
              alt="Finished precast boundary wall with plants and paved path"
              fill
              sizes="220px"
              className="object-cover"
            />
          </div>

          {/* floating badge */}
          <div className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_-12px_rgba(17,24,39,0.5)] ring-1 ring-black/5 max-sm:left-2 max-sm:scale-90">
            <span className="grid size-11 place-items-center rounded-xl bg-brand text-white">
              <Hammer className="size-5" strokeWidth={1.8} aria-hidden />
            </span>
            <span className="text-sm font-bold leading-tight text-ink">
              Made in moulds,
              <br />
              <span className="font-medium text-ink/60">checked before delivery</span>
            </span>
          </div>
        </Reveal>

        <Reveal from="right">
          <SectionHeading
            align="left"
            eyebrow={`About ${siteConfig.name}`}
            title="A Trusted Name in Cement Products"
          />
          <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">
            {siteConfig.legalName} specializes in manufacturing high-quality precast and cement
            products for a wide range of construction needs. With a focus on durability, design and
            reliability, we deliver products that build stronger, safer and more beautiful spaces.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {aboutPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-[15px] font-bold leading-snug text-ink shadow-[0_4px_16px_rgba(20,24,35,0.07)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(20,24,35,0.12)] hover:ring-brand/40"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-4" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Button href="/about" className="mt-8 px-7 py-3.5">
            Know More About Us <ArrowRight className="size-4" aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
