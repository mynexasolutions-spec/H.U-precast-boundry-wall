import ImageSlideshow from "@/components/ui/ImageSlideshow";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { storyMainImages, storyPoints, storySideImages } from "@/data/about";
import { siteConfig } from "@/data/site";

export default function StorySection() {
  return (
    <section className="py-16">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Photo collage */}
        <Reveal from="left" className="relative pb-10 pr-6 lg:pr-10">
          <span aria-hidden className="absolute -left-4 -top-4 size-24 rounded-2xl bg-brand" />
          <div className="relative aspect-square overflow-hidden rounded-3xl shadow-[0_8px_30px_rgba(20,24,35,0.18)]">
            <ImageSlideshow images={storyMainImages} sizes="(min-width: 1024px) 600px, 100vw" showDots />
          </div>
          <div className="absolute -bottom-0 right-0 aspect-square w-[42%] overflow-hidden rounded-3xl shadow-[0_12px_36px_rgba(20,24,35,0.3)] ring-8 ring-white">
            <ImageSlideshow images={storySideImages} sizes="260px" interval={4500} offset={2250} />
          </div>
        </Reveal>

        {/* Text */}
        <Reveal from="right">
          <SectionHeading
            align="left"
            eyebrow="Who We Are"
            title="Strong Cement Products, Made With Care"
          />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/80">
            <p>
              {siteConfig.legalName} makes precast cement products at Dadri Bypass, near JDB Dhaba.
              Boundary walls are our main work, and we also make poles, jali blocks, kerb stones,
              paver blocks, RCC rings, benches and more.
            </p>
            <p>
              <strong className="text-ink">What is precast?</strong> It means we make the product
              in a mould in our workshop and let it set properly. Then we bring it to your site
              ready to fix. This saves time, saves money and gives a clean, even finish.
            </p>
            <p>
              Our work is simple: good material, careful making and honest service. Whether you need
              one wall or a big order, we treat it with the same care.
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {storyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base font-medium text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
