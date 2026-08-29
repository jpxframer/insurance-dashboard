<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Surebase Dashboard

Frontend for the Surebase Insurance dashboard, built from Figma designs.

## Stack (decided 2026-08-28)

- Next.js 16.3.3 (App Router, Turbopack), React 19.2.8, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`, no `tailwind.config` — theme lives in CSS via `@theme`)
- `src/` directory, import alias `@/*`
- **Components are hand-built from the Figma.** No shadcn/ui, no Radix, no component library.
  We own the markup, styling, and accessibility/keyboard behavior for every primitive
  (buttons, inputs, tables, dropdowns, dialogs, tabs).

## Figma source

File key: `2fDOIcwXWFZn2BQtEO7dAV` (the file still shows the pre-rename product name
in Figma until it is renamed there — the key is what matters)
Access is via the **claude.ai Figma MCP connector** (OAuth). No personal access token is needed
or stored in this repo.

Base URL for a node:
`https://www.figma.com/design/2fDOIcwXWFZn2BQtEO7dAV/Surebase?node-id=<NODE>&m=dev`
(the URL slug is cosmetic; Figma resolves on the key)

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

### Brand mark

| Node ID       | What                     | Size                           |
| ------------- | ------------------------ | ------------------------------ |
| `22777-843`   | Full lockup              | 32px tile + 8px gap + wordmark |
| `22777-850`   | Mark only, collapsed nav | 32px tile                      |

Built as `components/layout/Logo.tsx`, not an asset: the tile, its gloss and the wordmark are
CSS, so only the logomark glyph is SVG. It is inlined at its native 17.333px box and recoloured
to `currentColor`.

Two notes:

- The frame drops the 17.333px glyph into a 16px clipped box, shaving 1.33px off its right and
  bottom. It is scaled to fit instead — cropping a logomark reads as a bug, not a decision.
- The mark is **blue-600 with the gloss treatment**, i.e. the UI palette. The old brand-red
  token is gone; it was declared but never referenced.

### Measured shell metrics

Sidebar 236px expanded / 79px collapsed · top bar 57px · content padding 18/24/20/24 · grid gap
16px. Desktop content grid is 1156px across three columns in a 548 : 279 : 297 ratio; the recent
claims card spans the first two.

### Overlay components (measured, not eyeballed)

The three overlays have their own component nodes, which carry exact geometry the composed
frames do not. Built from these, verified in-browser via CDP:

| Node ID       | What                      | Size          | Rendered      |
| ------------- | ------------------------- | ------------- | ------------- |
| `20875-30043` | Notifications, desktop    | 314 × 404.52  | 314 × 405.22  |
| `20875-31146` | Notifications, mobile     | 370 × 404.52  | 370 × 404.81  |
| `20875-30858` | Account menu, mobile      | 250 × 284     | 250 × 284     |

The two notification nodes are identical apart from width and badge count, so
`NotificationsPanel` serves both. Details the composed frames hid: the meta line is two fonts
(time in 11.5px Geist, ref in 11px Geist Mono); read rows drop their body text to `#475569`
while unread rows keep `#0f172a`; tiles are 34px holding a 15px glyph; the mobile bell and
avatar are 48px, not 44.

Two rendering notes worth keeping:

- Figma strokes sit *inside* a frame, CSS borders sit *outside* the padding box, so every
  bordered edge sheds 1px of padding to keep the measured heights.
- Geist and Geist Mono on one line union their half-leading, making the 15px meta row render
  at 16px. The margin above it absorbs the difference.

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
panel, `DashboardShell` holds the nav state and the optional page-header slots).
`src/components/dashboard/` is one file per card; `src/components/policies/` is the Policies
screen, with `PoliciesDesktop` owning selection and density so the page stays a server component.
`src/lib/policies.ts` mirrors `data.ts` for that screen.
`src/lib/data.ts` holds every string and figure transcribed from the frames — swap it for real
API calls without touching components. Nav icons in `src/components/icons/figma-icons.tsx` were
exported from Figma and recoloured to `currentColor`; the generic ones are hand-drawn to match.

### Phase 2 — Policies (2 of 10 frames) — **implemented**

| Node ID       | Figma name       | Size     | What it is                       |
| ------------- | ---------------- | -------- | -------------------------------- |
| `20875-31238` | Policies         | 1440×900 | Desktop, table + bulk selection  |
| `20875-31629` | Policies Mobile  | 402×958  | Mobile, card list                |

One list at two breakpoints: a nine-column table on desktop, stacked cards on
mobile. Both frames supply **their own page header** — neither carries the
dashboard's greeting bar, and the desktop frame drops the notifications bell
entirely — so `DashboardShell` grew optional `topBar` and `mobileHeader` slots.
Pass neither and the dashboard renders exactly as before.

Measured geometry, verified in-browser via CDP:

- Desktop table grid `40px 104px 1.5fr 104px 1.2fr 88px 92px 1fr 116px`, 10px
  gutters, 18px side padding. The three `fr` columns resolve to 200.3 / 160.2 /
  133.5 at 1440.
- Header row and body rows are 36px; the card fills the viewport so its footer
  pins to the bottom (measured bottom 884 = 900 − 16px page padding).
- Mobile: header 183.5px (frame 183), cards 370×107.2 on a 114px pitch (frame
  106/114), content starting at 197.5 (frame 197).

Remaining 8 frames: `20875-33493`, `20875-33812`, `20875-31762`, `20875-32146`,
`20875-32342`, `20875-32812`, `20875-33178`, `20875-33328`.

### Two things this screen taught

- **Line height is not `normal`.** Tailwind v4 gives an arbitrary `text-[13px]`
  a **1.5** line-height, and CSS `line-height: normal` resolves to **1.333** for
  Geist because it counts the font's line gap. Figma derives its text box from
  ascender+descender and lands near **1.21**. Left alone, every row grew 3-5px
  and compounded down the toolbar. `.leading-figma` in `globals.css` pins the
  ratio; set it on a subtree root and the page inherits it.
- **Read the exported SVG before drawing an icon.** "Columns" is three centred
  rules of decreasing width, not the sliders-with-knobs it resembles at 13px.
  The exports also disagree on stroke ratio per glyph, so each is authored at
  its native box in `figma-icons.tsx` rather than scaled from a sibling.

### Policies deviations from the frames

1. **Comfortable density is invented.** Only Compact is drawn (36px rows); the
   toggle is real and Comfortable is 44px.
2. **Tabs and filters do not filter.** They carry their designed states only —
   no frame defines a result set, and "Renewals this month 64" cannot be
   honoured by ten mock rows.
3. **Pagination arrows are drawn.** The frame sets them as Segoe UI text
   glyphs (`←`/`→`) with no export.
4. **Checked and unchecked boxes are both 17px.** The frame draws checked at
   15px and unchecked at 17px, which would jitter the row by 2px on click.
5. **Export and New policy are both 36px tall.** The frame has them at 36 and
   34; at equal heights they align optically.
6. **The mobile header scrolls** rather than pinning like the dashboard's — at
   183px a pinned header would take a fifth of the viewport.

## Working notes

- Next.js 16 differs from older training data — read `node_modules/next/dist/docs/` before
  reaching for an API you remember from Next 13/14.
- Pull real values (colors, spacing, type scale) from Figma into the Tailwind `@theme` block in
  `src/app/globals.css` rather than hardcoding hex values in components.
