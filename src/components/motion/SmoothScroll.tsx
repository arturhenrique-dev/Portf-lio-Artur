"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollApi {
  /** Rola suavemente até um seletor (ex.: "#projetos") ou posição. */
  scrollTo: (target: string | number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => undefined,
});

export function useSmoothScroll(): SmoothScrollApi {
  return useContext(SmoothScrollContext);
}

/**
 * Smooth scroll com Lenis, dirigido pelo ticker do GSAP (um único requestAnimationFrame)
 * e sincronizado com o ScrollTrigger. Desligado com prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    if (!media.matches) start();

    const onChange = () => {
      stop();
      if (!media.matches) start();
      ScrollTrigger.refresh();
    };
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  const scrollTo = useCallback((target: string | number) => {
    const offset = -((typeof window !== "undefined" && window.innerWidth < 768) ? 72 : 88);
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === "string" ? offset : 0, duration: 1.2 });
      return;
    }
    // Fallback nativo (reduced motion): sem animação
    if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      document.querySelector(target)?.scrollIntoView();
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>{children}</SmoothScrollContext.Provider>
  );
}
