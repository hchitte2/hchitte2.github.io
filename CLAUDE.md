# Portfolio — design system & conventions

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript, strict mode
- Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — theme lives in `app/globals.css`)
- shadcn-style primitives in `components/ui/` (Button, Badge, Card — currently unused by the
  page, kept for future use)
- Framer Motion for animation
- lucide-react for icons
- Geist font (sans + mono), loaded via `next/font` in `app/layout.tsx`

## Where content lives

Everything editable — copy, roles, project bullets, skill lists — lives in `lib/data.ts`:
`profile`, `experience`, `education`, `projects`, `skills`.

Components in `components/sections/` render that data. They must not contain hardcoded copy —
if you're editing a string inside a section component (other than a UI label like "Used in"),
it probably belongs in `lib/data.ts` instead.

## Theme tokens

All color is CSS variables defined in `app/globals.css`, light in `:root`, dark in `.dark`:

| Token | Light | Dark |
|---|---|---|
| `--background` | `#f6f6f4` | `#09090b` |
| `--foreground` | `#18181b` | `#f4f4f5` |
| `--surface` | `#ffffff` | `#121214` |
| `--muted` | `#f1f1f0` | `#18181b` |
| `--muted-foreground` | `#6b6b73` | `#a1a1aa` |
| `--border` | `#e3e3e0` | `#27272a` |
| `--accent` | `#0f766e` | `#2dd4bf` |
| `--accent-soft` | `#ccfbf1` | `#134e4a` |
| `--radius` | `0.75rem` | (same) |

Components use only the Tailwind classes mapped from these tokens: `bg-background`,
`bg-surface`, `text-foreground`, `text-muted-foreground`, `border-border`, `text-accent`,
`bg-accent-soft`, `bg-muted`. **No raw hex values and no arbitrary color classes (`bg-[#...]`) in
components.** Opacity modifiers on tokens (`border-accent/40`, `bg-accent-soft/25`) are fine.

`--background` is the page ground. `--surface` is defined but the current single-column layout
doesn't use raised surfaces.

## Type scale (as used on the page)

| Element | Classes |
|---|---|
| Name (h1) | `text-2xl font-semibold tracking-tight` |
| Role line | `text-sm text-muted-foreground` |
| Intro | `text-base md:text-[17px] leading-relaxed text-muted-foreground max-w-3xl` |
| Section heading (h2) | `text-lg font-semibold tracking-tight` + `border-b border-border pb-2.5` |
| Entry title (company, project) | `text-base font-medium` |
| Role / degree | `text-sm font-medium` |
| Bullets | `text-sm leading-relaxed text-muted-foreground` |
| Dates | `font-mono text-xs tabular-nums text-muted-foreground`, right-aligned |
| Meta, stack line, skill chips | `text-xs` |

## Layout

The page is a single-column, resume-style document modelled on rsanandres.com: no cards, no
tiles, no grids of boxes. Structure, top to bottom:

1. **Nav** — name on the left; plain text links (Experience, Projects, Skills, Education, Contact)
   and the theme toggle on the right.
2. **Hero** — name with small GitHub / LinkedIn / résumé icon links beside it, role line, intro.
3. **Experience** — per job: company, location, then role (left) and mono date (right), dotted
   bullets, stack line.
4. **Projects** — per project: name with a GitHub icon link (only when `href` exists), dotted
   bullets, stack line.
5. **Skills** — a `sm:grid-cols-[9rem_1fr]` grid: muted category label left, chips right.
6. **Education** — degree (left) and mono date (right), school · location, a coursework line.
7. **Footer** — Now playing strip, then copyright left and Email / GitHub / LinkedIn right. There
   is no Contact section; the nav's Contact link is a `mailto:`.

- Container is `max-w-4xl` with `px-6 md:px-8`, shared by nav, `<main>`, and footer.
- Sections use `<Section>` (`components/section.tsx`) for the heading + rule and `py-8 md:py-10`
  rhythm; don't add per-section margins. There is no subtitle prop.
- Everything sits on one left edge: the container's inner edge. Nothing gets extra left padding
  except bullet text, which is indented past its dot.
- Experience and Projects share `<Bullets>` and `<StackLine>` from `components/entry.tsx` so the two
  sections stay identical; change them there, not per section.
- Mobile is the same single column; right-aligned dates drop under the title via `flex-wrap`, and
  the nav links scroll horizontally (`.no-scrollbar`).

## Component rules

- Bullets are a small dot (`before:size-1.5 before:rounded-full before:bg-muted-foreground/30`),
  not dashes.
- Skill chips are `rounded-md bg-muted px-2 py-1 text-xs` buttons with a logo, the usage count, and
  a selected state of `bg-accent text-background`; clicking one opens its "used in" list under that
  row.
