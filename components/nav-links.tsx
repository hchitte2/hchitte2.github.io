"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

const linkClass = "shrink-0 whitespace-nowrap px-2 py-1 text-sm transition-colors duration-150";

export function NavLinks({ links, contactHref }: { links: NavLink[]; contactHref: string }) {
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
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav className="no-scrollbar flex min-w-0 overflow-x-auto">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={cn(
            linkClass,
            activeId === l.href.slice(1)
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l.label}
        </a>
      ))}
      <a href={contactHref} className={cn(linkClass, "text-muted-foreground hover:text-foreground")}>
        Contact
      </a>
    </nav>
  );
}
