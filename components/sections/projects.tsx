import { Github } from "lucide-react";
import { Section } from "@/components/section";
import { Bullets, StackLine } from "@/components/entry";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-8">
        {projects.map((p) => (
          <article key={p.name}>
            <h3 className="flex items-center gap-2 text-base font-medium">
              {p.name}
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} GitHub repository`}
                  className="text-muted-foreground transition-colors duration-150 hover:text-foreground"
                >
                  <Github className="size-4" aria-hidden="true" />
                </a>
              )}
            </h3>
            <Bullets items={p.points} />
            <StackLine items={p.stack} />
          </article>
        ))}
      </div>
    </Section>
  );
}