- Border radius always comes from `--radius` (Tailwind's `rounded-*` scale). No `box-shadow`, no
  gradients.
- Icons are `lucide-react` (or `simple-icons` logos via `<SkillIcon>`), `size-4` for links next to
  text and `size-3` inside chips and stack lines.
- The accent is used sparingly: selected skill chip, the "used in" list's rule and icons. Text
  stays foreground / muted-foreground.
- Nav (`components/nav.tsx` + `components/nav-links.tsx`): `NavLinks` uses an
  `IntersectionObserver` (`-45% 0px -50% 0px` root margin) to colour the current section's link
  `text-foreground`; the rest are `text-muted-foreground`.

## Dark mode

`components/theme-toggle.tsx` toggles the `dark` class on `<html>` and saves `"light"` / `"dark"`
to `localStorage.theme`. An inline script in `app/layout.tsx` applies the saved choice (or the
system preference if nothing is saved) **before first paint**, so there's no light flash; that's
why `<html>` has `suppressHydrationWarning`. The `.dark` token values in `app/globals.css` are the
whole dark theme — use token classes and it works in both modes.

## Motion rules

- Sections fade in through `<FadeIn>` (`components/fade-in.tsx`: opacity + 6px rise,
  `whileInView`, `once: true`), applied once inside `<Section>` and the hero. Don't nest another.
- `<FadeIn>` already handles `useReducedMotion`. Any new animation must call `useReducedMotion()`
  and no-op when it's true.
- No hover translate or scale. Hover states change color only, over 150ms.

## Copy rules

- Sentence case everywhere — no ALL-CAPS labels, no title case headings.
- No "Step 1:" style prefixes.
- No emoji.
- Bullet points (experience `points`) start with a verb ("Built…", "Designed…", "Integrated…").

## How to add things

**Add a job** — append to `experience` in `lib/data.ts`: `company`, `role`, `period`, `location`,
`points` (string array, each starting with a verb), `stack` (string array). Stack strings should
match skill names in the `skills` array (e.g. use `"React"`, not `"React.js"`) so the Skills
section's usage counts pick it up.

**Add a degree** — append to `education`: `degree`, `school`, `location`, `period`, `courses`
(string array — pass `[]` if there's nothing relevant to list; `components/sections/education.tsx`
renders the coursework line only when it's non-empty).

**Add a project** — append to `projects`: `name`, `points` (string array, 2–3 bullets, verb-first,
one line each where possible), `stack`, and optionally `href`. `href` is optional — if the project
has no public link, omit the key entirely (don't set it to `""`).
`components/sections/projects.tsx` only shows the GitHub icon link when `href` is present; omit
`href` for projects that shouldn't link anywhere.

**Add a skill** — add the string to the right group in `skills` (`Languages`, `Frontend`,
`Backend & DevOps`, `AI Development`, or `Cloud & Tools`). Also add a matching string to at least
one `experience` or `projects` `stack` array, or it will show with a zero count in the Skills
section (still valid, just worth knowing).

**Skill and stack icons** — every skill pill and stack tag renders `<SkillIcon name=…>` from
`components/skill-icon.tsx`, looked up by the **exact** string in `lib/data.ts`. When you add a
new skill or stack name, add it there too: to `BRANDS` (a `si…` logo from `simple-icons`) if the
brand exists, otherwise to `GENERIC` (a descriptive lucide icon). Unmapped names fall back to a
neutral box. Icons are single-colour (`currentColor`), never brand colours, so they follow the
theme and the pill's selected and hover states.

## Now playing

The footer strip shows current/last listening, read from **Last.fm** (tracks are scrobbled there
from YouTube Music — there's no YouTube Music API involved).

- Env vars: `LASTFM_API_KEY` and `LASTFM_USERNAME` — in `.env.local` locally, and as Actions
  secrets on the GitHub repo for deploys.
- `app/api/now-playing.json/route.ts` is the **only** place the API key is used. Because the site
  is a static export, this route runs **once per build** (`dynamic = "force-static"`, fetch with
  `cache: "force-cache"` — `no-store` makes the build bail out) and is written to
  `out/api/now-playing.json`. The key never reaches the browser.
- Freshness comes from the deploy workflow rebuilding every 30 minutes, not from the route. Since
  a snapshot can be that stale, the route always reports `isPlaying: false`; a track caught
  mid-play is recorded as last played at build time. The equalizer branch in the component is
  kept for a future live backend but doesn't render on Pages.
- **Never log errors in this route.** Fetch errors embed the request URL, which contains the API
  key, and Actions logs on a public repo are public.
- The route never throws: missing env vars, a failed request, or an empty response all return
  `{ isPlaying: false, title: null }`, and `components/now-playing.tsx` **renders nothing** when
  `title` is null. Album art is dropped unless it's on a `*.freetls.fastly.net` host.

## Hosting

Deployed to **GitHub Pages** at https://hchitte2.github.io from the `hchitte2/hchitte2.github.io`
repo. `.github/workflows/deploy.yml` builds and deploys on every push to `main`, every 30 minutes
(for the Last.fm snapshot), and on manual dispatch.

- `next.config.ts` sets `output: "export"`, so everything must be statically renderable: no
  per-request route handlers, no server actions, no middleware, no ISR `revalidate`.
- `images.unoptimized: true` is required — there's no image optimizer on a static host.
- It's a user site (repo named `<user>.github.io`), so it's served from the domain root and needs
  no `basePath`. Renaming the repo would break every asset path until `basePath` is added.

## Before finishing any task

- [ ] `npm run build` passes with zero type errors
- [ ] No hardcoded copy added to a component under `components/sections/` — it's in `lib/data.ts`
- [ ] No raw hex or arbitrary color classes — only the mapped token classes
- [ ] At 375px wide the page doesn't scroll sideways
- [ ] Checked in both light and dark mode (toggle in the nav)
- [ ] Keyboard focus is visible on any new interactive element (relies on the global
      `:focus-visible` outline in `app/globals.css` — don't override it with `outline-none`)
