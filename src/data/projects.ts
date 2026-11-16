/**
 * Projetos exibidos na seção "Projetos".
 * - `image`: caminho em /public (ex.: "/images/projects/<slug>.jpg"). Sem imagem = placeholder em gradiente.
 * - `liveUrl`: link do site/demo. `null` = aparece "em breve".
 * - `repoUrl`: link do repositório. `null` = o botão "Código" não aparece.
 */

export type ProjectCategory = "Institucional" | "Landing page" | "IA";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  image?: string;
  liveUrl: string | null;
  repoUrl: string | null;
}

/** Ordem dos botões do filtro (além de "Todos"). */
export const projectCategories: ProjectCategory[] = ["Landing page", "Institucional"];

export const projects: Project[] = [
  {
    slug: "velqora-tech",
    title: "VELQORA TECH",
    description:
      "Site institucional de uma empresa de tecnologia sob medida: APIs, software web, apps Android e IA.",
    category: "Institucional",
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    image: "/images/projects/velqora-tech.jpg",
    liveUrl: "https://velqora-theta.vercel.app",
    repoUrl: null,
  },
  {
    slug: "solfitness",
    title: "Solfitness Academia",
    description:
      "Landing page de academia em Patos-PB, com estrutura, avaliações do Google e contato direto pelo WhatsApp.",
    category: "Landing page",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "/images/projects/solfitness.jpg",
    liveUrl: "https://sol-fitness-alpha.vercel.app",
    repoUrl: null,
  },
  {
    slug: "barba-branca",
    title: "Barba Branca Tattoo",
    description:
      "Site-portfólio de tatuador em Patos-PB, especializado em realismo preto e cinza, com galeria e agendamento.",
    category: "Landing page",
    tags: ["React", "Vite"],
    image: "/images/projects/barba-branca.jpg",
    liveUrl: "https://barba-branca.vercel.app",
    repoUrl: null,
  },
  {
    slug: "gd-contemplacoes",
    title: "GD Contemplações",
    description:
      "Landing page sobre carta de crédito em Imperatriz-MA, com FAQ e formulário que abre o WhatsApp com a mensagem pronta.",
    category: "Landing page",
    tags: ["Vite", "JavaScript"],
    image: "/images/projects/gd-contemplacoes.jpg",
    liveUrl: "https://gd-contemplacoes.vercel.app",
    repoUrl: null,
  },
  // O chatbot para entregadores não tem link nem imagem, por isso fica só no texto do
  // "Sobre" e na Trajetória. Se um dia tiver demo, adicione aqui com category: "IA"
  // e inclua "IA" em projectCategories.
];
