import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, ChevronDown, Fence, Flower2, Phone, Route } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderBar from "@/components/layout/HeaderBar";
import MobileMenu from "@/components/layout/MobileMenu";
import SearchDialog from "@/components/layout/SearchDialog";
import { categories } from "@/data/about";
import { navLinks } from "@/data/navigation";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));

const catIcon = {
  "Walls & Fencing": Fence,
  "Roads & Paving": Route,
  "Home & Garden": Flower2,
  Infrastructure: Building2,
};

export default function Header({ active = "/#home" }) {
  return (
    <HeaderBar>
      <Container className="flex h-16 items-center justify-between gap-3">
        <Logo />

        <nav aria-label="Main" className="hidden items-stretch gap-1 self-stretch lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === active;
            return (
              <div key={link.label} className="group relative flex items-stretch">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex items-center gap-1 px-4 text-[15px] font-semibold text-ink transition-colors hover:text-brand",
                    "after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:rounded-t-full after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 group-focus-within:after:scale-x-100",
                    isActive && "text-brand after:scale-x-100",
                  )}
                >
                  {link.label}
                  {link.hasMenu && (
                    <ChevronDown
                      className="size-4 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      aria-hidden
                    />
                  )}
                </Link>

                {/* Dropdown: product categories only (each opens the Products page with that filter) */}
                {link.hasMenu && (
                  <div className="invisible absolute left-1/2 top-full w-[min(44rem,92vw)] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(17,24,39,0.5)] ring-1 ring-black/5">
                      <ul className="grid grid-cols-2 gap-2 p-3">
                        {categories.map((c) => {
                          const CatIcon = catIcon[c.title] ?? Building2;
                          return (
                            <li key={c.title}>
                              <Link
                                href={`/products?category=${encodeURIComponent(c.title)}#catalog`}
                                className="group/item flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-surface"
                              >
                                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-red-50 to-red-100 text-brand ring-1 ring-brand/15 transition-all duration-300 group-hover/item:from-brand group-hover/item:to-brand-dark group-hover/item:text-white">
                                  <CatIcon className="size-7" strokeWidth={1.7} aria-hidden />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block font-display text-base font-bold text-ink transition-colors group-hover/item:text-brand">
                                    {c.title}
                                  </span>
                                  <span className="mt-1.5 flex items-center gap-2">
                                    <span className="flex -space-x-2">
                                      {c.slugs.slice(0, 3).map((slug) => (
                                        <span key={slug} className="relative size-6 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white">
                                          {bySlug[slug]?.image && (
                                            <Image src={bySlug[slug].image} alt="" fill sizes="24px" className="object-cover" />
                                          )}
                                        </span>
                                      ))}
                                    </span>
                                    <span className="text-sm text-ink/60">{c.slugs.length} products</span>
                                  </span>
                                </span>
                                <ArrowRight className="size-4 shrink-0 text-neutral-300 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:text-brand" aria-hidden />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="flex items-center justify-between gap-4 bg-linear-to-r from-[#111827] to-[#2a3550] px-6 py-4 text-white">
                        <p className="text-sm font-medium text-white/85">
                          Need something else? <span className="font-bold text-white">We make custom sizes too.</span>
                        </p>
                        <Link
                          href="/products"
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(217,40,31,0.8)] transition-all hover:-translate-y-0.5 hover:bg-brand-dark"
                        >
                          View all {products.length} products <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">
            <SearchDialog />
          </div>

          <a
            href={`tel:${siteConfig.phone}`}
            aria-label={`Call us at ${siteConfig.phoneDisplay}`}
            className="grid size-10 place-items-center rounded-full bg-red-50 text-brand ring-1 ring-brand/15 transition-colors hover:bg-brand hover:text-white sm:hidden"
          >
            <Phone className="size-5" aria-hidden />
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="hidden items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[15px] font-bold text-ink transition-colors hover:bg-neutral-100 xl:inline-flex"
          >
            <span className="grid size-9 place-items-center rounded-full bg-neutral-100 text-brand">
              <Phone className="size-[18px]" aria-hidden />
            </span>
            {siteConfig.phoneDisplay}
          </a>

          <div className="ml-1 hidden sm:block">
            <Button href="/contact" className="whitespace-nowrap px-5 py-2.5 text-[15px]">
              Get a Quote <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
          <MobileMenu active={active} />
        </div>
      </Container>
    </HeaderBar>
  );
}
