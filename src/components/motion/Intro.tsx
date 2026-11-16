import { profile } from "@/data/profile";

/**
 * Intro de carregamento (~1,2s) em CSS puro: renderiza no servidor,
 * some sozinha mesmo sem JavaScript e não aparece com prefers-reduced-motion.
 */
export function Intro() {
  return (
    <div
      aria-hidden="true"
      className="intro pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-bg"
    >
      <div className="flex flex-col items-start gap-3">
        <span className="block overflow-hidden pb-1">
          <span className="intro-name block text-3xl font-semibold tracking-tight text-text sm:text-5xl">
            {profile.name}
          </span>
        </span>
        <span className="intro-line block h-px w-full bg-gradient-to-r from-blue-500 to-transparent" />
      </div>
    </div>
  );
}
