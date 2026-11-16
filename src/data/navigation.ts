export interface NavItem {
  id: string;
  label: string;
}

/** Ordem das seções no menu. O `id` é a âncora (#id) da seção. */
export const navItems: NavItem[] = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "specs", label: "Specs" },
  { id: "projetos", label: "Projetos" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "contato", label: "Contato" },
];
