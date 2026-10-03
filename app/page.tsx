import { Github, Linkedin, Mail } from "lucide-react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";
import { NowPlaying } from "@/components/now-playing";
import { profile } from "@/lib/data";

const footerLinks = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "GitHub", href: profile.github, Icon: Github },
  { label: "LinkedIn", href: profile.linkedin, Icon: Linkedin },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-6 pb-16 md:px-8">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-10 md:px-8">
          <NowPlaying />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <ul className="flex items-center gap-5">
              {footerLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
