import Link from "next/link";
import { profile } from "@/lib/data";
import { NavLinks } from "@/components/nav-links";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <Link href="#" className="shrink-0 text-sm font-medium tracking-tight">
          {profile.name}
        </Link>
        <div className="flex min-w-0 items-center gap-1">
          <NavLinks links={sections} contactHref={`mailto:${profile.email}`} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
