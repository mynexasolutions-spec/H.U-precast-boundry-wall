import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

/** Full-width closing band; "Get a Quote" scrolls back up to the form. */
export default function ContactCta() {
  return (
    <section className="relative isolate mt-16 overflow-hidden bg-[#14213a] py-10 text-white sm:py-12">
      <Image
        src="/images/banners/contact-cta.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-right"
      />
      <div aria-hidden className="absolute inset-0 -z-10 max-lg:bg-[#14213a]/60 lg:bg-linear-to-r lg:from-[#14213a]/80 lg:via-[#14213a]/30 lg:to-transparent" />
      <span aria-hidden className="absolute bottom-0 right-0 -z-10 h-12 w-24 bg-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:h-16 sm:w-36" />

      <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <h2 className="shrink-0 font-display text-3xl font-bold leading-tight sm:text-4xl">
          Let&apos;s Build Something
          <br />
          <span className="text-brand">Strong</span> Together
        </h2>

        <span aria-hidden className="hidden h-14 w-px bg-white/30 lg:block" />

        <p className="max-w-sm text-base leading-relaxed text-white/90">
          Get in touch with us today for premium precast construction solutions.
        </p>

        <a
          href="#contact-form"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-brand px-7 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(217,40,31,0.85)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark lg:ml-auto"
        >
          Get a Quote <ArrowRight className="size-4" aria-hidden />
        </a>
      </Container>
    </section>
  );
}
