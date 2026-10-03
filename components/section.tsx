import type { ReactNode } from "react";
import { FadeIn } from "@/components/fade-in";

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-8 md:py-10">
      <FadeIn>
        <h2 className="border-b border-border pb-2.5 text-lg font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </FadeIn>
    </section>
  );
}
