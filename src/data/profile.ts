/**
 * Dados pessoais e de contato.
 * Edite aqui sem mexer em nenhum componente.
 * Campos com `TODO` ainda dependem de informação do Artur.
 */

import { projects } from "./projects";

export type ContactKind = "email" | "github" | "linkedin" | "whatsapp";

export interface ContactLink {
  kind: ContactKind;
  label: string;
  /** Texto exibido (ex.: o e-mail ou @usuario). */
  display: string;
  /** `null` = ainda não informado; o card aparece como "em breve". */
  href: string | null;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  siteUrl: string;
  photo: {
    src: string;
    alt: string;
    /** Ponto focal do rosto na foto, em % (usado no recorte por CSS). */
    focus: { x: number; y: number };
    /** Zoom aplicado para centralizar o rosto no quadro. 1 = sem zoom. */
    zoom: number;
  };
  about: string[];
  stats: Stat[];
  contacts: ContactLink[];
  settings: {
    /** Cursor customizado (só aparece com mouse e sem prefers-reduced-motion). */
    customCursor: boolean;
  };
}

export const profile: Profile = {
  name: "Artur Henrique",
  initials: "AH",
  role: "Desenvolvedor · IA Generativa · Freelancer",
  tagline:
    "Transformo problemas do dia a dia em soluções digitais, de chatbots com IA a landing pages.",
  location: "Paraíba, Brasil",
  // TODO: trocar pela URL final depois do deploy (usada em SEO, sitemap e Open Graph).
  siteUrl: "https://artur-henrique.vercel.app",
  photo: {
    src: "/images/profile.jpg",
    alt: "Artur Henrique sorrindo, de camisa preta e crachá azul de evento",
    focus: { x: 72, y: 52 },
    zoom: 1.5,
  },
  about: [
    "Sou estudante de Análise e Desenvolvimento de Sistemas na Unifip, no 2º período, e já atuo como desenvolvedor freelancer.",
    "Gosto de aprender rápido e de enxergar oportunidades de empreender. O que me move é resolver problemas e facilitar tarefas do dia a dia, as minhas e as de outras pessoas.",
    "Já entreguei um chatbot com IA generativa para entregadores, além de landing pages e sites para negócios de nichos bem diferentes: academia, estúdio de tatuagem, carta de crédito e tecnologia.",
  ],
  stats: [
    { value: "2º", label: "período de ADS na Unifip" },
    // Calculado a partir de src/data/projects.ts
    { value: String(projects.length), label: "projetos no portfólio" },
    { value: "PB", label: "Paraíba, Brasil" },
  ],
  contacts: [
    {
      kind: "email",
      label: "E-mail",
      display: "arturhsilvadev@gmail.com",
      href: "mailto:arturhsilvadev@gmail.com",
    },
    {
      kind: "github",
      label: "GitHub",
      display: "@arturhenrique-dev",
      href: "https://github.com/arturhenrique-dev",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      display: "/in/artur-henrique-b4b88b2ba",
      // Parâmetros de rastreamento (utm_*) removidos do link compartilhado pelo app.
      href: "https://www.linkedin.com/in/artur-henrique-b4b88b2ba",
    },
    {
      kind: "whatsapp",
      label: "WhatsApp",
      display: "(83) 98189-9468",
      // Formato wa.me: código do país (55) + DDD + número, só dígitos.
      href: "https://wa.me/5583981899468",
    },
  ],
  settings: {
    customCursor: true,
  },
};
