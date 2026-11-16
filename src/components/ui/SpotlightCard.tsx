"use client";

import { forwardRef, type HTMLAttributes, type PointerEvent } from "react";
import { cn } from "@/lib/cn";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement>;

/**
 * Card de vidro fosco com spotlight que segue o cursor.
 * Atualiza apenas CSS variables (--mx/--my) direto no elemento, sem re-render do React.
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(function SpotlightCard(
  { className, onPointerMove, children, ...rest },
  ref,
) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event);
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={cn("glass spotlight rounded-[var(--radius)]", className)}
      {...rest}
    >
      {children}
    </div>
  );
});
