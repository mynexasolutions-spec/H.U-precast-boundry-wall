import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/data/about";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Questions"
          title="Things People Often Ask"
          description="Short and simple answers. Need more help? Just message us."
        />
        <div className="mt-10 space-y-3">
          {faqs.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 70}>
              <details className="group rounded-2xl bg-white shadow-[0_4px_20px_rgba(20,24,35,0.07)] ring-1 ring-black/5 open:shadow-[0_10px_30px_rgba(20,24,35,0.12)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-base font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-brand transition-all duration-300 group-open:rotate-180 group-open:bg-brand group-open:text-white">
                    <ChevronDown className="size-5" aria-hidden />
                  </span>
                </summary>
                <p className="px-6 pb-5 text-base leading-relaxed text-ink/75">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        </div>
      </Container>
    </section>
  );
}
