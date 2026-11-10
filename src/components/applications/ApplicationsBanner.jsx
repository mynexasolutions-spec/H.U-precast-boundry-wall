import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import AppCollage from "@/components/applications/AppCollage";
import { applicationDetails } from "@/data/applicationDetails";

export default function ApplicationsBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-[#0f1626] via-[#16213a] to-[#1d2b4a] pb-20 pt-4 text-white max-sm:flex max-sm:min-h-[calc(100svh-4rem)] max-sm:flex-col max-sm:justify-center sm:pb-32 sm:pt-14 lg:pb-40">
      {/* glow + dots */}
      <div aria-hidden className="absolute -left-24 top-0 -z-10 size-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
      />

      {/* faint stock photo, bottom-left */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 -z-10 hidden h-44 w-[26rem] opacity-25 [mask-image:linear-gradient(to_top_right,black,transparent_75%)] lg:block"
      >
        <Image src="/images/products/drain-covers.jpg" alt="" fill sizes="420px" className="object-cover grayscale" />
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 right-0 -z-10 h-36 w-60 opacity-25 [mask-image:linear-gradient(to_top_left,black,transparent_75%)] lg:hidden"
      >
        <Image src="/images/products/drain-covers.jpg" alt="" fill sizes="240px" className="object-cover grayscale" />
      </div>

      {/* red blob behind the photos */}
      <div
        aria-hidden
        className="absolute right-[6%] top-1/2 -z-10 hidden h-[22rem] w-[30rem] -translate-y-1/2 rotate-[-8deg] rounded-[45%] bg-brand/80 blur-[2px] xl:block"
      />

      <Container className="relative">
        <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-1.5 text-sm text-white/75" style={{ "--d": "0ms" }}>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <span className="font-semibold text-white">Applications</span>
        </nav>

        <p className="fade-up mt-4 inline-flex items-center gap-3 text-base font-bold text-brand sm:mt-6" style={{ "--d": "80ms" }}>
          <span aria-hidden className="h-0.5 w-10 bg-brand" /> Applications
        </p>

        <h1
          className="fade-up mt-3 max-w-2xl font-display text-[1.85rem] font-bold leading-[1.1] min-[420px]:text-4xl tracking-tight sm:text-5xl lg:text-6xl"
          style={{ "--d": "160ms" }}
        >
          Where Our Products
          <br />
          Are{" "}
          <span className="relative inline-block text-brand">
            Used
            {/* hand-drawn underline */}
            <svg
              aria-hidden
              viewBox="0 0 200 14"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-[105%] text-brand sm:h-4"
            >
              <path d="M2 10 C 50 2, 120 2, 198 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="fade-up mt-4 max-w-xl text-[15px] leading-relaxed text-white/85 sm:mt-7 sm:text-lg" style={{ "--d": "260ms" }}>
          From a small home to a big factory – see how precast cement products work in different places,
          and which ones are the best fit for you.
        </p>

        {/* Photo collage for phones and tablets (the big one on the right takes over from xl) */}
        <div aria-hidden className="relative mx-auto mt-10 h-[14rem] w-full max-w-sm min-[420px]:h-[16rem] sm:h-[19rem] sm:max-w-md xl:hidden">
          <div className="absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] rounded-[45%] bg-brand/80 blur-[2px]" />
          <AppCollage variant="mobile" />
        </div>

        {/* Jump links as tiles */}
        <ul className="fade-up mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:flex sm:flex-wrap sm:gap-3" style={{ "--d": "360ms" }}>
          {applicationDetails.map(({ slug, short, icon: Icon }) => (
            <li key={slug}>
              <a
                href={`#${slug}`}
                className="group flex h-full min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white/[0.06] px-2 py-3 text-sm font-bold ring-1 ring-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-brand/60 sm:min-w-28 sm:px-5 sm:py-4 sm:text-[15px]"
              >
                <Icon
                  className="size-6 text-brand transition-transform duration-300 group-hover:scale-110 sm:size-8"
                  strokeWidth={1.6}
                  aria-hidden
                />
                {short}
              </a>
            </li>
          ))}
        </ul>

        {/* Tilted photo cards (desktop) */}
        <div aria-hidden className="absolute right-4 top-1/2 hidden h-[26rem] w-[34rem] -translate-y-1/2 xl:block">
          <AppCollage variant="desktop" />
        </div>
      </Container>

      {/* Curved white edge with a red swoosh */}
      <svg
        aria-hidden
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 -z-10 h-16 w-full sm:h-24 lg:h-28"
      >
        <path d="M0 120 L0 92 C 360 50, 900 40, 1440 18 L1440 120 Z" fill="#ef2f23" />
        <path d="M0 120 L0 104 C 380 70, 940 62, 1440 40 L1440 120 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
