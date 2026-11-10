import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductDetailTop from "@/components/products/detail/ProductDetailTop";
import ProductDetailSections from "@/components/products/detail/ProductDetailSections";
import CtaBanner from "@/components/sections/CtaBanner";
import { products } from "@/data/products";
import { productDetails } from "@/data/productDetails";
import { siteConfig } from "@/data/site";
import { getApplications, getCategory, getNeighbours, getProduct, getRelated } from "@/lib/catalog";

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} – ${siteConfig.name}`,
    description: productDetails[slug]?.summary,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const details = productDetails[slug];
  if (!product || !details) notFound();

  const { prev, next } = getNeighbours(slug);

  return (
    <>
      <Header active="/products" />
      <main className="flex-1">
        <ProductDetailTop product={product} details={details} category={getCategory(slug)} />
        <ProductDetailSections
          product={product}
          details={details}
          apps={getApplications(slug)}
          related={getRelated(slug, 4)}
          prev={prev}
          next={next}
        />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
