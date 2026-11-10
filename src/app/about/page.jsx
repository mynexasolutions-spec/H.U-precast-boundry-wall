import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutBanner from "@/components/about/AboutBanner";
import StatsStrip from "@/components/about/StatsStrip";
import StorySection from "@/components/about/StorySection";
import WhatWeMake from "@/components/about/WhatWeMake";
import WhyPrecast from "@/components/about/WhyPrecast";
import ProcessSteps from "@/components/about/ProcessSteps";
import Promises from "@/components/about/Promises";
import Faq from "@/components/about/Faq";
import PrecastVsNormal from "@/components/about/PrecastVsNormal";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `About Us – ${siteConfig.name}`,
  description:
    "Learn about H.U Precast Boundary Wall – what we make, why precast is a smart choice, and how we work. Strong, neat and long-lasting cement products.",
};

export default function AboutPage() {
  return (
    <>
      <Header active="/about" />
      <main className="flex-1">
        <AboutBanner />
        <StatsStrip />
        <StorySection />
        <WhatWeMake />
        <WhyPrecast />
        <PrecastVsNormal />
        <ProcessSteps />
        <Promises />
        <Faq />
        <div className="pt-4">
          <CtaBanner />
        </div>
      </main>
      <Footer />
    </>
  );
}
