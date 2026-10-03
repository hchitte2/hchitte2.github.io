import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Tile } from "@/components/ui/tile";
import { Section } from "@/components/section";
import { RevealGrid, RevealItem } from "@/components/reveal";
import { profile } from "@/lib/data";

const links = [
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
  { label: "GitHub", href: profile.github, Icon: Github },
];

export function Contact({ subtitle }: { subtitle?: string }) {
  return (
    <Section id="contact" title="Contact" subtitle={subtitle}>
      <RevealGrid className="grid gap-4 md:grid-cols-2">
        <RevealItem className="md:col-span-2">
          <Tile interactive className="group relative flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Email — the fastest way to reach me</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-1 block truncate text-lg font-semibold tracking-tight after:absolute after:inset-0 md:text-xl"
              >
                {profile.email}
              </a>
            </div>
            <Mail
              className="size-5 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
              aria-hidden="true"
            />
          </Tile>
        </RevealItem>

        {links.map(({ label, href, Icon }) => (
          <RevealItem key={href}>
            <Tile interactive className="group relative flex items-center justify-between gap-4">
              <span className="flex items-center gap-2.5 text-sm font-medium">
                <Icon className="size-4 text-accent" aria-hidden="true" />
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0"
                >
                  {label}
                </a>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-accent"
                aria-hidden="true"
              />
            </Tile>
          </RevealItem>
        ))}
      </RevealGrid>
    </Section>
  );
}
