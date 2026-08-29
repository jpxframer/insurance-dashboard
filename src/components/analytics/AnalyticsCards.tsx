import { LineChart } from "@/components/ui/LineChart";
import {
  agentAvatarTone,
  agentPerformance,
  barToneClass,
  claimsByType,
  premiumByRegion,
  premiumChart,
  retentionPillClass,
  retentionToneClass,
  type BarTone,
} from "@/lib/analytics";
import { cn } from "@/lib/cn";

/** One labelled bar: label and value over a 6px track. */
function BarRow({
  label,
  value,
  percent,
  tone,
}: {
  label: string;
  value: string;
  percent: number;
  tone: BarTone;
}) {
  return (
    <div className="flex w-full flex-col gap-[5px]">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[12px] font-medium whitespace-nowrap text-slate-900">{label}</span>
        <span className="text-[12px] whitespace-nowrap text-slate-600">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-md bg-slate-100">
        <div
          className={cn("h-1.5 rounded-md", barToneClass[tone])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/** Shared shell for the two bar cards, each closing with a total row. */
function BarCard({
  title,
  badge,
  rows,
  totalLabel,
  totalValue,
  className,
}: {
  title: string;
  badge?: string;
  rows: { label: string; value: string; percent: number; tone: BarTone }[];
  totalLabel: string;
  totalValue: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex w-full flex-col justify-between rounded-[14px] border border-slate-200 bg-white px-[19px] py-[17px] shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-semibold text-slate-900">{title}</h2>
        {badge ? <span className="text-[12px] text-slate-400">{badge}</span> : null}
      </div>

      <div className="flex w-full flex-col gap-[11px] pt-3.5">
        {rows.map((row) => (
          <BarRow key={row.label} {...row} />
        ))}
      </div>

      <div className="mt-auto flex w-full items-start justify-between gap-3 border-t border-slate-100 pt-[11px]">
        <span className="text-[12px] text-slate-400">{totalLabel}</span>
        <span className="text-[12px] font-semibold text-slate-900">{totalValue}</span>
      </div>
    </section>
  );
}

export function ClaimsByTypeCard({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";

  return (
    <BarCard
      title={mobile ? claimsByType.mobileTitle : claimsByType.title}
      badge={mobile ? claimsByType.mobileBadge : undefined}
      rows={claimsByType.rows}
      totalLabel={claimsByType.totalLabel}
      totalValue={claimsByType.totalValue}
    />
  );
}

export function PremiumByRegionCard({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";

  return (
    <BarCard
      title={premiumByRegion.title}
      badge={mobile ? premiumByRegion.mobileBadge : undefined}
      rows={premiumByRegion.rows}
      totalLabel={premiumByRegion.totalLabel}
      totalValue={premiumByRegion.totalValue}
    />
  );
}

/** The two-series line chart, with its legend and month labels. */
export function PremiumChartCard({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const mobile = variant === "mobile";
  const labels = mobile ? premiumChart.mobileXLabels : premiumChart.xLabels;

  return (
    <section
      className={cn(
        "flex w-full flex-col gap-2.5 rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        mobile ? "px-[15px] pt-[15px] pb-5" : "px-[19px] pt-[17px] pb-8",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            "font-semibold text-slate-900",
            mobile ? "text-[14px]" : "text-[14px]",
          )}
        >
          {mobile ? premiumChart.mobileTitle : premiumChart.title}
        </h2>

        {!mobile ? (
          <div className="flex items-start gap-3.5">
            {premiumChart.series.map((item) => (
              <span key={item.id} className="flex items-center gap-[5px]">
                <span
                  className={cn(
                    "size-[7px] rounded-[3px]",
                    item.id === "premium" ? "bg-blue-600" : "bg-slate-400",
                  )}
                />
                <span className="text-[11.5px] whitespace-nowrap text-slate-600">
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {mobile ? (
        <div className="flex items-center gap-3.5">
          {premiumChart.series.map((item) => (
            <span key={item.id} className="flex items-center gap-[5px]">
              <span
                className={cn(
                  "size-[7px] rounded-[3px]",
                  item.id === "premium" ? "bg-blue-600" : "bg-slate-400",
                )}
              />
              <span className="text-[11.5px] whitespace-nowrap text-slate-600">{item.label}</span>
            </span>
          ))}
        </div>
      ) : null}

      <LineChart
        series={premiumChart.series}
        height={mobile ? 120 : premiumChart.height}
        gridlines={premiumChart.gridlines}
      />

      <div className="flex w-full items-start justify-between pt-px">
        {labels.map((label) => (
          <span key={label} className="text-[11px] text-slate-400">
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

/** Desktop agent table. */
export function AgentPerformanceCard() {
  return (
    <section className="flex w-full flex-1 flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2">
        <h2 className="text-[14px] font-semibold text-slate-900">{agentPerformance.title}</h2>
        <span className="text-[12px] text-slate-400">{agentPerformance.note}</span>
      </div>

      <div className="flex w-full gap-2.5 border-y border-slate-200 bg-slate-50 px-4 py-2">
        {agentPerformance.columns.map((column) => (
          <span
            key={column.id}
            className={cn(
              "text-[10.5px] font-semibold tracking-[0.42px] text-slate-400 uppercase",
              column.width ? `${column.width} text-right` : "min-w-0 flex-1",
            )}
          >
            {column.label}
          </span>
        ))}
      </div>

      {agentPerformance.rows.map((row) => (
        <div
          key={row.name}
          className="flex w-full items-center gap-2.5 border-b border-slate-100 px-4 pt-[9px] pb-2.5"
        >
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span
              aria-hidden
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-xl text-[10px] font-semibold",
                agentAvatarTone[row.tone],
              )}
            >
              {row.initials}
            </span>
            <span className="truncate text-[12.5px] font-medium text-slate-900">{row.name}</span>
          </span>

          <span className="tnum w-[90px] text-right text-[12.5px] font-medium text-slate-900">
            {row.policies}
          </span>
          <span className="tnum w-[100px] text-right text-[12.5px] font-medium text-slate-900">
            {row.premium}
          </span>
          <span
            className={cn(
              "tnum w-[90px] text-right text-[12.5px] font-medium",
              retentionToneClass[row.retentionTone],
            )}
          >
            {row.retention}
          </span>
          <span className="tnum w-[110px] text-right text-[12.5px] text-slate-600">
            {row.cycle}
          </span>
        </div>
      ))}
    </section>
  );
}

/** Mobile agent list — a heading outside the cards, then one card per agent. */
export function AgentPerformanceList() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3 px-0.5">
        <h2 className="text-[15px] font-semibold text-slate-900">{agentPerformance.title}</h2>
        <span className="text-[12px] text-slate-400">{agentPerformance.note}</span>
      </div>

      {agentPerformance.rows.map((row) => (
        <div
          key={row.name}
          className="flex w-full items-center gap-[11px] rounded-[14px] border border-slate-200 bg-white px-[15px] py-3.5 shadow-[var(--shadow-card)]"
        >
          <span
            aria-hidden
            className={cn(
              "grid size-[38px] shrink-0 place-items-center rounded-full text-[12px] font-semibold",
              agentAvatarTone[row.tone],
            )}
          >
            {row.initials}
          </span>

          <span className="flex min-w-0 flex-1 flex-col gap-px">
            <span className="truncate text-[14px] font-semibold text-slate-900">{row.name}</span>
            <span className="truncate text-[12px] text-slate-600">{row.mobileSummary}</span>
          </span>

          <span
            className={cn(
              "shrink-0 rounded-[20px] border px-[9px] py-[3px] text-[10.5px] font-medium whitespace-nowrap",
              retentionPillClass[row.retentionTone],
            )}
          >
            {row.mobilePill}
          </span>
        </div>
      ))}
    </div>
  );
}
