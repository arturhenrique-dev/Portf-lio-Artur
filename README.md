<div align="center">

# Artur Henrique — Portfólio

**Desenvolvedor · IA Generativa · Freelancer**
Estudante de Análise e Desenvolvimento de Sistemas (ADS) com experiência em projetos freelancer.
Site one-page em tema escuro (preto e azul), com foco em fluidez e animações suaves.

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

🔗 **[Ver o site ao vivo](https://portf-lio-artur.vercel.app/)**

</div>

---


## ✨ O que é este projeto

Meu portfólio pessoal: uma página única que apresenta quem eu sou, o que sei fazer, os projetos que já entreguei e minha trajetória de formação e experiência. O conteúdo é separado do código, então atualizar textos, projetos e habilidades não exige mexer em JSX.

### Seções

| Seção | O que mostra |
|---|---|
| **Início** | Apresentação, título profissional e foto |
| **Sobre** | Resumo pessoal e destaques |
| **Habilidades** | Tecnologias organizadas por categoria, com nível opcional |
| **Projetos** | Cards com imagem, descrição, links de demo/repositório e filtro por categoria |
| **Trajetória** | Linha do tempo de formação e experiência, animada conforme o scroll |
| **Contato** | E-mail, GitHub, LinkedIn e WhatsApp |

### Destaques técnicos

- **Animações fluidas:** revelação de elementos, navbar, efeito de inclinação (tilt) nos cards, botões magnéticos e barra de progresso de leitura.
- **Rolagem suave** com Lenis, sincronizada com o GSAP/ScrollTrigger.
- **Acessibilidade:** com `prefers-reduced-motion`, o parallax, o tilt, o marquee, o cursor customizado e a intro são desativados e as animações viram um fade simples.
- **SEO pronto:** metadados, sitemap e Open Graph configurados a partir de uma única URL.
- **Página estática:** pré-renderizada no build, com otimização de imagens do `next/image`.
- **Conteúdo desacoplado:** tudo editável em `src/data/`.

---

## 🧰 Tecnologias

| Área | Ferramentas |
|---|---|
| Framework | Next.js 15 (App Router) |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS v4 |
| Animação | Motion, GSAP + ScrollTrigger |
| Rolagem | Lenis |
| Qualidade | ESLint e `tsc --noEmit` |
| Hospedagem | Vercel |

---

## 🚀 Como rodar localmente

**Requisitos:** Node.js 18.18 ou superior (recomendado 20+) e npm.

```bash
# 1. clonar o repositório
git clone https://github.com/arturhenrique-dev/Portf-lio-Artur.git
cd Portf-lio-Artur

# 2. instalar as dependências
npm install

# 3. iniciar em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Scripts disponíveis

| Comando | Função |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | Análise com ESLint |
| `npm run typecheck` | Checagem de tipos com TypeScript |

---

## 📁 Estrutura

```
.
├── public/
│   └── images/            # foto de perfil e imagens dos projetos
├── src/
│   └── data/              # TODO o conteúdo editável do site
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## ✏️ Como personalizar o conteúdo

Todo o conteúdo fica em `src/data/`:

| Arquivo | O que controla |
|---|---|
| `profile.ts` | Nome, título, frase, "sobre", destaques, contatos e URL do site |
| `skills.ts` | Habilidades por categoria (categorias vazias ficam ocultas; `level` de 1 a 5 é opcional) |
| `projects.ts` | Projetos, categorias do filtro e links de demo/repositório |
| `timeline.ts` | Linha do tempo de formação e experiência |
| `navigation.ts` | Itens do menu e âncoras |

Procure por `TODO` nesses arquivos para achar o que ainda falta preencher. Um link `null` aparece no site como "em breve".

### Foto de perfil
1. Substitua `public/images/profile.jpg` (de preferência vertical, com pelo menos 900 px de largura).
2. Em `src/data/profile.ts`, ajuste `photo.focus` (posição do rosto em %, `x`/`y`) e `photo.zoom` (`1` = sem zoom).

### Imagens dos projetos
Salve em `public/images/projects/<slug>.png` (proporção 16:10) e preencha `image: "/images/projects/<slug>.png"` no projeto. Sem imagem, o card mostra um placeholder em gradiente com o nome do projeto.

### Cursor customizado
Pode ser desligado em `profile.settings.customCursor`.

---

## 🌐 Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório. O framework Next.js é detectado automaticamente.
2. Clique em **Deploy**.
3. Com a URL final em mãos, atualize `siteUrl` em `src/data/profile.ts` (usada no SEO, sitemap e Open Graph) e faça um novo push.

---

## 📬 Contato

- GitHub: [@arturhenrique-dev](https://github.com/arturhenrique-dev)
- LinkedIn: [Artur Henrique](https://www.linkedin.com/in/artur-henrique-b4b88b2ba/)
- Portfólio: [portf-lio-artur.vercel.app](https://portf-lio-artur.vercel.app/)
- E-mail: [arturhsilvadev@gmail.com](mailto:arturhsilvadev@gmail.com)

---

<div align="center">

Feito por **Artur Henrique** · Estudante de Análise e Desenvolvimento de Sistemas

</div>
