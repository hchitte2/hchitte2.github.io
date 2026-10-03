import Link from "next/link";
import { profile } from "@/lib/data";
import { NavLinks } from "@/components/nav-links";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5 md:px-8">
        <Link href="#" className="shrink-0 text-sm font-semibold tracking-tight">
          {profile.name}
        </Link>
        <NavLinks links={links} />
      </div>
    </header>
  );
}
