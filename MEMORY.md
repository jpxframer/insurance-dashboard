# Project memory — RedPear Dashboard

Handoff notes for picking this up in a fresh session. Read this first, then `AGENTS.md` for the
frame-by-frame detail.

**Last updated:** 2026-08-29 — Phase 1 complete; Phase 2 started, Policies (2 of 10 frames)
built and verified. See **Pick up here** below.

---

## What this is

Frontend for the RedPear dashboard — an insurance operations product (policies, claims,
renewals). Built from Figma designs. No backend; all content is mock data.

## Stack — decided, don't relitigate

- **Next.js 16.3.3**, App Router, Turbopack · React 19.2.8 · TypeScript
- **Tailwind CSS v4** — no `tailwind.config`; theme lives in `@theme` inside
  `src/app/globals.css`
- `src/` directory, import alias `@/*`
- **All components hand-built.** The user explicitly declined shadcn/ui and Radix. We own the
  markup, styling and accessibility for every primitive. Do not add a component library.

Next.js 16 differs from older training data — read `node_modules/next/dist/docs/` before using
an API remembered from Next 13/14. `LayoutProps<"/">` in `src/app/layout.tsx` is a Next 16
generated type, not a mistake.

## Pick up here

**Clean point.** Working tree is clean, `main` is in sync with `origin/main`, nothing is
half-finished.

**One open decision, awaiting the user:**

> The last commit, `67e666e`, carries a `Co-Authored-By: Claude Opus 5` trailer — a direct
> violation of the sole-author rule under *Repo* below, and it is already pushed to a public
> repo. Fixing it means amending the message and force-pushing `main`. The user has been told
> and has not yet decided. Don't force-push without an explicit go-ahead.

**Next piece of work: the 8 remaining Phase 2 frames.** Node IDs are in `AGENTS.md`. The user
sequences work deliberately — confirm which screen is next rather than assuming.

**The Figma MCP tools now work.** As of 2026-08-29 they load as deferred tools and the whole
Policies screen was pulled through `get_design_context` / `get_screenshot` / `get_metadata`.
No token was needed. The REST-API fallback below is still worth keeping, but try MCP first.

## Status

**Phase 1 (dashboard home, 7 frames) — done, visually verified, pushed.** Build and lint clean.

Delivered, in order:

- **Phase 1 implementation** (`e60c49e`) — the shell and every dashboard card.
- **Shell scroll model** (`b81ade9`) — desktop sidebar pinned to one viewport height; mobile top
  bar fixed like the bottom tab bar with a scroll-reactive border. Details in *Shell scroll
  model* below. Verified by measuring in a real browser, not by eye.
- **Overlay rebuild** (`67e666e`) — the desktop notifications popover, its mobile counterpart and
  the mobile account menu were re-derived from their own Figma **component** nodes, which carry
  geometry the composed frames hide. This corrected real errors, including a desktop popover 33%
  too wide (418px → 314px). Glyphs are now authored at native box sizes in `figma-icons.tsx`;
  six duplicates were dropped from `ui-icons.tsx`. Exact node IDs, measured sizes and the two
  rendering notes (Figma strokes sit inside the frame; Geist + Geist Mono union their
  half-leading) are in `AGENTS.md` under *Overlay components*.
- **`MEMORY.md` + `AGENTS.md`** as the two handoff docs.
- **Public GitHub repo** (below).

**Phase 2 — Policies done (2 of 10 frames), 8 remaining.** `/policies` implements desktop
`20875-31238` and mobile `20875-31629`: a nine-column table with working row selection, bulk
bar and density toggle, and a card list on mobile. Measured in-browser against the frames;
numbers and the six deliberate deviations are in `AGENTS.md`.

Two things that came out of it and will bite again:

- `DashboardShell` now takes optional `topBar` / `mobileHeader` slots, because the Policies
  frames carry their own page header instead of the dashboard's greeting bar. Omit them and
  the dashboard is unchanged.
- `.leading-figma` in `globals.css` pins line-height to Figma's 1.21. Tailwind v4 defaults an
  arbitrary `text-[13px]` to 1.5 and CSS `normal` is 1.333 for Geist — both inflate every
  measured row. Put it on a subtree root for any new screen built from these frames.

## Repo

**https://github.com/jpxframer/insurance-dashboard** — public, default branch `main`,
remote `origin` already configured.

