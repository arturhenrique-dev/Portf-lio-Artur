"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/utils";

/** Barra de nível (1 a 5) animada com scaleX. Só aparece se o nível for informado. */
export function LevelBar({ level, label }: { level: number; label: string }) {
  const reduced = useReducedMotion();
  const value = level / 5;
  return (
    <div
      role="meter"
      aria-label={`Nível em ${label}`}
      aria-valuemin={1}
      aria-valuemax={5}
      aria-valuenow={level}
      className="h-1 w-full overflow-hidden rounded-full bg-surface-2"
    >
      <motion.div
        className="h-full origin-left rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
        initial={{ scaleX: reduced ? value : 0 }}
        whileInView={{ scaleX: value }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE_OUT }}
      />
    </div>
  );
}
