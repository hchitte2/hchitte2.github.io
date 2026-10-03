import { Github, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tile } from "@/components/ui/tile";
import { RevealGrid, RevealItem } from "@/components/reveal";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section className="pt-12 pb-6 md:pt-20 md:pb-10">
      <RevealGrid trigger="load" className="grid gap-4 md:grid-cols-3">
        <RevealItem className="md:col-span-2">
          <Tile className="flex h-full flex-col gap-6 md:p-9">
            <p className="text-sm font-medium text-accent">{profile.headline}</p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                {profile.name}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {profile.intro}
              </p>
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Button asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github aria-hidden="true" />
                  View GitHub
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.resume} download>
                  <FileDown aria-hidden="true" />
                  Download Resume
                </a>
              </Button>
            </div>
          </Tile>
        </RevealItem>

        <RevealItem className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
          {profile.stats.map((stat) => (
            <Tile key={stat.label} className="flex flex-col justify-center gap-1 p-5 md:p-6">
              <p className="text-xl font-semibold tracking-tight text-accent md:text-2xl">
                {stat.value}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">{stat.label}</p>
            </Tile>
          ))}
        </RevealItem>
      </RevealGrid>
    </section>
  );
}
