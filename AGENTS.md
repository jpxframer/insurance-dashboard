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
`src/components/analytics/` is Analytics; its chart primitive is `ui/LineChart.tsx`.
`src/components/claims/` is the Claims screen — the queue rail, the detail cards (each taking a
`variant` since the two frames differ in more than size) and the mobile-only summary and action
bar. `src/components/inbox/` is the Inbox — the desktop list and thread pane, the mobile card list,
and one `InboxTagChip` shared by both.
`src/components/settings/` and `src/components/profile/` are Settings and Profile; both build on
`settings/SettingsCard.tsx` and on `ui/Toggle.tsx`, `ui/SegmentedControl.tsx` and `ui/Field.tsx`,
which the two screens share.
`src/lib/policies.ts`, `src/lib/claims.ts` and `src/lib/inbox.ts` mirror `data.ts` for those
screens; Claims reuses `ClaimStatus` and `StatusPill` from the dashboard rather than
redeclaring them.
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

**Phase 2 is complete — all 10 frames implemented.**

### Phase 2 — Analytics (10 of 10 frames) — **implemented**

| Node ID       | Figma name       | Size      | What it is                       |
| ------------- | ---------------- | --------- | -------------------------------- |
| `20875-33493` | Analytics        | 1440×900  | KPIs, chart, bars, agent table    |
| `20875-33812` | Analytics Mobile | 402×1625  | Same, stacked; agents as cards    |

Desktop is two 1.5 : 1 grid rows under the KPI strip. Mobile stacks everything and turns the
agent table into one card per agent, with its heading outside the cards.

Measured in-browser: desktop top bar 57 and a 272px first row; mobile page **1572 — exactly the
frame's 1625 less its 53px status bar** — with a 130px header against 129.

#### The chart came out of the frame's own exported paths

The two series are exported as SVG `<path>` data, so they were read rather than invented. The
plot is 170 tall with gridlines at y = 10 / 60 / 110 / 160; the premium band occupies y 34–120
and claims y 112–148, both 13 points on one shared scale. `lib/analytics.ts` stores the values
in **the frame's plot units** (0 on the baseline, 170 at the top) so the curve is reproduced
exactly, and `ui/LineChart.tsx` plots `y = height − value` with no rescaling.

`LineChart` is a new primitive rather than a change to `AreaChart`: the frame's series are bare
1.93px strokes with no fill, where `AreaChart` fills a single series under its curve.

Bar fills across both bar cards, in order: blue-600, blue-400, slate-400, amber-500, slate-300.

### Analytics deviations from the frames

1. **The mobile tab bar highlights nothing.** Analytics is not one of the five mobile tabs — it
   lives in the account menu — and the frame highlights *Home* while showing the Analytics
   screen, which would be actively misleading. `activeId="analytics"` leaves no tab lit instead.
   The frame's back arrow returns to the dashboard.
2. **The range switch and Export do not filter or export.** Both carry their designed states
   only; no frame defines a second range.
3. **Chart values are plot units, not currency.** The frame exports a shape, not a dataset, so
   there are no underlying dollar figures to store — only the curve. Swapping in real data means
   giving `LineChart` a domain and scaling to it.


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
6. **Only the mobile header's title row pins**, not the whole header. The frame
   puts all 183px in normal flow, which would cost a fifth of the viewport if
   pinned; the title row alone is 74px. See *Pinned mobile headers* below.

### Phase 3 — Inbox (2 frames) — **implemented**

| Node ID       | Figma name   | Size      | What it is                          |
| ------------- | ------------ | --------- | ----------------------------------- |
| `22780-917`   | inbox        | 1440×900  | Message list + one open thread      |
| `22780-1226`  | Inbox Mobile | 402×856   | The message list alone, as cards    |

Like Claims, these are **not** the same content at two widths. Desktop is three columns —
sidebar 236, message list 361, thread 843 — and mobile drops the thread entirely, turning the
same five messages into cards. The list starts at the top of the viewport, so the page passes
`topBar={null}` and owns everything right of the sidebar.

Measured in-browser against the frames, all exact:

- Columns 236 / 361 / 843 at x = 0 / 236 / 597; list header 79; thread header 87.
- List rows **114 / 112 / 110 / 93 / 93**, counting each row's own 1px top rule. The rules sit
  between rows (four for five rows, none under the last), with the container's own rule above
  the first — so the row heights land on the frame without a stray line at the foot.
