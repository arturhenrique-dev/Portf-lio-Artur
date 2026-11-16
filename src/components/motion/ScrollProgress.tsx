"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra fina de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 shadow-[0_0_12px_var(--blue-glow)]"
      style={{ scaleX }}
    />
  );
}
