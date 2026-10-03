import type { ReactNode } from "react";
import { FadeIn } from "@/components/fade-in";

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-20">
      <FadeIn>
        <div className="mb-8">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{subtitle}</p>
          )}
          <div className="mt-5 border-t border-border" />
        </div>
      </FadeIn>
      {children}
    </section>
  );
}
