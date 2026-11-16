import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TechIcon } from "@/components/ui/TechIcon";
import { skillCategories, type Skill } from "@/data/skills";
import { cn } from "@/lib/cn";
import { LevelBar } from "./LevelBar";

export function Skills() {
  // Categorias vazias ficam escondidas até serem preenchidas em src/data/skills.ts
  const categories = skillCategories.filter((category) => category.skills.length > 0);
  const allSkills: Skill[] = categories.flatMap((category) => category.skills);

  return (
    <section id="specs" aria-labelledby="specs-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="specs-title"
          eyebrow="02 — specs"
          title="Stack e habilidades"
          description="As ferramentas que uso para tirar ideias do papel."
        />

        <Stagger
          as="ul"
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2",
            categories.length >= 3 && "lg:grid-cols-3",
          )}
        >
          {categories.map((category, index) => (
            <StaggerItem as="li" key={category.id}>
              <SpotlightCard className="h-full p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-text">{category.title}</h3>
                    <p className="mt-1 text-sm text-muted">{category.description}</p>
                  </div>
                  <span className="font-mono text-xs text-blue-400" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                  {category.skills.map((skill) => (
                    <li key={skill.name} className="flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface-2 text-blue-400">
                          <TechIcon name={skill.icon} className="size-4" />
                        </span>
                        <span className="text-sm text-text">{skill.name}</span>
                      </div>
                      {skill.level ? <LevelBar level={skill.level} label={skill.name} /> : null}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>

      {allSkills.length > 0 ? (
        <div className="mt-14">
          <Marquee
            label="Tecnologias"
            items={allSkills}
            getKey={(skill) => skill.name}
            duration={28}
            renderItem={(skill) => (
              <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface/70 px-4 py-2 font-mono text-sm text-muted">
                <TechIcon name={skill.icon} className="size-4 text-blue-400" />
                {skill.name}
              </span>
            )}
          />
        </div>
      ) : null}
    </section>
  );
}
