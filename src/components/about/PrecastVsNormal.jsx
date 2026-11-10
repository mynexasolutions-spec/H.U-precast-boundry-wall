import { Check, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const rows = [
  { what: "Time at your site", precast: "Short – parts are already made", normal: "Long – mixing, building, waiting" },
  { what: "Finish and size", precast: "Even and neat, made in moulds", normal: "Depends on the work on the day" },
  { what: "Mess and dust", precast: "Very little", normal: "A lot of mess at the site" },
  { what: "Upkeep", precast: "Almost none", normal: "Painting and repair over time" },
  { what: "Replacing a damaged part", precast: "Change just that one piece", normal: "Break and rebuild that area" },
];

export default function PrecastVsNormal() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Compare"
          title="Precast vs Normal Construction"
          description="A simple side-by-side look at why more people are choosing precast."
        />

        {/* Phones: one card per point, no sideways scrolling */}
        <ul className="mt-10 space-y-4 sm:hidden">
          {rows.map((r, i) => (
            <Reveal as="li" key={r.what} delay={i * 70}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_26px_-10px_rgba(20,24,35,0.25)] ring-1 ring-black/5">
                <h3 className="px-4 pb-2 pt-4 font-display text-base font-bold text-ink">{r.what}</h3>

                <div className="flex items-start gap-3 bg-red-50/70 px-4 py-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <p className="text-[15px] leading-snug text-ink">
                    <span className="block text-xs font-bold uppercase tracking-wide text-brand">Precast</span>
                    <span className="font-semibold">{r.precast}</span>
                  </p>
                </div>

                <div className="flex items-start gap-3 px-4 py-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-neutral-200 text-ink/60">
                    <X className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <p className="text-[15px] leading-snug text-ink/65">
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink/45">Normal</span>
                    {r.normal}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Tablet / desktop: side-by-side table */}
        <Reveal className="mt-10 hidden sm:block">
          <div className="overflow-hidden rounded-3xl bg-white shadow-[0_12px_40px_-12px_rgba(20,24,35,0.25)] ring-1 ring-black/5">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Comparison of precast and normal construction</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-5 lg:px-6">
                    <span className="sr-only">Point</span>
                  </th>
                  <th scope="col" className="bg-brand px-5 py-5 font-display text-base font-bold text-white lg:px-6 lg:text-lg">
                    <span className="inline-flex items-center gap-2">
                      <Check className="size-5 shrink-0" strokeWidth={3} aria-hidden /> Precast (H.U Precast)
                    </span>
                  </th>
                  <th scope="col" className="bg-neutral-100 px-5 py-5 font-display text-base font-bold text-ink/70 lg:px-6 lg:text-lg">
                    <span className="inline-flex items-center gap-2">
                      <X className="size-5 shrink-0" strokeWidth={3} aria-hidden /> Normal Construction
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.what} className="border-t border-neutral-100">
                    <th scope="row" className="px-5 py-4 text-[15px] font-bold text-ink lg:px-6">
                      {r.what}
                    </th>
                    <td className="bg-red-50/50 px-5 py-4 text-[15px] font-semibold text-ink lg:px-6">{r.precast}</td>
                    <td className="bg-neutral-50 px-5 py-4 text-[15px] text-ink/65 lg:px-6">{r.normal}</td>
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