Commits so far: `create-next-app` scaffold → `e60c49e` Phase 1 implementation → `b81ade9` shell
scroll fixes → `316146c` handoff notes → `67e666e` overlay rebuild.

**The user is the sole author and contributor, and it must stay that way.** They asked
explicitly for no Claude attribution. Do **not** add `Co-Authored-By`, "Generated with", or any
tool trailer to commit messages — this overrides the default instruction to add a co-author
line. Verify after committing:

```
git log -1 --format=%B | grep -iE "co-authored|claude|anthropic|generated with"
```

**This check was skipped on `67e666e` and the trailer went in.** Run it every time; see the open
decision under *Pick up here*.

## Previewing your work

`npm run dev` → the dev server binds to all interfaces.

- **http://localhost:3000** — the app
- **LAN URL** (was `http://192.168.18.4:3000`, re-check the IP) — for testing on a real phone

There was a `src/app/preview/` harness that rendered both breakpoints side by side in iframes.
It was never committed and has been deleted deliberately — **don't go looking for it, and don't
recreate it unasked.** To check a breakpoint, drive a real browser over CDP (see *Verifying
visual work*).

Any dev server from a previous session is gone; restart it.

## Figma access — read this before trying to open a design

File `RedPear--Personal-Copy-`, key `2fDOIcwXWFZn2BQtEO7dAV`.

**The MCP connector works as of 2026-08-29** — its tools arrive as deferred tools, so they may
not appear in the initial list; load them with a tool search before concluding they are missing.
The Policies screen was built entirely through it, no token required. `get_design_context` is
the one to reach for; `get_metadata` is the cheap way to get exact frame/child geometry without
pulling a 100KB tree into context.

In earlier sessions the same connector reported `√ Connected` while exposing **no** tools, and
restarting Claude Code did not fix it. If that recurs, **the fallback is the Figma REST API**
with a `figd_…` personal access token in an `X-Figma-Token` header:

| Need | Endpoint |
| --- | --- |
| Frame names/sizes | `GET /v1/files/{key}/nodes?ids=A:B&depth=1` |
| Layout geometry, text styles | same, full depth |
| **See** a design | `GET /v1/images/{key}?ids=…&format=png&scale=2` → download the S3 URLs |
| Icons / logo | `GET /v1/images/{key}?ids=…&format=svg` |
| Raster fills (avatars) | `GET /v1/files/{key}/images` → `imageRef` map |

URL node IDs use a hyphen (`20875-28900`); the API wants a colon (`20875:28900`). Parse node
JSON with a Node script — one desktop frame is ~400KB, too big to read into context.

**Prefer a component node over the frame that composes it.** The overlay rebuild exists because
the composed frames were used first; the component nodes carry the real geometry.

The user will need to supply a token. Any token pasted into chat should be rotated afterwards.

## Verifying visual work

`--headless=new --screenshot` **does not honour `--window-size` for layout** — it produced a
402px-wide image of a page laid out much wider, which looks exactly like a responsive bug that
isn't there. Use the **DevTools Protocol** instead:

