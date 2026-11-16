"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/utils";

/** Variantes compartilhadas: fade + translateY 24px + blur leve. */
export function revealVariants(reduced: boolean): Variants {
  return reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: EASE_OUT },
        },
      };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "header" | "p" | "span";
}

/** Revela o conteúdo uma única vez quando entra na viewport. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];
  return (
    <Component
      className={className}
      variants={revealVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
