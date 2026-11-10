import { siteConfig } from "@/data/site";

/** Builds a wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productQuoteLink(productName) {
  return whatsappLink(`Hi, I need a quote for ${productName}.`);
}
