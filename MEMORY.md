# Project memory — RedPear Dashboard

Handoff notes for picking this up in a fresh session. Read this first, then `AGENTS.md` for the
frame-by-frame detail.

**Last updated:** 2026-08-28 — end of Phase 1.

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

## Status

**Phase 1 (dashboard home, 7 frames) — done and visually verified.** Build and lint clean.

**Phase 2 (remaining 10 frames) — not started.** Node IDs are listed in `AGENTS.md`. Confirm
Phase 1 is signed off before starting; the user deliberately sequenced this and asked to "start
small first".

## Figma access — read this before trying to open a design

File `RedPear--Personal-Copy-`, key `2fDOIcwXWFZn2BQtEO7dAV`.

The **claude.ai Figma MCP connector reports `√ Connected` from `claude mcp list` while exposing
no tools to the session.** Restarting Claude Code did not fix it. Do not promise to read frames
before confirming Figma tools are actually in the tool list.

**The working path is the Figma REST API** with a `figd_…` personal access token in an
`X-Figma-Token` header:

| Need | Endpoint |
| --- | --- |
| Frame names/sizes | `GET /v1/files/{key}/nodes?ids=A:B&depth=1` |
| Layout geometry, text styles | same, full depth |
| **See** a design | `GET /v1/images/{key}?ids=…&format=png&scale=2` → download the S3 URLs |
| Icons / logo | `GET /v1/images/{key}?ids=…&format=svg` |
| Raster fills (avatars) | `GET /v1/files/{key}/images` → `imageRef` map |

URL node IDs use a hyphen (`20875-28900`); the API wants a colon (`20875:28900`). Parse node
JSON with a Node script — one desktop frame is ~400KB, too big to read into context.

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
`scrollWidth` to `clientWidth`) and to drive states by `el.click()`-ing a selector before
capturing. **Measure in the page before changing layout code.**

## Architecture

```
src/
  app/
    layout.tsx        Geist + Geist Mono (the design's actual fonts), metadata
    globals.css       @theme tokens — brand red, shell metrics, shadows
    page.tsx          Dashboard home; desktop grid ratios are measured Figma widths
  components/
    layout/           Shell. DashboardShell owns nav state so pages stay server components
    dashboard/        One file per card
    ui/               Card, StatusPill, Sparkline, AreaChart
    icons/            figma-icons.tsx (exported, recoloured to currentColor)
                      ui-icons.tsx (hand-drawn to match the 1.5px stroke family)
  lib/
    data.ts           Every string/figure transcribed from the frames — swap for real API
    nav.ts            Sidebar + mobile tab config
    cn.ts             Minimal class joiner (not tailwind-merge)
    use-dismissable.ts  Escape + outside-press for the hand-built popovers
```

The seven Phase 1 frames are **three overlay states of one shell** over **one page** — sidebar
expanded/collapsed, notifications, account menu. Not seven layouts.

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
- The project folder name (`05- Web App`) is not npm-safe, so `create-next-app` had to scaffold
  elsewhere and be moved in. Package name is `redpear-dashboard`.

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
