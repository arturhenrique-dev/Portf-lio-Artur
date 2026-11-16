"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { EASE_OUT, INTRO_DELAY } from "@/lib/utils";

/** Observa as seções e retorna o id da que está no centro da tela. */
function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = navItems.map((item) => item.id);

/** Navbar em pílula: esconde ao rolar para baixo, reaparece ao rolar para cima. */
export function Navbar() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const goingDown = latest > previous;
    if (Math.abs(latest - previous) < 4) return;
    setHidden(goingDown && latest > 160 && !open);
  });

  // Fecha o menu mobile com Esc e devolve o foco ao botão
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 sm:top-4"
      initial={reduced ? false : { y: -24, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{
        y: { duration: 0.45, ease: EASE_OUT },
        opacity: { duration: 0.5, delay: reduced ? 0 : INTRO_DELAY },
      }}
    >
      <nav
        aria-label="Navegação principal"
        className="glass relative w-full max-w-[1200px] rounded-full shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] md:w-auto"
      >
        <div className="flex h-14 items-center justify-between gap-2 pl-5 pr-2 md:justify-center md:px-2">
          <AnchorLink
            href="#inicio"
            className="font-mono text-sm font-semibold tracking-tight text-text md:mr-2 md:pl-3"
            aria-label={`${profile.name}, voltar ao início`}
          >
            {profile.initials}
            <span className="text-blue-500">.</span>
          </AnchorLink>

          <ul className="hidden items-center md:flex">
            {navItems.slice(1).map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <AnchorLink
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-text" : "text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </AnchorLink>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-blue-500/30 bg-blue-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-text hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.ul
              id="mobile-menu"
              className="glass absolute inset-x-0 top-[calc(100%+8px)] flex flex-col gap-1 rounded-2xl bg-surface/95 p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] md:hidden"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              {navItems.map((item) => (
                <li key={item.id}>
                  <AnchorLink
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3 text-base",
                      active === item.id ? "bg-blue-500/10 text-text" : "text-muted",
                    )}
                  >
                    {item.label}
                    {active === item.id ? <span className="size-1.5 rounded-full bg-blue-500" /> : null}
                  </AnchorLink>
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
