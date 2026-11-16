"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { AnchorLink } from "@/components/motion/AnchorLink";
import { buttonClasses, ButtonContent } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { clamp, EASE_OUT, INTRO_DELAY } from "@/lib/utils";

/** Título com reveal por máscara, palavra a palavra. */
function MaskedWords({ text, delay, reduced }: { text: string; delay: number; reduced: boolean }) {
  const words = text.split(" ");
  const word: Variants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { y: "110%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT } } };

  return (
    <motion.span
      className="block"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const base = reduced ? 0 : INTRO_DELAY;

  // Parallax leve da foto (desligado com reduced motion)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40]);

  const fadeUp = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: EASE_OUT, delay: base + delay },
  });

  // Recorte por CSS: aplica zoom e desloca a imagem para centralizar o rosto,
  // sem deixar bordas vazias (deslocamento limitado pelo zoom).
  const { focus, zoom } = profile.photo;
  const maxShift = 50 - 50 / zoom;
  const shiftX = clamp(50 - focus.x, -maxShift, maxShift);
  const shiftY = clamp(50 - focus.y, -maxShift, maxShift);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      {/* Fundo: gradiente radial azul + grid sutil */}
      <div aria-hidden="true" className="hero-gradient pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0" />

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <motion.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            </span>
            <MapPin className="size-3.5" aria-hidden />
            {profile.location}
          </motion.p>

          <h1
            id="hero-title"
            className="text-[clamp(2.75rem,9vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-text"
          >
            <MaskedWords text={profile.name} delay={base + 0.05} reduced={reduced} />
          </h1>

          <motion.p {...fadeUp(0.35)} className="mt-6 font-mono text-sm text-blue-400 sm:text-base">
            {profile.role}
          </motion.p>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl"
          >
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <AnchorLink href="#projetos" className={buttonClasses("primary")}>
                <ButtonContent icon={<ArrowUpRight className="size-4" aria-hidden />}>Ver projetos</ButtonContent>
              </AnchorLink>
            </MagneticButton>
            <MagneticButton>
              <AnchorLink href="#contato" className={buttonClasses("ghost")}>
                <ButtonContent>Falar comigo</ButtonContent>
              </AnchorLink>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Foto com glow pulsante e parallax */}
        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5 lg:justify-end">
          <motion.div
            className="relative w-[min(62vw,300px)] sm:w-[340px] lg:w-full lg:max-w-[420px]"
            style={{ y: photoY }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: base + 0.15 }}
          >
            <motion.div
              aria-hidden="true"
              style={{ y: glowY }}
              className="pointer-events-none absolute -inset-8 sm:-inset-12"
            >
              <div className="glow-pulse size-full rounded-full bg-[radial-gradient(circle,var(--blue-glow)_0%,transparent_65%)] blur-2xl" />
            </motion.div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_80px_-30px_var(--blue-glow)]">
              <div
                className="absolute inset-0"
                style={{ transform: `scale(${zoom}) translate(${shiftX}%, ${shiftY}%)` }}
              >
                <Image
                  src={profile.photo.src}
                  alt={profile.photo.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 62vw"
                  className="object-cover brightness-[0.92] contrast-[1.05] saturate-[0.85]"
                />
              </div>
              {/* Tratamento para integrar a foto ao tema escuro, sem alterar o rosto */}
              <div aria-hidden="true" className="absolute inset-0 bg-blue-600/10 mix-blend-soft-light" />
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(120%_80%_at_60%_35%,transparent_45%,rgba(5,7,13,0.65)_100%)]" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/90 to-transparent" />

              <div className="glass absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl px-4 py-3">
                <span className="font-mono text-xs text-muted">
                  <span className="text-blue-400">~/</span>artur
                </span>
                <span className="font-mono text-xs text-text">ADS · Unifip</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: base + 1, duration: 0.8 }}
      >
        <ArrowDown className="size-4 animate-bounce text-muted motion-reduce:animate-none" />
      </motion.div>
    </section>
  );
}
