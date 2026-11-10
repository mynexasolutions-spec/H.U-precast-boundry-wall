import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

/**
 * Brand logo (public/images/logo.png, transparent, ~4.4:1).
 * `light` puts it on a white rounded plate so the dark "Precast" text stays readable on dark backgrounds.
 */
export default function Logo({ light = false, className }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} – home`}
      className={cn(
        "inline-flex shrink-0 items-center",
        light && "rounded-2xl bg-white px-4 py-2.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt={`${siteConfig.legalName} logo`}
        width={1882}
        height={430}
        priority
        sizes="200px"
        className={cn("w-auto", light ? "h-11 sm:h-12" : "h-9 sm:h-10 lg:h-11")}
      />
    </Link>
  );
}
