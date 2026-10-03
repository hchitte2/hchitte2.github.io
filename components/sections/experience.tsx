import { Section } from "@/components/section";
import { Bullets, StackLine } from "@/components/entry";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="space-y-9">
        {experience.map((job) => (
          <article key={job.company}>
            <h3 className="text-base font-medium">{job.company}</h3>
            <p className="text-xs text-muted-foreground">{job.location}</p>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <p className="text-sm font-medium">{job.role}</p>
              <p className="font-mono text-xs tabular-nums text-muted-foreground">{job.period}</p>
            </div>
            <Bullets items={job.points} />
            <StackLine items={job.stack} />
          </article>
        ))}
      </div>
    </Section>
  );
}
