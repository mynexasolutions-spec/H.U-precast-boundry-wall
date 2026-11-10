import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { workItems } from "@/data/projects";
import { whatsappLink } from "@/lib/whatsapp";

const photo = workItems.find((w) => w.id === "wall-crew");

const points = [
  "Panels are made and cured in our workshop first",
  "At the site, they are simply placed between the poles",
  "The wall goes up fast, with a straight and even finish",
  "Very little mess, and no long waiting for cement to dry",
];

export default function FeaturedWork() {
  return (
    <section className="py-16">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal from="left" className="relative">
          <span aria-hidden className="absolute -bottom-4 -left-4 size-28 rounded-3xl bg-brand" />
          <div className="relative overflow-hidden rounded-3xl shadow-[0_16px_48px_-12px_rgba(17,24,39,0.4)] ring-1 ring-black/5">
            <Image
              src={photo.src}
              alt={photo.title}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="h-auto w-full"
            />
            <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
              Featured Work
            </span>
          </div>
        </Reveal>

        <Reveal from="right">
          <SectionHeading
            align="left"
            eyebrow="How a Wall Project Looks"
            title="A Boundary Wall Goes Up in No Time"
          />
          <p className="mt-5 text-base leading-relaxed text-ink/75 sm:text-lg">
            This photo shows our precast wall panels being fitted. Because the panels come ready-made,
            the work at your site is quick and clean.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-base font-medium text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products/precast-boundary-wall-panels"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(217,40,31,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              View Wall Panels <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={whatsappLink("Hi, I want a boundary wall for my plot. Please share details and price.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1fb957]"
            >
              <WhatsAppIcon className="size-5" /> Get a Wall Quote
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