- Bubbles 199.28 and 94.33 against the frame's 199.6 and 94.46; composer 100.
- Mobile header stack **169**, cards **126 / 126 / 124 / 64 / 64** on 8px gaps, page 804 —
  the frame's 856 less its 53px status bar, plus 1.

#### What the two frames disagree about, and where that lives

The desktop row and the mobile card are not the same component with a breakpoint. Rather than
reconcile them, `lib/inbox.ts` carries the difference:

- `preview` is the desktop snippet, `mobilePreview` the card's. Three messages word them
  differently, and the two **read** messages drop the line entirely on mobile — hence optional.
- Avatars exist only on mobile; desktop rows are name-first with no tile.
- A read card also sheds its shadow and its dot. A read *row* only changes colour.

#### Leading is explicit here, not `.leading-figma`

These frames measure ~1.28–1.33, not the 1.21 that `.leading-figma` pins — the same trap the
Claims mobile frame set. Every text node carries its own `leading-`, read off the frame's text
boxes with `get_metadata`. Two that matter: the list's name line is **17px normally but 14px on
the rows that carry an unread dot**, because the frame hangs the dot off the name rather than
setting it beside it, which pulls the line box in; and the thread bubbles run `leading-[20.93px]`
on 13.5px copy with 20.8px between paragraphs.

