"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Contador animado: anima o número inicial do texto (ex.: "3", "2º") quando entra na tela.
 * Textos sem número (ex.: "PB") são exibidos como estão.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  useEffect(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    if (!match || !inView || reduced || !ref.current) return;
    const target = Number(match[1]);
    const suffix = match[2] ?? "";
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
