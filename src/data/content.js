import CoinStackIcon from "@/components/ui/CoinStackIcon";
import {
  Building2,
  Factory,
  Gem,
  HardHat,
  Headset,
  House,
  Layers,
  Leaf,
  Route,
  ShieldCheck,
  Trees,
  Truck,
} from "lucide-react";

export const trustItems = [
  { icon: ShieldCheck, lines: ["High Strength", "& Durability"] },
  { icon: Layers, lines: ["Wide", "Product Range"] },
  { icon: Truck, lines: ["Timely", "Delivery"] },
  { icon: Headset, lines: ["Expert", "Support"] },
];

export const whyItems = [
  {
    icon: Gem,
    lines: ["Superior", "Quality"],
    text: "Made in moulds and checked, so every piece has the same size and a clean finish.",
  },
  {
    icon: Leaf,
    lines: ["Long", "Service Life"],
    text: "Cement does not rot or rust, so it stands up to sun and rain for many years.",
  },
  {
    icon: CoinStackIcon,
    lines: ["Cost", "Effective"],
    text: "Quick to fix and needs very little upkeep, so you save both time and money.",
  },
  {
    icon: HardHat,
    lines: ["Ideal for Multiple", "Applications"],
    text: "Used for homes, shops, roads, parks and industrial sites of every size.",
  },
];

export const applications = [
  { icon: House, lines: ["Residential", "Projects"], image: "/images/applications/residential.jpg", alt: "Modern residential house with lawn" },
  { icon: Building2, lines: ["Commercial", "Buildings"], image: "/images/applications/commercial.jpg", alt: "Glass-fronted commercial building" },
  { icon: Route, lines: ["Roads &", "Infrastructure"], image: "/images/applications/roads.jpg", alt: "Curved highway with kerb stones" },
  { icon: Trees, lines: ["Parks &", "Landscapes"], image: "/images/applications/parks.jpg", alt: "Park bench along a paved walkway" },
  { icon: Factory, lines: ["Industrial", "Areas"], image: "/images/applications/industrial.jpg", alt: "Industrial building with chimney" },
];

export const projects = [
  { title: "Boundary Wall Fixed on Site", image: "/images/work/wall-fixed.jpg", width: 714, height: 541, alt: "Precast boundary wall panels fixed between poles" },
  { title: "Designer Compound Wall", image: "/images/work/wall-designer.jpg", width: 720, height: 456, alt: "Brick-pattern designer compound wall with a carved top" },
  { title: "Wall with Paved Walkway", image: "/images/work/wall-pathway.jpg", width: 720, height: 518, alt: "Grey precast wall beside a paved walkway" },
  { title: "Wall Going Up", image: "/images/work/wall-crew.jpg", width: 618, height: 381, alt: "Crew fitting precast wall panels" },
  { title: "Poles and Slabs, Stacked", image: "/images/work/yard-slabs.jpg", width: 1040, height: 780, alt: "Stacked fencing poles and slabs" },
  { title: "Jali Panels & Balusters", image: "/images/work/yard-jali.jpg", width: 1040, height: 780, alt: "Jali panels and balusters" },
];

export const aboutPoints = [
  "Wide Range of Precast Products",
  "Consistent Quality & Strength",
  "Bulk Supply & Project Support",
  "On-Time Delivery",
];
