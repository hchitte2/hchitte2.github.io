import { SkillIcon } from "@/components/skill-icon";

/** Dotted bullet list shared by Experience and Projects. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 before:absolute before:left-0.5 before:top-[0.6em] before:size-1.5 before:rounded-full before:bg-muted-foreground/30"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Small muted tech line under an entry, each name with its logo. */
export function StackLine({ items }: { items: string[] }) {
  return (
    <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="inline-flex items-center gap-1">
          <SkillIcon name={item} className="size-3" />
          {item}
        </li>
      ))}
    </ul>
  );
}
