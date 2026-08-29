"use client";

import { useState } from "react";
import {
  ChevronSmallIcon,
  FilterLinesIcon,
  PlusSmallIcon,
  SearchSmallIcon,
} from "@/components/icons/figma-icons";
import {
  columnsLabel,
  densityOptions,
  policiesPage,
  policyFilters,
  policyTabs,
  saveViewLabel,
  type DensityId,
} from "@/lib/policies";
import { cn } from "@/lib/cn";

/**
 * The two rows above the table: saved-view tabs, then the filter bar with the
 * density and column controls trailing on their own line.
 *
 * The tabs and filters carry their designed states but do not filter the list —
 * the frames define no result set for any of them, and "Renewals this month 64"
 * could not be honoured by ten mock rows.
 */
export function PoliciesToolbar({
  density,
  onDensityChange,
}: {
  density: DensityId;
  onDensityChange: (density: DensityId) => void;
}) {
  const [activeTab, setActiveTab] = useState<string>(policyTabs[0].id);

  return (
    <>
      <div className="flex w-full items-center gap-1 border-b border-slate-200">
        {policyTabs.map((tab) => {
          const active = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "-mb-px flex items-center gap-1.5 border-b-2 px-3 pt-2 pb-2.5 text-[13px] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                active
                  ? "border-blue-600 font-semibold text-blue-600"
                  : "border-transparent font-medium text-slate-600 hover:text-slate-900",
              )}
            >
              {tab.label}
              {"badge" in tab && tab.badge ? (
                <span className="rounded-[20px] bg-amber-50 px-1.5 py-px text-[10.5px] font-semibold text-amber-700">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}

        <button
          type="button"
          className="flex items-center gap-[5px] px-3 py-2 text-[12.5px] font-medium whitespace-nowrap text-slate-400 hover:text-slate-600 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusSmallIcon className="size-[11px]" />
          {saveViewLabel}
        </button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <label className="relative block w-[284px]">
            <span className="sr-only">Search policies</span>
            <SearchSmallIcon className="pointer-events-none absolute top-1/2 left-3 size-[13px] -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder={policiesPage.searchPlaceholder}
              className="h-9 w-full rounded-[9px] border border-slate-200 bg-white pr-3 pl-[30px] text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none"
            />
          </label>

          {policyFilters.applied.map((filter) => (
            <span
              key={filter.id}
              className="flex h-9 items-center gap-1.5 rounded-[9px] border border-blue-200 bg-blue-50 px-3 text-[12.5px] font-medium whitespace-nowrap text-blue-600"
            >
              {filter.label}
              <button
                type="button"
                aria-label={`Remove filter ${filter.label}`}
                className="text-[14px] leading-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                ×
              </button>
            </span>
          ))}

          {policyFilters.dropdowns.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className="flex h-9 items-center gap-1.5 rounded-[9px] border border-slate-200 bg-white px-3 text-[12.5px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {filter.label}
              <ChevronSmallIcon className="size-[11px] text-slate-400" />
            </button>
          ))}

          <button
            type="button"
            className="px-0.5 text-[12.5px] font-medium whitespace-nowrap text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {policyFilters.clearAll}
          </button>
        </div>

        <div className="flex items-center justify-end gap-2">
          <div
            role="group"
            aria-label="Row density"
            className="flex overflow-hidden rounded-lg border border-slate-200 bg-white p-px"
          >
            {densityOptions.map((option, index) => {
              const active = option.id === density;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onDensityChange(option.id)}
                  className={cn(
                    "px-[9px] py-[5px] text-[11.5px] font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
                    index > 0 && "border-l border-slate-200",
                    active ? "bg-slate-100 text-slate-900" : "text-slate-400 hover:text-slate-600",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-[9px] border border-slate-200 bg-white px-3 text-[12.5px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <FilterLinesIcon className="size-[13px]" />
            {columnsLabel}
          </button>
        </div>
      </div>
    </>
  );
}
