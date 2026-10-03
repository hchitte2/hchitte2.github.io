import { Section } from "@/components/section";
import { education } from "@/lib/data";

export function Education() {
  return (
    <Section id="education" title="Education">
      <div className="space-y-5">
        {education.map((edu) => (
          <article key={edu.degree}>
            <div className="flex flex-col gap-x-6 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-sm font-medium">{edu.degree}</h3>
              <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                {edu.period}
              </p>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {edu.school} · {edu.location}
            </p>
            {edu.courses.length > 0 && (
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                <span className="text-foreground/70">Coursework:</span> {edu.courses.join(", ")}
              </p>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
