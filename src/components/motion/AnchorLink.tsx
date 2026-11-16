"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useSmoothScroll } from "./SmoothScroll";

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Âncora no formato "#id". */
  href: `#${string}`;
};

/**
 * Link de âncora que rola suavemente com Lenis e move o foco para a seção
 * (importante para quem navega por teclado/leitor de tela).
 */
export function AnchorLink({ href, onClick, children, ...rest }: AnchorLinkProps) {
  const { scrollTo } = useSmoothScroll();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;
    event.preventDefault();
    scrollTo(href === "#inicio" ? 0 : href);
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    history.replaceState(null, "", href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
