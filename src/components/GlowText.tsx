import { cn } from "../lib/utils";

export default function GlowText(
  { children, className }: { children: React.ReactNode; className?: string },
) {
  const text = typeof children === "string" ? children : "";

  return (
    <span
      className={cn(
        "relative bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-900 bg-clip-text text-transparent pb-2 px-4",
        "before:absolute before:inset-0 before:translate-x-1 before:translate-y-1 before:z-[-1] before:blur-sm",
        "before:bg-gradient-to-r before:from-cyan-700 before:via-blue-700 before:to-purple-900 before:bg-clip-text before:text-transparent",
        "before:content-[attr(data-text)]",
        className,
      )}
      data-text={text}
    >
      {children}
    </span>
  );
}
