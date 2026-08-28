# Project memory — RedPear Dashboard

Handoff notes for picking this up in a fresh session. Read this first, then `AGENTS.md` for the
frame-by-frame detail.

**Last updated:** 2026-08-28 — Phase 1 complete, shell scroll fixes applied, pushed. Paused for a
break; see **Pick up here** below.

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

**Stopped mid-session for a break, at a clean point.** Nothing is half-finished — build and lint
pass, everything except one file is committed and pushed.

**One open question, asked twice, still unanswered:**

> `src/app/preview/` is **uncommitted** — the only dirty path in the tree. It's a local dev
> harness (see *Previewing your work* below), not product code. The user was offered
> "commit it or delete it" twice and hasn't chosen. **Ask once, then act** — don't leave it
> hanging a third time.

**Next piece of work: Phase 2 — the remaining 10 frames.** Node IDs in `AGENTS.md`. The user
said "ready when you are" was met with a break, so open by confirming they still want Phase 2
next rather than assuming.

Before touching Phase 2, remember there is **no Figma access without a token** — the MCP
connector is unusable (see below) and the user must supply a fresh `figd_…` one. They were asked
to rotate the previous token, so assume the old one is dead.

## Status

**Phase 1 (dashboard home, 7 frames) — done, visually verified, pushed.** Build and lint clean.

Also delivered after the initial build:

- **Shell scroll model** (commit `b81ade9`) — desktop sidebar pinned to one viewport height;
  mobile top bar fixed like the bottom tab bar with a scroll-reactive border. Details in
  *Shell scroll model* below. Verified by measuring in a real browser, not by eye.
- **`MEMORY.md` + `AGENTS.md`** as the two handoff docs.
- **Public GitHub repo** (below).

**Phase 2 (remaining 10 frames) — not started.** Node IDs are listed in `AGENTS.md`. Confirm
Phase 1 is signed off before starting; the user deliberately sequenced this and asked to "start
small first".

## Repo

**https://github.com/jpxframer/insurance-dashboard** — public, default branch `main`,
remote `origin` already configured.

Commits so far: `create-next-app` scaffold → Phase 1 implementation → `b81ade9` shell scroll fixes.

**The user is the sole author and contributor, and it must stay that way.** They asked
explicitly for no Claude attribution. Do **not** add `Co-Authored-By`, "Generated with", or any
tool trailer to commit messages — this overrides the default instruction to add a co-author
line. Verify after committing:

```
git log -1 --format=%B | grep -iE "co-authored|claude|anthropic|generated with"
```

## Previewing your work

`npm run dev` → the dev server binds to all interfaces.

- **http://localhost:3000** — the app
- **http://localhost:3000/preview** — both breakpoints side by side (1440×900 and 402×888) in
  real iframes, auto-scaled to fit, fully interactive. This is `src/app/preview/`, the
  uncommitted dev harness.
- **LAN URL** (was `http://192.168.18.4:3000`, re-check the IP) — for testing on a real phone.

Any dev server from a previous session is gone; restart it.

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
