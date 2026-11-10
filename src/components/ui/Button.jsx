import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const variants = {
  red: "bg-brand text-white shadow-[0_8px_20px_-6px_rgba(217,40,31,0.65)] hover:bg-brand-dark",
  ghost: "border border-white/50 bg-white/5 text-white hover:bg-white/15",
  white: "bg-white text-ink hover:bg-white/90",
};

/** Renders <a> for external links, next/link for in-app / hash links. */
export default function Button({ href, variant = "red", className, children, ...props }) {
  const classes = cn(base, variants[variant], className);
  const isExternal = /^(https?:|tel:|mailto:)/.test(href);

  if (isExternal) {
    const opensTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(opensTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
