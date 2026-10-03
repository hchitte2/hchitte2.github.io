"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Cloud,
  Code2,
  FolderGit2,
  LayoutTemplate,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { badgeVariants } from "@/components/ui/badge";
import { Tile } from "@/components/ui/tile";
import { Section } from "@/components/section";
import { skills, experience, projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const GROUP_ICONS: Record<string, LucideIcon> = {
  Languages: Code2,
  Frontend: LayoutTemplate,
  "Backend & DevOps": Server,
  "AI Development": Sparkles,
  "Cloud & Tools": Cloud,
};

// Skill names that don't map 1:1 onto a stack entry get explicit alternates here.
const ALIASES: Record<string, string[]> = {
  "GitHub / GitHub Actions": ["GitHub", "GitHub Actions"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[.\-/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchTerms(skillName: string) {
  const aliases = ALIASES[skillName];
  if (aliases) return aliases.map(normalize);
  const base = skillName.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  return [normalize(base)];
}

function stackEntryMatches(stackEntry: string, terms: string[]) {
  const normalizedEntry = normalize(stackEntry);
  return terms.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|\\s)${escaped}(\\s|$)`);
    return pattern.test(normalizedEntry);
  });
}

type Usage =
  | { type: "experience"; label: string }
  | { type: "project"; label: string };

function findUsage(skillName: string): Usage[] {
  const terms = matchTerms(skillName);
  const usage: Usage[] = [];

  for (const job of experience) {
    if (job.stack.some((entry) => stackEntryMatches(entry, terms))) {
      usage.push({ type: "experience", label: `${job.role} · ${job.company}` });
    }
  }
  for (const project of projects) {
    if (project.stack.some((entry) => stackEntryMatches(entry, terms))) {
      usage.push({ type: "project", label: project.name });
    }
  }
  return usage;
}

const usageMap = new Map<string, Usage[]>(
  skills.flatMap((group) => group.items.map((name) => [name, findUsage(name)] as const))
);

export function Skills({ subtitle }: { subtitle?: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="skills" title="Skills" subtitle={subtitle}>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((group) => {
          const Icon = GROUP_ICONS[group.group] ?? Code2;
          const activeName = group.items.includes(selected ?? "") ? selected : null;
          const activeUsage = activeName ? usageMap.get(activeName) ?? [] : [];

          return (
            <Tile key={group.group} className="flex h-full flex-col">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-base font-semibold">
                  <Icon className="size-4 text-accent" aria-hidden="true" />
                  {group.group}
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {group.items.length} skills
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((name) => {
                  const count = usageMap.get(name)?.length ?? 0;
                  const isSelected = selected === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() =>
                        setSelected((current) => (current === name ? null : name))
                      }
                      className={cn(
                        badgeVariants({ variant: "default" }),
                        "gap-1.5 border px-3 py-1 text-[13px] transition-colors",
                        isSelected
                          ? "border-accent bg-accent text-background"
                          : "border-transparent hover:border-accent/40 hover:text-accent"
                      )}
                    >
                      {name}
                      {count > 0 && (
                        <span
                          className={cn(
                            "text-[11px] tabular-nums",
                            isSelected ? "text-background/70" : "text-muted-foreground"
                          )}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence initial={false}>
                {activeName && activeUsage.length > 0 && (
                  <motion.div
                    key={activeName}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 rounded-lg border border-accent/30 bg-accent-soft/40 p-4 text-sm">
                      <p className="text-xs text-muted-foreground">
                        {activeName} · used in {activeUsage.length}{" "}
                        {activeUsage.length === 1 ? "place" : "places"}
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {activeUsage.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                            {item.type === "experience" ? (
                              <Briefcase
                                className="size-3.5 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                            ) : (
                              <FolderGit2
                                className="size-3.5 shrink-0 text-accent"
                                aria-hidden="true"
                              />
                            )}
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Tile>
          );
        })}
      </div>
    </Section>
  );
}