1. Launch Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`) with
   `--headless=new --remote-debugging-port=9222` and its own `--user-data-dir`.
2. From Node (24 has a global `WebSocket`), fetch `/json/list`, connect to the page target.
3. `Emulation.setDeviceMetricsOverride` → `Page.navigate` → `Page.captureScreenshot`
   (`captureBeyondViewport: true` for full-page).

The same connection runs `Runtime.evaluate`, which is how to check overflow for real (compare
`scrollWidth` to `clientWidth`), how to measure a rendered element against its Figma size, and
how to drive states by `el.click()`-ing a selector before capturing. **Measure in the page
before changing layout code.**

## Architecture

```
src/
  app/
    layout.tsx        Geist + Geist Mono (the design's actual fonts), metadata
    globals.css       @theme tokens — brand red, shell metrics, shadows
    page.tsx          Dashboard home; desktop grid ratios are measured Figma widths
  components/
    layout/           Shell. DashboardShell owns nav state so pages stay server components
                      NotificationsPanel serves both breakpoints (width + count differ only)
    dashboard/        One file per card
    ui/               Card, StatusPill, Sparkline, AreaChart
    icons/            figma-icons.tsx (exported, recoloured to currentColor, authored at
                      native box sizes)
                      ui-icons.tsx (hand-drawn to match the 1.5px stroke family)
  lib/
    data.ts           Every string/figure transcribed from the frames — swap for real API
    nav.ts            Sidebar + mobile tab config
    cn.ts             Minimal class joiner (not tailwind-merge)
    use-dismissable.ts  Escape + outside-press for the hand-built popovers
    use-scrolled.ts   Drives the mobile header's border-on-scroll
```

The seven Phase 1 frames are **three overlay states of one shell** over **one page** — sidebar
expanded/collapsed, notifications, account menu. Not seven layouts.

## Shell scroll model

Only the page content scrolls; the chrome is pinned at both breakpoints.

- **Desktop sidebar** — `sticky top-0 h-dvh self-start`. `self-start` matters: without it the flex
  parent stretches the aside to *content* height and `sticky` has nothing to pin. The nav is
  `min-h-0 flex-1` with the link list `overflow-y-auto`, so on a short viewport the links scroll
  rather than pushing Settings and the user card off-screen.
- **Mobile top bar** — `fixed`, 72px (`BAR_H` in `MobileHeader.tsx`). It holds only the logo,
  bell and avatar. The greeting and search live in `MobileGreeting`, a *separate* export
  rendered in normal flow with `paddingTop: BAR_H`, so they scroll away while the bar stays.
  Change `BAR_H` and both move together.
- **Border on scroll** — `useScrolled()` (`src/lib/use-scrolled.ts`) flips the bar's
  `border-b` from `border-transparent` to `border-slate-200` past 4px. The border is always
  present, only its colour animates, so the bar never changes height and content doesn't jump.
- **Mobile bottom tab bar** — `fixed inset-x-0 bottom-0`; `main` carries `pb-[75px]` to clear it.

## Gotchas already hit — don't rediscover these

- **Tailwind display conflicts.** `hidden lg:block` on an element whose base classes include
  `flex` is unpredictable — they're all display utilities and source order decides, not class
  order. Put visibility on a *wrapper*, or make the responsive variant `lg:flex`.
- **SVG charts need a definite box.** With only `h-full`, a percentage height against a
  flex-sized parent may not resolve and the SVG falls back to its viewBox aspect ratio —
  becoming as tall as it is wide and spilling out of its card. `AreaChart` positions its `<svg>`
  `absolute inset-0` for this reason.
- **`AreaChart` is a client component** solely because `useId` (a hook) keeps its gradient ID
  unique across the two instances on the page.
- **Object literals in `data.ts` need explicit types** when items have optional fields —
  TypeScript infers a union and `.due` fails to resolve. See the `Task` type.
- **`sticky` inside a flex row needs `self-start`.** Default `align-items: stretch` sizes the
  item to content height, leaving `sticky` nothing to pin against. Cost an extra debug cycle on
  the sidebar.
- **Figma strokes sit inside a frame, CSS borders sit outside the padding box.** Every bordered
  edge sheds 1px of padding to keep the measured height.
- **Don't scale a glyph down from the 24px nav family** — its strokes render far too thin.
  Author each icon at its native box size.
- The project folder name (`05- Web App`) is not npm-safe, so `create-next-app` had to scaffold
  elsewhere and be moved in. Package name is `redpear-dashboard`.

## Open security item — raise if still unresolved

The user pasted a Figma token in chat and was asked to rotate it. Separately,
`~/.claude/settings.json` contains **three older `figd_…` tokens hardcoded inside Bash
permission rules** (from earlier projects). They were told; it's their call. Don't nag, but if a
Figma token is needed again, it's a natural moment to check.

## Deviations from the designs — deliberate, flagged to the user

1. Collapsed sidebar has an **expand button**; the frame shows no way back to expanded.
2. Collapsed sidebar shows a **dot badge** on Claims; the frame drops the "87" entirely.
3. Desktop notifications header says "4 new" but shows 2 unread dots, and mobile says "2 new" —
   the count is derived from data (2).
4. Tasks reads "2 of 5 done" over 4 visible rows. Kept as authored (truncated list); it does not
   recompute when a box is ticked.

Items 1 and 2 are judgment calls the user may want to overrule.

## Working preferences

- The user sequences work deliberately — implement the agreed scope, don't widen it unprompted.
- Flag design inconsistencies rather than silently "fixing" them.
- Commits are the user's alone. Do not add Claude as a co-author or contributor.
