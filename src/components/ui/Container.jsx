import { cn } from "@/lib/cn";

export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1400px] px-4 sm:px-6", className)} {...props}>
      {children}
    </Tag>
  );
}
