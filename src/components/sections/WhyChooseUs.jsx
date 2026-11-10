import Reveal from "@/components/ui/Reveal";
import Container from "@/components/ui/Container";
import ConcreteBlocks from "@/components/ui/ConcreteBlocks";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { whyItems } from "@/data/content";

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_center,#ffffff_40%,#eef0f3_100%)] py-16 lg:py-20"
    >
      <ConcreteBlocks side="left" />
      <ConcreteBlocks side="right" />

      <Container className="relative">
        <SectionHeading
          eyebrow={`Why Choose ${siteConfig.name}`}
          title="Built for Strength, Made for Long Life"
          description="Reliable, cost-effective and sustainable cement solutions for every type of construction."
        />

        {/* Phones: one wide card per point (icon left). From sm: medallion straddles the top edge. */}
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
          {whyItems.map(({ icon: Icon, lines, text }, i) => (
            <Reveal as="li" key={lines.join(" ")} delay={i * 100} className="sm:pt-8">
              <div className="group relative flex h-full items-start gap-4 rounded-3xl bg-white p-5 text-left shadow-[0_8px_30px_rgba(20,24,35,0.09)] ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_-16px_rgba(20,24,35,0.3)] sm:block sm:px-6 sm:pb-8 sm:pt-12 sm:text-center">
                {/* icon medallion */}
                <span className="grid size-[4.25rem] shrink-0 place-items-center rounded-full bg-white shadow-[0_10px_30px_-8px_rgba(20,24,35,0.35)] ring-1 ring-black/5 sm:absolute sm:left-1/2 sm:top-0 sm:size-20 sm:-translate-x-1/2 sm:-translate-y-1/2">
                  <span className="grid size-[3.4rem] place-items-center rounded-full bg-linear-to-br from-brand to-brand-dark text-white shadow-[0_10px_22px_-8px_rgba(217,40,31,0.85)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 sm:size-16">
                    <Icon className="size-7 sm:size-8" strokeWidth={1.7} aria-hidden />
                  </span>
                </span>

                <div className="min-w-0">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink sm:text-xl">
                    {lines[0]} {lines[1]}
                  </h3>
                  <span aria-hidden className="mt-2.5 block h-1 w-10 rounded-full bg-brand transition-all duration-500 group-hover:w-20 sm:mx-auto sm:mt-3" />
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/65 sm:mt-4">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
