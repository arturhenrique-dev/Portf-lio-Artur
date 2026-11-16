import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost";

/** Classes de botão reaproveitáveis em <a>, <button> e <AnchorLink>. */
export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(
    "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-medium",
    "transition-[background-color,border-color,box-shadow,color] duration-300 ease-[var(--ease-out)]",
    variant === "primary" &&
      "bg-blue-600 text-text shadow-[0_8px_30px_-8px_var(--blue-glow)] hover:bg-blue-500 hover:shadow-[0_10px_40px_-6px_var(--blue-glow)]",
    variant === "ghost" &&
      "border border-border-strong bg-surface/60 text-text backdrop-blur-md hover:border-blue-500/50 hover:bg-surface-2",
    className,
  );
}

/** Conteúdo padrão do botão: texto + ícone com leve deslocamento no hover. */
export function ButtonContent({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      ) : null}
    </>
  );
}
