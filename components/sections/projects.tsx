import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tile } from "@/components/ui/tile";
import { Section } from "@/components/section";
import { SkillIcon } from "@/components/skill-icon";
import { RevealGrid, RevealItem } from "@/components/reveal";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects({ subtitle }: { subtitle?: string }) {
  return (
    <Section id="projects" title="Projects" subtitle={subtitle}>
      <RevealGrid className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <RevealItem key={p.name} className={cn(i === 0 && "md:col-span-2")}>
            <Tile interactive={Boolean(p.href)} className="group relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold md:text-lg">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {p.name}
                    </a>
                  ) : (
                    p.name
                  )}
                </h3>
                {p.href && (
                  <ArrowUpRight
                    className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
                    aria-hidden="true"
                  />
                )}
              </div>
              <ul
                className={cn(
                  "mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground",
                  i === 0 && "md:columns-2 md:gap-8 md:space-y-0"
                )}
              >
                {p.points.map((point) => (
                  <li
                    key={point}
                    className={cn(
                      "relative pl-4 before:absolute before:left-0 before:text-accent before:content-['–']",
                      i === 0 && "md:mb-2.5 md:break-inside-avoid"
                    )}
                  >
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {p.stack.map((s) => (
                  <Badge key={s} className="gap-1.5">
                    <SkillIcon name={s} className="size-3" />
                    {s}
                  </Badge>
                ))}
              </div>
            </Tile>
          </RevealItem>
        ))}
      </RevealGrid>
    </Section>
  );
}
