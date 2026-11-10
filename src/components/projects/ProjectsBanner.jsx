import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ChevronRight, GalleryHorizontalEnd, Home, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";

const PHOTO = "/images/banners/hero-3.jpg";

export default function ProjectsBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f1626] pt-6 text-white sm:pt-10 lg:pb-44 lg:pt-14">
      {/* laptop: the photo fills the right side, navy fades in behind the text */}
      <Image src={PHOTO} alt="" fill priority sizes="100vw" className="hero-zoom -z-20 hidden object-cover object-[72%_center] lg:block" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden lg:block lg:bg-linear-to-r lg:from-[#0f1626] lg:from-18% lg:via-[#0f1626]/90 lg:via-48% lg:to-transparent lg:to-80%"
      />

      <Container>
        <nav aria-label="Breadcrumb" className="fade-up flex items-center gap-2 text-sm text-white/75" style={{ "--d": "0ms" }}>
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-white">
            <Home className="size-4" aria-hidden /> Home
          </Link>
          <ChevronRight className="size-4" aria-hidden />
          <span className="font-semibold text-white">Projects</span>
        </nav>

        <p
          className="fade-up mt-7 inline-flex items-center gap-3 rounded-2xl border border-brand/70 bg-white/[0.04] py-2 pl-2 pr-5 text-sm font-semibold backdrop-blur-sm sm:text-[15px]"
          style={{ "--d": "80ms" }}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-white">
            <Camera className="size-[18px]" aria-hidden />
          </span>
          Real Photos • Real Work
        </p>

        <h1
          className="fade-up mt-6 max-w-3xl font-display text-[2.4rem] font-bold leading-[1.08] tracking-tight drop-shadow-[0_4px_20px_rgba(15,22,38,0.85)] sm:text-5xl lg:text-6xl xl:text-7xl"
          style={{ "--d": "160ms" }}
        >
          Our Work,{" "}
          <span className="relative inline-block text-brand">
            In Real Life
            {/* hand-drawn underline */}
            <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2 left-[8%] h-3 w-[92%] text-brand sm:h-4">
              <path d="M2 10 C 50 2, 120 2, 198 8" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="fade-up mt-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg" style={{ "--d": "260ms" }}>
          See our precast walls, benches and products at work. These are real photos from completed
          projects, giving you a closer look at our quality and finish.
        </p>

        <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ "--d": "360ms" }}>
          <a
            href="#gallery"
            className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-8px_rgba(217,40,31,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            <GalleryHorizontalEnd className="size-5" aria-hidden /> View Gallery <ArrowRight className="size-4" aria-hidden />
          </a>
          <a
            href={whatsappLink("Hi, I saw your work and I need something similar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 px-6 py-3.5 text-base font-bold text-white ring-1 ring-white/45 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/15"
          >
            <Layers className="size-5" aria-hidden /> Get Similar Work
          </a>
        </div>
      </Container>

      {/* phones and tablets: the photo sits clearly below the text */}
      <div className="relative mt-8 aspect-[11/5] w-full sm:aspect-[2/1] lg:hidden">
        <Image src={PHOTO} alt="" fill priority sizes="100vw" className="object-cover object-[70%_center]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[#0f1626] to-transparent" />
      </div>

      {/* bottom edge: white, with a red swoosh curling up in each corner */}
      <svg aria-hidden viewBox="0 0 1440 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-20 w-full sm:h-28 lg:h-36">
        <path d="M0 40 C 380 140, 1060 140, 1440 20 L1440 36 C 1060 160, 380 160, 0 58 Z" fill="#ef2f23" />
        <path d="M0 58 C 380 160, 1060 160, 1440 36 L1440 161 L0 161 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}
