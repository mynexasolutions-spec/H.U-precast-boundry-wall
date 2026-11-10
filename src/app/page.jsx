import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Products from "@/components/sections/Products";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Applications from "@/components/sections/Applications";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import CtaBanner from "@/components/sections/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <Products />
        <WhyChooseUs />
        <Applications />
        <Projects />
        <About />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
