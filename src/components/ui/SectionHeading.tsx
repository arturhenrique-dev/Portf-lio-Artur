import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Rótulo curto em mono acima do título (ex.: "02 — specs"). */
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, description, id, className }: SectionHeadingProps) {
  return (
    <Reveal as="header" className={cn("mb-10 max-w-2xl sm:mb-14", className)}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-text text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p> : null}
    </Reveal>
  );
}
