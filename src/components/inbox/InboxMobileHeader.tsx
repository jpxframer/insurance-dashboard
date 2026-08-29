"use client";

import { useState } from "react";
import { SearchSmallIcon } from "@/components/icons/figma-icons";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { inboxPage } from "@/lib/inbox";
import { cn } from "@/lib/cn";

/**
 * Mobile page header — title, Mark all read, search and the filter chips.
 *
 * The title row pins; search and chips scroll away beneath it, as on every
 * other screen. See *Pinned mobile headers* in AGENTS.md.
 *
 * The chips carry their designed states but do not filter.
 */
export function InboxMobileHeader() {
  const [filter, setFilter] = useState(inboxPage.filters[0].id);

  return (
    <>
      {/* pb is the frame's 10px gap; the border-b eats one. */}
      <MobileStickyBar className="px-4 pt-[14px] pb-[9px]">
        <div className="flex items-center gap-2.5">
          <div className="flex min-w-0 flex-col gap-px">
            <h1 className="text-[20px] leading-[26px] font-semibold tracking-[-0.2px] text-slate-900">
              {inboxPage.title}
            </h1>
            <p className="text-[12px] leading-[16px] text-slate-400">
              {inboxPage.mobileMeta}
            </p>
          </div>

          <button
            type="button"
            className="ml-auto flex min-h-11 shrink-0 items-center text-[13px] font-medium whitespace-nowrap text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {inboxPage.markAllRead}
          </button>
        </div>
      </MobileStickyBar>

      <div className="flex flex-col gap-2.5 border-b border-slate-200 bg-white px-4 pb-3 lg:hidden">
        <label className="relative block">
          <span className="sr-only">Search messages</span>
          <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-[15px] size-[15px] -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={inboxPage.searchPlaceholder}
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-slate-50 pr-[15px] pl-10 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </label>

        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
          {inboxPage.filters.map((chip) => {
            const active = chip.id === filter;

            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(chip.id)}
                className={cn(
                  "shrink-0 rounded-[20px] border px-[12px] py-[7px] text-[12px] leading-[16px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "border-blue-200 bg-blue-50 font-semibold text-blue-600"
                    : "border-slate-200 bg-white font-medium text-slate-600",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
