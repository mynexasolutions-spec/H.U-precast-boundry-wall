import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Product card for the catalog page. Photos are 1:1, so the frame is square and nothing is cropped.
 * grid: photo on top, name + red arrow below. list: photo on the left, details on the right.
 */
export default function CatalogProductCard({ product, badge, BadgeIcon, view = "grid" }) {
  const list = view === "list";

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group h-full overflow-hidden rounded-2xl bg-white shadow-[0_8px_26px_-10px_rgba(20,24,35,0.22)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(20,24,35,0.35)] hover:ring-brand/30",
        list ? "flex" : "block",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-linear-to-br from-neutral-200 to-neutral-300",
          list ? "aspect-square w-36 sm:w-52" : "aspect-square",
        )}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes={list ? "(min-width: 640px) 208px, 144px" : "(min-width: 1280px) 330px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 48vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={product.objectPosition ? { objectPosition: product.objectPosition } : undefined}
          />
        ) : (
          <div className="grid h-full min-h-28 place-items-center text-neutral-400" role="img" aria-label={`${product.name} – photo coming soon`}>
            <ImageIcon className="size-8" aria-hidden />
          </div>
        )}

        {badge && !list && (
          <span className="absolute left-2.5 top-2.5 inline-flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
            {BadgeIcon && <BadgeIcon className="size-3.5 shrink-0 text-brand" strokeWidth={2} aria-hidden />}
            <span className="truncate">{badge}</span>
          </span>
        )}
      </div>

      {list ? (
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-4 sm:p-5">
          {badge && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-brand">
              {BadgeIcon && <BadgeIcon className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />}
              {badge}
            </span>
          )}
          <p className="text-base font-bold leading-snug text-ink sm:text-lg">
            {product.name}
            {product.subtitle && <span className="font-normal text-ink/65"> ({product.subtitle})</span>}
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand px-3.5 py-1.5 text-[13px] font-bold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            View Details <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 px-3.5 py-3 sm:gap-3 sm:px-4 sm:py-3.5">
          <p className="min-w-0 text-[14px] font-bold leading-snug text-ink sm:text-base">
            {product.name}
            {product.subtitle && <span className="font-normal text-ink/65"> ({product.subtitle})</span>}
          </p>
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand text-white shadow-[0_6px_14px_-4px_rgba(217,40,31,0.7)] transition-transform duration-300 group-hover:translate-x-0.5 sm:size-9">
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      )}
    </Link>
  );
}
