<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RedPear Dashboard

Frontend for the RedPear dashboard, built from Figma designs.

## Stack (decided 2026-08-28)

- Next.js 16.3.3 (App Router, Turbopack), React 19.2.8, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config` — theme lives in CSS via `@theme`)
- `src/` directory, import alias `@/*`
- **Components are hand-built from the Figma.** No shadcn/ui, no Radix, no component library.
  We own the markup, styling, and accessibility/keyboard behavior for every primitive
  (buttons, inputs, tables, dropdowns, dialogs, tabs).

## Figma source

File: `RedPear--Personal-Copy-` — key `2fDOIcwXWFZn2BQtEO7dAV`
Access is via the **claude.ai Figma MCP connector** (OAuth). No personal access token is needed
or stored in this repo.

Base URL for a node:
`https://www.figma.com/design/2fDOIcwXWFZn2BQtEO7dAV/RedPear--Personal-Copy-?node-id=<NODE>&m=dev`

### Phase 1 — Dashboard home (7 frames) — **implemented**

Frame names and sizes read from the Figma API, which corrects the guesses made before the
designs were readable:

| Node ID       | Figma name                     | Size     | What it actually is              |
| ------------- | ------------------------------ | -------- | -------------------------------- |
| `20875-28900` | Dashboard                      | 1440×900 | Desktop, sidebar **expanded**    |
| `20875-29290` | Dashboard                      | 1440×900 | Desktop, sidebar **collapsed**   |
| `20875-29653` | Dashboard                      | 1440×900 | Desktop + notifications popover  |
| `20875-30099` | Dashboard Mobile               | 402×1742 | Mobile, **full page**            |
| `20875-30352` | Dashboard Mobile(Collapsed)    | 402×888  | Mobile, **viewport crop** of ↑   |
| `20875-30605` | Top Nav Mobile(Collapsed)      | 402×888  | Mobile + account menu open       |
| `20875-30893` | Notifications Mobile(Collapsed)| 402×888  | Mobile + notifications open      |

Two things worth knowing:

- `30099` and `30352` are **the same screen**, not two nav states — one is the full artboard,
  the other is cropped to a phone viewport. There is no mobile "expanded/collapsed nav".
- "Collapsed" in the mobile frame names refers to that viewport crop, not to any nav state.

So the seven frames are **three states of one shell** (sidebar expanded/collapsed, notifications,
account menu) over **one page** — which is how it is built.

### Measured shell metrics

Sidebar 236px expanded / 79px collapsed · top bar 57px · content padding 18/24/20/24 · grid gap
16px. Desktop content grid is 1156px across three columns in a 548 : 279 : 297 ratio; the recent
claims card spans the first two.

### Known deviations from the frames

- **Collapsed sidebar has an expand button.** The Figma collapsed frame shows no way back to the
  expanded state. A toggle was added or the state would be a dead end.
- **Collapsed sidebar shows a dot badge on Claims.** The frame drops the "87" entirely when
  collapsed; a dot preserves the signal without the label.
- **Notification count.** The desktop frame's header reads "4 new" but only two items carry an
  unread dot, and the mobile frame reads "2 new". The count is derived from the data (2).
- **Tasks card reads "2 of 5 done" over four visible rows.** Kept as authored — the list is
  truncated, so the summary legitimately counts more than is shown. It does not recompute when
  a box is ticked.

### Where the code lives

`src/components/layout/` is the shell (sidebar, top bar, mobile header + tab bar, notifications
panel, `DashboardShell` holds the nav state). `src/components/dashboard/` is one file per card.
`src/lib/data.ts` holds every string and figure transcribed from the frames — swap it for real
API calls without touching components. Nav icons in `src/components/icons/figma-icons.tsx` were
exported from Figma and recoloured to `currentColor`; the generic ones are hand-drawn to match.

### Phase 2 — remaining 10 frames (not started)

`20875-33493`, `20875-33812`, `20875-31762`, `20875-32146`, `20875-31238`,
`20875-31629`, `20875-32342`, `20875-32812`, `20875-33178`, `20875-33328`

## Working notes

- Next.js 16 differs from older training data — read `node_modules/next/dist/docs/` before
  reaching for an API you remember from Next 13/14.
- Pull real values (colors, spacing, type scale) from Figma into the Tailwind `@theme` block in
  `src/app/globals.css` rather than hardcoding hex values in components.
