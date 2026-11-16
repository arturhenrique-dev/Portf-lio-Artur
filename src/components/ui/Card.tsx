import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Card estático (sem interação) com vidro fosco e borda fina. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-[var(--radius)]", className)} {...rest} />;
}
