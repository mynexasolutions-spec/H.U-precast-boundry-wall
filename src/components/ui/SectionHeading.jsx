import { cn } from "@/lib/cn";
import Reveal from "@/components/ui/Reveal";

export default function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  const centered = align === "center";
  return (
    <Reveal className={cn(centered && "text-center", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm font-bold text-brand",
          centered && "justify-center",
        )}
      >
        <span aria-hidden className="h-0.5 w-4 bg-brand" />
        {eyebrow}
      </span>
      <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-2 text-base text-ink/80", centered && "mx-auto max-w-2xl")}>{description}</p>
      )}
    </Reveal>
  );
}
