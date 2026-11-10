"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, Fence, Flower2, Home, Images, Info, LayoutGrid, Mail, MapPin, Menu, Package, Phone, Route, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { categories } from "@/data/about";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const catIcons = {
  "Walls & Fencing": Fence,
  "Roads & Paving": Route,
  "Home & Garden": Flower2,
  Infrastructure: Building2,
};

const icons = {
  Home,
  Products: Package,
  Applications: LayoutGrid,
  Projects: Images,
  About: Info,
  Contact: Mail,
};

export default function MobileMenu({ active }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(active === "/products");
  const closeRef = useRef(null);

  // While the sidebar is open: lock page scroll, focus the close button, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-neutral-100 hover:text-brand"
      >
        <Menu className="size-5" aria-hidden />
      </button>

      {/* Portal: the header has a backdrop blur, which would trap a fixed sidebar inside it. */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[90]">
            <div
              aria-hidden
              className="fade-in absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <aside
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="slide-in-right absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-white shadow-[-24px_0_60px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* Top: logo + close */}
              <div className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-100 px-5">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full bg-neutral-100 text-ink transition-colors hover:bg-brand hover:text-white"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              {/* Links */}
              <nav aria-label="Mobile" className="flex-1 px-3 py-4">
                <ul className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = icons[link.label];
                    const isActive = link.href === active;
                    const rowCls = cn(
                      "flex w-full items-center gap-3.5 rounded-2xl px-3 py-3 text-left text-base font-semibold transition-colors",
                      isActive ? "bg-surface text-brand" : "text-ink hover:bg-surface hover:text-brand",
                    );
                    const iconBox = (
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-xl ring-1 ring-black/5",
                          isActive ? "bg-brand text-white" : "bg-neutral-100 text-brand",
                        )}
                      >
                        {Icon && <Icon className="size-5" strokeWidth={1.8} aria-hidden />}
                      </span>
                    );

                    // Products: the name opens the Products page, the arrow opens the category dropdown
                    if (link.hasMenu) {
                      return (
                        <li key={link.label}>
                          <div
                            className={cn(
                              "flex items-center rounded-2xl transition-colors",
                              isActive || productsOpen ? "bg-surface" : "hover:bg-surface",
                            )}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setOpen(false)}
                              aria-current={isActive ? "page" : undefined}
                              className={cn(
                                "flex flex-1 items-center gap-3.5 rounded-2xl px-3 py-3 text-base font-semibold transition-colors hover:text-brand",
                                isActive ? "text-brand" : "text-ink",
                              )}
                            >
                              {iconBox}
                              {link.label}
                            </Link>
                            <button
                              type="button"
                              aria-label={productsOpen ? "Hide product categories" : "Show product categories"}
                              aria-expanded={productsOpen}
                              aria-controls="mobile-products"
                              onClick={() => setProductsOpen((v) => !v)}
                              className="mr-2 grid size-10 shrink-0 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-white hover:text-brand"
                            >
                              <ChevronDown
                                className={cn("size-5 transition-transform duration-300", productsOpen && "rotate-180 text-brand")}
                                aria-hidden
                              />
                            </button>
                          </div>

                          <div
                            id="mobile-products"
                            className={cn(
                              "grid transition-[grid-template-rows] duration-300 ease-out",
                              productsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                            )}
                          >
                            <div className="overflow-hidden" aria-hidden={!productsOpen}>
                              <ul className="ml-[1.4rem] mt-1 space-y-0.5 border-l-2 border-red-100 pb-2 pl-3">
                                {categories.map((c) => {
                                  const CatIcon = catIcons[c.title] ?? Package;
                                  return (
                                    <li key={c.title}>
                                      <Link
                                        href={`/products?category=${encodeURIComponent(c.title)}#catalog`}
                                        tabIndex={productsOpen ? undefined : -1}
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] font-semibold text-ink transition-colors hover:bg-surface hover:text-brand"
                                      >
                                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-red-50 text-brand ring-1 ring-brand/10">
                                          <CatIcon className="size-[18px]" strokeWidth={1.8} aria-hidden />
                                        </span>
                                        {c.title}
                                        <span className="ml-auto grid min-w-6 place-items-center rounded-full bg-neutral-100 px-1.5 py-0.5 text-xs font-bold text-ink/70">
                                          {c.slugs.length}
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </li>
                      );
                    }

                    return (
                      <li key={link.label}>
                        <Link href={link.href} onClick={() => setOpen(false)} aria-current={isActive ? "page" : undefined} className={rowCls}>
                          {iconBox}
                          {link.label}
                          <ArrowRight className="ml-auto size-4 text-neutral-300" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom: actions + address */}
              <div className="shrink-0 border-t border-neutral-100 bg-neutral-50 px-5 pb-6 pt-5">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(217,40,31,0.65)]"
                >
                  Get a Free Quote <ArrowRight className="size-4" aria-hidden />
                </Link>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-[15px] font-bold text-white"
                  >
                    <Phone className="size-[18px]" aria-hidden /> Call
                  </a>
                  <a
                    href={whatsappLink("Hi, I need a quote.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-[15px] font-bold text-white"
                  >
                    <WhatsAppIcon className="size-[18px]" /> WhatsApp
                  </a>
                </div>
                <p className="mt-4 flex items-start gap-2 text-sm text-ink/65">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                  {siteConfig.address}
                </p>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </div>
  );
}
