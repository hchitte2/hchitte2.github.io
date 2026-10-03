import { Badge } from "@/components/ui/badge";
import { Tile } from "@/components/ui/tile";
import { Section } from "@/components/section";
import { RevealGrid, RevealItem } from "@/components/reveal";
import { education } from "@/lib/data";

export function Education({ subtitle }: { subtitle?: string }) {
  return (
    <Section id="education" title="Education" subtitle={subtitle}>
      <RevealGrid className="grid gap-4 md:grid-cols-2">
        {education.map((edu) => (
          <RevealItem key={edu.degree}>
            <Tile className="flex h-full flex-col">
              <p className="text-xs tabular-nums text-muted-foreground">{edu.period}</p>
              <h3 className="mt-2 text-base font-semibold md:text-lg">{edu.degree}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{edu.school}</p>
              <p className="mt-1 text-xs text-muted-foreground">{edu.location}</p>
              {edu.courses.length > 0 && (
                <div className="mt-auto pt-6">
                  <p className="mb-2 text-xs text-muted-foreground">Relevant coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <Badge key={course} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Tile>
          </RevealItem>
        ))}
      </RevealGrid>
    </Section>
  );
}
