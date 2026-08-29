"use client";

import { ChevronSmallIcon } from "@/components/icons/figma-icons";
import { customerDropdowns, customerTabs } from "@/lib/customers";
// Same segmented control the Policies toolbar uses, same two labels.
import { densityOptions, type DensityId } from "@/lib/policies";
import { cn } from "@/lib/cn";

/**
 * Tabs, filter dropdowns and the density/columns controls, all on one wrapping
 * row.
 *
 * The active tab here is a solid slate-900 pill, not the underline the Policies
 * frame uses — the two screens genuinely differ.
 */
export function CustomersToolbar({
  activeTab,
  onTabChange,
  density,
  onDensityChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
  density: DensityId;
  onDensityChange: (id: DensityId) => void;
}) {
  return (
    <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-2">
      {customerTabs.map((tab) => {
        const active = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={active}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "rounded-lg px-[13px] text-[12.5px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              active
                ? "h-[30px] bg-slate-900 px-3 font-semibold text-white"
                : "h-8 border border-slate-200 bg-white font-medium text-slate-600 hover:bg-slate-50",
            )}
          >
            {tab.label}
          </button>
        );
      })}

      <span aria-hidden className="mx-1 h-5 w-px bg-slate-200" />

      {customerDropdowns.map((item) => (
        <button
          key={item.id}
          type="button"
          className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[12.5px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {item.label}
          <ChevronSmallIcon className="size-[11px] text-slate-400" />
        </button>
      ))}

      <div className="ml-auto flex items-center gap-2.5">
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
          className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[12.5px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Columns
          <ChevronSmallIcon className="size-[11px] text-slate-400" />
        </button>
      </div>
    </div>
  );
}
