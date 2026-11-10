import { ArrowRight, Camera } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden bg-linear-to-b from-surface via-surface to-white py-16 lg:py-20"
    >
      {/* soft decoration */}
      <div aria-hidden className="absolute -right-24 top-0 -z-10 size-96 rounded-full bg-brand/5 blur-3xl" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.5] [background-image:radial-gradient(#cbd0d8_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <Container>
        <SectionHeading
          eyebrow="Our Projects"
          title="Our Products in Real Use"
          description="Real photos from our work – walls, poles and more, fixed and ready for your site."
        />
      </Container>

      {/* Full-bleed: photos slide edge to edge, controls stay on the container line */}
      <Reveal delay={120} className="mt-6">
        <ProjectsCarousel projects={projects} />
      </Reveal>

      <Container>
        <Reveal className="mt-10 flex flex-col items-center gap-4 text-center">
          <Button href="/projects" className="px-8 py-3.5">
            View All Work <ArrowRight className="size-4" aria-hidden />
          </Button>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-ink/60">
            <Camera className="size-4 text-brand" aria-hidden /> Tap any photo to see the full gallery
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
