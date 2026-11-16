import { ArrowUpRight, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { buttonClasses, ButtonContent } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile, type ContactKind, type ContactLink } from "@/data/profile";
import { cn } from "@/lib/cn";

const contactIcons: Record<ContactKind, ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  email: Mail,
  github: SiGithub,
  linkedin: FaLinkedinIn,
  whatsapp: SiWhatsapp,
};

function ContactCard({ contact }: { contact: ContactLink }) {
  const Icon = contactIcons[contact.kind];
  const content = (
    <>
      <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface-2 text-blue-400 transition-colors duration-300 group-hover:border-blue-500/40">
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-text">{contact.label}</span>
        <span className="block truncate font-mono text-xs text-muted">
          {contact.href ? contact.display : "em breve"}
        </span>
      </span>
      {contact.href ? (
        <ArrowUpRight
          className="size-4 text-muted transition-transform duration-300 ease-[var(--ease-out)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400"
          aria-hidden
        />
      ) : null}
    </>
  );

  const external = contact.href?.startsWith("http");

  return (
    <SpotlightCard className={cn("h-full", !contact.href && "opacity-60")}>
      {contact.href ? (
        <a
          href={contact.href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={`${contact.label}: ${contact.display}${external ? " (nova aba)" : ""}`}
          className="group flex items-center gap-4 rounded-[inherit] p-4"
        >
          {content}
        </a>
      ) : (
        <div className="group flex items-center gap-4 p-4" aria-label={`${contact.label}: em breve`}>
          {content}
        </div>
      )}
    </SpotlightCard>
  );
}

export function Contact() {
  const primary = profile.contacts.find((contact) => contact.href);

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(50%_60%_at_50%_100%,rgba(37,99,235,0.14),transparent_70%)]"
      />
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-blue-400">05 — contato</p>
          <h2 id="contato-title" className="text-4xl font-semibold tracking-tight text-text text-balance sm:text-5xl lg:text-6xl">
            Tem um problema pra resolver?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Bora conversar sobre o seu projeto. Respondo por qualquer um dos canais abaixo.
          </p>
          {primary?.href ? (
            <div className="mt-8 flex justify-center">
              <MagneticButton>
                <a
                  href={primary.href}
                  target={primary.href.startsWith("http") ? "_blank" : undefined}
                  rel={primary.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={buttonClasses("primary", "h-14 px-8 text-base")}
                >
                  <ButtonContent icon={<ArrowUpRight className="size-5" aria-hidden />}>
                    Falar por {primary.label}
                  </ButtonContent>
                </a>
              </MagneticButton>
            </div>
          ) : null}
        </Reveal>

        <Stagger as="ul" className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {profile.contacts.map((contact) => (
            <StaggerItem as="li" key={contact.kind}>
              <ContactCard contact={contact} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
