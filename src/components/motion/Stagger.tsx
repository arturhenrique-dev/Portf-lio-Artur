"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { revealVariants } from "./Reveal";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Intervalo entre filhos (s). */
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}

/** Container que revela os filhos (<StaggerItem>) em sequência ao entrar na viewport. */
export function Stagger({ children, className, stagger = 0.08, delay = 0, as = "div" }: StaggerProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false;
  const Component = motion[as];
  return (
    <Component className={className} variants={revealVariants(reduced)}>
      {children}
    </Component>
  );
}
