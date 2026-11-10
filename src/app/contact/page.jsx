import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapEmbed from "@/components/contact/MapEmbed";
import ContactFaq from "@/components/contact/ContactFaq";
import ContactCta from "@/components/contact/ContactCta";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Contact Us – ${siteConfig.name}`,
  description: `Get a quote or visit us at ${siteConfig.address}. Call ${siteConfig.phoneDisplay} or message us on WhatsApp.`,
};

export default function ContactPage() {
  return (
    <>
      <Header active="/contact" />
      <main className="flex-1 bg-linear-to-b from-white via-surface to-white">
        <ContactHero />

        {/* Form + contact details (overlaps the hero) */}
        <Container className="relative z-10 -mt-16 scroll-mt-24 sm:-mt-20" id="contact-form">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <Reveal>
              <ContactForm />
            </Reveal>
            <Reveal delay={120}>
              <ContactInfo />
            </Reveal>
          </div>
        </Container>

        <Container className="mt-14">
          <Reveal>
            <MapEmbed />
          </Reveal>
        </Container>

        <Container className="mt-14">
          <Reveal>
            <ContactFaq />
          </Reveal>
        </Container>

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
