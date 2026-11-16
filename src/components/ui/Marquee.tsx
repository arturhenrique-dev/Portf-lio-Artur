import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string;
  /** Duração de uma volta completa (s). */
  duration?: number;
  label: string;
  className?: string;
}

/**
 * Marquee infinito em CSS (só transform). Pausa no hover/foco.
 * Com prefers-reduced-motion vira uma lista estática centralizada.
 */
export function Marquee<T>({ items, renderItem, getKey, duration = 30, label, className }: MarqueeProps<T>) {
  // Repete a lista para preencher telas largas mesmo com poucos itens.
  const repeat = Math.max(1, Math.ceil(10 / Math.max(items.length, 1)));
  const base = Array.from({ length: repeat }, () => items).flat();

  return (
    <div
      className={cn(
        "marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]",
        className,
      )}
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
    >
      <div className="marquee-track flex w-max gap-3">
        <ul aria-label={label} className="flex shrink-0 gap-3">
          {base.map((item, index) => (
            <li key={`${getKey(item)}-${index}`} aria-hidden={index >= items.length ? true : undefined}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="marquee-duplicate flex shrink-0 gap-3">
          {base.map((item, index) => (
            <li key={`dup-${getKey(item)}-${index}`}>{renderItem(item)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
