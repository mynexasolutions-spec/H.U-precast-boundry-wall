import { applicationDetails } from "@/data/applicationDetails";
import { categories } from "@/data/about";
import { products } from "@/data/products";

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getCategory = (slug) =>
  categories.find((c) => c.slugs.includes(slug))?.title ?? "Precast Products";

/** Same-category products first, then any others, up to `n`. */
export function getRelated(slug, n = 4) {
  const cat = categories.find((c) => c.slugs.includes(slug));
  const same = (cat?.slugs ?? []).filter((s) => s !== slug).map(getProduct);
  const rest = products.filter((p) => p.slug !== slug && !same.includes(p));
  return [...same, ...rest].slice(0, n);
}

export const getApplications = (slug) => applicationDetails.filter((a) => a.productSlugs.includes(slug));

export function getNeighbours(slug) {
  const i = products.findIndex((p) => p.slug === slug);
  return {
    prev: products[(i - 1 + products.length) % products.length],
    next: products[(i + 1) % products.length],
  };
}
