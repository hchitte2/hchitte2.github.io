# Portfolio — design system & conventions

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript, strict mode
- Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.js` — theme lives in `app/globals.css`)
- shadcn-style primitives in `components/ui/` (Button, Badge, Card)
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

`--background` is the page ground; `--surface` is what tiles/cards sit on, so they read as raised
without any shadow. Never put a tile on `bg-background` — that's what made the old design look
flat.

**Accent budget.** The accent is load-bearing, not decorative: section heading dot, company /
school names, bullet en-dashes, stat values, group icons, selected skill pill (`bg-accent` with
`text-background`), the active nav chip, and hover states on interactive tiles. Body copy stays
`text-muted-foreground`.

## Type scale (as used on the page)

| Element | Classes |
|---|---|
| Hero name (h1) | `text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight` |
| Hero intro | `text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl` |
| Section heading (h2) | `text-2xl md:text-3xl font-semibold tracking-tight` |
| Tile title | `text-base md:text-lg font-semibold` |
| Body / bullets | `text-[15px] leading-relaxed text-muted-foreground` |
| Meta / period / small | `text-xs` (add `tabular-nums` for dates) |

Layout: container is `max-w-5xl` with `px-6 md:px-8`, shared by `<main>`, `<footer>`, and the nav
bar so everything aligns. Section vertical rhythm is `py-16 md:py-20` — set once in
`components/section.tsx` and not overridden per-section; don't add extra top/bottom margin to an
individual section's wrapper.

## Bento layout

Every section body is a bento grid of tiles, not a flat list:

- Grid is `grid gap-4 md:grid-cols-2`; the first/featured item takes `md:col-span-2`
  (Experience's most recent job, the first project, the contact email).
- Tiles are `<Tile>` from `components/ui/tile.tsx` — `rounded-lg border border-border bg-surface
  p-6 md:p-7`. Pass `interactive` for linked tiles to get the hover treatment
  (`hover:border-accent/50 hover:bg-accent-soft/25`).
- Tiles in a row stretch to equal height, so give each one `flex h-full flex-col` and push the
  badge row to the bottom with `mt-auto`. That's what keeps uneven bullet counts from leaving
  ragged dead space.
- Mobile is always a single column (`grid-cols-1` by default, `md:` adds the second).

### `<Section>` and the subtitle prop

`components/section.tsx` renders `title` (`text-xl font-semibold tracking-tight`), then an
optional `subtitle` (`text-sm text-muted-foreground`, `mt-1`) directly under it, then a `mt-4 mb-8
border-t border-border` divider, then `children`. Every section (`Experience`, `Education`,
`Projects`, `Skills`, `Contact`) accepts its own optional `subtitle` prop and forwards it to
`<Section>` — the actual subtitle strings are passed in from `app/page.tsx`, not hardcoded in the
section file, same as the "no hardcoded copy" rule above.

### The single left edge rule

The left edge of every section's heading, its subtitle, its divider, and the left border of every
tile land on the same x-position — the container's inner edge (after `px-6`/`px-8`). Nothing in a
section body gets its own extra left padding or negative margin; indentation happens *inside* a
tile (via the tile's own padding), never outside it.

Bullets use `relative pl-4 before:absolute before:left-0 before:text-accent before:content-['–']`
so the en-dash sits on the text block's own left edge rather than floating in a gutter.

## Component rules

- Use `Button`, `Badge`, `Tile`, `Card` from `components/ui/` instead of ad-hoc `<div>`s styled
  inline. `Tile` is the bento surface and the default container for section content; `Card` is the
  older flat primitive, kept for anything that shouldn't read as a bento tile.
- Badge variants: `default` (bg-muted — project stack tags), `outline` (border only — experience
  and coursework tags), `accent` (bg-accent-soft, text-accent — an explicit "active" state).
- Border radius always comes from `--radius` (Tailwind's `rounded-*` scale, which is themed off
  it) — never a one-off radius value.
- No `box-shadow` anywhere. No gradients.
- Icons are `lucide-react`, `size-4` inline next to text, `size-5` for section-level icons.
- Badge rows all use `gap-2`. Static tags use the default Badge size (`px-2.5 py-0.5 text-xs`);
  the Skills pills are interactive buttons so they get a larger tap target
  (`px-3 py-1 text-[13px]`).
- Nav (`components/nav.tsx` + `components/nav-links.tsx`): a compact tab bar — links sit in a
  `rounded-full border border-border px-1 py-1` container, each link is a `rounded-full px-3 py-1
  text-sm` chip. `NavLinks` is the only client component in the nav; it uses an
  `IntersectionObserver` (with a `-45% 0px -50% 0px` root margin, so it fires near the vertical
  center of the viewport) to track which section is current and gives that chip's link `bg-muted
  text-foreground`. On mobile the chip row scrolls horizontally (`overflow-x-auto`) with the
  scrollbar hidden via the `.no-scrollbar` utility in `app/globals.css`.

## Motion rules

- Bento tiles animate through `components/reveal.tsx`: wrap the grid in `<RevealGrid>` and each
  tile in `<RevealItem>`. Tiles spring in (opacity + 14px rise, `stiffness: 260, damping: 26`)
  with a `0.06s` stagger. `<RevealGrid trigger="load">` fires immediately (hero); the default
  `"scroll"` waits for `whileInView` with `once: true`.
- Section headers use the shared `<FadeIn>` wrapper (`components/fade-in.tsx`): opacity + 6px
  rise, `whileInView`, `once: true`. `<Section>` already applies it — don't nest another.
- Both wrappers already handle `useReducedMotion` (they skip the initial state entirely), so
  prefer them over hand-rolling a new `motion.div`.
- Any new animation must call `useReducedMotion()` and no-op (or reduce to an instant/0ms
  transition) when it's true.
- No hover translate or scale, anywhere. Hover states are color/border/background only.
- Transitions run 150–200ms.

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
renders the "Relevant coursework" block only when it's non-empty).

**Add a project** — append to `projects`: `name`, `points` (string array, 2–3 bullets, verb-first,
one line each where possible), `stack`, and optionally `href`. `href` is optional — if the project
has no public link, omit the key entirely (don't set it to `""`).
`components/sections/projects.tsx` only renders the title as a link when `href` is present, and
cards use a masonry column layout so bullet count doesn't need to match across cards.

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
- [ ] Mobile layout (< `md`) is still single-column, and no bento tile overflows horizontally
- [ ] New tiles use `<Tile>` on `bg-surface`, with `flex h-full flex-col` + `mt-auto` on the
      bottom row so equal-height rows don't leave dead space
- [ ] Keyboard focus is visible on any new interactive element (relies on the global
      `:focus-visible` outline in `app/globals.css` — don't override it with `outline-none`)
