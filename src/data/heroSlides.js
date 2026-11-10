import { whatsappLink } from "@/lib/whatsapp";

/**
 * Home hero slides (auto-rotating). To add a slide: drop the photo in /public/images/banners and add an item.
 * Laptop/desktop photos should be 16:6 (e.g. 2048x768) – the hero keeps that shape on wide screens, so the whole photo shows even on 4K.
 * `mobileImage` is optional – a portrait photo used on phones; otherwise `image` is used everywhere
 * (`mobilePosition` then picks which part of the wide photo shows on a phone).
 * `lines` = heading lines; the last line is shown in red.
 */
export const heroSlides = [
  {
    id: "durable",
    image: "/images/banners/home-hero-1.jpg",
    // 4:5 phone banner; `mobileBg` = its top colour, so the sky continues above the photo behind the text
    mobileImage: "/images/banners/home-hero-1-mobile.jpg",
    mobileBg: "#1551ac",
    mobilePosition: "74% center",
    badge: "Premium Cement Products",
    lines: ["Durable Precast", "Cement Products", "Built to Last"],
    text: "High-quality, low-maintenance cement products for homes, shops and infrastructure projects.",
    primary: { label: "Explore Products", href: "/products" },
    secondary: { label: "Chat on WhatsApp", href: whatsappLink("Hi, I want a quote for cement products."), whatsapp: true },
  },
  {
    id: "range",
    image: "/images/banners/home-hero-2.jpg",
    mobileImage: "/images/banners/home-hero-2-mobile.jpg",
    mobileBg: "#064aaa",
    mobilePosition: "70% center",
    badge: "Complete Precast Range",
    lines: ["One Place for All", "Your Precast", "Product Needs"],
    text: "From boundary walls and poles to paver blocks, kerb stones and RCC rings – get everything made and delivered to your site.",
    primary: { label: "View All Products", href: "/products" },
    secondary: { label: "Get a Free Quote", href: "/contact" },
  },
  {
    id: "stylish",
    image: "/images/banners/home-hero-3.jpg",
    mobileImage: "/images/banners/home-hero-3-mobile.jpg",
    mobileBg: "#00409c",
    mobilePosition: "68% center",
    badge: "Home & Garden Range",
    lines: ["Stylish Precast", "to Brighten Your", "Home and Garden"],
    text: "Jali blocks, balusters and cement benches that add a neat, lasting look to homes, gardens and parks.",
    primary: { label: "See Our Work", href: "/projects" },
    secondary: { label: "Get a Free Quote", href: "/contact" },
  },
  {
    id: "infrastructure",
    image: "/images/banners/home-hero-4.jpg",
    mobileImage: "/images/banners/home-hero-4-mobile.jpg",
    mobileBg: "#0b4abb",
    mobilePosition: "62% center",
    badge: "Infrastructure Products",
    lines: ["Strong Precast for", "Utilities, Drains and", "Public Spaces"],
    text: "RCC rings, precast slabs and utility cabinets made to last – ready for civil and infrastructure work.",
    primary: { label: "View Products", href: "/products" },
    secondary: { label: "Chat on WhatsApp", href: whatsappLink("Hi, I need infrastructure products. Please share details."), whatsapp: true },
  },
];
