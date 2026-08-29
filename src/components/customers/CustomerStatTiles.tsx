import { Sparkline } from "@/components/ui/Sparkline";
import { customerStats, statBadgeClass } from "@/lib/customers";
import { cn } from "@/lib/cn";

/**
 * The four tiles above the table: label, figure with a badge beside it, and a
 * sparkline on the right. Reuses the dashboard's `Sparkline`.
 */
export function CustomerStatTiles() {
  return (
    <div className="flex w-full gap-3">
      {customerStats.map((stat) => (
        <div
          key={stat.id}
          className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-white px-[17px] py-3.5 shadow-[var(--shadow-card)]"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-[12.5px] font-medium text-slate-600">
              {stat.label}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[22px] font-semibold tracking-[-0.44px] text-slate-900">
                {stat.value}
              </span>
              <span
                className={cn(
                  "rounded-[20px] px-[7px] py-0.5 text-[11px] font-semibold tracking-[-0.44px] whitespace-nowrap",
                  statBadgeClass[stat.badgeTone],
                )}
              >
                {stat.badge}
              </span>
            </span>
          </div>

          <Sparkline
            points={stat.points}
            tone={stat.tone}
            className="h-[26px] w-[72px] shrink-0"
          />
        </div>
      ))}
    </div>
  );
}
