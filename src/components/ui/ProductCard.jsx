import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";

export default function ProductCard({ product, badge }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block overflow-hidden rounded-xl bg-white sm:rounded-2xl shadow-[0_4px_20px_rgba(20,24,35,0.08)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(20,24,35,0.16)] hover:ring-brand/40"
    >
      {/* Photos are 1:1, so the frame is square – nothing gets cropped. */}
      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-neutral-200 to-neutral-300">
        {badge && (
          <span className="absolute left-2 top-2 z-10 max-w-[calc(100%-1rem)] truncate rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs text-ink shadow-sm backdrop-blur-sm">
            {badge}
          </span>
        )}
        {/* hover: darken + "View Details" pill slides up */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          View Details <ArrowRight className="size-4" />
        </span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 285px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={product.objectPosition ? { objectPosition: product.objectPosition } : undefined}
          />
        ) : (
          <div className="grid h-full place-items-center text-neutral-400" role="img" aria-label={`${product.name} – photo coming soon`}>
            <ImageIcon className="size-8" aria-hidden />
          </div>
        )}
      </div>
      <div className="flex min-h-[4.25rem] items-center justify-between gap-2 px-3 py-2.5 sm:min-h-[4.75rem] sm:gap-3 sm:px-4 sm:py-3">
        <div className="min-w-0">
          <p className="text-sm font-bold leading-snug text-ink sm:text-base">{product.name}</p>
          {product.subtitle && <p className="text-xs text-ink/70 sm:text-sm">({product.subtitle})</p>}
        </div>
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand text-white sm:size-7">
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
