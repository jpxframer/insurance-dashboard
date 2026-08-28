import { Card } from "@/components/ui/Card";
import { policyDistribution } from "@/lib/data";

/** Bar colours step down the ramp as the segments get smaller. */
const BAR_CLASS: Record<string, string> = {
  "blue-600": "bg-blue-600",
  "blue-400": "bg-blue-400",
  "slate-400": "bg-slate-400",
  "slate-300": "bg-slate-300",
};

export function PolicyDistributionCard() {
  return (
    <Card className="hidden p-4 lg:flex lg:flex-col lg:p-5">
      <h2 className="text-[15px] font-semibold text-slate-900">
        {policyDistribution.title}
      </h2>

      <ul className="mt-4 flex flex-col gap-3.5">
        {policyDistribution.segments.map((segment) => (
          <li key={segment.label}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[13px] text-slate-700">{segment.label}</span>
              <span className="tnum text-[13px] font-medium text-slate-900">
                {segment.percent}%
              </span>
            </div>
            <div
              className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
              role="img"
              aria-label={`${segment.label}: ${segment.percent} percent`}
            >
              <div
                className={`h-full rounded-full ${BAR_CLASS[segment.tone]}`}
                style={{ width: `${segment.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-baseline justify-between gap-3 border-t border-slate-100 pt-3.5">
        <span className="text-[12.5px] text-slate-400">
          {policyDistribution.totalLabel}
        </span>
        <span className="tnum text-[13px] font-semibold text-slate-900">
          {policyDistribution.totalValue}
        </span>
      </div>
    </Card>
  );
}
