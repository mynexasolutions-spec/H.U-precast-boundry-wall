import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Reveal from "@/components/ui/Reveal";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

export default function CtaBanner() {
  return (
    <Container className="mb-12">
      <Reveal className="relative isolate overflow-hidden rounded-2xl bg-[#14213a] text-white">
        {/* The photo already fades to navy on its left side, so the text sits on it directly. */}
        <Image
          src="/images/banners/cta.jpg"
          alt=""
          fill
          sizes="(min-width: 1400px) 1350px, 100vw"
          className="-z-10 object-cover object-right"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#14213a]/60 sm:bg-transparent" />

        <div className="max-w-xl px-6 py-10 sm:px-10">
          <h2 className="font-display text-2xl font-bold sm:text-[28px]">Planning a Construction Project?</h2>
          <p className="mt-3 text-base text-white/85">
            Get expert guidance, product details and a customized quote for your requirement.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/contact">
              Request a Quote <ArrowRight className="size-4" aria-hidden />
            </Button>
            <Button href={whatsappLink()} variant="ghost">
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
