import { Badge } from "@/components/ui/badge";
import { Tile } from "@/components/ui/tile";
import { Section } from "@/components/section";
import { SkillIcon } from "@/components/skill-icon";
import { RevealGrid, RevealItem } from "@/components/reveal";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience({ subtitle }: { subtitle?: string }) {
  return (
    <Section id="experience" title="Experience" subtitle={subtitle}>
      <RevealGrid className="grid gap-4 md:grid-cols-2">
        {experience.map((job, i) => (
          <RevealItem key={job.company} className={cn(i === 0 && "md:col-span-2")}>
            <Tile className="flex h-full flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold md:text-lg">
                  {job.role}
                  <span className="font-medium text-accent"> · {job.company}</span>
                </h3>
                <p className="text-xs tabular-nums text-muted-foreground md:text-sm">
                  {job.period}
                </p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{job.location}</p>
              <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-muted-foreground">
                {job.points.map((p) => (
                  <li
                    key={p}
                    className="relative pl-4 before:absolute before:left-0 before:text-accent before:content-['–']"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {job.stack.map((s) => (
                  <Badge key={s} variant="outline" className="gap-1.5">
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
