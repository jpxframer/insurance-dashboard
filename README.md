# Surebase Insurance — Dashboard

Frontend for the **Surebase Insurance** operations dashboard: policies, claims and renewals.
Built from Figma designs, screen by screen.

There is no backend. Every string and figure is mock data in `src/lib/`, kept in one place per
screen so it can be swapped for real API calls without touching a component.

## Stack

- **Next.js 16** (App Router, Turbopack) · React 19 · TypeScript
- **Tailwind CSS v4** — no `tailwind.config`; the theme lives in an `@theme` block in
  `src/app/globals.css`
- `src/` layout with the `@/*` import alias

**Every component is hand-built from the designs.** No shadcn/ui, no Radix, no component
library — the markup, styling and keyboard/accessibility behaviour of every primitive (buttons,
inputs, tables, dropdowns, popovers, tabs) is owned here.

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>. The dev server binds to all interfaces, so it also prints a
LAN address you can open on a phone to check the mobile breakpoint on real hardware.

```bash
npm run build   # production build
npm run lint    # eslint
npx tsc --noEmit  # type-check
```

## Screens

| Route       | Status | Notes                                                          |
| ----------- | ------ | -------------------------------------------------------------- |
| `/`         | Built  | Dashboard home — stats, revenue trend, claims, renewals, tasks   |
| `/policies` | Built  | Policy table with bulk selection on desktop, card list on mobile |

Both are responsive implementations of a desktop and a mobile design, not separate pages.
Remaining screens (claims, customers, analytics, inbox, settings) are routed in the nav but not
yet implemented.

## Layout

```
src/
  app/
    layout.tsx      Fonts and metadata
    globals.css     Design tokens — brand colour, shell metrics, shadows, utilities
    page.tsx        Dashboard home
    policies/       Policies screen
  components/
    layout/         The shell: sidebar, top bar, mobile header, tab bar, notifications.
                    DashboardShell owns nav state and takes optional per-page header slots,
                    so pages can stay server components.
    dashboard/      One file per dashboard card
    policies/       Policies table, toolbar, bulk bar and mobile cards
    ui/             Card, StatusPill, Sparkline, AreaChart
    icons/          Glyphs exported from the designs, plus hand-drawn matches
  lib/              Mock data, nav config and the small hooks the popovers need
```

## Working on this

Two project documents carry the detail:

- **`MEMORY.md`** — current state, what is done, what is next, and the gotchas already hit.
- **`AGENTS.md`** — per-screen notes: the design nodes each screen came from, measured
  geometry, and every deliberate deviation from the designs with its reasoning.

Layout work is verified by measuring in a real browser rather than by eye — the notes explain
why, and how.

## Naming

The product was previously called RedPear. The rename to Surebase is done across the code,
the package, the page metadata and these documents.

Two things still carry the old branding and are waiting on new artwork:

- **The logo** (`public/brand/redpear-logo.svg`) is an outlined SVG that draws the old name, so
  it cannot be renamed — only replaced. It is referenced from the sidebar and the mobile header.
- **The Figma file** still displays the old product name; only its key is used in code.
