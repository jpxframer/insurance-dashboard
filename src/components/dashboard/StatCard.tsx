import { Card } from "@/components/ui/Card";
import { ArrowUpRightIcon } from "@/components/icons/ui-icons";
import { Sparkline, type SparkTone } from "@/components/ui/Sparkline";
import { cn } from "@/lib/cn";

export type Stat = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive";
  badge?: string;
  badgeTone?: "warning";
  mobileCaption?: string;
  mobileCaptionTone?: "positive" | "neutral" | "warning";
  spark: number[];
  sparkTone: SparkTone;
};

const CAPTION_CLASS = {
  positive: "text-green-700",
  neutral: "text-slate-400 font-normal",
  warning: "text-amber-700",
} as const;

/**
 * One of the four figures across the top of the dashboard.
 *
 * Desktop pairs the value with a sparkline; mobile drops the sparkline for a
 * caption line instead, per the mobile frame.
 */
export function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card as="div" className="px-4 py-3.5 lg:px-5 lg:py-3.5">
      <p className="text-[12.5px] text-slate-500 lg:text-[13px]">{stat.label}</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        {/* No wrapping: the design keeps value and chip on one line. */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="tnum text-[22px] font-semibold tracking-[-0.02em] text-slate-900 lg:text-[23px]">
            {stat.value}
          </span>

          {stat.delta ? (
            <span className="hidden whitespace-nowrap rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700 lg:inline">
              {stat.delta}
            </span>
          ) : null}

          {stat.badge ? (
            <span
              className={cn(
                "hidden whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium lg:inline",
                stat.badgeTone === "warning"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {stat.badge}
            </span>
          ) : null}
        </div>

        <Sparkline
          points={stat.spark}
          tone={stat.sparkTone}
          className="hidden h-7 w-[84px] shrink-0 xl:block"
        />
      </div>

      {stat.mobileCaption ? (
        <p
          className={cn(
            "mt-1.5 flex items-center gap-1 text-[12.5px] font-medium lg:hidden",
            CAPTION_CLASS[stat.mobileCaptionTone ?? "neutral"],
          )}
        >
          {stat.mobileCaptionTone === "positive" ? (
            <ArrowUpRightIcon className="size-3.5 shrink-0" />
          ) : null}
          {stat.mobileCaption}
        </p>
      ) : null}
    </Card>
  );
}
