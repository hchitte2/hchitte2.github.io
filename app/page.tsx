import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { NowPlaying } from "@/components/now-playing";
import { profile } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 md:px-8">
        <Hero />
        <Experience subtitle="Where I've built and shipped" />
        <Education subtitle="Degrees and relevant coursework" />
        <Projects subtitle="Things I've designed, built, and shipped" />
        <Skills subtitle="What I work with, grouped by where I've used it" />
        <Contact subtitle="Open to full-stack and AI engineering roles" />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 md:px-8">
          <NowPlaying />
          <p className="mt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </footer>
    </>
  );
}
