# Hemakshi Chitte — Portfolio

Single-page portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, shadcn-style components (Radix), and Framer Motion.

## Setup

Option A — use this folder as-is:

```bash
npm install
npm run dev
```

Option B — scaffold fresh and copy the files in:

```bash
npx create-next-app@latest hemakshi-portfolio --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*"
cd hemakshi-portfolio
npx shadcn@latest init -d
npx shadcn@latest add button badge card
npm install framer-motion geist lucide-react
# then copy app/, components/, lib/ and public/ from this project over the generated ones
```

## Resume

Put your PDF at `public/Hemakshi_Chitte_Resume (1).pdf`. The Download Resume button points to that exact filename.

## Editing content

All copy lives in `lib/data.ts` — experience, projects, skills, and links. Update your LinkedIn URL there.

## Structure

```
app/
  layout.tsx        fonts (Geist), metadata
  page.tsx          section order
  globals.css       theme tokens (light + .dark), Tailwind v4
components/
  nav.tsx           sticky top nav
  section.tsx       shared section wrapper
  fade-in.tsx       subtle in-view fade (respects reduced motion)
  sections/         hero, experience, projects, skills, contact
  ui/               button, badge, card (shadcn style)
lib/
  data.ts           all content
  utils.ts          cn()
```

## Dark mode

Add `class="dark"` to `<html>` in `app/layout.tsx` to switch to the zinc dark theme, or wire it to `next-themes` if you want a toggle.
