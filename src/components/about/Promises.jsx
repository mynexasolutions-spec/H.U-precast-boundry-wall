import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { promises } from "@/data/about";

export default function Promises() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-[#111827] via-[#1a2338] to-[#2a3550] py-16 text-white">
      <div aria-hidden className="absolute -left-20 top-0 -z-10 size-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 right-0 -z-10 size-96 rounded-full bg-white/5 blur-3xl" />
      <Container>
        <Reveal className="text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-brand">
            <span aria-hidden className="h-0.5 w-4 bg-brand" />
            What We Stand For
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Our Mission, Promise and Goal</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {promises.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 110}>
              <div className="h-full rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(217,40,31,0.8)]">
                  <Icon className="size-7" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/80">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
