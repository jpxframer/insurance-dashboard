"use client";

import Image from "next/image";
import Link from "next/link";
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
          collapsed ? "size-[47px] justify-center" : "h-10 gap-3 px-3",
          active
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        <Icon className="size-5 shrink-0" />

        {collapsed ? (
          <span className="sr-only">{item.label}</span>
        ) : (
          <>
            <span className="flex-1 truncate text-[13.5px] font-medium">{item.label}</span>
            {item.badge ? (
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold tabular-nums",
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

export function Sidebar({ collapsed, onToggle, activeId }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 ease-out lg:flex",
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
        <Link href="/" className="flex items-center rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
          <Image
            src="/brand/redpear-logo.svg"
            alt="RedPear"
            width={46}
            height={32}
            priority
            className="h-8 w-auto"
          />
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

      <nav
        aria-label="Main"
        className={cn("flex flex-1 flex-col", collapsed ? "mt-4" : "mt-6 px-3")}
      >
        <ul className={cn("flex flex-col", collapsed ? "gap-2" : "gap-1")}>
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
            "mt-auto flex flex-col border-t border-slate-100",
            collapsed ? "gap-2 pt-4" : "gap-1 pt-4",
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

      {/* User card */}
      <div
        className={cn(
          "flex items-center border-t border-slate-200",
          collapsed ? "-mx-4 justify-center px-4 py-4" : "gap-3 px-4 py-4",
        )}
      >
        <Image
          src={currentUser.avatar}
          alt=""
          width={34}
          height={34}
          className="size-[34px] shrink-0 rounded-full object-cover"
        />
        {!collapsed ? (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-slate-900">
              {currentUser.name}
            </p>
            <p className="truncate text-[12px] text-slate-400">{currentUser.role}</p>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
