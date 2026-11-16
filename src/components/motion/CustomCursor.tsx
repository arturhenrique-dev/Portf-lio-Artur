"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { hasFinePointer } from "@/lib/utils";

/**
 * Cursor customizado opcional: círculo azul com mix-blend.
 * Só ativa com mouse de precisão e sem prefers-reduced-motion. O cursor nativo continua visível.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setEnabled(!reduced && hasFinePointer());
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest("a, button, [role='button'], input, textarea")));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full bg-blue-500 mix-blend-screen"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", width: 28, height: 28 }}
      animate={{ scale: hovering ? 1.8 : 1, opacity: visible ? (hovering ? 0.35 : 0.55) : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
