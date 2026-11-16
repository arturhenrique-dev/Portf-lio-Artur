/**
 * Habilidades agrupadas por categoria.
 * - Categorias sem itens não aparecem no site.
 * - `level` (1 a 5) é opcional: só preencha se quiser mostrar a barra de nível.
 * - `icon` usa as chaves de src/components/ui/TechIcon.tsx.
 */

import type { TechIconKey } from "@/components/ui/TechIcon";

export type SkillCategoryId = "frontend" | "backend" | "database" | "ai" | "tools";

export interface Skill {
  name: string;
  icon?: TechIconKey;
  level?: 1 | 2 | 3 | 4 | 5;
}

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Front-end",
    description: "Interfaces e landing pages.",
    // Tirado das tecnologias dos sites publicados. TODO: confirmar e completar (ex.: TypeScript, Tailwind).
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
    ],
  },
  {
    id: "backend",
    title: "Back-end",
    description: "APIs e regras de negócio.",
    // TODO: preencher. Ex.: { name: "Node.js", icon: "node" }, { name: "Python", icon: "python" }
    skills: [],
  },
  {
    id: "database",
    title: "Banco de dados",
    description: "Modelagem e persistência.",
    // TODO: preencher. Ex.: { name: "PostgreSQL", icon: "postgres" }, { name: "Firebase", icon: "firebase" }
    skills: [],
  },
  {
    id: "ai",
    title: "IA e automação",
    description: "Assistentes e fluxos inteligentes.",
    // Inferido do chatbot para entregadores. TODO: citar ferramentas usadas (ex.: OpenAI, n8n).
    skills: [
      { name: "IA generativa", icon: "ai" },
      { name: "Chatbots", icon: "bot" },
    ],
  },
  {
    id: "tools",
    title: "Ferramentas",
    description: "O que uso no dia a dia.",
    // Vite e Vercel aparecem nos sites publicados. TODO: completar (ex.: Git, VS Code).
    skills: [
      { name: "Vite", icon: "vite" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
];
