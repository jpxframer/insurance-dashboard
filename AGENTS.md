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
| `22777-843`   | Full lockup              | 32px tile + 8px gap + 24px wordmark |
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
`src/components/customers/` is the Customers list and detail, sharing one `customers.ts`.
`src/components/claims/` is the Claims screen — the queue rail, the detail cards (each taking a
`variant` since the two frames differ in more than size) and the mobile-only summary and action
bar. `src/lib/policies.ts` and `src/lib/claims.ts` mirror `data.ts` for those screens; Claims
reuses `ClaimStatus` and `StatusPill` from the dashboard rather than redeclaring them.
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

Remaining 2 frames: `20875-33493`, `20875-33812`.

### Phase 2 — Customers (8 of 10 frames) — **implemented**

| Node ID       | Figma name             | Size      | What it is                     |
| ------------- | ---------------------- | --------- | ------------------------------ |
| `20875-32342` | Customers Index        | 1440×900  | List: stat tiles + table       |
| `20875-33178` | Customers Index Mobile | 402×959   | List: cards                    |
| `20875-32812` | Customers              | 1440×900  | Detail: aside + records        |
| `20875-33328` | Customers Mobile       | 402×1207  | Detail: KPI grid + records     |

Two screens at two breakpoints each, so this is the first pair of routes:
`/customers` and `/customers/[id]`. Every row links through, and all ten ids prerender via
`generateStaticParams`.

Measured in-browser:

- List desktop: top bar 57, header row 33, body row 48, grid
  `1.6fr 92 90 56 100 56 72 92 104 16` on 24px gutters.
- List mobile: header 183.5 (frame 183), cards 105.7 on a 113.7 pitch (frame 106 / 114).
- Detail desktop: header 114.7, aside 280, record cards 860, activity/communication 422 each.
- Detail mobile: page 1154 — exactly the frame's 1207 less its 53px status bar — and header
  267.1 against 267.

**Next 16 dynamic routes.** `params` is a promise, and the generated
`PageProps<'/customers/[id]'>` is the type to use — same family as the `LayoutProps<"/">`
already in `layout.tsx`. That type only exists once a build has regenerated
`.next/types/routes.d.ts`, so a stale file makes `tsc` reject a brand-new route with *does not
satisfy the constraint AppRoutes*. Run `npm run build` before believing that error.

### Customers deviations from the frames

1. **Only Marcus Johnson is designed.** Every `/customers/[id]` renders his record.
2. **Locations are invented for five customers.** The mobile list shows a location for the five
   it displays; the other five needed one for their card, so they were written to match.
3. **The row chevron is a hover affordance.** The frame draws it on one row only, which reads as
   a hover state rather than a permanent column.
4. **Comfortable density is invented** (56px rows); only Compact's 48px is drawn.
5. **Tabs, dropdowns and both search fields carry their states but do not filter** — as on the
   other screens.
6. **Elaine Cho's avatar tone differs between frames** — amber on desktop, slate on mobile. The
   desktop tone is used for both.


### Phase 2 — Claims (4 of 10 frames) — **implemented**

| Node ID       | Figma name    | Size      | What it is                          |
| ------------- | ------------- | --------- | ----------------------------------- |
| `20875-31762` | Claims        | 1440x900  | Queue rail + one claim, side by side |
| `20875-32146` | Claims Mobile | 402x1301  | The claim detail alone              |

Unlike Policies, these are **not** the same content at two widths. Desktop pairs a 266px
queue rail with a claim detail; mobile drops the queue entirely and shows only the detail.
The rail starts at the top of the viewport, so the page passes `topBar={null}` and owns
everything right of the sidebar.

Measured in-browser against the frames:

- Queue rail 266 x 900 at x=236; detail header 938 x 98.5; aside 280; left cards 594.
- Mobile page 1248 tall — exactly the frame’s 1301 less its 53px iOS status bar — with the
  four cards at **211 / 238 / 278 / 156.0** against the frame’s 211 / 238 / 278 / 156.125.
- Mobile action bar 402 x 142, fixed above the tab bar.

#### Leading is per-node, not per-file

The Policies frames sat at ~1.21, which is what `.leading-figma` pins. **The Claims mobile
frame does not**: its text boxes measure ~1.33 (a 13.5px title in an 18px box, 12.5px in 16px,
15px in 20px). Cards came out 8-9px short until each of those was given an explicit `leading-`.
Check a frame’s own text-box heights with `get_metadata` before trusting either ratio.

`get_metadata` on a container is the cheap way to do it — it returns exact x/y/w/h per child
without pulling a 100KB tree into context, and it is how the four card heights above were
checked one at a time.

### Claims deviations from the frames

1. **No mobile queue exists.** The mobile frame is the detail with a back arrow, but no mobile
   claims list is designed. The arrow returns to the dashboard.
2. **Only CLM-8241 is designed.** Selecting another queue row moves the highlight; the detail
   stays put. Nothing else has data to show.
3. **Queue filter chips and both search fields carry their states but do not filter** — same
   reason as Policies.
4. **Mobile drops a sentence from the internal note.** That is the frame’s own copy, kept as
   authored, so the note holds its designed three lines.

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
