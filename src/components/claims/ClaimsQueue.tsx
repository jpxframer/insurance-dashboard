"use client";

import { SearchSmallIcon } from "@/components/icons/figma-icons";
import { StatusPill } from "@/components/ui/StatusPill";
import { claimsQueue } from "@/lib/claims";
import { cn } from "@/lib/cn";

/**
 * The 266px queue rail, left of the claim detail. Desktop only — the mobile
 * frame has no queue.
 *
 * Selecting a row is real; the three filter chips carry their designed states
 * but do not filter, since no frame defines a result set for them.
 */
export function ClaimsQueue({
  selectedId,
  onSelect,
  activeFilter,
  onFilterChange,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  activeFilter: string;
  onFilterChange: (id: string) => void;
}) {
  return (
    <div className="leading-figma hidden h-dvh w-[266px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex flex-col gap-2 px-[14px] pt-4 pb-2.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-semibold text-slate-900">{claimsQueue.title}</h2>
          <span className="rounded-[20px] bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
            {claimsQueue.urgentBadge}
          </span>
        </div>

        <label className="relative block">
          <span className="sr-only">Search claims</span>
          <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-[11px] size-3 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder={claimsQueue.searchPlaceholder}
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pr-[11px] pl-[31px] text-[12.5px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </label>

        <div className="flex gap-[5px]">
          {claimsQueue.filters.map((filter) => {
            const active = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange(filter.id)}
                className={cn(
                  "rounded-[20px] border px-2.5 py-1 text-[11.5px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  active
                    ? "border-blue-200 bg-blue-50 font-semibold text-blue-600"
                    : "border-slate-200 font-medium text-slate-600 hover:bg-slate-50",
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto border-t border-slate-100">
        <ul>
          {claimsQueue.items.map((claim) => {
            const selected = claim.id === selectedId;

            return (
              <li key={claim.id}>
                <button
                  type="button"
                  onClick={() => onSelect(claim.id)}
                  aria-current={selected ? "true" : undefined}
                  className={cn(
                    "w-full border-t border-slate-100 text-left first:border-t-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                    // The selected row trades its left padding for a 2px marker.
                    selected
                      ? "border-l-2 border-l-blue-600 bg-blue-50 py-[11px] pr-[14px] pl-4"
                      : "px-[14px] pt-3 pb-[11px] hover:bg-slate-50",
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "tnum font-mono text-[12px]",
                        selected ? "font-medium text-blue-600" : "text-slate-600",
                      )}
                    >
                      {claim.id}
                    </span>
                    <StatusPill status={claim.status} size="sm" />
                  </span>

                  <span className="block pt-1 text-[13px] font-semibold text-slate-900">
                    {claim.customer}
                  </span>
                  <span className="block text-[12px] text-slate-600">{claim.summary}</span>
                  <span className="block pt-0.5 text-[11px] text-slate-400">{claim.age}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-slate-100 px-[14px] py-3 text-center">
          <button
            type="button"
            className="text-[12.5px] font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {claimsQueue.showMore}
          </button>
        </div>
      </div>
    </div>
  );
}
