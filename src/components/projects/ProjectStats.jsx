import { Armchair, Fence, Images, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/about/CountUp";
import { workItems } from "@/data/projects";

const count = (tag) => workItems.filter((w) => w.tag === tag).length;

/** Every number is counted from the photo list, so it updates when photos are added. */
const stats = [
  { icon: Images, value: <CountUp to={workItems.length} suffix="+" />, label: "Real Project Photos" },
  { icon: Fence, value: <CountUp to={count("Walls & Fencing")} />, label: "Walls & Fencing Projects" },
  { icon: Armchair, value: <CountUp to={count("Landscape & Benches")} />, label: "Landscape & Benches Projects" },
  { icon: Package, value: <CountUp to={count("Ready Stock")} suffix="+" />, label: "Ready Stock Products" },
];

export default function ProjectStats() {
  return (
    <Container className="relative z-10 -mt-4 sm:-mt-6 lg:-mt-28">
      <Reveal>
        <ul className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-18px_rgba(17,24,39,0.4)] ring-1 ring-black/5 lg:grid-cols-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="group relative flex items-center gap-3 px-4 py-5 sm:gap-4 sm:px-6 sm:py-7 lg:px-8 max-lg:[&:nth-child(n+3)]:border-t max-lg:[&:nth-child(n+3)]:border-neutral-100 lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-16 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-neutral-200 lg:last:after:hidden"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/10 transition-all duration-300 group-hover:from-brand group-hover:to-brand-dark group-hover:text-white sm:size-16">
                <s.icon className="size-6 sm:size-8" strokeWidth={1.6} aria-hidden />
              </span>
              <p className="min-w-0">
                <span className="block font-display text-3xl font-bold leading-none text-ink sm:text-5xl">{s.value}</span>
                <span className="mt-1 block text-[13px] font-medium leading-snug text-ink/65 sm:mt-1.5 sm:text-base">{s.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  );
}