Three glyphs were exported and added to `figma-icons.tsx` at their native boxes: `PaperclipIcon`
(13), `SparkleIcon` (12, filled) and `SystemDotIcon` (15, a dot in a dashed ring, the System
sender's stand-in for initials). The frame's 15px search glyph is byte-identical to the existing
`SearchSmallIcon`, so that one is reused rather than re-exported.

### Inbox deviations from the frames

1. **Only Marcus Johnson's thread is designed.** The other four were written so that opening a
   message leads somewhere; see *The mobile thread view* below. Selection comes from the URL,
   not local state.
2. **No mobile thread was designed.** One was drawn here instead — see *The mobile thread
   view* below — so the cards link to `/inbox/[id]` rather than going nowhere.
3. **Filter chips and both search fields carry their designed states but do not filter** — same
   reason as every other screen.
4. **Every list row carries the 2px left rule**, transparent until selected. The frame indents
   the selected row's text by 2px, which would jog the row sideways on click; only the colour
   changes here. Same technique as `MobileStickyBar`'s border.
5. **The selected row keeps its unread weight but drops its dot**, as the frame draws it — the
   message you are reading does not also need announcing.
6. **The bubble's name and timestamp touch in the frame**; they get 8px. The row still
   shrink-wraps to the two labels rather than pushing the time out to the bubble's edge.
7. **The composer is pinned below the scrolling messages**, not scrolling with them. The frame
   draws it at the foot of a pane whose content happens to fit; a composer that slides out of
   reach on a long thread would be a regression.
8. **Send reply is flat blue, no gloss.** That is the frame — worth noting only because every
   other primary button in the app carries the `gloss-blue` treatment.

### The sidebar flag from the Inbox work is resolved

The Inbox commit noted that its frame drew the sidebar differently from the shell and left the
shell alone pending a decision. The decision came, and the shell was wrong — not the frames.

`20875-28900`, the Phase 1 dashboard frame the shell was supposedly built from, puts **Settings
inline under the rule at y=328 on a 48px pitch**. Every later frame agrees, and the nav's own
frame `22783-1847` puts it at y=333 on a **49px pitch**. The shell had it at a 44px pitch with
Settings pushed to the foot of the rail by `mt-auto` — a guess that no frame supports.

`Sidebar.tsx` now implements `22783-1847` and measures exactly: logo 16 (32 tall), links at
**88 / 137 / 186 / 235 / 284 / 333** (40 tall, 49 pitch), **Settings at 405**, user card top
**837**. Two details that were also off: the glyph is **24px**, not 20, and the row is `px-4`
with a `gap-4` to its label — the frame puts the icon at x=16 and the label 40px in.

Only the **desktop** rail changed. The mobile tab bar and the account menu are untouched.

#### The user card is the way into Profile

`22783-3173` is a plain block in every frame that contains it, Profile's own included, so it
carries no designed hover or active state. It is nonetheless the only route to Profile on
desktop — Profile is not a nav item — so the card is a `Link` to `/profile`, and **the active
wash is invented at the user's direction**: `bg-blue-50` across the card, deliberately *not* the
`gloss-blue` the nav links carry, so it reads as "you are here" without competing with the
section you are in. It stays full-bleed because that is the card's own geometry; the nav links
are inset and rounded, this one is not.

`/profile` therefore passes `activeId="profile"`, which lights the card and leaves every link in
the list unlit. It used to borrow Settings' highlight, which said you were somewhere you were
not. The card's gap is 10px, per the frame — the shell had 12.

### Phase 3 — Settings and Profile (3 frames) — **implemented**

| Node ID       | Figma name        | Size      | What it is                          |
| ------------- | ----------------- | --------- | ----------------------------------- |
| `22783-1835`  | Settings          | 1440×900  | Section rail + the General panel     |
| `22783-2031`  | Settings Mobile   | 402×1244  | Grouped rows linking into sections   |
| `22783-3126`  | Profile           | 1440×900  | Identity header + 2×2 cards          |
| `22783-1847`  | Frame 13 (nav)    | 236×828   | The sidebar's own frame — see above  |

Settings' two frames are different screens, not one at two widths: desktop is a 245px rail
beside a four-card panel, mobile is a stack of grouped rows that *link into* those sections
rather than showing them. Both pass `topBar={null}`. Profile has **no mobile frame** at all.

Measured in-browser:

- Settings desktop: rail 245 at x=236, panel 959 with a 57px header, cards 444.5 at x=509/968.
  Card rows **353** (frame 355) and **266** (frame 265).
- Profile desktop: header 1204×97, cards 567 at x=264/845, rows **293** and **235** — exact.
- Settings mobile: header **75**, every row **73**, account card **78**, group headings **23**,
  cards **291 / 366 / 146** against 293 / 366 / 147. Page 1263 against the frame's 1191 plus
  our own 75px tab bar — 3px short across five stacked groups.

Three things this screen turned on:

- **The card body's top margin is 16 with a description and 14 without.** `SettingsCard` picks
  between them. Getting this wrong is a uniform 2-4px on every card.
- **Claims defaults' switch rows are in the 12px flow**, not butted together. They look like a
  divided list but the frame gives each row a 12px gap *and* a rule — that alone was 36px.
- **Mobile rows are 72, and the rule makes them 73.** Setting `min-h-[73px]` on all of them
  makes every card 1px tall per row.

### Settings and Profile deviations from the frames

1. **Only General is designed.** Selecting another section moves the highlight and leaves the
   panel where it is — the arrangement Claims and Inbox already use.
2. **Every `@redpear.com` address, the "RedPear Operations" version string and the "RedPear app"
   session label are written as Surebase.** The product was renamed in `56734e9`; the Figma file
   predates it, and reproducing those would put a brand the repo deliberately removed back on
   screen.
3. **The workspace Logo slot shows the Surebase mark.** The frame drops the *pre-rename product
   logo* in as its sample upload. That asset is gone, so the current mark stands in. It reads
   oddly beside a workspace called "Gemini Communications" — worth a real placeholder from the
   designer.
4. **Discard / Save changes and Change photo / Save changes are each 36px.** The frames draw
   them at 36 and 34; at equal heights they align optically, as already decided for Policies.
5. **The read-only Role field is not an input.** Its value wraps to two 18px lines in the frame,
   which an input truncates instead. Nothing can be typed there, so it renders as a wrapping
   element — 40px tall against the frame's 38.
6. **Selects carry their value and chevron but do not open.** No frame defines their options.
7. **The mobile frame draws no tab bar** — Settings lives in the account menu, not the tabs. The
   shell keeps the bar with nothing lit, as Analytics does.

## The mobile profile — designed here, not in Figma

**There is no frame for Profile on mobile**, only the desktop one. The mobile set stops at
Settings, whose account row leads here and nowhere else. This is the second screen in the app
without a frame behind it, after the mobile inbox thread. If a frame arrives later, it wins.

It is the desktop profile's own four cards in the mobile shell's vocabulary:

- The header is Settings-mobile's: a 46px back control and a 17px title, pinned with its rule
  always on. Back goes to Settings, the only route in that any frame draws.
- The desktop's 97px identity bar cannot also hold two buttons at 402px, so the identity becomes
  a card that scrolls and Change photo goes full width beneath it.
- **Save changes is fixed above the tab bar** at `bottom-[75px]`, 85px tall — where Claims
  mobile puts its actions, and the same bar the inbox composer uses. The content carries
  `pb-[85px]` on top of the shell's `pb-[75px]` to clear it.
- The cards take `variant="mobile"`, which stacks the paired fields and **drops each segmented
  control below its label** — three segments beside a label does not fit 370px.

Nothing about the content is invented: every field, toggle, pill and session is the desktop
frame's, re-laid out.

## Pinned mobile headers

Every page header pins its **title row** to the top on mobile; the rest of the header — search,
filter chips, range switch, the customer's identity block and its tabs — scrolls away beneath
it. Added 2026-08-29 at the user's request, overruling the Policies deviation that had the whole
header scrolling.

`components/layout/MobileStickyBar.tsx` is the primitive, and it settles three things:

- **`sticky`, not the dashboard bar's `fixed`.** The row keeps its place in flow, so no page
  needs a matching top padding and there is no height constant to keep in sync.
- **The two blocks are siblings, not nested.** A `sticky` child pins only within its parent's
  box, so leaving the title row inside its own `<header>` would unpin it the moment that short
  header scrolled past. Both blocks are direct children of `DashboardShell`'s flex column,
  which spans the page, so the bar travels the whole way down.
- **The border is always present and only its colour animates**, via `useScrolled` — the same
  treatment as `MobileHeader`. At rest it is transparent, leaving the header's own bottom rule
  as the only line; without that the resting header would carry two rules.

The bar sheds 1px of bottom padding to its border, per the stroke-inside rule, so every header
stack still measures what it did before: Policies and Customers 183.5, customer detail 267.1,
Analytics 130. The pinned bars are 72–76px, verified over CDP at 402px along with `top: 0`
after a 600px scroll and no horizontal overflow.

Claims is the exception. Its mobile header **is** the title row and nothing else, so all of it
pins with its rule always on, and it uses a plain `sticky top-0 z-30` rather than the primitive.

## The mobile thread view — designed here, not in Figma

**There is no frame for an opened message on mobile.** The mobile design stops at the list. This
view was drawn to fill that gap on 2026-08-29 at the user's request, and it is the only screen in
the app without a frame behind it. If a frame arrives later, it wins.

Nothing here is invented that the designed screens do not already say. It is the desktop
thread's own three parts rebuilt in the mobile shell's established vocabulary:

| Desktop | Mobile | Why |
| --- | --- | --- |
| Header: subject, tag, 3 actions | Pinned row: back · subject · tag · overflow, then the actions below | The Claims-mobile header exactly — 46px controls, two-line title block |
| Actions inline in the header | A horizontally scrolling row of the same outline buttons | Three won't fit on a 402px row; the `-mx-4 px-4` bleed is the filter-chip pattern |
| Composer at the foot of the pane | Fixed above the tab bar, at `bottom-[75px]` | Where Claims mobile puts its actions. Reply is why you opened the thread |
| Avatar 34 · bubble 678 max | Avatar 32 · bubble fills the row | `ThreadBubble` takes a `variant`, as the Claims cards do |

Four decisions worth defending:

- **Bubbles stay left-aligned for both sides**, as the desktop draws them, rather than adopting
  the right-aligned chat idiom. No frame in this product establishes that, and the fill —
  white against blue-50 — already separates the two.
- **The pinned row's second line always carries something**: the tag and its reference where
  there is one, the correspondent's name where there is not. The bar then holds one height
  across every thread instead of shrinking on the untagged ones.
- **Attach and AI draft are real buttons with 40px hit areas**, not glyphs sitting in the field.
  Attach is a button on desktop and must not quietly become decoration at the size where
  fingers are the input.
- **A thread with nobody to answer renders no composer.** The System digest gets a muted
  "Automated digest · no reply" line in the same bar instead — the page keeps one shape, and the
  absence is explained rather than left as an unexplained edge.

Measured at 402: pinned bar **76** (the same as Claims mobile), composer **85**, sitting at
top 360 in a 520-tall viewport — exactly `520 − 85 − 75`. The message list's
`pb-[85px]` on top of the shell's `pb-[75px]` is exact: scrolled to the bottom, the last
bubble ends flush at the composer's top edge rather than under it.

### What this pulled in with it

Opening a message needs somewhere to open, so `/inbox/[id]` is now a route and every row and
card links to it. That makes the desktop's open thread come from the URL rather than local
state — shareable, reloadable, and reachable from the mobile cards — and leaves the two-column
frame unchanged, since a thread link opened on a desktop still renders the whole Inbox with that
message selected. All five ids prerender.

**Four of the five threads are invented.** Only `msg-1` is designed, transcribed from
`22780-917` down to its paragraph breaks. The other four are written to match the snippet each
row already showed, so that opening any message leads somewhere. Their bodies, addresses and
timestamps are mock content in the same sense as the rest of `lib/` — but unlike the rest, they
were not read off a frame. Header actions vary with the tag (a claim opens a claim, a renewal
opens a policy, an untagged thread offers only Archive), which is also invented.

## Dark mode

Figma `22795-1045`, **colour styles only** — no content differs between the two themes.

Sampled from the frame, the palette is the slate ramp read back to front: page **#020617**
(slate-950), every surface **#0f172a** (slate-900), inner cards back to #020617, fields ~#1e293b,
and **blue-600 unchanged** at #2563eb. So the theme is implemented by redefining the tokens
rather than by adding a `dark:` class to forty components — Tailwind v4 compiles `bg-slate-50`
to `var(--color-slate-50)`, so inverting the ramp under `[data-theme="dark"]` carries the whole
app. The block lives at the foot of `globals.css`.

Four utilities must not follow the ramp, and are overridden by hand:

- `white` is both a surface (`bg-white` on every card) and a foreground (`text-white` on blue
  buttons). Inverting the token fixes the first and ruins the second, so `.bg-white` is remapped
  on its own and white stays white. `.ring-white` goes with it.
- `.text-blue-600` lifts to #60a5fa — blue-600 on slate-900 is too close to read — while
  `bg-blue-600` keeps the frame's exact fill.
- `input`, `textarea` and `select` take #1e293b, because fields sit *above* their card in the
  frame rather than below it.

### How it is driven

`lib/theme.ts` owns the preference (`light` | `dark` | `system`, in localStorage under
`surebase-theme`) and stamps the resolved value on `<html>` as `data-theme`. Three things worth
knowing:

- **`useSyncExternalStore`, not state in an effect.** The preference is an external store; this
  is what reads one without a hydration mismatch. The server snapshot is `system`, so markup
  matches.
- **`THEME_INIT_SCRIPT` runs before first paint**, inlined in `<head>`. Without it the page
  paints light and then flips. `<html>` carries `suppressHydrationWarning` for the same reason.
- **Both pickers write the same key.** Settings mobile labels the third option "Auto" and
  Profile desktop labels it "System"; both store `system`, and a `surebase:theme` event keeps
  every mounted picker in step. Changing the OS setting re-resolves while `system` is selected.

Verified in-browser: shell #020617, sidebar and cards #0f172a, headings #f8fafc — the frame's
values exactly; light mode unchanged at #f8fafc / #ffffff; and both pickers persist across a
reload.

## Two breakpoints, one popover state

`TopBar` and `MobileHeader` are **both mounted at every width** — one is only hidden by CSS —
and both call `useDismissable` against the same `notificationsOpen`. The hidden one read a press
on the *visible* bell as an outside press and closed, after which the visible button's own
onClick toggled it straight back open. The panel opened on the first click and could never be
dismissed by clicking the bell again.

`useDismissable` now sits out when its own popover has no client rects. Use
`getClientRects().length`, not `offsetParent`: the latter is null for fixed elements too, and
the mobile panel lives inside a fixed header.

The lesson generalises — **any state shared across two breakpoints has two live listeners**, and
the one that cannot see the event must not act on it.

## Working notes

- Next.js 16 differs from older training data — read `node_modules/next/dist/docs/` before
  reaching for an API you remember from Next 13/14.
- Pull real values (colors, spacing, type scale) from Figma into the Tailwind `@theme` block in
  `src/app/globals.css` rather than hardcoding hex values in components.
