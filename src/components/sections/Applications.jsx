import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { applicationDetails } from "@/data/applicationDetails";

export default function Applications() {
  return (
    <section id="applications" className="relative isolate overflow-hidden py-16 lg:py-20">
      <div aria-hidden className="absolute -right-24 top-10 -z-10 size-96 rounded-full bg-brand/5 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.45] [background-image:radial-gradient(#cbd0d8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <Container>
        <SectionHeading
          eyebrow="Applications"
          title="Versatile Solutions for Every Space"
          description="Our cement products are widely used in residential, commercial and public infrastructure projects."
        />

        {/* Photos are 1:1, so the cards are square – nothing is cropped */}
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {applicationDetails.map(({ slug, title, tagline, icon: Icon, image, alt }, i) => (
            <Reveal
              as="li"
              key={slug}
              delay={i * 90}
              className={i === applicationDetails.length - 1 ? "max-sm:col-span-2 max-sm:mx-auto max-sm:w-[calc(50%-8px)]" : ""}
            >
              <Link
                href={`/applications#${slug}`}
                className="group relative isolate block aspect-square overflow-hidden rounded-3xl bg-slate-700 text-white shadow-[0_10px_30px_rgba(20,24,35,0.18)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_55px_-12px_rgba(20,24,35,0.5)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 30vw, 45vw"
                  className="-z-20 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-black/75 via-black/5 to-transparent via-50% max-lg:from-black/80 max-lg:via-black/10 max-lg:via-45%" />

                {/* number + arrow (desktop) / icon chip (phone and tablet) */}
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 font-display text-xs font-bold text-ink shadow-sm backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-3 top-3 grid size-9 -translate-y-1 place-items-center rounded-full bg-brand opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:hidden">
                  <ArrowUpRight className="size-[18px]" aria-hidden />
                </span>
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-xl bg-white text-brand shadow-md lg:hidden">
                  <Icon className="size-[18px]" strokeWidth={1.8} aria-hidden />
                </span>

                {/* Phone/tablet: just the name on the photo's gradient, so the picture stays visible.
                    Desktop: glass info panel that grows on hover to reveal the tagline. */}
                <div className="absolute inset-x-0 bottom-0 p-3 lg:inset-x-2.5 lg:bottom-2.5 lg:rounded-2xl lg:bg-white/15 lg:ring-1 lg:ring-white/25 lg:backdrop-blur-md lg:transition-colors lg:duration-300 lg:group-hover:bg-white/25">
                  <div className="flex items-center gap-2.5">
                    <span className="hidden size-10 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-md transition-colors duration-300 group-hover:bg-brand group-hover:text-white lg:grid">
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                    </span>
                    <h3 className="min-w-0 break-words text-[15px] font-bold leading-tight drop-shadow-md">{title}</h3>
                  </div>
                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] max-lg:hidden [@media(hover:none)]:hidden">
                    <p className="overflow-hidden text-[13px] leading-snug text-white/90">
                      <span className="block pt-2">{tagline}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 text-center">
          <Button href="/applications" className="px-8 py-3.5">
            Explore All Applications <ArrowRight className="size-4" aria-hidden />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
