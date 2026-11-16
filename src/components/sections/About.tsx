import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { profile } from "@/data/profile";
import { Counter } from "./Counter";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative py-24 sm:py-32">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionHeading id="sobre-title" eyebrow="01 — sobre" title="Aprendo rápido e gosto de resolver problemas." />
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {profile.about.map((paragraph, index) => (
              <Reveal as="p" key={index} delay={index * 0.08}>
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <Stagger as="ul" className="grid grid-cols-1 gap-4 self-end sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1" stagger={0.1}>
          {profile.stats.map((stat) => (
            <StaggerItem as="li" key={stat.label}>
              <SpotlightCard className="flex h-full items-center gap-5 p-5 sm:flex-col sm:items-start lg:flex-row lg:items-center">
                <Counter
                  value={stat.value}
                  className="min-w-[3.5ch] font-mono text-4xl font-semibold tracking-tight text-text"
                />
                <span className="text-sm leading-snug text-muted">{stat.label}</span>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
