"use client";

import { cn } from "@/lib/cn";

/**
 * Theme and density pickers — a slate-100 trough with the selected segment
 * lifted out in white.
 *
 * 32px tall with a 3px inset, so the segments are 26, on both screens.
 */
export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  stretch,
  className,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  /** Fill the row and split evenly — how the narrow breakpoint uses it. */
  stretch?: boolean;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex items-center gap-0.5 rounded-[9px] bg-slate-100 p-[3px]",
        stretch ? "w-full" : "shrink-0",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={cn(
              "h-[26px] rounded-[7px] px-3 text-[12.5px] whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600",
              stretch ? "flex-1" : null,
              active
                ? "bg-white font-semibold text-slate-900 shadow-[0_1px_1px_rgba(15,23,42,0.08)]"
                : "font-medium text-slate-500",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
