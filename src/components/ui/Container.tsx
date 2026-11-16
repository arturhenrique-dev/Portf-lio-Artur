import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Largura máxima de 1200px com respiro lateral responsivo. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}
