import { Bot, Sparkles, CodeXml } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import type { IconBaseProps } from "react-icons";
import {
  SiCss,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

type IconComponent = ComponentType<IconBaseProps> | ComponentType<SVGProps<SVGSVGElement>>;

/** Mapa de ícones disponíveis para as skills. Adicione novas chaves aqui. */
const icons = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  next: SiNextdotjs,
  tailwind: SiTailwindcss,
  node: SiNodedotjs,
  python: SiPython,
  postgres: SiPostgresql,
  firebase: SiFirebase,
  git: SiGit,
  vite: SiVite,
  vercel: SiVercel,
  vscode: VscVscode,
  ai: Sparkles,
  bot: Bot,
  code: CodeXml,
} satisfies Record<string, IconComponent>;

export type TechIconKey = keyof typeof icons;

interface TechIconProps {
  name?: TechIconKey;
  className?: string;
}

/** Ícone decorativo de tecnologia (o nome vem sempre em texto ao lado). */
export function TechIcon({ name = "code", className }: TechIconProps) {
  const Icon = icons[name] as ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  return <Icon className={className} aria-hidden />;
}
