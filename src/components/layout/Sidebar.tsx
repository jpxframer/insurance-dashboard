"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { ChevronsLeftIcon } from "@/components/icons/figma-icons";
import { currentUser } from "@/lib/data";
import { primaryNav, secondaryNav, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/cn";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  activeId: string;
};

function NavLink({
  item,
  active,
  collapsed,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        title={collapsed ? item.label : undefined}
        className={cn(
          "group relative flex items-center rounded-[10px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
          collapsed ? "size-[47px] justify-center" : "h-10 gap-4 px-4",
          active
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        <Icon className="size-6 shrink-0" />

        {collapsed ? (
          <span className="sr-only">{item.label}</span>
        ) : (
          <>
            <span className="flex-1 truncate text-[13.5px] font-medium">{item.label}</span>
            {item.badge ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] leading-[14px] font-semibold tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                )}
              >
                {item.badge}
              </span>
            ) : null}
          </>
        )}

        {/* Collapsed rail keeps the count visible as a corner dot-badge. */}
        {collapsed && item.badge ? (
          <span
            className={cn(
              "absolute right-1 top-1 size-2 rounded-full ring-2 ring-white",
              active ? "bg-white" : "bg-blue-600",
            )}
            aria-hidden="true"
          />
        ) : null}
      </Link>
    </li>
  );
}

/**
 * Metrics come from Figma `22783-1847`, the nav's own frame: 40px rows on a
 * 49px pitch, a 24px glyph at x=16 with its label 40px in, and **Settings
 * directly under the primary group** behind the rule — not pinned to the foot
 * of the rail. The dashboard frame `20875-28900` agrees (its pitch is 48 and
 * Settings sits at y=328), so the bottom-pinned Settings this had before was
 * simply wrong rather than a disagreement between frames.
 *
 * The user card stays at the bottom; `flex-1` on the nav puts the empty space
 * between Settings and the card, which is where the frame puts it.
 */
export function Sidebar({ collapsed, onToggle, activeId }: SidebarProps) {
  // Profile is not a nav item; it is reached from the user card, so the card
  // carries the current-page state instead of any link in the list.
  const profileActive = activeId === "profile";

  return (
    <aside
      className={cn(
        // Pinned to one viewport height: `self-start` stops the flex parent
        // stretching it to content height, which would defeat `sticky`.
        "sticky top-0 hidden h-dvh shrink-0 flex-col self-start overflow-hidden border-r border-slate-200 bg-white transition-[width] duration-200 ease-out lg:flex",
        collapsed ? "w-[79px] px-4 py-4" : "w-[236px] pt-4",
      )}
    >
      {/* Brand row */}
      <div
        className={cn(
          "flex items-center",
          collapsed ? "justify-center" : "justify-between px-3",
        )}
      >
        <Link
          href="/"
          aria-label="SureBase"
          className="flex items-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {/* Collapsed drops the wordmark — Figma 22777-850. */}
          <Logo showWordmark={!collapsed} />
        </Link>

        {!collapsed ? (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Collapse sidebar"
            aria-expanded
            className="grid size-8 place-items-center rounded-[9px] border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <ChevronsLeftIcon className="size-4" />
          </button>
        ) : null}
      </div>

      {/* Collapsed state moves the toggle below the mark, where there is room. */}
      {collapsed ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          aria-expanded={false}
          className="mt-4 grid size-[47px] place-items-center rounded-[10px] border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ChevronsLeftIcon className="size-4 rotate-180" />
        </button>
      ) : null}

      {/*
        `min-h-0` lets this shrink below its content height, so the links can
        scroll on a short viewport instead of pushing the user card off-screen.
      */}
      <nav
        aria-label="Main"
        className={cn(
          "flex min-h-0 flex-1 flex-col",
          collapsed ? "mt-4" : "mt-10 px-3",
        )}
      >
        <ul
          className={cn(
            "flex flex-col overflow-y-auto",
            collapsed ? "gap-2" : "gap-[9px]",
          )}
        >
          {primaryNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={item.id === activeId}
              collapsed={collapsed}
            />
          ))}
        </ul>

        <ul
          className={cn(
            "flex shrink-0 flex-col border-t border-slate-100",
            collapsed ? "mt-4 gap-2 pt-[15px]" : "mt-4 gap-[9px] pt-[15px]",
          )}
        >
          {secondaryNav.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              active={item.id === activeId}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      {/*
        User card — Figma `22783-3173`, and the way into Profile on desktop.

        The frame draws it as a plain block in every screen, including Profile
        itself, so **the active wash is invented**: blue-50 across the card,
        deliberately not the `gloss-blue` the nav links carry, so it reads as
        "you are here" without competing with the section you are in. It stays
        full-bleed because that is the card's own geometry — the nav links are
        inset and rounded, this one is not.
      */}
      <Link
        href="/profile"
        aria-current={profileActive ? "page" : undefined}
        title={collapsed ? currentUser.name : undefined}
        className={cn(
          "flex shrink-0 items-center border-t border-slate-200 transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
          collapsed ? "-mx-4 justify-center px-4 py-[14px]" : "gap-2.5 px-4 py-[14px]",
          profileActive ? "bg-blue-50" : "hover:bg-slate-50",
        )}
      >
        <Image
          src={currentUser.avatar}
          alt=""
          width={34}
          height={34}
          className="size-[34px] shrink-0 rounded-full object-cover"
        />
        {collapsed ? (
          <span className="sr-only">{currentUser.name}</span>
        ) : (
          <div className="min-w-0">
            <p className="truncate text-[13px] leading-[17px] font-semibold text-slate-900">
              {currentUser.name}
            </p>
            <p className="truncate text-[12px] leading-[16px] text-slate-400">
              {currentUser.role}
            </p>
          </div>
        )}
      </Link>
    </aside>
  );
}
