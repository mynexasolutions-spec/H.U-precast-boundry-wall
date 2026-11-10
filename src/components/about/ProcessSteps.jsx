import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps } from "@/data/about";

export default function ProcessSteps() {
  return (
    <section className="bg-surface py-16">
      <Container>
        <SectionHeading
          eyebrow="How We Work"
          title="Simple Steps From Order to Delivery"
          description="Getting your products is easy. Here is how it goes."
        />
        <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* dotted line behind the numbers (desktop) */}
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t-2 border-dashed border-neutral-300 lg:block"
          />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
              <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-brand font-display text-xl font-bold text-white shadow-[0_10px_24px_-8px_rgba(217,40,31,0.8)] ring-8 ring-surface">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-[18rem] text-base leading-relaxed text-ink/70">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
