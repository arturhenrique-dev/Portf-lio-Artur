"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { PointerEvent } from "react";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

const MAX_TILT = 6; // graus

/** Placeholder em gradiente escuro com o nome do projeto (quando não há imagem). */
function ProjectPlaceholder({ title, category }: { title: string; category: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(120%_90%_at_80%_0%,rgba(37,99,235,0.35),transparent_55%),linear-gradient(160deg,#0f1626,#05070d)] p-5">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
      <span className="relative font-mono text-[11px] uppercase tracking-[0.2em] text-blue-400">{category}</span>
      <span className="relative max-w-[85%] text-xl font-semibold leading-tight tracking-tight text-text/90">
        {title}
      </span>
    </div>
  );
}

function ProjectLink({ href, label, children }: { href: string | null; label: string; children: React.ReactNode }) {
  const base = "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium";
  if (!href) {
    return (
      <span className={cn(base, "cursor-not-allowed text-muted")} aria-disabled="true" title="Link em breve">
        {children}
        <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase leading-none tracking-wider">
          em breve
        </span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(base, "group/link text-text hover:text-blue-400")}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 ease-[var(--ease-out)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        aria-hidden
      />
    </a>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), { stiffness: 200, damping: 20 });

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--mx", `${x}px`);
    event.currentTarget.style.setProperty("--my", `${y}px`);
    if (reduced) return;
    px.set(x / rect.width);
    py.set(y / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="h-full [perspective:1000px]">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass spotlight group flex h-full flex-col overflow-hidden rounded-[var(--radius)] transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_var(--blue-glow)]"
        aria-labelledby={`project-${project.slug}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
          <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease-out)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            {project.image ? (
              <Image
                src={project.image}
                alt={`Tela inicial do site ${project.title}`}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <ProjectPlaceholder title={project.title} category={project.category} />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 id={`project-${project.slug}`} className="text-lg font-semibold tracking-tight text-text">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6">
            <ProjectLink href={project.liveUrl} label={`Abrir o site de ${project.title} (nova aba)`}>
              Ver projeto
            </ProjectLink>
            {project.repoUrl ? (
              <ProjectLink href={project.repoUrl} label={`Abrir o repositório de ${project.title} (nova aba)`}>
                <SiGithub className="size-4" aria-hidden />
                Código
              </ProjectLink>
            ) : null}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
