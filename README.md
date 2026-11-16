# Portfólio · Artur Henrique

Site one-page em Next.js 15 (App Router) + TypeScript + Tailwind CSS v4, com Motion, Lenis e GSAP.

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Checagens de qualidade:

```bash
npm run build      # build de produção
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Onde editar o conteúdo

Todo o conteúdo fica em `src/data/`. Não é preciso mexer em JSX.

| Arquivo | O que tem |
|---|---|
| `src/data/profile.ts` | nome, título, frase, "sobre", destaques, **contatos** (e-mail, GitHub, LinkedIn, WhatsApp), URL do site |
| `src/data/skills.ts` | habilidades por categoria (categorias vazias ficam ocultas; `level` de 1 a 5 é opcional e mostra uma barra) |
| `src/data/projects.ts` | projetos, categorias do filtro, links do site/demo e do repositório |
| `src/data/timeline.ts` | linha do tempo (formação e experiência) |
| `src/data/navigation.ts` | itens do menu / âncoras |

Procure por `TODO` para achar o que ainda falta preencher. Um link `null` aparece como "em breve".

## Trocar a foto

1. Substitua `public/images/profile.jpg` (de preferência vertical, com pelo menos 900px de largura).
2. Em `src/data/profile.ts`, ajuste `photo.focus` (posição do rosto em %, x/y) e `photo.zoom` (1 = sem zoom) para o recorte ficar centralizado.

## Imagens dos projetos

Salve em `public/images/projects/<slug>.png` (proporção 16:10) e preencha `image: "/images/projects/<slug>.png"` no projeto. Sem imagem, o card mostra um placeholder em gradiente com o nome do projeto.

## Deploy na Vercel

1. Suba o projeto para um repositório no GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório (o framework Next.js é detectado sozinho) e clique em **Deploy**.
3. Depois do deploy, troque `siteUrl` em `src/data/profile.ts` pela URL final (usada no SEO, sitemap e Open Graph) e faça um novo push.

A página é pré-renderizada como estática no build; a otimização de imagens do `next/image` continua ativa na Vercel.

## Notas técnicas

- **Motion** cuida de reveals, navbar, tilt, botões magnéticos, filtro de projetos e barra de progresso.
- **Lenis** faz o smooth scroll, dirigido pelo ticker do GSAP e sincronizado com o ScrollTrigger.
- **GSAP + ScrollTrigger** só animam a linha da Trajetória conforme o scroll.
- Com `prefers-reduced-motion`, ficam desligados o smooth scroll, o parallax, o tilt, o marquee, o cursor customizado e a intro, e os reveals viram um fade simples.
- O cursor customizado pode ser desligado em `profile.settings.customCursor`.
