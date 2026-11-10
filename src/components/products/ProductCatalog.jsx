"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Building2, ChevronDown, Fence, Flower2, LayoutGrid, List, PackageSearch, PencilRuler, Route, Search, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CatalogProductCard from "@/components/products/CatalogProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { categories } from "@/data/about";
import { products } from "@/data/products";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const categoryBySlug = Object.fromEntries(categories.flatMap((c) => c.slugs.map((s) => [s, c.title])));

const tabIcon = {
  All: LayoutGrid,
  "Walls & Fencing": Fence,
  "Roads & Paving": Route,
  "Home & Garden": Flower2,
  Infrastructure: Building2,
};

const tabs = [
  { title: "All", count: products.length },
  ...categories.map((c) => ({ title: c.title, count: c.slugs.length })),
];

export default function ProductCatalog() {
  const [active, setActive] = useState("All");
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");

  // Links like /products?category=Roads%20%26%20Paving (from the mobile menu) open with that filter on
  const wanted = params.get("category");
  useEffect(() => {
    if (wanted && tabs.some((t) => t.title === wanted)) setActive(wanted);
  }, [wanted]);

  const q = query.trim().toLowerCase();
  const shown = useMemo(() => {
    const list = products.filter(
      (p) =>
        (active === "All" || categoryBySlug[p.slug] === active) &&
        (!q || p.name.toLowerCase().includes(q) || (p.subtitle ?? "").toLowerCase().includes(q)),
    );
    // "popular" keeps the order we set in the product list
    if (sort === "az") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") return [...list].sort((a, b) => b.name.localeCompare(a.name));
    return list;
  }, [active, q, sort]);

  const reset = () => {
    setActive("All");
    setQuery("");
  };

  return (
    <div className="bg-linear-to-b from-surface to-white">
      {/* Floating filter card right under the hero; on laptops it stays under the header while scrolling (not on phones, where it would cover too much) */}
      <div className="relative z-30 lg:sticky lg:top-[4.5rem]">
        <Container>
          <div className="flex flex-col gap-3 rounded-2xl bg-white/95 p-2.5 shadow-[0_18px_44px_-14px_rgba(17,24,39,0.3)] ring-1 ring-black/5 backdrop-blur-md lg:p-3 xl:flex-row xl:items-center xl:justify-between xl:gap-4">
            <div
              role="group"
              aria-label="Filter by category"
              className="-mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 py-1 pr-8 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none] lg:mx-0 lg:px-0 lg:pr-0 lg:[mask-image:none] [&::-webkit-scrollbar]:hidden"
            >
              {tabs.map((t) => {
                const on = active === t.title;
                const Icon = tabIcon[t.title];
                return (
                  <button
                    key={t.title}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(t.title)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-bold transition-all duration-200 sm:gap-2.5 sm:rounded-2xl sm:px-3.5 sm:py-2.5 sm:text-[14px] xl:py-3",
                      on
                        ? "bg-brand text-white shadow-[0_10px_24px_-8px_rgba(217,40,31,0.8)]"
                        : "bg-neutral-50 text-ink ring-1 ring-black/5 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-brand/30",
                    )}
                  >
                    {Icon && <Icon className="size-4 shrink-0 sm:size-5 lg:size-6" strokeWidth={1.7} aria-hidden />}
                    <span className="flex items-center gap-2 whitespace-nowrap text-left leading-tight">
                      {t.title}
                      <span
                        className={cn(
                          "grid min-w-6 place-items-center rounded-full px-1.5 py-0.5 text-xs font-bold",
                          on ? "bg-white/25 text-white" : "bg-neutral-200/80 text-ink/70",
                        )}
                      >
                        {t.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full xl:w-60 xl:shrink-0">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-neutral-400" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                maxLength={40}
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-12 pr-11 text-base sm:py-3 text-ink placeholder:text-neutral-400 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-ink"
                >
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      <Container id="catalog" className="scroll-mt-40 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="text-base font-semibold text-ink/70" aria-live="polite">
            Showing <span className="font-bold text-brand">{shown.length}</span> of {products.length} products
            {active !== "All" && (
              <>
                {" "}
                in <span className="text-brand">{active}</span>
              </>
            )}
          </p>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <label className="relative flex flex-1 items-center gap-2 rounded-xl bg-white sm:flex-none py-2 pl-4 pr-10 text-sm text-ink/70 shadow-[0_4px_14px_-6px_rgba(20,24,35,0.2)] ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-brand/40">
              <span className="font-medium">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="cursor-pointer appearance-none bg-transparent font-bold text-ink focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-brand" aria-hidden />
            </label>

            <div role="group" aria-label="Change layout" className="flex rounded-xl bg-white p-1 shadow-[0_4px_14px_-6px_rgba(20,24,35,0.2)] ring-1 ring-black/5">
              {[
                { id: "grid", label: "Grid view", icon: LayoutGrid },
                { id: "list", label: "List view", icon: List },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-label={label}
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg transition-colors duration-200",
                    view === id ? "bg-brand text-white shadow-sm" : "text-ink/60 hover:bg-neutral-100 hover:text-ink",
                  )}
                >
                  <Icon className="size-[18px]" aria-hidden />
                </button>
              ))}
            </div>
          </div>
        </div>

        {shown.length > 0 ? (
          // key = filter state, so cards replay their entrance animation when the filter changes
          <div
            key={`${active}|${q}|${sort}|${view}`}
            className={cn(
              "grid gap-3 sm:gap-5",
              view === "list" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {shown.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 4) * 80} className="h-full">
                <CatalogProductCard
                  product={product}
                  badge={categoryBySlug[product.slug]}
                  BadgeIcon={tabIcon[categoryBySlug[product.slug]]}
                  view={view}
                />
              </Reveal>
            ))}

            {/* Custom order tile */}
            <Reveal delay={(shown.length % 4) * 80} className={cn("h-full", view === "list" ? "col-span-full" : "max-sm:col-span-2")}>
              <a
                href={whatsappLink("Hi, I need a custom size/design. Can you help?")}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-[#111827] via-[#1a2338] to-[#2a3550] p-7 text-white shadow-[0_4px_20px_rgba(20,24,35,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(20,24,35,0.35)]",
                  view === "list" ? "min-h-[12rem]" : "min-h-[16rem] sm:min-h-[22rem]",
                )}
              >
                <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-white/5 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <span className="grid size-14 place-items-center rounded-2xl bg-brand text-white shadow-[0_10px_24px_-8px_rgba(217,40,31,0.8)]">
                  <PencilRuler className="size-7" strokeWidth={1.8} aria-hidden />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-bold leading-tight">Need a custom size or design?</h2>
                  <p className="mt-3 text-base leading-relaxed text-white/80">
                    Tell us what you need. We will let you know if we can make it and share the price.
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.9)] transition-transform duration-300 group-hover:scale-105">
                  <WhatsAppIcon className="size-5" /> Ask on WhatsApp
                </span>
              </a>
            </Reveal>
          </div>
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl bg-white px-6 py-14 text-center shadow-[0_4px_20px_rgba(20,24,35,0.08)] ring-1 ring-black/5">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-neutral-100 text-brand">
              <PackageSearch className="size-8" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-xl font-bold text-ink">No products found</h2>
            <p className="mt-2 text-base text-ink/70">
              We could not find a match. Try another word, or ask us directly – we may be able to make it.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-xl bg-neutral-100 px-5 py-3 text-base font-semibold text-ink transition hover:bg-neutral-200"
              >
                Clear filters
              </button>
              <a
                href={whatsappLink(query.trim() ? `Hi, do you make "${query.trim()}"?` : "Hi, I need a product that is not listed.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.9)] transition hover:-translate-y-0.5 hover:bg-[#1fb957]"
              >
                <WhatsAppIcon className="size-5" /> Ask on WhatsApp
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
