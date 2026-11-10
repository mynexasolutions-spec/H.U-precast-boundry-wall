import Container from "@/components/ui/Container";
import { trustItems } from "@/data/content";

export default function TrustBar() {
  return (
    <Container className="relative z-10 mt-5 pb-2 sm:-mt-[4.5rem] sm:pb-0">
      <ul
        className="fade-up relative grid grid-cols-2 overflow-hidden rounded-3xl bg-white py-1 lg:rounded-2xl lg:py-4 shadow-[0_24px_60px_-15px_rgba(17,24,39,0.4)] ring-1 ring-black/5 before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-linear-to-r before:from-transparent before:via-brand before:to-transparent lg:grid-cols-4"
        style={{ "--d": "450ms" }}
      >
        {trustItems.map(({ icon: Icon, lines }) => (
          <li
            key={lines.join(" ")}
            className="group relative flex cursor-default items-center gap-2.5 border-neutral-100 px-3 py-4 transition-colors duration-300 odd:border-r nth-[-n+2]:border-b sm:gap-3 sm:px-4 sm:py-5 lg:odd:border-r-0 lg:nth-[-n+2]:border-b-0 lg:justify-center hover:bg-red-50/50 lg:gap-4 lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-14 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-linear-to-b lg:after:from-transparent lg:after:via-neutral-300 lg:after:to-transparent lg:last:after:hidden"
          >
            <span className="grid size-11 shrink-0 place-items-center sm:size-12 rounded-2xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 group-hover:from-brand group-hover:to-brand-dark group-hover:text-white group-hover:shadow-[0_10px_22px_-8px_rgba(217,40,31,0.8)] lg:size-14">
              <Icon className="size-6 lg:size-7" strokeWidth={1.8} aria-hidden />
            </span>
            <span className="text-[13px] font-bold leading-tight text-ink min-[400px]:text-sm sm:text-[15px]">
              {lines[0]}
              <br />
              {lines[1]}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
