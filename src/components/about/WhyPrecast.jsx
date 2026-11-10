import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { precastBenefits } from "@/data/about";

export default function WhyPrecast() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Why Precast"
          title="Why Choose Precast Over Normal Work?"
          description="Precast gives you a stronger, faster and cleaner way to build."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {precastBenefits.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 90}>
              <div className="group h-full rounded-3xl bg-white p-6 shadow-[0_4px_20px_rgba(20,24,35,0.08)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,24,35,0.16)]">
                <span className="grid size-14 place-items-center rounded-2xl bg-neutral-100 text-brand ring-1 ring-black/5 transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="size-7" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
