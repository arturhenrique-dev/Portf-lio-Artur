/**
 * Linha do tempo (formação + experiência).
 * `period` é opcional: preencha quando quiser exibir datas (ex.: "2025 — atual").
 */

export type TimelineKind = "education" | "work";

export interface TimelineItem {
  kind: TimelineKind;
  title: string;
  place: string;
  period?: string;
  status?: string;
  description: string;
  highlights?: string[];
}

export const timeline: TimelineItem[] = [
  {
    kind: "education",
    title: "Análise e Desenvolvimento de Sistemas",
    place: "Unifip",
    status: "Cursando o 2º período",
    // period: "TODO",
    description: "Graduação tecnológica com foco em desenvolvimento de software.",
  },
  {
    kind: "work",
    title: "Desenvolvedor freelancer",
    place: "Autônomo · Paraíba, Brasil",
    status: "Em atividade",
    // period: "TODO",
    description: "Projetos sob demanda para resolver problemas reais de clientes.",
    highlights: [
      "Chatbot com IA generativa para entregadores",
      "Landing pages para academia, estúdio de tatuagem e carta de crédito",
      "Site institucional para empresa de tecnologia",
    ],
  },
];
