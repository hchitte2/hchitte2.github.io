"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

export function NavLinks({ links }: { links: NavLink[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className="no-scrollbar min-w-0 overflow-x-auto rounded-full border border-border px-1 py-1">
      <div className="flex w-max">
        {links.map((l) => {
          const isActive = activeId === l.href.slice(1);
          return (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-sm transition-colors",
                isActive
                  ? "bg-accent-soft font-medium text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {l.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
