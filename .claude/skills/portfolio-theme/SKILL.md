---
name: portfolio-theme
description: Use when adding or restyling any section, component, or content in this portfolio so it matches the existing design system
---

# Portfolio theme

Read `CLAUDE.md` at the project root first — it's the source of truth for tokens, type scale,
spacing, component rules, motion rules, and copy rules. This skill just reinforces how to apply
it while making a change.

## Workflow

1. Read `CLAUDE.md`.
2. If the change involves copy (a new job, project, or skill), edit `lib/data.ts`, not the
   component. Section components should stay copy-free.
3. If the change involves styling, reuse the existing scale from `CLAUDE.md` — don't invent a
   new font size, spacing value, or color. If nothing in the scale fits, that's a sign to stop
   and check with the user rather than freelancing a one-off value.
4. Colors: only the mapped Tailwind classes (`bg-background`, `text-foreground`,
   `text-muted-foreground`, `border-border`, `text-accent`, `bg-accent-soft`, `bg-muted`). Never
   a raw hex or an arbitrary `bg-[#...]` class.
5. No box-shadows, no gradients, no hover translate/scale. Hover is color/border/background only,
   150–200ms.
6. Any animation beyond the existing `<FadeIn>` wrapper or the hero's stagger must call
   `useReducedMotion()` and respect it.
7. Reuse `Button` / `Badge` / `Card` from `components/ui/` instead of ad-hoc styled `<div>`s.
8. Keep copy sentence case, no ALL-CAPS, no emoji, bullets start with a verb.

## Before finishing

Run the checklist at the bottom of `CLAUDE.md`: build passes, no hardcoded copy, no arbitrary
colors, mobile stays single-column, keyboard focus stays visible.
