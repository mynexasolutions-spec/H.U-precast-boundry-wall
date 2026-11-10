import { ExternalLink, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";

const query = encodeURIComponent(siteConfig.mapQuery);
const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

export default function MapEmbed() {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-[0_24px_60px_-20px_rgba(17,24,39,0.3)] ring-1 ring-black/5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Our Location
          </h2>
          <p className="mt-1.5 flex items-center gap-2 text-[15px] text-ink/65 sm:text-base">
            <MapPin className="size-4 shrink-0 text-brand" aria-hidden />
            Find us on the map – {siteConfig.address}
          </p>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-[0_6px_18px_rgba(20,24,35,0.12)] ring-1 ring-black/10 transition-all hover:-translate-y-0.5 hover:text-brand hover:ring-brand/40"
        >
          <MapPin className="size-4 text-brand" aria-hidden /> Open in Google Maps
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>

      <iframe
        title={`Map – ${siteConfig.address}`}
        src={embedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-5 block h-[300px] w-full rounded-2xl border-0 bg-neutral-200 sm:h-[380px]"
        allowFullScreen
      />
    </div>
  );
}
