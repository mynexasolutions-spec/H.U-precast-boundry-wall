import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.mapQuery)}`;

const items = [
  {
    icon: Phone,
    label: "Call Us",
    value: siteConfig.phoneDisplay,
    sub: "Tap to call us now",
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with us",
    sub: "Message us any time",
    href: whatsappLink("Hi, I need some information."),
    external: true,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: siteConfig.email,
    sub: "Send us your requirement",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: siteConfig.address,
    sub: "Tap for directions",
    href: mapsUrl,
    external: true,
  },
];

/** Product photos peeking out below the cards (real photos of our stock). */
const photos = [
  { src: "/images/products/kerb-stones.jpg", alt: "Kerb stones" },
  { src: "/images/products/rcc-rings.jpg", alt: "RCC rings" },
  { src: "/images/products/jali-blocks.jpg", alt: "Jali blocks" },
];

export default function ContactInfo() {
  return (
    <div>
      <ul className="grid gap-3">
        {items.map(({ icon: Icon, label, value, sub, href, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_6px_24px_rgba(20,24,35,0.09)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(20,24,35,0.16)] hover:ring-brand/40"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-[0_10px_22px_-8px_rgba(217,40,31,0.8)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                <Icon className="size-6" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink/60">{label}</span>
                <span className="block break-words text-base font-bold leading-snug text-ink sm:text-lg">{value}</span>
                <span className="block text-[13px] text-ink/55">{sub}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end pr-2" aria-hidden>
        {photos.map((p, i) => (
          <div
            key={p.src}
            className="relative -ml-8 aspect-square w-28 overflow-hidden rounded-2xl shadow-[0_14px_30px_-8px_rgba(17,24,39,0.45)] ring-4 ring-white first:ml-0 sm:w-32"
            style={{ transform: `rotate(${[-6, 2, 7][i]}deg) translateY(${[0, -8, 4][i]}px)`, zIndex: i }}
          >
            <Image src={p.src} alt="" fill sizes="130px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
