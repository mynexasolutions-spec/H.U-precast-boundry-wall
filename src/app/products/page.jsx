import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsBanner from "@/components/products/ProductsBanner";
import ProductCatalog from "@/components/products/ProductCatalog";
import CtaBanner from "@/components/sections/CtaBanner";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Products – ${siteConfig.name}`,
  description:
    "Browse all precast cement products from H.U Precast: boundary walls, compound walls, RCC poles, paver blocks, kerb stones, jali blocks, RCC rings, benches and more.",
};

export default function ProductsPage() {
  return (
    <>
      <Header active="/products" />
      <main className="flex-1">
        <ProductsBanner />
        <Suspense fallback={null}>
          <ProductCatalog />
        </Suspense>
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
