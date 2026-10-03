import { FileDown, Github, Linkedin } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { profile } from "@/lib/data";

const links = [
  { label: "GitHub", href: profile.github, Icon: Github, external: true },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin, external: true },
  { label: "Download resume", href: profile.resume, Icon: FileDown, external: false },
];

export function Hero() {
  return (
    <section className="pt-14 pb-4 md:pt-20">
      <FadeIn>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
          <div className="flex items-center gap-1">
            {links.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : { download: true })}
                className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{profile.headline}</p>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-[17px]">
          {profile.intro}
        </p>
      </FadeIn>
    </section>
  );
}
