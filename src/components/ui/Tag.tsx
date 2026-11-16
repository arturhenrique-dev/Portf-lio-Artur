import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
