import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplicationsBanner from "@/components/applications/ApplicationsBanner";
import ApplicationSection from "@/components/applications/ApplicationSection";
import QuickGuide from "@/components/applications/QuickGuide";
import CtaBanner from "@/components/sections/CtaBanner";
import { applicationDetails } from "@/data/applicationDetails";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Applications – ${siteConfig.name}`,
  description:
    "See where precast cement products are used: homes, commercial buildings, roads, parks and industrial areas. Find the right product for your project.",
};

export default function ApplicationsPage() {
  return (
    <>
      <Header active="/applications" />
      <main className="flex-1">
        <ApplicationsBanner />
        {applicationDetails.map((app, i) => (
          <ApplicationSection key={app.slug} app={app} index={i} />
        ))}
        <QuickGuide />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
