/** Curva de easing padrão do projeto (ease-out expo suave). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Atraso (s) para o conteúdo do hero entrar depois da intro. */
export const INTRO_DELAY = 0.95;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Verifica se um link é externo (abre em nova aba). */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** Retorna `true` quando o dispositivo tem mouse de precisão (não touch). */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
