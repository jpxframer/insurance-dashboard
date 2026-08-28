import { AreaChart } from "@/components/ui/AreaChart";
import { Card } from "@/components/ui/Card";
import { revenueTrend } from "@/lib/data";

export function RevenueTrendCard() {
  return (
    <Card className="flex flex-col p-4 lg:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[15px] font-semibold text-slate-900">
            {revenueTrend.title}
          </h2>
          <span className="hidden text-[12px] text-slate-400 lg:inline">
            {revenueTrend.rangeLabel}
          </span>
        </div>

        {/* Desktop labels the series; mobile just repeats the range. */}
        <span className="hidden items-center gap-1.5 text-[12px] text-slate-500 lg:flex">
          <span className="size-2 rounded-full bg-blue-600" aria-hidden="true" />
          {revenueTrend.seriesLabel}
        </span>
        <span className="text-[12px] text-slate-400 lg:hidden">
          {revenueTrend.rangeLabel}
        </span>
      </div>

      {/*
        Visibility lives on these wrappers rather than on AreaChart itself —
        `hidden`/`block` on the chart would collide with its own `flex` display.
      */}
      {/* Fixed height: the design's chart row is ~250px, not a fill of the row. */}
      <div className="mt-4 hidden h-[248px] lg:flex lg:flex-col">
        <AreaChart
          points={revenueTrend.points}
          ticks={revenueTrend.desktopTicks}
          className="flex-1"
        />
      </div>
      <div className="mt-4 h-[150px] lg:hidden">
        <AreaChart
          points={revenueTrend.points}
          ticks={revenueTrend.mobileTicks}
          className="h-full"
        />
      </div>
    </Card>
  );
}
