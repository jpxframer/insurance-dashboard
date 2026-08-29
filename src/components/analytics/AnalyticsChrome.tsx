"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon } from "@/components/icons/ui-icons";
import { ExportIcon } from "@/components/icons/figma-icons";
import {
  analyticsKpis,
  analyticsPage,
  kpiMobileToneClass,
  kpiToneClass,
} from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** The 30d / Quarter / YTD / 12m switch, shared by both breakpoints. */
function RangeSwitch({
  value,
  onChange,
  variant,
}: {
  value: string;
  onChange: (id: string) => void;
  variant: "desktop" | "mobile";
}) {
  const mobile = variant === "mobile";

  return (
    <div
      role="group"
      aria-label="Date range"
      className={cn(
        "flex bg-slate-100",
        mobile ? "w-full gap-[3px] rounded-xl p-1" : "gap-0.5 rounded-[9px] p-[3px]",
      )}
    >
      {analyticsPage.ranges.map((range) => {
        const active = range.id === value;

        return (
          <button
            key={range.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(range.id)}
            className={cn(
              "whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
              mobile
                ? "h-9 flex-1 rounded-[9px] text-center text-[13px]"
                : "rounded-[7px] px-2.5 py-[5px] text-[12px]",
              active
                ? "bg-white font-semibold text-slate-900 shadow-[0_1px_1px_rgba(15,23,42,0.08)]"
                : "font-medium text-slate-400 hover:text-slate-600",
            )}
          >
            {range.label}
          </button>
        );
      })}
    </div>
  );
}

/** Desktop page header in the shell's 57px slot. */
export function AnalyticsTopBar() {
  const [range, setRange] = useState<string>(analyticsPage.defaultRange);

  return (
    <header className="leading-figma sticky top-0 z-30 hidden h-[57px] shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-6 lg:flex">
      <h1 className="text-[16px] font-semibold whitespace-nowrap text-slate-900">
        {analyticsPage.title}
      </h1>
      <p className="truncate text-[12px] text-slate-400">{analyticsPage.updated}</p>

      <div className="ml-auto flex items-center gap-2">
        <RangeSwitch value={range} onChange={setRange} variant="desktop" />
        <button
          type="button"
          className="h-9 rounded-[9px] border border-slate-200 bg-white px-[13px] text-[13px] font-medium whitespace-nowrap text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {analyticsPage.export}
        </button>
      </div>
    </header>
  );
}

/**
 * Mobile page header. Analytics is not one of the five mobile tabs, so the
 * frame gives it a back arrow; it returns to the dashboard.
 */
export function AnalyticsMobileHeader() {
  const [range, setRange] = useState<string>(analyticsPage.defaultRange);

  return (
    <header className="leading-figma flex flex-col gap-3 border-b border-slate-200 bg-white px-4 pt-3.5 pb-[13px] lg:hidden">
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          aria-label="Back"
          className="grid size-[46px] shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ArrowLeftIcon className="size-[15px]" />
        </Link>

        <div className="flex min-w-0 flex-col gap-px">
          <h1 className="text-[20px] font-semibold tracking-[-0.2px] text-slate-900">
            {analyticsPage.title}
          </h1>
          <p className="text-[12px] text-slate-400">{analyticsPage.updated}</p>
        </div>

        <button
          type="button"
          className="ml-auto flex h-[46px] shrink-0 items-center justify-center gap-[7px] rounded-xl border border-slate-200 bg-white px-4 text-[14px] font-medium whitespace-nowrap text-slate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ExportIcon className="size-[14px]" />
          {analyticsPage.export}
        </button>
      </div>

      <RangeSwitch value={range} onChange={setRange} variant="mobile" />
    </header>
  );
}

/** Four KPI tiles: a row on desktop, a 2x2 grid on mobile. */
export function AnalyticsKpis({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";

  return (
    <div
      className={cn(
        "w-full",
        mobile ? "grid grid-cols-2 gap-2" : "flex gap-3",
      )}
    >
      {analyticsKpis.map((kpi) => (
        <div
          key={kpi.id}
          className={cn(
            "flex min-w-0 flex-col gap-0.5 rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
            mobile ? "p-[15px]" : "flex-1 px-[17px] py-[15px]",
          )}
        >
          <span
            className={cn(
              "truncate font-medium text-slate-600",
              mobile ? "text-[12px]" : "text-[12.5px]",
            )}
          >
            {kpi.label}
          </span>

          {mobile ? (
            <>
              <span className="pt-px text-[22px] font-semibold text-slate-900">{kpi.value}</span>
              <span
                className={cn(
                  "truncate text-[11.5px] font-semibold",
                  kpiMobileToneClass[kpi.tone],
                )}
              >
                {kpi.mobileNote}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2">
                <span className="text-[23px] font-semibold text-slate-900">{kpi.value}</span>
                <span
                  className={cn(
                    "rounded-[20px] px-[7px] py-0.5 text-[11px] font-semibold whitespace-nowrap",
                    kpiToneClass[kpi.tone],
                  )}
                >
                  {kpi.delta}
                </span>
              </span>
              <span className="truncate text-[11.5px] text-slate-400">{kpi.note}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
