"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";

type Filter = "Todos" | ProjectCategory;
const filters: Filter[] = ["Todos", ...projectCategories];

export function Projects() {
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("Todos");

  const visible = useMemo(
    () => (filter === "Todos" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="projetos-title"
            eyebrow="03 — projetos"
            title="Coisas que eu construí"
            description="Sites e landing pages entregues como freelancer para negócios reais."
            className="mb-0 sm:mb-0"
          />

          <Reveal>
            <LayoutGroup id="project-filters">
              <div
                role="group"
                aria-label="Filtrar projetos por categoria"
                className="glass inline-flex max-w-full overflow-x-auto rounded-full p-1 [scrollbar-width:none]"
              >
                {filters.map((item) => {
                  const isActive = filter === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setFilter(item)}
                      className={cn(
                        "relative shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm transition-colors duration-300 sm:px-4",
                        isActive ? "text-text" : "text-muted hover:text-text",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="filter-active"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-blue-600/90"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{item}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} {visible.length === 1 ? "projeto exibido" : "projetos exibidos"}
        </p>

        <motion.ul layout={!reduced} className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.li
                key={project.slug}
                layout={!reduced}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.08 }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  );
}
