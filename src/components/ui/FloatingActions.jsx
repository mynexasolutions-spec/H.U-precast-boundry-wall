import { Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

const tip =
  "pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-white opacity-0 shadow-[0_12px_30px_-8px_rgba(17,24,39,0.6)] transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 " +
  // little arrow pointing at the button
  "after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-[6px] after:border-transparent after:border-l-ink";

const btn =
  "group relative grid size-12 place-items-center sm:size-14 rounded-full text-white shadow-[0_14px_30px_-8px_rgba(17,24,39,0.55)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-3 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-6">
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label={`Call us at ${siteConfig.phoneDisplay}`}
        className={`${btn} bg-linear-to-br from-[#1e293b] to-[#0f172a] focus-visible:outline-ink`}
      >
        <Phone className="size-5 sm:size-6" strokeWidth={2} aria-hidden />
        <span className={tip} role="tooltip">
          Call us<span className="ml-2 font-normal text-white/70">{siteConfig.phoneDisplay}</span>
        </span>
      </a>

      <a
        href={whatsappLink("Hi, I need some information.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`${btn} bg-[#25D366] shadow-[0_14px_30px_-8px_rgba(37,211,102,0.8)] focus-visible:outline-[#25D366]`}
      >
        <span aria-hidden className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 motion-reduce:hidden" />
        <WhatsAppIcon className="size-6 sm:size-7" />
        <span className={tip} role="tooltip">
          Chat on WhatsApp<span className="ml-2 font-normal text-white/70">Replies fast</span>
        </span>
      </a>
    </div>
  );
}
