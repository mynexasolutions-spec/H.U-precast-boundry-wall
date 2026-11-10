"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PackageSearch, Search, X } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { products } from "@/data/products";
import { productDetails } from "@/data/productDetails";
import { getCategory } from "@/lib/catalog";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

/** Built once: each product with its category and a lowercase text blob to search in. */
const index = products.map((p) => {
  const category = getCategory(p.slug);
  return {
    ...p,
    category,
    hay: `${p.name} ${p.subtitle ?? ""} ${category} ${productDetails[p.slug]?.summary ?? ""}`.toLowerCase(),
  };
});

function search(query) {
  const q = query.trim().toLowerCase();
  if (!q) return index.slice(0, 6);
  const tokens = q.split(/\s+/);
  return index
    .filter((p) => tokens.every((t) => p.hay.includes(t)))
    .sort((a, b) => Number(b.name.toLowerCase().includes(q)) - Number(a.name.toLowerCase().includes(q)))
    .slice(0, 8);
}

export default function SearchDialog() {
  const router = useRouter();
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(query), [query]);
  const hasQuery = query.trim().length > 0;

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  // Shortcuts: "/" or Ctrl/Cmd+K opens the search from anywhere.
  useEffect(() => {
    const onKey = (e) => {
      const el = e.target;
      const typing =
        el instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName) || el.isContentEditable);
      if ((e.key === "k" && (e.ctrlKey || e.metaKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // While open: focus the box, lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActive(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the highlighted row visible while using the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onInputKey = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[active];
      if (target) {
        router.push(`/products/${target.slug}`);
        close();
      }
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Search products"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-neutral-100 hover:text-brand"
      >
        <Search className="size-5" aria-hidden />
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[10vh] backdrop-blur-sm"
            onClick={close}
          >
            <div
              className="fade-up w-full max-w-xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] ring-1 ring-black/10"
              style={{ "--d": "0ms" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input */}
              <div className="flex items-center gap-3 p-4 pb-3">
                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-neutral-100 px-4 py-3 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-brand/50 focus-within:shadow-[0_0_0_4px_rgba(217,40,31,0.12)]">
                <Search className="size-5 shrink-0 text-brand" aria-hidden />
                <input
                  ref={inputRef}
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="search-results"
                  aria-activedescendant={results[active] ? `search-opt-${results[active].slug}` : undefined}
                  aria-label="Search products"
                  autoComplete="off"
                  maxLength={40}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActive(0);
                  }}
                  onKeyDown={onInputKey}
                  placeholder="Search walls, poles, jali, kerb stones…"
                  className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-neutral-400 focus:outline-none sm:text-lg"
                />
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-neutral-100 text-ink/70 transition hover:bg-brand hover:text-white"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[55vh] overflow-y-auto px-3 pb-3 [scrollbar-color:#d1d5db_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-0 [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-track]:bg-transparent">
                {results.length > 0 ? (
                  <>
                    <p className="px-3 pb-2 pt-2 text-xs font-bold uppercase tracking-wider text-ink/45">
                      {hasQuery ? `${results.length} result${results.length > 1 ? "s" : ""}` : "Popular products"}
                    </p>
                    <ul id="search-results" role="listbox" aria-label="Search results">
                      {results.map((p, i) => (
                        <li
                          key={p.slug}
                          id={`search-opt-${p.slug}`}
                          role="option"
                          aria-selected={i === active}
                          data-idx={i}
                        >
                          <Link
                            href={`/products/${p.slug}`}
                            onClick={close}
                            onMouseEnter={() => setActive(i)}
                            className={cn(
                              "group flex items-center gap-4 rounded-2xl p-2.5 transition-colors",
                              i === active ? "bg-red-50/60 ring-1 ring-brand/15" : "hover:bg-surface",
                            )}
                          >
                            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-neutral-200 ring-1 ring-black/5">
                              <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-base font-bold leading-snug text-ink">{p.name}</span>
                              <span className="mt-0.5 block text-sm text-ink/60">{p.category}</span>
                            </span>
                            <ArrowRight
                              className="size-5 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="px-4 py-10 text-center">
                    <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-neutral-100 text-brand">
                      <PackageSearch className="size-7" aria-hidden />
                    </span>
                    <p className="mt-4 text-lg font-bold text-ink">No product found</p>
                    <p className="mt-1 text-base text-ink/65">
                      We could not find “{query.trim()}”. Ask us – we may be able to make it.
                    </p>
                    <a
                      href={whatsappLink(`Hi, do you make "${query.trim()}"?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-bold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.9)] transition hover:-translate-y-0.5 hover:bg-[#1fb957]"
                    >
                      <WhatsAppIcon className="size-5" /> Ask on WhatsApp
                    </a>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-3.5">
                <Link
                  href="/products"
                  onClick={close}
                  className="flex items-center justify-center gap-1.5 text-[15px] font-bold text-brand hover:underline"
                >
                  Browse all products <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
