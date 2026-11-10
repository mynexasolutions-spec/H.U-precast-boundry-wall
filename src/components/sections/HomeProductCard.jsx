import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  Box,
  BrickWall,
  Building2,
  Cylinder,
  Fence,
  Flower2,
  Grid3x3,
  ImageIcon,
  Layers,
  Puzzle,
  RectangleHorizontal,
  Ruler,
} from "lucide-react";

/** One simple icon per product (falls back to a box). */
const iconBySlug = {
  "precast-boundary-wall-panels": Fence,
  "designer-compound-walls": BrickWall,
  "rcc-compound-wall-panels": Layers,
  "interlocking-paver-blocks": Puzzle,
  "kerb-stones": Ruler,
  "drain-covers-gratings": Grid3x3,
  "rcc-precast-beams-poles": RectangleHorizontal,
  "precast-slabs-blocks": Box,
  "ventilation-blocks": Grid3x3,
  "railing-balusters-panels": Fence,
  "cement-benches": Armchair,
  "utility-cabinets-enclosures": Building2,
  "rcc-well-manhole-rings": Cylinder,
  "fencing-poles-slabs": Fence,
  "rcc-paver-slabs": Puzzle,
  "decorative-jali-panels": Flower2,
};

/** Card for the home page product grid: square photo (photos are 1:1, never cropped) on top, icon + name + "View Details" below. */
export default function HomeProductCard({ product }) {
  const Icon = iconBySlug[product.slug] ?? Box;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_28px_-10px_rgba(20,24,35,0.2)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-14px_rgba(20,24,35,0.35)] hover:ring-brand/30"
    >
      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-neutral-200 to-neutral-300">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 48vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            style={product.objectPosition ? { objectPosition: product.objectPosition } : undefined}
          />
        ) : (
          <div className="grid h-full place-items-center text-neutral-400" role="img" aria-label={`${product.name} – photo coming soon`}>
            <ImageIcon className="size-8" aria-hidden />
          </div>
        )}
      </div>

      <div className="flex flex-1 items-start gap-3 p-3 sm:p-4">
        <span className="hidden size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/10 transition-all duration-300 group-hover:from-brand group-hover:to-brand-dark group-hover:text-white sm:grid">
          <Icon className="size-6" strokeWidth={1.7} aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-[15px] font-bold leading-snug text-ink sm:text-base">
            {product.name}
            {product.subtitle && (
              <span className="mt-0.5 block text-[13px] font-normal text-ink/65">({product.subtitle})</span>
            )}
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-brand px-3.5 py-1.5 text-[13px] font-bold text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
            View Details <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
