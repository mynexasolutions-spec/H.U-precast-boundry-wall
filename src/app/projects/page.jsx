import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectsBanner from "@/components/projects/ProjectsBanner";
import ProjectStats from "@/components/projects/ProjectStats";
import WorkGallery from "@/components/projects/WorkGallery";
import FeaturedWork from "@/components/projects/FeaturedWork";
import ProcessSteps from "@/components/about/ProcessSteps";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Projects – ${siteConfig.name}`,
  description:
    "See real photos of H.U Precast work: boundary walls, designer compound walls, benches, poles, jali panels and more, ready for your site.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header active="/projects" />
      <main className="flex-1">
        <ProjectsBanner />
        <ProjectStats />
        <WorkGallery />
        <FeaturedWork />
        <ProcessSteps />
        <div className="pt-12">
          <CtaBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
