import {
  Eye,
  Handshake,
  Leaf,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
  Wrench,
  Zap,
} from "lucide-react";

export const storyPoints = [
  "Made in moulds, so every piece has the same size and shape",
  "Cured properly, so it comes to your site strong and ready",
  "Quick to fix – no long waiting at the site",
];

/** Product groups. `slugs` must match slugs in data/products.js. */
export const categories = [
  {
    title: "Walls & Fencing",
    text: "Strong walls to protect your home, shop, farm or plot.",
    image: "/images/products/boundary-wall.jpg",
    slugs: [
      "precast-boundary-wall-panels",
      "designer-compound-walls",
      "rcc-compound-wall-panels",
      "fencing-poles-slabs",
      "rcc-precast-beams-poles",
    ],
  },
  {
    title: "Roads & Paving",
    text: "Tough products for roads, paths, parking areas and drains.",
    image: "/images/products/paver-blocks.jpg",
    slugs: ["interlocking-paver-blocks", "kerb-stones", "drain-covers-gratings", "rcc-paver-slabs"],
  },
  {
    title: "Home & Garden",
    text: "Good-looking pieces that give your space a nice finish.",
    image: "/images/products/decorative-jali.jpg",
    slugs: ["ventilation-blocks", "decorative-jali-panels", "railing-balusters-panels", "cement-benches"],
  },
  {
    title: "Infrastructure",
    text: "Ready-made parts for water, drainage and utility work.",
    image: "/images/products/rcc-rings.jpg",
    slugs: ["rcc-well-manhole-rings", "utility-cabinets-enclosures", "precast-slabs-blocks"],
  },
];

export const precastBenefits = [
  {
    icon: ShieldCheck,
    title: "Strong & Long Lasting",
    text: "Cement does not rot, rust or get eaten by termites. It stands up to sun, rain and heavy use.",
  },
  {
    icon: Zap,
    title: "Fast to Fix",
    text: "The parts are already made. Your team only has to place them, so work finishes sooner.",
  },
  {
    icon: Wallet,
    title: "Saves Money",
    text: "Less labour, less waste and almost no repair cost later. You save in the long run.",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    text: "No yearly painting or fixing. Just wash it now and then and it looks good.",
  },
  {
    icon: Sparkles,
    title: "Neat, Even Finish",
    text: "Each piece comes from a mould, so size and surface stay the same from one piece to the next.",
  },
  {
    icon: Leaf,
    title: "Clean Work Site",
    text: "No mixing, no mess and no long curing at your site. Less dust, less noise.",
  },
];

export const steps = [
  {
    title: "Tell Us What You Need",
    text: "Call us, message on WhatsApp or fill the form. Share the product, size and place.",
  },
  {
    title: "Get a Clear Quote",
    text: "We tell you the price and answer your questions in simple words. No hidden talk.",
  },
  {
    title: "We Make Your Order",
    text: "Your products are cast in moulds, cured well and checked before they leave.",
  },
  {
    title: "Delivery to Your Site",
    text: "We send your order to your site so you can start fixing without delay.",
  },
];

export const promises = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To make strong and good-looking cement products that are easy to buy and easy to fix.",
  },
  {
    icon: Handshake,
    title: "Our Promise",
    text: "Fair price, honest talk and delivery on time. If you have a doubt, just ask us.",
  },
  {
    icon: Eye,
    title: "Our Goal",
    text: "To be the first name people remember when they need precast products in our area.",
  },
];

export const faqs = [
  {
    q: "What does “precast” mean?",
    a: "Precast means the product is made in a mould in our workshop and cured there. After it is strong, we bring it to your site and fix it. You do not have to mix or pour cement at the site.",
  },
  {
    q: "How long do precast products last?",
    a: "They last for many years. Cement does not rot or rust, and termites cannot damage it. With simple care, a precast wall or product keeps its strength and look.",
  },
  {
    q: "Can I get a custom size or design?",
    a: "For many products, yes. Send us the size and the design you want on WhatsApp. We will tell you what we can make and how much it costs.",
  },
  {
    q: "Do you supply in bulk?",
    a: "Yes. We supply for homes, shops, farms, parks, roads and bigger projects. Tell us how many pieces you need and we will give you a quote.",
  },
  {
    q: "How can I get a price?",
    a: "Fill the form on our Contact page or message us on WhatsApp. Tell us the product and your city. We will reply with the price.",
  },
];

/** Big frame in "Who We Are": our yard and stock. */
export const storyMainImages = [
  { src: "/images/banners/about.jpg", alt: "Stacked precast poles at our yard" },
  { src: "/images/products/fencing-poles.jpg", alt: "Fencing poles and slabs ready for delivery" },
  { src: "/images/products/paver-slabs.jpg", alt: "Stacked RCC paver slabs" },
  { src: "/images/products/rcc-rings.jpg", alt: "RCC well and manhole rings" },
  { src: "/images/products/kerb-stones.jpg", alt: "Concrete kerb stones" },
  { src: "/images/products/rcc-poles.jpg", alt: "RCC precast beams and poles" },
];

/** Small frame: finished products in use. */
export const storySideImages = [
  { src: "/images/products/boundary-wall.jpg", alt: "Finished precast boundary wall" },
  { src: "/images/products/decorative-wall.jpg", alt: "Designer compound wall" },
  { src: "/images/products/jali-blocks.jpg", alt: "Ventilation jali blocks" },
  { src: "/images/products/cement-bench.jpg", alt: "Cement bench" },
  { src: "/images/products/balusters.jpg", alt: "Cement railing balusters" },
  { src: "/images/products/compound-wall.jpg", alt: "RCC compound wall panels" },
];
