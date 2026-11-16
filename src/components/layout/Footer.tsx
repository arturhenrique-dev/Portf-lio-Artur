import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-2 text-sm text-muted sm:flex-row">
        <p>
          © {year} {profile.name}
        </p>
        <p className="font-mono text-xs">
          Feito com <span className="text-text">Next.js</span>
        </p>
      </Container>
    </footer>
  );
}
