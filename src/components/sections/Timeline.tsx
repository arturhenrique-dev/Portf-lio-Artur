"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { timeline } from "@/data/timeline";

gsap.registerPlugin(ScrollTrigger);

/**
 * Linha do tempo vertical. GSAP + ScrollTrigger cuidam só da linha que
 * "preenche" conforme o scroll (scrub); os itens usam o Reveal do Motion.
 */
export function Timeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || !lineRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="trajetoria" aria-labelledby="trajetoria-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="trajetoria-title"
          eyebrow="04 — trajetória"
          title="Formação e experiência"
          description="Estudando e entregando ao mesmo tempo."
        />

        <ol ref={listRef} className="relative ml-4 max-w-3xl sm:ml-6">
          {/* Trilho + preenchimento animado */}
          <div aria-hidden="true" className="absolute left-0 top-2 bottom-2 w-px bg-border" />
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 shadow-[0_0_10px_var(--blue-glow)]"
            style={{ transform: "scaleY(0)" }}
          />

          {timeline.map((item, index) => {
            const Icon = item.kind === "education" ? GraduationCap : Briefcase;
            return (
              <li key={item.title} className="relative pb-12 pl-10 last:pb-0 sm:pl-14">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-blue-500/40 bg-surface text-blue-400 shadow-[0_0_20px_-4px_var(--blue-glow)]"
                >
                  <Icon className="size-4" />
                </span>

                <Reveal delay={index * 0.05} className="glass rounded-[var(--radius)] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-blue-400">
                      {item.kind === "education" ? "Formação" : "Experiência"}
                    </span>
                    {item.period ? <Tag>{item.period}</Tag> : null}
                    {item.status ? <Tag className="border-blue-500/30 text-text">{item.status}</Tag> : null}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-text">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted">{item.place}</p>
                  <p className="mt-4 leading-relaxed text-muted">{item.description}</p>
                  {item.highlights?.length ? (
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-sm text-text">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-blue-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
