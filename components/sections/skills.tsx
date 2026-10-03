"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, FolderGit2 } from "lucide-react";
import { Section } from "@/components/section";
import { SkillIcon } from "@/components/skill-icon";
import { skills, experience, projects } from "@/lib/data";
import { cn } from "@/lib/utils";

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

export function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="skills" title="Skills">
      <div className="space-y-4">
        {skills.map((group) => {
          const activeName = group.items.includes(selected ?? "") ? selected : null;
          const activeUsage = activeName ? usageMap.get(activeName) ?? [] : [];

          return (
            <div key={group.group} className="grid gap-x-6 gap-y-2 sm:grid-cols-[9rem_1fr]">
              <h3 className="pt-1 text-xs text-muted-foreground">{group.group}</h3>
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((name) => {
                    const count = usageMap.get(name)?.length ?? 0;
                    const isSelected = selected === name;
                    return (
                      <button
                        key={name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelected((current) => (current === name ? null : name))}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs transition-colors duration-150",
                          isSelected
                            ? "bg-accent text-background"
                            : "bg-muted text-foreground/80 hover:text-foreground"
                        )}
                      >
                        <SkillIcon name={name} className="size-3" />
                        {name}
                        {count > 0 && (
                          <span
                            className={cn(
                              "text-[10px] tabular-nums",
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
                      <div className="mt-2.5 border-l-2 border-accent/40 pl-3">
                        <p className="text-xs text-muted-foreground">
                          {activeName} · used in {activeUsage.length}{" "}
                          {activeUsage.length === 1 ? "place" : "places"}
                        </p>
                        <ul className="mt-1.5 space-y-1">
                          {activeUsage.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                              {item.type === "experience" ? (
                                <Briefcase className="size-3 shrink-0 text-accent" aria-hidden="true" />
                              ) : (
                                <FolderGit2 className="size-3 shrink-0 text-accent" aria-hidden="true" />
                              )}
                              {item.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
